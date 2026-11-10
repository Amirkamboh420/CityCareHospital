import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hash(pw: string) {
  return bcrypt.hash(pw, 10);
}

async function main() {
  console.log("Seeding CityCare Hospital...");

  // Clean existing data
  await prisma.invoice.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  // Admin
  await prisma.user.create({
    data: { name: "Hospital Admin", email: "admin@citycare.com", password: await hash("admin123"), role: Role.ADMIN },
  });

  // Receptionist
  await prisma.user.create({
    data: { name: "Sara Reception", email: "recep@citycare.com", password: await hash("recep123"), role: Role.RECEPTIONIST },
  });

  // Doctors
  const doctorSpecs = [
    { name: "Dr. Ahmed Khan", email: "doctor1@citycare.com", specialty: "Cardiology", qualification: "MBBS, FCPS (Cardiology)", fee: 3000, schedule: "Mon–Fri, 9am–2pm" },
    { name: "Dr. Fatima Malik", email: "doctor2@citycare.com", specialty: "Orthopedics", qualification: "MBBS, MS (Ortho)", fee: 2500, schedule: "Mon–Sat, 10am–4pm" },
    { name: "Dr. Bilal Ahmed", email: "doctor3@citycare.com", specialty: "Pediatrics", qualification: "MBBS, DCH", fee: 2000, schedule: "Mon–Fri, 11am–5pm" },
    { name: "Dr. Ayesha Raza", email: "doctor4@citycare.com", specialty: "Dermatology", qualification: "MBBS, FCPS (Derm)", fee: 2500, schedule: "Tue–Sat, 9am–3pm" },
    { name: "Dr. Usman Tariq", email: "doctor5@citycare.com", specialty: "Neurology", qualification: "MBBS, FCPS (Neuro)", fee: 3500, schedule: "Mon–Thu, 10am–2pm" },
  ];
  const doctors = [];
  for (const d of doctorSpecs) {
    const user = await prisma.user.create({
      data: { name: d.name, email: d.email, password: await hash("doc123"), role: Role.DOCTOR },
    });
    const doc = await prisma.doctor.create({
      data: { userId: user.id, specialty: d.specialty, qualification: d.qualification, fee: d.fee, schedule: d.schedule },
    });
    doctors.push(doc);
  }

  // Patients
  const patientSpecs = [
    { name: "Ali Raza", email: "patient1@citycare.com", phone: "0300-1111111", dob: "1990-05-12", gender: "Male", bloodGroup: "O+", address: "12 Main Road, Faisalabad" },
    { name: "Sana Iqbal", email: "patient2@citycare.com", phone: "0300-2222222", dob: "1985-08-22", gender: "Female", bloodGroup: "A+", address: "45 Gulberg, Lahore" },
    { name: "Hassan Javed", email: "patient3@citycare.com", phone: "0300-3333333", dob: "1978-01-30", gender: "Male", bloodGroup: "B+", address: "78 Model Town, Faisalabad" },
    { name: "Maria Siddiqui", email: "patient4@citycare.com", phone: "0300-4444444", dob: "1995-11-05", gender: "Female", bloodGroup: "AB+", address: "23 DHA, Karachi" },
    { name: "Omar Farooq", email: "patient5@citycare.com", phone: "0300-5555555", dob: "2000-03-17", gender: "Male", bloodGroup: "O-", address: "9 Satellite Town, Rawalpindi" },
    { name: "Hina Shahid", email: "patient6@citycare.com", phone: "0300-6666666", dob: "1988-07-09", gender: "Female", bloodGroup: "A-", address: "56 Johar Town, Lahore" },
  ];
  const patients = [];
  for (const p of patientSpecs) {
    const user = await prisma.user.create({
      data: { name: p.name, email: p.email, password: await hash("pat123"), role: Role.PATIENT },
    });
    const pat = await prisma.patient.create({
      data: { userId: user.id, phone: p.phone, dob: p.dob, gender: p.gender, bloodGroup: p.bloodGroup, address: p.address },
    });
    patients.push(pat);
  }

  // Appointments (12 across statuses)
  const apptSpecs = [
    { p: 0, d: 0, date: "2026-10-14", time: "10:00 AM", reason: "Chest pain and shortness of breath", status: "Scheduled" },
    { p: 1, d: 2, date: "2026-10-14", time: "11:30 AM", reason: "Child fever for 3 days", status: "Scheduled" },
    { p: 2, d: 1, date: "2026-10-14", time: "02:00 PM", reason: "Knee pain after injury", status: "Scheduled" },
    { p: 3, d: 3, date: "2026-10-15", time: "09:30 AM", reason: "Skin rash on arms", status: "Scheduled" },
    { p: 4, d: 4, date: "2026-10-15", time: "10:00 AM", reason: "Frequent headaches and dizziness", status: "Scheduled" },
    { p: 5, d: 0, date: "2026-10-13", time: "10:00 AM", reason: "Blood pressure follow-up", status: "Completed" },
    { p: 0, d: 2, date: "2026-10-12", time: "12:00 PM", reason: "General checkup", status: "Completed" },
    { p: 1, d: 3, date: "2026-10-11", time: "09:00 AM", reason: "Acne treatment review", status: "Completed" },
    { p: 2, d: 4, date: "2026-10-10", time: "11:00 AM", reason: "Migraine consultation", status: "Completed" },
    { p: 3, d: 1, date: "2026-10-16", time: "03:00 PM", reason: "Back pain", status: "Scheduled" },
    { p: 4, d: 0, date: "2026-10-09", time: "10:30 AM", reason: "ECG review", status: "Cancelled" },
    { p: 5, d: 2, date: "2026-10-17", time: "01:00 PM", reason: "Vaccination", status: "Scheduled" },
  ];
  const appointments = [];
  for (const a of apptSpecs) {
    const appt = await prisma.appointment.create({
      data: {
        patientId: patients[a.p].id,
        doctorId: doctors[a.d].id,
        date: a.date,
        time: a.time,
        reason: a.reason,
        status: a.status,
      },
    });
    appointments.push(appt);
  }

  // Prescriptions (3, on completed appointments)
  const rxSpecs = [
    { a: 5, diagnosis: "Hypertension Stage 1", medicines: "Amlodipine 5mg — 1 tablet daily (morning)\nLosartan 50mg — 1 tablet daily (evening)", notes: "Reduce salt intake. Recheck BP after 2 weeks." },
    { a: 7, diagnosis: "Moderate acne vulgaris", medicines: "Benzoyl Peroxide 5% gel — apply nightly\nDoxycycline 100mg — 1 capsule daily for 14 days", notes: "Avoid sun exposure. Follow up in 3 weeks." },
    { a: 8, diagnosis: "Migraine without aura", medicines: "Sumatriptan 50mg — at onset of migraine\nPropranolol 40mg — 1 tablet twice daily (preventive)", notes: "Maintain sleep diary. Avoid triggers." },
  ];
  for (const r of rxSpecs) {
    await prisma.prescription.create({
      data: {
        appointmentId: appointments[r.a].id,
        diagnosis: r.diagnosis,
        medicines: r.medicines,
        notes: r.notes,
      },
    });
  }

  console.log("Seed complete: 1 admin, 1 receptionist, 5 doctors, 6 patients, 12 appointments, 3 prescriptions.");

  // Invoices (some paid across last 7 days for the revenue chart)
  const invSpecs = [
    { a: 5, days: 6, status: "Paid", extra: [{ desc: "Blood test (CBC)", amount: 1200 }] },
    { a: 7, days: 4, status: "Paid", extra: [] },
    { a: 8, days: 2, status: "Paid", extra: [{ desc: "MRI Brain", amount: 15000 }] },
    { a: 6, days: 5, status: "Paid", extra: [{ desc: "X-Ray chest", amount: 1800 }] },
    { a: 0, days: 0, status: "Unpaid", extra: [] },
    { a: 1, days: 0, status: "Unpaid", extra: [{ desc: "Urine test", amount: 800 }] },
  ];
  for (const s of invSpecs) {
    const appt = appointments[s.a];
    const doc = doctors.find((d) => d.id === appt.doctorId)!;
    const items = [{ desc: `Consultation — ${doc.specialty}`, amount: doc.fee }, ...s.extra];
    const total = items.reduce((x, i) => x + i.amount, 0);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - s.days);
    await prisma.invoice.create({
      data: {
        appointmentId: appt.id,
        patientId: appt.patientId,
        items,
        total,
        status: s.status,
        createdAt,
      },
    });
  }
  console.log("Seeded 6 invoices (4 paid).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
