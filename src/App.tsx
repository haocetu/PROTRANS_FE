import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import MyRequest from "./pages/customer/myrequest";
import CreateOrderOnline from "./pages/staff/createorderonline";
import QuotePageDesign from "./pages/design/quotePaged";
import OrderOnlineManage from "./pages/admin/orderOnline-manage";
import AssignHardCopy from "./pages/assignmentHardCopy";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "./redux/features/userSlice";
import { RootState } from "./redux/rootReducer";

function App() {
  const AdminRoute = ({ children, role }) => {
    const user = useSelector((store: RootState) => store.accountmanage);
    const dispatch = useDispatch();
    if (user?.role === role) {
      return children;
    } else {
      toast.error(" Access Denied");
      dispatch(logout());
      return <Navigate to="/login" />;
    }
  };
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
          path: "/translator",
          element: (
            <AdminRoute role="Translator">
              <Translator />
            </AdminRoute>
          ),
        },
        {
          path: "/sendrequest",
          element: (
            <AdminRoute role="Customer">
              <SendRequest />
            </AdminRoute>
          ),
        },
        {
          path: "/myrequest",
          element: (
            <AdminRoute role="Customer">
              <MyRequest />
            </AdminRoute>
          ),
        },
        {
          path: "/quotePageDesign",
          element: <QuotePageDesign />,
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
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "dashboardmanager",
      element: (
        <AdminRoute role="Manager">
          <DashboardManager />
        </AdminRoute>
      ),
      children: [
        {
          path: "assignhardcopy",
          element: <AssignHardCopy />,
        },
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
        // {
        //   path: "tasknotarizationlist",
        //   element: <TaskNotarizationList />,
        // },
        {
          path: "assignNotarization",
          element: <AssignNotarization />,
        },
      ],
    },
    {
      path: "dashboardadmin",
      element: (
        <AdminRoute role="Admin">
          <DashboardAdmin />
        </AdminRoute>
      ),
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
      element: (
        <AdminRoute role="Staff">
          <DashboardStaff />
        </AdminRoute>
      ),
      children: [
        {
          path: "orderonlinemanage/details/:id",
          element: <DocumentDetails />,
        },
        {
          path: "order/details/:id",
          element: <DocumentDetails />,
        },
        {
          path: "orderonlinemanage",
          element: <OrderOnlineManage />,
        },
        {
          path: "orderonline",
          element: <CreateOrderOnline />,
        },
        {
          path: "requestmanage",
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
