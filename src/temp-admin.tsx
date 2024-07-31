import { useQRScanner } from "@telegram-apps/sdk-react";
import { Button } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { useTabbar } from "./hooks/use-tabbar";
import { useTabbarActions } from "./hooks/use-tabbar-actions";

export default function TempAdmin() {
  const scanner = useQRScanner();
  const { params } = useTabbar();
  const { setParams } = useTabbarActions();

  useEffect(() => {
    return scanner.on("change", (data) => {
      if (!scanner.isOpened) {
        alert(JSON.stringify(data));
      }
    });
  }, [scanner]);

  return (
    <div className="flex items-center justify-center flex-wrap w-full gap-4">
      <Button
        onClick={() =>
          scanner.open({
            capture: (data) => {
              alert(JSON.stringify(data));
              return true;
            },
            text: "Scan QR",
          })
        }
      >
        QR
      </Button>
      <Button
        onClick={() =>
          setParams({
            ...params,
            isVisible: !params.isVisible,
          })
        }
      >
        MB
      </Button>
    </div>
  );
}
