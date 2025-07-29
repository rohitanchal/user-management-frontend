# 🌐 User Management Frontend (Angular Standalone + RxJS)

This is the **frontend** of a full-stack role-based user management system built using **Angular Standalone Components** and **RxJS**, designed to work seamlessly with a Node.js backend.

> 🔐 Supports secure login, role-based access (admin/user), and real-time reactive patterns using RxJS.

---

## ✨ Features

- ✅ Angular Standalone Components (v17+)
- 🔐 JWT-based Login & Logout
- 🔒 Route protection with `AuthGuard`
- 🧠 Full User CRUD interface for Admins
- 💡 RxJS for reactive logic and state flow
- 🧰 HTTP Interceptor for secure API calls
- 🎨 Modern responsive UI using Bootstrap
- 🚀 Built for scalability (millions of users)

---

## 📁 Project Structure

src/
├── app/
│ ├── services/ → API & Auth logic
│ ├── guards/ → AuthGuard (Role Protected)
│ ├── components/ → login/, users/ (CRUD)
│ ├── app.routes.ts → Angular Standalone Routing
│ └── app.component.ts → Root component


---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/user-management-frontend.git
cd user-management-frontend
npm install

▶️ Run the Dev Server
ng serve


Open your browser at: http://localhost:4200
The app will auto-reload when you change any source files.

🔧 Build for Production
bash
Copy
Edit
ng build
This will build the app into the dist/ directory with optimizations.

✅ Login Credentials (Sample)
Role	Email	Password
Admin	admin@example.com	123456
User	user@example.com	123456

📚 Technologies Used
Angular 17+

RxJS

Bootstrap 5

JWT

TypeScript

📦 Backend
This frontend connects to the backend available at:
👉 user-management-backend

📄 License
MIT © [Your Name or Organization]

yaml
Copy
Edit

---

Let me know, Boss, if you also want the **backend README.md** or you want me to auto-generate both as downloadable `.md` files.

