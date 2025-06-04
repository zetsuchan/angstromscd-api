import { Hono } from "hono";
import chat from "./chat";

const routes = new Hono();

routes.route("/api", chat);

export default routes;
