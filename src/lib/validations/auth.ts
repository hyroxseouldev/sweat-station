import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "이름은 최소 2자 이상이어야 합니다." })
      .max(50, { message: "이름은 50자를 초과할 수 없습니다." }),
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    role: z.enum(["admin", "general"]),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "비밀번호는 대소문자, 숫자를 포함해야 합니다.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupForm = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export type LoginForm = z.infer<typeof loginSchema>;
