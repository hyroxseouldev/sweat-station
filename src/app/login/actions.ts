"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Zod를 사용한 유효성 검사
  const validatedFields = loginSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    const firstError = validatedFields.error.issues[0];
    throw new Error(firstError.message);
  }

  const { email: validEmail, password: validPassword } = validatedFields.data;

  try {
    const supabase = await createClient();

    // Supabase를 사용한 로그인
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validEmail,
      password: validPassword,
    });

    console.log(data, error);

    if (error) {
      console.error("Login error:", error.message, error.status);
      throw new Error(`로그인에 실패했습니다: ${error.message}`);
    }

    if (!data.user) {
      throw new Error("사용자 정보를 가져올 수 없습니다.");
    }

    console.log("사용자 로그인 성공:", {
      email: validEmail,
      userId: data.user.id,
    });
  } catch (error) {
    const err = error as Error;

    console.log(err.message);

    console.error("Unexpected login error:", err);
    throw new Error(
      err.message || "로그인 중 예상치 못한 오류가 발생했습니다."
    );
  }

  redirect("/admin");
}

export async function logoutUser() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("로그아웃에 실패했습니다.");
  }

  redirect("/login");
}
