import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/auth";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface AdminPageProps {
  searchParams: Promise<{ message?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    console.log("No user found in admin page, redirecting to login");
    redirect("/login?redirectTo=/admin");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {params.message && (
          <div className="mb-6 rounded-md bg-green-50 p-4 border border-green-200">
            <p className="text-sm text-green-700">{params.message}</p>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">관리자 페이지</h1>
            <p className="text-blue-100 mt-1">시스템 관리 및 설정</p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                사용자 정보
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  이메일:{" "}
                  <span className="font-medium text-gray-800">
                    {user.email}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  사용자 ID:{" "}
                  <span className="font-medium text-gray-800">{user.id}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  마지막 로그인:{" "}
                  <span className="font-medium text-gray-800">
                    {new Date(user.last_sign_in_at || "").toLocaleString(
                      "ko-KR"
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      사용자 관리
                    </h3>
                    <p className="text-sm text-gray-600">시스템 사용자 관리</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      데이터 분석
                    </h3>
                    <p className="text-sm text-gray-600">시스템 통계 및 분석</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      시스템 설정
                    </h3>
                    <p className="text-sm text-gray-600">애플리케이션 설정</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                빠른 작업
              </h2>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  새 사용자 추가
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  백업 생성
                </button>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  시스템 점검
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  로그 확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
