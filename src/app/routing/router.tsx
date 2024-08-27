import { lazy, Suspense } from "react";
import { Router, Route, Switch } from "wouter";

import Tabbar from "./Tabbar";

const EventsPage = lazy(() => import("@/pages/events/page"));
const EventPage = lazy(() => import("@/pages/events/[id]/page"));
const CreateEventPage = lazy(() => import("@/pages/events/create/page"));

const OrgsPage = lazy(() => import("@/pages/orgs/page"));
const OrgPage = lazy(() => import("@/pages/orgs/[id]/page"));
const CreateOrgPage = lazy(() => import("@/pages/orgs/create/page"));

const ProfilePage = lazy(() => import("@/pages/profile/page"));
const InvitationPage = lazy(() => import("@/pages/invitations/[id]/page"));

export default function AppRouter() {
  return (
    <Router base={import.meta.env.BASE_URL}>
      <main>
        <Route path="/">
          <Suspense fallback={<div>Loading page...</div>}>
            <EventsPage />
          </Suspense>
        </Route>
        <Switch>
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
      </main>
      <Tabbar />
    </Router>
  );
}
