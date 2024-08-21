import { useCreateUserMutation } from "@/api/users";
import { useStartApp } from "@/hooks/use-startapp";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function IndexPage() {
  const { mutateAsync: login } = useCreateUserMutation();

  useEffect(() => {
    login();
  }, []);

  useStartApp();

  return <Navigate to="/events" />;
}
