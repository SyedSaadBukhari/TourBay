import React, { useEffect } from "react";

import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Button,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { AppDispatch, RootState } from "../../app/store";
import { fetchDestinationById } from "../../app/slices/destinationsSlice";

import "./tour-details.scss";

function TourDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentDestination, loading, error } = useSelector(
    (state: RootState) => state.destinations
  );
  const params = useParams();
  const destinationId = params?.id as string;

  useEffect(() => {
    if (destinationId) {
      dispatch(fetchDestinationById(destinationId));
    }
  }, [dispatch, destinationId]);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Error Loading Destination Details
        </Typography>
        <Typography variant="body1">{error}</Typography>
      </Container>
    );
  }

  if (!currentDestination) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">No Destination Found</Typography>
      </Container>
    );
  }

  return (
    <main className="tour-detail-page">
      <Container maxWidth="lg" sx={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          {currentDestination.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              image={currentDestination.imageUrl || "/placeholder.png"}
              alt={currentDestination.name}
              sx={{ width: "100%", height: 300, objectFit: "cover" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              {[1, 2, 3, 4].map((index) => (
                <Grid item xs={6} key={index}>
                  <CardMedia
                    component="img"
                    image={currentDestination.imageUrl || `/img${index}.png`}
                    alt={`${currentDestination.name} - Image ${index}`}
                    sx={{ height: 145, objectFit: "cover" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body1">
            {currentDestination.description}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 3 }} />

        <Typography variant="h5" gutterBottom>
          What&apos;s included
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {currentDestination.details && (
              <>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Destination:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Typography variant="body1">
                      {currentDestination.details.destination}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ marginY: 2 }} />

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Departure Location:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Typography variant="body1">
                      {currentDestination.details.departureLocation}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ marginY: 2 }} />

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Return:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Typography variant="body1">
                      {currentDestination.details.returnTime}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ marginY: 2 }} />

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4} md={3}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Included:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={9}>
                    <Grid container spacing={1}>
                      {currentDestination.details.included.map(
                        (item, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Typography variant="body2">✅ {item}</Typography>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        <Typography variant="h5" gutterBottom>
          Itinerary Schedule
        </Typography>
        <Grid container spacing={2}>
          {currentDestination.itinerary?.map((itinerary, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ padding: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{`Day ${itinerary.day}`}</Typography>
                  <Typography variant="h6">{itinerary.temperature}</Typography>
                </Box>
                <ul>
                  {itinerary.activities.map((activity, i) => (
                    <li key={i}>
                      <Typography variant="body2">{activity}</Typography>
                    </li>
                  ))}
                </ul>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            className="book-now-btn"
            size="large"
            component={Link}
            href={`/booking?id=${currentDestination._id}`}
          >
            Book Now
          </Button>
        </Box>
      </Container>
    </main>
  );
}

export default TourDetails;
