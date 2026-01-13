<div align="center">

# ­ƒÅù´©Å Emmott Asset Platform ÔÇö Backend

### Plataforma SaaS Multi-Tenant para Gesti├│n de Activos Empresariales

[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)

**Un proyecto de portafolio backend profesional que demuestra arquitectura SaaS de nivel empresarial**

[­ƒôû Documentaci├│n](#-tabla-de-contenidos) ÔÇó [­ƒÜÇ Inicio R├ípido](#-inicio-r├ípido) ÔÇó [­ƒÅù´©Å Arquitectura](#-visi├│n-general-de-la-arquitectura) ÔÇó [­ƒøú´©Å Roadmap](#-roadmap-del-proyecto)

---

</div>

## ­ƒôï Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Stack Tecnol├│gico](#-stack-tecnol├│gico)
- [Visi├│n General de la Arquitectura](#-visi├│n-general-de-la-arquitectura)
- [Estructura del Proyecto](#estructura-actual-de-m├│dulos)
- [Uso de la API](#-uso-de-la-api)
- [Sistema de Reset de Contrase├▒a](#-sistema-de-reset-de-contrase├▒a-con-resend)
- [Configuraci├│n](#-configuraci├│n)
- [Inicio R├ípido](#-inicio-r├ípido)
- [Estado del Proyecto](#-estado-del-proyecto)
- [Flujo de Trabajo Git](#-flujo-de-trabajo-git)
- [Roadmap del Proyecto](#-roadmap-del-proyecto)
- [Decisiones Arquitect├│nicas](#-decisiones-arquitect├│nicas)
- [Con├®ctate Conmigo](#-con├®ctate-conmigo)

---

## ­ƒÄ» Acerca del Proyecto

**Emmott Asset Platform** es una plataforma multi-tenant orientada a empresas para la gesti├│n de compa├▒├¡as, usuarios y activos de manera escalable y segura.

Este repositorio contiene la **API backend**, construida con **NestJS**, siguiendo **principios de arquitectura limpia** y un **flujo de trabajo basado en features**.

### ­ƒÅó Acerca de Emmott Labs

**Emmott Labs** es un contexto profesional de desarrollo de software creado para este proyecto. El objetivo es simular **pr├ícticas de desarrollo SaaS del mundo real**, incluyendo:

- Ô£à Decisiones de arquitectura empresarial
- Ô£à Flujos de trabajo Git profesionales
- Ô£à Estrategias de integraci├│n multi-nube
- Ô£à Patrones de c├│digo listos para producci├│n

### ­ƒÆí Filosof├¡a del Proyecto

Esto **no es una simple demo** ÔÇö es un **backend SaaS realista** construido para demostrar:

- ­ƒÄ» **Arquitectura multi-tenant** con aislamiento l├│gico de datos
- ­ƒöÉ **Control de acceso basado en roles** (RBAC)
- ­ƒÅù´©Å **Gesti├│n de configuraci├│n limpia** usando variables de entorno
- Ôÿü´©Å **Infraestructura lista para la nube** (Azure + AWS)
- ­ƒôÉ Principios de **dise├▒o orientado al dominio**
- ­ƒº¬ Enfoque de **desarrollo dirigido por pruebas**
- ­ƒôØ **Documentaci├│n exhaustiva**

> **Prop├│sito:** Servir como un proyecto de portafolio backend s├│lido para entrevistas t├®cnicas y presentaciones profesionales.

---

## ­ƒº▒ Stack Tecnol├│gico

### **Framework Principal**

- **[NestJS](https://nestjs.com/)** `v11.0` ÔÇö Framework progresivo de Node.js
- **[TypeScript](https://www.typescriptlang.org/)** `v5.7` ÔÇö JavaScript con tipado seguro

### **Base de Datos y ORM**

- **[PostgreSQL](https://www.postgresql.org/)** ÔÇö Base de datos relacional (alojada en [Neon](https://neon.tech/))
- **[TypeORM](https://typeorm.io/)** `v0.3` ÔÇö Mapeo Objeto-Relacional

### **Configuraci├│n y Entorno**

- **[@nestjs/config](https://docs.nestjs.com/techniques/configuration)** `v4.0` ÔÇö Gesti├│n de configuraci├│n
- **ConfigService** ÔÇö Manejo centralizado de variables de entorno

### **Autenticaci├│n y Seguridad** Ô£à

- **JWT** ÔÇö JSON Web Tokens para autenticaci├│n sin estado (implementado)
- **bcrypt** ÔÇö Hash de contrase├▒as con salt (implementado)
- **class-validator** ÔÇö Validaci├│n autom├ítica de DTOs
- **class-transformer** ÔÇö Serializaci├│n y exclusi├│n de datos sensibles
- **Passport.js** ÔÇö Middleware de autenticaci├│n _(planificado)_

### **Servicios de Email** Ô£à

- **[Resend](https://resend.com/)** ÔÇö Servicio de env├¡o de emails transaccionales (implementado)
  - Reset de contrase├▒as con tokens seguros
  - Confirmaci├│n de cambio de contrase├▒a
  - Templates HTML profesionales con personalizaci├│n
  - Integraci├│n con ConfigService

### **Nube e Infraestructura** _(Planificado)_

- **[Azure App Service](https://azure.microsoft.com/es-es/services/app-service/)** ÔÇö Despliegue del backend
- **[AWS S3](https://aws.amazon.com/es/s3/)** ÔÇö Almacenamiento de medios

### **Herramientas de Desarrollo**

- **ESLint** `v9.18` ÔÇö An├ílisis de c├│digo
- **Prettier** `v3.4` ÔÇö Formateo de c├│digo
- **Jest** `v30.0` ÔÇö Framework de testing
- **Git** ÔÇö Control de versiones con flujo de trabajo basado en features

### **Resumen de Dependencias**

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

## ­ƒÅù´©Å Visi├│n General de la Arquitectura

### **Modelo SaaS Multi-Tenant**

```mermaid
graph TB
    subgraph Platform["­ƒÅó Emmott Asset Platform (Propietario de la Plataforma)"]
        API[API Backend NestJS]
    end
    
    subgraph Database["­ƒùä´©Å Base de Datos PostgreSQL (Neon - DB ├Ünica)"]
        subgraph CompanyA["Datos Empresa A"]
            A1[Usuarios - companyId: A]
            A2[Activos - companyId: A]
        end
        
        subgraph CompanyB["Datos Empresa B"]
            B1[Usuarios - companyId: B]
            B2[Activos - companyId: B]
        end
        
        subgraph CompanyC["Datos Empresa C"]
            C1[Usuarios - companyId: C]
            C2[Activos - companyId: C]
        end
    end
    
    API -->|Gestiona Todas las Empresas| Database
    
    style Platform fill:#E0234E,stroke:#fff,stroke-width:2px,color:#fff
    style Database fill:#4169E1,stroke:#fff,stroke-width:2px,color:#fff
    style CompanyA fill:#2ecc71,stroke:#fff,stroke-width:1px
    style CompanyB fill:#3498db,stroke:#fff,stroke-width:1px
    style CompanyC fill:#9b59b6,stroke:#fff,stroke-width:1px
```

**Concepto Clave:** Multi-tenancy l├│gico v├¡a `companyId` ÔÇö todas las empresas comparten la misma base de datos, pero los datos est├ín aislados a nivel de aplicaci├│n.

### **Flujo de Autenticaci├│n** _(Planificado)_

```mermaid
sequenceDiagram
    participant User as Usuario
    participant API as API NestJS
    participant Auth as Servicio Auth
    participant DB as PostgreSQL
    participant JWT as Servicio JWT

    User->>API: POST /auth/login
    API->>Auth: Validar credenciales
    Auth->>DB: Consultar usuario por email
    DB-->>Auth: Retornar datos del usuario
    Auth->>Auth: Verificar contrase├▒a (bcrypt)
    Auth->>JWT: Generar token JWT
    JWT-->>Auth: Retornar token firmado
    Auth-->>API: Retornar token + info usuario
    API-->>User: 200 OK + token JWT
    
    Note over User,JWT: Solicitudes subsecuentes incluyen JWT en headers
    
    User->>API: GET /assets (con JWT)
    API->>JWT: Validar token
    JWT-->>API: Token v├ílido + datos usuario
    API->>DB: Consultar activos (filtrado por companyId)
    DB-->>API: Retornar activos de la empresa
    API-->>User: 200 OK + datos de activos
```

### **Arquitectura de M├│dulos**

```mermaid
graph LR
    subgraph Core["M├│dulos Core"]
        App[M├│dulo App]
        Config[M├│dulo Config]
    end
    
    subgraph Auth["Autenticaci├│n"]
        AuthM[M├│dulo Auth]
        Users[M├│dulo Users]
    end
    
    subgraph Business["L├│gica de Negocio (Planificado)"]
        Companies[M├│dulo Companies]
        Assets[M├│dulo Assets]
        Categories[M├│dulo Categories]
    end
    
    subgraph Infrastructure["Infraestructura"]
        DB[(TypeORM + PostgreSQL)]
        Cloud[Servicios Cloud]
    end
    
    App --> Config
    App --> AuthM
    App --> Users
    AuthM --> Users
    App --> Companies
    App -.Futuro.-> Assets
    App -.Futuro.-> Categories
    
    Users --> DB
    Companies -.-> DB
    Assets -.-> DB
    Categories -.-> DB
    
    Assets -.Futuro.-> Cloud
    
    style Core fill:#E0234E,stroke:#fff,stroke-width:2px,color:#fff
    style Auth fill:#3178C6,stroke:#fff,stroke-width:2px,color:#fff
    style Business fill:#2ecc71,stroke:#fff,stroke-width:2px,color:#fff
    style Infrastructure fill:#4169E1,stroke:#fff,stroke-width:2px,color:#fff
```

### **Decisiones Arquitect├│nicas Clave**

| Decisi├│n                          | Justificaci├│n                                                |
| --------------------------------- | ------------------------------------------------------------ |
| **Base de Datos ├Ünica**           | Modelo SaaS ÔÇö la plataforma es due├▒a de la infraestructura  |
| **Multi-Tenancy L├│gico**          | Aislamiento de datos v├¡a columna `companyId`                |
| **Roles de Plataforma como Enums** | Gesti├│n de roles simple, estable y expl├¡cita                |
| **SSL Habilitado**                | Requerido por Neon, asegura conexiones seguras              |
| **`synchronize: false`**          | Seguro por defecto ÔÇö migraciones manuales                   |
| **Sin Docker**                    | Enfoque en arquitectura, no en contenedorizaci├│n            |

### **Estructura Actual de M├│dulos**

```
src/
Ôö£ÔöÇÔöÇ auth/                           # ­ƒöÉ M├│dulo de Autenticaci├│n JWT Completo
Ôöé   Ôö£ÔöÇÔöÇ dto/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ login.dto.ts            # DTO para login con validaciones
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ register.dto.ts         # DTO para registro de usuarios
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ forgot-password.dto.ts  # ­ƒôº DTO para solicitar reset de contrase├▒a
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ reset-password.dto.ts   # ­ƒöæ DTO para resetear contrase├▒a con token
Ôöé   Ôöé   ÔööÔöÇÔöÇ auth-response.dto.ts    # DTO de respuesta estandarizada
Ôöé   Ôö£ÔöÇÔöÇ strategies/
Ôöé   Ôöé   ÔööÔöÇÔöÇ jwt.strategy.ts         # ­ƒöæ Strategy de Passport para JWT
Ôöé   Ôö£ÔöÇÔöÇ guards/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ jwt-auth.guard.ts       # ­ƒøí´©Å Guard de autenticaci├│n JWT
Ôöé   Ôöé   ÔööÔöÇÔöÇ roles.guard.ts          # ­ƒøí´©Å Guard de roles (RBAC)
Ôöé   Ôö£ÔöÇÔöÇ decorators/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ get-user.decorator.ts   # Ô£¿ Obtener usuario autenticado
Ôöé   Ôöé   ÔööÔöÇÔöÇ roles.decorator.ts      # Ô£¿ Marcar roles requeridos
Ôöé   Ôö£ÔöÇÔöÇ auth.controller.ts          # ­ƒôí Endpoints REST documentados (4 endpoints)
Ôöé   Ôö£ÔöÇÔöÇ auth.service.ts             # ÔÜÖ´©Å L├│gica de autenticaci├│n, JWT y reset
Ôöé   ÔööÔöÇÔöÇ auth.module.ts              # ­ƒôª Configuraci├│n del m├│dulo
Ôöé
Ôö£ÔöÇÔöÇ users/                          # ­ƒæÑ M├│dulo de Gesti├│n de Usuarios
Ôöé   Ôö£ÔöÇÔöÇ dto/
Ôöé   Ôöé   ÔööÔöÇÔöÇ create-user.dto.ts      # DTO con validaciones y Swagger
Ôöé   Ôö£ÔöÇÔöÇ entities/
Ôöé   Ôöé   ÔööÔöÇÔöÇ usuario.entity.ts       # ­ƒùä´©Å Entidad TypeORM con UUID y reset tokens
Ôöé   Ôö£ÔöÇÔöÇ users.controller.ts         # ­ƒôí CRUD con endpoints protegidos
Ôöé   Ôö£ÔöÇÔöÇ users.service.ts            # ÔÜÖ´©Å L├│gica de negocio + bcrypt + reset methods
Ôöé   ÔööÔöÇÔöÇ users.module.ts             # ­ƒôª Configuraci├│n del m├│dulo
Ôöé
Ôö£ÔöÇÔöÇ mail/                           # ­ƒôº M├│dulo de Emails Transaccionales (Resend)
Ôöé   Ôö£ÔöÇÔöÇ templates/
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ reset-password.ts       # ­ƒÄ¿ Template HTML para reset (personalizado)
Ôöé   Ôöé   Ôö£ÔöÇÔöÇ password-changed.ts     # Ô£à Template HTML de confirmaci├│n
Ôöé   Ôöé   ÔööÔöÇÔöÇ welcome.ts              # ­ƒæï Template de bienvenida
Ôöé   Ôö£ÔöÇÔöÇ providers/
Ôöé   Ôöé   ÔööÔöÇÔöÇ resend.provider.ts      # ­ƒô« Cliente Resend con ConfigService
Ôöé   Ôö£ÔöÇÔöÇ mail.service.ts             # ÔÜÖ´©Å L├│gica de env├¡o de emails
Ôöé   Ôö£ÔöÇÔöÇ mail.service.spec.ts        # ­ƒº¬ Tests del servicio de email
Ôöé   ÔööÔöÇÔöÇ mail.module.ts              # ­ƒôª M├│dulo con ConfigModule integrado
Ôöé
├── companies/                      # 🏢 Módulo de Empresas (Tenants)
│   ├── controllers/                # 🎮 Controladores (Core, Billing, Subscription)
│   ├── services/                   # 🧠 Servicios de Negocio
│   ├── entities/                   # 🗄️ Entidades (Company, Billing, Subscription)
│   ├── enums/                      # 📋 Enums seguros (DB-friendly)
│   └── companies.module.ts         # 📦 Definición del módulo
│
Ôö£ÔöÇÔöÇ config/                         # ÔÜÖ´©Å Configuraci├│n
Ôöé   ÔööÔöÇÔöÇ database.config.ts          # Config de TypeORM y PostgreSQL (Neon)
Ôöé
Ôö£ÔöÇÔöÇ main.ts                         # ­ƒÜÇ Bootstrap con Swagger y Validation
ÔööÔöÇÔöÇ app.module.ts                   # ­ƒÅù´©Å M├│dulo ra├¡z de la aplicaci├│n
```

**Caracter├¡sticas Destacadas de la Arquitectura:**

- Ô£à **Separaci├│n de responsabilidades** - Cada capa tiene un prop├│sito espec├¡fico
- Ô£à **DTOs con validaci├│n** - class-validator y class-transformer integrados
- Ô£à **Guards modulares** - Autenticaci├│n y autorizaci├│n desacopladas
- Ô£à **Strategy Pattern** - JWT validation con Passport.js
- Ô£à **Decoradores personalizados** - Simplifica la l├│gica en controllers
- Ô£à **Entidades TypeORM** - Mapeo objeto-relacional con decoradores
- Ô£à **Configuraci├│n centralizada** - Variables de entorno con ConfigService
- Ô£à **Documentaci├│n autom├ítica** - Swagger genera docs desde decoradores
- Ô£à **Email Service** - Resend con templates HTML profesionales
- Ô£à **Seguridad robusta** - Tokens criptogr├íficos, expiraci├│n autom├ítica

---

## ­ƒÜÇ Inicio R├ípido

### **Prerrequisitos**

Antes de comenzar, aseg├║rate de tener instalado lo siguiente:

- **Node.js** `v18+` ([Descargar](https://nodejs.org/))
- **npm** `v9+` (viene con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- Cuenta de **PostgreSQL** en [Neon](https://neon.tech/) (o PostgreSQL local)

---

### **Paso 1: Clonar el Repositorio**

```bash
git clone https://github.com/marceloemmott-dev/emmott-asset-platform-backend.git
cd emmott-asset-platform-backend
```

---

### **Paso 2: Instalar Dependencias**

```bash
npm install
```

Esto instalar├í todos los paquetes requeridos definidos en `package.json`.

---

### **Paso 3: Configurar Variables de Entorno**

Crea un archivo `.env` en el directorio ra├¡z copiando el ejemplo:

```bash
cp .env.example .env
```

Luego edita `.env` con tu configuraci├│n real:

```env
# Configuraci├│n de la Aplicaci├│n
APP_NAME=Emmott Asset Platform
NODE_ENV=development
PORT=3000

# Configuraci├│n de Base de Datos (Neon PostgreSQL)
DATABASE_URL=postgresql://usuario:contrase├▒a@host.neon.tech/database?sslmode=require
```

**C├│mo obtener tu DATABASE_URL de Neon:**

1. Ve a la [Consola de Neon](https://console.neon.tech/)
2. Crea un nuevo proyecto (o usa uno existente)
3. Navega a **Dashboard** ÔåÆ **Connection Details**
4. Copia el **Connection String** (incluye SSL por defecto)
5. P├®galo en tu archivo `.env`

**Ejemplo:**

```env
DATABASE_URL=postgresql://miusuario:micontrase├▒a@ep-cool-name-123456.us-east-2.aws.neon.tech/midb?sslmode=require
```

---

### **Paso 4: Ejecutar la Aplicaci├│n**

#### **Modo Desarrollo** (con hot-reload)

```bash
npm run start:dev
```

El servidor se iniciar├í en `http://localhost:3000`

#### **Modo Producci├│n**

```bash
npm run build
npm run start:prod
```

---

### **Paso 5: Verificar Conexi├│n a la Base de Datos**

Una vez que la aplicaci├│n se inicie, deber├¡as ver:

```
[Nest] 12345  - 12/01/2026, 13:00:00     LOG [TypeOrmModule] Database connection established
[Nest] 12345  - 12/01/2026, 13:00:00     LOG [NestApplication] Nest application successfully started
```

Ô£à **┬íLa conexi├│n a la base de datos est├í verificada y funcionando!**

---

### **Scripts Disponibles**

| Comando                 | Descripci├│n                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run start`         | Iniciar la aplicaci├│n                          |
| `npm run start:dev`     | Iniciar en modo desarrollo (watch mode)        |
| `npm run start:debug`   | Iniciar en modo debug                          |
| `npm run start:prod`    | Iniciar en modo producci├│n                     |
| `npm run build`         | Construir la aplicaci├│n                        |
| `npm run format`        | Formatear c├│digo con Prettier                  |
| `npm run lint`          | Analizar c├│digo con ESLint                     |
| `npm run test`          | Ejecutar pruebas unitarias                     |
| `npm run test:e2e`      | Ejecutar pruebas end-to-end                    |
| `npm run test:cov`      | Ejecutar pruebas con cobertura                 |


---

## ­ƒöî Uso de la API

### **Documentaci├│n Interactiva**

La API cuenta con documentaci├│n Swagger interactiva disponible en:

```
http://localhost:3000/api
```

### **Colecci├│n de Postman**

Importa la colecci├│n `postman_collection.json` en Postman para probar todos los endpoints f├ícilmente.

### **Endpoints Disponibles**

#### **1. Registrar Nuevo Usuario**

**Endpoint:** `POST /auth/register`

**Request:**
```json
{
  "name": "Juan P├®rez",
  "email": "juan.perez@example.com",
  "password": "MiPassword123!",
  "role": "COMPANY_ADMIN"
}
```

**Response (201 Created):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Juan P├®rez",
    "email": "juan.perez@example.com",
    "role": "COMPANY_ADMIN"
  }
}
```

#### **2. Iniciar Sesi├│n**

**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "juan.perez@example.com",
  "password": "MiPassword123!"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Juan P├®rez",
    "email": "juan.perez@example.com",
    "role": "COMPANY_ADMIN"
  }
}
```

#### **3. Crear Usuario (sin JWT)**

**Endpoint:** `POST /users`

**Request:**
```json
{
  "name": "Mar├¡a Garc├¡a",
  "email": "maria.garcia@example.com",
  "password": "SecurePass456!",
  "role": "COMPANY_ADMIN"
}
```

**Response (201 Created):**
```json
{
  "id": "660f9511-f3ac-52e5-b827-557766551111",
  "name": "Mar├¡a Garc├¡a",
  "email": "maria.garcia@example.com",
  "role": "COMPANY_ADMIN",
  "createdAt": "2026-01-12T19:30:00.000Z",
  "updatedAt": "2026-01-12T19:30:00.000Z"
}
```

**Nota:** La contrase├▒a nunca se devuelve en las respuestas (protegida con `@Exclude()`).

#### **4. Buscar Usuario por Email**

**Endpoint:** `GET /users/by-email/:email`

**Ejemplo:** `GET /users/by-email/juan.perez@example.com`

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Juan P├®rez",
  "email": "juan.perez@example.com",
  "role": "COMPANY_ADMIN",
  "createdAt": "2026-01-12T19:25:00.000Z",
  "updatedAt": "2026-01-12T19:25:00.000Z"
}
```

### **Ejemplos con cURL**

#### Registrar Usuario
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan P├®rez",
    "email": "juan.perez@example.com",
    "password": "MiPassword123!",
    "role": "COMPANY_ADMIN"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan.perez@example.com",
    "password": "MiPassword123!"
  }'
```

### **C├│digos de Estado HTTP**

| C├│digo | Descripci├│n                          |
| ------ | ------------------------------------ |
| 200    | OK - Solicitud exitosa               |
| 201    | Created - Recurso creado exitosamente |
| 400    | Bad Request - Error en datos de entrada |
| 401    | Unauthorized - Credenciales inv├ílidas |
| 409    | Conflict - El usuario ya existe       |
| 500    | Internal Server Error                 |

---

## ­ƒôº Sistema de Reset de Contrase├▒a con Resend

El sistema implementa un flujo completo y seguro de recuperaci├│n de contrase├▒as usando [Resend](https://resend.com/) para el env├¡o de emails transaccionales.

### **­ƒöÉ Caracter├¡sticas de Seguridad**

- Ô£à **Tokens aleatorios** de 32 bytes generados con `crypto.randomBytes()`
- Ô£à **Expiraci├│n autom├ítica** de tokens en 1 hora
- Ô£à **Tokens de un solo uso** - se limpian despu├®s de ser utilizados
- Ô£à **No revela informaci├│n** - mismo mensaje si el email existe o no
- Ô£à **Emails de confirmaci├│n** - notifica cambios de contrase├▒a
- Ô£à **Templates profesionales** - HTML personalizados con nombre de usuario

### **­ƒô¿ Emails Enviados**

| Email | Cu├índo | Contenido |
|-------|--------|-----------|
| **Reset Password** | Al solicitar reset | Token de 64 caracteres v├ílido por 1 hora |
| **Password Changed** | Despu├®s del reset | Confirmaci├│n con fecha y advertencia de seguridad |

### **­ƒÜÇ Flujo Completo - Paso a Paso**

#### **Paso 1: Solicitar Reset de Contrase├▒a**

```bash
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Respuesta:**
```json
{
  "message": "If the email exists, a password reset link has been sent"
}
```

**Lo que sucede internamente:**
1. Se busca el usuario por email
2. Se genera token aleatorio: `crypto.randomBytes(32).toString('hex')`
3. Se guarda token y expiraci├│n (now + 1 hora) en base de datos
4. Se env├¡a email via Resend con template personalizado

**Email recibido:**
```
De: onboarding@resend.dev
Asunto: Reset your password - Emmott Asset Platform

Hello [Nombre del Usuario],

You requested to reset your password...

[TOKEN DE 64 CARACTERES]

Valid for 1 hour
```

---

#### **Paso 2: Resetear Contrase├▒a con Token**

```bash
POST /auth/reset-password
Content-Type: application/json

{
  "token": "624572768b94efa1862043813a9df1ff30dba966acdc9975755032e48eba12a9",
  "newPassword": "NuevaContrase├▒a123!"
}
```

**Respuesta:**
```json
{
  "message": "Password has been reset successfully"
}
```

**Lo que sucede internamente:**
1. Se busca usuario por token
2. Se verifica que el token no haya expirado
3. Se hashea nueva contrase├▒a con bcrypt
4. Se actualiza contrase├▒a en base de datos
5. Se limpia token y expiraci├│n
6. **Se env├¡a email de confirmaci├│n** via Resend

**Email de confirmaci├│n recibido:**
```
De: onboarding@resend.dev
Asunto: Password Changed Successfully - Emmott Asset Platform

Hello [Nombre del Usuario],

Ô£à Your password has been successfully changed.

Date: 2026-01-13 10:00:00
Status: Successful

ÔÜá´©Å If you did NOT make this change, contact support immediately.
```

---

#### **Paso 3: Login con Nueva Contrase├▒a**

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "NuevaContrase├▒a123!"
}
```

**Respuesta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "User Name",
    "email": "user@example.com",
    "role": "COMPANY_ADMIN"
  }
}
```

---

### **ÔÜÖ´©Å Configuraci├│n de Resend**

#### **1. Obtener API Key**

1. Crear cuenta en [resend.com](https://resend.com)
2. Verificar dominio (o usar `onboarding@resend.dev` para testing)
3. Generar API Key en Dashboard

#### **2. Configurar Variables de Entorno**

Agregar al archivo `.env`:

```bash
# Email (Resend)
RESEND_API_KEY=re_your_api_key_here
MAIL_FROM=onboarding@resend.dev
```

#### **3. Arquitectura del M├│dulo de Email**

```
src/mail/
Ôö£ÔöÇÔöÇ templates/
Ôöé   Ôö£ÔöÇÔöÇ reset-password.ts          # Template HTML para reset
Ôöé   Ôö£ÔöÇÔöÇ password-changed.ts        # Template HTML para confirmaci├│n
Ôöé   ÔööÔöÇÔöÇ welcome.ts                 # Template de bienvenida
Ôö£ÔöÇÔöÇ providers/
Ôöé   ÔööÔöÇÔöÇ resend.provider.ts         # Cliente de Resend con ConfigService
Ôö£ÔöÇÔöÇ mail.service.ts                # L├│gica de env├¡o de emails
ÔööÔöÇÔöÇ mail.module.ts                 # M├│dulo con ConfigModule importado
```

**Integraci├│n con ConfigService:**
```typescript
// ResendProvider usa ConfigService en lugar de process.env
constructor(private readonly configService: ConfigService) {
  const apiKey = this.configService.get<string>('RESEND_API_KEY');
  this.client = new Resend(apiKey);
  this.mailFrom = this.configService.get<string>('MAIL_FROM');
}
```

---

### **­ƒÄ¿ Templates de Email**

Los templates est├ín dise├▒ados con:
- Ô£à **HTML responsivo** con estilos inline
- Ô£à **Personalizaci├│n** con nombre del usuario
- Ô£à **Dise├▒o profesional** con colores corporativos
- Ô£à **Claridad** en las instrucciones
- Ô£à **Advertencias de seguridad** visibles

**Ejemplo de personalizaci├│n:**
```typescript
// Antes
export const resetPasswordTemplate = (token: string) => `
  <h2>Password Reset Request</h2>
  ...
`;

// Ahora
export const resetPasswordTemplate = (name: string, token: string) => `
  <h2>Hello ${name},</h2>
  <p>You requested to reset your password...</p>
  ...
`;
```

---

### **­ƒº¬ Probar el Sistema**

**Opci├│n 1: Colecci├│n de Postman**

La colecci├│n `postman_collection.json` incluye:
1. Ô£à Registro de usuario
2. Ô£à Login
3. Ô£à Solicitar reset de contrase├▒a
4. Ô£à Resetear con token
5. Ô£à Login con nueva contrase├▒a

**Opci├│n 2: Swagger UI**

1. Abrir `http://localhost:3000/api`
2. Ir a secci├│n "Authentication"
3. Probar endpoints:
   - `POST /auth/forgot-password`
   - `POST /auth/reset-password`

---

### **­ƒôè Diagrama de Flujo**

```mermaid
sequenceDiagram
    participant U as Usuario
    participant API as API Backend
    participant DB as PostgreSQL
    participant R as Resend

    U->>API: POST /auth/forgot-password
    API->>DB: Buscar usuario por email
    DB-->>API: Usuario encontrado
    API->>API: Generar token (32 bytes)
    API->>DB: Guardar token + expiraci├│n
    API->>R: Enviar email con token
    R-->>U: Email recibido
    API-->>U: "Email sent"

    U->>API: POST /auth/reset-password
    API->>DB: Validar token
    DB-->>API: Token v├ílido
    API->>API: Hashear nueva contrase├▒a
    API->>DB: Actualizar password
    API->>DB: Limpiar token
    API->>R: Enviar confirmaci├│n
    R-->>U: Email confirmaci├│n
    API-->>U: "Password reset"

    U->>API: POST /auth/login
    API->>DB: Validar credenciales
    DB-->>API: Credenciales OK
    API-->>U: JWT Token
```

---


## ­ƒôè Estado del Proyecto

### **Ô£à Caracter├¡sticas Completadas**

| Caracter├¡stica                  | Estado      | Descripci├│n                                        |
| ------------------------------- | ----------- | -------------------------------------------------- |
| **Configuraci├│n del Proyecto**  | Ô£à Completo | Proyecto NestJS inicializado con TypeScript        |
| **Conexi├│n a Base de Datos**    | Ô£à Completo | PostgreSQL (Neon) conectado v├¡a TypeORM            |
| **Gesti├│n de Configuraci├│n**    | Ô£à Completo | Variables de entorno con `ConfigService`           |
| **Estructura M├│dulo Auth**      | Ô£à Completo | M├│dulo, servicio y controlador creados             |
| **Modelo de Dominio Usuario**   | Ô£à Completo | Modelo de usuario a nivel de dominio definido      |
| **Persistencia de Usuarios**    | Ô£à Completo | Entidades TypeORM y Repository Pattern             |
| **Documentaci├│n Swagger**       | Ô£à Completo | Documentaci├│n interactiva en `/api`                |
| **Hash de Contrase├▒as**         | Ô£à Completo | Seguridad con bcrypt para usuarios                 |
| **Autenticaci├│n JWT**           | Ô£à Completo | Login y registro con tokens JWT                    |
| **JWT Strategy (Passport)**     | Ô£à Completo | Validaci├│n de tokens con Passport.js               |
| **Guards de Autenticaci├│n**     | Ô£à Completo | JwtAuthGuard y RolesGuard (RBAC)                   |
| **Decoradores Personalizados**  | Ô£à Completo | @GetUser, @Roles para endpoints                    |
| **Endpoints Protegidos**        | Ô£à Completo | Users endpoints con autenticaci├│n y roles          |
| **Forgot Password**             | Ô£à Completo | Reset de contrase├▒a con tokens seguros             |
| **Emails Transaccionales**      | Ô£à Completo | Resend integrado con templates profesionales       |
| **Colecci├│n Postman**           | Ô£à Completo | Testing completo con auto-save de JWT              |
| **Flujo de Trabajo Git**        | Ô£à Completo | Estrategia de branching basada en features         |

### **­ƒôï Caracter├¡sticas Pr├│ximas**

- ­ƒÅó Modelo de dominio de Empresa
- ­ƒôª M├│dulos de Activos y Categor├¡as  
- Ôÿü´©Å Despliegue en Azure
- ­ƒôü Integraci├│n con AWS S3


---

## ­ƒî┐ Flujo de Trabajo Git

Este proyecto sigue un **flujo de trabajo Git profesional basado en features**:

```
main (listo para producci├│n)
  Ôöé
  ÔööÔöÇÔöÇ develop (rama de integraci├│n)
        Ôöé
        Ôö£ÔöÇÔöÇ feature/database-setup Ô£à
        Ôö£ÔöÇÔöÇ feature/auth Ô£à
        Ôö£ÔöÇÔöÇ feature/auth-login ­ƒÜº
        ÔööÔöÇÔöÇ feature/user-persistence ­ƒôï
```

### **Estrategia de Ramas**

| Rama         | Prop├│sito                           |
| ------------ | ----------------------------------- |
| `main`       | C├│digo estable, listo para producci├│n |
| `develop`    | Rama de integraci├│n para features   |
| `feature/*`  | Desarrollo de features aisladas     |

### **Ejemplo de Flujo de Trabajo**

```bash
# Crear una nueva rama de feature
git checkout develop
git pull origin develop
git checkout -b feature/mi-nueva-feature

# Trabajar en tu feature
git add .
git commit -m "feat: implementar mi nueva feature"

# Subir al remoto
git push origin feature/mi-nueva-feature

# Crear un Pull Request a develop
# Despu├®s de la revisi├│n, merge a develop
# Cuando est├® estable, merge develop a main
```

Esto refleja **pr├ícticas de desarrollo en equipo del mundo real**.

---

## ­ƒøú´©Å Roadmap del Proyecto

### **L├¡nea de Tiempo de Desarrollo**

```mermaid
gantt
    title Emmott Asset Platform - Roadmap de Desarrollo
    dateFormat YYYY-MM-DD
    section Fase 1: Fundamentos
    Configuraci├│n Proyecto  :done, p1, 2026-01-01, 2026-01-05
    Conexi├│n Base de Datos  :done, p2, 2026-01-05, 2026-01-08
    Estructura M├│dulo Auth  :done, p3, 2026-01-08, 2026-01-12
    
    section Fase 2: Autenticaci├│n
    Persistencia Usuarios   :active, p4, 2026-01-12, 2026-01-18
    Implementaci├│n JWT      :p5, 2026-01-18, 2026-01-25
    Guards Basados en Roles :p6, 2026-01-25, 2026-02-01
    
    section Fase 3: Caracter├¡sticas Core
    M├│dulo Empresas         :p7, 2026-02-01, 2026-02-10
    M├│dulo Activos          :p8, 2026-02-10, 2026-02-20
    Gesti├│n Categor├¡as      :p9, 2026-02-20, 2026-02-28
    
    section Fase 4: Despliegue Nube
    Despliegue Azure        :p10, 2026-03-01, 2026-03-10
    Integraci├│n AWS S3      :p11, 2026-03-10, 2026-03-15
    Pipeline CI/CD          :p12, 2026-03-15, 2026-03-20
```

### **Fase 1: Fundamentos** Ô£à _Completado_

- [x] Inicializaci├│n del proyecto
- [x] Conexi├│n a base de datos (PostgreSQL/Neon)
- [x] Gesti├│n de configuraci├│n
- [x] Estructura del m├│dulo Auth
- [x] Modelo de dominio de Usuario

### **Fase 2: Autenticaci├│n** Ô£à _Completado_

- [x] Convertir modelos de dominio a entidades TypeORM
- [x] Implementar persistencia de usuarios
- [x] Hash de contrase├▒as (bcrypt)
- [x] Autenticaci├│n JWT (login/registro)
- [x] JWT Strategy con Passport
- [x] Guards basados en roles (RBAC)
- [x] Decoradores personalizados (@GetUser, @Roles)
- [x] Endpoints protegidos con autenticaci├│n
- [x] Documentaci├│n Swagger completa

### **Fase 3: Caracter├¡sticas Core** ­ƒôï _Siguiente_

- [ ] Modelo de dominio de Empresa
- [ ] Operaciones CRUD de Empresa
- [ ] Modelo de dominio de Activo
- [ ] Gesti├│n de Categor├¡as
- [ ] Operaciones CRUD de Activos

### **Fase 4: Despliegue en la Nube** ­ƒôï _Planificado_

- [ ] Despliegue en Azure App Service
- [ ] Integraci├│n con AWS S3 para medios
- [ ] Configuraci├│n basada en entornos
- [ ] Pipeline CI/CD

---

## ­ƒºá Decisiones Arquitect├│nicas

### **┬┐Por qu├® una Base de Datos ├Ünica?**

Las plataformas SaaS t├¡picamente usan una base de datos ├║nica con multi-tenancy l├│gico para eficiencia de costos y mantenimiento m├ís f├ícil.

### **┬┐Por qu├® Multi-Tenancy L├│gico?**

Usar `companyId` para aislamiento de datos es m├ís simple que base-de-datos-por-tenant y escala mejor para SaaS peque├▒o a mediano.

### **┬┐Por qu├® Roles de Plataforma como Enums?**

Los roles a nivel de plataforma (`SUPER_ADMIN`, `COMPANY_ADMIN`) son estables y expl├¡citos. Los roles din├ímicos a nivel de empresa se agregar├ín m├ís adelante.

### **┬┐Por qu├® Sin Docker?**

Este proyecto se enfoca en **arquitectura backend** y **calidad de c├│digo**, no en contenedorizaci├│n. Docker puede agregarse m├ís adelante si es necesario.

### **┬┐Por qu├® Multi-Nube (Azure + AWS)?**

Demuestra escenarios del mundo real donde diferentes proveedores de nube se usan para diferentes servicios (c├│mputo vs. almacenamiento).

---

## ­ƒöù Con├®ctate Conmigo

<div align="center">

### **Marcelo Emmott**

_Desarrollador Backend | Especialista NestJS | Entusiasta de la Nube_

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcelo-emmott-sanchez-75475939b/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/marceloemmott-dev)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/marceloemmott)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://marceloemmott.dev)

**­ƒôº Email:** [emmottmarcelo2026@gmail.com](mailto:emmottmarcelo2026@gmail.com)

</div>

---

## ­ƒôä Licencia

Este proyecto est├í licenciado bajo la **Licencia MIT** ÔÇö ver el archivo [LICENSE](LICENSE) para m├ís detalles.

---

<div align="center">

### Ô£¿ **Construido con intenci├│n, no solo c├│digo**

_Este proyecto demuestra c├│mo piensa un ingeniero backend, no solo c├│mo se escribe c├│digo._

**Cada decisi├│n es intencional, documentada y alineada con pr├ícticas de desarrollo SaaS del mundo real.**

---

**Ô¡É ┬íSi encuentras ├║til este proyecto, considera darle una estrella!**

</div>
