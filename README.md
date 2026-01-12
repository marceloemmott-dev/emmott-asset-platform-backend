<div align="center">

# 🏗️ Emmott Asset Platform — Backend

### Enterprise Multi-Tenant Asset Management SaaS Platform

[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)

**A professional backend portfolio project demonstrating enterprise-grade SaaS architecture**

---

### 🌐 Language / Idioma

[![English](https://img.shields.io/badge/English-Active-blue?style=for-the-badge)](./README.md)
[![Español](https://img.shields.io/badge/Español-Disponible-green?style=for-the-badge)](./README.es.md)

🇪🇸 **[Leer documentación en Español](./README.es.md)**

---

[📖 Documentation](#-table-of-contents) • [🚀 Quick Start](#-quick-start) • [🏗️ Architecture](#-architecture-overview) • [🛣️ Roadmap](#-project-roadmap)

---

</div>

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Quick Start](#-quick-start)
- [Project Status](#-project-status)
- [Git Workflow](#-git-workflow)
- [Project Roadmap](#-project-roadmap)
- [Architectural Decisions](#-architectural-decisions)
- [Connect With Me](#-connect-with-me)

---

## 🎯 About the Project

**Emmott Asset Platform** is an enterprise-oriented, multi-tenant asset management platform designed to manage companies, users, and assets in a scalable and secure manner.

This repository contains the **backend API**, built with **NestJS**, following **clean architecture principles** and a **feature-based development workflow**.

### 🏢 About Emmott Labs

**Emmott Labs** is a professional software development context created for this project. The goal is to simulate **real-world SaaS development practices**, including:

- ✅ Enterprise architecture decisions
- ✅ Professional Git workflows
- ✅ Multi-cloud integration strategies
- ✅ Production-ready code patterns

### 💡 Project Philosophy

This is **not a simple demo** — it's a **realistic SaaS backend** built to demonstrate:

- 🎯 **Multi-tenant architecture** with logical data isolation
- 🔐 **Role-based access control** (RBAC)
- 🏗️ **Clean configuration management** using environment variables
- ☁️ **Cloud-ready infrastructure** (Azure + AWS)
- 📐 **Domain-driven design** principles
- 🧪 **Test-driven development** approach
- 📝 **Comprehensive documentation**

> **Purpose:** Serve as a strong backend portfolio project for technical interviews and professional showcases.

---

## 🧱 Tech Stack

### **Core Framework**
- **[NestJS](https://nestjs.com/)** `v11.0` — Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** `v5.7` — Type-safe JavaScript

### **Database & ORM**
- **[PostgreSQL](https://www.postgresql.org/)** — Relational database (hosted on [Neon](https://neon.tech/))
- **[TypeORM](https://typeorm.io/)** `v0.3` — Object-Relational Mapping

### **Configuration & Environment**
- **[@nestjs/config](https://docs.nestjs.com/techniques/configuration)** `v4.0` — Configuration management
- **ConfigService** — Centralized environment variable handling

### **Authentication & Security** *(In Progress)*
- **JWT** — JSON Web Tokens for stateless authentication
- **bcrypt** — Password hashing *(planned)*
- **Passport.js** — Authentication middleware *(planned)*

### **Cloud & Infrastructure** *(Planned)*
- **[Azure App Service](https://azure.microsoft.com/en-us/services/app-service/)** — Backend deployment
- **[AWS S3](https://aws.amazon.com/s3/)** — Media storage

### **Development Tools**
- **ESLint** `v9.18` — Code linting
- **Prettier** `v3.4` — Code formatting
- **Jest** `v30.0` — Testing framework
- **Git** — Version control with feature-based workflow

### **Dependencies Overview**

```json
{
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^4.0.2",
    "@nestjs/core": "^11.0.1",
    "@nestjs/typeorm": "^11.0.0",
    "typeorm": "^0.3.28",
    "pg": "^8.16.3"
  }
}
```


---

## 🏗️ Architecture Overview

### **Multi-Tenant SaaS Model**

```mermaid
graph TB
    subgraph Platform["🏢 Emmott Asset Platform (Platform Owner)"]
        API[NestJS API Backend]
    end
    
    subgraph Database["🗄️ PostgreSQL Database (Neon - Single DB)"]
        subgraph CompanyA["Company A Data"]
            A1[Users - companyId: A]
            A2[Assets - companyId: A]
        end
        
        subgraph CompanyB["Company B Data"]
            B1[Users - companyId: B]
            B2[Assets - companyId: B]
        end
        
        subgraph CompanyC["Company C Data"]
            C1[Users - companyId: C]
            C2[Assets - companyId: C]
        end
    end
    
    API -->|Manages All Companies| Database
    
    style Platform fill:#E0234E,stroke:#fff,stroke-width:2px,color:#fff
    style Database fill:#4169E1,stroke:#fff,stroke-width:2px,color:#fff
    style CompanyA fill:#2ecc71,stroke:#fff,stroke-width:1px
    style CompanyB fill:#3498db,stroke:#fff,stroke-width:1px
    style CompanyC fill:#9b59b6,stroke:#fff,stroke-width:1px
```

**Key Concept:** Logical multi-tenancy via `companyId` — all companies share the same database, but data is isolated at the application level.

### **Authentication Flow** *(Planned)*

```mermaid
sequenceDiagram
    participant User
    participant API as NestJS API
    participant Auth as Auth Service
    participant DB as PostgreSQL
    participant JWT as JWT Service

    User->>API: POST /auth/login
    API->>Auth: Validate credentials
    Auth->>DB: Query user by email
    DB-->>Auth: Return user data
    Auth->>Auth: Verify password (bcrypt)
    Auth->>JWT: Generate JWT token
    JWT-->>Auth: Return signed token
    Auth-->>API: Return token + user info
    API-->>User: 200 OK + JWT token
    
    Note over User,JWT: Subsequent requests include JWT in headers
    
    User->>API: GET /assets (with JWT)
    API->>JWT: Validate token
    JWT-->>API: Token valid + user data
    API->>DB: Query assets (filtered by companyId)
    DB-->>API: Return company assets
    API-->>User: 200 OK + assets data
```

### **Module Architecture**

```mermaid
graph LR
    subgraph Core["Core Modules"]
        App[App Module]
        Config[Config Module]
    end
    
    subgraph Auth["Authentication"]
        AuthM[Auth Module]
        Users[Users Module]
    end
    
    subgraph Business["Business Logic (Planned)"]
        Companies[Companies Module]
        Assets[Assets Module]
        Categories[Categories Module]
    end
    
    subgraph Infrastructure["Infrastructure"]
        DB[(TypeORM + PostgreSQL)]
        Cloud[Cloud Services]
    end
    
    App --> Config
    App --> AuthM
    App --> Users
    AuthM --> Users
    App -.Future.-> Companies
    App -.Future.-> Assets
    App -.Future.-> Categories
    
    Users --> DB
    Companies -.-> DB
    Assets -.-> DB
    Categories -.-> DB
    
    Assets -.Future.-> Cloud
    
    style Core fill:#E0234E,stroke:#fff,stroke-width:2px,color:#fff
    style Auth fill:#3178C6,stroke:#fff,stroke-width:2px,color:#fff
    style Business fill:#2ecc71,stroke:#fff,stroke-width:2px,color:#fff
    style Infrastructure fill:#4169E1,stroke:#fff,stroke-width:2px,color:#fff
```


### **Key Architectural Decisions**

| Decision | Rationale |
|----------|-----------|
| **Single Database** | SaaS model — platform owns infrastructure |
| **Logical Multi-Tenancy** | Data isolation via `companyId` column |
| **Platform Roles as Enums** | Simple, stable, explicit role management |
| **SSL Enabled** | Required by Neon, ensures secure connections |
| **`synchronize: false`** | Safe by default — manual migrations |
| **No Docker** | Focus on architecture, not containerization |

### **Current Module Structure**

```
src/
├── auth/               # Authentication module (structure only)
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/              # User management module
│   ├── entities/
│   │   └── usuario.entity.ts  # Domain model (not persisted yet)
│   ├── users.service.ts
│   └── users.module.ts
├── config/             # Configuration management
│   └── database.config.ts
└── app.module.ts       # Root module
```

---

## 🚀 Quick Start

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** `v18+` ([Download](https://nodejs.org/))
- **npm** `v9+` (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **PostgreSQL** account on [Neon](https://neon.tech/) (or local PostgreSQL)

---

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/marceloemmott-dev/emmott-asset-platform-backend.git
cd emmott-asset-platform-backend
```

---

### **Step 2: Install Dependencies**

```bash
npm install
```

This will install all required packages defined in `package.json`.

---

### **Step 3: Configure Environment Variables**

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Then edit `.env` with your actual configuration:

```env
# Application Configuration
APP_NAME=Emmott Asset Platform
NODE_ENV=development
PORT=3000

# Database Configuration (Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@host.neon.tech/database?sslmode=require
```

**How to get your Neon DATABASE_URL:**

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project (or use existing)
3. Navigate to **Dashboard** → **Connection Details**
4. Copy the **Connection String** (it includes SSL by default)
5. Paste it into your `.env` file

**Example:**
```env
DATABASE_URL=postgresql://myuser:mypassword@ep-cool-name-123456.us-east-2.aws.neon.tech/mydb?sslmode=require
```

---

### **Step 4: Run the Application**

#### **Development Mode** (with hot-reload)

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

#### **Production Mode**

```bash
npm run build
npm run start:prod
```

---

### **Step 5: Verify Database Connection**

Once the application starts, you should see:

```
[Nest] 12345  - 01/12/2026, 1:00:00 PM     LOG [TypeOrmModule] Database connection established
[Nest] 12345  - 01/12/2026, 1:00:00 PM     LOG [NestApplication] Nest application successfully started
```

✅ **Database connection is verified and working!**

---

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode (watch mode) |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |
| `npm run build` | Build the application |
| `npm run format` | Format code with Prettier |
| `npm run lint` | Lint code with ESLint |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage |

---

## 📊 Project Status

### **✅ Completed Features**

| Feature | Status | Description |
|---------|--------|-------------|
| **Project Setup** | ✅ Complete | NestJS project initialized with TypeScript |
| **Database Connection** | ✅ Complete | PostgreSQL (Neon) connected via TypeORM |
| **Configuration Management** | ✅ Complete | Environment variables with `ConfigService` |
| **Auth Module Structure** | ✅ Complete | Module, service, and controller created |
| **User Domain Model** | ✅ Complete | Domain-level user model defined |
| **Git Workflow** | ✅ Complete | Feature-based branching strategy |

### **🚧 In Progress**

- **JWT Authentication** — Login logic and token generation
- **User Persistence** — Converting domain models to TypeORM entities

### **📋 Upcoming Features**

- Role-based guards (RBAC)
- Company domain model
- Asset & category modules
- Azure deployment
- AWS S3 integration

---

## 🌿 Git Workflow

This project follows a **professional feature-based Git workflow**:

```
main (production-ready)
  │
  └── develop (integration branch)
        │
        ├── feature/database-setup ✅
        ├── feature/auth ✅
        ├── feature/auth-login 🚧
        └── feature/user-persistence 📋
```

### **Branch Strategy**

| Branch | Purpose |
|--------|---------|
| `main` | Stable, production-ready code |
| `develop` | Integration branch for features |
| `feature/*` | Isolated feature development |

### **Example Workflow**

```bash
# Create a new feature branch
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# Work on your feature
git add .
git commit -m "feat: implement my new feature"

# Push to remote
git push origin feature/my-new-feature

# Create a Pull Request to develop
# After review, merge to develop
# When stable, merge develop to main
```

This mirrors **real-world team development practices**.

---

## 🛣️ Project Roadmap

### **Development Timeline**

```mermaid
gantt
    title Emmott Asset Platform - Development Roadmap
    dateFormat YYYY-MM-DD
    section Phase 1: Foundation
    Project Setup           :done, p1, 2026-01-01, 2026-01-05
    Database Connection     :done, p2, 2026-01-05, 2026-01-08
    Auth Module Structure   :done, p3, 2026-01-08, 2026-01-12
    
    section Phase 2: Authentication
    User Persistence        :active, p4, 2026-01-12, 2026-01-18
    JWT Implementation      :p5, 2026-01-18, 2026-01-25
    Role-based Guards       :p6, 2026-01-25, 2026-02-01
    
    section Phase 3: Core Features
    Company Module          :p7, 2026-02-01, 2026-02-10
    Asset Module            :p8, 2026-02-10, 2026-02-20
    Category Management     :p9, 2026-02-20, 2026-02-28
    
    section Phase 4: Cloud Deployment
    Azure Deployment        :p10, 2026-03-01, 2026-03-10
    AWS S3 Integration      :p11, 2026-03-10, 2026-03-15
    CI/CD Pipeline          :p12, 2026-03-15, 2026-03-20
```

### **Phase 1: Foundation** ✅ *Current*

- [x] Project initialization
- [x] Database connection (PostgreSQL/Neon)
- [x] Configuration management
- [x] Auth module structure
- [x] User domain model

### **Phase 2: Authentication** 🚧 *In Progress*

- [ ] Convert domain models to TypeORM entities
- [ ] Implement user persistence
- [ ] JWT authentication (login/register)
- [ ] Password hashing (bcrypt)
- [ ] Role-based guards

### **Phase 3: Core Features** 📋 *Planned*

- [ ] Company domain model
- [ ] Company CRUD operations
- [ ] Asset domain model
- [ ] Category management
- [ ] Asset CRUD operations

### **Phase 4: Cloud Deployment** 📋 *Planned*

- [ ] Azure App Service deployment
- [ ] AWS S3 integration for media
- [ ] Environment-based configuration
- [ ] CI/CD pipeline

---

## 🧠 Architectural Decisions

### **Why Single Database?**
SaaS platforms typically use a single database with logical multi-tenancy for cost efficiency and easier maintenance.

### **Why Logical Multi-Tenancy?**
Using `companyId` for data isolation is simpler than database-per-tenant and scales better for small-to-medium SaaS.

### **Why Platform Roles as Enums?**
Platform-level roles (`SUPER_ADMIN`, `COMPANY_ADMIN`) are stable and explicit. Company-level dynamic roles will be added later.

### **Why No Docker?**
This project focuses on **backend architecture** and **code quality**, not containerization. Docker can be added later if needed.

### **Why Multi-Cloud (Azure + AWS)?**
Demonstrates real-world scenarios where different cloud providers are used for different services (compute vs. storage).

---

## 🔗 Connect With Me

<div align="center">

### **Marcelo Emmott**
*Backend Developer | NestJS Specialist | Cloud Enthusiast*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcelo-emmott-sanchez-75475939b/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/marceloemmott-dev)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/marceloemmott)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://marceloemmott.dev)

**📧 Email:** [emmottmarcelo2026@gmail.com](mailto:emmottmarcelo2026@gmail.com)

</div>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ✨ **Built with intention, not just code**

*This project demonstrates how a backend engineer thinks, not just how code is written.*

**Every decision is intentional, documented, and aligned with real-world SaaS development practices.**

---

**⭐ If you find this project helpful, please consider giving it a star!**

</div>
