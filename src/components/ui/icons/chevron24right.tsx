import type { Icon } from "@/types";

export default function Chevron24RightIcon({ ...restProps }: Icon) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.29289 3.79289C7.68342 3.40237 8.31658 3.40237 8.70711 3.79289L16.2071 11.2929C16.5976 11.6834 16.5976 12.3166 16.2071 12.7071L8.70711 20.2071C8.31658 20.5976 7.68342 20.5976 7.29289 20.2071C6.90237 19.8166 6.90237 19.1834 7.29289 18.7929L14.0858 12L7.29289 5.20711C6.90237 4.81658 6.90237 4.18342 7.29289 3.79289Z"
        fill="var(--tg-theme-hint-color)"
      />
    </svg>
  );
}
