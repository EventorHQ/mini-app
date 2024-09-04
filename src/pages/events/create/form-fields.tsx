import { useState } from "react";
import {
  Section,
  Cell,
  ButtonCell,
  Accordion,
  Switch,
  Button,
  Chip,
} from "@telegram-apps/telegram-ui";
import { Cancel24Icon } from "@/components/ui/icons/cancel24";
import { FormField, FormFieldType, formFieldTypes } from "@/types";

const formFieldTypeLabel = (type: FormFieldType) => {
  switch (type) {
    case "text":
      return "Текст";
    case "wallet":
      return "Кошелек";
  }
};

interface Props {
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
}

export default function FormFields({ fields, onFieldsChange }: Props) {
  const [expanded, setExpanded] = useState<number | null>();

  const addField = () => {
    onFieldsChange([
      ...fields,
      { type: "text", label: "Новое поле", required: false },
    ]);
  };

  const handleExpandedChange = (index: number) => () => {
    setExpanded(index === expanded ? null : index);
  };

  return (
    <Section header="Форма регистрации">
      {fields.map((field, index) => (
        <Accordion
          key={`${field.label}-${index}`}
          onChange={handleExpandedChange(index)}
          expanded={expanded === index}
        >
          <Accordion.Summary className="relative">
            <div className="flex items-center justify-between w-full">
              <div>{field.label}</div>
              <Button
                mode="plain"
                className="absolute right-8"
                size="s"
                onClick={(e) => {
                  e.stopPropagation();
                  onFieldsChange(fields.filter((_, i) => i !== index));
                }}
              >
                <Cancel24Icon className="text-tg-destructive scale-75" />
              </Button>
            </div>
          </Accordion.Summary>
          <Accordion.Content>
            <Cell
              after={
                <input
                  className="m-0 text-right flex text-tg-text tg-body outline-none bg-transparent"
                  placeholder="Название"
                  defaultValue={field.label}
                  onBlur={(e) => {
                    onFieldsChange(
                      fields.map((field, i) =>
                        i === index
                          ? { ...field, label: e.target.value }
                          : field,
                      ),
                    );
                  }}
                />
              }
            >
              Название
            </Cell>
            <Cell
              after={
                <Chip mode="mono">
                  <select
                    className="bg-transparent appearance-none outline-none text-center"
                    value={field.type}
                    onChange={(e) => {
                      onFieldsChange(
                        fields.map((field, i) =>
                          i === index
                            ? {
                                ...field,
                                type: e.target.value as FormFieldType,
                              }
                            : field,
                        ),
                      );
                    }}
                  >
                    {formFieldTypes.map((type) => (
                      <option key={type} value={type}>
                        {formFieldTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                </Chip>
              }
            >
              Тип
            </Cell>
            <Cell
              after={
                <Switch
                  checked={field.required}
                  onChange={(e) => {
                    onFieldsChange(
                      fields.map((field, i) =>
                        i === index
                          ? { ...field, required: e.target.checked }
                          : field,
                      ),
                    );
                  }}
                />
              }
            >
              Обязательное
            </Cell>
          </Accordion.Content>
        </Accordion>
      ))}
      <ButtonCell
        before={<Cancel24Icon className="text-tg-link rotate-45" />}
        onClick={addField}
      >
        Добавить поле
      </ButtonCell>
    </Section>
  );
}
