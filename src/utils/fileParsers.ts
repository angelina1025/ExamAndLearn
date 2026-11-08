import { Question, SubjectId, DifficultyLevel } from '@/types';
import { formatSheetTimestamp } from '@/utils/formatters';
import { SUBJECT_TO_CATEGORY_ID } from '@/services/publicSheet';

export interface RowValidationError {
  rowNumber: number; // Excel row number (e.g. 2 for first question)
  questionIndex: number; // 1-based question index
  questionPreview: string;
  fieldErrors: string[];
}

export interface ExamUploadValidationResult {
  isValid: boolean;
  questions: Question[];
  rowErrors: RowValidationError[];
  fileError?: string;
}

const SUBJECT_PARSE_MAP: Record<string, SubjectId> = {
  math: 'math',
  '數學': 'math',
  '數學科': 'math',
  '數學 (math)': 'math',
  chinese: 'chinese',
  '國文': 'chinese',
  '國文科': 'chinese',
  '國文 (chinese)': 'chinese',
  english: 'english',
  '英文': 'english',
  '英文科': 'english',
  '英文 (english)': 'english',
  physics: 'physics',
  '物理': 'physics',
  '物理科': 'physics',
  '物理 (physics)': 'physics',
  '自然 (物理)': 'physics',
  chemistry: 'chemistry',
  '化學': 'chemistry',
  '化學科': 'chemistry',
  '化學 (chemistry)': 'chemistry',
  '自然 (化學)': 'chemistry',
  biology: 'biology',
  '生物': 'biology',
  '生物科': 'biology',
  '生物 (biology)': 'biology',
  '自然 (生物)': 'biology',
  astronomy: 'astronomy',
  '天文': 'astronomy',
  '天文科': 'astronomy',
  '天文 (astronomy)': 'astronomy',
  '自然 (天文)': 'astronomy',
  civics: 'civics',
  '公民': 'civics',
  '公民科': 'civics',
  '公民 (civics)': 'civics',
  '社會 (公民)': 'civics',
  geography: 'geography',
  '地理': 'geography',
  '地理科': 'geography',
  '地理 (geography)': 'geography',
  '社會 (地理)': 'geography',
  history: 'history',
  '歷史': 'history',
  '歷史科': 'history',
  '歷史 (history)': 'history',
  '社會 (歷史)': 'history',
};

function parseSubject(raw: string): SubjectId | null {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) return null;
  if (SUBJECT_PARSE_MAP[normalized]) return SUBJECT_PARSE_MAP[normalized];

  for (const [key, val] of Object.entries(SUBJECT_PARSE_MAP)) {
    if (normalized.includes(key)) return val;
  }
  return null;
}

function parseQuestionType(raw: string): 'single' | 'multiple' | 'true_false' | null {
  const normalized = raw.trim().toLowerCase();
  if (!normalized) return null;
  if (
    normalized.includes('單選') ||
    normalized === 'single' ||
    normalized.includes('single choice')
  ) {
    return 'single';
  }
  if (
    normalized.includes('多選') ||
    normalized.includes('複選') ||
    normalized === 'multiple' ||
    normalized.includes('multiple choice')
  ) {
    return 'multiple';
  }
  if (
    normalized.includes('是非') ||
    normalized === 'true_false' ||
    normalized === 'true/false' ||
    normalized.includes('true/false')
  ) {
    return 'true_false';
  }
  return null;
}

/**
 * Inflate raw DEFLATE bytes using browser DecompressionStream
 */
async function inflateRaw(compressed: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream('deflate-raw');
  const writer = ds.writable.getWriter();
  writer.write(compressed);
  writer.close();

  const reader = ds.readable.getReader();
  const chunks: Uint8Array[] = [];
  let totalLen = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      totalLen += value.length;
    }
  }

  const out = new Uint8Array(totalLen);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

/**
 * Extract files from a ZIP archive buffer using the Central Directory
 */
