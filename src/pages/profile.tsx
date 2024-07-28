import AvatarInput from "@/components/avatar-input";
import { Edit28Icon } from "@/components/ui/icons/edit28";
import { ButtonCell, Cell, List, Section } from "@telegram-apps/telegram-ui";

export default function ProfilePage() {
  return (
    <List>
      <AvatarInput />
      <Section
        header="Ваши данные"
        footer="Данные профиля используются для быстрого заполнения форм при посещении мероприятий"
      >
        <Cell>Владимир</Cell>
        <Cell>Ильин</Cell>
      </Section>
      <Section className="pt-3">
        <ButtonCell before={<Edit28Icon />}>Редактировать</ButtonCell>
      </Section>
    </List>
  );
}
