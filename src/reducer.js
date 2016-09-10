import {start, play, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'START':
      return start();
    case 'PLAY':
      return play(state, action.move);
  }
  return state;
}
