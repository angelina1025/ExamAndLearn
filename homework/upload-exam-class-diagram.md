# 「上傳整份試卷」User Story 需求與 UML 類別圖設計

## 一、User Stories（使用者故事與驗收條件）

1. **US-1 下載標準範例 Excel 檔**
   - **身為** 題庫管理員 / 教師，**我希望** 在「上傳整份試卷」視窗中能一鍵下載標準範例 Excel 檔（`題庫試卷上傳範例.xlsx`），**以便** 依照系統規定的 13 個欄位格式快速填寫整份試卷題目。
2. **US-2 選取或拖曳本地試卷檔案**
   - **身為** 題庫管理員 / 教師，**我希望** 能透過點擊瀏覽或拖曳方式選取本地 `.xlsx` / `.csv` 試卷檔案，並在畫面上檢視檔名、檔案大小或移除重選，**以便** 確認即將上傳的試卷檔案無誤。
3. **US-3 試卷檔案結構與欄位完整性審查機制**
   - **身為** 題庫管理員 / 教師，**我希望** 點擊「上傳試卷」時系統自動審查標題列與每一題的所有必填欄位（所屬學科、試題類型、難度 1~5、配分、題目時長、知識點標籤、題目內文、選項 A~D、正確解答、題目詳解），**以便** 在欄位缺漏或數值越界時跳出「上傳失敗」並精準提醒是第幾題（Excel 第幾列）的哪個欄位有問題。
4. **US-4 審查通過匯入題庫與雲端資料庫同步**
   - **身為** 題庫管理員 / 教師，**我希望** 當試卷所有欄位審查通過後顯示「上傳成功」，自動將整批題目匯入題庫（`test_bank`）並記錄操作審計日誌（`log`），**以便** 立即在題庫管理列表中檢視與使用該批試題。

---

## 二、UML 類別圖 (Mermaid Class Diagram)

```mermaid
classDiagram
    direction TB

    %% ----------------- 列舉型別 (Enumerations) -----------------
    class SubjectId {
        <<enumeration>>
        math
        chinese
        english
        physics
        chemistry
        biology
        astronomy
        civics
        geography
        history
    }

    class QuestionType {
        <<enumeration>>
        single
        multiple
        true_false
    }

    class DifficultyLevel {
        <<enumeration>>
        easy
        medium
        hard
    }

    %% ----------------- 實體與值物件 (Entities & Value Objects) -----------------
    class Question {
        +String id
        +SubjectId subjectId
        +Int categoryId
        +QuestionType type
        +String content
        +DifficultyLevel difficulty
        +Float difficultyScore
        +Int points
        +Int time
        +List~String~ tags
        +List~String~ options
        +String correctAnswer
        +String explanation
        +String updatedAt
        +Int updatedBy
    }

    class ExamUploadValidationResult {
        +Boolean isValid
        +List~Question~ questions
        +List~RowValidationError~ rowErrors
        +String fileError
    }

    class RowValidationError {
        +Int rowNumber
        +Int questionIndex
        +String questionPreview
        +List~String~ fieldErrors
    }

    class AuditLog {
        +String id
        +String action
        +String target
        +String operator
        +String timestamp
        +String status
    }

    %% ----------------- 邊界視圖類別 (Boundary / UI Component) -----------------
    class UploadExamModal {
        -Boolean isOpen
        -File selectedFile
        -Boolean isDragging
        -Boolean isChecking
        -ExamUploadValidationResult validationResult
        -Boolean uploadSucceeded
        +handleSelectNewFile(file: File) void
        +handleDrop(event: DragEvent) void
        +handleRemoveFile() void
        +handleSubmit() Promise~void~
        +downloadTemplateExcel() void
        +formatFileSize(bytes: Int) String
    }

    %% ----------------- 控制與解析審查類別 (Controller & Parser / Validator) -----------------
    class ExamFileParserValidator {
        -List~HeaderDefinition~ EXPECTED_HEADERS
        -Map~String, SubjectId~ SUBJECT_PARSE_MAP
        +validateAndParseExamFile(file: File) Promise~ExamUploadValidationResult~
        -parseXlsxRows(buffer: ArrayBuffer) Promise~List~List~String~~~
        -parseCsvRows(text: String) List~List~String~~
        -mapHeaderColumns(headerRow: List~String~) Map~String, Int~
        -validateRowFields(excelRowNumber: Int, cells: List~String~) RowValidationError
        -parseSubject(raw: String) SubjectId
        -parseQuestionType(raw: String) QuestionType
    }

    class QuestionUploadController {
        -PublicSheetService publicSheetService
        +handleUploadSuccess(importedQuestions: List~Question~, file: File) Promise~void~
        +recordUploadAuditLog(fileName: String, count: Int) Promise~void~
    }

    %% ----------------- 外部資料表同步服務 (Repository / External Service) -----------------
    class PublicSheetService {
        -String spreadsheetId
        -String scriptUrl
        +appendQuestionToSpreadsheet(token: String, spreadsheetId: String, question: Question, rowIndex: Int) Promise~Boolean~
        +appendLogToSpreadsheet(token: String, spreadsheetId: String, logEntry: AuditLog, rowIndex: Int) Promise~Boolean~
        +postToGasScript(payload: Map~String, Any~) Promise~Any~
    }

    %% ----------------- 類別關聯定義 (Relationships) -----------------
    UploadExamModal ..> ExamFileParserValidator : calls validateAndParseExamFile()
    UploadExamModal --> ExamUploadValidationResult : holds & renders state
    UploadExamModal ..> QuestionUploadController : triggers onUploadSuccess()

    ExamFileParserValidator ..> ExamUploadValidationResult : creates
    ExamUploadValidationResult "1" *-- "*" RowValidationError : contains errors
    ExamUploadValidationResult "1" o-- "*" Question : produces valid questions

    Question "1" --> "1" SubjectId : belongs to
    Question "1" --> "1" QuestionType : has type
    Question "1" --> "1" DifficultyLevel : has difficulty

    QuestionUploadController ..> PublicSheetService : batch saves to test_bank & log
    QuestionUploadController ..> Question : updates question state
    QuestionUploadController ..> AuditLog : creates audit entry
    PublicSheetService ..> Question : persists
    PublicSheetService ..> AuditLog : persists
```
