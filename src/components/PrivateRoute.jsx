import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}