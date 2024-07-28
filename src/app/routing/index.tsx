import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import EventPage from "@/pages/event";
import EventsPage from "@/pages/events";
import IndexPage from "@/pages/index-page";
import OrganizationsPage from "@/pages/organizations";
import ProfilePage from "@/pages/profile";
import Layout from "./Layout";

const router = createBrowserRouter(
  [
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
          children: [
            {
              index: true,
              element: <EventsPage />,
            },
            {
              path: ":id",
              element: <EventPage />,
            },
          ],
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
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default function Router() {
  return <RouterProvider router={router} />;
}
