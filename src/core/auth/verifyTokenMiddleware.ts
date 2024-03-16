import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import config from "../../infra/config";

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: "Access denied. Not token provided."})
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }

    res.locals.user = decoded
    next()
  }) 
}