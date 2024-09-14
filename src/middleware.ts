
import { DEFAULT_LOGIN_REDIRECT, authRoutes } from "@/routes";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
    const { nextUrl } = req;

    const isAuthenticated = !!req.auth;
    console.log("isAuthenticated", isAuthenticated);
    
    
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if (nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next(); // Allow the request to proceed
    }

    if (isAuthRoute && isAuthenticated)
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));

    if (!isAuthenticated && !isAuthRoute)
        return NextResponse.redirect(new URL("/sign-in", nextUrl));
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
