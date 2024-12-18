import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IDestination } from "../../models/destinations";

interface DestinationsState {
  destinations: IDestination[];
  currentDestination: IDestination | null;
  loading: boolean;
  error: string | null;
}

const initialState: DestinationsState = {
  destinations: [],
  currentDestination: null,
  loading: false,
  error: null,
};

export const fetchDestinations = createAsyncThunk(
  "destinations/fetchDestinations",
  async (
    filters: {
      location?: string;
      date?: string;
      price?: string;
      booked?: boolean;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams(filters as Record<string, string>);
      const response = await axios.get<IDestination[]>(
        `/api/destinations?${params}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch destinations"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchDestinationById = createAsyncThunk(
  "destinations/fetchDestinationById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<IDestination>(
        `/api/destinations?id=${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch destination details"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.destinations = action.payload;
        state.loading = false;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchDestinationById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentDestination = null;
      })
      .addCase(fetchDestinationById.fulfilled, (state, action) => {
        state.currentDestination = action.payload;
        state.loading = false;
      })
      .addCase(fetchDestinationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default destinationsSlice.reducer;
