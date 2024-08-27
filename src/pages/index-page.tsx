import { useCreateUserMutation } from "@/api/users";
import { useStartApp } from "@/hooks/use-startapp";
import { useEffect } from "react";
import { Redirect } from "wouter";

export default function IndexPage() {
  const { mutateAsync: login } = useCreateUserMutation();

  useEffect(() => {
    login();
  }, []);

  useStartApp();

  return <Redirect to="/" />;
}
