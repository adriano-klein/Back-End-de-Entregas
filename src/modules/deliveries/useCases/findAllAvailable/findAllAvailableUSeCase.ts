import { prisma } from "../../../../database/prismaClient";

export class FindAllAvailableUSeCase {
  async execute() {
    const deliveries = await prisma.deliveries.findMany({
      where: { end_at: null },
    });

    return deliveries;
  }
}
