import {Map, fromJS} from 'immutable';

export const INITIAL_STATE = start();

export function start() {
    return Map({
        player: 1,
        board: fromJS([
            [null, null, null],
            [null, null, null],
            [null, null, null]])
    });
}

export function play(state, move) {
    if (isGameOver(state) || !isValidMove(state, move)) {
        return state;
    }

    const board = state.get('board').toJS();
    board[move[0]][move[1]] = state.get('player');

    const result = getResult(board);

    if (result === 'won') {
        return state.set('winner', state.get('player')).set('board', fromJS(board)).remove('player');
    } else if (result === 'draw') {
        return state.set('draw', true).set('board', fromJS(board)).remove('player');
    } else {
        return state.set('player', nextPlayer(state)).set('board', fromJS(board));
    }
}

function getResult(board) {
    if (isWonByStraight(board) || isWonByDiagonal(board)) {
        return 'won';
    }

    if (isFilled(board)) {
        return 'draw';
    }
}

function isWonByStraight(board) {
    for (let i = 0; i <= 2; i++) {
        if (isSameAndTruthy(board[i][0], board[i][1], board[i][2]) ||
            isSameAndTruthy(board[0][i], board[1][i], board[2][i])) {
            return true;
        }
    }
    return false;
}

function isWonByDiagonal(board) {
    return (isSameAndTruthy(board[0][0], board[1][1], board[2][2]) || isSameAndTruthy(board[0][2], board[1][1], board[2][0]));
}

function isFilled(board) {
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            if (board[i][j] === null) {
                return false;
            }
        }
    }
    return true;
}

function isSameAndTruthy(x, y, z) {
    return (x && y && z &&
    x === y && (y === z));
}

function nextPlayer(state) {
    return (state.get('player') === 1) ? 2 : 1;
}

function isGameOver(state){
    return !!(state.get('winner') || state.get('draw'));

}

function isValidMove(state, move) {
    if (move && move.length === 2 &&
        isBetween0And2(move[0]) && isBetween0And2(move[1])) {
        const board = state.get('board').toJS();
        return !board[move[0]][move[1]];
    }

    return false;
}

function isBetween0And2(number) {
    return number >= 0 && number <= 2;
}