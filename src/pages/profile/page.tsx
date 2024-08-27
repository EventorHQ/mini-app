import { useGetUserQuery } from "@/api/users";
import AvatarInput from "@/components/avatar-input";
import { Cell, List, Section } from "@telegram-apps/telegram-ui";
import { TonConnectButton } from "@tonconnect/ui-react";

export default function ProfilePage() {
  const { data, isLoading } = useGetUserQuery();
  // const [isEditing, setIsEditing] = useState(false);
  // const [formData, setFormData] = useState<
  //   Record<string, string | number | undefined>
  // >({
  //   firstName: data?.firstName,
  //   lastName: data?.lastName,
  // });

  // const toggleEditing = () => {
  //   setIsEditing((prev) => !prev);
  // };

  // const handleSubmit = () => {
  //   toggleEditing();
  // };

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {/* <div className="fixed top-4 left-0 right-0 px-4 flex justify-between">
        <Button
          size="s"
          mode="plain"
          onClick={toggleEditing}
          className={isEditing ? "" : "invisible"}
        >
          Отмена
        </Button>
        <Button
          size="s"
          mode={isEditing ? "plain" : "bezeled"}
          onClick={isEditing ? handleSubmit : toggleEditing}
        >
          {isEditing ? "Готово" : "Изм"}
        </Button>
      </div> */}
      <AvatarInput />
      <Section
        header="Ваши данные"
        footer="Данные профиля используются для быстрого заполнения форм при посещении мероприятий"
      >
        <Cell>{data.firstName}</Cell>
        <Cell>{data.lastName}</Cell>
      </Section>
      {/* {isEditing && (
        <Section>
          <Input
            placeholder="Имя"
            header="Имя"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <Input
            placeholder="Фамилия"
            header="Фамилия"
            multiple
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </Section>
      )} */}
      <TonConnectButton />
    </List>
  );
}
