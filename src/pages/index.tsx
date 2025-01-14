import React from "react";
import Link from "next/link";
import { Button, Box, Grid, Typography } from "@mui/material";
import "./home.scss";

const HomePage = () => {
  return (
    <Grid item xs={12} container spacing={2} className="home-page">
      <img
        className="home-background"
        src="/background.png"
        alt="beige-colored background"
      />

      <img
        className="background-wave"
        src="/backline.png"
        alt="background-wave"
      />
      <Grid item lg={6} sm={12} xs={12} md={12} className="text-content">
        <Box className="title-wrapper">
          <Typography variant="h1" className="home-title">
            Explore The New World With Tourbay
          </Typography>
        </Box>

        <Typography className="home-description">
          No matter where in the world you want to go, we can help get you there
          and make your tour a stupendous memory.
        </Typography>

        <Button
          variant="contained"
          size="large"
          className="explore-now-btn"
          component={Link}
          href="/tours"
        >
          Explore Now
        </Button>
      </Grid>
      <Grid
        container
        lg={6}
        sm={12}
        xs={12}
        md={12}
        spacing={2}
        className="images-container"
      >
        <Grid item lg={6} sm={6} xs={12} className="main-image">
          <img src="/img1.png" alt="Santorini, Greece" />
        </Grid>

        <Grid item lg={6} sm={6} xs={12} className="small-images">
          <Box className="small-image">
            <img src="/img2.png" alt="Desert road with vintage van" />
          </Box>
          <Box className="small-image">
            <img src="/img3.png" alt="City street scene" />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
