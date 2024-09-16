import { useCheckinMutation, useGetCheckinDataQuery } from "@/api/events";
import { useNavigate } from "@/hooks/use-navigate";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton, useHapticFeedback } from "@telegram-apps/sdk-react";
import { Cell, List, Placeholder, Section } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "wouter";

const Form = ({ form }: { form: Record<string, string> }) => {
  const formFields = Object.entries(form);
  if (formFields.length === 0) {
    return (
      <Placeholder description="Посетитель не заполнил форму"></Placeholder>
    );
  }
  return (
    <Section header="Форма">
      {Object.entries(form).map(([key, value]) => (
        <Cell key={key} subhead={key}>
          {value}
        </Cell>
      ))}
    </Section>
  );
};

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
  const navigate = useNavigate();
  const haptic = useHapticFeedback();

  useEffect(() => {
    if (data) {
      const handleClick = () => {
        mutateAsync(initDataRaw).then(() => {
          haptic.notificationOccurred("success");
          navigate(`/events/${eventId}/details`);
          toast.success("Check-in успешно проведен");
        });
      };

      setParams({
        isVisible: true,
        text: "Провести Check-in",
        disabled: data.check_in_date !== null,
        onClick: handleClick,
      });
    }
  }, [data]);

  if (data) {
    return (
      <List>
        <Form form={data.form} />
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
