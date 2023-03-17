import React from "react";
import { useLocation } from "react-router-dom";

import UserCard from "../../components/UserCard/UserCard";

const UserInfo = () => {
  const location = useLocation();
  const user = location.state?.user;

  return <>{user && <UserCard user={user} />}</>;
};

export default UserInfo;
