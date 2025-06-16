import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "../Routes/PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CreateTask from "../Pages/Dashboard/CreateTask";
import MyTasks from "../Pages/Dashboard/MyTask";
import Overview from "../Pages/Dashboard/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: '/dashboard/create-task',
        element: <CreateTask />
      },
      {
        path: '/dashboard/my-tasks',
        element: <MyTasks />
      },
      {
        path: '/dashboard/overview',
        element: <Overview />
      }

    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
]);

export default router;
