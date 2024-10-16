import { useGetOrganizationQuery } from "@/api/orgs";
import {
  OrganizationProfileMember,
  OrganizationProfileVisitor,
} from "@/components/organization-profile";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "@/hooks/use-navigate";
import { useParams } from "wouter";
import { Loading } from "./loading";

export default function OrganizationPage() {
  const { id } = useParams<{ id: string }>();
  const { data: organization, isLoading, error } = useGetOrganizationQuery(+id);
  const bb = useBackButton();
  const navigate = useNavigate();
  const { setParams } = useTabbarActions();

  useEffect(() => {
    const handleClick = () => {
      if (history.state && "from" in history.state) {
        navigate(history.state.from);
      } else {
        navigate("/orgs");
      }
    };

    setParams({
      isVisible: false,
    });

    !bb.isVisible && bb.show();
    bb.on("click", handleClick);

    return () => {
      bb.off("click", handleClick);
      bb.hide();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (!organization) {
    return <div>Organization not found</div>;
  }

  const isMember = !!organization.members; // Backend won't return members unless current user is one of them

  if (isMember) {
    return <OrganizationProfileMember organization={organization} />;
  }

  return <OrganizationProfileVisitor organization={organization} />;
}
