import { Router } from "express";
import { Genre } from "../entities/Genre";
import { AppDataSource } from "../startup/data-source";
import { Game } from "../entities/Game";
import { Store } from "../entities/Store";
import { ParentPlatform } from "../entities/ParentPlatform";
import { SelectQueryBuilder } from "typeorm";

//interface for response object matching what our rawg-client expects
interface ModifinedGame {
  id: number;
  name: string;
  background_image?: string;
  metacritic?: number;
  parent_platforms: { platform: ParentPlatform }[];
  genres: Genre[];
  stores: Store[];
}

interface Response {
  count: number;
  results: ModifinedGame[];
}

const gameRouter = Router();
const gameRepository = AppDataSource.getRepository(Game);

const addGenreFilter = (queryBuilder: SelectQueryBuilder<Game>, genreSlug: String | undefined) => {
  if (genreSlug) {
    queryBuilder.andWhere("genres.slug = :genreSlug", { genreSlug });
  }
};

gameRouter.get("/", async (req, res) => {

  const genreSlug = req.query.genre ? String(req.query.genre) : undefined;
  const storeId = req.query.store ? Number(req.query.store) : undefined;
  const parentPlatformId = req.query.parent_platforms ? Number(req.query.parent_platforms) : undefined;

  //query builder to get all games with their genres, parent_platforms, and stores
  const queryBuilder = gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.genres", "genres")
    .leftJoinAndSelect("game.parent_platforms", "parent_platforms")
    .leftJoinAndSelect("game.stores", "stores");

  const games = await queryBuilder.getMany(); //execute query

  //modifying the response object to match what our rawg-client expects
  const modifinedGames = games.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms?.map((parent_platform) => ({
      platform: parent_platform,
    })),
  }));

  const response: Response = {
    count: games.length,
    results: modifinedGames,
  };
  res.send(response);
});

export default gameRouter;
