import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { ProductRoutes } from "./app/modules/Products/product.route";
// import { OrderRoutes } from "./app/modules/orders/order.route";
const port = 3000;

// parsers
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173'],
    credentials: true,
  }),
);

const getController = (req: Request, res: Response) => {
  res.send('this is nursary server ');
};
app.get('/', getController);

// application routes
app.use('/api/v4', ProductRoutes);
// app.use('/api/v4', OrderRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not found!',
  });
});


  export default app;
