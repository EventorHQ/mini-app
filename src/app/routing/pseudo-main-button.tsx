import { cn } from "@/lib/utils";
import type { PseudoMainButtonParams } from "@/store/tabbar-context";
import { Button } from "@telegram-apps/telegram-ui";

interface PseudoMainButtonProps extends PseudoMainButtonParams {
  padding?: boolean;
}

export default function PseudoMainButton(props: PseudoMainButtonProps) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-center pt-4 px-5 custom-navbar surface",
        props.padding && "pb-4"
      )}
    >
      <Button
        size="l"
        className="w-full"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.text}
      </Button>
    </div>
  );
}
