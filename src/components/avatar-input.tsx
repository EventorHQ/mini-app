import { cn } from "@/lib/utils";
import { Avatar, Button } from "@telegram-apps/telegram-ui";
import { HTMLAttributes } from "react";

export interface AvatarInputProps extends HTMLAttributes<HTMLInputElement> {
  src?: string;
  isEditing?: boolean;
}

export default function AvatarInput({
  className,
  src,
  isEditing = false,
  ...restProps
}: AvatarInputProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Avatar size={96} src={src} />
      <Button
        mode="plain"
        Component="label"
        className={cn("text-tg-hint mb-1", !isEditing && "hidden")}
      >
        Выбрать
        <input type="file" className="hidden" {...restProps} />
      </Button>
    </div>
  );
}
