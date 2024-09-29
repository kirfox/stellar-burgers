import {
  getOrderByNumberApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

interface TUserState {
  isAuthChecked: boolean;
  loginUserError: SerializedError | null;
  user: TUser | null;
  orders: TOrder[];
  order: TOrder | null;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  loginUserError: null,
  user: null,
  orders: [],
  order: null
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);
export const getOrders = createAsyncThunk('user/getOrders', getOrdersApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const getOrder = createAsyncThunk('user/getOrder', getOrderByNumberApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectOrders: (state) => state.orders,
    selectOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder

      //getUser
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserError = action.error;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })

      //login
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserError = action.error;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserError = null;
        state.isAuthChecked = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      //logout
      .addCase(logoutUser.fulfilled, (state) => {
        deleteCookie('accessToken');
        localStorage.clear();
        state.user = null;
        state.loginUserError = null;
        state.isAuthChecked = true;
      })

      //register
      .addCase(registerUser.pending, (state) => {
        state.loginUserError = null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserError = action.error;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserError = null;
        state.isAuthChecked = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      //update
      .addCase(updateUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError = action.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserError = null;
      })

      //getOrders
      .addCase(getOrders.pending, (state) => {
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loginUserError = action.error;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loginUserError = null;
      })

      //getOrder
      .addCase(getOrder.pending, (state) => {
        state.isAuthChecked = true;
        state.loginUserError = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loginUserError = action.error;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.loginUserError = null;
      });
  }
});

export const { selectUser, selectIsAuthChecked, selectOrders, selectOrder } =
  userSlice.selectors;
export default userSlice.reducer;
