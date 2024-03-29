import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middleware/globarErrorHandle";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
