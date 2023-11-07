import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [APIData, setAPIData] = useState([]);
  const getStaffsUrl =
    "https://65375d06bb226bb85dd31d1e.mockapi.io/api/pe_test/staffManagement";

  useEffect(() => {
    axios
      .get(getStaffsUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setAPIData(
          data.sort((a, b) => {
            return b.age - a.age;
          })
        );
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="pt-4 pb-4">
      <Container>
        <Grid container spacing={2}>
          {APIData.map((staff) => (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345, padding: "20px" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250"
                  image={staff.avatar}
                />
                <CardContent>
                  <Typography
                    textAlign={"center"}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {staff.name}
                  </Typography>
                  <Typography textAlign={"center"} gutterBottom component="div">
                    Age: {staff.age}
                  </Typography>
                  <Typography
                    textAlign={"center"}
                    variant="body2"
                    color="text.secondary"
                  >
                    {staff.address}
                  </Typography>
                </CardContent>
                <Typography
                  textAlign={"center"}
                  variant="body2"
                  color="text.secondary"
                >
                  <Link to={`detail/${staff.id}`}>
                    <Button size="small">Details</Button>
                  </Link>
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
