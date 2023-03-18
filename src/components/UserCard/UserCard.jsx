import React, { useEffect, useState } from "react";

import { Typography, Box, Grid } from "@mui/material";
import "./UserCard.css";

import Card from "../Card/Card";
import Loading from "../../components/Loading/Loading";

const UserCard = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchFriends = async () => {
    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${user.id}/friends/${page}/12`
    );
    const data = await response.json();
    setFriends((prevFriends) => [...prevFriends, ...data.list]);
  };

  useEffect(() => {
    fetchFriends();
  }, [user.id, page]);

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

  return (
    <>
      <Box key={user.id} className="user-div">
        <Box>
          <img src={user.imageUrl} className="user-img" />
        </Box>
        <Box className="info-box">
          <Typography fontWeight={"bold"}>
            {user.prefix} {user.name} {user.lastName}
          </Typography>
          <Typography>{user.title}</Typography>
          <br />
          <Typography>Email: {user.email}</Typography>
          <Typography>IP: {user.ip}</Typography>
          <Typography>Job Area: {user.jobArea}</Typography>
          <Typography>Job Type: {user.jobType}</Typography>
        </Box>

        <Box className="address-box">
          <Typography fontWeight={"bold"}>
            {user.company.name} {user.company.suffix}
          </Typography>
          <br />
          <Typography>City: {user.address.city}</Typography>
          <Typography>Country: {user.address.country}</Typography>
          <Typography>Street Address: {user.address.streetAddress}</Typography>
          <Typography>ZIP: {user.address.zipCode}</Typography>
        </Box>
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        m="1rem"
        fontStyle="italic"
      >
        Friends
      </Typography>

      <Grid container display="flex" justifyContent="center">
        {friends &&
          friends.map((item, index) => <Card key={index} {...item} />)}
      </Grid>
      {loading && <Loading />}
    </>
  );
};

export default UserCard;
