import {
  useDeleteInvitationMutation,
  useGetInvitationsQuery,
} from "@/api/invitations";
import { Bin24Icon } from "@/components/ui/icons/bin24";
import { Forward24Icon } from "@/components/ui/icons/forward24";
import { APP_URL } from "@/config/config";
import { useNavigate } from "@/hooks/use-navigate";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { getRole } from "@/lib/get-role";
import {
  useBackButton,
  useLaunchParams,
  useUtils,
} from "@telegram-apps/sdk-react";
import {
  Cell,
  IconButton,
  List,
  Placeholder,
  Section,
} from "@telegram-apps/telegram-ui";
import { useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "wouter";

export default function InvitationsPage() {
  const { id } = useParams<{ id: string }>();
  const lp = useLaunchParams();
  const bb = useBackButton();
  const utils = useUtils();
  const navigate = useNavigate();
  const { data: invitations, isLoading } = useGetInvitationsQuery(id);
  const { mutateAsync: deleteInvitation } = useDeleteInvitationMutation(id);

  useEffect(() => {
    const handleClick = () => {
      navigate(`/orgs/${id}`);
    };
    bb.on("click", handleClick);
    bb.show();

    return () => {
      bb.off("click", handleClick);
    };
  }, []);

  const handleForwardClick = (id: string) => () => {
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
  };

  const handleDeleteClick = (id: string) => () => {
    deleteInvitation(id)
      .then(() => {
        toast.success("Приглашение удалено");
      })
      .catch(() => {
        toast.error("Не удалось удалить приглашение");
      });
  };

  if (isLoading) {
    return <Placeholder description="Загрузка..." />;
  }

  if (invitations && invitations.length > 0) {
    return (
      <List>
        <Section header="Активные ссылки">
          {invitations?.map((invitation) => (
            <Cell
              key={invitation.id}
              description={
                invitation.is_reusable ? "Многоразовая" : "Одноразовая"
              }
              after={
                <div className="flex items-center gap-1">
                  <IconButton
                    size="s"
                    mode="bezeled"
                    onClick={handleForwardClick(invitation.id)}
                  >
                    <Forward24Icon />
                  </IconButton>
                  <IconButton
                    size="s"
                    mode="bezeled"
                    onClick={handleDeleteClick(invitation.id)}
                  >
                    <Bin24Icon />
                  </IconButton>
                </div>
              }
            >
              {invitation.id.slice(0, 4)}...{invitation.id.slice(-4)} -{" "}
              {getRole(invitation.role)}
            </Cell>
          ))}
        </Section>
      </List>
    );
  }

  return <Placeholder description="Нет активных ссылок" />;
}
