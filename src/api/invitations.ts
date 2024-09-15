import { Invitation, OrganizationRole } from "@/types";
import api from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetInvitationQuery = (id: string) => {
  return useQuery({
    queryKey: ["invitation", id],
    queryFn: async () => {
      const response = await api.get<Invitation>(`/invitations/${id}`);

      return response.data;
    },
  });
};

export const useAcceptInvitationMutation = () => {
  return useMutation({
    mutationKey: ["accept", "invitation"],
    mutationFn: async (data: { invitation: string }) => {
      const response = await api.put(`/invitations/${data.invitation}/accept`);

      return response.data;
    },
  });
};

export const useGetInvitationsQuery = (orgId: string) => {
  return useQuery({
    queryKey: ["invitations", orgId],
    queryFn: async () => {
      const response = await api.get<
        { id: string; is_reusable: boolean; role: OrganizationRole }[]
      >(`/orgs/${orgId}/invitations`);

      return response.data;
    },
  });
};

export const useDeleteInvitationMutation = (orgId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", "invitation"],
    mutationFn: async (id: string) => {
      const response = await api.delete(`/invitations/${id}`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invitations", orgId] });
    },
  });
};
