"use client";

import LoginPage from "@/modules/auth/components/pages/LoginPage";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// Pisahkan logic yang menggunakan useSearchParams ke komponen kecil
const LoginLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  useEffect(() => {
    if (reason === "unauthorized") {
      router.replace("/unauthorized");
    }
  }, [reason, router]);

  return null; // Komponen ini hanya untuk menjalankan logic
};

const LoginPageWrapper = () => {
  return (
    <>
      {/* Bungkus logic URL dengan Suspense. 
         Ini akan memperbaiki error "missing-suspense-with-csr-bailout" 
      */}
      <Suspense fallback={null}>
        <LoginLogic />
      </Suspense>

      <LoginPage />
    </>
  );
};

export default LoginPageWrapper;
