/**
 * TBCA — Append join-form rows to Google Sheets
 *
 * SETUP (one-time):
 * 1. Create a Google Sheet. Row 1 can be headers, e.g.:
 *    Timestamp | Name | Email | Interest | Message
 * 2. Menu: Extensions → Apps Script
 * 3. Delete any code, paste this entire file, Save.
 * 4. Project Settings (gear) → Script Properties → Add property:
 *    - SECRET = same long random string you will set as GOOGLE_SHEET_SECRET on Vercel
 * 5. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone (required so your website server can POST)
 * 6. Copy the Web app URL → GOOGLE_SHEET_WEB_APP_URL in Vercel / .env.local
 * 7. After code changes: Deploy → Manage deployments → edit Web app → Version = New version → Deploy
 * 8. Authorize the script when prompted
 */

function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var expected = props.getProperty("SECRET");
    if (!expected) {
      return jsonOut({ ok: false, error: "Script missing SECRET in Script Properties." });
    }

    if (!e.postData || !e.postData.contents) {
      return jsonOut({ ok: false, error: "No POST body." });
    }

    var data = JSON.parse(e.postData.contents);
    var got = normalizeSecret(data.secret);
    var want = normalizeSecret(expected);
    if (!got) {
      return jsonOut({
        ok: false,
        error:
          "Empty secret in request. On the website, set GOOGLE_SHEET_SECRET to the same value as Script property SECRET (in .env.local or Vercel), then restart dev server / redeploy.",
      });
    }
    if (got !== want) {
      return jsonOut({
        ok: false,
        error:
          "Secret mismatch. In Apps Script → Project settings → Script properties, the value of SECRET must exactly match GOOGLE_SHEET_SECRET in .env.local (one line, no quotes). After changing SECRET, save; then Deploy → Manage deployments → edit Web app → choose New version → Deploy. Restart npm run dev after .env.local changes.",
        wantLen: want.length,
        gotLen: got.length,
      });
    }

    var name = trimStr(data.name, 200);
    var email = trimStr(data.email, 320);
    var interest = trimStr(data.interest, 100);
    var message = trimStr(data.message || "", 4000);

    if (!name || !email || !interest) {
      return jsonOut({ ok: false, error: "Missing required fields." });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      name,
      email,
      interest,
      message,
    ]);

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function normalizeSecret(s) {
  var t = String(s == null ? "" : s);
  t = t.replace(/^\uFEFF/, "");
  t = t.replace(/[\u200B-\u200D\uFEFF]/g, "");
  t = t.replace(/\u00A0/g, " ");
  return t.trim();
}

function trimStr(s, max) {
  var t = String(s == null ? "" : s).trim();
  return t.length > max ? t.substring(0, max) : t;
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
