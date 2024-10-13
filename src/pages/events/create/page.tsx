import { useCreateEventMutation } from "@/api/events";
import { useGetOrgsQuery } from "@/api/orgs";
import DateCell from "@/components/date-cell";
import FileCell from "@/components/file-cell";
import { Cancel24Icon } from "@/components/ui/icons/cancel24";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton, useMainButton } from "@telegram-apps/sdk-react";
import {
  Cell,
  FileInput,
  Input,
  List,
  Section,
  Select,
  Switch,
  Textarea,
} from "@telegram-apps/telegram-ui";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "@/hooks/use-navigate";
import FormFields from "./form-fields";
import { FormField } from "@/types";
import { toast } from "sonner";

type FormData = {
  title: string;
  description: string;
  location: string;
  org_id: string | undefined;
  start_date: Date | undefined;
  end_date: Date | undefined;
  cover: File | undefined;
  form: FormField[];
};

export default function CreateEventPage() {
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const { data: orgs } = useGetOrgsQuery();
  const { mutateAsync: createEvent } = useCreateEventMutation();
  const { setParams, setIsVisible } = useTabbarActions();
  const bb = useBackButton();
  const mb = useMainButton();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: "",
    org_id: undefined,
    start_date: new Date(),
    end_date: undefined,
    cover: undefined,
    form: [],
  });

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    setFormData((prev) => ({ ...prev, cover: file }));
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: evt.target.value }));
    };

  const handleFormChange = (fields: FormField[]) => {
    setFormData((prev) => ({ ...prev, form: fields }));
  };

  useEffect(() => {
    setIsVisible(false);
    setParams({
      isVisible: false,
    });

    return () => {
      mb.hide();
    };
  }, []);

  useEffect(() => {
    const handleClick = async () => {
      mb.showLoader();

      createEvent({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        org_id: formData.org_id!,
        start_date: formData.start_date || new Date(),
        end_date: isMultipleDays ? formData.end_date : undefined,
        cover: formData.cover!,
        form: formData.form,
      })
        .then((result) => {
          navigate(`/events/${result.id}`);
          toast.success("Мероприятие создано");
        })
        .catch((error) => {
          // TODO: aggregate errors server-side, return in more pleasing interface
          toast.error("Ошибка создания мероприятия", {
            description: error.response.data.error.issues.reduce(
              (acc: string, issue: { message: string }) => {
                return acc + " " + issue.message;
              },
              "",
            ),
          });
        })
        .finally(() => {
          mb.hideLoader();
        });
    };

    mb.on("click", handleClick);
    mb.setParams({
      text: "Создать",
      isEnabled: true,
      isVisible: true,
      isLoaderVisible: false,
    });

    return () => {
      mb.off("click", handleClick);
    };
  }, [formData]);

  useEffect(() => {
    const handleBackButtonClick = () => {
      navigate("/");
    };

    bb.on("click", handleBackButtonClick);
    bb.show();

    return () => {
      bb.off("click", handleBackButtonClick);
    };
  }, []);

  return (
    <List>
      <Section header="Основная информация">
        <Input
          placeholder="Название"
          header="Название"
          value={formData.title}
          onChange={handleInputChange("title")}
        />
        <DateCell
          date={formData.start_date}
          onDateChange={(date) =>
            setFormData((formData) => ({ ...formData, start_date: date }))
          }
        >
          Дата начала
        </DateCell>
        <Cell
          after={
            <Switch
              checked={isMultipleDays}
              onChange={() => setIsMultipleDays(!isMultipleDays)}
            />
          }
        >
          Несколько дней
        </Cell>
        {isMultipleDays && (
          <DateCell
            date={formData.end_date}
            fromDate={formData.start_date}
            onDateChange={(date) =>
              setFormData((formData) => ({ ...formData, end_date: date }))
            }
          >
            Дата окончания
          </DateCell>
        )}
        <Textarea
          placeholder="Место проведения"
          header="Место проведения"
          value={formData.location}
          onChange={handleInputChange("location")}
        />
      </Section>
      <Section header="Организатор">
        <Select onChange={handleInputChange("org_id")}>
          <option>Выбрать</option>
          {orgs
            ? orgs.map(({ organization }) => (
                <option value={organization.id} key={organization.id}>
                  {organization.title}
                </option>
              ))
            : null}
        </Select>
      </Section>
      <Section header="Обложка">
        {formData.cover ? (
          <>
            <FileCell
              file={formData.cover}
              after={
                <Cancel24Icon
                  className="text-tg-hint"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, cover: undefined }))
                  }
                />
              }
            />
            <FileInput
              label="Выбрать изображение"
              onChange={handleFileChange}
            />
          </>
        ) : (
          <FileInput label="Выбрать изображение" onChange={handleFileChange} />
        )}
      </Section>
      <Section header="О мероприятии">
        <Textarea
          placeholder="Подробная информация о мероприятии"
          value={formData.description}
          onChange={handleInputChange("description")}
        />
      </Section>
      <FormFields fields={formData.form} onFieldsChange={handleFormChange} />
    </List>
  );
}
