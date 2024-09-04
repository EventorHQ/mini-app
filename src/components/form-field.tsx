import { FormFieldType } from "@/types";
import { Input, InputProps } from "@telegram-apps/telegram-ui";

export interface FormFieldProps extends InputProps {
  type: FormFieldType;
}

export default function FormField({ type, ...props }: FormFieldProps) {
  switch (type) {
    case "text":
      return <Input {...props} />;
    case "wallet":
      return <Input {...props} />;
  }
}