async function unzipBuffer(buffer: ArrayBuffer): Promise<Record<string, string>> {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);

  // Locate End of Central Directory (EOCD) signature 0x06054b50
  let eocdOffset = -1;
  const minEocdOffset = Math.max(0, bytes.length - 65557);
  for (let i = bytes.length - 22; i >= minEocdOffset; i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }

  if (eocdOffset === -1) {
    throw new Error('無法解析 Excel 檔案結構（非有效的 .xlsx 格式）');
  }

  const totalEntries = view.getUint16(eocdOffset + 10, true);
  const centralDirOffset = view.getUint32(eocdOffset + 16, true);

  const decoder = new TextDecoder('utf-8');
  const files: Record<string, string> = {};

  let ptr = centralDirOffset;
  for (let i = 0; i < totalEntries; i++) {
    if (ptr + 46 > bytes.length || view.getUint32(ptr, true) !== 0x02014b50) {
      break;
    }

    const compressionMethod = view.getUint16(ptr + 10, true);
    const compressedSize = view.getUint32(ptr + 20, true);
    const fileNameLen = view.getUint16(ptr + 28, true);
    const extraLen = view.getUint16(ptr + 30, true);
    const commentLen = view.getUint16(ptr + 32, true);
    const localHeaderOffset = view.getUint32(ptr + 42, true);

    const fileName = decoder.decode(bytes.subarray(ptr + 46, ptr + 46 + fileNameLen));
    ptr += 46 + fileNameLen + extraLen + commentLen;

    // Only decode XML files needed for worksheet parsing
    if (!fileName.endsWith('.xml') && !fileName.endsWith('.rels')) {
      continue;
    }

    if (localHeaderOffset + 30 > bytes.length) continue;
    const localFileNameLen = view.getUint16(localHeaderOffset + 26, true);
    const localExtraLen = view.getUint16(localHeaderOffset + 28, true);
    const dataStart = localHeaderOffset + 30 + localFileNameLen + localExtraLen;
    const compressedBytes = bytes.subarray(dataStart, dataStart + compressedSize);

    let contentBytes: Uint8Array;
    if (compressionMethod === 0) {
      contentBytes = compressedBytes;
    } else if (compressionMethod === 8) {
      contentBytes = await inflateRaw(compressedBytes);
    } else {
      continue;
    }

    files[fileName] = decoder.decode(contentBytes);
  }

  return files;
}

/**
 * Convert Excel column letters (e.g. "A", "M", "AA") to 0-based index
 */
function colRefToIndex(cellRef: string): number {
  const match = cellRef.match(/^[A-Za-z]+/);
  if (!match) return 0;
  const letters = match[0].toUpperCase();
  let idx = 0;
  for (let i = 0; i < letters.length; i++) {
    idx = idx * 26 + (letters.charCodeAt(i) - 64);
  }
  return idx - 1;
}

/**
 * Parse .xlsx ArrayBuffer into 2D string array (rows & columns of first worksheet)
 */
async function parseXlsxRows(buffer: ArrayBuffer): Promise<string[][]> {
  const xmlFiles = await unzipBuffer(buffer);
  const parser = new DOMParser();

  // 1. Parse sharedStrings.xml if present
  const sharedStrings: string[] = [];
  const sharedStringsXml = xmlFiles['xl/sharedStrings.xml'];
  if (sharedStringsXml) {
    const ssDoc = parser.parseFromString(sharedStringsXml, 'application/xml');
    const siNodes = ssDoc.getElementsByTagName('si');
    for (let i = 0; i < siNodes.length; i++) {
      const si = siNodes[i];
      const tNodes = si.getElementsByTagName('t');
      let text = '';
      for (let j = 0; j < tNodes.length; j++) {
        if (tNodes[j].parentNode?.nodeName === 'rPh') continue;
        text += tNodes[j].textContent || '';
      }
      sharedStrings.push(text);
    }
  }

  // 2. Find first worksheet XML
  const sheetXml =
    xmlFiles['xl/worksheets/sheet1.xml'] ||
    Object.entries(xmlFiles).find(([k]) => k.startsWith('xl/worksheets/sheet'))?.[1];

  if (!sheetXml) {
    throw new Error('找不到 Excel 工作表內容 (sheet1.xml)');
  }

  const sheetDoc = parser.parseFromString(sheetXml, 'application/xml');
  const rowNodes = sheetDoc.getElementsByTagName('row');
  const rows: string[][] = [];

  for (let i = 0; i < rowNodes.length; i++) {
    const rowEl = rowNodes[i];
    const rowIndexAttr = Number(rowEl.getAttribute('r')) || i + 1;
    const cellNodes = rowEl.getElementsByTagName('c');
    const rowValues: string[] = [];

    for (let j = 0; j < cellNodes.length; j++) {
      const cellEl = cellNodes[j];
      const ref = cellEl.getAttribute('r') || '';
      const colIdx = ref ? colRefToIndex(ref) : j;
      const cellType = cellEl.getAttribute('t') || '';

      let cellValue = '';
      if (cellType === 's') {
        const vNode = cellEl.getElementsByTagName('v')[0];
        const ssIdx = Number(vNode?.textContent ?? -1);
        cellValue = ssIdx >= 0 && ssIdx < sharedStrings.length ? sharedStrings[ssIdx] : '';
      } else if (cellType === 'inlineStr') {
        const tNodes = cellEl.getElementsByTagName('t');
        let text = '';
        for (let k = 0; k < tNodes.length; k++) {
          if (tNodes[k].parentNode?.nodeName === 'rPh') continue;
          text += tNodes[k].textContent || '';
        }
        cellValue = text;
      } else if (cellType === 'b') {
        const vNode = cellEl.getElementsByTagName('v')[0];
        cellValue = vNode?.textContent === '1' ? '正確 (True)' : '錯誤 (False)';
      } else {
        const vNode = cellEl.getElementsByTagName('v')[0];
        cellValue = vNode?.textContent || '';
      }

      while (rowValues.length <= colIdx) {
        rowValues.push('');
      }
      rowValues[colIdx] = cellValue.trim();
    }

    while (rows.length < rowIndexAttr - 1) {
      rows.push([]);
    }
    rows.push(rowValues);
  }

  return rows;
}

