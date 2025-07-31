import Link from "next/link"

export default function AuthCodeErrorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-xl font-bold text-red-700 mb-2">인증 오류</h1>
          <p className="text-red-600 mb-4">
            인증 과정에서 오류가 발생했습니다. 다시 시도해주세요.
          </p>
          <div className="space-y-2">
            <Link 
              href="/login" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}