import { useEffect, useState, type FC } from "react";
import { useHapticFeedback, useInitData } from "@telegram-apps/sdk-react";
import { Redirect, useParams } from "wouter";
import { Avatar, Button, Placeholder } from "@telegram-apps/telegram-ui";

import {
  useAcceptInvitationMutation,
  useGetInvitationQuery,
} from "@/api/invitations";
import Check16Icon from "@/components/ui/icons/check16";
import { useNavigate } from "@/hooks/use-navigate";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { cn, getAcronym, getTelegramAvatar } from "@/lib/utils";
import { getRole } from "@/lib/get-role";

const Invitation: FC<{ invitation: string }> = ({ invitation }) => {
  const { data, isLoading: isDataLoading } = useGetInvitationQuery(invitation);
  const { mutateAsync: acceptInvitation } = useAcceptInvitationMutation();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initData = useInitData();
  const haptic = useHapticFeedback();
  const navigate = useNavigate();

  if (isDataLoading || !data) {
    return (
      <section className="flex flex-col items-center justify-center w-full px-4 gap-4 h-[var(--tg-viewport-stable-height)] transition-all">
        <Placeholder
          className="w-[75%]"
          header={<div className="w-48 h-12 bg-gray-200 rounded-lg" />}
          action={<Button stretched size="l" loading />}
        >
          <div className="flex">
            <Avatar
              size={96}
              className="shadow-none bg-gray-200 translate-x-3"
            />
            <Avatar
              size={96}
              className="shadow-none bg-gray-200 -translate-x-3"
            />
          </div>
        </Placeholder>
      </section>
    );
  }

  const { inviter, org } = data;

  const handleAcceptClick = async () => {
    setIsLoading(true);
    await acceptInvitation({ invitation });
    setIsAccepted(true);
    setIsLoading(false);
    setTimeout(() => {
      haptic.notificationOccurred("success");
    }, 500);
  };

  const handleNavigateClick = () => {
    navigate(`/orgs/${org.id}`);
  };

  const Inviter = () => (
    <span className="text-tg-link">
      {inviter.first_name} {inviter.last_name}
    </span>
  );

  const Org = () => (
    <div className="inline-flex text-tg-link items-center gap-1">
      {org.title}
      {org.is_fancy && <Check16Icon />}
    </div>
  );

  const Role = () => <span className="text-tg-link">{getRole(data.role)}</span>;

  return (
    <section className="flex flex-col items-center justify-center w-full px-4 gap-4 h-[var(--tg-viewport-stable-height)] transition-all">
      <Placeholder
        className="max-w-[75%]"
        header={
          <div className="relative">
            <div
              className={cn(
                "transition-opacity duration-500",
                isAccepted ? "opacity-0" : "opacity-1",
              )}
            >
              <Inviter /> приглашает вас вступить в <Org />
            </div>
            <div
              className={cn(
                "transition-opacity duration-500 absolute top-0 left-0 h-full text-center w-full",
                isAccepted ? "opacity-1" : "opacity-0",
              )}
            >
              Теперь вы <Role /> в <Org />
            </div>
          </div>
        }
        action={
          <Button
            stretched
            size="l"
            onClick={isAccepted ? handleNavigateClick : handleAcceptClick}
            loading={isLoading}
          >
            {isAccepted ? "Открыть" : "Принять"}
          </Button>
        }
      >
        <div className="flex relative">
          <Avatar
            src={org.avatar_img}
            size={96}
            className={cn(
              "shadow-none bg-gray-200 transition-all duration-500 ease-smooth",
              "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[var(--tgui--green)] after:rounded-full after:transition-opacity after:duration-200",
              isAccepted
                ? "opacity-0 translate-x-[50%] after:opacity-1"
                : "opacity-1 translate-x-3 after:opacity-0",
            )}
          />
          <Avatar
            className={cn(
              "shadow-none bg-gray-200 transition-all duration-500 ease-smooth",
              "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[var(--tgui--green)] after:rounded-full after:transition-opacity after:duration-200",
              isAccepted
                ? "opacity-0 -translate-x-[50%] after:opacity-1"
                : "opacity-1 -translate-x-3 after:opacity-0",
            )}
            src={initData?.user && getTelegramAvatar(initData.user.username)}
            acronym={initData?.user && getAcronym(initData?.user)}
            size={96}
          />
          {isAccepted && (
            <svg
              className="checkmark size-24 rounded-full absolute left-[25%] bg-[var(--tgui--green)]"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 15.5L5.83176 20.7944C5.91474 20.8958 6.07258 20.8866 6.14322 20.7762L14 8.5"
                className="checkmark__check translate-x-[5.5px]"
                stroke="#fff"
                strokeWidth="2.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </Placeholder>
    </section>
  );
};

export default function InvitationPage() {
  const { id } = useParams<{ id: string }>();
  const { setIsVisible } = useTabbarActions();

  useEffect(() => {
    setIsVisible(false);
  }, []);

  if (id) {
    return <Invitation invitation={id} />;
  }

  return <Redirect to="/" />;
}
