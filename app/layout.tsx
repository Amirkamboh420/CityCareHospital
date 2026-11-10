import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "CityCare Hospital — Quality Healthcare",
  description: "CityCare Hospital: expert doctors, modern facilities, 24/7 emergency care.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
