import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import {
  Cell,
  List,
  Section,
  Subheadline,
  Title,
} from "@telegram-apps/telegram-ui";
import { useCallback, useEffect } from "react";
import { useNavigate } from "@/hooks/use-navigate";
import { useParams } from "wouter";
import { useGetEventQuery } from "@/api/events";
import { useDateFormat } from "@/hooks/use-date-format";
import Check16Icon from "@/components/ui/icons/check16";
import EventButtons from "@/components/event-buttons";

export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const { setIsVisible, setParams } = useTabbarActions();
  const bb = useBackButton();
  const navigate = useNavigate();
  const { data: event, isLoading } = useGetEventQuery(+id);
  const format = useDateFormat({
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleBackButtonClick = useCallback(() => {
    navigate("/");
  }, []);

  const handleOrganizationClick = () => {
    navigate(`/orgs/${event?.org?.id}`, {
      state: { from: `/events/${event?.id}` },
    });
  };

  useEffect(() => {
    setIsVisible(false);
    setParams({
      isVisible: false,
    });
    bb.on("click", handleBackButtonClick);
    bb.show();

    return () => {
      setIsVisible(true);
      bb.off("click", handleBackButtonClick);
    };
  }, []);

  if (isLoading || !event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img src={event.cover_img} className="w-full" alt={event.title} />
      <List>
        <div className="pt-2 pb-3">
          <Title weight="1" level="1">
            {event.title}
          </Title>
          <Subheadline
            level="2"
            weight="2"
            className="text-tg-link flex items-center pt-1 gap-1 cursor-pointer"
            onClick={handleOrganizationClick}
          >
            {event.org.title}
            {event.org.is_fancy && <Check16Icon />}
          </Subheadline>
        </div>
        <EventButtons event={event} />
        <Section header="О мероприятии">
          {event.start_date === event.end_date ? (
            <Cell subhead="Дата проведения">
              {format(new Date(event.start_date))}
            </Cell>
          ) : (
            <>
              <Cell subhead="Дата начала">
                {format(new Date(event.start_date))}
              </Cell>
              <Cell subhead="Дата окончания">
                {format(new Date(event.end_date))}
              </Cell>
            </>
          )}
          <Cell subhead="Место проведения" multiline>
            {event.location}
          </Cell>
          <Cell subhead="О мероприятии" multiline>
            {event.description}
          </Cell>
        </Section>
      </List>
    </>
  );
}
