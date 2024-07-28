import { SVGProps } from "react";

export interface Icon extends SVGProps<SVGSVGElement> {}

export type Event = {
  id: string;
  title: string;
  date: string;
  image: string;
};
