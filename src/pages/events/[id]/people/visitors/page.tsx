import { useGetEventAdministrationQuery, Visitor } from "@/api/events";
import Search24Icon from "@/components/ui/icons/search24";
import { useNavigate } from "@/hooks/use-navigate";
import { useTabbarActions } from "@/hooks/use-tabbar-actions";
import { useBackButton } from "@telegram-apps/sdk-react";
import { Avatar, Cell, Input, List, Section } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { useParams } from "wouter";

const Loading = () => (
  <List>
    <Input placeholder="Поиск" disabled before={<Search24Icon />} />
    <Section header="Зарегистрировались">
      {[...Array(5)].map((_, index) => (
        <Cell
          key={`skeleton-${index}`}
          before={<div className="w-12 h-12 bg-tg-secondary-bg rounded-full" />}
          description={<div className="w-24 h-4 bg-tg-secondary-bg rounded" />}
        >
          <div className="w-32 h-5 bg-tg-secondary-bg rounded" />
        </Cell>
      ))}
    </Section>
    <Section.Footer centered>Загрузка...</Section.Footer>
  </List>
);

const Visitors = ({
  visitors,
  searchString,
}: {
  visitors: Visitor[];
  searchString: string;
}) => {
  if (visitors.length === 0) {
    return <Section.Footer centered>0 человек</Section.Footer>;
  }

  const lowercaseSearch = searchString.toLowerCase();
  const filteredVisitors = visitors.filter((visitor) => {
    const searchableFields = [
      visitor.first_name,
      visitor.last_name,
      visitor.username,
      visitor.id.toString(),
    ].filter(Boolean);

    return searchableFields.some((field) =>
      field?.toLowerCase().includes(lowercaseSearch),
    );
  });

  return (
    <>
      <Section header="Зарегистрировались">
        {filteredVisitors.map((visitor) => (
          <Cell
            key={`visitor-${visitor.id}`}
            before={<Avatar src={visitor.photo_img} size={48} />}
            description={
              visitor.username ? (
                `@${visitor.username}`
              ) : (
                <span className="opacity-0">Username</span>
              )
            }
          >
            {visitor.first_name} {visitor.last_name}
          </Cell>
        ))}
      </Section>
      <Section.Footer centered>
        {filteredVisitors.length} человек
      </Section.Footer>
    </>
  );
};

Visitors.displayName = "Visitors";

export default function VisitorsPage() {
  const bb = useBackButton();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEventAdministrationQuery(+params.id);
  const navigate = useNavigate();
  const { setParams } = useTabbarActions();
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const handleClick = () => {
      navigate(`/events/${params.id}/details`);
    };

    setParams({
      isVisible: false,
    });

    bb.show();
    bb.on("click", handleClick);

    return () => {
      bb.off("click", handleClick);
    };
  }, []);

  if (!data || isLoading) {
    return <Loading />;
  }

  const handleSearchQChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <List>
      <Input
        placeholder="Поиск"
        onChange={handleSearchQChange}
        value={searchString}
      />
      <Visitors visitors={data.all_visitors} searchString={searchString} />
    </List>
  );
}
