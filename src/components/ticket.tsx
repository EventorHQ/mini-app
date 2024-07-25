import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { Title, Text, Caption } from "@telegram-apps/telegram-ui";
import QRCode from "react-qr-code";

interface TicketProps {
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}

export default function Ticket({
  eventTitle,
  eventDate,
  eventLocation,
}: TicketProps) {
  const { initDataRaw } = retrieveLaunchParams();

  return (
    <div className="h-screen w-screen pt-12 bg-black">
      <div className="h-full w-full bg-white rounded-t-[47px] relative">
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
                {eventTitle}
              </Title>
              <Text>{eventDate}</Text>
              <Caption>{eventLocation}</Caption>
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
