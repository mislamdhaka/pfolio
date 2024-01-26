import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/firebase/firebase-admin";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/sign-in");

  return <main className="container"></main>;
}
