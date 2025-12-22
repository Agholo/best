import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const token = await getToken({ req: request });
	const { pathname } = request.nextUrl;

	// Redirect authenticated users away from auth pages
	if (token && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))) {
		return NextResponse.redirect(new URL("/home", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/auth/:path*"],
};

