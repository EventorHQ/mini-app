import type { Icon } from "@/types";

export default function Check16Icon({ ...restProps }: Icon) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6827 3.32544C15.1058 3.75935 15.1058 4.46287 14.6827 4.89679L7.09937 12.6746C6.6763 13.1085 5.99037 13.1085 5.5673 12.6746L2.3173 9.34123C1.89423 8.90731 1.89423 8.2038 2.3173 7.76988C2.74037 7.33597 3.4263 7.33597 3.84937 7.76988L6.33333 10.3175L13.1506 3.32544C13.5737 2.89152 14.2596 2.89152 14.6827 3.32544Z"
        fill="var(--tg-theme-link-color)"
      />
    </svg>
  );
}
