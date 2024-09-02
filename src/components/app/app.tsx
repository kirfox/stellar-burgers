import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { fetchIngridients } from '../../slices/ingredientsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsApi, refreshToken } from '@api';
import { ProtectedRoute } from '../protected-route/protected-route';
import { fetchOrders } from '../../slices/feedsSlice';
import { getUser } from '../../slices/userSlice';

const App = () => {
  const navigate = useNavigate();
  const onClose = () => navigate(-1);
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngridients());
    dispatch(fetchOrders());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        {/* <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        /> */}

        <Route path='/reset-password' element={<ResetPassword />} />
        {/* <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route path='/profile' element={<Profile />} /> */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
      </Routes>

      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal title='Надо отображать номер заказа' onClose={onClose}>
              {' '}
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={onClose}>
              {' '}
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute onlyUnAuth>
              <Modal title='Информаци по заказу' onClose={onClose}>
                {' '}
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
            // <Modal title='OrdersInfo' onClose={onClose}>
            //   {' '}
            //   <OrderInfo />
            // </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
