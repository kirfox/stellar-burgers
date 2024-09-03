import {
  fetchWithRefresh,
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

interface TUserState {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  loginUserError: any | null;
  loginUserRequest: boolean;
  user: TUser | null;
  orders: TOrder[];
}

const initialState: TUserState = {
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false,
  user: null,
  orders: []
};
//testfortest@yandex.ru
//123456

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => await logoutApi()
);

export const getOrders = createAsyncThunk(
  'user/getOrders',
  async () => await getOrdersApi()
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    // selectUserName: (state) => state.user.name,
    // selectUserEmail: (state) => state.user.email,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        // state.loginUserRequest = true;
        state.loginUserError = null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.error.message);

        // state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        console.log(action.payload);
        state.loginUserError = null;
        // state.loginUserRequest = false;
        // state.isAuthenticated = true;
        state.isAuthChecked = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      .addCase(loginUser.pending, (state) => { 
        state.isAuthChecked = true;
        state.loginUserError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.error.message);
        state.loginUserError = action.error;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserError = null;
        state.isAuthChecked = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      .addCase(updateUser.pending, (state) => {
        state.isAuthChecked = true;
        state.loginUserError = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.error.message);
        state.loginUserError = action.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserError = null;
        // state.isAuthChecked = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        deleteCookie('accessToken');
        state.user = null;
        state.loginUserError = null;
        state.isAuthChecked = false;
      })

      .addCase(getOrders.pending, (state) => {
        // state.isAuthChecked = true;
        state.loginUserError = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loginUserError = action.error;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        console.log(state.orders);

        state.loginUserError = null;
        // state.isAuthChecked = false;
      })

      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = true;
        state.loginUserError = false;
        // if(!state.user) refreshToken();
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserError = action.error;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserError = null;
        state.isAuthChecked = false;
      });
  }
});

export const { selectUser, selectIsAuthChecked, selectOrders } =
  userSlice.selectors;
export default userSlice.reducer;
