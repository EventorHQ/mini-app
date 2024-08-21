import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import EventPage from "@/pages/events/event";
import EventsPage from "@/pages/events/events";
import IndexPage from "@/pages/index-page";
import NewOrganizationPage from "@/pages/organizations/new";
import OrganizationPage from "@/pages/organizations/organization";
import OrganizationsPage from "@/pages/organizations/organizations";
import ProfilePage from "@/pages/profile";
import Layout from "./Layout";
import InvitationPage from "@/pages/invitation-page";
import CreateEventPage from "@/pages/events/create-event";

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
            {
              path: "create",
              element: <CreateEventPage />,
            },
          ],
        },
        {
          path: "organizations",
          children: [
            {
              index: true,
              element: <OrganizationsPage />,
            },
            {
              path: "new",
              element: <NewOrganizationPage />,
            },
            {
              path: ":id",
              element: <OrganizationPage />,
            },
          ],
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "invitation/:invitation",
          element: <InvitationPage />,
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
