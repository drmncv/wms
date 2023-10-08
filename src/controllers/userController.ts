import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { validateOrReject, IsNotEmpty } from 'class-validator';
import bcrypt from 'bcrypt';

export class UserCredentials {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const userCredentials = new UserCredentials();
    userCredentials.username = username;
    userCredentials.password = password;

    await validateOrReject(userCredentials);

    let user;

    try {
      user = await User.find(userCredentials.username);

      if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
      }

      bcrypt.compare(userCredentials.password, user.password, (err, result) => {
        if (result) {
          if (!process.env.TOKEN_SECRET) {
            console.log('TOKEN_SECRET is missing in .env');
            res.sendStatus(500);
          } else {
            const token = jwt.sign(
              { username: userCredentials.username },
              process.env.TOKEN_SECRET,
              {
                expiresIn: '12h',
              }
            );
            res.status(200).json({ success: true, token });
          }
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);
