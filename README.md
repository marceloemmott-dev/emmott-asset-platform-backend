# Emmott Asset Platform - Backend

Plataforma SaaS Enterprise para gestión de activos digitales.

## 🚀 Arquitectura Modular

El proyecto sigue una arquitectura modular estricta basada en Domain-Driven Design (DDD) y Principios SOLID.

### Módulos Principales

| Módulo | Descripción | Documentación |
|--------|-------------|---------------|
| **Auth** | Autenticación y Autorización (JWT, Roles) | *En progreso* |
| **Users** | Gestión de usuarios y perfiles | *En progreso* |
| **Companies** | Gestión de tenants (empresas), facturación y planes | [`docs/ENTITIES/COMPANIES.md`](docs/ENTITIES/COMPANIES.md) |
| **Assets** | Gestión de activos digitales | *En desarrollo* |

## 🛠 Stack Tecnológico

- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL + TypeORM
- **Auth:** Passport + JWT
- **Documentation:** Swagger (OpenAPI)

## 📋 Prerrequisitos

- Node.js v18+
- PostgreSQL
- Docker (Opcional)

## ⚡ Quick Start

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Configurar entorno**
   Copia el archivo `.env.example` a `.env` y configura tus credenciales de base de datos.
   ```bash
   cp .env.example .env
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run start:dev
   ```

4. **Acceder a la API**
   - API: `http://localhost:3000`
   - Swagger Docs: `http://localhost:3000/api`

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 🔄 Colección Postman

En la raíz del proyecto encontrarás el archivo `postman_collection.json` actualizado para importar en Postman y probar todos los endpoints.
