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
