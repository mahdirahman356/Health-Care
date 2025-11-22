import { getUserInfo } from "@/services/auth/getUserInfo";


const AdminDashboardPage = async () => {
  const userInfo = await getUserInfo();
  console.log(userInfo)
  return <div>AdminDashboardPage</div>;
};

export default AdminDashboardPage;