import FileCell from "@/components/file-cell";
import { Cancel24Icon } from "@/components/ui/icons/cancel24";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import {
  FileInput,
  Input,
  List,
  Section,
  Textarea,
} from "@telegram-apps/telegram-ui";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewOrganizationPage() {
  const [file, setFile] = useState<File | undefined>(undefined);

  const bb = useBackButton();
  const navigate = useNavigate();
  const { setIsVisible } = useTabbarActions();

  useEffect(() => {
    const handleClick = () => {
      navigate(-1);
    };

    !bb.isVisible && bb.show();
    setIsVisible(false);
    bb.on("click", handleClick);

    return () => {
      bb.off("click", handleClick);
      bb.hide();
    };
  }, []);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    setFile(file);
  };

  const handleCancel = () => {
    setFile(undefined);
  };

  return (
    <List>
      <Section header="Основная информация">
        <Input placeholder="Название" />
        <Textarea placeholder="Описание" />
      </Section>
      {file ? (
        <Section header="Аватар">
          <FileCell
            file={file}
            after={<Cancel24Icon onClick={handleCancel} />}
          />
          <FileInput label="Выбрать изображение" onChange={handleInputChange} />
        </Section>
      ) : (
        <Section header="Аватар">
          <FileInput label="Выбрать изображение" onChange={handleInputChange} />
        </Section>
      )}
    </List>
  );
}
