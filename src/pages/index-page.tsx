import { useCreateUserMutation } from "@/api/users";
import { useStartApp } from "@/hooks/use-startapp";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Setup() {
  const { mutateAsync: login } = useCreateUserMutation();
  const [location] = useLocation();

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    import.meta.env.DEV && console.log(location);
  }, [location]);

  useStartApp();

  return null;
}
