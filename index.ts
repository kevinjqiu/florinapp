import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(bodyParser.json());

routes(app);

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
  console.log(`Server listening on ${app.get("port")}`);
});

export default app;