import app from "./app";
import { PORT, HOST } from "./config";

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
