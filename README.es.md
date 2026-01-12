<div align="center">

# 🏗️ Emmott Asset Platform — Backend

### Plataforma SaaS Multi-Tenant para Gestión de Activos Empresariales

[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)

**Un proyecto de portafolio backend profesional que demuestra arquitectura SaaS de nivel empresarial**

---

### 🌐 Language / Idioma

[![English](https://img.shields.io/badge/English-Disponible-blue?style=for-the-badge)](./README.md)
[![Español](https://img.shields.io/badge/Español-Activo-green?style=for-the-badge)](./README.es.md)

🇺🇸 **[Read documentation in English](./README.md)**

---

[📖 Documentación](#-tabla-de-contenidos) • [🚀 Inicio Rápido](#-inicio-rápido) • [🏗️ Arquitectura](#-visión-general-de-la-arquitectura) • [🛣️ Roadmap](#-roadmap-del-proyecto)

---

</div>

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Stack Tecnológico](#-stack-tecnológico)
- [Visión General de la Arquitectura](#-visión-general-de-la-arquitectura)
- [Inicio Rápido](#-inicio-rápido)
- [Estado del Proyecto](#-estado-del-proyecto)
- [Flujo de Trabajo Git](#-flujo-de-trabajo-git)
- [Roadmap del Proyecto](#-roadmap-del-proyecto)
- [Decisiones Arquitectónicas](#-decisiones-arquitectónicas)
- [Conéctate Conmigo](#-conéctate-conmigo)

---

## 🎯 Acerca del Proyecto

**Emmott Asset Platform** es una plataforma multi-tenant orientada a empresas para la gestión de compañías, usuarios y activos de manera escalable y segura.

Este repositorio contiene la **API backend**, construida con **NestJS**, siguiendo **principios de arquitectura limpia** y un **flujo de trabajo basado en features**.

### 🏢 Acerca de Emmott Labs

**Emmott Labs** es un contexto profesional de desarrollo de software creado para este proyecto. El objetivo es simular **prácticas de desarrollo SaaS del mundo real**, incluyendo:

- ✅ Decisiones de arquitectura empresarial
- ✅ Flujos de trabajo Git profesionales
- ✅ Estrategias de integración multi-nube
- ✅ Patrones de código listos para producción

### 💡 Filosofía del Proyecto

Esto **no es una simple demo** — es un **backend SaaS realista** construido para demostrar:

- 🎯 **Arquitectura multi-tenant** con aislamiento lógico de datos
- 🔐 **Control de acceso basado en roles** (RBAC)
- 🏗️ **Gestión de configuración limpia** usando variables de entorno
- ☁️ **Infraestructura lista para la nube** (Azure + AWS)
- 📐 Principios de **diseño orientado al dominio**
- 🧪 Enfoque de **desarrollo dirigido por pruebas**
- 📝 **Documentación exhaustiva**

> **Propósito:** Servir como un proyecto de portafolio backend sólido para entrevistas técnicas y presentaciones profesionales.

---

## 🧱 Stack Tecnológico

### **Framework Principal**

- **[NestJS](https://nestjs.com/)** `v11.0` — Framework progresivo de Node.js
- **[TypeScript](https://www.typescriptlang.org/)** `v5.7` — JavaScript con tipado seguro

### **Base de Datos y ORM**

- **[PostgreSQL](https://www.postgresql.org/)** — Base de datos relacional (alojada en [Neon](https://neon.tech/))
- **[TypeORM](https://typeorm.io/)** `v0.3` — Mapeo Objeto-Relacional

### **Configuración y Entorno**

- **[@nestjs/config](https://docs.nestjs.com/techniques/configuration)** `v4.0` — Gestión de configuración
- **ConfigService** — Manejo centralizado de variables de entorno

### **Autenticación y Seguridad** _(En Progreso)_

- **JWT** — JSON Web Tokens para autenticación sin estado
- **bcrypt** — Hash de contraseñas _(planificado)_
- **Passport.js** — Middleware de autenticación _(planificado)_

### **Nube e Infraestructura** _(Planificado)_

- **[Azure App Service](https://azure.microsoft.com/es-es/services/app-service/)** — Despliegue del backend
- **[AWS S3](https://aws.amazon.com/es/s3/)** — Almacenamiento de medios

### **Herramientas de Desarrollo**

- **ESLint** `v9.18` — Análisis de código
- **Prettier** `v3.4` — Formateo de código
- **Jest** `v30.0` — Framework de testing
- **Git** — Control de versiones con flujo de trabajo basado en features

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

## 🏗️ Visión General de la Arquitectura

### **Modelo SaaS Multi-Tenant**

```mermaid
graph TB
    subgraph Platform["🏢 Emmott Asset Platform (Propietario de la Plataforma)"]
        API[API Backend NestJS]
    end
    
    subgraph Database["🗄️ Base de Datos PostgreSQL (Neon - DB Única)"]
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

**Concepto Clave:** Multi-tenancy lógico vía `companyId` — todas las empresas comparten la misma base de datos, pero los datos están aislados a nivel de aplicación.

### **Flujo de Autenticación** _(Planificado)_

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
    Auth->>Auth: Verificar contraseña (bcrypt)
    Auth->>JWT: Generar token JWT
    JWT-->>Auth: Retornar token firmado
    Auth-->>API: Retornar token + info usuario
    API-->>User: 200 OK + token JWT
    
    Note over User,JWT: Solicitudes subsecuentes incluyen JWT en headers
    
    User->>API: GET /assets (con JWT)
    API->>JWT: Validar token
    JWT-->>API: Token válido + datos usuario
    API->>DB: Consultar activos (filtrado por companyId)
    DB-->>API: Retornar activos de la empresa
    API-->>User: 200 OK + datos de activos
```

### **Arquitectura de Módulos**

```mermaid
graph LR
    subgraph Core["Módulos Core"]
        App[Módulo App]
        Config[Módulo Config]
    end
    
    subgraph Auth["Autenticación"]
        AuthM[Módulo Auth]
        Users[Módulo Users]
    end
    
    subgraph Business["Lógica de Negocio (Planificado)"]
        Companies[Módulo Companies]
        Assets[Módulo Assets]
        Categories[Módulo Categories]
    end
    
    subgraph Infrastructure["Infraestructura"]
        DB[(TypeORM + PostgreSQL)]
        Cloud[Servicios Cloud]
    end
    
    App --> Config
    App --> AuthM
    App --> Users
    AuthM --> Users
    App -.Futuro.-> Companies
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

### **Decisiones Arquitectónicas Clave**

| Decisión                          | Justificación                                                |
| --------------------------------- | ------------------------------------------------------------ |
| **Base de Datos Única**           | Modelo SaaS — la plataforma es dueña de la infraestructura  |
| **Multi-Tenancy Lógico**          | Aislamiento de datos vía columna `companyId`                |
| **Roles de Plataforma como Enums** | Gestión de roles simple, estable y explícita                |
| **SSL Habilitado**                | Requerido por Neon, asegura conexiones seguras              |
| **`synchronize: false`**          | Seguro por defecto — migraciones manuales                   |
| **Sin Docker**                    | Enfoque en arquitectura, no en contenedorización            |

### **Estructura Actual de Módulos**

```
src/
├── auth/               # Módulo de autenticación (solo estructura)
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/              # Módulo de gestión de usuarios
│   ├── entities/
│   │   └── usuario.entity.ts  # Modelo de dominio (aún no persistido)
│   ├── users.service.ts
│   └── users.module.ts
├── config/             # Gestión de configuración
│   └── database.config.ts
└── app.module.ts       # Módulo raíz
```

---

## 🚀 Inicio Rápido

### **Prerrequisitos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

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

Esto instalará todos los paquetes requeridos definidos en `package.json`.

---

### **Paso 3: Configurar Variables de Entorno**

Crea un archivo `.env` en el directorio raíz copiando el ejemplo:

```bash
cp .env.example .env
```

Luego edita `.env` con tu configuración real:

```env
# Configuración de la Aplicación
APP_NAME=Emmott Asset Platform
NODE_ENV=development
PORT=3000

# Configuración de Base de Datos (Neon PostgreSQL)
DATABASE_URL=postgresql://usuario:contraseña@host.neon.tech/database?sslmode=require
```

**Cómo obtener tu DATABASE_URL de Neon:**

1. Ve a la [Consola de Neon](https://console.neon.tech/)
2. Crea un nuevo proyecto (o usa uno existente)
3. Navega a **Dashboard** → **Connection Details**
4. Copia el **Connection String** (incluye SSL por defecto)
5. Pégalo en tu archivo `.env`

**Ejemplo:**

```env
DATABASE_URL=postgresql://miusuario:micontraseña@ep-cool-name-123456.us-east-2.aws.neon.tech/midb?sslmode=require
```

---

### **Paso 4: Ejecutar la Aplicación**

#### **Modo Desarrollo** (con hot-reload)

```bash
npm run start:dev
```

El servidor se iniciará en `http://localhost:3000`

#### **Modo Producción**

```bash
npm run build
npm run start:prod
```

---

### **Paso 5: Verificar Conexión a la Base de Datos**

Una vez que la aplicación se inicie, deberías ver:

```
[Nest] 12345  - 12/01/2026, 13:00:00     LOG [TypeOrmModule] Database connection established
[Nest] 12345  - 12/01/2026, 13:00:00     LOG [NestApplication] Nest application successfully started
```

✅ **¡La conexión a la base de datos está verificada y funcionando!**

---

### **Scripts Disponibles**

| Comando                 | Descripción                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run start`         | Iniciar la aplicación                          |
| `npm run start:dev`     | Iniciar en modo desarrollo (watch mode)        |
| `npm run start:debug`   | Iniciar en modo debug                          |
| `npm run start:prod`    | Iniciar en modo producción                     |
| `npm run build`         | Construir la aplicación                        |
| `npm run format`        | Formatear código con Prettier                  |
| `npm run lint`          | Analizar código con ESLint                     |
| `npm run test`          | Ejecutar pruebas unitarias                     |
| `npm run test:e2e`      | Ejecutar pruebas end-to-end                    |
| `npm run test:cov`      | Ejecutar pruebas con cobertura                 |

---

## 📊 Estado del Proyecto

### **✅ Características Completadas**

| Característica                | Estado       | Descripción                                       |
| ----------------------------- | ------------ | ------------------------------------------------- |
| **Configuración del Proyecto** | ✅ Completo  | Proyecto NestJS inicializado con TypeScript       |
| **Conexión a Base de Datos**  | ✅ Completo  | PostgreSQL (Neon) conectado vía TypeORM           |
| **Gestión de Configuración**  | ✅ Completo  | Variables de entorno con `ConfigService`          |
| **Estructura Módulo Auth**    | ✅ Completo  | Módulo, servicio y controlador creados            |
| **Modelo de Dominio Usuario** | ✅ Completo  | Modelo de usuario a nivel de dominio definido     |
| **Flujo de Trabajo Git**      | ✅ Completo  | Estrategia de branching basada en features        |

### **🚧 En Progreso**

- **Autenticación JWT** — Lógica de login y generación de tokens
- **Persistencia de Usuarios** — Convertir modelos de dominio a entidades TypeORM

### **📋 Características Próximas**

- Guards basados en roles (RBAC)
- Modelo de dominio de Empresa
- Módulos de Activos y Categorías
- Despliegue en Azure
- Integración con AWS S3

---

## 🌿 Flujo de Trabajo Git

Este proyecto sigue un **flujo de trabajo Git profesional basado en features**:

```
main (listo para producción)
  │
  └── develop (rama de integración)
        │
        ├── feature/database-setup ✅
        ├── feature/auth ✅
        ├── feature/auth-login 🚧
        └── feature/user-persistence 📋
```

### **Estrategia de Ramas**

| Rama         | Propósito                           |
| ------------ | ----------------------------------- |
| `main`       | Código estable, listo para producción |
| `develop`    | Rama de integración para features   |
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
# Después de la revisión, merge a develop
# Cuando esté estable, merge develop a main
```

Esto refleja **prácticas de desarrollo en equipo del mundo real**.

---

## 🛣️ Roadmap del Proyecto

### **Línea de Tiempo de Desarrollo**

```mermaid
gantt
    title Emmott Asset Platform - Roadmap de Desarrollo
    dateFormat YYYY-MM-DD
    section Fase 1: Fundamentos
    Configuración Proyecto  :done, p1, 2026-01-01, 2026-01-05
    Conexión Base de Datos  :done, p2, 2026-01-05, 2026-01-08
    Estructura Módulo Auth  :done, p3, 2026-01-08, 2026-01-12
    
    section Fase 2: Autenticación
    Persistencia Usuarios   :active, p4, 2026-01-12, 2026-01-18
    Implementación JWT      :p5, 2026-01-18, 2026-01-25
    Guards Basados en Roles :p6, 2026-01-25, 2026-02-01
    
    section Fase 3: Características Core
    Módulo Empresas         :p7, 2026-02-01, 2026-02-10
    Módulo Activos          :p8, 2026-02-10, 2026-02-20
    Gestión Categorías      :p9, 2026-02-20, 2026-02-28
    
    section Fase 4: Despliegue Nube
    Despliegue Azure        :p10, 2026-03-01, 2026-03-10
    Integración AWS S3      :p11, 2026-03-10, 2026-03-15
    Pipeline CI/CD          :p12, 2026-03-15, 2026-03-20
```

### **Fase 1: Fundamentos** ✅ _Actual_

- [x] Inicialización del proyecto
- [x] Conexión a base de datos (PostgreSQL/Neon)
- [x] Gestión de configuración
- [x] Estructura del módulo Auth
- [x] Modelo de dominio de Usuario

### **Fase 2: Autenticación** 🚧 _En Progreso_

- [ ] Convertir modelos de dominio a entidades TypeORM
- [ ] Implementar persistencia de usuarios
- [ ] Autenticación JWT (login/registro)
- [ ] Hash de contraseñas (bcrypt)
- [ ] Guards basados en roles

### **Fase 3: Características Core** 📋 _Planificado_

- [ ] Modelo de dominio de Empresa
- [ ] Operaciones CRUD de Empresa
- [ ] Modelo de dominio de Activo
- [ ] Gestión de Categorías
- [ ] Operaciones CRUD de Activos

### **Fase 4: Despliegue en la Nube** 📋 _Planificado_

- [ ] Despliegue en Azure App Service
- [ ] Integración con AWS S3 para medios
- [ ] Configuración basada en entornos
- [ ] Pipeline CI/CD

---

## 🧠 Decisiones Arquitectónicas

### **¿Por qué una Base de Datos Única?**

Las plataformas SaaS típicamente usan una base de datos única con multi-tenancy lógico para eficiencia de costos y mantenimiento más fácil.

### **¿Por qué Multi-Tenancy Lógico?**

Usar `companyId` para aislamiento de datos es más simple que base-de-datos-por-tenant y escala mejor para SaaS pequeño a mediano.

### **¿Por qué Roles de Plataforma como Enums?**

Los roles a nivel de plataforma (`SUPER_ADMIN`, `COMPANY_ADMIN`) son estables y explícitos. Los roles dinámicos a nivel de empresa se agregarán más adelante.

### **¿Por qué Sin Docker?**

Este proyecto se enfoca en **arquitectura backend** y **calidad de código**, no en contenedorización. Docker puede agregarse más adelante si es necesario.

### **¿Por qué Multi-Nube (Azure + AWS)?**

Demuestra escenarios del mundo real donde diferentes proveedores de nube se usan para diferentes servicios (cómputo vs. almacenamiento).

---

## 🔗 Conéctate Conmigo

<div align="center">

### **Marcelo Emmott**

_Desarrollador Backend | Especialista NestJS | Entusiasta de la Nube_

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcelo-emmott/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/marceloemmott-dev)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/marceloemmott)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://marceloemmott.dev)

**📧 Email:** [marcelo@emmottlabs.com](mailto:marcelo@emmottlabs.com)

</div>

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** — ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

### ✨ **Construido con intención, no solo código**

_Este proyecto demuestra cómo piensa un ingeniero backend, no solo cómo se escribe código._

**Cada decisión es intencional, documentada y alineada con prácticas de desarrollo SaaS del mundo real.**

---

**⭐ ¡Si encuentras útil este proyecto, considera darle una estrella!**

</div>
