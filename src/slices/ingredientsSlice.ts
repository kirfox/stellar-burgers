import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface TIngredientsState {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: false,
  error: null
};
export const fetchIngridients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.isLoading,
    selectBuns: (state) => state.ingredients.filter((n) => n.type === 'bun'),
    selectMains: (state) => state.ingredients.filter((n) => n.type === 'main'),
    selectSauces: (state) => state.ingredients.filter((n) => n.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngridients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngridients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngridients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  selectIngredients,
  selectIngredientsLoading,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
