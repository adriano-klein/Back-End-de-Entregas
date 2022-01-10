import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateCliente {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateCliente) {
    //TODO: Check if username exists
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new Error("Incorrect Username or password");
    }

    //TODO: check if password match
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Password does not match");
    }

    //TODO: Generate token
    const token = sign({ username }, "2163a209a375cb1073c2786a14903ef4", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
