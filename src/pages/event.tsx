import { AddCircle28Icon } from "@/components/ui/icons/addcircle28";
import { Channel24Icon } from "@/components/ui/icons/channel24";
import { useTabbar } from "@/hooks/use-tabbar";
import { dora } from "@/mockContent";
import {
  Cell,
  InlineButtons,
  List,
  Section,
  Subheadline,
  Title,
} from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const event = dora;

export default function EventPage() {
  const { id } = useParams();
  const { setIsVisible } = useTabbar();

  useEffect(() => {
    setIsVisible(false);

    return () => setIsVisible(true);
  }, []);

  return (
    <article>
      <img src={event.image} className="w-full" alt={event.title} />
      <List>
        <div className="pt-5 pb-3">
          <Title weight="1">{event.title}</Title>
          <Subheadline level="2" className="text-tg-link">
            TON Society
          </Subheadline>
        </div>
        <InlineButtons>
          <InlineButtons.Item text="Регистрация" mode="bezeled">
            <AddCircle28Icon />
          </InlineButtons.Item>
          <InlineButtons.Item text="Поделиться" mode="gray">
            <Channel24Icon />
          </InlineButtons.Item>
        </InlineButtons>
        <Section header="О мероприятии">
          <Cell subhead="Дата проведения">{event.date}</Cell>
        </Section>
      </List>
      {id}
    </article>
  );
}
