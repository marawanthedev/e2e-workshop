import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { apiRouter } from "./routes/index.js";

const app = express();

app.use(cors({ origin: config.clientOrigin }));

app.use("/api", apiRouter);

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
