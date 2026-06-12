import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type JoinFormPayload = {
  name?: string;
  email?: string;
  message?: string;
  interest?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function saveToGoogleSheet(payload: {
  name: string;
  email: string;
  interest: string;
  message: string;
}) {
  const url = process.env.GOOGLE_SHEET_WEB_APP_URL;
  const secret = process.env.GOOGLE_SHEET_SECRET;

  if (!url || !secret) {
    console.warn("Google Sheet env variables are missing. Skipping sheet save.");
    return {
      success: false,
      skipped: true,
      error: "Google Sheet env variables missing",
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret,
        ...payload,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Google Sheet save failed:", text);
      return {
        success: false,
        skipped: false,
        error: text || "Google Sheet save failed",
      };
    }

    console.log("Google Sheet save response:", text);

    return {
      success: true,
      skipped: false,
      error: "",
    };
  } catch (error) {
    console.error("Google Sheet save error:", error);

    return {
      success: false,
      skipped: false,
      error: "Google Sheet request failed",
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as JoinFormPayload;

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const interest = body.interest?.trim() || "";
    const message = body.message?.trim() || "";

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP_USER or SMTP_PASS is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Mail configuration is missing. Please contact the website admin.",
        },
        { status: 500 }
      );
    }

    const sheetResult = await saveToGoogleSheet({
      name,
      email,
      interest,
      message,
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeInterest = escapeHtml(interest);
    const safeMessage = escapeHtml(message);

    const smtpPort = Number(process.env.SMTP_PORT || 587);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;

    const userMailHtml = `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
        <div style="max-width:620px; margin:auto; background:#ffffff; border-radius:18px; overflow:hidden; border:1px solid #e2e8f0;">
          <div style="background:#fff7ed; padding:24px; text-align:center;">
            <h1 style="margin:0; color:#9a3412; font-size:24px;">Thank you for joining TBCA</h1>
            <p style="margin:8px 0 0; color:#475569;">Telangana Bengali Cultural Association</p>
          </div>

          <div style="padding:28px;">
            <p style="font-size:16px; color:#0f172a;">Dear ${safeName},</p>

            <p style="font-size:15px; line-height:1.7; color:#334155;">
              Thank you for showing interest in Telangana Bengali Cultural Association.
              We have received your details successfully. Our team will contact you soon.
            </p>

            <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:14px; padding:16px; margin:22px 0;">
              <p style="margin:0 0 8px; color:#9a3412; font-weight:bold;">Your submitted details</p>
              <p style="margin:4px 0; color:#334155;"><strong>Name:</strong> ${safeName}</p>
              <p style="margin:4px 0; color:#334155;"><strong>Email:</strong> ${safeEmail}</p>
              ${
                safeInterest
                  ? `<p style="margin:4px 0; color:#334155;"><strong>Interest:</strong> ${safeInterest}</p>`
                  : ""
              }
              ${
                safeMessage
                  ? `<p style="margin:4px 0; color:#334155;"><strong>Message:</strong> ${safeMessage}</p>`
                  : ""
              }
            </div>

            <p style="font-size:15px; line-height:1.7; color:#334155;">
              Warm regards,<br />
              <strong>TBCA Team</strong><br />
              Telangana Bengali Cultural Association
            </p>
          </div>

          <div style="background:#0f172a; padding:18px; text-align:center;">
            <p style="margin:0; color:#ffffff; font-size:13px;">
              Connecting people through culture
            </p>
          </div>
        </div>
      </div>
    `;

    const adminMailHtml = `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2>New TBCA Join Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${
          safeInterest
            ? `<p><strong>Interest:</strong> ${safeInterest}</p>`
            : ""
        }
        ${
          safeMessage
            ? `<p><strong>Message:</strong> ${safeMessage}</p>`
            : ""
        }
        ${
          sheetResult.success
            ? `<p><strong>Google Sheet:</strong> Saved successfully</p>`
            : `<p><strong>Google Sheet:</strong> Not saved - ${escapeHtml(
                sheetResult.error || "Unknown error"
              )}</p>`
        }
      </div>
    `;

    await transporter.sendMail({
      from: `"TBCA" <${fromEmail}>`,
      to: email,
      subject: "Thank you for joining TBCA",
      html: userMailHtml,
    });

    await transporter.sendMail({
      from: `"TBCA Website" <${fromEmail}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: "New TBCA Join Form Submission",
      html: adminMailHtml,
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for showing interest in Telangana Bengali Cultural Association.",
      sheetSaved: sheetResult.success,
    });
  } catch (error) {
    console.error("Join form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Mail sending failed. Please check SMTP settings or app password.",
      },
      { status: 500 }
    );
  }
}