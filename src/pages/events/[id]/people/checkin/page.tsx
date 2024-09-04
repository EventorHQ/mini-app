import { useNavigate } from "@/hooks/use-navigate";
import { useBackButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useParams } from "wouter";

export default function CheckedInPage() {
  const bb = useBackButton();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  return <div>CheckedInPage</div>;
}
