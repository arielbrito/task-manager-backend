

```markdown
# Task Manager API

## Descripción del Proyecto

Task Manager API es una aplicación backend diseñada para gestionar tareas de manera eficiente. Está construida utilizando NestJS y Prisma, con autenticación basada en JWT y control de acceso basado en roles.

## Índice

1. [Arquitectura](#arquitectura)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
5. [Pruebas](#pruebas)
6. [Contribuciones](#contribuciones)
7. [Publicación](#publicación)

## Arquitectura

### Tecnologías Utilizadas
- NestJS
- Prisma
- JWT (JSON Web Tokens)
- Swagger
- Jest

### Estructura de la Aplicación
- **src/**: Contiene todo el código fuente del proyecto.
  - **auth/**: Módulo responsable de la autenticación.
  - **users/**: Módulo para la gestión de usuarios y roles.
  - **tasks/**: Módulo de gestión de tareas.
  - **prisma.service.ts**: Servicio que conecta con la base de datos.
  - **main.ts**: Punto de entrada de la aplicación.

## Instalación y Configuración

### Requisitos Previos
- Node.js v14 o superior
- npm
- PostgreSQL

### Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/task-manager-backend.git
   cd task-manager-backend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   ```plaintext
   DATABASE_URL=postgresql://user:password@localhost:5432/mydb
   JWT_SECRET=your_jwt_secret_key
   ```

## Estructura del Proyecto

- **src/auth/**: Lógica de autenticación.
- **src/users/**: Gestión de usuarios y roles.
- **src/tasks/**: Gestión de tareas.
- **src/prisma.service.ts**: Servicio de conexión con la base de datos.

## Ejecución de la Aplicación

### Modo Desarrollo
```bash
npm run start:dev
```

### Modo Producción
```bash
npm run build
npm run start:prod
```

## Pruebas

### Ejecución de Pruebas Unitarias
```bash
npm run test
```

### Pruebas en Modo Watch
```bash
npm run test:watch
```

### Cobertura de Pruebas
```bash
npm run test:cov
```

## Contribuciones

### Guía de Contribución
1. Haz un fork del repositorio.
2. Crea una rama (`feature/nueva-funcionalidad`).
3. Haz commit de tus cambios.
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

### Estilo de Código
- Formateo con Prettier:
  ```bash
  npm run format
  ```
- Linting con ESLint:
  ```bash
  npm run lint
  ```

## Publicación

### Documentación de la API
- Swagger: `http://localhost:3000/api`

---

