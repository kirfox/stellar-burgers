// import { getFeedsApi } from '@api';
import { getFeedsApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

interface TFeedState {
  orders: TOrder[];
  ingredients: TIngredient[];
  isLoading: boolean;
  feed: {
    total: number;
    totalToday: number;
  };
  error: string | null;
  number: number;
}

export const initialState: TFeedState = {
  orders: [],
  ingredients: [],
  isLoading: true,
  feed: {
    total: 0,
    totalToday: 0
  },
  error: null,
  number: 0
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrdersAll',
  getFeedsApi
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeed: (state) => state.feed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.feed.total = action.payload.total;
      state.feed.totalToday = action.payload.totalToday;
    });
  }
});

export const { selectOrders, selectFeed } = feedsSlice.selectors;
export default feedsSlice.reducer;
