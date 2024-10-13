import { Cell, List, Section, Skeleton } from "@telegram-apps/telegram-ui";

export default function Loading() {
  return (
    <List>
      <Skeleton visible>
        <Section header="Участники">
          <Cell>Прошли Check-in</Cell>
          <Cell>Зарегистрировались</Cell>
        </Section>
      </Skeleton>
      <Skeleton visible>
        <Section>
          <Cell>Отзывы</Cell>
        </Section>
      </Skeleton>
      <Skeleton visible>
        <Section header="Участники">
          <Cell>Прошли Check-in</Cell>
          <Cell>Зарегистрировались</Cell>
        </Section>
      </Skeleton>
    </List>
  );
}
