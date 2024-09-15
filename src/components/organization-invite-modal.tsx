import {
  Button,
  ButtonCell,
  Cell,
  List,
  Modal,
  Section,
  Selectable,
  Switch,
} from "@telegram-apps/telegram-ui";
import { PersonAdd28Icon } from "./ui/icons/person-add28";
import { Close28Icon } from "./ui/icons/close28";
import { OrganizationRole, User } from "@/types";
import { useState } from "react";
import { useCreateInviteLinkMutation } from "@/api/orgs";
import { useLaunchParams, useUtils } from "@telegram-apps/sdk-react";
import { APP_URL } from "@/config/config";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/copy-to-clipboard";

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

const getRoles = (role: OrganizationRole | undefined) => {
  if (role === "admin") {
    return roles;
  }

  return roles.filter((role) => role.value !== "admin");
};

const descriptions: Record<OrganizationRole, string> = {
  member: "Сотрудник сможет создавать и редактировать мероприятия",
  moderator:
    "Сотрудник сможет создавать и редактировать мероприятия, а также приглашать участников, но не выше своей должности",
  admin:
    "Администратор имеет право изменять данные организации и должности ее участников",
};

interface OrganizationInviteModalProps {
  orgId: number;
  currentUser: User;
}

export default function OrganizationInviteModal({
  orgId,
  currentUser,
}: OrganizationInviteModalProps) {
  const [selectedRole, setSelectedRole] = useState<OrganizationRole>("member");
  const [isReusable, setIsReusable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { mutateAsync: createInviteLink } = useCreateInviteLinkMutation(orgId);
  const utils = useUtils();
  const lp = useLaunchParams();
  const handleRoleSelectionChange = (role: OrganizationRole) => () => {
    setSelectedRole(role);
  };

  const handleInviteClick = () => {
    setIsLoading(true);
    createInviteLink({
      isReusable,
      role: selectedRole,
      orgId,
    })
      .then(({ id }) => {
        const link = `${APP_URL}?startapp=${id}`;

        if (lp.platform.startsWith("web")) {
          copyToClipboard(link)
            .then(() => {
              toast.success("Ссылка скопирована в буфер обмена");
            })
            .catch(() => {
              toast.error("Не удалось скопировать ссылку");
            });
        } else {
          utils.shareURL(link);
        }
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
          header="Тип ссылки"
          footer={
            isReusable
              ? "Ссылка будет действительна пока модератор её не отменит"
              : "Ссылка будет действительна только один раз"
          }
        >
          <Cell
            className="bg-tg-bg-section"
            after={
              <Switch
                checked={isReusable}
                onChange={(e) => setIsReusable(e.target.checked)}
              />
            }
          >
            Многоразовая
          </Cell>
        </Section>
        <Section
          header="Уровень доступа"
          footer={
            <Section.Footer className="min-h-24">
              {descriptions[selectedRole]}
            </Section.Footer>
          }
        >
          {getRoles(currentUser.role).map(({ value, label }) => (
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
