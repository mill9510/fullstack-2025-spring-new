import { Router } from "express";
import { Store } from "../entities/Store";
import { AppDataSource } from "../startup/data-source";

interface Response {
  count: number;
  results: Store[];
}

const storeRouter = Router();
const storeRepository = AppDataSource.getRepository(Store);

storeRouter.get("/", async (req, res) => {
  const stores = await storeRepository.find();
  const response: Response = {
    count: stores.length,
    results: stores,
  };
  res.send(response);
});

export default storeRouter;
