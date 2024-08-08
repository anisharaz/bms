import { auth } from "@/auth";

async function Dashboard() {
  const user = await auth();
  return (
    <div className="text-4xl">
      <div>dashboard</div>
      <div>User Info</div>
      <div>{user?.user?.name}</div>
    </div>
  );
}

export default Dashboard;
