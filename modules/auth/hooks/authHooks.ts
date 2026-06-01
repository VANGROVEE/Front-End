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

  const handleAuthSuccess = (response: any) => {
    if (response.session && response.user) {
      setAuth(response);
      toast.success("Selamat datang!");
      router.refresh();

      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    }
  };

  const loginMutation = useMutation({
    mutationFn: (values: LoginValue) => authApi.login(values),
    onSuccess: (response) => handleAuthSuccess(response),
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Login gagal"));
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values: RegisterValue) => authApi.register(values),
    onSuccess: (response) => {
      handleAuthSuccess(response);
      // toast.success("Registrasi berhasil");
      // router.push("/auth/login?message=Registrasi berhasil, silakan masuk");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Registrasi gagal"));
    },
  });

  const oauthMutation = useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin({ idToken: idToken }),
    onSuccess: (response) => handleAuthSuccess(response),
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Gagal masuk dengan Google"));
    },
  });

  /**
   * Fungsi untuk memicu Popup Google Supabase
   */
  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      toast.error(
        extractErrorMessage(error, "Terjadi kesalahan saat membuka Google"),
      );
    }
  };

  return {
    handleLogin: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,

    handleRegister: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,

    loginWithGoogle,
    handleOauth: oauthMutation.mutate,
    isOauthLoading: oauthMutation.isPending,

    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      oauthMutation.isPending,

    errors: {
      login: loginMutation.error
        ? extractErrorMessage(loginMutation.error)
        : null,
      register: registerMutation.error
        ? extractErrorMessage(registerMutation.error)
        : null,
      oauth: oauthMutation.error
        ? extractErrorMessage(oauthMutation.error)
        : null,
    },
  };
};
