import DashboardHeader from "@/components/DashboardHeader";
import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import pb from "@/pb";
import { useEffect } from "react";

function Dashboard() {
  const auth = pb.authStore
  console.log(JSON.stringify(auth))
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = pb.authStore.isValid
    const isSub = !!pb.authStore.model?.profile?.activePackage
    if (!isLogin) {
      navigate("/signup");
    }
    if (!isSub) {
      navigate("/payment");
    }
  }, []);

  return (
    <>
      <DashboardHeader />
      <div className="md:grid md:grid-cols-[auto_1fr] md:justify-items-center">
        <SideBar />
        <div className="w-full max-w-[42rem] min-h-screen">
          <Outlet />
          <div className="h-16 md:h-4"></div>
        </div>
      </div>
    
      <BottomBar />
    </>
  );
}

export default Dashboard;
