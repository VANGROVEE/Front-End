import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("be_token")?.value;

  const { pathname, searchParams } = request.nextUrl;

  // Mengelompokkan path
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/auth");
  const isRscRequest = searchParams.has("_rsc");

  // 1. Proteksi Halaman Dashboard: Jika tidak ada token, redirect ke login
  if (isDashboardPage && !token) {
    if (isRscRequest) {
      return new NextResponse(null, { status: 401 });
    }

    const url = new URL("/auth/login", request.url);
    url.searchParams.set("reason", "unauthorized");
    return NextResponse.redirect(url);
  }

  // 2. Proteksi Halaman Auth: Jika sudah login, redirect ke dashboard
  // Logika ini otomatis mencakup /auth/login, /auth/register, dll.
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. (Opsional) Jika user akses root "/" redirect ke dashboard jika sudah login
  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
