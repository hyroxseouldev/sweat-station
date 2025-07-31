# Database Setup with Drizzle ORM

이 프로젝트는 Drizzle ORM을 사용하여 PostgreSQL 데이터베이스와 상호작용합니다.

## 📁 파일 구조

```
src/db/
├── schema.ts      # 데이터베이스 스키마 정의
├── index.ts       # 데이터베이스 연결 설정
├── utils.ts       # 유틸리티 함수들
├── services.ts    # 서비스 레이어 (비즈니스 로직)
├── migrations/    # 데이터베이스 마이그레이션 파일들
└── README.md      # 이 파일
```

## 🚀 시작하기

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음을 추가하세요:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/sweat_station"
```

### 2. 데이터베이스 마이그레이션

스키마 변경사항을 마이그레이션 파일로 생성:

```bash
pnpm db:generate
```

데이터베이스에 마이그레이션 적용:

```bash
pnpm db:migrate
```

### 3. 개발 중 스키마 푸시 (선택사항)

개발 중에 스키마를 직접 데이터베이스에 푸시:

```bash
pnpm db:push
```

### 4. Drizzle Studio 실행

브라우저에서 데이터베이스를 시각적으로 관리:

```bash
pnpm db:studio
```

## 📝 사용 예시

### 기본 사용법

```typescript
import { db, users, posts } from "@/db";
import { eq } from "drizzle-orm";

// 사용자 생성
const newUser = await db
  .insert(users)
  .values({
    email: "user@example.com",
    name: "John Doe",
  })
  .returning();

// 사용자 조회
const user = await db.select().from(users).where(eq(users.id, 1));

// 포스트 생성
const newPost = await db
  .insert(posts)
  .values({
    title: "My First Post",
    content: "Hello World!",
    authorId: 1,
    published: true,
  })
  .returning();
```

### 서비스 레이어 사용

```typescript
import { UserService, PostService } from "@/db/services";

// 사용자 생성
const user = await UserService.create({
  email: "user@example.com",
  name: "John Doe",
});

// 사용자 목록 조회 (페이지네이션)
const users = await UserService.list(1, 10);

// 포스트 생성 (작성자 검증 포함)
const post = await PostService.createWithValidation({
  title: "My Post",
  content: "Content here",
  authorId: user.id,
});
```

## 🗂️ 스키마 구조

### Users 테이블

- `id`: 기본 키 (자동 증가)
- `email`: 이메일 (고유)
- `name`: 사용자 이름
- `createdAt`: 생성 일시
- `updatedAt`: 수정 일시

### Posts 테이블

- `id`: 기본 키 (자동 증가)
- `title`: 포스트 제목
- `content`: 포스트 내용 (선택사항)
- `authorId`: 작성자 ID (Users 테이블 참조)
- `published`: 게시 여부
- `createdAt`: 생성 일시
- `updatedAt`: 수정 일시

## 🛠️ 유용한 명령어

```bash
# 마이그레이션 생성
pnpm db:generate

# 마이그레이션 적용
pnpm db:migrate

# 스키마 직접 푸시 (개발용)
pnpm db:push

# Drizzle Studio 실행
pnpm db:studio

# 마이그레이션 삭제 (위험!)
pnpm db:drop
```

## 🔗 관련 문서

- [Drizzle ORM 공식 문서](https://orm.drizzle.team/)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)
- [Drizzle Kit 문서](https://orm.drizzle.team/kit-docs/overview)
