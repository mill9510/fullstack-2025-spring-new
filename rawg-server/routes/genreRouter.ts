import { Router } from "express";
import { Genre } from "../entities/Genre";
import { AppDataSource } from "../startup/data-source";

//interface for response object
interface Response {
  count: number;
  results: Genre[];
}

const genreRouter = Router();
//repository object for CRUD operations on Genre table
const genreRepository = AppDataSource.getRepository(Genre);

//GET all genres
genreRouter.get("/", async (req, res) => {
  const genres = await genreRepository.find();
  const response: Response = {
    count: genres.length,
    results: genres,
  };
  res.send(response);
});

export default genreRouter;
