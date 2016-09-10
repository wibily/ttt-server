import {fromJS} from 'immutable';


export function emptyGrid() {
  return fromJS([
    [null, null, null],
    [null, null, null],
    [null, null, null]]);
}