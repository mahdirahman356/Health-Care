import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken"
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils'
import { deleteCookie, getCookie } from './services/auth/tokenHandlers'

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    let userRole: UserRole | null = null
    const accessToken = await getCookie("accessToken")

    if (accessToken) {
        const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)

        if (typeof verifiedToken === "string") {
            await deleteCookie("accessToken")
            await deleteCookie("refreshToken")
            return NextResponse.redirect(new URL("/login", request.url))
        }
  
        userRole = verifiedToken.role
    }

    const routerOwner = getRouteOwner(pathname)
    const isAuth = isAuthRoute(pathname)

    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }

    if (routerOwner === null) {
        return NextResponse.next()
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (routerOwner === "COMMON") {
        return NextResponse.next()
    }

    if (routerOwner === "ADMIN" || routerOwner === "DOCTOR" || routerOwner === "PATIENT") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}