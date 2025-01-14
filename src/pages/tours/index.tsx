// import React, { useEffect, useState } from "react";
// import { Clock, DollarSign } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
//   Button,
//   Box,
//   Container,
//   Stack,
// } from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import Link from "next/link";
// import Pagination from "@mui/material/Pagination";
// import { AppDispatch, RootState } from "../../app/store";
// import { fetchDestinations } from "../../app/slices/destinationsSlice";

// import "./tours.scss";

// const ITEMS_PER_PAGE = 6;

// const NoResultsSVG = () => (
//   <Box sx={{ textAlign: "center", mt: 10 }}>
//     <img
//       src="/not-found.jpg"
//       alt="No results"
//       style={{ width: "300px", height: "auto", marginBottom: "16px" }}
//     />
//     <Typography variant="h6">Sorry, No tour available at the moment</Typography>
//   </Box>
// );

// const Tours = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { destinations, loading, error } = useSelector(
//     (state: RootState) => state.destinations
//   );

//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const filters = Object.fromEntries(searchParams.entries());
//     dispatch(fetchDestinations(filters));
//   }, [dispatch]);

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   if (error) {
//     return (
//       <Container maxWidth="lg">
//         <Box sx={{ my: 4, textAlign: "center" }}>
//           <Typography variant="h6" color="error">
//             Error Loading Destinations
//           </Typography>
//           <Typography variant="body1">{error}</Typography>
//         </Box>
//       </Container>
//     );
//   }

//   if (destinations.length === 0) {
//     return (
//       <Container maxWidth="lg">
//         <NoResultsSVG />
//       </Container>
//     );
//   }

//   const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);
//   const handleChangePage = (
//     _event: React.ChangeEvent<unknown>,
//     page: number
//   ) => {
//     setCurrentPage(page);
//   };

//   const paginatedDestinations = destinations.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ my: 4 }}>
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={4}
//         >
//           <Typography variant="h4" component="h1" gutterBottom>
//             Top Destinations
//           </Typography>

//           <Button
//             variant="outlined"
//             startIcon={<FilterListIcon />}
//             sx={{
//               borderColor: "lightgray",
//               "&:hover": {
//                 borderColor: "gray",
//               },
//               boxShadow: 0.5,
//               color: "black",
//             }}
//           >
//             Filters
//           </Button>
//         </Stack>

//         <Grid container spacing={3}>
//           {paginatedDestinations.map((destination) => (
//             <Grid item xs={12} sm={6} md={4} key={destination._id}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   "&:hover": {
//                     boxShadow: 6,
//                     ".view-details-btn": {
//                       opacity: 1,
//                       visibility: "visible",
//                     },
//                     ".price-duration": {
//                       opacity: 0,
//                       visibility: "hidden",
//                     },
//                   },
//                   borderRadius: 4,
//                   position: "relative",
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={destination.imageUrl || "/placeholder.png"}
//                   alt={destination.name}
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography gutterBottom variant="h6" component="h2">
//                     {destination.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mb: 2 }}
//                   >
//                     {destination.description}
//                   </Typography>
//                   <Stack
//                     direction="row"
//                     spacing={2}
//                     alignItems="center"
//                     className="price-duration"
//                   >
//                     <Stack direction="row" alignItems="center" spacing={0.5}>
//                       <DollarSign size={16} />
//                       <Typography variant="body2" color="text.secondary">
//                         {destination.price ? `$${destination.price}` : "N/A"}
//                       </Typography>
//                     </Stack>
//                     <Stack direction="row" alignItems="center" spacing={0.5}>
//                       <Clock size={16} />
//                       <Typography variant="body2" color="text.secondary">
//                         {destination.duration || "N/A"}
//                       </Typography>
//                     </Stack>
//                   </Stack>
//                 </CardContent>
//                 <Button
//                   variant="contained"
//                   className="view-details-btn"
//                   size="large"
//                   component={Link}
//                   href={`/tourDetails/${destination._id}`}
//                   sx={{ textDecoration: "none" }}
//                 >
//                   View Details
//                 </Button>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={handleChangePage}
//             color="primary"
//           />
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Tours;

import React, { useEffect, useState } from "react";
import { Clock, DollarSign } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  Container,
  Stack,
  CircularProgress,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import { AppDispatch, RootState } from "../../app/store";
import { fetchDestinations } from "../../app/slices/destinationsSlice";

import "./tours.scss";

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

const Tours = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { destinations, loading, error } = useSelector(
    (state: RootState) => state.destinations
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const filters = Object.fromEntries(searchParams.entries());
    dispatch(fetchDestinations(filters));
  }, [dispatch]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Error Loading Destinations
          </Typography>
          <Typography variant="body1">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (destinations.length === 0) {
    return (
      <Container maxWidth="lg">
        <NoResultsSVG />
      </Container>
    );
  }

  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const paginatedDestinations = destinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Top Destinations
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
                    ".view-details-btn": {
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
                <Button
                  variant="contained"
                  className="view-details-btn"
                  size="large"
                  component={Link}
                  href={`/tourDetails/${destination._id}`}
                  sx={{ textDecoration: "none" }}
                >
                  View Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Tours;
