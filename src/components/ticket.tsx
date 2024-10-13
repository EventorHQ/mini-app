import { useDateFormat } from "@/hooks/use-date-format";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Caption, Modal, Text, Title } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { useEffect, useState, useSyncExternalStore } from "react";
import QRCode from "react-qr-code";

type TicketEvent = {
  id: string;
  title: string;
  date: Date;
  location: string;
};

let listeners: VoidFunction[] = [];
let ticketState: TicketEvent | undefined = undefined;

export const ticketStore = {
  setTicket(event: TicketEvent) {
    ticketState = { ...event };
    emitChange();
  },
  subscribe(listener: VoidFunction) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return ticketState;
  },
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const ticket = (event: TicketEvent) => {
  ticketStore.setTicket(event);
};

export function Ticket() {
  const event = useSyncExternalStore(
    ticketStore.subscribe,
    ticketStore.getSnapshot,
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (event) {
      setIsVisible(true);
    }
  }, [event]);

  return (
    <Modal
      open={isVisible}
      onOpenChange={setIsVisible}
      header={<ModalHeader className=" text-black">Ваш Билет</ModalHeader>}
      className="h-screen bg-white"
    >
      <TicketContent event={event} />
    </Modal>
  );
}

function TicketContent({ event }: { event: TicketEvent | undefined }) {
  const { initDataRaw } = retrieveLaunchParams();
  const format = useDateFormat();
  const value = initDataRaw ? `${initDataRaw}&event_id=${event?.id}` : null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="h-[11px] w-[80px] rounded-r-[11px] bg-gray-100" />
        <div className="h-[11px] w-[80px] rounded-[11px] bg-gray-100" />
        <div className="h-[11px] w-[80px] rounded-[11px] bg-gray-100" />
        <div className="h-[11px] w-[80px] rounded-l-[11px] bg-gray-100" />
      </div>
      <div className="flex flex-col items-center pt-6">
        <div className="text-black flex flex-col w-full px-5">
          <Title Component="h1" weight="1">
            {event?.title}
          </Title>
          <Text>{format(event?.date)}</Text>
          <Caption>{event?.location}</Caption>
        </div>
        <div className="pt-20">
          {value && <QRCode value={value} size={200} />}
        </div>
      </div>
    </div>
  );
}
