import {
  EventAdministration,
  useCheckinMutation,
  useDeleteEventMutation,
  useGetEventAdministrationQuery,
} from "@/api/events";
import Chevron16Icon from "@/components/ui/icons/chevron16";
import { Edit28Icon } from "@/components/ui/icons/edit28";
import { useNavigate } from "@/hooks/use-navigate";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import {
  useBackButton,
  usePopup,
  useQRScanner,
} from "@telegram-apps/sdk-react";
import {
  ButtonCell,
  Cell,
  List,
  Section,
  Text,
} from "@telegram-apps/telegram-ui";
import { FC, useEffect } from "react";
import { useParams } from "wouter";
import { isBefore } from "date-fns";
import { toast } from "sonner";
import { Cancel24Icon } from "@/components/ui/icons/cancel24";

const EditButtons: FC<{ event: EventAdministration }> = ({ event }) => {
  const { mutateAsync: deleteEvent } = useDeleteEventMutation(event.id);
  const navigate = useNavigate();
  const popup = usePopup();

  if (isBefore(new Date(event.start_date), new Date())) {
    return null;
  }

  const handleEditClick = () => {
    navigate(`/events/${event.id}/edit`, { state: { event: event.id } });
  };

  const handleDeleteClick = () => {
    popup
      .open({
        title: "Отмена мероприятия",
        message: "Вы уверены, что хотите отменить мероприятие?",
        buttons: [
          {
            type: "close",
            id: "close",
          },
          {
            type: "ok",
            id: "ok",
          },
        ],
      })
      .then((id) => {
        if (id === "ok") {
          deleteEvent()
            .then(() => {
              navigate("/events");
              toast.success("Мероприятие отменено");
            })
            .catch(() => {
              toast.error("Не удалось отменить мероприятие");
            });
        }
      });
  };

  return (
    <Section>
      <ButtonCell before={<Edit28Icon />} onClick={handleEditClick}>
        Редактировать
      </ButtonCell>
      <ButtonCell
        before={<Cancel24Icon className="size-7" />}
        mode="destructive"
        onClick={handleDeleteClick}
      >
        Отменить
      </ButtonCell>
    </Section>
  );
};

export default function EventDetailsPage() {
  const { setParams, setIsVisible } = useTabbarActions();
  const scanner = useQRScanner();
  const popup = usePopup();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const bb = useBackButton();
  const { data, isLoading } = useGetEventAdministrationQuery(+params.id);
  const { mutateAsync } = useCheckinMutation(+params.id);

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

  useEffect(() => {
    const handleClick = () => {
      if (scanner.supports("open")) {
        scanner
          .open({
            text: "Просканируйте QR-код на билете участника",
          })
          .then((initDataRaw) => {
            if (!initDataRaw) {
              return;
            }

            mutateAsync(initDataRaw).then((res) => alert(JSON.stringify(res)));
          });
      } else if (popup.supports("open")) {
        popup.open({
          title: "Ошибка",
          message: "Ваша версия клиента не поддерживает сканер QR-кодов",
        });
      } else {
        alert("Ваша версия клиента не поддерживает сканер QR-кодов");
      }
    };

    setIsVisible(false);

    setParams({
      isVisible: true,
      text: "Сканировать QR",
      onClick: handleClick,
    });
  }, [scanner, popup]);

  const handleCheckedInClick = () => {
    if (
      data &&
      data.checked_in_visitors &&
      data.checked_in_visitors.length > 0
    ) {
      navigate(`/events/${params.id}/checkin`);
    }
  };

  const handleVisitorsClick = () => {
    navigate(`/events/${params.id}/people/visitors`);
  };

  const handleFeedbackClick = () => {
    if (data && !!false) {
      // TODO: add feedback
      navigate(`/events/${params.id}/feedback`);
    }
  };

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      <Section header="Участники">
        <Cell
          onClick={handleCheckedInClick}
          after={
            <div className="flex items-center justify-center gap-2">
              <Text className="text-tg-hint">
                {data.total_checked_in_visitors}
              </Text>
              {data &&
                data.checked_in_visitors &&
                data.checked_in_visitors.length > 0 && <Chevron16Icon />}
            </div>
          }
        >
          Прошли Check-in
        </Cell>
        <Cell
          onClick={handleVisitorsClick}
          after={
            <div className="flex items-center justify-center gap-2">
              <Text className="text-tg-hint">{data.total_visitors}</Text>
              <Chevron16Icon />
            </div>
          }
        >
          Зарегистрировались
        </Cell>
      </Section>
      <Section>
        <Cell
          onClick={handleFeedbackClick}
          after={
            <div className="flex items-center justify-center gap-2">
              <Text className="text-tg-hint">0</Text>
              {!!false && <Chevron16Icon />}
            </div>
          }
        >
          Отзывы
        </Cell>
      </Section>
      <EditButtons event={data} />
    </List>
  );
}
