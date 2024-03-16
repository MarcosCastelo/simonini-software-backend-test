import { Request, Response, NextFunction } from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err)

  const message = err.message || 'Something went wrong on the server.'

  res.status(500).json({ message });
}

export default errorHandler