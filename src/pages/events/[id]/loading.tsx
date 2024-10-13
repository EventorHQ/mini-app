import {
  Cell,
  List,
  Section,
  Skeleton,
  Subheadline,
  Title,
} from "@telegram-apps/telegram-ui";

export default function Loading() {
  return (
    <>
      <Skeleton visible>
        <div className="w-full h-48" />
      </Skeleton>
      <List>
        <div className="pt-2 pb-3">
          <Skeleton visible>
            <Title weight="1" level="1">
              Loading...
            </Title>
          </Skeleton>
          <Skeleton visible>
            <Subheadline level="2" weight="2" className="mt-1">
              Loading
            </Subheadline>
          </Skeleton>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Skeleton visible className="w-full">
            <div className="w-full h-10" />
          </Skeleton>
          <Skeleton visible className="w-full">
            <div className="w-full h-10" />
          </Skeleton>
        </div>
        <Skeleton visible>
          <Section header=" ">
            <Cell>Loading</Cell>
            <Cell>Loading</Cell>
            <Cell>Loading</Cell>
            <Cell>Loading</Cell>
            <Cell>Loading</Cell>
          </Section>
        </Skeleton>
      </List>
    </>
  );
}
