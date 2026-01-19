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
const DojoDashboard = React.lazy(
  () => import("../features/dojo/pages/DojoDashboard"),
);
const DojoAchievements = React.lazy(
  () => import("../features/dojo/pages/DojoAchievements"),
);
const DojoLibrary = React.lazy(
  () => import("../features/dojo/pages/DojoLibrary"),
);
const DojoSettings = React.lazy(
  () => import("../features/dojo/pages/DojoSettings"),
);

import Layout from "../shared/ui/Layout";
import ProtectedRoute from "../shared/ui/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Landing />
          </React.Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <About />
          </React.Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </React.Suspense>
        ),
      },
      {
        path: "dojo",
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<div>Loading...</div>}>
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
              <React.Suspense fallback={<div>Loading...</div>}>
                <DojoDashboard />
              </React.Suspense>
            ),
          },
          {
            path: "achievements",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <DojoAchievements />
              </React.Suspense>
            ),
          },
          {
            path: "library",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <DojoLibrary />
              </React.Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <React.Suspense fallback={<div>Loading...</div>}>
                <DojoSettings />
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
