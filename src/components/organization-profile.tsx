import { Organization, User } from "@/types";
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
import { getNextRole, getPrevRole, getRole } from "@/lib/get-role";
import {
  useHapticFeedback,
  useInitData,
  usePopup,
} from "@telegram-apps/sdk-react";
import { Ellipsis24Icon } from "./ui/icons/ellipsis24";
import { cn } from "@/lib/utils";
import Check16Icon from "./ui/icons/check16";
import { useUpdateOrganizationMutation } from "@/api/orgs";
import OrganizationInviteModal from "./organization-invite-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bin24Icon } from "./ui/icons/bin24";
import { ArrowUpCircleFill20Icon } from "./ui/icons/arrowupcirclefill20";
import { useUpdateUserRoleMutation } from "@/api/users";
import { toast } from "sonner";
import Chevron16Icon from "./ui/icons/chevron16";
import { useNavigate } from "@/hooks/use-navigate";
import Invites30FilledIcon from "./ui/icons/invites30";

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
          isEditing && "hidden",
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
  const { mutateAsync: updateUserRole } = useUpdateUserRoleMutation(
    organization.id,
  );
  const [formData, setFormData] = useState<{
    title?: string;
    description?: string;
    avatar?: File;
  }>({
    title: organization.title,
    description: organization.description,
  });

  const initData = useInitData();
  const haptic = useHapticFeedback();
  const popup = usePopup();
  const navigate = useNavigate();

  const currentUser = organization.members!.find(
    (member) => member.id === initData?.user?.id,
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

  const handlePromoteClick = (member: User) => () => {
    if (member.role === "admin") {
      popup.open({
        title: "Повысить сотрудника",
        message: `${member.firstName} уже занимает высшую должность.`,
      });
    } else {
      popup
        .open({
          title: "Повысить сотрудника",
          message: `Вы уверены, что хотите повысить ${
            member.firstName
          } до ${getRole(getNextRole(member.role))}?`,

          buttons: [
            { type: "cancel" },
            {
              type: "ok",
              id: "ok",
            },
          ],
        })
        .then((res) => {
          if (res === "ok") {
            updateUserRole({
              userId: member.id,
              role: getNextRole(member.role),
            }).then(() => {
              toast.success(`Сотрудник повышен`);
            });
          }
        });
    }
  };

  const handleDemoteClick = (member: User) => () => {
    if (member.role === "member") {
      popup.open({
        title: "Понизить сотрудника",
        message: `${member.firstName} уже занимает низшую должность.`,
      });
    } else {
      popup
        .open({
          title: "Понизить сотрудника",
          message: `Вы уверены, что хотите понизить ${
            member.firstName
          } до ${getRole(getPrevRole(member.role))}?`,

          buttons: [
            { type: "cancel" },
            {
              type: "ok",
              id: "ok",
            },
          ],
        })
        .then((res) => {
          if (res === "ok") {
            updateUserRole({
              userId: member.id,
              role: getPrevRole(member.role),
            }).then(() => {
              toast.success(`Сотрудник понижен`);
            });
          }
        });
    }
  };

  const handleDeleteClick = (member: User) => () => {
    popup
      .open({
        title: "Удалить сотрудника",
        message: `Вы уверены, что хотите уволить ${member.firstName}?`,

        buttons: [
          { type: "cancel" },
          {
            type: "ok",
            id: "ok",
          },
        ],
      })
      .then((res) => {
        if (res === "ok") {
          updateUserRole({
            userId: member.id,
            role: undefined,
          }).then(() => {
            toast.success(`Сотрудник уволен`);
          });
        }
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
        <>
          <Section header="Сотрудники">
            {currentUser.role !== "member" && (
              <OrganizationInviteModal
                orgId={organization.id}
                currentUser={currentUser}
              />
            )}
            {organization.members.map((member) => (
              <DropdownMenu key={`member-${member.id}`}>
                <Cell
                  before={<Avatar src={member.avatar} size={48} />}
                  description={getRole(member.role)}
                  hovered={false}
                  after={
                    member.id === currentUser.id ? (
                      <span className="text-tg-hint">Вы</span>
                    ) : currentUser.role == "admin" ? (
                      <DropdownMenuTrigger
                        className="focus:ring-0 focus:outline-none"
                        onClick={() => haptic.impactOccurred("light")}
                      >
                        <Tappable>
                          <Ellipsis24Icon className="text-tg-hint" />
                        </Tappable>
                      </DropdownMenuTrigger>
                    ) : null
                  }
                >
                  {member.firstName} {member.lastName}
                </Cell>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={handlePromoteClick(member)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3 pl-1">
                      <ArrowUpCircleFill20Icon />
                      Повысить
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleDemoteClick(member)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3 pl-1">
                      <ArrowUpCircleFill20Icon className="rotate-180" />
                      Понизить
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleDeleteClick(member)}
                    className="cursor-pointer text-tg-destructive"
                  >
                    <div className="flex items-center gap-2 pl-1">
                      <Bin24Icon />
                      Удалить
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </Section>
          {currentUser.role !== "member" && (
            <Section>
              <Cell
                onClick={() => navigate(`/orgs/${organization.id}/invitations`)}
                before={<Invites30FilledIcon />}
                after={<Chevron16Icon />}
              >
                Приглашения
              </Cell>
            </Section>
          )}
        </>
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
