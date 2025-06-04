import { fetchWithRetry } from "../lib/http";
import { log } from "../lib/logger";

const baseUrl = process.env.VECTOR_SERVICE_URL ?? "http://localhost:3003";

export async function searchDocuments(query: string) {
const url = `${baseUrl}/search`;
try {
const res = await fetchWithRetry(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ query }),
});
const data = await res.json();
log("info", "Vector search successful");
return data;
} catch (err) {
log("error", "Vector search failed", err);
throw err;
}
}
