import express from 'express'
import http from 'http';
import { ServerSocket } from './socket';
import logger from './middlewares/logger'


const PORT = process.env.PORT || 3300

const app = express()
const httpServer = http.createServer(app);

/** Start Socket */
new ServerSocket(httpServer);


// app.use(logger)
app.use((req, res, next) => {
  console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
      console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
  });

  next();
});

// JSON Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }

  next()
})

app.get('/ping', (req, res, next) => {
  return res.status(200).json({ hello: 'world!' });
});

/** Socket Information */
app.get('/status', (req, res, next) => {
  return res.status(200).json({ users: ServerSocket.instance.users });
});

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
      message: error.message
  });
});


async function startServer() {
  console.log('Top Trump server!')

  httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

startServer()

export default app

