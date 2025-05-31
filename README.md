# Clutch Auto Sales 🚗

Clutch Auto Sales is a professional full-stack car dealership website that lets users browse and filter vehicles, submit contact and financing forms, and view detailed car listings. Admins can securely manage the inventory, view messages, and handle financing requests through a protected dashboard.

---

## 🌐 Live Demo

👉

---

## ⚙️ Features

### 🚘 User-Facing Pages

- Modern landing page with featured vehicles
- Inventory page with search, filter, and sort
- Car details page with gallery and key features
- Responsive Contact and Financing forms

### 🔒 Admin Dashboard

- Secure JWT-based login
- Add, edit, and delete car listings
- View and delete contact form submissions
- View and delete financing requests
- Supabase Storage integration for image uploads and deletions

---

## 🧰 Tech Stack

**Frontend**

- React 19
- React Router DOM 7
- Tailwind CSS
- Axios
- Lucide React Icons
- Vite

**Backend**

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Supabase (for image storage)
- JWT (for authentication)

---

## 🗃 Database Models

```prisma
model Car {
  id             Int      @id @default(autoincrement())
  make           String
  model          String
  style          String
  year           Int
  price          Float
  mileage        Int
  description    String
  transmission   String
  drivetrain     String
  fuelType       String
  exteriorColor  String
  interiorColor  String
  engine         String
  vin            String
  features       String
  imageUrls      String[]
  createdAt      DateTime @default(now())
}

model ContactForm {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String
  phone     String
  message   String
  createdAt DateTime @default(now())
}

model FinancingRequest {
  id           Int      @id @default(autoincrement())
  firstName    String
  lastName     String
  email        String
  phone        String
  income       String
  employment   String
  creditScore  String
  message      String
  createdAt    DateTime @default(now())
}
```

---

## 🚀 Deployment

Both frontend and backend are deployed and running in production.

> You can still run the project locally for development or testing purposes.

### Optional: Local Development Setup

```bash
git clone https://github.com/nzerroua/clutch-auto-sales.git
cd clutch-auto-sales
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_public_anon_key
```

Then run:

```bash
npm run dev
```

---

## 🔐 Admin Access

Use the login form on the admin dashboard to authenticate. Token is stored in `localStorage` and used to access protected routes.

---

## 🙌 Author

Made by [Nassim Zerrouak](https://github.com/nzerroua)
