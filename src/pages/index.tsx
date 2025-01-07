import React from "react";
import Link from "next/link";
import { Button, Box, Grid, Typography, Container } from "@mui/material";
import "./home.scss";

const HomePage = () => {
  return (
    <Box className="home-page">
      <img
        className="home-background"
        src="/background.png"
        alt="beige-colored background"
      />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} className="text-content">
            <Box className="title-wrapper">
              <Typography variant="h1" className="home-title">
                Explore The New World
                <Box component="span" className="subtitle">
                  With Tourbay
                </Box>
              </Typography>
            </Box>

            <Typography className="home-description">
              No matter where in the world you want to go, we can help get you
              there and make your tour a stupendous memory.
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

          <Grid item xs={12} md={6}>
            <Box className="images-container">
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Box className="main-image">
                    <img src="/img1.png" alt="Santorini, Greece" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box className="small-images">
                    <Box className="small-image">
                      <img src="/img2.png" alt="Desert road with vintage van" />
                    </Box>
                    <Box className="small-image">
                      <img src="/img3.png" alt="City street scene" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
