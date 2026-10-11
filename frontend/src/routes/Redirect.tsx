import { Navigate } from "react-router";
import { getLandingPath } from "../config/roleDashboardConfig";
import { useUser } from "../context/currentUser/use-user";

export function DashboardRedirect() {
  const { currentUser } = useUser();

  if (!currentUser) return <Navigate to="/signin" />;

  const dashboardPath = getLandingPath(currentUser.role_id);

  if (!dashboardPath) return <Navigate to="notFound" />;

  return <Navigate to={dashboardPath} replace />;
}

export function UploadRedirect() {
  return <Navigate to="/upload-direct" />;
}
