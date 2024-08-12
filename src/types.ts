import { SVGProps } from "react";

export interface Icon extends SVGProps<SVGSVGElement> {}

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
  avatar?: string;
  isFancy: boolean;
};
