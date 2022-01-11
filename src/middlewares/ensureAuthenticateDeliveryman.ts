import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //TODO: Pegar o token fornecido pelo header
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ message: "Token missing!" });
  }

  //TODO: Pegar somente o código

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "2163a209a375cb1073c2786a14903ef44"
    ) as IPayload;
    request.id_deliveryman = sub;
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
}
