import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./axios";
import { Organization, OrganizationRole } from "@/types";

export const useGetOrgsQuery = () =>
  useQuery({
    queryKey: ["get", "orgs"],
    queryFn: async () => {
      const response = await api.get<
        {
          role: OrganizationRole;
          organization: {
            id: number;
            title: string;
            description: string | undefined;
            avatar: string;
            isFancy: boolean;
          };
        }[]
      >("/orgs");

      return response.data;
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

export const useGetOrganizationQuery = (id: number) => {
  return useQuery({
    queryKey: ["get", "organization", +id],
    queryFn: async () => {
      const response = await api.get<Organization>(`/orgs/${id}`);

      return response.data;
    },
  });
};

export const useUpdateOrganizationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update", "organization"],
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({
        queryKey: ["get", "organization", id],
      });
    },
    mutationFn: async (data: {
      id: number;
      title?: string;
      description?: string;
      avatar?: File;
    }) => {
      const formData = new FormData();
      data.title && formData.append("title", data.title);
      data.description && formData.append("description", data.description);
      data.avatar && formData.append("avatar", data.avatar);

      const response = await api.put<{
        id: number;
      }>(`/orgs/${data.id}`, formData, {
        headers: {
          "Content-Type": "form-data",
        },
      });

      return response.data;
    },
  });
};

export const useCreateInviteLinkMutation = (orgId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      role: OrganizationRole;
      isReusable: boolean;
      orgId: number;
    }) => {
      const response = await api.post<{ id: string }>("/invitations", data);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["invitations", orgId],
      });
    },
  });
};
