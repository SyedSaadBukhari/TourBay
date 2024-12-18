import React from "react";

import Link from "next/link";
import { Button, Box, Grid } from "@mui/material";

import "./home.scss";

const HomePage = () => {
  return (
    <main className="home-page">
      <section className="homepage-text-content">
        <h1 className="home-title">
          <img
            src="/underline.png"
            alt="underline"
            className="underline-header"
          />
          Explore The New World With Tourbay
        </h1>

        <p className="home-description">
          No matter where in the world you want to go, we can help get you there
          and make your tour a stupendous memory.
        </p>

        <section className="desktop-button">
          <Button
            variant="contained"
            className="explore-tours-btn"
            size="large"
            component={Link}
            href="/tours"
            sx={{ textDecoration: "none" }}
          >
            Explore Tours
          </Button>
        </section>
      </section>

      <section className="home-images">
        <img
          className="home-background"
          src="/background.png"
          alt="beige-colored background"
        />

        <img className="backline" src="/backline.png" alt="backline" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: { xs: "300px", md: "600px" },
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <img src="/img1.png" alt="Santorini, Greece" />
            </Box>
          </Grid>
          <Grid item xs={12} md={2} container direction="column" spacing={4}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: { xs: "200px", md: "260px" },
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <img src="/img2.png" alt="Desert road with vintage van" />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: { xs: "200px", md: "260px" },
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <img src="/img3.png" alt="City street scene" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </main>
  );
};

export default HomePage;
