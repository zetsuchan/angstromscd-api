import { Hono } from "hono";
import { z } from "zod";
import { generateResponse } from "../services/baml";
import { searchDocuments } from "../services/vector";
import { log } from "../lib/logger";

const router = new Hono();

const schema = z.object({
message: z.string(),
});

router.post("/chat", async (c) => {
const body = await c.req.json().catch(() => null);
const parsed = schema.safeParse(body);
if (!parsed.success) {
return c.json({ error: "Invalid request body" }, 400);
}

const { message } = parsed.data;
try {
log("info", "Chat request received");
const documents = await searchDocuments(message);
const response = await generateResponse(message, documents);
return c.json({ response, documents });
} catch (err) {
log("error", "Chat flow failed", err);
return c.json({ error: "Failed to process request" }, 500);
}
});

export default router;
