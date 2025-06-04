import { Hono } from "hono"
import { cors } from "hono/cors"
import { serve } from "@hono/node-server"
import { router } from "./routes/index"
import { log } from "./lib/logger"

const app = new Hono()

app.use("/*", cors())

app.get("/", (c) => c.json({ message: "AngstromSCD API" }))

app.route("/", router)

const port = Number(process.env.PORT ?? 3001)
log("info", `Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
