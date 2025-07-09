import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import canvas from "./routes/canvasRoute.js";
import dbConnection from "./config/databse.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
); 
app.use(morgan("dev"));


app.use("/canvas", canvas);
app.use("/", (req, res) => {
  res.send("server running....");
});


const PORT = process.env.PORT;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
