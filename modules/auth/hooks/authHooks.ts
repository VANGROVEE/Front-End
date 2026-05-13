import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { createClient } from "@/lib/supabase/client";
import { LoginValue, RegisterValue } from "../schemas/auth.schema";
import { authApi } from "@/modules/auth/api/authApi";

export const useAuth = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const supabase = createClient();

  const loginMutation = useMutation({
    mutationFn: (values: LoginValue) => authApi.login(values),
    onSuccess: (response, values) => {
      if (response.session) {
        setAuth(response.session, !!values.remember);
        router.push("/dashboard");
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values: RegisterValue) => authApi.register(values),
    onSuccess: () => {
      router.push("/auth/login?message=Registrasi berhasil, silakan masuk");
    },
  });

  const oauthMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    },
  });

  const getErrorMessage = (error: any) => {
    if (!error) return null;
    return (
      error.response?.data?.message || error.message || "Terjadi kesalahan"
    );
  };

  return {
    handleLogin: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    loginError: getErrorMessage(loginMutation.error),
    isLoginSuccess: loginMutation.isSuccess,

    handleRegister: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    registerError: getErrorMessage(registerMutation.error),
    isRegisterSuccess: registerMutation.isSuccess,

    handleOauth: oauthMutation.mutate,
    isOauthLoading: oauthMutation.isPending,
    oauthError: getErrorMessage(oauthMutation.error),

    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      oauthMutation.isPending,
  };
};
