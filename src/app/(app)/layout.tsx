import { AppShell } from "@/components/app/app-shell";
import { requireUser } from "@/lib/auth";
import { getAppShellData } from "@/server/data";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const shell = getAppShellData(user.id);

  return (
    <AppShell user={user} shell={shell}>
      {children}
    </AppShell>
  );
}
