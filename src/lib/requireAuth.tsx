
import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "./authStorage";
import { Profil } from "../components/Profil";

export default function RequireAuth() {
  const auth = getAuth();
  if (!auth?.loggedIn) return <Navigate to="/login" replace />;
  return <>
  <Outlet/><Profil/></>;
}
