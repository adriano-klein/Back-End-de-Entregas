import { prisma } from "../../../../database/prismaClient";

interface IFindAll {
  id_client: string;
}

export class FindAllDeliveriesUseCase {
  async execute({ id_client }: IFindAll) {
    const deliveries = await prisma.deliveries.findMany({
      where: { id_client },
    });
    return deliveries;
  }
}
