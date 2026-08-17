import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (!access && !refresh) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}