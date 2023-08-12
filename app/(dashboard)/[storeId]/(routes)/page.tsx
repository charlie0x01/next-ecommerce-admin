import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";

const DashboardPage = async ({ params }: {params: { storeId: string}}) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  return (
    <>
      <h1>{`Active Store : ${store?.name}`}</h1>
    </>
  );
};

export default DashboardPage;
