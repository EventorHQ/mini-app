import { useInitData } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useStartApp = () => {
  const initData = useInitData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initData?.startParam) {
      return;
    }

    const suspectedEventId = Number(initData.startParam);

    if (isNaN(suspectedEventId)) {
      navigate(`/invitation/${initData.startParam}`);
    } else {
      navigate(`/events/${suspectedEventId}`);
    }
  }, [initData]);
};
