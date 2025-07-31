import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user:", error.message);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Unexpected error in getCurrentUser:", error);
    return null;
  }
}
