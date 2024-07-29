import type { PseudoMainButtonParams } from "@/store/tabbar-context";
import { Button } from "@telegram-apps/telegram-ui";

export default function PseudoMainButton(props: PseudoMainButtonParams) {
  return (
    <div className="w-full flex items-center justify-center pt-4 pb-2 px-5 custom-navbar surface">
      <Button size="l" className="w-full">
        {props.text}
      </Button>
    </div>
  );
}
