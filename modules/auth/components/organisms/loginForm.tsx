"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/authHooks";
import { loginSchema, LoginValue } from "../../schemas/auth.schema";
import { DynamicForm } from "@/components/molecules/DynamicForm";
import { loginFormFields } from "../../const/loginField";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const {
    handleLogin,
    isLoginLoading,
    loginError,
    handleOauth,
    isOauthLoading,
  } = useAuth();

  const form = useForm<LoginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = (data: LoginValue) => {
    handleLogin(data);
  };

  return (
    <div className="space-y-6">
      {loginError && (
        <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in zoom-in">
          {loginError}
        </div>
      )}

      <DynamicForm
        id="login-form"
        form={form}
        fields={loginFormFields}
        onSubmit={onSubmit}
        isSubmitting={isLoginLoading}
      />

      <Button
        type="button"
        onClick={form.handleSubmit(onSubmit)}
        disabled={isLoginLoading || isOauthLoading}
        className="w-full h-14 bg-slate-950 hover:bg-green-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-200"
      >
        {isLoginLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            Masuk Sekarang <ArrowRight size={18} />
          </div>
        )}
      </Button>

      <div className="relative flex items-center gap-4 py-2">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
          atau masuk dengan
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => handleOauth()}
        disabled={isLoginLoading || isOauthLoading}
        className="w-full h-14 bg-white border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
      >
        {isOauthLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
        ) : (
          <>
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              className="shrink-0"
            >
              <path
                fill="#FFC107"
                d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.5 39.5 16.3 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"
              />
            </svg>
            <span className="text-sm">Google Account</span>
          </>
        )}
      </Button>
    </div>
  );
};
