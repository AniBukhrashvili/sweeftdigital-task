import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Typography, Box, Grid } from "@mui/material";
import "./UserCard.css";

import Card from "../Card/Card";
import Loading from "../../components/Loading/Loading";

const UserCard = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const navigate = useNavigate();

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

  const handleFriendClick = async (friendId) => {
    setFriends([]);

    const response = await fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${friendId}`
    );
    const friend = await response.json();
    setSelectedFriend(friend);

    setSelectedFriends((prevSelectedFriends) => [
      ...prevSelectedFriends,
      friend,
    ]);

    navigate(`/userinfo/${friend.id}`, {
      state: { user: friend },
    });
  };

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

      {selectedFriends.length > 0 && (
        <Box display="flex" justifyContent="center" sx={{ flexWrap: "wrap" }}>
          {selectedFriends.map((friend, index) => {
            const friendFullName = `${friend.prefix} ${friend.name} ${friend.lastName}`;
            const friendId = `${friend.id}`;
            return (
              <Typography key={index}>
                <Link to={`/userinfo/${friendId}`} style={{ margin: "1rem " }}>
                  {friendFullName}
                </Link>
                {index !== selectedFriends.length - 1 && " > "}
              </Typography>
            );
          })}
        </Box>
      )}

      <Grid container display="flex" justifyContent="center">
        {friends &&
          friends.map((item, index) => (
            <Card
              key={index}
              {...item}
              onClick={() => handleFriendClick(item.id)}
            />
          ))}
      </Grid>
      {loading && <Loading />}
    </>
  );
};

export default UserCard;
