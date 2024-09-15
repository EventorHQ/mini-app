import { Cell, CellProps, Image } from "@telegram-apps/telegram-ui";
import { useMemo } from "react";

export interface FileCellProps extends CellProps {
  file: File;
  defaultSrc?: string;
}

export default function FileCell({
  file,
  defaultSrc,
  ...props
}: FileCellProps) {
  const src = useMemo(
    () => defaultSrc || URL.createObjectURL(file),
    [file, defaultSrc],
  );

  return (
    <Cell {...props} before={<Image src={src} />} description="Изображение">
      {file.name}
    </Cell>
  );
}
