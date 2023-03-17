import React from "react";

import { Typography, Box } from "@mui/material";
import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
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
  );
};

export default UserCard;
