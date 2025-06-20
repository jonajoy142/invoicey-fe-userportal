import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoicey - Blockchain Invoice Factoring",
  description:
    "Transform your unpaid invoices into immediate cash flow with our blockchain-powered platform.",
  keywords: "invoice factoring, blockchain, cash flow, funding, invoices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* ✅ Wrap your entire app */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
