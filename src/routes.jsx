import { createBrowserRouter } from "react-router-dom";

import Users from "./pages/users/Users";
import UserInfo from "./pages/userinfo/UserInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/userinfo/:id",
    element: <UserInfo />,
  },
]);
