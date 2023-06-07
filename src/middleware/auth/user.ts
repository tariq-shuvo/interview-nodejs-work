import jsonwebtoken from 'jsonwebtoken';
import globalConfig from '../../config/global.config'
import { RequestHandler } from 'express';

export const authUser:RequestHandler = (req:any, res, next) => {
    // Receive token as header
  const token = req.header('x-auth-token')

  // Check exist token or not
  if (!token) {
    return res.status(401).json({
      errors: [{msg: 'No token, authorization denied'}]
    })
  }

  // Check  the authorization
  try {
    const decode:any = jsonwebtoken.verify(token, globalConfig.tokenJWTSecrect)

    req.user = decode

    next()
  } catch (err) {
    return res.status(401).json({
      errors: [
        {
          msg: 'Authorization not valid'
        }
      ]
    })
  }
}