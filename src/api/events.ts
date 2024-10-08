import { FormField } from "@/types";
import api from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type CreateEventData = {
  title: string;
  description: string;
  location: string;
  org_id: string;
  cover: File;
  start_date: Date;
  end_date: Date | undefined;
  form?: unknown;
};

export type ReadEvent = {
  event_id: number;
  creator_id: number;
  title: string;
  description: string;
  cover_img: string;
  location: string;
  start_date: string;
  end_date: string;
  created_at: string;
  role: string;
};

export type DetailedEvent = {
  id: number;
  title: string;
  description: string;
  cover_img: string;
  location: string;
  start_date: string;
  end_date: string;
  created_at: string;
  role: "creator" | "visitor" | "seeker";
  org: {
    id: number;
    title: string;
    is_fancy: boolean;
  };
  form: {
    fields: FormField[];
  };
};

export type Visitor = {
  id: number;
  first_name: string;
  last_name: string;
  username: string | undefined;
  photo_img: string | undefined;
};

export type EventAdministration = {
  id: number;
  start_date: string;
  total_visitors: number;
  total_checked_in_visitors: number;
  all_visitors: Visitor[];
  checked_in_visitors: Visitor[];
};

export const useUpdateEventMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: Omit<CreateEventData, "cover"> & { cover?: File },
    ) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("org_id", data.org_id);
      formData.append("start_date", data.start_date.toISOString());
      formData.append("form", JSON.stringify(data.form));

      if (data.end_date) {
        formData.append("end_date", data.end_date.toISOString());
      }

      if (data.cover) {
        formData.append("cover_img", data.cover);
      }

      const response = await api.patch(`/events/${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", id],
      });
    },
  });
};

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
    mutationFn: async (data: CreateEventData) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("org_id", data.org_id);
      formData.append("cover_img", data.cover);
      formData.append("start_date", data.start_date.toISOString());
      formData.append("form", JSON.stringify(data.form));

      if (data.end_date) {
        formData.append("end_date", data.end_date.toISOString());
      }

      const response = await api.post<{
        id: number;
        org_id: number;
        creator_id: number;
        title: string;
        description: string;
        cover_img: string;
        location: string;
        start_date: Date;
        end_date: Date;
        form: unknown;
        created_at: Date;
      }>("/events", formData, {
        headers: {
          "Content-Type": "form-data",
        },
      });

      return response.data;
    },
  });
};

export const useGetEventsQuery = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await api.get<ReadEvent[]>("/events");
      return response.data;
    },
  });
};

export const useGetEventQuery = (id: number) => {
  return useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const response = await api.get<DetailedEvent>(`/events/${id}`);
      return response.data;
    },
  });
};

export const useGetEventAdministrationQuery = (id: number) => {
  return useQuery({
    queryKey: ["event", "administration", id],
    queryFn: async () => {
      const response = await api.get<EventAdministration>(
        `/events/${id}/administration`,
      );
      return response.data;
    },
  });
};

export const useDeleteEventMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/events/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
};

export const useCheckinMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (initDataRaw: string) => {
      const response = await api.post(`/events/${id}/checkin`, {
        user: initDataRaw,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event", "administration", id],
      });
    },
  });
};

export const useRegisterMutation = (id: number) =>
  useMutation({
    mutationFn: async (form: Record<string, string | undefined>) => {
      const response = await api.post(`/events/${id}/register`, {
        form: JSON.stringify(form),
      });

      return response.data;
    },
  });

export const useGetCheckinDataQuery = (
  eventId: string,
  initDataRaw: string,
) => {
  return useQuery({
    queryKey: ["checkin", eventId, initDataRaw],
    queryFn: async () => {
      const response = await api.get<{
        id: number;
        form: Record<string, string>;
        created_at: Date;
        event_id: number;
        user_id: number;
        check_in_date: Date | null;
      }>(`/events/${eventId}/checkin/${initDataRaw}`);
      return response.data;
    },
  });
};
