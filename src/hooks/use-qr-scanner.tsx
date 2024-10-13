import { useQRScanner, usePopup } from "@telegram-apps/sdk-react";
import { useNavigate } from "./use-navigate";

export const useQRScan = (eventId: string | number) => {
  const scanner = useQRScanner();
  const navigate = useNavigate();
  const popup = usePopup();

  const handleClick = () => {
    if (scanner.supports("open")) {
      scanner
        .open({
          text: "Просканируйте QR-код на билете участника",
        })
        .then((ticketValue) => {
          if (!ticketValue) {
            return;
          }

          navigate(`/events/${eventId}/checkin`, {
            state: { initDataRaw: ticketValue },
          });
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

  return handleClick;
};
