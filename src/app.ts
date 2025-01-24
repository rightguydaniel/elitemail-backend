import express, {Request, Response} from "express";
import cors from "cors";
import { database } from "./config/database/database";
import router from "./routes/routes.routes";
import logger from "morgan";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.get("/", (request: Request, response: Response) => {
  response.status(200).json({message:"This is EliteMail"});
});
app.use("/v1", router);

const PORT = process.env.PORT;
database.sync({ force: false }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
