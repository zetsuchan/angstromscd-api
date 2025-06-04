import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import routes from "./routes";
import { log } from "./lib/logger";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
return c.json({ message: "AngstromSCD API" });
});

app.route("/", routes);

const port = 3001;
log("info", `Server is running on port ${port}`);

serve({
fetch: app.fetch,
port,
});
