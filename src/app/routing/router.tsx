import { Suspense } from "react";
import { Router, Route, Switch, Redirect } from "wouter";

import Tabbar from "./Tabbar";
import Setup from "@/pages/setup";
import { Toaster } from "@/components/ui/sonner";
import EventsPage from "@/pages/events/page";
import CreateEventPage from "@/pages/events/create/page";
import EventPage from "@/pages/events/[id]/page";
import EventDetailsPage from "@/pages/events/[id]/details/page";
import EventRegisterPage from "@/pages/events/[id]/register/page";
import EditEventPage from "@/pages/events/[id]/edit/page";
import EventCheckinPage from "@/pages/events/[id]/checkin/page";
import EventCheckedInPage from "@/pages/events/[id]/people/checkin/page";
import EventVisitorsPage from "@/pages/events/[id]/people/visitors/page";
import EventFeedbackPage from "@/pages/events/[id]/people/feedback/page";
import OrgsPage from "@/pages/orgs/page";
import OrgPage from "@/pages/orgs/[id]/page";
import OrgInvitationsPage from "@/pages/orgs/[id]/invitations/page";
import CreateOrgPage from "@/pages/orgs/create/page";
import ProfilePage from "@/pages/profile/page";
import InvitationPage from "@/pages/invitations/[id]/page";

// const EventsPage = lazy(() => import("@/pages/events/page"));
// const EventPage = lazy(() => import("@/pages/events/[id]/page"));
// const EventDetailsPage = lazy(() => import("@/pages/events/[id]/details/page"));
// const EditEventPage = lazy(() => import("@/pages/events/[id]/edit/page"));
// const EventCheckinPage = lazy(() => import("@/pages/events/[id]/checkin/page"));
// const EventRegisterPage = lazy(
//   () => import("@/pages/events/[id]/register/page"),
// );
// const EventCheckedInPage = lazy(
//   () => import("@/pages/events/[id]/people/checkin/page"),
// );
// const EventVisitorsPage = lazy(
//   () => import("@/pages/events/[id]/people/visitors/page"),
// );
// const EventFeedbackPage = lazy(
//   () => import("@/pages/events/[id]/people/feedback/page"),
// );
// const CreateEventPage = lazy(() => import("@/pages/events/create/page"));

// const OrgsPage = lazy(() => import("@/pages/orgs/page"));
// const OrgPage = lazy(() => import("@/pages/orgs/[id]/page"));
// const OrgInvitationsPage = lazy(
//   () => import("@/pages/orgs/[id]/invitations/page"),
// );
// const CreateOrgPage = lazy(() => import("@/pages/orgs/create/page"));

// const ProfilePage = lazy(() => import("@/pages/profile/page"));
// const InvitationPage = lazy(() => import("@/pages/invitations/[id]/page"));

export default function AppRouter() {
  return (
    <Router base={import.meta.env.BASE_URL}>
      <Setup />
      <main className="pb-14">
        <Route path="/">
          <Suspense fallback={null}>
            <EventsPage />
          </Suspense>
        </Route>
        <Switch>
          <Route path="/events">
            <Suspense fallback={null}>
              <EventsPage />
            </Suspense>
          </Route>
          <Route path="/events/create">
            <Suspense fallback={null}>
              <CreateEventPage />
            </Suspense>
          </Route>
          <Route path="/events/:id">
            <Suspense fallback={null}>
              <EventPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/details">
            <Suspense fallback={null}>
              <EventDetailsPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/register">
            <Suspense fallback={null}>
              <EventRegisterPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/edit">
            <Suspense fallback={null}>
              <EditEventPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/checkin">
            <Suspense fallback={null}>
              <EventCheckinPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/people/checkin">
            <Suspense fallback={null}>
              <EventCheckedInPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/people/visitors">
            <Suspense fallback={null}>
              <EventVisitorsPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/people/feedback">
            <Suspense fallback={null}>
              <EventFeedbackPage />
            </Suspense>
          </Route>
        </Switch>
        <Route path="/orgs">
          <Suspense fallback={null}>
            <OrgsPage />
          </Suspense>
        </Route>
        <Switch>
          <Route path="/orgs/create">
            <Suspense fallback={null}>
              <CreateOrgPage />
            </Suspense>
          </Route>
          <Route path="/orgs/:id">
            <Suspense fallback={null}>
              <OrgPage />
            </Suspense>
          </Route>
          <Route path="/orgs/:id/invitations">
            <Suspense fallback={null}>
              <OrgInvitationsPage />
            </Suspense>
          </Route>
        </Switch>
        <Route path="/profile">
          <Suspense fallback={null}>
            <ProfilePage />
          </Suspense>
        </Route>
        <Route path="/invitations/:id">
          <Suspense fallback={null}>
            <InvitationPage />
          </Suspense>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </main>
      <Toaster />
      <Tabbar />
    </Router>
  );
}
