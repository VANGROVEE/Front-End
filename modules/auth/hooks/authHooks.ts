"use client";

import { useAuthStore } from "@/common/stores/use-auth-store";
import { extractErrorMessage } from "@/common/utils/error";
import { createClient } from "@/lib/supabase/client";
import { authApi } from "@/modules/auth/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginValue, RegisterValue } from "../schemas/auth.schema";

export const useAuth = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const supabase = createClient();

  const loginMutation = useMutation({
    mutationFn: (values: LoginValue) => authApi.login(values),
    onSuccess: async (response, values) => {
      if (response.session && response.user) {
        setAuth(response);

        toast.success("Selamat datang kembali!");

        router.refresh();

        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values: RegisterValue) => authApi.register(values),
    onSuccess: () => {
      toast.success("Registrasi berhasil");
      router.push("/auth/login?message=Registrasi berhasil, silakan masuk");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Registrasi gagal"));
    },
  });

  const oauthMutation = useMutation({
    mutationFn: async () => {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) throw error;
    },
  });

  return {
    handleLogin: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error
      ? extractErrorMessage(loginMutation.error)
      : null,
    isLoginSuccess: loginMutation.isSuccess,

    handleRegister: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    registerError: registerMutation.error
      ? extractErrorMessage(registerMutation.error)
      : null,
    isRegisterSuccess: registerMutation.isSuccess,

    handleOauth: oauthMutation.mutate,
    isOauthLoading: oauthMutation.isPending,
    oauthError: oauthMutation.error
      ? extractErrorMessage(oauthMutation.error)
      : null,

    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      oauthMutation.isPending,
  };
};
