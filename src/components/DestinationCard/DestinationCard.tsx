import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Clock, DollarSign } from "lucide-react";
import Link from "next/link";
import { IDestination } from "../../models/destinations";

const DestinationCard = ({ destination }: { destination: IDestination }) => (
  <Card sx={{ borderRadius: 4, boxShadow: 3, position: "relative" }}>
    <CardMedia
      component="img"
      height="200"
      image={destination.imageUrl || "/placeholder.png"}
      alt={destination.name}
    />
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {destination.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {destination.description}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <DollarSign size={16} />
          <Typography>${destination.price || "N/A"}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Clock size={16} />
          <Typography>{destination.duration || "N/A"}</Typography>
        </Stack>
      </Stack>
    </CardContent>
    <Button
      component={Link}
      href={`/tourDetails/${destination._id}`}
      variant="contained"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
    >
      View Detail
    </Button>
  </Card>
);

export default DestinationCard;
