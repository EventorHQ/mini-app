import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./axios";
import { Organization, OrganizationRole } from "@/types";
import { useParams } from "react-router-dom";

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

export const useGetOrganizationQuery = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Organization id is not defined");
  }

  return useQuery({
    queryKey: ["get", "organization", id],
    queryFn: async () => {
      const response = await api.get<Organization>(`/orgs/${id}`);

      return response.data;
    },
  });
};
