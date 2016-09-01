import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


export function startServer(store) {
    let app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());

    let players = 0;

    app.get('/game', (req, res)=> {
        if(players < 2 && !req.cookies.player){
            res.cookie('player', ++players);
            console.log('Player ' + players +' joined');
        }
        res.send(store.getState().toJS());
    });

    app.post('/game/move', (req, res) => {
        store.dispatch(req.body.move);
        res.send(store.getState().toJS());
    });

    app.get('/game/restart', (req, res) => {
        players = 0;
        res.clearCookie('player');

        store.dispatch(({
            type: 'START'
        }));
        res.redirect('/game');
    });

    app.listen(3000, function () {
        console.log('Tic tac toe server listening on port 3000');
    });
}