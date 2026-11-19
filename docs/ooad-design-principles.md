# 系統類別圖與 8 大物件導向設計原則分析

## 1. 系統核心類別圖（由 homework/admin.md 延伸）

```mermaid
classDiagram
    direction TB
    class UserProfile {
        -String uuid
        -UserRole role
        -String google_sheet_URL
    }
    class ExamPaper {
        -String id
        -String title
        -Int durationMinutes
        -List~String~ questionIds
    }
    class Question {
        -String id
        -ExamQuestionType type
        -Record optionsMap
        -String correctAnswer
        -Int points
    }
    class ExamSessionContext {
        -ExamSessionState state
        +dispatch(action: ExamAction)
        +submitExam()
    }
    class ScoreCalculator {
        +calculateExamScore(questions, answers)
        +countAnswered(exam, answers)
    }
    class ExamResultSummary {
        -Int score
        -Int correctCount
        -Int wrongCount
        -List~WrongQuestionRecord~ wrongQuestions
    }
    class ISheetRepository {
        <<interface>>
        +fetchQuestions()
        +saveExamResult()
    }
    class PublicSheetService
    class UserSheetService

    UserProfile "1" --> "*" ExamPaper : owns
    ExamPaper "1" o-- "*" Question : contains
    ExamSessionContext ..> ScoreCalculator : uses
    ExamSessionContext --> ExamResultSummary : produces
    ISheetRepository <|.. PublicSheetService : implements
    ISheetRepository <|.. UserSheetService : implements
