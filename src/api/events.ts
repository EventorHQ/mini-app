import api from "./axios";
import { useMutation } from "@tanstack/react-query";

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

export const useCreateEventMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateEventData) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("org_id", data.org_id);
      formData.append("cover_img", data.cover);
      formData.append("start_date", data.start_date.toISOString());

      if (data.end_date) {
        formData.append("end_date", data.end_date.toISOString());
      }

      const response = await api.post("/events", formData, {
        headers: {
          "Content-Type": "form-data",
        },
      });

      return response.data;
    },
  });
};
