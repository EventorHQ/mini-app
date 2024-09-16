import { lazy, Suspense } from "react";
import { Router, Route, Switch, Redirect } from "wouter";

import Tabbar from "./Tabbar";
import Setup from "@/pages/setup";
import { Toaster } from "@/components/ui/sonner";

const EventsPage = lazy(() => import("@/pages/events/page"));
const EventPage = lazy(() => import("@/pages/events/[id]/page"));
const EventDetailsPage = lazy(() => import("@/pages/events/[id]/details/page"));
const EditEventPage = lazy(() => import("@/pages/events/[id]/edit/page"));
const EventCheckinPage = lazy(() => import("@/pages/events/[id]/checkin/page"));
const EventRegisterPage = lazy(
  () => import("@/pages/events/[id]/register/page"),
);
const EventCheckedInPage = lazy(
  () => import("@/pages/events/[id]/people/checkin/page"),
);
const EventVisitorsPage = lazy(
  () => import("@/pages/events/[id]/people/visitors/page"),
);
const EventFeedbackPage = lazy(
  () => import("@/pages/events/[id]/people/feedback/page"),
);
const CreateEventPage = lazy(() => import("@/pages/events/create/page"));

const OrgsPage = lazy(() => import("@/pages/orgs/page"));
const OrgPage = lazy(() => import("@/pages/orgs/[id]/page"));
const OrgInvitationsPage = lazy(
  () => import("@/pages/orgs/[id]/invitations/page"),
);
const CreateOrgPage = lazy(() => import("@/pages/orgs/create/page"));

const ProfilePage = lazy(() => import("@/pages/profile/page"));
const InvitationPage = lazy(() => import("@/pages/invitations/[id]/page"));

export default function AppRouter() {
  return (
    <Router base={import.meta.env.BASE_URL}>
      <Setup />
      <main className="pb-14">
        <Route path="/">
          <Suspense fallback={<div>Loading page...</div>}>
            <EventsPage />
          </Suspense>
        </Route>
        <Switch>
          <Route path="/events">
            <Suspense fallback={<div>Loading page...</div>}>
              <EventsPage />
            </Suspense>
          </Route>
          <Route path="/events/create">
            <Suspense fallback={<div>Loading page...</div>}>
              <CreateEventPage />
            </Suspense>
          </Route>
          <Route path="/events/:id">
            <Suspense fallback={<div>Loading page...</div>}>
              <EventPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/details">
            <Suspense fallback={<div>Loading page...</div>}>
              <EventDetailsPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/register">
            <Suspense fallback={<div>Loading page...</div>}>
              <EventRegisterPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/edit">
            <Suspense fallback={<div>Loading page...</div>}>
              <EditEventPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/checkin">
            <Suspense fallback={<div>Loading page...</div>}>
              <EventCheckinPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/people/checkin">
            <Suspense fallback={<div>Loading page...</div>}>
              <EventCheckedInPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/people/visitors">
            <Suspense fallback={<div>Loading page...</div>}>
              <EventVisitorsPage />
            </Suspense>
          </Route>
          <Route path="/events/:id/people/feedback">
            <Suspense fallback={<div>Loading page...</div>}>
              <EventFeedbackPage />
            </Suspense>
          </Route>
        </Switch>
        <Route path="/orgs">
          <Suspense fallback={<div>Loading page...</div>}>
            <OrgsPage />
          </Suspense>
        </Route>
        <Switch>
          <Route path="/orgs/create">
            <Suspense fallback={<div>Loading page...</div>}>
              <CreateOrgPage />
            </Suspense>
          </Route>
          <Route path="/orgs/:id">
            <Suspense fallback={<div>Loading page...</div>}>
              <OrgPage />
            </Suspense>
          </Route>
          <Route path="/orgs/:id/invitations">
            <Suspense fallback={<div>Loading page...</div>}>
              <OrgInvitationsPage />
            </Suspense>
          </Route>
        </Switch>
        <Route path="/profile">
          <Suspense fallback={<div>Loading page...</div>}>
            <ProfilePage />
          </Suspense>
        </Route>
        <Route path="/invitations/:id">
          <Suspense fallback={<div>Loading page...</div>}>
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
