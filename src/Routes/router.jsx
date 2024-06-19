import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashBoardLayout from "../pages/DashBoardLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import ManageTodo from "../pages/ManageTodo";
import UploadTodo from "../pages/UploadTodo";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LogIn />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/uploadTodo",
        element: <UploadTodo />,
      },
      {
        path: "/admin/manageTodo",
        element: <ManageTodo />,
      },
    ],
  },
]);

export default router;
