import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
// local imports
import prismadb from "@/lib/prismadb";
import SettingsForm from "./(components)/settings-form";

const Settings = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: params.storeId,
    },
  });

  if (!store) redirect("/");

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6">
        <SettingsForm InitialStore={store} />
      </div>
    </div>
  );
};

export default Settings;
