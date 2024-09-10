import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { ProductRoutes } from "./app/modules/Products/product.route";
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());


// application routes
app.use('/api', ProductRoutes);



app.get("/", (req: Request, res: Response) => {
    res.send("this is nursary server");
  });


  export default app;
