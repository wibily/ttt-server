import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map({
      player: 1,
      winner: null,
      board: fromJS([
        [null, null, null],
        [null, null, null],
        [null, null, null]])
    }));

    store.dispatch({
      type: 'PLAY',
      move: [1, 1]
    });
    expect(store.getState()).to.equal(Map({
      player: 2,
      winner: null,
      board: fromJS([
        [null, null, null],
        [null, 1, null],
        [null, null, null]])
    }));
  });

});
