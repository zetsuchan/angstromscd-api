import { fetchWithRetry } from "../lib/http"
import { log } from "../lib/logger"

const baseUrl = process.env.BAML_SERVICE_URL ?? "http://localhost:3002"

export async function generateResponse(message: string, context: unknown) {
  const url = `${baseUrl}/generate`
  try {
    const res = await fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context }),
    })
    const data = await res.json()
    log("info", "BAML response received")
    return data
  } catch (err) {
    log("error", "BAML request failed", err)
    throw err
  }
}
