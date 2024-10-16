import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardManager from "./pages/dashboard-manager";
import Language from "./pages/language-management";
import QuotePrice from "./pages/QuotePrice-manager";
import Notarization from "./pages/notarization";
import Order from "./pages/order-manager";

import DynamicDocumentsForm from "./pages/documentType";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/document",
          element: <DynamicDocumentsForm />,
        },
      ],
    },
    {
      path: "dashboardmanager",
      element: <DashboardManager />,
      children: [
        {
          path: "language",
          element: <Language />,
        },
        {
          path: "quoteprice",
          element: <QuotePrice />,
        },
        {
          path: "notarization",
          element: <Notarization />,
        },
        {
          path: "order",
          element: <Order />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
