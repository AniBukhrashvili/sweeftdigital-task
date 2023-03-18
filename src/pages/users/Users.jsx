import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

import { Grid } from "@mui/material";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/12`
    );
    const data = await response.json();
    setUserData((prev) => [...prev, ...data.list]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const fetchUserData = async (userId) => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`
    );
    const data = await response.json();
    navigate(`/userinfo/${data.id}`, {
      state: { user: data },
    });
  };

  return (
    <>
      <Grid container display="flex" justifyContent="center">
        {userData &&
          userData.map((item, index) => (
            <Card
              key={index}
              {...item}
              onClick={() => fetchUserData(item.id)}
            />
          ))}
      </Grid>
      {loading && <Loading />}
    </>
  );
};

export default Users;
