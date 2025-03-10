import express from "express";
import genreRouter from "../routes/genreRouter";
import storeRouter from "../routes/StoreRouter";
import parentPlatformRouter from "../routes/parentPlatformRouter";
import gameRouter from "../routes/GameRouter";

//assing endpoints to the routers
const setupRouters = (app: express.Application) => {
  app.use("/genres", genreRouter);
  app.use("/stores", storeRouter);
  app.use("/platforms/lists/parents", parentPlatformRouter);
  app.use("/games", gameRouter);
};

export default setupRouters;
