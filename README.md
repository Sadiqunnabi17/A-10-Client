# 📚 Fable — Ebook Sharing Platform (Client)

Fable is a modern full-stack ebook sharing platform built to connect passionate readers with talented writers. The platform enables writers to publish and monetize original ebooks, while readers can discover, purchase, and enjoy digital content in a seamless experience.

Designed with a clean UI, secure authentication, role-based access control, and payment integration, Fable demonstrates advanced MERN stack development with production-ready deployment.

---

## 🎯 Project Purpose

Traditional ebook discovery is often limited to marketplaces dominated by established publishers. Fable aims to democratize digital publishing by creating a platform where independent writers can publish ebooks and readers can easily access unique literary content.

This project was developed to demonstrate:

- Full-stack MERN architecture
- Authentication & authorization workflows
- Role-based dashboard systems
- Payment gateway integration
- Production deployment practices
- Scalable frontend architecture using Next.js

---

## ✨ Core Features

### 🔐 Authentication & Security
- Secure registration and login using email/password
- Google OAuth authentication via NextAuth
- JWT-based authorization
- Protected private routes
- Role-based access control (User / Writer / Admin)

### 📚 Ebook Marketplace
- Browse all published ebooks
- Search by title or writer
- Filter by genre and price
- Sort by newest / price ascending / descending
- Responsive ebook grid layout

### 💳 Payment System
- Stripe Checkout integration
- Secure ebook purchasing workflow
- Purchase history tracking
- Automatic access after successful payment

### 👤 Reader Dashboard
- View purchase history
- Access purchased ebooks
- Bookmark favorite books
- Profile management

### ✍️ Writer Dashboard
- Upload new ebooks
- Edit or delete ebooks
- Publish / unpublish content
- View sales history and earnings

### 🛠 Admin Dashboard
- Manage all users
- Change user roles
- Manage all ebooks
- Monitor transactions
- View platform analytics

### 🎨 User Experience
- Smooth animations using Framer Motion
- Skeleton loading states
- Error handling with toast notifications
- Fully responsive design for mobile, tablet, and desktop

---

## 🧱 Tech Stack

### Frontend
- Next.js 15
- React
- Tailwind CSS

### State / Data Handling
- React Context API
- TanStack Query
- Axios

### Authentication
- JWT
- NextAuth
- Google OAuth

### UI / Animation
- Framer Motion
- React Icons
- React Hot Toast

### Payment
- Stripe

---

## 📦 NPM Packages Used

```bash
next
react
tailwindcss
axios
@tanstack/react-query
framer-motion
react-hot-toast
react-icons
next-auth
stripe
```

---

## 🚀 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Sadiqunnabi17/A-10-Client.git
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXTAUTH_URL=your_client_url
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_PUBLIC_KEY=your_stripe_key
```

Run locally:

```bash
npm run dev
```

---

## 🔒 Environment Security

Sensitive credentials such as:
- API keys
- Stripe keys
- OAuth credentials
- Backend URLs

are stored using environment variables and are never hardcoded into the source code.

---

## 📈 Future Improvements

- Dark mode support
- Ebook reader with annotations
- Recommendation engine
- Author verification badges
- Review and rating system

---

## 👨‍💻 Developer

Developed by **Sadiqunnabi Choudhury** as part of a full stack assignment showcasing scalable architecture, secure authentication, and production deployment.