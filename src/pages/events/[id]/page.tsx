import { AddCircle28Icon } from "@/components/ui/icons/addcircle28";
import { Channel24Icon } from "@/components/ui/icons/channel24";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton, useUtils } from "@telegram-apps/sdk-react";
import {
  Cell,
  InlineButtons,
  List,
  Section,
  Subheadline,
  Title,
} from "@telegram-apps/telegram-ui";
import { useCallback, useEffect } from "react";
import { useNavigate } from "@/hooks/use-navigate";
import { useParams } from "wouter";
import { useGetEventQuery } from "@/api/events";
import { APP_URL } from "@/config/config";
import { useDateFormat } from "@/hooks/use-date-format";
import Check16Icon from "@/components/ui/icons/check16";

export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const { setIsVisible, setParams } = useTabbarActions();
  const bb = useBackButton();
  const navigate = useNavigate();
  const { data: event, isLoading } = useGetEventQuery(+id);
  const utils = useUtils();
  const format = useDateFormat({
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleShareClick = () => {
    utils.shareURL(`${APP_URL}?startapp=${event?.id}`, event?.title);
  };

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
            {!event.org.is_fancy && <Check16Icon />}
          </Subheadline>
        </div>
        <InlineButtons>
          {/* <Ticket event={event} backButtonHandler={handleBackButtonClick}> */}
          <InlineButtons.Item text="Регистрация" mode="bezeled">
            <AddCircle28Icon />
          </InlineButtons.Item>
          {/* </Ticket> */}
          <InlineButtons.Item
            text="Поделиться"
            mode="gray"
            onClick={handleShareClick}
          >
            <Channel24Icon />
          </InlineButtons.Item>
        </InlineButtons>
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
