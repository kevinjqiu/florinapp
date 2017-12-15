import * as express from "express";
import routes from "./routes";

const app = express();
routes(app);

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
  console.log(`Server listening on ${app.get("port")}`);
});

export default app;