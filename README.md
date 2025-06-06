# 📝 Diary App

A full-stack diary app built with **React + Vite** on the frontend and **Express + MongoDB** on the backend, using a
monorepo structure.

---

## 📜 Project Resources

* 📄 [Tech Spec](https://docs.google.com/document/d/1FO5PcL_R236KUmY901Lc4h92SAoSIxJIAkwF5WplnZo/edit?usp=sharing)
* 🎨 [Figma Design](https://www.figma.com/design/N8Q00w6TLsnGxO5LXaWV52/diaryPrototype?node-id=2-3&t=cDieDvGjqWhkkp8W-1)
* [Trello Board](https://trello.com/b/o56yHNeB/diary)

---

## ⚙️ Development Setup

### 🧹 Prerequisites

* Node.js 18+ (Node 20+ recommended)
* npm
* MongoDB (local or cloud)
* JetBrains WebStorm (optional): [Download WebStorm](https://www.jetbrains.com/webstorm/download/#section=mac)

---

### 📆 Install Dependencies

From the root of the project:

```bash
npm install
```

This installs all dependencies across the monorepo (`frontend` + `backend`).

---

## 🔐 Environment Variables

### Frontend (`packages/react-frontend`)

Create a `.env` file:

```env
VITE_API_BASE_URL= ?
```

### Backend (`packages/express-backend`)

Create a `.env` file:

```env
PORT= ??
```

---

## 🧑‍💼 Running the App Locally

### Start the backend:

```bash
npm run dev -w ./packages/express-backend
```

Runs the Express server with `nodemon`.

### Start the frontend:

```bash
npm run dev -w packages/react-frontend
```

Runs the React frontend using Vite dev server.

---

## 📊 Testing

### Frontend tests (Jest + React Testing Library):

```bash
npm test -w packages/react-frontend
```
Coverage Report:
<img width="804" alt="Screenshot 2025-06-06 at 11 59 13 AM" src="https://github.com/user-attachments/assets/dd0f2dc9-dd34-4983-b2fd-7aa7faa3904d" />


### Backend tests (Jest + Mockingoose):

```bash
npm test -w packages/express-backend
```

### Fast backend mock test:

```bash
npm run mock -w packages/express-backend
```

> `mock` tests are \~4x faster due to skipping full DB setup.

### End-to-end tests (Cypress):

```bash
npx cypress open
```

---

## 🧹Formatting

### Auto-format all files:

```bash
npm run format
```

### Style Guides

* [React Style Guide (Airbnb)](https://airbnb.io/javascript/react/)
* [TypeScript Style Guide (Google)](https://google.github.io/styleguide/tsguide.html)

---

## 🚀 Deployment & CI/CD

### GitHub Actions

* Runs `eslint`, `prettier`, and tests on push and PR
* Automatically deploys frontend to **Azure Static Web Apps**

### Azure Deployment Configuration

* App root: `packages/react-frontend`
* Build command: `npm run build`
* Output directory: `dist`

Make sure to set your Azure token as a GitHub Actions secret:

```env
AZURE_STATIC_WEB_APPS_API_TOKEN
```

---

## ✅ Onboarding Checklist

* [ ] Clone the repo
* [ ] Run `npm install`
* [ ] Create `.env` files (frontend and backend)
* [ ] Start the backend (`npm run backend`)
* [ ] Start the frontend (`npm run dev -w packages/react-frontend`)
* [ ] Run tests (`npm test -w ...`)
* [ ] Run linter/formatter (`npm run lint`, `npm run format`)
* [ ] Commit and push — CI/CD will run automatically

---

```
```
