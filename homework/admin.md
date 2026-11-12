
```mermaid
classDiagram
    direction TB

    %% ----------------- 實體類別 (Entity / Domain Models) -----------------
    class Role {
        <<enumeration>>
        ADMIN
        USER
    }

    class QuestionType {
        <<enumeration>>
        SINGLE_CHOICE
        MULTIPLE_CHOICE
        TRUE_FALSE
    }

    class User {
        -String userId
        -String username
        -String passwordHash
        -String nickname
        -Role role
        -Boolean isActive
        -DateTime createdAt
        +verifyPassword(rawPassword: String) Boolean
        +updateRole(newRole: Role) void
    }

    class Question {
        -String questionId
        -String content
        -QuestionType type
        -List~String~ options
        -List~String~ correctAnswers
        -String explanation
        -Boolean isPublic
        -String createdBy
        -DateTime createdAt
        +updateContent(newContent: String) void
        +setOptions(options: List~String~) void
    }

    class ExamPaper {
        -String paperId
        -String title
        -String description
        -Int totalScore
        -Int durationMinutes
        -Boolean isPublic
        -String createdBy
        -DateTime createdAt
        +addQuestion(question: Question) void
        +removeQuestion(questionId: String) void
        +calculateTotalScore() Int
    }

    %% ----------------- 控制器 / 服務介面 (Controllers / Services) -----------------
    class AuthController {
        -AuthService authService
        +login(credentials: LoginRequest) AuthResponse
        +register(request: RegisterRequest) User
        +rememberAccount(rememberMe: Boolean) void
    }

    class AuthService {
        -UserRepository userRepository
        +authenticate(username: String, password: String) User
        +checkRole(userId: String) Role
        +registerUser(nickname: String, username: String, password: String) User
    }

    class AccountManagementController {
        -AccountService accountService
        +createUser(userData: UserDTO) User
        +getUser(userId: String) User
        +updateUser(userId: String, userData: UserDTO) User
        +deleteUser(userId: String) Boolean
        +updateUserRole(userId: String, role: Role) void
        +searchUsers(keyword: String, sortBy: String, order: String) List~User~
    }

    class QuestionManagementController {
        -QuestionService questionService
        +createQuestion(qData: QuestionDTO) Question
        +getQuestion(questionId: String) Question
        +updateQuestion(questionId: String, qData: QuestionDTO) Question
        +deleteQuestion(questionId: String) Boolean
        +uploadQuestionBatch(file: File) List~Question~
        +searchQuestions(keyword: String, sortBy: String, order: String) List~Question~
    }

    class ExamPaperManagementController {
        -ExamPaperService examPaperService
        +createPaper(paperData: PaperDTO) ExamPaper
        +getPaper(paperId: String) ExamPaper
        +updatePaper(paperId: String, paperData: PaperDTO) ExamPaper
        +deletePaper(paperId: String) Boolean
        +createPaperFromUpload(file: File) ExamPaper
        +searchPapers(keyword: String, sortBy: String, order: String) List~ExamPaper~
    }

    %% ----------------- 關聯性定義 -----------------
    User "1" --> "1" Role : has
    ExamPaper "1" o-- "*" Question : contains
    ExamPaper "*" --> "1" User : created by
    Question "*" --> "1" User : created by
    Question "1" --> "1" QuestionType : has

    AuthController ..> AuthService : delegates
    AuthService ..> User : queries/validates

    AccountManagementController ..> User : manages (CRUD)
    QuestionManagementController ..> Question : manages (CRUD)
    ExamPaperManagementController ..> ExamPaper : manages (CRUD)
    ExamPaperManagementController ..> QuestionManagementController : links on upload