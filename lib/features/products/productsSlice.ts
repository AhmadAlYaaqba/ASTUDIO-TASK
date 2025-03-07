import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsState {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  activeTab: "ALL" | "Laptops";
  filters: {
    title: string;
    brand: string;
    category: string;
  };
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  skip: 0,
  limit: 5,
  loading: false,
  error: null,
  searchTerm: "",
  activeTab: "ALL",
  filters: {
    title: "",
    brand: "",
    category: "",
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { products: ProductsState };
    const { skip, limit, filters, activeTab } = state.products;

    let url = `https://dummyjson.com/products`;
    const params: Record<string, string | number> = {
      limit,
      skip,
    };

    // If Laptops tab is active, filter by category
    if (activeTab === "Laptops") {
      url = `https://dummyjson.com/products/category/laptops`;
    }
    // If category filter is active, use category endpoint
    else if (filters.category) {
      url = `https://dummyjson.com/products/category/${filters.category}`;
    }

    // currently those are just for functionality as per the task, but they wont work currectly as the API does not support those filters
    // REF: https://dummyjson.com/docs/products
    // this should be changed in the task to eather make it local filter, or change the requirement to different Dummey API
    if (filters.title) params.title = filters.title;
    if (filters.brand) params.brand = filters.brand;

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

const productsSlice = createSlice({
  name: "products",
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
        field: keyof ProductsState["filters"];
        value: string;
      }>
    ) => {
      const { field, value } = action.payload;
      Object.keys(state.filters).forEach((key) => {
        if (key !== field) {
          state.filters[key as keyof ProductsState["filters"]] = "";
        }
      });

      state.filters[field] = value;
      state.skip = 0;
    },
    setActiveTab: (state, action: PayloadAction<"ALL" | "Laptops">) => {
      state.activeTab = action.payload;
      state.skip = 0;
      state.filters = initialState.filters;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setLimit,
  setSkip,
  setSearchTerm,
  setFilter,
  setActiveTab,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
