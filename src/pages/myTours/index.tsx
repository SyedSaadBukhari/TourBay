import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Pagination,
  Box,
  Button,
  Stack,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { AppDispatch, RootState } from "../../app/store";
import { fetchDestinations } from "../../app/slices/destinationsSlice";
import Link from "next/link";
import { DollarSign, Clock } from "lucide-react";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const ITEMS_PER_PAGE = 6;

const NoResultsSVG = () => (
  <Box sx={{ textAlign: "center", mt: 10 }}>
    <img
      src="/not-found.jpg"
      alt="No results"
      style={{ width: "300px", height: "auto", marginBottom: "16px" }}
    />
    <Typography variant="h6">Sorry, No tour available at the moment</Typography>
  </Box>
);

const MyTours = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { destinations, loading, error } = useSelector(
    (state: RootState) => state.destinations
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDestinations({ booked: true }));
  }, [dispatch]);

  const handleDeleteClick = (destinationId: string) => {
    setSelectedDestination(destinationId);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDestination) return;

    try {
      // Update the booked status to false
      await axios.patch(`/api/destinations?id=${selectedDestination}`, {
        booked: false,
      });

      dispatch(fetchDestinations({ booked: true }));

      setIsConfirmDialogOpen(false);
      setSelectedDestination(null);
    } catch (err) {
      console.error("Failed to update destination", err);
    }
  };

  const handleDialogClose = () => {
    setIsConfirmDialogOpen(false);
    setSelectedDestination(null);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  if (destinations.length === 0) {
    return (
      <Container maxWidth="lg">
        <NoResultsSVG />
      </Container>
    );
  }

  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) =>
    setCurrentPage(page);

  const paginatedDestinations = destinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container maxWidth="lg">
      <ConfirmationDialog
        open={isConfirmDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
        title="Confirm Cancellation"
        message="Are you sure you want to cancel this tour booking?"
      />

      <Box sx={{ my: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            My Booked Tours
          </Typography>

          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{
              borderColor: "lightgray",
              "&:hover": {
                borderColor: "gray",
              },
              boxShadow: 0.5,
              color: "black",
            }}
          >
            Filters
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {paginatedDestinations.map((destination) => (
            <Grid item xs={12} sm={6} md={4} key={destination._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    boxShadow: 6,
                    ".action-buttons": {
                      opacity: 1,
                      visibility: "visible",
                    },
                    ".price-duration": {
                      opacity: 0,
                      visibility: "hidden",
                    },
                  },
                  borderRadius: 4,
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.imageUrl || "/placeholder.png"}
                  alt={destination.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {destination.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {destination.description}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    className="price-duration"
                  >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <DollarSign size={16} />
                      <Typography variant="body2" color="text.secondary">
                        {destination.price ? `$${destination.price}` : "N/A"}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Clock size={16} />
                      <Typography variant="body2" color="text.secondary">
                        {destination.duration || "N/A"}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>

                <Box
                  className="action-buttons"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: 0,
                    visibility: "hidden",
                    transition: "opacity 0.3s, visibility 0.3s",
                    width: "90%",
                  }}
                >
                  <IconButton
                    onClick={() => handleDeleteClick(destination._id)}
                    sx={{
                      color: "#ed6c02",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <Button
                    variant="contained"
                    size="medium"
                    component={Link}
                    href={`/tourDetails/${destination._id}`}
                    sx={{
                      width: "40%",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      backgroundColor: "#ed6c02",
                    }}
                  >
                    Details
                  </Button>

                  <Button
                    variant="contained"
                    size="medium"
                    component={Link}
                    href={`/booking?id=${destination._id}`}
                    sx={{
                      width: "40%",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      backgroundColor: "#ed6c02",
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default MyTours;
