import { Organization } from "@/types";
import {
  Avatar,
  Button,
  Cell,
  Input,
  List,
  Section,
  Tappable,
  Textarea,
  Title,
} from "@telegram-apps/telegram-ui";
import { ChangeEventHandler, FC, useState } from "react";
import AvatarInput from "./avatar-input";
import { getRole } from "@/lib/get-role";
import { useInitData } from "@telegram-apps/sdk-react";
import { Ellipsis24Icon } from "./ui/icons/ellipsis24";
import { cn } from "@/lib/utils";
import Check16Icon from "./ui/icons/check16";
import { useUpdateOrganizationMutation } from "@/api/orgs";
import OrganizationInviteModal from "./organization-invite-modal";

interface OrganizationProfileProps {
  organization: Organization;
}

const BaseOrganizationInfo: FC<
  OrganizationProfileProps & {
    isEditing: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  }
> = ({ organization, isEditing, onChange }) => {
  return (
    <>
      <AvatarInput
        src={organization.avatar}
        isEditing={isEditing}
        onChange={onChange}
      />
      <div
        className={cn(
          "flex items-center justify-center gap-2",
          isEditing && "hidden"
        )}
      >
        <Title level="1" weight="1">
          {organization.title}
        </Title>
        {organization.isFancy && <Check16Icon />}
      </div>
      {!isEditing && (
        <Section>
          {organization.description ? (
            <Cell multiline hovered={false}>
              {organization.description}
            </Cell>
          ) : (
            <Cell className="text-tg-hint" hovered={false}>
              Описание отсутствует
            </Cell>
          )}
        </Section>
      )}
    </>
  );
};

export const OrganizationProfileMember: FC<OrganizationProfileProps> = ({
  organization,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation();
  const [formData, setFormData] = useState<{
    title?: string;
    description?: string;
    avatar?: File;
  }>({
    title: organization.title,
    description: organization.description,
  });

  const initData = useInitData();

  const currentUser = organization.members!.find(
    (member) => member.id === initData?.user?.id
  )!;

  const toggleEditing = () => {
    setFormData({
      title: organization.title,
      description: organization.description,
    });
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = () => {
    updateOrganization({
      id: organization.id,
      title: formData.title,
      description: formData.description,
      avatar: formData.avatar,
    }).then(() => {
      setIsEditing(false);
    });
  };

  return (
    <List>
      <div className="fixed top-4 left-0 right-0 px-4 flex justify-between">
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
      </div>
      <BaseOrganizationInfo
        organization={organization}
        isEditing={isEditing}
        onChange={(e) =>
          setFormData({ ...formData, avatar: e.target.files?.[0] })
        }
      />
      {isEditing && (
        <Section>
          <Input
            placeholder="Название"
            header="Название"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Textarea
            placeholder="Описание"
            header="Описание"
            multiple
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Section>
      )}
      {!isEditing && organization.members && (
        <Section header="Сотрудники">
          {organization.members.map((member) => (
            <Cell
              key={`member-${member.id}`}
              before={<Avatar src={member.avatar} size={48} />}
              description={getRole(member.role)}
              after={
                member.id === currentUser.id ? (
                  <span className="text-tg-hint">Вы</span>
                ) : currentUser.role == "admin" ? (
                  <Tappable>
                    <Ellipsis24Icon className="text-tg-hint" />
                  </Tappable>
                ) : null
              }
            >
              {member.firstName} {member.lastName}
            </Cell>
          ))}
          <OrganizationInviteModal orgId={organization.id} />
        </Section>
      )}
    </List>
  );
};

export const OrganizationProfileVisitor: FC<OrganizationProfileProps> = ({
  organization,
}) => {
  return (
    <List>
      <BaseOrganizationInfo organization={organization} isEditing={false} />
    </List>
  );
};
