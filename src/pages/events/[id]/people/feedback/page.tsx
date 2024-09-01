import { useBackButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useParams } from "wouter";
import { navigate } from "wouter/use-browser-location";

export default function CommentsPage() {
  const bb = useBackButton();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const handleClick = () => {
      navigate(`/events/${params.id}/details`);
    };

    bb.show();
    bb.on("click", handleClick);
    return () => {
      bb.off("click", handleClick);
    };
  }, []);

  return <div>CommentsPage </div>;
}
