import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/login/LoginPage";
import Layout from "./Layout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Testing from "./Testing";
import ManagementUserPage from "../pages/management-user/ManagementUserPage";
import DocumentPage from "../pages/document/DocumentPage";
import AddUserPage from "../pages/add-user/AddUserPage";
import AddDocumentPage from "../pages/add-document/AddDocumentPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import UpdateUserPage from "../pages/update-user/UpdateUserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/management-user",
        element: <ManagementUserPage />,
      },
      {
        path: "/add-user",
        element: <AddUserPage />,
      },
      {
        path: "/update-user",
        element: <UpdateUserPage />,
      },
      {
        path: "/management-document",
        element: <DocumentPage />,
      },
      {
        path: "/add-doc",
        element: <AddDocumentPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/test",
    element: <Testing />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
