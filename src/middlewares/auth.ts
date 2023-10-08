import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface UserRequest extends Request {
  user: string;
}

function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  } else {
    if (typeof process.env.TOKEN_SECRET === 'string') {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        if (typeof user === 'string') {
          (req as UserRequest).user = user;

          next();
        } else {
          new Error('Required a string as token payload');
        }
      });
    } else {
      new Error('TOKEN_SECRET is missing in .env');
    }
  }
}

export default auth;