/**
 * Parse CSV text into 2D string array (handling quoted fields and commas/newlines)
 */
function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  const cleanText = text.replace(/^\uFEFF/, '');

  for (let i = 0; i < cleanText.length; i++) {
    const ch = cleanText[i];
    const next = cleanText[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        currentField += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        currentField += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (ch === '\r' && next === '\n') {
        currentRow.push(currentField.trim());
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
        i++;
      } else if (ch === '\n' || ch === '\r') {
        currentRow.push(currentField.trim());
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      } else {
        currentField += ch;
      }
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }

  return rows;
}

const EXPECTED_HEADERS = [
  { key: 'subject', label: '所屬學科', aliases: ['所屬學科', '學科', '科目', 'subject', 'subjectid'] },
  { key: 'type', label: '試題類型', aliases: ['試題類型', '題型', '類型', 'type'] },
  { key: 'difficulty', label: '難度 (1~5)', aliases: ['難度 (1~5)', '難度', '難易度', 'difficulty'] },
  { key: 'points', label: '配分 (score)', aliases: ['配分 (score)', '配分', '分數', 'score', 'points'] },
  { key: 'time', label: '題目時長 (time, 分鐘)', aliases: ['題目時長 (time, 分鐘)', '題目時長', '作答時長', '時長', 'time'] },
  { key: 'tags', label: '知識點標籤 (以逗號隔開)', aliases: ['知識點標籤 (以逗號隔開)', '知識點標籤', '知識點', '標籤', 'tags', 'taqs'] },
  { key: 'content', label: '題目內文', aliases: ['題目內文', '題幹', '題目內容', '題目敘述', 'question', 'content'] },
  { key: 'optA', label: '選項 A', aliases: ['選項 a', '選項a', 'option a', 'opt_a'] },
  { key: 'optB', label: '選項 B', aliases: ['選項 b', '選項b', 'option b', 'opt_b'] },
  { key: 'optC', label: '選項 C', aliases: ['選項 c', '選項c', 'option c', 'opt_c'] },
  { key: 'optD', label: '選項 D', aliases: ['選項 d', '選項d', 'option d', 'opt_d'] },
  { key: 'correctAnswer', label: '正確解答', aliases: ['正確解答', '正確答案', '解答', '答案', 'answer', 'correctanswer'] },
  { key: 'explanation', label: '題目詳解 / 評分標準', aliases: ['題目詳解 / 評分標準', '題目詳解', '詳解', '評分標準', '解析', 'explanation'] },
];

/**
 * Validate and parse an uploaded exam paper file (.xlsx or .csv)
 */
