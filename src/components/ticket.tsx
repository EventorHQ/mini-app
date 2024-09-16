import { useDateFormat } from "@/hooks/use-date-format";
import { cn } from "@/lib/utils";
import { retrieveLaunchParams, useMiniApp } from "@telegram-apps/sdk-react";
import { Button, Caption, Text, Title } from "@telegram-apps/telegram-ui";
import { useEffect, useState, useSyncExternalStore } from "react";
import QRCode from "react-qr-code";

const ANIMATION_DURATION_MS = 500;

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
  const [displayClassName, setDisplayClassName] = useState("hidden");

  const miniApp = useMiniApp();

  useEffect(() => {
    if (event) {
      setIsVisible(true);
    }
  }, [event]);

  const closeTicket = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isVisible) {
      setDisplayClassName("opacity-0 block");
      const timeout = setTimeout(() => {
        miniApp.setHeaderColor("#000000");
        setDisplayClassName("opacity-100");
      }, 50);

      return () => clearTimeout(timeout);
    } else {
      setDisplayClassName("opacity-0");
      miniApp.setHeaderColor("secondary_bg_color");
      const timeout = setTimeout(() => {
        setDisplayClassName("opacity-0 hidden");
        ticketState = undefined;
      }, ANIMATION_DURATION_MS);

      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  return (
    <div
      className={cn(
        `h-screen fixed top-0 left-0 w-full z-50 bg-black transition-opacity duration-500`,
        displayClassName,
      )}
    >
      <TicketContent event={event} isOpen={isVisible} onClose={closeTicket} />
    </div>
  );
}

function TicketContent({
  event,
  isOpen,
  onClose,
}: {
  event: TicketEvent | undefined;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { initDataRaw } = retrieveLaunchParams();
  const [translateClassName, setTranslateClassName] =
    useState("translate-y-96");
  const format = useDateFormat();

  useEffect(() => {
    if (!isOpen) {
      setTranslateClassName("translate-y-96");
    } else {
      const timeout = setTimeout(() => {
        setTranslateClassName("translate-y-0");
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const value = initDataRaw ? `${initDataRaw}&event_id=${event?.id}` : null;

  return (
    <div className="h-screen w-screen pt-12 bg-transparent">
      <div
        className={cn(
          "h-full w-full bg-white rounded-t-[47px] relative transition-transform duration-1000 translate-y-96",
          translateClassName,
        )}
      >
        <div className="absolute top-0 left-[50%] -translate-x-[50%] -translate-y-[50%] h-[79px] w-[112px] rounded-[50%] bg-black"></div>
        <div className="h-full pt-24">
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
            <Button
              onClick={onClose}
              mode="outline"
              className="mt-10 text-black"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
