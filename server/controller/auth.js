import * as userRepository from '../data/users.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js'

const jwtSecretKey = config.jwt.secretKey;
const jwtExpiresInDays = config.jwt.expiresInDays;
const bcryptSaltRounds = config.bcrypt.bcryptSaltRounds;

export async function postSignup (req, res) {
  const { username, password, name, email, url } = req.body
  const found = await userRepository.findByUsername(username);
  if(found) {
    return res.status(409).json({ message: `${username} already exists`})
  }
  const hash = bcrypt.hashSync(password, bcryptSaltRounds);
  const token = createJwtToken(username);
  const user = await userRepository.createUser(username, hash, name, email, url)
  res.status(201).json({ user, token })
}

export async function postLogin (req, res) {
  const { username, password } = req.body
  console.log("server controller auth username/pw: ", username, password)
  const userHashPw = await userRepository.loginUser(username)
  const token = createJwtToken(username);
  if(userHashPw === "fail") {
    res.status(404).send("No User Found")
  } else {
    if(bcrypt.compareSync(password, userHashPw)) {
      res.status(201).json({ username, token })
    } else {
      res.status(404).send("Incorrect Password")
    }
  }
}

export async function getMe (req, res) {
  // //isAuth 확인 통과
  // const username = await userRepository.findByUsername(req.userUsername);
  // // if(!username) {
  // //   return res.status(404).json({message:"User Not Found"})
  // // }
  // res.status(200).json({ token: req.token, username })
  res.sendStatus(200)
}

function createJwtToken(username) {
  return jwt.sign({
    username
  }, jwtSecretKey, { expiresIn: jwtExpiresInDays});
}