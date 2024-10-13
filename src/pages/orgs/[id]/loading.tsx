import {
  List,
  Cell,
  Section,
  Skeleton,
  Avatar,
  Title,
} from "@telegram-apps/telegram-ui";

export const Loading = () => {
  return (
    <List>
      <div className="flex justify-center flex-col items-center gap-2">
        <Avatar size={96} />
        <Skeleton visible>
          <Title level="1" weight="1">
            Loading....
          </Title>
        </Skeleton>
      </div>
      <Skeleton visible className="py-2">
        <Section>
          <Cell>Loading...</Cell>
        </Section>
      </Skeleton>
      <Skeleton visible className="mt-10">
        <Section header=" ">
          <Cell>Loading...</Cell>
        </Section>
      </Skeleton>
    </List>
  );
};
