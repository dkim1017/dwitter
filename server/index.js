import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-error';
import { config } from './config.js'
import { connectDB } from './db/database.js'

import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js'

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
}
//app.use 는 순차적 진행
app.use(express.json()); // REST API -> Body
app.use(helmet());
app.use(cors(corsOption));
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
connectDB().then(() => {
  console.log(`Server Started... ${new Date()}`);
  app.listen(config.port)
}).catch(error => console.log('error'))
