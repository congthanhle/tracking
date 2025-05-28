import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = localStorage.getItem("userEmail");
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
