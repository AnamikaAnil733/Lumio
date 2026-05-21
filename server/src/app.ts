import express from "express";
import cors from  "cors";
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

app.use(errorHandler);


export default app;