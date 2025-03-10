import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { ParentPlatform } from "../entities/ParentPlatform";

interface Response {
  count: number;
  results: ParentPlatform[];
}

const parentPlatformRouter = Router();
const parentPlatformRepository = AppDataSource.getRepository(ParentPlatform);

parentPlatformRouter.get("/", async (req, res) => {
  const parentPlatforms = await parentPlatformRepository.find();
  const response: Response = {
    count: parentPlatforms.length,
    results: parentPlatforms,
  };
  res.send(response);
});

export default parentPlatformRouter;
