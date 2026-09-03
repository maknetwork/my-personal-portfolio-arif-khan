const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_RECAPTCHA_SCORE = 0.5;

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, corsHeaders);
    }

    const name = (payload?.name || "").trim();
    const email = (payload?.email || "").trim();
    const message = (payload?.message || "").trim();
    const recaptchaToken = payload?.recaptcha_token;

    if (!name || !email || !message || !recaptchaToken) {
      return json({ error: "Missing required fields" }, 400, corsHeaders);
    }
    if (!EMAIL_REGEX.test(email)) {
      return json({ error: "Invalid email address" }, 400, corsHeaders);
    }

    const verified = await verifyRecaptcha(recaptchaToken, env.RECAPTCHA_SECRET_KEY);
    if (!verified) {
      return json({ error: "reCAPTCHA verification failed" }, 403, corsHeaders);
    }

    const sent = await sendViaResend({ name, email, message }, env);
    if (!sent.ok) {
      console.error("Resend error:", sent.error);
      return json({ error: "Failed to send message" }, 502, corsHeaders);
    }

    // Best-effort: the submitter's confirmation email isn't critical to the
    // core flow, so a failure here shouldn't fail the whole request.
    const autoReply = await sendAutoReply({ name, email }, env);
    if (!autoReply.ok) {
      console.error("Auto-reply error:", autoReply.error);
    }

    return json({ success: true }, 200, corsHeaders);
  },
};

async function verifyRecaptcha(token, secret) {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = await res.json();
  return (
    result.success === true &&
    result.action === "submit" &&
    result.score >= MIN_RECAPTCHA_SCORE
  );
}

async function sendViaResend({ name, email, message }, env) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Portfolio contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html:
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    return { ok: false, error: await res.text() };
  }
  return { ok: true };
}

async function sendAutoReply({ name, email }, env) {
  const firstName = name.split(" ")[0];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: email,
      subject: "Message received — Arif's on it! 📬",
      text: autoReplyText(firstName),
      html: autoReplyHtml(firstName),
    }),
  });

  if (!res.ok) {
    return { ok: false, error: await res.text() };
  }
  return { ok: true };
}

function autoReplyText(firstName) {
  return `Hey ${firstName},

Your message just landed in Arif's inbox with a satisfying little *ping*.

He reads every message himself -- no bots, no filters, just a developer
with too many browser tabs open -- so expect a reply soon, probably
fueled by coffee and a slightly unreasonable enthusiasm for backend
architecture.

Talk soon,
Mohd Arif Khan
Backend-Heavy Full-Stack Engineer, Gurugram, India

(This is an automated confirmation. Arif hasn't actually read your
message yet, but he will.)`;
}

function autoReplyHtml(firstName) {
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
    <div style="text-align: center; margin-bottom: 20px;">
      <span style="font-size: 40px;">📬</span>
    </div>
    <h1 style="font-size: 22px; font-weight: 700; text-align: center; margin: 0 0 8px;">
      Got it, ${escapeHtml(firstName)}!
    </h1>
    <p style="text-align: center; color: #555; margin: 0 0 28px; line-height: 1.6;">
      Your message just landed in Arif's inbox with a satisfying <em>ping</em> 🔔
    </p>
    <p style="line-height: 1.6; color: #333;">
      He reads every single message himself &mdash; no bots, no filters, just
      a developer with too many browser tabs open. Expect a reply soon,
      probably fueled by coffee ☕ and a slightly unreasonable enthusiasm
      for backend architecture.
    </p>
    <p style="line-height: 1.6; color: #333; margin-top: 24px;">
      Talk soon,<br />
      <strong>Mohd Arif Khan</strong><br />
      <span style="color: #888; font-size: 13px;">Backend-Heavy Full-Stack Engineer &middot; Gurugram, India</span>
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
    <p style="text-align: center; font-size: 12px; color: #aaa;">
      This is an automated confirmation &mdash; Arif hasn't actually read your
      message yet, but he will. 👀
    </p>
  </div>`;
}

function json(obj, status, corsHeaders) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
