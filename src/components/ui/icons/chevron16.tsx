import type { Icon } from "@/types";

export default function Chevron16Icon({ ...restProps }: Icon) {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="m6 3 5 5-5 5"
        stroke="var(--tg-theme-hint-color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
