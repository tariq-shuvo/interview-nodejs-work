import jsonwebtoken from 'jsonwebtoken';
import globalConfig from '../../config/global.config'
import { RequestHandler } from 'express';
import UserModel from '../../models/schema/User';

export const authUser:RequestHandler = async(req:any, res, next) => {
    // Receive token as header
  const token = req.header('x-auth-token');

  // Check exist token or not
  if (!token) {
    return res.status(401).json({
      errors: [{msg: 'No token, authorization denied'}]
    })
  }

  const userInfo:any = await UserModel.findOne({token}).select("-pasword -token -create");

  if(!userInfo){
    return res.status(401).json({
      errors: [
        {
          msg: 'Authorization not valid'
        }
      ]
    })
  }

  // Check  the authorization
  try {
    const decode:any = jsonwebtoken.verify(token, globalConfig.tokenJWTSecrect);
    req.user = userInfo;
    next();
  } catch (err) {
    userInfo.token = null;
    await userInfo.save();

    return res.status(401).json({
      errors: [
        {
          msg: 'Authorization not valid'
        }
      ]
    })
  }
}