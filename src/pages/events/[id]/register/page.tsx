import {
  DetailedEvent,
  useGetEventQuery,
  useRegisterMutation,
} from "@/api/events";
import FormField from "@/components/form-field";
import { useNavigate } from "@/hooks/use-navigate";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import { List, Section, Title } from "@telegram-apps/telegram-ui";
import { FC, useEffect, useState } from "react";
import { useParams } from "wouter";

const Content: FC<{ event: DetailedEvent }> = ({ event }) => {
  const { setIsVisible, setParams } = useTabbarActions();
  const { mutateAsync: register } = useRegisterMutation(event.id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string | undefined>>(
    event.form.fields.reduce((acc, field) => {
      acc[field.label] = undefined;
      return acc;
    }, {} as Record<string, string | undefined>),
  );
  const isDisabled = event.form.fields.some(
    (field) => field.required && !formData[field.label],
  );

  useEffect(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      register(formData).then(() => {
        navigate(`/events/${event.id}`);
      });
    };

    setParams({
      isVisible: true,
      text: "Зарегистрироваться",
      onClick: handleClick,
      disabled: isDisabled,
    });
  }, [formData]);

  return (
    <List>
      <Title level="1" weight="1">
        Регистрация
      </Title>
      <Section.Footer>Заполните форму</Section.Footer>
      {event.form.fields.map((field) => (
        <Section key={field.label} header={field.label}>
          <FormField
            type={field.type}
            value={formData[field.label]}
            onChange={(e) =>
              setFormData({ ...formData, [field.label]: e.target.value })
            }
          />
        </Section>
      ))}
    </List>
  );
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
