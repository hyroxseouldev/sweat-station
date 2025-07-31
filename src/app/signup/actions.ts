"use server";

import { createClient } from "@/lib/supabase/server";
import { signupSchema } from "@/lib/validations/auth";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const role = formData.get("role") as string;

  // Zod를 사용한 유효성 검사
  const validatedFields = signupSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
    role,
  });

  if (!validatedFields.success) {
    const firstError = validatedFields.error.issues[0];
    throw new Error(firstError.message);
  }

  const {
    name: validName,
    email: validEmail,
    password: validPassword,
    role: validRole,
  } = validatedFields.data;

  try {
    const supabase = await createClient();

    // Supabase를 사용한 사용자 생성
    const { data, error } = await supabase.auth.signUp({
      email: validEmail,
      password: validPassword,
      options: {
        data: {
          name: validName,
          role: validRole,
        },
      },
    });

    if (error) {
      console.error("Signup error:", error.message, error.status);
      throw new Error(`회원가입에 실패했습니다: ${error.message}`);
    }

    console.log("새 사용자 생성:", {
      name: validName,
      email: validEmail,
      userId: data.user?.id,
      needsEmailConfirmation: !data.session,
      role: validRole,
    });

    // 성공 시 적절한 응답 반환 (클라이언트에서 리다이렉트 처리)
    return {
      success: true,
      hasSession: !!data.session,
      message: data.session
        ? "회원가입이 완료되었습니다!"
        : "이메일을 확인하여 계정을 활성화해주세요.",
      redirectTo: data.session ? "/admin" : "/login",
    };
  } catch (error) {
    const err = error as Error;
    console.error("Unexpected signup error:", err);
    throw new Error(
      err.message || "회원가입 중 예상치 못한 오류가 발생했습니다."
    );
  }
}
