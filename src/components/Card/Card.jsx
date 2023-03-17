import React from "react";

import { Typography, Box } from "@mui/material";
import "./Card.css";

const Card = (props) => {
  const { id, imageUrl, prefix, name, lastName, title, onClick } = props;

  return (
    <Box key={id} className="card-container" onClick={onClick}>
      <img src={imageUrl} className="card-img" />
      <hr />
      <Typography fontWeight="bold">
        {prefix} {name} {lastName}
        <br />
        {title}
      </Typography>
    </Box>
  );
};

export default Card;
