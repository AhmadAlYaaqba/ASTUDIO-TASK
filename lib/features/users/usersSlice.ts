import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  company: {
    name: string;
    department: string;
  };
}

interface UsersState {
  items: User[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
  };
}

const initialState: UsersState = {
  items: [],
  total: 0,
  skip: 0,
  limit: 5,
  loading: false,
  error: null,
  searchTerm: "",
  filters: {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  },
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { users: UsersState };
    const { skip, limit, filters } = state.users;

    const activeFilter = Object.entries(filters).find(
      ([_, value]) => value !== ""
    );

    let url = "";
    let params: Record<string, string | number> = {};

    if (activeFilter) {
      const [key, value] = activeFilter;
      url = `https://dummyjson.com/users/filter`;
      params = {
        key,
        value,
        limit,
        skip,
      };
    } else {
      url = `https://dummyjson.com/users`;
      params = {
        limit,
        skip,
      };
    }

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.skip = 0;
    },
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilter: (
      state,
      action: PayloadAction<{
        field: keyof UsersState["filters"];
        value: string;
      }>
    ) => {
      const { field, value } = action.payload;

      Object.keys(state.filters).forEach((key) => {
        if (key !== field) {
          state.filters[key as keyof UsersState["filters"]] = "";
        }
      });

      state.filters[field] = value;
      state.skip = 0;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLimit, setSkip, setSearchTerm, setFilter, clearFilters } =
  usersSlice.actions;

export default usersSlice.reducer;
