import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { randomInt } from 'crypto';
import { useSelector } from '../services/store';

interface TOrderState {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: TOrderState = {
  ingredients: [],
  bun: null,
  orderRequest: false,
  orderModalData: null
};

export const makeOrder = createAsyncThunk(
  'order/makeOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

const constructorSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      action.payload.type === 'bun'
        ? (state.bun = { ...action.payload })
        : state.ingredients.push({ ...action.payload, id: Math.random() });
    },
    deleteIngredients: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredient: (state, action) => {
      const movedIngredient = state.ingredients[action.payload.index];

      if (action.payload.type === 'up') {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index - 1];
        state.ingredients[action.payload.index - 1] = movedIngredient;
      } else {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index + 1];
        state.ingredients[action.payload.index + 1] = movedIngredient;
      }
    },
    resetOrder: (state) => {
      state.ingredients = [];
      state.bun = null;
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (buider) => {
    buider
      .addCase(makeOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});
export const { addIngredients, deleteIngredients, moveIngredient, resetOrder } =
  constructorSlice.actions;
export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = constructorSlice.selectors;
export default constructorSlice.reducer;
