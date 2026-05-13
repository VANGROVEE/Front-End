import type { Metadata } from "next";

import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/common/providers/queryProvider";
import { AuthSyncProvider } from "@/common/providers/authSyncProvider";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vangrove App",
  description: "Mangrove Agri-tech Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${jakartaSans.className}`}>
        <AuthSyncProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthSyncProvider>
      </body>
    </html>
  );
}
