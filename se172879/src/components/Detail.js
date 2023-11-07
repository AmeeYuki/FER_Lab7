import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { CardMedia, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Detail() {
  const staff = useParams();

  const [APIData, setAPIData] = useState([]);
  const getStaffsUrl = `https://65375d06bb226bb85dd31d1e.mockapi.io/api/pe_test/staffManagement/${staff.id}`;

  useEffect(() => {
    fetch(getStaffsUrl, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, [getStaffsUrl]);

  return (
    <div>
      <Container className="pt-2 pb-2">
        <Typography textAlign={"center"} variant="h4" gutterBottom>
          Detail
          <hr />
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="400"
                image={APIData.avatar}
                alt="Avatar"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="body1" component="div">
                <b>Name:</b> {APIData.name}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                <b>Age:</b> {APIData.age}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                <b>Address:</b> {APIData.address}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                <b>createdAt:</b> {APIData.createdAt}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
