import { compare } from "bcrypt";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    //TODO: Check if user exists
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliverymanExists) {
      throw new Error("Deliveryman does not exists");
    }

    //TODO: check if password match
    const passwordMatch = await compare(password, deliverymanExists.password);
    if (!passwordMatch) {
      throw new Error("Password does not match");
    }

    //TODO: Generate Token
    const token = sign({ username }, "2163a209a375cb1073c2786a14903ef44", {
      subject: deliverymanExists.id,
      expiresIn: "1d",
    });

    return token;
  }
}
