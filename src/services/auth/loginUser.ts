"use server"
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import z, { any, success } from "zod";
import { parse } from "cookie"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"
import { redirect } from "next/navigation";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { setCookie } from "./tokenHandlers";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";



export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const redirectTo = formData.get("redirect")
        console.log("redirect", redirectTo)
        let accessTokenObject: null | any = null;
        let refreshTokenOBject: null | any = null

        const payload = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        if (zodValidator(payload, loginValidationZodSchema).success === false) {
            return zodValidator(payload, loginValidationZodSchema);
        }

        const validatedPayload = zodValidator(payload, loginValidationZodSchema).data;

        const res = await serverFetch.post(`/auth/login`, {
            body: JSON.stringify(validatedPayload),
            headers: {
                 "Content-Type": "application/json"
            }
        })
        const result = await res.json()
        const setCookieHeaders = res.headers.getSetCookie()

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie) => {
                const parsedCookie = parse(cookie)
                console.log("parsedCookie", parsedCookie)

                if (parsedCookie["accessToken"]) {
                    accessTokenObject = parsedCookie
                }
                if (parsedCookie["refreshToken"]) {
                    refreshTokenOBject = parsedCookie
                }
            })
        } else {
            throw Error("No set-cookie header found")
        }

        if (!accessTokenObject) {
            throw new Error("Token not found in cookie")
        }
        if (!refreshTokenOBject) {
            throw new Error("Token not found in cookie")
        }

        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject.maxAge),
            path: accessTokenObject.path || "/"
        })

        await setCookie("refreshToken", refreshTokenOBject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenOBject.maxAge),
            path: refreshTokenOBject.path || "/"
        })


        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_ACCESS_SECRET as string)

        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token")
        }
        const userRole: UserRole = verifiedToken.role

        if (!result?.success) {
            throw new Error("Login failed")
        }

        if (redirectTo) {
            const requestedPath = redirect.toString()
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }

    } catch (error: any) {
        console.log(error)
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        return {
            success: false, message:
                `${process.env.NODE_ENV === 'development'
                    ? error.message
                    : "Login Failed. You might have entered incorrect email or password."}`
        };
    }
}