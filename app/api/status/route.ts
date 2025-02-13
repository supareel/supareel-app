import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request) {
  const kv = getRequestContext().env.SUPAREEL_KV;
  await kv.put("status", "Supareel Frontend API working");
  const status = await kv.get("status");

  return new Response(status);
}