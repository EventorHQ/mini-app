import { SVGProps } from "react";

export interface Icon extends SVGProps<SVGSVGElement> {}

export type User = {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  avatar?: string;
  role?: OrganizationRole;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  image: string;
  location: string;
  description: string;
  organization: string;
};

export type Organization = {
  id: number;
  title: string;
  description?: string;
  avatar?: string;
  isFancy: boolean;
  members?: User[];
};

export type OrganizationRole = "admin" | "moderator" | "member";

export type Invitation = {
  role: OrganizationRole;
  inviter: {
    first_name: string;
    last_name: string;
  };
  org: {
    title: string;
    avatar_img: string;
    is_fancy: boolean;
  };
};
