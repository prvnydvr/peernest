import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";

export default async function CurrentProfilePage() {
  const user = await requireUser();
  redirect(`/profile/${user.username}`);
}
