import { NextResponse } from "next/server";
import { stripe } from "@/app/_lib/stripe";
import { sql } from "@/app/_lib/db";
import { userFromBearer } from "@/app/_lib/auth-server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const user = await userFromBearer(req);
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const rows = await sql<{ stripe_customer_id: string | null }[]>`
    select o.stripe_customer_id
      from public.organizations o
      join public.organization_members m on m.org_id = o.id
     where m.auth_user_id = ${user.id}::uuid
       and m.role = 'admin'
     limit 1
  `;
  const customerId = rows[0]?.stripe_customer_id;
  if (!customerId) {
    return NextResponse.json({ error: "no_customer" }, { status: 404 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/billing`,
    locale: "es-419",
  });

  return NextResponse.json({ url: session.url });
}
