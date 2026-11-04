/**
 * Format options into user-specified JSON object string: {"A": "...", "B": "...", ...}
 */
export function formatOptionsToJsonObject(options?: string[] | Record<string, string>): string {
  if (!options) return '{}';
  if (!Array.isArray(options)) {
    return typeof options === 'object' ? JSON.stringify(options) : String(options);
  }
  const obj: Record<string, string> = {};
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  options.forEach((opt, idx) => {
    const cleanOpt = opt.replace(/^[A-H][.:\s]\s*/, '').trim();
    const key = letters[idx] || `OPT_${idx + 1}`;
    obj[key] = cleanOpt || opt;
  });
  return JSON.stringify(obj);
}

/**
 * Parse raw option string from Google Sheet into options array and optionsMap
 */
export function parseSheetOptionJson(rawOptions: unknown): {
  options: string[];
  optionsMap?: Record<string, string>;
} {
  let parsedOptions: string[] = [];
  let parsedOptionsMap: Record<string, string> | undefined = undefined;

  if (rawOptions) {
    try {
      const parsed = JSON.parse(String(rawOptions));
      if (Array.isArray(parsed)) {
        parsedOptions = parsed.map(String);
      } else if (typeof parsed === 'object' && parsed !== null) {
        parsedOptionsMap = parsed as Record<string, string>;
        parsedOptions = Object.entries(parsed).map(([k, v]) => `${k}. ${v}`);
      }
    } catch {
      if (typeof rawOptions === 'string') {
        parsedOptions = rawOptions
          .split(/\n|;;/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
  }

  return { options: parsedOptions, optionsMap: parsedOptionsMap };
}

/**
 * Split answer string (e.g., "A, C") into normalized array ["A", "C"]
 */
export function parseAnswerTokens(rawAnswer?: string): string[] {
  if (!rawAnswer) return [];
  return rawAnswer
    .split(/[,，、\s]+/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}

/**
 * Extract Google Spreadsheet ID from URL or raw ID string
 */
export function extractSpreadsheetId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9-_]{20,70}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

