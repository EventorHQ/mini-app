import { useLocation } from "wouter";

export const useNavigate = () => {
  const [, setLocation] = useLocation();

  const navigate = (path: string) => {
    setLocation(path);
  };

  return navigate;
};
