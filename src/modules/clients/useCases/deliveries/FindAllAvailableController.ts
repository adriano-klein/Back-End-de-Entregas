import { FindAllDeliveriesUseCase } from "./FindAllAvailableUseCase";

import { Request, Response } from "express";

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response) {
    const findAllAvailableUseCase = new FindAllDeliveriesUseCase();
    const id_client = request.id_client;
    console.log(id_client);
    const deliveries = await findAllAvailableUseCase.execute({ id_client });

    return response.json(deliveries);
  }
}
