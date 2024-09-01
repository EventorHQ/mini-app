import {
  DetailedEvent,
  useGetEventQuery,
  useRegisterMutation,
} from "@/api/events";
import { useNavigate } from "@/hooks/use-navigate";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import { FC, useEffect } from "react";
import { useParams } from "wouter";

const Content: FC<{ event: DetailedEvent }> = ({ event }) => {
  const { setIsVisible, setParams } = useTabbarActions();
  const { mutateAsync: register } = useRegisterMutation(event.id);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      register().then(() => {
        navigate(`/events`);
      });
    };
    setIsVisible(false);
    setParams({
      isVisible: true,
      text: "Зарегистрироваться",
      onClick: handleClick,
    });
  }, []);

  return `Зарегистрироваться на мероприятие ${event.title}?`;
};

const ContentPrefetch: FC<{ eventId: number }> = ({ eventId }) => {
  const { data, isLoading } = useGetEventQuery(eventId);

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return <Content event={data} />;
};

export default function RegisterPage() {
  const bb = useBackButton();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      navigate(`/events/${params.id}`);
    };

    bb.show();
    bb.on("click", handleClick);
    return () => {
      bb.off("click", handleClick);
    };
  }, []);

  if (history.state && "event" in history.state) {
    return <Content event={history.state.event} />;
  }

  return <ContentPrefetch eventId={+params.id} />;
}
