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
import AssignShipper from "./pages/assignShipper";
import AssignNotarization from "./pages/AssignNotarization";
import ShipperAndStaff from "./pages/admin/createShipperandStaff";
import ShipperAcccount from "./pages/admin/shipperAccount";
import DashboardAdmin from "./pages/dashboard-admin";
import StaffAccount from "./pages/admin/staffAccount";
import SendRequest from "./pages/staff/sendrequest/indes";
import DashboardStaff from "./pages/dashboard-staff";
import RequestManager from "./pages/staff/request-manager";

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
        {
          path: "/sendrequest",
          element: <SendRequest />,
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
          path: "createOrder",
          element: <DynamicDocumentsForm />,
        },
        {
          path: "order/details/:id",
          element: <DocumentDetails />,
        },
        {
          path: "assignshipper",
          element: <AssignShipper />,
        },
        {
          path: "assignNotarization",
          element: <AssignNotarization />,
        },
      ],
    },
    {
      path: "dashboardadmin",
      element: <DashboardAdmin />,
      children: [
        {
          path: "translatorAccount",
          element: <TranslatorAccount />,
        },
        {
          path: "traslator",
          element: <Translator />,
        },
        {
          path: "staffaccount",
          element: <StaffAccount />,
        },
        {
          path: "createstaffandshipper",
          element: <ShipperAndStaff />,
        },
        {
          path: "shipperaccount",
          element: <ShipperAcccount />,
        },
      ],
    },
    {
      path: "dashboardstaff",
      element: <DashboardStaff />,
      children: [
        {
          path: "requestmanager",
          element: <RequestManager />,
        },
        {
          path: "document",
          element: <DynamicDocumentsForm />,
        },
        {
          path: "order",
          element: <Order />,
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
