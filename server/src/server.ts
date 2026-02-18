import { startApp } from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

startApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
