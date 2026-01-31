import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const Landing = React.lazy(() => import("../features/landing/LandingPage"));
const About = React.lazy(() => import("../features/landing/pages/About"));
const Contact = React.lazy(() => import("../features/landing/pages/Contact"));

// Dojo imports
const DojoLayout = React.lazy(
  () => import("../features/dojo/layout/DojoLayout"),
);
const DojoMain = React.lazy(() => import("../features/dojo/pages/DojoMain"));
const DojoAchievements = React.lazy(
  () => import("../features/dojo/pages/DojoAchievements"),
);
const DojoLibrary = React.lazy(
  () => import("../features/dojo/pages/DojoLibrary"),
);
const DojoSettings = React.lazy(
  () => import("../features/dojo/pages/DojoSettings"),
);
const UserProfile = React.lazy(
  () => import("../features/dojo/pages/UserProfile"),
);

// Shared and features imports
import Layout from "../shared/ui/Layout";
import ProtectedRoute from "../shared/ui/ProtectedRoute";
import DojoLoader from "../features/dojo/components/DojoLoader";
import GlobalErrorBoundary from "../shared/ui/GlobalErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<DojoLoader />}>
            <Landing />
          </React.Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <React.Suspense fallback={<DojoLoader />}>
            <About />
          </React.Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <React.Suspense fallback={<DojoLoader />}>
            <Contact />
          </React.Suspense>
        ),
      },
      {
        path: "dojo",
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<DojoLoader />}>
              <DojoLayout />
            </React.Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/dojo/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: (
              <React.Suspense fallback={<DojoLoader />}>
                <DojoMain />
              </React.Suspense>
            ),
          },
          {
            path: "achievements",
            element: (
              <React.Suspense fallback={<DojoLoader />}>
                <DojoAchievements />
              </React.Suspense>
            ),
          },
          {
            path: "library",
            element: (
              <React.Suspense fallback={<DojoLoader />}>
                <DojoLibrary />
              </React.Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <React.Suspense fallback={<DojoLoader />}>
                <DojoSettings />
              </React.Suspense>
            ),
          },
          {
            path: "achievements",
            element: (
              <React.Suspense fallback={<DojoLoader />}>
                <DojoAchievements />
              </React.Suspense>
            ),
          },
          {
            path: "profile/:username?",
            element: (
              <React.Suspense fallback={<DojoLoader />}>
                <UserProfile />
              </React.Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
