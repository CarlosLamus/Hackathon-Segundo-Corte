# Portal Ingeniería

**Frontend:** React + TypeScript + Bootstrap 5 + React Router  
**Backend:** Node + Express + TypeScript + JWT/bcrypt

## Ejecutar
1. Backend:
```
cd backend
npm install
npm run dev
```
Backend en `http://localhost:4000`.

2. Frontend:
```
cd frontend
npm install
npm run dev
```
Frontend en `http://localhost:5173`.

## Login demo
`admin / admin`

## Funcionalidades
- Catálogo interactivo de **Líneas de Profundización** con búsqueda, filtros por área y nivel.
- **Detalle** por línea con pestañas (contenidos, habilidades, recursos) y acordeones.
- **Plan personal**: agrega líneas a tu plan (localStorage).
- API pública `/api/lineas` y `/api/lineas/:slug`.
- Login activo con JWT, CRUD de incidentes protegido.


## Contenidos educativos
- **Glosario** con búsqueda en tiempo real.
- **Curriculum** (ruta de aprendizaje sugerida).
- **Detalle de línea** con **Módulos** (objetivos, lección, ejemplos de código, prácticas) y **Quiz** interactivo con calificación y explicación.
- **Feedback** (formulario que envía a `/api/feedback`).

## Rutas 
- Frontend: `/glossary`, `/curriculum`, `/feedback`.
- Backend: `POST /api/feedback`.
