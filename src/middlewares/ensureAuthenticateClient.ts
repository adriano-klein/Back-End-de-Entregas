import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateCliente(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ message: "Token is missing" });
  }

  //TODO: Pegar somente o código
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "2163a209a375cb1073c2786a14903ef4"
    ) as IPayload;
    request.id_client = sub;
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
}
