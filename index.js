import express from "express";
import usersRouter from "./routers/userRouter.js";
import "./db/index.js";
import errorHandler from "./middleware/errorHandler.js";
import productRouter from "./routers/productRouter.js";
import categoryRouter from "./routers/categoryRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/*splat", (req, res) => {
  throw new Error("Page not found", { cause: 404 });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
