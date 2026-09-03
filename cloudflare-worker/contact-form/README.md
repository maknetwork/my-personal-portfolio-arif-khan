# Contact form backend (Cloudflare Worker)

Verifies the reCAPTCHA v3 token from the portfolio's contact form, then sends the
message via Resend. Replaces the deleted/unreachable Supabase Edge Function.

## Prerequisites

- A [Resend](https://resend.com) account and API key. Free tier can send to your own
  email from `onboarding@resend.dev` with no domain verification — enough for a
  contact form where you're the recipient. Verify `mohdarifkhan.com` in Resend later
  if you want a branded `from` address.
- The reCAPTCHA v3 **secret** key paired with the existing site key
  (`6Lcfs1csAAAAALnh7gLTMQ_z1NxfVzfKtGMeTwIv`), from the
  [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin).

## Deploy

Run these yourself from this directory — secret values should never be typed into
an agent session.

```bash
npx wrangler login          # opens a browser, one-time
npx wrangler secret put RECAPTCHA_SECRET_KEY
npx wrangler secret put RESEND_API_KEY
npx wrangler deploy
```

Already deployed at `https://mohdarifkhan-contact-form.wikiassure.workers.dev`
(and wired into `js/app.js`'s `FUNCTION_URL`). Re-run `wrangler deploy` after any
code change to `src/index.js`.

## Config

`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, and `ALLOWED_ORIGIN` are plain vars in
`wrangler.jsonc` (not secret) — edit them directly if they need to change.

## Test

```bash
curl -X POST https://mohdarifkhan-contact-form.wikiassure.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"you@example.com","message":"hello","recaptcha_token":"..."}'
```

A real `recaptcha_token` can only be minted client-side by `grecaptcha.execute()` on
the live page — this curl call will correctly fail verification on its own, which
just confirms the endpoint is reachable and validating input.
