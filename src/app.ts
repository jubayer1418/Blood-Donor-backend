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
app.use(globalErrorHandler);
app.use(notFound);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
export default app;
