import { BASE_URL } from "@/config/config";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/users`);
      const data = await response.json();
      return data;
    },
  });
