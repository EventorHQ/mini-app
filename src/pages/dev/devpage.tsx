import { useCheckHealthQuery } from "@/api/queries";
import TempAdmin from "@/temp-admin";
import { useBackButton } from "@telegram-apps/sdk-react";
import { List, Section } from "@telegram-apps/telegram-ui";
import { useEffect } from "react";

export default function DevPage() {
  const { data } = useCheckHealthQuery();
  const bb = useBackButton();

  useEffect(() => {
    bb.hide();
  }, []);

  return (
    <List>
      <Section header="Server healthcheck">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Section>
      <TempAdmin />
    </List>
  );
}
