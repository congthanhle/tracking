import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { authState } from "@/state/atoms/authAtom";
import { Menu } from "antd";

export default function MainLayout() {
  const resetAuth = useResetRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    resetAuth();
    localStorage.removeItem("userEmail");
    navigate("/login");
  }

  const menuItems = [
    { label: <Link to="/home">Trang chủ</Link>, key: "home" },
    { label: <Link to="/irregular-register">Đăng kí đánh vãng lai</Link>, key: "irregular-register" },
    { label: <Link to="/permanent-register">Đăng kí lịch cố định</Link>, key: "permanent-register" },
    { label: <Link to="/fund-tracking">Quỹ</Link>, key: "fund-tracking" },
    { label: <span onClick={handleLogout} className="cursor-pointer">Đăng xuất</span>, key: "logout" },
  ];

  const pathKeyMap = {
    "/": "home",
    "/irregular-register": "irregular-register",
    "/permanent-register": "permanent-register",
    "/fund-tracking": "fund-tracking",
  };
  const selectedKey = pathKeyMap[location.pathname] || "home";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="main-background p-0 flex justify-center items-center">
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className="bg-transparent flex-1 gap-8 justify-center main-background"
        />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}