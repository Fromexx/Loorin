import { z } from 'zod'

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(4, { message: "Be at least 4 characters long." })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
        .regex(/[0-9]/, { message: "Contain at least one number." })
        .trim(),
})

export const SigninFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(4, { message: 'Please enter a valid password.' }).trim(),
})

export type SignupFormState =
    |
    {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export type SinginFormState = 
    |
    {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
        incorrectDataError?: string
    }
    | undefined