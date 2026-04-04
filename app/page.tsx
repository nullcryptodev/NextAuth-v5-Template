import { redirect } from "next/navigation";

import { LoginForm } from "@/blocks/login-page";

import BeanLogo from "@/components/logo";

import { auth } from "@/utils/auth";

export default async function Page() {
  const session = await auth();
  if (session) redirect('/dashboard');

  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-full">
      <div className="flex flex-col gap-4 p-6 md:p-8">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#">
            <BeanLogo />
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img
          src="/team-image.avif"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
