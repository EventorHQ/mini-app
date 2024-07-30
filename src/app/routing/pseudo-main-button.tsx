import { cn, getBottomPadding } from "@/lib/utils";
import type { PseudoMainButtonParams } from "@/store/tabbar-context";
import { Button } from "@telegram-apps/telegram-ui";

interface PseudoMainButtonProps extends PseudoMainButtonParams {
  padding?: boolean;
}

export default function PseudoMainButton(props: PseudoMainButtonProps) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center pt-4 pb-2 px-5 custom-navbar surface",
        props.padding && getBottomPadding()
      )}
    >
      <Button size="l" className="w-full">
        {props.text}
      </Button>
    </div>
  );
}
