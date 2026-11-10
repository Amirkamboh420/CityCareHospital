# CityCare Hospital — Hospital Management Website

Next.js 14 (App Router) + PostgreSQL + Prisma. Built for Muhammad Amir.

## Quick Start (apne PC par)

**Pehle ye 2 cheezein install karo:**
1. **Node.js LTS (18+)** — nodejs.org se
2. **PostgreSQL 16/17** — postgresql.org/download se (install ke waqt jo postgres password rakho, yaad rakhna)

**Phir database + user banao** (pgAdmin ke Query Tool mein ya psql mein ye SQL chalao):

```sql
CREATE USER hospital WITH PASSWORD 'hospital123';
CREATE DATABASE hospitaldb OWNER hospital;
```

> Zaroori: user ka naam `hospital` aur password `hospital123` hi rakho, kyunke `.env` file mein `DATABASE_URL` isi hisaab se set hai.

**Phir project folder mein:**

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open http://localhost:3000

> Note: `.env` mein jo `JWT_SECRET` hai wo sirf local testing ke liye hai. Agar website kabhi online deploy karo to usay nayi random value se badal dena.

## Demo Accounts

| Role         | Email                  | Password  |
|--------------|------------------------|-----------|
| Admin        | admin@citycare.com     | admin123  |
| Doctor       | doctor1@citycare.com   | doc123    |
| Receptionist | recep@citycare.com     | recep123  |
| Patient      | patient1@citycare.com  | pat123    |

Doctors 2–5 use doctor2@citycare.com … doctor5@citycare.com (password doc123).
Patients 2–6 use patient2@citycare.com … patient6@citycare.com (password pat123).

## Features

- **Public site**: landing, about, services, doctors, contact pages
- **Auth**: patient self-registration, bcrypt-hashed passwords, JWT in HTTP-only cookie (jose), role-based route guards via middleware
- **Admin** (`/admin`): dashboard with stats + revenue chart, doctors CRUD, patients table, appointments with status control, users list
- **Doctor** (`/doctor`): today's appointments, appointment detail, write/edit prescriptions, patient history
- **Receptionist** (`/reception`): book appointments (existing patient or quick-register), today's list with status updates, patient search
- **Patient** (`/patient`): upcoming/past appointments, book with doctor + slot picker, prescriptions, profile

## Tech

- Next.js 14 App Router, TypeScript, custom CSS (no Tailwind)
- Prisma ORM + PostgreSQL
- bcryptjs + jose (JWT sessions)
