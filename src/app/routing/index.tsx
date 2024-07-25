import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import IndexPage from "@/pages/index-page";
import EventsPage from "@/pages/events";
import OrganizationsPage from "@/pages/organizations";
import ProfilePage from "@/pages/profile";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "organizations",
        element: <OrganizationsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
