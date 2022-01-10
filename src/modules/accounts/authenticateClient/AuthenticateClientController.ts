import { Request, response, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;
    const authenticateClientUseCase = new AuthenticateClientUseCase();
    const result = await authenticateClientUseCase.execute({
      username,
      password,
    });

    return response.json({ result });
  }
}
