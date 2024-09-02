import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../slices/userSlice';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () =>
    dispatch(logoutUser())
      .then(() => {
        navigate('/login');
      })
      .catch(({ message }) => console.log(message));

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
