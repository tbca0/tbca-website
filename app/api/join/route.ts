import { NextResponse } from "next/server";

const MAX = { name: 200, email: 320, interest: 100, message: 4000 };

function normalizeEnvUrl(value: string | undefined): string {
  if (!value) return "";
  return value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\r|\n/g, "");
}

function normalizeEnvSecret(value: string | undefined): string {
  if (!value) return "";
  let s = String(value);
  s = s.replace(/^\uFEFF/, "").replace(/[\u200B-\u200D\uFEFF]/g, "");
  s = s.replace(/\u00A0/g, " ");
  s = s.trim().replace(/^["']|["']$/g, "").replace(/\r|\n/g, "");
  return s;
}

function isDev() {
  return process.env.NODE_ENV === "development";
}

export async function POST(request: Request) {
  const sheetUrl = normalizeEnvUrl(process.env.GOOGLE_SHEET_WEB_APP_URL);
  if (!sheetUrl) {
    return NextResponse.json(
      { ok: false, error: "Form is not connected yet. Set GOOGLE_SHEET_WEB_APP_URL on the server." },
      { status: 503 }
    );
  }

  if (!sheetUrl.startsWith("https://script.google.com/")) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "GOOGLE_SHEET_WEB_APP_URL must be the HTTPS Web App URL from Apps Script → Deploy (starts with https://script.google.com/).",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = String(b.name ?? "").trim().slice(0, MAX.name);
  const email = String(b.email ?? "").trim().slice(0, MAX.email);
  const interest = String(b.interest ?? "").trim().slice(0, MAX.interest);
  const message = String(b.message ?? "").trim().slice(0, MAX.message);

  if (!name || !email || !interest) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and interest are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const secret = normalizeEnvSecret(process.env.GOOGLE_SHEET_SECRET);

  if (!secret) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "GOOGLE_SHEET_SECRET is missing or empty. Add it to .env.local (local) or Vercel → Environment Variables, using the same value as Script property SECRET in Google Apps Script. Restart npm run dev after changing .env.local.",
      },
      { status: 503 }
    );
  }

  const payload = {
    name,
    email,
    interest,
    message,
    secret,
  };

  try {
    const upstream = await fetch(sheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store",
    });

    const text = await upstream.text();
    let parsed: {
      ok?: boolean;
      error?: string;
      wantLen?: number;
      gotLen?: number;
    } | null = null;
    try {
      parsed = JSON.parse(text) as {
        ok?: boolean;
        error?: string;
        wantLen?: number;
        gotLen?: number;
      };
    } catch {
      parsed = null;
    }

    if (!upstream.ok) {
      const hint =
        upstream.status === 401 || upstream.status === 403
          ? " The Web App may be set to “Only myself”; change deployment to “Anyone” can access."
          : "";
      return NextResponse.json(
        {
          ok: false,
          error: `Google returned HTTP ${upstream.status}.${hint}${
            isDev()
              ? ` Body (first 240 chars): ${text.slice(0, 240).replace(/\s+/g, " ")}`
              : ""
          }`,
        },
        { status: 502 }
      );
    }

    if (parsed === null || typeof parsed !== "object" || typeof parsed.ok !== "boolean") {
      const looksLikeHtml = /<!DOCTYPE|<html[\s>]/i.test(text);
      return NextResponse.json(
        {
          ok: false,
          error: looksLikeHtml
            ? "The Web App URL returned a web page instead of JSON. Copy the URL again from Apps Script → Deploy (Manage deployments) → copy Web app URL ending in /exec."
            : `Expected JSON from Google Apps Script.${isDev() ? ` Got: ${text.slice(0, 280).replace(/\s+/g, " ")}` : ""}`,
        },
        { status: 502 }
      );
    }

    if (parsed.ok === false) {
      let msg = parsed.error || "Sheet rejected the row.";
      if (msg === "Unauthorized.") {
        msg =
          "Secret mismatch or missing. Set GOOGLE_SHEET_SECRET in .env.local to exactly match Script property SECRET (all caps name). Update Apps Script code from the repo if you still see this. Redeploy the Web app (New version). Restart npm run dev.";
      }
      if (typeof parsed.wantLen === "number" && typeof parsed.gotLen === "number") {
        msg += ` Length in Google SECRET: ${parsed.wantLen}. Length from server: ${parsed.gotLen}. If they differ, one value has extra characters or the wrong secret is in .env.local.`;
      }
      return NextResponse.json({ ok: false, error: msg }, { status: 502 });
    }

    if (parsed.ok !== true) {
      return NextResponse.json(
        { ok: false, error: "Unexpected response from Google Apps Script." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        ok: false,
        error: `Could not reach Google Sheet (${message}). Check your network and Web App URL.`,
      },
      { status: 502 }
    );
  }
}
