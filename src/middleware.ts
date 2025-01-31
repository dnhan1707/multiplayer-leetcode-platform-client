import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    return NextResponse.next(); // Let backend handle authentication
}

export const config = {
    matcher: ["/dashboard/:path*", "/rooms/:path*"], // Protected routes
};
