import express from 'express';
import bodyParser from 'body-parser';


export function startServer(store) {
    let app = express();
    app.use(bodyParser.json());

    app.get('/game', (req, res)=> {
        res.send(store.getState().toJS());
    });

    app.post('/game/move', (req, res) => {
        store.dispatch(req.body.move);
        res.send(store.getState().toJS());
    });

    app.put('game/restart', (req, res) => {
        store.dispatch(({
            type: 'START'
        }));
        res.send(store.getState().toJS());
    });

    app.listen(3000, function () {
        console.log('Tic tac toe server listening on port 3000');
    });
}