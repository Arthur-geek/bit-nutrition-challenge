import { NextResponse } from "next/server";

interface ApplicationPayload {
  fname: string;
  femail: string;
  ffiliere: string;
  fyear: string;
  fphone: string;
  fmotiv: string;
}

const REQUIRED_FIELDS: (keyof ApplicationPayload)[] = [
  "fname",
  "femail",
  "ffiliere",
  "fyear",
  "fphone",
  "fmotiv",
];

export async function POST(request: Request) {
  let data: Partial<ApplicationPayload>;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((key) => !data[key]?.toString().trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // TODO: persist the application for real. Common options:
  // - Send a notification email (Resend, SendGrid, Postmark)
  // - Write to a database (Postgres via Prisma/Drizzle, Supabase, Airtable)
  // - Forward to a spreadsheet or CRM webhook
  // This stub only validates and logs server-side so the frontend has a
  // real endpoint to call end-to-end during development.
  console.log("New application received:", data);

  return NextResponse.json({ ok: true });
}
