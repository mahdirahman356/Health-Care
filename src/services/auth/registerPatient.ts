"use server"
import z from "zod";
import { loginUser } from "./loginUser";
/* eslint-disable @typescript-eslint/no-explicit-any */


const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});

export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {

    try {
        const validationData = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        const validatedFields = registerValidationZodSchema.safeParse(validationData)

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    }
                })
            }
        }

        const registerData = {
            password: formData.get('password'),
            patient: {
                name: formData.get('name'),
                address: formData.get('address'),
                email: formData.get('email'),
            }
        }

        console.log("data", registerData)

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(registerData))
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create-patient`, {
            method: "POST",
            body: newFormData,
        })

        const result = await res.json()
        if (result.success) {
            await loginUser(_currentState, formData)
        }

        return res;

    } catch (error: any) {
        console.log(error);
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        return {
            success: false, message:
                `${process.env.NODE_ENV === 'development'
                    ? error.message
                    : "Registration Failed. Please try again."}`
        };
    }


}