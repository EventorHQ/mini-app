import { useCheckinMutation, useGetCheckinDataQuery } from "@/api/events";
import { useNavigate } from "@/hooks/use-navigate";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import { Cell, List, Section } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useParams } from "wouter";

const Content = ({
  eventId,
  initDataRaw,
}: {
  eventId: string;
  initDataRaw: string;
}) => {
  const { data } = useGetCheckinDataQuery(eventId, initDataRaw);
  const { setParams } = useTabbarActions();
  const { mutateAsync } = useCheckinMutation(+eventId);

  useEffect(() => {
    if (data) {
      setParams({
        isVisible: true,
        text: "Провести Check In",
        disabled: data.check_in_date !== null,
        onClick: () => mutateAsync(initDataRaw),
      });
    }
  }, [data]);

  if (data) {
    return (
      <List>
        <Section header="Форма">
          {Object.entries(data.form).map(([key, value]) => (
            <Cell key={key} subhead={key}>
              {value}
            </Cell>
          ))}
        </Section>
      </List>
    );
  }
};

export default function PerformCheckinPage() {
  const { id } = useParams<{ id: string }>();
  const bb = useBackButton();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      navigate(`/events/${id}/details`);
    };

    bb.on("click", handleClick);
    return () => {
      bb.off("click", handleClick);
    };
  }, []);

  if (history.state && "initDataRaw" in history.state) {
    const parts = history.state.initDataRaw.split("&event_id=");
    return <Content eventId={id} initDataRaw={parts[0]} />;
  }

  return null;
}
