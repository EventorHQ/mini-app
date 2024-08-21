import { useGetOrganizationQuery } from "@/api/orgs";
import {
  OrganizationProfileMember,
  OrganizationProfileVisitor,
} from "@/components/organization-profile";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrganizationPage() {
  const { data: organization, isLoading } = useGetOrganizationQuery();
  const bb = useBackButton();
  const navigate = useNavigate();
  const { setParams } = useTabbarActions();

  useEffect(() => {
    const handleClick = () => {
      navigate(-1);
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
    return <div>Loading...</div>;
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
