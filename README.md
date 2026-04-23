# SHG Investment - ReactJS + NodeJS

Giao diện trang home cho `shginvest.vn` được dựng lại bằng:
- Frontend: React + Vite
- Backend: NestJS + Node.js

## Cấu trúc

- `client/`: giao diện React
- `server/`: API dữ liệu home và server chạy production

## Chạy local (dev)

1. Cài dependencies:

```bash
npm install
npm run install:all
```

2. Chạy cả frontend + backend:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5050/api/home-data`

## Build production

```bash
npm run build
npm run start
```

Frontend build ra `client/dist`; backend phục vụ API riêng.
