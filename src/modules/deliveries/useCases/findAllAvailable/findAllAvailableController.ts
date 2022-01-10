import { Request, Response } from "express";
import { FindAllAvailableUSeCase } from "./FindAllAvailableUSeCase";

export class FindAllAvailableController {
  async handle(request: Request, response: Response) {
    const findAllWithoutEndDateUseCase = new FindAllAvailableUSeCase();
    const deliveries = await findAllWithoutEndDateUseCase.execute();

    return response.json(deliveries);
  }
}
