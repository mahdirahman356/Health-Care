
export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT"
export type RouteConfig = {
    exact: string[],
    patterns: RegExp[]
}

export const authRoutes = ["/login", "/register", "/forgot-password"]
export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
    patterns: []
}
export const doctorProtectedRoutes: RouteConfig = {
    patterns: [/^\/doctor/],
    exact: [],
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/],
    exact: [],
}

export const patientProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: [],
}


export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname)
}

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true
    }

    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}


export const getRouteOwner = (pathname: string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "DOCTOR";
    }
    if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "PATIENT";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "DOCTOR") {
        return "/doctor/dashboard";
    }
    if (role === "PATIENT") {
        return "/dashboard";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {

    const routerOwner = getRouteOwner(redirectPath)
    if (routerOwner === null || routerOwner === "COMMON") {
        return true
    }

    if(routerOwner === role){
        return true
    }

    return false

}