import { createClient } from "@/lib/supabase/server";
import { authApi } from "@/modules/auth/api/authApi"; // Import api Anda
import { NextResponse } from "next/server";

// ... imports
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      try {
        /**
         * PERBAIKAN: Supabase exchangeCode memberikan session.
         * Jika backend Anda menggunakan supabase.auth.signInWithIdToken,
         * ia butuh 'id_token', bukan 'access_token'.
         */
        await authApi.googleLogin({
          idToken: data.session.access_token, // Pastikan backend memverifikasi ini sebagai session token
        });

        const response = NextResponse.redirect(`${origin}${next}`);

        // Set cookie agar Middleware Next.js mengizinkan akses
        response.cookies.set("be_token", data.session.access_token, {
          path: "/",
          httpOnly: false, // Dibutuhkan untuk Zustand & Axios
          secure: true, // WAJIB TRUE: Saat deploy (HTTPS). Cookie hanya dikirim lewat koneksi aman.
          sameSite: "lax", // Melindungi dari serangan CSRF (Cross-Site Request Forgery).
          maxAge: 60 * 60 * 24 * 7, // 7 hari
        });

        return response;
      } catch (err: any) {
        console.error("Backend Sync Error:", err.response?.data || err.message);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?reason=auth-failed`);
}
