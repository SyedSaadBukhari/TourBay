import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
  Grid,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import "./booking.scss";

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  adults: Yup.number()
    .positive("Must be a positive number")
    .required("Number of adults is required"),
  children: Yup.number().min(0, "Cannot be negative").optional(),
  paymentMethod: Yup.string().required("Payment method is required"),
});

function Booking() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const destinationId = router.query.id;
        if (!destinationId) {
          throw new Error("No destination ID provided");
        }

        const response = await axios.get(
          `/api/destinations?id=${destinationId}`
        );
        setDestination(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch destination details");
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchDestinationDetails();
    }
  }, [router.isReady, router.query]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    try {
      await axios.patch(`/api/destinations?id=${destination._id}`, {
        booked: true,
      });

      router.push("/tours");
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !destination) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error || "No destination found"}</Typography>
      </Box>
    );
  }

  return (
    <section className="booking-form-container">
      <section className="form-section">
        <h2 className="form-header">
          Confirm Your Booking
          <Typography variant="h4" gutterBottom>
            Destination : {destination.name}
          </Typography>
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            adults: "",
            children: "",
            paymentMethod: "",
          }}
          validationSchema={BookingSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-fields">
                <div className="form-field">
                  <InputLabel>Name</InputLabel>
                  <Field
                    name="name"
                    type="text"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </div>

                <div className="form-field">
                  <InputLabel>Email</InputLabel>
                  <Field
                    name="email"
                    type="email"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>

                <div className="form-field">
                  <InputLabel>Phone</InputLabel>
                  <Field
                    name="phone"
                    type="tel"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={6} className="form-field">
                    <InputLabel>Number of Adults</InputLabel>
                    <Field
                      name="adults"
                      type="number"
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={touched.adults && Boolean(errors.adults)}
                      helperText={touched.adults && errors.adults}
                    />
                  </Grid>
                  <Grid item xs={6} className="form-field">
                    <InputLabel>Number of Children</InputLabel>
                    <Field
                      name="children"
                      type="number"
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={touched.children && Boolean(errors.children)}
                      helperText={touched.children && errors.children}
                    />
                  </Grid>
                </Grid>

                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  className="form-field"
                  error={touched.paymentMethod && Boolean(errors.paymentMethod)}
                >
                  <InputLabel>Payment Method</InputLabel>
                  <Field
                    name="paymentMethod"
                    as={Select}
                    label="Payment Method"
                  >
                    <MenuItem value="credit-card">Credit Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                    <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
                  </Field>
                </FormControl>

                <Box mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    className="confirm-booking-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </Box>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      <section className="image-section">
        <img
          src={destination.imageUrl || "/bookingformImg.png"}
          alt={destination.name}
          className="form-image"
        />
      </section>
    </section>
  );
}

export default Booking;
