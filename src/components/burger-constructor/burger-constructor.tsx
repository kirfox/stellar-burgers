import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  makeOrder,
  resetOrder,
  selectConstructorItems,
  selectOrderModalData,
  selectOrderRequest
} from '../../slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { selectUser } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if(!constructorItems.bun || orderRequest) return;

    if(!user) {
      navigate('/login');
      return;
    }

    const order = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    order.push(constructorItems.bun._id);
    dispatch(makeOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
