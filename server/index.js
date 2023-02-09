import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-error';
import { config } from './config.js'
import { Server } from 'socket.io'
import { db } from './db/database.js'

import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js'

const app = express();

//app.use 는 순차적 진행
app.use(express.json()); // REST API -> Body
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false })); // HTML Form -> Body parsing

app.use('/tweets', tweetsRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
  res.sendStatus(404);
})
app.use((error, req, res, next) => {
  console.error("--- ERROR ERROR ERROR ---: ", error);
  res.sendStatus(500);
})

console.log("SERVER ENV PORT: ", config.host.port)
db.getConnection().then(connection => console.log(connection))
const server = app.listen(config.host.port)

const socketIO = new Server(server, {
  cors: {
    origin: '*'
  }
})

socketIO.on('connection', (socket) => {
  console.log('Client is here!');
  socketIO.emit('dwitter', 'Hello')
  socketIO.emit('dwitter', 'Hello')
})

socketIO.on('dwitter', (msg) => {
  console.log('SERVER DWITTER: ', msg)
})