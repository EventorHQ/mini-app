import { useCreateUserMutation } from "@/api/users";
import { useStartApp } from "@/hooks/use-startapp";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function IndexPage() {
  const { mutate } = useCreateUserMutation();

  useEffect(() => {
    mutate();
  }, []);

  useStartApp();

  return <Navigate to="/events" />;
}
