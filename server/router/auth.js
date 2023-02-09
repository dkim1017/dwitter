import express from 'express';
import 'express-async-error';
import * as authController from '../controller/auth.js';
import { body } from 'express-validator';
import { validator } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js'

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage("username should be at least 5 characters"),
  body('password')
    .trim()
    .isLength({ min:5 })
    .withMessage("password should be at least 5 characters"),
  validator
];

const validateSignUp = [
  ...validateCredential,
  body('name').notEmpty().withMessage("name is missing"),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email"),
  body('url')
    .isURL()
    .withMessage("Invalid URL")
    .optional({ nullable: true, checkFalsy: true }),
  validator
]

const router = express.Router();

//POST: Login
router.post('/login', validateCredential, authController.postLogin)
router.post('/signup', validateSignUp, authController.postSignup)
router.get('/me', isAuth, authController.getMe)

export default router;