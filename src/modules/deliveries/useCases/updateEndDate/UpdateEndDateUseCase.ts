import { prisma } from "../../../../database/prismaClient";

interface IUpdateEndDate {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateEndDate) {
    await prisma.deliveries.updateMany({
      where: { id: id_delivery, id_deliveryman },
      data: { end_at: new Date() },
    });

    const updated_delivery = await prisma.deliveries.findFirst({
      where: { id: id_delivery },
    });

    return updated_delivery;
  }
}
