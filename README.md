# Calendar App

Una aplicación web construida con **Next.js** y **Express** que permite la autenticación de usuarios y la gestión completa (CRUD) de eventos personales.

---

## 🧩 Tecnologías utilizadas

- **Frontend**: Next.js (React 19), TypeScript, Axios
- **Backend**: Express.js, TypeScript, JWT, CORS
- **Autenticación**: JWT
- **Testing & Utilidades**: Jest, Postman

---

## 🚀 Instalación

```bash
# Clona el repositorio
git clone https://github.com/sinaykevin/PixelEventos_CRUD.git
cd calendar-app

# Instala las dependencias del frontend
cd frontend
npm install

# Instala las dependencias del backend
cd ../backend
npm install
```

---

## ▶️ Ejecución

```bash
# Backend (Puerto 4000)
cd backend
npm run dev

# Frontend (Puerto 3000)
cd ../frontend
npm run dev
```

---

## 🔐 Autenticación

- Inicio de sesión vía `POST /auth/login`:
```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

- Retorna un `token` que debe usarse en las cabeceras `Authorization` como `Bearer <token>`.

---

## 🗂️ Funcionalidades

### Login
![Login](https://github.com/user-attachments/assets/dd1d6d7e-0775-4ee9-964f-b9da3756c08b)

---

### Listado de Eventos
![Consulta en Postman - Existencia de Eventos](https://github.com/user-attachments/assets/06f12569-d918-4463-80dd-b442be183573)

---

### Crear Evento
![Crear un nuevo evento](https://github.com/user-attachments/assets/f9822cc0-67d1-47bb-bb1f-2131ff74019d)

---

### Evento Creado Correctamente
![Evento Creado](https://github.com/user-attachments/assets/4899a7f0-a295-437a-9904-625e94f99d97)

---

### Verificación con Postman

#### ✅ Token funcional
![Funcionalidad de la API y del TOKEN ](https://github.com/user-attachments/assets/6acf0cfc-a6f2-4600-aec7-e35bb7f171c6)

#### ❌ Token inválido
![Consulta de Eventos](https://github.com/user-attachments/assets/7411240f-b07a-402c-abd0-52cf83d40fcd)

---

## 📁 Estructura del Proyecto

```
calendar-app/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── routes/
│       └── ...
├── frontend/
│   ├── pages/
│   │   ├── events/
│   │   ├── login.tsx
│   │   └── ...
│   ├── context/
│   ├── utils/
│   └── ...
```

---

## 📌 Notas

- Asegúrate que `JWT_SECRET` en el backend coincida con tu configuración.
- Las rutas protegidas requieren token válido en la cabecera.
- Los eventos pueden crearse, editarse, eliminarse y listarse con paginación y búsqueda.

---

## 🧑‍💻 Autor

Desarrollado por Kevin Sinay como prueba técnica.

---

## 📝 Licencia

MIT
