/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { loginUser } from "./loginUser";
import { registerValidationZodSchema } from "@/zod/auth.validation";
import { zodValidator } from "@/lib/zodValidator";




export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {

    try {
        const payload = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }


        if (zodValidator(payload, registerValidationZodSchema).success === false) {
            return zodValidator(payload, registerValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerValidationZodSchema).data;

        const registerData = {
            password: validatedPayload.password,
            patient: {
                name: validatedPayload.name,
                address: validatedPayload.address,
                email: validatedPayload.email,
            }
        }

        console.log("data", registerData)

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(registerData))

        if(formData.get("file")){
            newFormData.append("file", formData.get("file") as Blob)
        }

        const res = await serverFetch.post(`/user/create-patient`, {
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