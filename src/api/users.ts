import { useInitData } from "@telegram-apps/sdk-react";
import api from "./axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateUserMutation = () => {
  const initData = useInitData();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/users", initData?.user);

      return response.data;
    },
  });
};
