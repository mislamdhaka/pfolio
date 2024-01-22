import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import PageContent from "@/app/ui/page-coentent";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");

  return (
    <main className="container">
      <PageContent
        variant="dashboard"
        currentUser={currentUser.toJSON() as typeof currentUser}
      />
    </main>
  );
}
