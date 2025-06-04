export type LogLevel = "info" | "error";

export function log(level: LogLevel, message: string, meta?: unknown) {
const timestamp = new Date().toISOString();
const text = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
if (meta) {
console[level === "info" ? "log" : "error"](text, meta);
} else {
console[level === "info" ? "log" : "error"](text);
}
}
