import { redirect } from "next/navigation";

import { auth } from "@/utils/auth";
import { session_user_detail } from "@/types/common.types";
import DashboardWelcome from "@/blocks/dashboard/welcome";

export default async function Page() {
  const session = await auth();
  if (!session?.user) { redirect("/") };
  const user_id = Number(session.user.id);
  const user_name = session.user.name?.toString();

  const user_details: session_user_detail = {
    name: user_name ?? '',
    id: user_id,
    profile_image: session.user.profile_image ?? ''
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <DashboardWelcome
        user_details={user_details}
      />
    </div>
  );
}
