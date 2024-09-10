import { useCreateOrgMutation } from "@/api/orgs";
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
import { useNavigate } from "@/hooks/use-navigate";
import { toast } from "sonner";

type OrganizationFormData = {
  title: string;
  description: string;
  avatar: File | undefined;
};

export default function NewOrganizationPage() {
  const [formData, setFormData] = useState<OrganizationFormData>({
    title: "",
    description: "",
    avatar: undefined,
  });

  const bb = useBackButton();
  const navigate = useNavigate();
  const { mutateAsync: createOrg } = useCreateOrgMutation();
  const { setIsVisible, setParams } = useTabbarActions();

  useEffect(() => {
    const handleClick = () => {
      navigate("/orgs");
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
    console.log(file);
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  const handleCancel = () => {
    setFormData((prev) => ({ ...prev, avatar: undefined }));
  };

  useEffect(() => {
    setParams({
      onClick: () => {
        createOrg(formData)
          .then((res) => {
            navigate(`/orgs/${res.id}`);
            toast.success("Организация создана");
          })
          .catch((error) => {
            toast.error("Ошибка создания организации", {
              description: error.response.data.error.issues.reduce(
                (acc: string, issue: { message: string }) => {
                  return acc + " " + issue.message;
                },
                "",
              ),
            });
          });
      },
      text: "Создать",
      isVisible: true,
    });
  }, [formData]);

  return (
    <List>
      <Section header="Основная информация">
        <Input
          placeholder="Название"
          onChange={(e0) =>
            setFormData((prev) => ({ ...prev, title: e0.target.value }))
          }
        />
        <Textarea
          placeholder="Описание"
          onChange={(e1) =>
            setFormData((prev) => ({ ...prev, description: e1.target.value }))
          }
        />
      </Section>
      {formData.avatar ? (
        <Section header="Аватар">
          <FileCell
            file={formData.avatar}
            after={
              <Cancel24Icon className="text-tg-hint" onClick={handleCancel} />
            }
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
