"use client";

import LoginPage from "@/modules/auth/components/pages/LoginPage";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoginPageWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  useEffect(() => {
    if (reason === "unauthorized") {
      router.replace("/unauthorized");
    }
  }, [reason, router]);

  return <LoginPage />;
};

export default LoginPageWrapper;
