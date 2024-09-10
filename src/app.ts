import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());


app.get("/", (req: Request, res: Response) => {
    res.send("this is nursary server");
  });


  export default app;
