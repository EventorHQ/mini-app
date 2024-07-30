import { cn } from "@/lib/utils";
import { Event } from "@/types";
import {
  retrieveLaunchParams,
  useBackButton,
  useMiniApp,
} from "@telegram-apps/sdk-react";
import { Caption, Text, Title } from "@telegram-apps/telegram-ui";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";

const ANIMATION_DURATION_MS = 1000;

interface TicketProps {
  event: Event;
  children?: ReactNode;
  backButtonHandler?: () => void;
}

export function Ticket({ event, children, backButtonHandler }: TicketProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayClassName, setDisplayClassName] = useState("hidden");

  const miniApp = useMiniApp();
  const bb = useBackButton();

  const toggleTicket = () => {
    // if (isVisible) {
    //   miniApp.setHeaderColor("secondary_bg_color");
    // } else {
    //   miniApp.setHeaderColor("#000000");
    // }
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (backButtonHandler) {
      if (isVisible) {
        bb.off("click", backButtonHandler);
        bb.on("click", toggleTicket);

        return () => {
          bb.off("click", toggleTicket);
          bb.on("click", backButtonHandler);
        };
      }
    } else if (isVisible) {
      bb.on("click", toggleTicket);
      bb.show();
      return () => {
        bb.off("click", toggleTicket);
        bb.hide();
      };
    }
  }, [isVisible]);

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
      }, ANIMATION_DURATION_MS);

      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  return (
    <>
      {createPortal(
        <div
          className={cn(
            `h-screen fixed top-0 left-0 w-full z-50 bg-black transition-opacity duration-${ANIMATION_DURATION_MS}`,
            displayClassName
          )}
        >
          <TicketContent event={event} isOpen={isVisible} />
        </div>,
        document.getElementById("ticket-root") || document.body
      )}
      <div onClick={toggleTicket}>{children}</div>
    </>
  );
}

function TicketContent({ event, isOpen }: { event: Event; isOpen: boolean }) {
  const { initDataRaw } = retrieveLaunchParams();
  const [translateClassName, setTranslateClassName] =
    useState("translate-y-96");

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

  return (
    <div className="h-screen w-screen pt-12 bg-transparent">
      <div
        className={cn(
          "h-full w-full bg-white rounded-t-[47px] relative transition-transform duration-1000 translate-y-96",
          translateClassName
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
                {event.title}
              </Title>
              <Text>{event.date}</Text>
              <Caption>{event.location}</Caption>
            </div>
            <div className="pt-20">
              {initDataRaw && <QRCode value={initDataRaw} size={200} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
