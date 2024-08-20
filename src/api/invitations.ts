import { Invitation } from "@/types";
import api from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetInvitationQuery = (id: string) => {
  return useQuery({
    queryKey: ["invitation", id],
    queryFn: async () => {
      const response = await api.get(`/invitations/${id}`);

      return response.data as Invitation;
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
