import { Organization } from "@/types";
import {
  Avatar,
  ButtonCell,
  Cell,
  List,
  Section,
} from "@telegram-apps/telegram-ui";
import { FC } from "react";
import AvatarInput from "./avatar-input";
import { Edit28Icon } from "./ui/icons/edit28";
import Person24Icon from "./ui/icons/person24";
import { getRole } from "@/lib/get-role";
import { useInitData } from "@telegram-apps/sdk-react";

interface OrganizationProfileProps {
  organization: Organization;
}

export const OrganizationProfileMember: FC<OrganizationProfileProps> = ({
  organization,
}) => {
  const initData = useInitData();
  return (
    <List>
      <AvatarInput />
      <Section header="Основная информация">
        <Cell>{organization.title}</Cell>
        <Cell>{organization.description}</Cell>
        <ButtonCell before={<Edit28Icon />}>Редактировать</ButtonCell>
      </Section>
      {organization.members && (
        <Section header="Сотрудники">
          {organization.members.map((member) => (
            <Cell
              key={`member-${member.id}`}
              before={<Avatar src={member.avatar} size={48} />}
              description={getRole(member.role)}
              after={member.id === initData?.user?.id ? "Вы" : undefined}
            >
              {member.firstName} {member.lastName}
            </Cell>
          ))}
          <ButtonCell before={<Person24Icon />}>Пригласить</ButtonCell>
        </Section>
      )}
    </List>
  );
};

export const OrganizationProfileVisitor: FC<OrganizationProfileProps> = () => {
  return <div>OrganizationProfileVisitor</div>;
};
