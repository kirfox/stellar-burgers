import { expect, describe, test } from '@jest/globals';
import feedsSlice, { fetchOrders, initialState } from './feedsSlice';

describe('feedSlice', () => {
  const mockInitialtState = {
    ...initialState,
    orders: [
      {
        _id: '66ac8ee4119d45001b4fd080',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0940'
        ],
        status: 'done',
        name: 'Space флюоресцентный spicy метеоритный бургер',
        createdAt: '2024-08-02T07:46:44.238Z',
        updatedAt: '2024-08-02T07:46:44.680Z',
        number: 22222
      },
      {
        _id: '66ac9120119d45001b4fd085',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Антарианский space астероидный краторный альфа-сахаридный экзо-плантаго spicy бургер',
        createdAt: '2024-08-02T07:56:16.767Z',
        updatedAt: '2024-08-02T07:56:17.228Z',
        number: 33333
      },
      {
        _id: '66ac8eca119d45001b4fd07e',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0942'
        ],
        status: 'done',
        name: 'Space флюоресцентный spicy антарианский бургер',
        createdAt: '2024-08-02T07:46:18.047Z',
        updatedAt: '2024-08-02T07:46:18.463Z',
        number: 11111
      }
    ],
    total: 10000,
    totalToday: 123
  };

  describe('fetchGetAllOreders', () => {
    test('fetchGetAllOreders:fulfilled', () => {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: {
          orders: mockInitialtState.orders,
          total: mockInitialtState.total,
          totalToday: mockInitialtState.totalToday
        }
      };
      const expectedResult = {
        ...initialState,
        orders: mockInitialtState.orders,
        feed: {
          total: mockInitialtState.total,
          totalToday: mockInitialtState.totalToday
        }
      };
      const newState = feedsSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
  });
});
