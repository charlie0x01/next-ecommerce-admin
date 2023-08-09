import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// local imports
import prismadb from "@/lib/prismadb";

export default async function ({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // select first store with user id and redirect the user
  // to dashboard with found storeId
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
