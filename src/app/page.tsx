import { getCurrentUser } from "@/lib/supabase/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto px-4 py-8">
      {user ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            환영합니다, {user.user_metadata?.name || user.email}님!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sweat Station에서 운동을 시작해보세요.
          </p>
          {/* 여기에 로그인한 사용자를 위한 컨텐츠 추가 */}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Sweat Station에 오신 것을 환영합니다</h1>
          <p className="text-lg text-muted-foreground mb-8">
            운동을 기록하고 관리할 수 있는 최고의 플랫폼입니다.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/signup">회원가입하기</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">로그인하기</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
