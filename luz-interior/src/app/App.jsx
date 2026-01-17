import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Landing = React.lazy(() => import("../features/landing/LandingPage"));
const About = React.lazy(() => import("../features/landing/pages/About"));
const Contact = React.lazy(() => import("../features/landing/pages/Contact"));
const Dojo = React.lazy(() => import("../features/dojo/pages/DojoDashboard"));

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
              <Dojo />
            </React.Suspense>
          </ProtectedRoute>
        ),
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
