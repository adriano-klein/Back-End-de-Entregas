import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    //TODO: validar se o cliente existe no banco
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (clientExists) {
      throw new Error("Client already exists");
    }

    //TODO:Criptografar a senha do cliente
    const hashPassword = await hash(password, 10);

    //TODO:Salvar o novo cliente
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}
