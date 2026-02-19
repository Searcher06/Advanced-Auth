import http from "http";
import app from "./app";
import dotenv from "dotenv";
import { connectToDB } from "./config/db";

dotenv.config();

const startServer = async () => {
  await connectToDB();

  const server = http.createServer(app);

  server.listen(process.env.PORT, () => {
    console.log(`Server is up and running on port: ${process.env.PORT}`);
  });
};

startServer().catch((err) => {
  console.error(`Error while starting server`, err);
  process.exit(1);
});
