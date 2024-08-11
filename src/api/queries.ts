import { useQuery } from "@tanstack/react-query";
import api from "./axios";

export const useCheckHealthQuery = () =>
  useQuery({
    queryKey: ["healthcheck"],
    queryFn: async () => {
      const response = await api.get<{ status: string }>("/healthcheck");
      return response.data;
    },
  });
