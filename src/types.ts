import { SVGProps } from "react";

export interface Icon extends SVGProps<SVGSVGElement> {}

export type Event = {
  title: string;
  date: string;
  image: string;
};
