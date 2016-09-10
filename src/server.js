import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


export function startServer(store) {
  let app = express();
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

  app.get('/game', (req, res)=> {
    res.send(store.getState().toJS());
  });

  app.post('/game/move', (req, res) => {
    store.dispatch({
      type: 'PLAY',
      move: req.body.move
    });
    res.send(store.getState().toJS());
  });

  app.get('/game/restart', (req, res) => {
    store.dispatch(({
      type: 'START'
    }));
    res.send(store.getState().toJS());
  });

  app.listen(3001, function () {
    console.log('Tic tac toe server listening on port 3001');
  });
}