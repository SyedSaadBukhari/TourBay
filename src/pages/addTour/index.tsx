import React, { useState } from "react";

import {
  Container,
  TextField,
  Button,
  Paper,
  Grid,
  Popover,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  AttachMoney,
  Search,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import "./add-tour.scss";

const popularDestinations = [
  "Istanbul",
  "Dubai",
  "Miami",
  "Chicago",
  "Dallas",
  "Havana",
  "Berlin",
  "London",
  "Ankara",
  "Orlando",
  "Cape Town",
  "Santorini",
  "Madrid",
  "Lisbon",
  "New Orleans",
];

const priceRanges = [
  { label: "$50 - $200", value: "50-200" },
  { label: "$200 - $400", value: "200-400" },
  { label: "$400 - $600", value: "400-600" },
  { label: "$600 - $800", value: "600-800" },
  { label: "$800 - $1000", value: "800-1000" },
  { label: "$1000 or above", value: "1000-above" },
];

const DualMonthDatePicker = ({
  value,
  onChange,
}: {
  value: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs | null) => void;
}) => {
  const currentMonth = value ? dayjs(value) : dayjs();
  const nextMonth = currentMonth.add(1, "month");

  return (
    <div className="flex">
      <DateCalendar
        value={value}
        onChange={onChange}
        defaultValue={currentMonth}
        views={["day"]}
        showDaysOutsideCurrentMonth={false}
        className="border-r border-gray-200"
      />
      <DateCalendar
        value={value}
        onChange={onChange}
        defaultValue={nextMonth}
        views={["day"]}
        showDaysOutsideCurrentMonth={false}
      />
    </div>
  );
};

const AddTour = () => {
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [calendarAnchor, setCalendarAnchor] = useState<HTMLElement | null>(
    null
  );
  const [priceAnchor, setPriceAnchor] = useState<HTMLElement | null>(null);
  const [selectedPrice, setSelectedPrice] = useState("");
  const router = useRouter();

  const handleDateClick = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchor(event.currentTarget);
  };

  const handleDateClose = () => {
    setCalendarAnchor(null);
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate);
    handleDateClose();
  };

  const handlePriceClick = (event: React.MouseEvent<HTMLElement>) => {
    setPriceAnchor(event.currentTarget);
  };

  const handlePriceClose = () => {
    setPriceAnchor(null);
  };

  const handlePriceSelect = (range: { label: string; value: string }) => {
    setSelectedPrice(range.label);
    handlePriceClose();
  };

  const handleSearch = () => {
    const filters: Record<string, string> = {};
    if (location) filters.location = location;
    if (selectedDate) filters.date = selectedDate.toISOString();
    if (selectedPrice) {
      const priceValue = priceRanges.find(
        (range) => range.label === selectedPrice
      )?.value;
      if (priceValue) filters.price = priceValue;
    }

    router.push(`/tours?${new URLSearchParams(filters).toString()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main className="tour-booking">
        <img
          src="/background-image.png"
          alt="background"
          className="background-image"
        />

        <section className="search-tour">
          <Container maxWidth="lg" className="search-content">
            <Paper elevation={1} className="search-panel">
              <Grid container spacing={8} alignItems="center">
                <Grid item xs={12} md={4}>
                  <div className="search-field">
                    <LocationOn />
                    <TextField
                      fullWidth
                      placeholder="Where you want to go?"
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={3}>
                  <div className="search-field" onClick={handleDateClick}>
                    <CalendarToday />
                    <TextField
                      fullWidth
                      placeholder="Choose Date"
                      value={
                        selectedDate
                          ? dayjs(selectedDate).format("MMM DD, YYYY")
                          : ""
                      }
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                    />
                  </div>
                  <Popover
                    open={Boolean(calendarAnchor)}
                    anchorEl={calendarAnchor}
                    onClose={handleDateClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    PaperProps={{
                      sx: {
                        "& .MuiDateCalendar-root": {
                          width: "auto",
                          maxWidth: "none",
                        },
                      },
                    }}
                  >
                    <DualMonthDatePicker
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </Popover>
                </Grid>

                <Divider orientation="vertical" variant="middle" />

                <Grid item xs={12} md={3}>
                  <div className="search-field" onClick={handlePriceClick}>
                    <AttachMoney />
                    <TextField
                      fullWidth
                      placeholder="Price Range"
                      value={selectedPrice}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                        endAdornment: <KeyboardArrowDown />,
                      }}
                    />
                  </div>
                  <Menu
                    anchorEl={priceAnchor}
                    open={Boolean(priceAnchor)}
                    onClose={handlePriceClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1,
                        "& .MuiMenuItem-root": {
                          px: 2,
                          py: 1,
                        },
                      },
                    }}
                  >
                    {priceRanges.map((range) => (
                      <MenuItem
                        key={range.value}
                        onClick={() => handlePriceSelect(range)}
                        selected={selectedPrice === range.label}
                      >
                        {range.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>

                <Grid item xs={12} md={1}>
                  <Button
                    variant="contained"
                    className="search-button"
                    startIcon={
                      <Search
                        className="search-icon"
                        sx={{ marginRight: "-6px" }}
                      />
                    }
                    onClick={handleSearch}
                    disabled={!location && !selectedDate && !selectedPrice}
                  ></Button>
                </Grid>
              </Grid>
            </Paper>

            <div className="popular-destinations">
              <h2 className="popular-destinations-label">Popular Search</h2>
              <Grid container spacing={2}>
                {popularDestinations.map((destination) => (
                  <Grid item key={destination}>
                    <Button variant="outlined" className="destination-chip">
                      {destination}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Container>
        </section>
      </main>
    </LocalizationProvider>
  );
};

export default AddTour;
