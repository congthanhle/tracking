import AuthRedirect from "@/components/AuthRedirect";
import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/Login";
import HomePage from "@/pages";
import IrregularRegister from "@/pages/IrregularRegister";
import FundTracking from "@/pages/FundTracking";
import PermanentRegister from "@/pages/PermanentRegister";


const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AuthRedirect />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "irregular-register", element: <IrregularRegister /> },
          { path: "permanent-register", element: <PermanentRegister /> },
          { path: "fund-tracking", element: <FundTracking /> },
        ],
      },
    ],
  },
];

export default routes;
