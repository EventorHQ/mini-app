import { cn } from "@/lib/utils";
import { Avatar, Button, Subheadline } from "@telegram-apps/telegram-ui";
import { HTMLAttributes } from "react";

export interface AvatarInputProps extends HTMLAttributes<HTMLInputElement> {}

export default function AvatarInput({
  className,
  ...restProps
}: AvatarInputProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Avatar
        size={96}
        src="https://avatars.githubusercontent.com/u/66038379?v=4"
      />
      <Button mode="plain" Component="label" className="text-tg-hint">
        <Subheadline>Выбрать</Subheadline>
        <input type="file" className="hidden" {...restProps} />
      </Button>
    </div>
  );
}
