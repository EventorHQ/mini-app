import type { Icon } from "@/types";

export default function Chevron24LeftIcon({ ...restProps }: Icon) {
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
        d="M15.7071 3.79289C15.3166 3.40237 14.6834 3.40237 14.2929 3.79289L6.79289 11.2929C6.40237 11.6834 6.40237 12.3166 6.79289 12.7071L14.2929 20.2071C14.6834 20.5976 15.3166 20.5976 15.7071 20.2071C16.0976 19.8166 16.0976 19.1834 15.7071 18.7929L8.91421 12L15.7071 5.20711C16.0976 4.81658 16.0976 4.18342 15.7071 3.79289Z"
        fill="var(--tg-theme-hint-color)"
      />
    </svg>
  );
}
