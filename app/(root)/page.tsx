import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div className="p-4">
      <p>This is a Protected Page!!</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default SetupPage;
