interface Props {
  className?: string;
  fillBody?: string;
  fillBars?: string;
  fillStar?: string;
}

export default function Logo24Icon({
  className,
  fillBody = "#007AFF",
  fillBars = "#55A6FF",
  fillStar = "#FFFFFF",
}: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="24"
      fill="none"
    >
      <rect
        width="21.247"
        height="21.247"
        y="2.754"
        fill={fillBody}
        opacity="0.8"
        rx="4"
      />
      <rect
        width="2.055"
        height="6.616"
        x="5.959"
        fill={fillBars}
        opacity="0.8"
        rx="1.027"
      />
      <rect
        width="2.055"
        height="6.616"
        x="9.616"
        fill={fillBars}
        opacity="0.8"
        rx="1.027"
      />
      <rect
        width="2.055"
        height="6.616"
        x="13.274"
        fill={fillBars}
        opacity="0.8"
        rx="1.027"
      />
      <path
        fill={fillStar}
        d="M10.301 9.364a.4.4 0 0 1 .686 0l1.315 2.185a.4.4 0 0 0 .252.184l2.484.575a.4.4 0 0 1 .212.652l-1.672 1.926a.4.4 0 0 0-.096.296l.22 2.541a.4.4 0 0 1-.554.403L10.8 17.13a.4.4 0 0 0-.312 0l-2.348.995a.4.4 0 0 1-.555-.403l.22-2.54a.4.4 0 0 0-.096-.297L6.038 12.96a.4.4 0 0 1 .211-.652l2.485-.575a.4.4 0 0 0 .252-.184l1.315-2.185Z"
      />
    </svg>
  );
}
