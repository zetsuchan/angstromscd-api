import { log } from "./logger"

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  backoff = 500,
): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }
      return res
    } catch (err) {
      log("error", `Request attempt ${attempt} failed: ${(err as Error).message}`)
      if (attempt === retries) {
        throw err
      }
      await new Promise((r) => setTimeout(r, backoff * attempt))
    }
  }
  throw new Error("Unreachable")
}
