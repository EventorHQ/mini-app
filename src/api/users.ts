import { useInitData } from "@telegram-apps/sdk-react";
import api from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrganizationRole, User } from "@/types";

export const useCreateUserMutation = () => {
  const initData = useInitData();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/users", initData?.user);

      return response.data;
    },
  });
};

export const useGetUserQuery = () => {
  const initData = useInitData();

  return useQuery({
    queryKey: ["user", initData?.user?.id],
    queryFn: async () => {
      if (!initData?.user?.id) return;
      const response = await api.get(`/users/${initData?.user?.id}`);

      return {
        id: response.data.id,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        username: response.data.username,
        avatar: response.data.photo_img,
      } as User;
    },
  });
};

export const useUpdateUserRoleMutation = (orgId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get", "organization", orgId],
      });
    },
    mutationFn: async (data: {
      userId: number;
      role: OrganizationRole | undefined;
    }) => {
      const response = await api.patch(
        `/orgs/${orgId}/members/${data.userId}`,
        {
          role: data.role,
        },
      );

      return response.data;
    },
  });
};
