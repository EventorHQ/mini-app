import { useParams } from "react-router-dom";

export default function OrganizationPage() {
  const { id } = useParams();

  return <div>{id}</div>;
}
