import { useMiniApp } from "@telegram-apps/sdk-react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { isDark } = useMiniApp();
  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group tg-callout toast group-[.toaster]:bg-[var(--tgui--surface_primary)] group-[.toaster]:text-tg-text group-[.toaster]:border-border rounded-[14px] backdrop-blur-md",
          description: "group-[.toast]:text-tg-hint",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-tg-link",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-tg-hint",
          icon: "text-tg-text-accent",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
