import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { Store } from "./entities/Store";
import { ParentPlatform } from "./entities/ParentPlatform";
import { GameOriginal } from "./entities/GameOriginal";

const connectionsString = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "mysql",
  url: connectionsString,
  synchronize: true, // Set to false in production and use migrations instead
  logging: false,
  entities: [Game, GameOriginal, Genre, Store, ParentPlatform],
  migrations: [],
  subscribers: [],
});
