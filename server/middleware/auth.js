import jwt from 'jsonwebtoken';
import * as userRepository from '../data/users.js'
import { config } from '../config.js'

const AUTH_ERROR = { message: 'Authentication Error'};

//모든 요청에 대해서 헤더에 요청이 있는지, 있다면 검증된 요청인지
export function isAuth(req, res, next) {
  const authHeader = req.get('Authorization');
  console.log("isAuth ----- Authorization key: ", authHeader)
  if(!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR)
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    config.jwt.secretKey,
    async (error, decoded) => {
      if(error) {
        console.log("ERROR 1")
        console.log("ERROR 1 DECODED: ", decoded)
        return res.status(401).json(AUTH_ERROR)
      }
      // console.log("DECODED: ", decoded)
      const user = await userRepository.findByUsername(decoded.username)
      if(!user) {
        console.log("ERROR 2")
        return res.status(401).json(AUTH_ERROR)
      }
      req.username = user.username
      // req.token = token
      next()
    }
  )
}