import { LoginForm } from "@/components/login-form";

interface LoginPageProps {
  searchParams: Promise<{ message?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          Sweat Station
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;건강한 삶의 시작, Sweat Station과 함께하세요.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {params.message && (
            <div className="rounded-md bg-blue-50 p-3 border border-blue-200">
              <p className="text-sm text-blue-700">{params.message}</p>
            </div>
          )}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
