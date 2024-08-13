import { Organization, OrganizationRole } from "@/types";
import { Avatar, Cell, CellProps, Text } from "@telegram-apps/telegram-ui";
import Chevron16Icon from "./ui/icons/chevron16";
import { getRole } from "@/lib/get-role";

interface OrganizationCellProps extends Omit<CellProps, "role"> {
  organization: Organization;
  role: OrganizationRole;
}

export default function OrganizationCell({
  organization,
  role,
  ...restProps
}: OrganizationCellProps) {
  return (
    <Cell
      before={<Avatar src={organization.avatar} />}
      after={<Chevron16Icon />}
      {...restProps}
      description={getRole(role)}
    >
      <Text Component="h2">{organization.title}</Text>
    </Cell>
  );
}
