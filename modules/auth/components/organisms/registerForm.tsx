"use client";

import { DynamicForm } from "@/components/molecules/DynamicForm";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerFormFields } from "../../const/regiterFiled";
import { useAuth } from "../../hooks/authHooks";
import { registerSchema, RegisterValue } from "../../schemas/auth.schema";

export const RegisterForm = () => {
  const {
    handleRegister,
    isRegisterLoading,
    loginWithGoogle,
    isOauthLoading,
    errors,
  } = useAuth();

  const form = useForm<RegisterValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterValue) => {
    if (handleRegister) {
      handleRegister(data);
    }
  };

  return (
    <div className="space-y-6">
      {errors.register && (
        <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in zoom-in">
          {errors.register}
        </div>
      )}

      <DynamicForm
        form={form}
        fields={registerFormFields}
        onSubmit={onSubmit}
        isSubmitting={isRegisterLoading}
      />

      <Button
        type="button"
        onClick={form.handleSubmit(onSubmit)}
        disabled={isRegisterLoading || isOauthLoading}
        className="w-full h-14 bg-slate-950 hover:bg-green-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 mt-2"
      >
        {isRegisterLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            Buat Akun Sekarang <ArrowRight size={18} />
          </div>
        )}
      </Button>

      <div className="relative flex items-center gap-4 py-2">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-center">
          atau daftar dengan
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => loginWithGoogle()}
        disabled={isRegisterLoading || isOauthLoading}
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
