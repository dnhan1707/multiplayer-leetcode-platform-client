import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("Middleware triggered for:", request.nextUrl.pathname);
    console.log("Cookies available in middleware:", request.cookies);

    const authToken = request.cookies.get('authToken');
    if (!authToken) {
        console.log("no auth");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log("found auth");
    return NextResponse.next();
}


export const config = {
    matcher: ['/dashboard/:path*', '/rooms/:path*'], 
};
