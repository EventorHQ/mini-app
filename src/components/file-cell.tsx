import { Cell, CellProps, Image } from "@telegram-apps/telegram-ui";
import { useMemo } from "react";

export interface FileCellProps extends CellProps {
  file: File;
}

export default function FileCell({ file, ...props }: FileCellProps) {
  const src = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <Cell {...props} before={<Image src={src} />} description="Изображение">
      {file.name}
    </Cell>
  );
}
