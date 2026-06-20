import express from "express";
import cors from "cors";
import "dotenv/config";
import apiRouter from "./routes/api.router.js";
import { bootstrap } from "./init.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";


// Configurações de CORS
const clientOrigin: string | undefined = process.env.CLIENT_ORIGIN;
if (!clientOrigin) {
    throw new Error(`A url do cliente da API precisa ser definida.`);
}
const corsConfig = {
    origin: clientOrigin
}

const app = express();

app.use(express.json());
app.use(cors(corsConfig));
app.use("/api/v1", apiRouter);
app.use(errorHandler);

await bootstrap();

export default app;