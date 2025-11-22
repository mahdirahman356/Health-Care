import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();
  console.log("userInfo:", userInfo)
  return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;