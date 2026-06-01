import type { Metadata } from "next";

import QueryProvider from "@/common/providers/queryProvider";
import { AuthListener } from "@/components/molecules/AuthListener";
import { Toaster } from "@/components/ui/sonner";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  icons: {
    icon: "/img/logo.png",
    apple: "/img/logo.png",
  },
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

        <QueryProvider>
          <AuthListener />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
