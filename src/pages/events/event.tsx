import { Ticket } from "@/components/ticket";
import { AddCircle28Icon } from "@/components/ui/icons/addcircle28";
import { Channel24Icon } from "@/components/ui/icons/channel24";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { dora } from "@/mockContent";
import { useBackButton } from "@telegram-apps/sdk-react";
import {
  Cell,
  InlineButtons,
  List,
  Section,
  Subheadline,
  Title,
} from "@telegram-apps/telegram-ui";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const event = dora;

export default function EventPage() {
  const { id } = useParams();
  const { setIsVisible } = useTabbarActions();
  const bb = useBackButton();
  const navigate = useNavigate();

  const handleBackButtonClick = useCallback(() => {
    navigate(-1);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    bb.on("click", handleBackButtonClick);
    bb.show();

    return () => {
      setIsVisible(true);
      bb.off("click", handleBackButtonClick);
    };
  }, []);

  return (
    <article>
      <img src={event.image} className="w-full" alt={event.title} />
      <List>
        <div className="pt-5 pb-3">
          <Title weight="1">{event.title}</Title>
          <Subheadline level="2" className="text-tg-link">
            {event.organization}
          </Subheadline>
        </div>
        <InlineButtons>
          <Ticket event={event} backButtonHandler={handleBackButtonClick}>
            <InlineButtons.Item text="Регистрация" mode="bezeled">
              <AddCircle28Icon />
            </InlineButtons.Item>
          </Ticket>
          <InlineButtons.Item text="Поделиться" mode="gray">
            <Channel24Icon />
          </InlineButtons.Item>
        </InlineButtons>
        <Section header="О мероприятии">
          <Cell subhead="ID">{id}</Cell>
          <Cell subhead="Дата проведения">{event.date}</Cell>
          <Cell subhead="Место проведения">{event.location}</Cell>
          <Cell subhead="О мероприятии">{event.description}</Cell>
        </Section>
      </List>
    </article>
  );
}
