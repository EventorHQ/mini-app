/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "wouter";

export const useNavigate = () => {
  const [, setLocation] = useLocation();

  const navigate = (path: string | -1, options: any = {}) => {
    if (path === -1) {
      setLocation(options.from, options);
    } else {
      setLocation(path, options);
    }
  };

  return navigate;
};
