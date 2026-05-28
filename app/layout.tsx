import type { Metadata } from "next";

import { AuthSyncProvider } from "@/common/providers/authSyncProvider";
import QueryProvider from "@/common/providers/queryProvider";
import { Toaster } from "@/components/ui/sonner";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthListener } from "@/components/molecules/AuthListener";

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
        <Toaster />
        <AuthSyncProvider>
          <QueryProvider>
            <AuthListener />
            {children}
          </QueryProvider>
        </AuthSyncProvider>
      </body>
    </html>
  );
}
