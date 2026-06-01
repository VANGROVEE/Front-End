import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware ini berfungsi sebagai Gatekeeper.
 * Memeriksa keberadaan 'be_token' di cookie untuk memproteksi dashboard.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ambil token dari cookie (sinkron dengan zustand/authService)
  const token = request.cookies.get("be_token")?.value;

  // Tentukan grup halaman
  const isAuthPage = pathname.startsWith("/auth");
  const isDashboardPage = pathname.startsWith("/dashboard");

  // LOGIKA PROTEKSI:

  // A. Jika akses Dashboard tapi TIDAK punya token -> Lemparkan ke Login
  if (isDashboardPage && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("reason", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  // B. Jika sudah LOGIN tapi mencoba akses halaman Auth (Login/Register)
  // Alihkan langsung ke Dashboard agar tidak login dua kali
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // C. Teruskan jika kondisi terpenuhi
  return NextResponse.next();
}

/**
 * Konfigurasi Matcher:
 * Menentukan halaman mana saja yang akan dilewati oleh middleware ini.
 * Kita mengecualikan API, static files, dan gambar untuk performa.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
