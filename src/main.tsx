import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "virtual:uno.css";
import Home from "./motions/home.tsx";
import Images from "./motions/images.tsx";

import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";

const router = createHashRouter([
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
