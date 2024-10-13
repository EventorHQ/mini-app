import { List, Cell, Section, Skeleton } from "@telegram-apps/telegram-ui";

export const Loading = () => {
  return (
    <List>
      <Skeleton visible>
        <Section header="">
          <Cell>Loading...</Cell>
        </Section>
      </Skeleton>
      <Skeleton visible>
        <Section header="">
          <Cell>Loading...</Cell>
        </Section>
      </Skeleton>
      <Skeleton visible>
        <Section header="">
          <Cell>Loading...</Cell>
        </Section>
      </Skeleton>
    </List>
  );
};
