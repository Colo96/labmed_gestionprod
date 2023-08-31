import express from "express";
import morgan from "morgan";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";

const app = express();

app.set("port", 4000);

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

export default app;
