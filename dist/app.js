"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/Products/product.route");
// import { OrderRoutes } from "./app/modules/orders/order.route";
const port = 3000;
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://onlinenursarybook.netlify.app'
    ],
    credentials: true,
}));
const getController = (req, res) => {
    res.send('this is nursary server ');
};
app.get('/', getController);
// application routes
app.use('/api/v4', product_route_1.ProductRoutes);
// app.use('/api/v4', OrderRoutes);
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route is not found!',
    });
});
exports.default = app;
