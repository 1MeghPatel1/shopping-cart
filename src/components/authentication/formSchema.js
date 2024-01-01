import { z } from "zod";
export const schema = z
    .object({
    firstName: z
        .string({
        invalid_type_error: "Invalid Name",
        required_error: "Name is Required",
    })
        .trim()
        .min(3, { message: "First Name should be more than 3 letters" })
        .max(30, { message: "First Name should be less than 20 letters" }),
    lastName: z
        .string()
        .trim()
        .min(3, { message: "Last Name should be more than 3 letters" })
        .max(30, { message: "Last Name should be less than 20 letters" }),
    email: z
        .string()
        .trim()
        .email({ message: "Please enter valid email address" }),
    password: z
        .string()
        .trim()
        .min(5, {
        message: "Minimum password lenght should be 5 letter",
    })
        .max(20, {
        message: "Maximum password lenght should be 5 letter",
    })
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/, {
        message: "Password must contain - one Uppercase and Lowercase letter, one digit and one special character [#?!@$%^&*-]",
    }),
    confirmPassword: z
        .string()
        .trim()
        .min(5, {
        message: "Minimum password lenght should be 5 letter",
    })
        .max(20, {
        message: "Maximum password lenght should be 5 letter",
    })
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
