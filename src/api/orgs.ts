import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./axios";

export const useGetOrgsQuery = () =>
  useQuery({
    queryKey: ["get", "orgs"],
    queryFn: async () => {
      const response = await api.get<
        {
          id: number;
          title: string;
          avatar: string | undefined;
          is_fancy: boolean;
        }[]
      >("/orgs");

      return response.data.map((apiOrg) => ({
        id: apiOrg.id,
        title: apiOrg.title,
        avatar: apiOrg.avatar,
        isFancy: apiOrg.is_fancy,
      }));
    },
  });

export const useCreateOrgMutation = () => {
  return useMutation({
    mutationKey: ["create", "org"],
    mutationFn: async (data: {
      title: string;
      description: string | undefined;
      avatar: File | undefined;
    }) => {
      console.log(data);
      const formData = new FormData();
      formData.append("title", data.title);
      data.description && formData.append("description", data.description);
      data.avatar && formData.append("avatar", data.avatar);

      const response = await api.post<{
        id: number;
      }>("/orgs", formData, {
        headers: {
          "Content-Type": "form-data",
        },
      });

      return response.data;
    },
  });
};
