import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUser } from '../../slices/userSlice';
import { Preloader } from '@ui';
import { Login } from '@pages';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector(selectUser); // userDataSelector — селектор получения пользователя из store

  // if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
  //    return <Preloader />;
  // }
  console.log(user);

  if (!onlyUnAuth && !user) {
    // если пользователя в хранилище нет, то делаем редирект
    console.log(111);
    return <Navigate replace to='/login' />;
  }
  return children;
};
