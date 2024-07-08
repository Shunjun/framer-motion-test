import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "virtual:uno.css";
import Home from "./motions/home.tsx";
import Images from "./motions/images.tsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "home",
        Component: Home,
      },
      {
        path: "images",
        Component: Images,
      },
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);

console.log(router);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
