import { expect, describe } from '@jest/globals';
import userSlice, {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateUser,
  initialState
} from './userSlice';

describe('userSlice', () => {
  const userData = {
    email: 'testqwewqe@yandex.ru',
    name: 'kirfox'
  };

  describe('registerUser', () => {
    test('registerUser:pending', () => {
      const action = {
        type: registerUser.pending.type
      };
      const expectedResult = {
        ...initialState,
        isAuthChecked: true,
        loginUserError: null
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });

    test('registerUser:rejected', () => {
      const action = {
        type: registerUser.rejected.type
      };
      const expectedResult = {
        ...initialState,
        loginUserError: undefined
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });

    test('registerUser:fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: {
          user: userData
        }
      };
      const expectedResult = {
        ...initialState,
        user: userData,
        isAuthChecked: true
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('loginUser', () => {
    test('loginUser:pending', () => {
      const action = {
        type: loginUser.pending.type
      };
      const expectedResult = {
        ...initialState,
        isAuthChecked: true
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
    test('loginUser:fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: {
          user: userData
        }
      };
      const expectedResult = {
        ...initialState,
        isAuthChecked: true,
        user: userData
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
    test('loginUser:rejected', () => {
      const action = {
        type: loginUser.rejected.type
      };
      const expectedResult = {
        ...initialState,
        isAuthChecked: false,
        loginUserError: undefined
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('getUser', () => {
    test('getUser:pending', () => {
      const action = {
        type: getUser.pending.type
      };
      const expectedResult = {
        ...initialState,
        isAuthChecked: true
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
    test('getUser:fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: {
          user: userData
        }
      };
      const expectedResult = {
        ...initialState,
        isAuthChecked: true,
        user: userData
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
    test('getUser:rejected', () => {
      const action = {
        type: getUser.rejected.type
      };
      const expectedResult = {
        ...initialState,
        loginUserError: undefined
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('logoutUser', () => {
    test('logoutUser:fulfilled', () => {
      const action = {
        type: logoutUser.fulfilled.type
      };
      const expectedResult = {
        ...initialState,
        user: null,
        isAuthChecked: true
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
  });

  describe('updateUser', () => {
    test('updateUser:pending', () => {
      const action = {
        type: updateUser.pending.type
      };
      const expectedResult = {
        ...initialState,
        user: null,
        isAuthChecked: true
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
    test('updateUser:fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: userData }
      };
      const expectedResult = {
        ...initialState,
        user: userData
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
    test('updateUser:rejected', () => {
      const action = {
        type: updateUser.rejected.type
      };
      const expectedResult = {
        ...initialState,
        loginUserError: undefined
      };
      const newState = userSlice(initialState, action);
      expect(newState).toEqual(expectedResult);
    });
  });
});