export async function validateAndParseExamFile(file: File): Promise<ExamUploadValidationResult> {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!['xlsx', 'csv'].includes(ext)) {
    return {
      isValid: false,
      questions: [],
      rowErrors: [],
      fileError: `不支援的檔案格式「.${ext}」，請上傳 .xlsx (Excel) 或 .csv 格式的試卷檔案。`,
    };
  }

  let rows: string[][] = [];
  try {
    if (ext === 'xlsx') {
      const buffer = await file.arrayBuffer();
      rows = await parseXlsxRows(buffer);
    } else {
      const text = await file.text();
      rows = parseCsvRows(text);
    }
  } catch (err: any) {
    return {
      isValid: false,
      questions: [],
      rowErrors: [],
      fileError: err?.message || '讀取檔案失敗，請確認檔案未損毀且符合範例 Excel 格式。',
    };
  }

  if (rows.length === 0) {
    return {
      isValid: false,
      questions: [],
      rowErrors: [],
      fileError: '上傳的檔案內容為空白，請使用範例 Excel 填寫題目後再上傳。',
    };
  }

  // Map header row (Row 1) - Pass 1: exact match, Pass 2: substring match on unclaimed columns
  const headerRow = rows[0].map((h) => (h || '').trim().toLowerCase());
  const colMap: Record<string, number> = {};
  const usedColIndices = new Set<number>();
  const missingHeaders: string[] = [];

  // Pass 1: Exact match
  EXPECTED_HEADERS.forEach((colDef) => {
    const exactIdx = headerRow.findIndex(
      (h, idx) => !usedColIndices.has(idx) && colDef.aliases.some((alias) => h === alias)
    );
    if (exactIdx !== -1) {
      colMap[colDef.key] = exactIdx;
      usedColIndices.add(exactIdx);
    }
  });

  // Pass 2: Substring match for any remaining unmapped headers
  EXPECTED_HEADERS.forEach((colDef) => {
    if (colMap[colDef.key] !== undefined) return;
    const partialIdx = headerRow.findIndex(
      (h, idx) => !usedColIndices.has(idx) && colDef.aliases.some((alias) => h.includes(alias))
    );
    if (partialIdx !== -1) {
      colMap[colDef.key] = partialIdx;
      usedColIndices.add(partialIdx);
    } else {
      missingHeaders.push(colDef.label);
    }
  });

  if (missingHeaders.length > 0) {
    return {
      isValid: false,
      questions: [],
      rowErrors: [],
      fileError: `標題列缺少必要欄位：${missingHeaders.map((h) => `「${h}」`).join('、')}。請下載並使用標準範例 Excel 檔案。`,
    };
  }

  // Filter non-empty data rows (starting from row index 1 -> Excel row 2)
  const dataRowEntries: { excelRowNumber: number; cells: string[] }[] = [];
  for (let r = 1; r < rows.length; r++) {
    const rowCells = rows[r] || [];
    const hasAnyContent = rowCells.some((c) => (c || '').trim().length > 0);
    if (hasAnyContent) {
      dataRowEntries.push({
        excelRowNumber: r + 1,
        cells: rowCells,
      });
    }
  }

  if (dataRowEntries.length === 0) {
    return {
      isValid: false,
      questions: [],
      rowErrors: [],
      fileError: '檔案內僅有標題列，沒有任何題目資料，請至少填寫一題完整題目。',
    };
  }

  const rowErrors: RowValidationError[] = [];
  const validQuestions: Question[] = [];
  const timestamp = formatSheetTimestamp();

  dataRowEntries.forEach((entry, idx) => {
    const { excelRowNumber, cells } = entry;
    const getCell = (key: string) => (cells[colMap[key]] ?? '').trim();

    const rawSubject = getCell('subject');
    const rawType = getCell('type');
    const rawDifficulty = getCell('difficulty');
    const rawPoints = getCell('points');
    const rawTime = getCell('time');
    const rawTags = getCell('tags');
    const rawContent = getCell('content');
    const rawOptA = getCell('optA');
    const rawOptB = getCell('optB');
    const rawOptC = getCell('optC');
    const rawOptD = getCell('optD');
    const rawCorrectAnswer = getCell('correctAnswer');
    const rawExplanation = getCell('explanation');

    const fieldErrors: string[] = [];

    // 1. 所屬學科
    const parsedSubject = parseSubject(rawSubject);
    if (!rawSubject) {
      fieldErrors.push('「所屬學科」未填寫');
    } else if (!parsedSubject) {
      fieldErrors.push(`「所屬學科」內容無效（目前填寫："${rawSubject}"，請填寫有效學科如：數學、國文、英文、物理、化學、生物、天文、公民、地理、歷史）`);
    }

    // 2. 試題類型
    const parsedType = parseQuestionType(rawType);
    if (!rawType) {
      fieldErrors.push('「試題類型」未填寫');
    } else if (!parsedType) {
      fieldErrors.push(`「試題類型」內容無效（目前填寫："${rawType}"，請填寫：單選題、多選題 或 是非題）`);
    }

    // 3. 難度 (1~5)
    const diffNum = Number(rawDifficulty);
    if (!rawDifficulty) {
      fieldErrors.push('「難度 (1~5)」未填寫');
    } else if (Number.isNaN(diffNum) || diffNum < 1 || diffNum > 5) {
      fieldErrors.push(`「難度 (1~5)」數值有誤（目前填寫："${rawDifficulty}"，須為 1 ~ 5 之間的數字）`);
    }

    // 4. 配分 (score)
    const pointsNum = Number(rawPoints);
    if (!rawPoints) {
      fieldErrors.push('「配分 (score)」未填寫');
    } else if (Number.isNaN(pointsNum) || pointsNum <= 0 || pointsNum > 100) {
      fieldErrors.push(`「配分 (score)」數值有誤（目前填寫："${rawPoints}"，須為 1 ~ 100 之間的數字）`);
    }

    // 5. 題目時長 (time, 分鐘)
    const timeNum = Number(rawTime);
    if (!rawTime) {
      fieldErrors.push('「題目時長 (time, 分鐘)」未填寫');
    } else if (Number.isNaN(timeNum) || timeNum <= 0) {
      fieldErrors.push(`「題目時長 (time, 分鐘)」數值有誤（目前填寫："${rawTime}"，須為大於 0 的數字）`);
    }

    // 6. 知識點標籤
    if (!rawTags) {
      fieldErrors.push('「知識點標籤 (以逗號隔開)」未填寫');
    }

    // 7. 題目內文
    if (!rawContent) {
      fieldErrors.push('「題目內文」未填寫');
    }

    // 8 ~ 11. 選項 A ~ D
    if (parsedType === 'true_false') {
      if (!rawOptA) fieldErrors.push('「選項 A」未填寫（是非題請填寫「正確 (True)」）');
      if (!rawOptB) fieldErrors.push('「選項 B」未填寫（是非題請填寫「錯誤 (False)」）');
    } else {
      if (!rawOptA) fieldErrors.push('「選項 A」未填寫');
      if (!rawOptB) fieldErrors.push('「選項 B」未填寫');
      if (!rawOptC) fieldErrors.push('「選項 C」未填寫');
      if (!rawOptD) fieldErrors.push('「選項 D」未填寫');
    }

    // 12. 正確解答
    if (!rawCorrectAnswer) {
      fieldErrors.push('「正確解答」未填寫');
    }

    // 13. 題目詳解 / 評分標準
    if (!rawExplanation) {
      fieldErrors.push('「題目詳解 / 評分標準」未填寫');
    }

    if (fieldErrors.length > 0) {
      rowErrors.push({
        rowNumber: excelRowNumber,
        questionIndex: idx + 1,
        questionPreview: rawContent ? (rawContent.length > 28 ? `${rawContent.slice(0, 28)}...` : rawContent) : '（未填寫題目內文）',
        fieldErrors,
      });
    } else if (parsedSubject && parsedType) {
      const diffLevel: DifficultyLevel =
        diffNum >= 4.0 ? 'hard' : diffNum >= 2.5 ? 'medium' : 'easy';
      const tags = rawTags
        .split(/[,，、\s]+/)
        .map((t) => t.trim())
        .filter(Boolean);
      const options =
        parsedType === 'true_false'
          ? [rawOptA || '正確 (True)', rawOptB || '錯誤 (False)']
          : [rawOptA, rawOptB, rawOptC, rawOptD];

      validQuestions.push({
        id: `Q-${parsedSubject.toUpperCase().slice(0, 4)}-${new Date().getFullYear()}${String(Math.floor(1000 + Math.random() * 9000))}-${idx + 1}`,
        subjectId: parsedSubject,
        categoryId: SUBJECT_TO_CATEGORY_ID[parsedSubject],
        type: parsedType,
        content: rawContent,
        difficulty: diffLevel,
        difficultyScore: diffNum,
        points: pointsNum,
        time: timeNum,
        tags: tags.length > 0 ? tags : ['未分類'],
        updatedAt: timestamp,
        options,
        correctAnswer: rawCorrectAnswer,
        explanation: rawExplanation,
      });
    }
  });

  return {
    isValid: rowErrors.length === 0,
    questions: validQuestions,
    rowErrors,
  };
}

/**
 * Legacy helper for simple CSV parsing
 */
export function parseCsvQuestions(csvContent: string): Partial<Question>[] {
  const lines = csvContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) return [];

  return lines.slice(1).map((line, idx) => {
    const cols = line.split(',').map((c) => c.trim());
    return {
      id: cols[0] || `Q-UPLOAD-${idx + 1}`,
      content: cols[1] || '',
      correctAnswer: cols[2] || '',
      explanation: cols[3] || '',
    };
  });
}
