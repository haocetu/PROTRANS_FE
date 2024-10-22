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
import DocumentDetails from "./pages/documentDetails";
import TranslatorAccount from "./pages/admin/translatorAccount";
import Translator from "./pages/translatorPage";

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
          path: "/register",
          element: <Register />,
        },
        {
          path: "/traslator",
          element: <Translator />,
        },
      ],
    },
    {
      path: "",
      children: [
        {
          path: "/login",
          element: <Login />,
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
          path: "document",
          element: <DynamicDocumentsForm />,
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
        {
          path: "translatorAccount",
          element: <TranslatorAccount />,
        },
        {
          path: "createOrder",
          element: <DynamicDocumentsForm />,
        },
        {
          path: "order/details/:id",
          element: <DocumentDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
