import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

    const token = request.cookies.get('accessToken')?.value
    const { pathname } = request.nextUrl;
    const protectedPaths = ['/dashboard/*', '/profile', '/settings', '/appointments'];
    const authRoutes = ['/login', '/register', '/forgot-password'];

    const isProtectedPath = protectedPaths.some((path) => {
        pathname.startsWith(path);
    })
    const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
    )

    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password'],
}