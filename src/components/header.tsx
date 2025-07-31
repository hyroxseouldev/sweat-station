import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { logoutUser } from "@/app/login/actions";

export default async function Header() {
  const supabase = await createClient();

  let user = null;
  try {
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();
    if (!error && authUser) {
      user = authUser;
    }
  } catch (error) {
    console.error("Error getting user in header:", error);
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Sweat Station Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold">Sweat Station</span>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/admin">관리자</Link>
              </Button>
              <span className="text-sm text-muted-foreground">
                안녕하세요, {user.user_metadata?.name || user.email}님!
              </span>
              <form action={logoutUser}>
                <Button variant="ghost" type="submit">
                  로그아웃
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">회원가입</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
