import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  
  const token = request.cookies.get("be_token")?.value;

  const { pathname, searchParams } = request.nextUrl;
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/auth");
  const isRscRequest = searchParams.has("_rsc");

  
  if (!token && isDashboardPage) {
    if (isRscRequest) {
      return new NextResponse(null, { status: 401 });
    }

    const url = new URL("/auth/login", request.url);
    url.searchParams.set("reason", "unauthorized");
    return NextResponse.redirect(url);
  }

  
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  
  return NextResponse.next();
}

export const config = {
  
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
