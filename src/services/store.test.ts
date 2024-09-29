import store, { rootReducer } from './store';
import { expect, describe, test } from '@jest/globals';

describe('rootReducer', () => {
  test('rootReducer:UNKNOWN_ACTION', () => {
    const anotherState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(anotherState);
  });
});
