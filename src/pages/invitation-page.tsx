import {
  useAcceptInvitationMutation,
  useGetInvitationQuery,
} from "@/api/invitations";
import Check16Icon from "@/components/ui/icons/check16";
import { getTelegramAvatar } from "@/lib/utils";
import { useInitData } from "@telegram-apps/sdk-react";
import {
  Avatar,
  AvatarStack,
  Button,
  Placeholder,
} from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Invitation: FC<{ invitation: string }> = ({ invitation }) => {
  const { data, isLoading } = useGetInvitationQuery(invitation);
  const { mutateAsync: acceptInvitation } = useAcceptInvitationMutation();
  const initData = useInitData();
  const navigate = useNavigate();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { inviter, org } = data;

  const handleAcceptClick = () => {
    acceptInvitation({ invitation }).then((res) => {
      navigate(`/organizations/${res.id}`);
    });
  };

  const Inviter = () => (
    <span className="text-tg-link">
      {inviter.first_name} {inviter.last_name}
    </span>
  );

  const Org = () => (
    <div className="inline-flex text-tg-link items-center gap-1">
      {org.title}
      {!org.is_fancy && <Check16Icon />}
    </div>
  );

  return (
    <section className="flex flex-col items-center justify-center w-full px-4 gap-4 h-[var(--tg-viewport-stable-height)] transition-all">
      <Placeholder
        header={
          <>
            <Inviter /> приглашает вас вступить в <Org />
          </>
        }
        action={
          <Button stretched size="l" onClick={handleAcceptClick}>
            Присоединиться
          </Button>
        }
      >
        <AvatarStack>
          <Avatar src={org.avatar_img} size={96} className="shadow-none" />
          <Avatar
            className="shadow-none"
            src={initData?.user && getTelegramAvatar(initData.user.username)}
            size={96}
          />
        </AvatarStack>
      </Placeholder>
    </section>
  );
};

export default function InvitationPage() {
  const { invitation } = useParams();

  if (invitation) {
    return <Invitation invitation={invitation} />;
  }

  return <Navigate to="/events" />;
}
