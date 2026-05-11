import "server-only";
import { createClient } from "@insforge/sdk";

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL!;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!;

export type ServerUser = { id: string; email: string };

/**
 * Validate a Bearer access token by asking Insforge who it belongs to.
 * Returns null when missing or invalid. Use this at the top of every
 * server route that mutates per-user state.
 */
export async function userFromBearer(req: Request): Promise<ServerUser | null> {
  const header = req.headers.get("authorization");
  if (!header || !header.toLowerCase().startsWith("bearer ")) return null;
  const token = header.slice(7).trim();
  if (!token) return null;

  const sdk = createClient({
    baseUrl,
    anonKey,
    isServerMode: true,
    edgeFunctionToken: token,
  });

  const { data, error } = await sdk.auth.getCurrentUser();
  if (error || !data?.user) return null;

  const u = data.user as { id?: string; email?: string };
  if (!u.id || !u.email) return null;
  return { id: u.id, email: u.email };
}
