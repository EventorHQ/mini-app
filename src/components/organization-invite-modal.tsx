import {
  Button,
  ButtonCell,
  Cell,
  List,
  Modal,
  Section,
  Selectable,
} from "@telegram-apps/telegram-ui";
import { PersonAdd28Icon } from "./ui/icons/person-add28";
import { Close28Icon } from "./ui/icons/close28";
import { OrganizationRole } from "@/types";
import { useState } from "react";
import { useCreateInviteLinkMutation } from "@/api/orgs";
import { useUtils } from "@telegram-apps/sdk-react";
import { APP_URL } from "@/config/config";

const roles: { value: OrganizationRole; label: string }[] = [
  {
    value: "member",
    label: "Участник",
  },
  {
    value: "moderator",
    label: "Модератор",
  },
  {
    value: "admin",
    label: "Администратор",
  },
];

const descriptions: Record<OrganizationRole, string> = {
  member: "Сотрудник сможет создавать и редактировать мероприятия",
  moderator:
    "Сотрудник сможет создавать и редактировать мероприятия, а также приглашать участников, но не выше своей должности",
  admin:
    "Администратор имеет право изменять данные организации и должности ее участников",
};

interface OrganizationInviteModalProps {
  orgId: number;
}

export default function OrganizationInviteModal({
  orgId,
}: OrganizationInviteModalProps) {
  const [selectedRole, setSelectedRole] = useState<OrganizationRole>("member");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { mutateAsync: createInviteLink } = useCreateInviteLinkMutation();
  const utils = useUtils();

  const handleRoleSelectionChange = (role: OrganizationRole) => () => {
    setSelectedRole(role);
  };

  const handleInviteClick = () => {
    setIsLoading(true);
    createInviteLink({
      orgId,
      role: selectedRole,
    })
      .then(({ id }) => {
        utils.shareURL(`${APP_URL}?startapp=${id}`);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      overlayComponent={<Modal.Overlay />}
      className="bg-tg-bg-second"
      header={
        <Modal.Header
          after={
            <Modal.Close>
              <Close28Icon style={{ color: "var(--tgui--plain_foreground)" }} />
            </Modal.Close>
          }
        />
      }
      trigger={<ButtonCell before={<PersonAdd28Icon />}>Пригласить</ButtonCell>}
    >
      <List className="bg-tg-bg-second">
        <Section
          header="Уровень доступа"
          footer={
            <Section.Footer className="min-h-24">
              {descriptions[selectedRole]}
            </Section.Footer>
          }
        >
          {roles.map(({ value, label }) => (
            <Cell
              key={value}
              className="bg-tg-bg-section"
              Component="label"
              before={
                <Selectable
                  name="group"
                  value={value}
                  checked={selectedRole === value}
                  onChange={handleRoleSelectionChange(value)}
                />
              }
            >
              {label}
            </Cell>
          ))}
        </Section>
        <Button
          size="l"
          stretched
          onClick={handleInviteClick}
          loading={isLoading}
        >
          Пригласить
        </Button>
      </List>
    </Modal>
  );
}
