import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {emptyGrid} from './test_methods';

import {start, play} from '../src/core';

describe('application logic', () => {

  describe('start', () => {

    it('initialises an empty state', () => {
      const nextState = start();
      expect(nextState).to.equal(Map({
        player: 1,
        winner: null,
        board: fromJS([
          [null, null, null],
          [null, null, null],
          [null, null, null]])
      }));
    });
  });

  describe('move', () => {

    it('sets the correct square for player 1', () => {
      const state = Map({
        player: 1,
        winner: null,
        board: emptyGrid()
      });

      const nextState = play(state, [1, 1]);

      expect(nextState).to.equal(Map({
        player: 2,
        winner: null,
        board: fromJS([
          [null, null, null],
          [null, 1, null],
          [null, null, null]])
      }));

    });

    it('sets the correct square for player 2', () => {
      const state = Map({
        player: 2,
        board: emptyGrid()
      });

      const nextState = play(state, [1, 1]);

      expect(nextState).to.equal(Map({
        player: 1,
        board: fromJS([
          [null, null, null],
          [null, 2, null],
          [null, null, null]])
      }));

    });

    it('rejects moves outside of grid', () => {
      const state = Map({
        player: 1,
        winner: null,
        board: emptyGrid()
      });

      const nextState = play(state, [3, 3]);

      expect(nextState).to.equal(state);
    });

    it('rejects moves that have already been set', () => {
      const state = Map({
        player: 2,
        winner: null,
        board: fromJS([
          [null, null, null],
          [null, null, 1],
          [null, null, null]
        ])
      });

      const nextState = play(state, [1, 2]);

      expect(nextState).to.equal(state);
    });

    it('shows the result when the game is won by diagonal', () => {
      const state = Map({
        player: 1,
        winner: null,
        board: fromJS([
          [1, 2, 2],
          [null, 1, null],
          [null, null, null]
        ])
      });

      const nextState = play(state, [2, 2]);

      expect(nextState).to.equal(Map({
        player: null,
        winner: 1,
        board: fromJS([
          [1, 2, 2],
          [null, 1, null],
          [null, null, 1]
        ])
      }));

    });

    it('shows the result when the game is won by horizontal', () => {
      const state = Map({
        player: 2,
        winner: null,
        board: fromJS([
          [null, null, null],
          [1, 1, null],
          [2, 2, null]
        ])
      });

      const nextState = play(state, [2, 2]);

      expect(nextState).to.equal(Map({
        player: null,
        winner: 2,
        board: fromJS([
          [null, null, null],
          [1, 1, null],
          [2, 2, 2]
        ])
      }));

    });

    it('shows the result when the game is won by vertical', () => {
      const state = Map({
        player: 1,
        winner: null,
        board: fromJS([
          [1, 2, 1],
          [1, 2, 1],
          [null, null, null]
        ])
      });

      const nextState = play(state, [2, 0]);

      expect(nextState).to.equal(Map({
        player: null,
        winner: 1,
        board: fromJS([
          [1, 2, 1],
          [1, 2, 1],
          [1, null, null]
        ])
      }));
    });

    it('shows the result when the game is won by combination', () => {
      const state = Map({
        player: 1,
        winner: null,
        board: fromJS([
          [1, 2, 1],
          [1, 1, 2],
          [null, null, null]
        ])
      });

      const nextState = play(state, [2, 0]);

      expect(nextState).to.equal(Map({
        player: null,
        winner: 1,
        board: fromJS([
          [1, 2, 1],
          [1, 1, 2],
          [1, null, null]
        ])
      }));
    });

    it('shows the result when it is a tie', () => {
      const state = Map({
        player: 1,
        winner: null,
        board: fromJS([
          [1, 2, 1],
          [1, null, 2],
          [2, 1, 2]
        ])
      });

      const nextState = play(state, [1, 1]);

      expect(nextState).to.equal(Map({
        player: null,
        winner: 'draw',
        board: fromJS([
          [1, 2, 1],
          [1, 1, 2],
          [2, 1, 2]
        ])
      }));
    });

    it('should not continue after the game is over', () => {
      const state = Map({
        player: null,
        winner: 2,
        board: fromJS([
          [null, 2, 1],
          [1, 2, 1],
          [2, 2, null]
        ])
      });

      const nextState = play(state, [0, 0]);

      expect(nextState).to.equal(state);
    });
  })

});