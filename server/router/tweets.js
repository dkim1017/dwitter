import express from 'express';
import 'express-async-error';
import * as tweetController from '../controller/tweets.js';
import { body } from 'express-validator';
import { validator } from '../middleware/validator.js'
import { isAuth } from '../middleware/auth.js'
import { isAuthen } from '../middleware/authen.js'

const router = express.Router();

//GET /tweets
//GET /tweets?username=:username
router.get('/', isAuth, tweetController.getAllTweetsController)

//GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweetsById)

//POST /tweets
router.post('/',
  body('text').isLength({min: 1}),
  validator,
  isAuth,
  tweetController.postTweet)

//PUT /tweets/:id
router.put('/:id', isAuth, tweetController.editTweet)

//DELETE /tweets/:id
router.delete('/:id', isAuth, isAuthen, tweetController.deleteTweet)
export default router;