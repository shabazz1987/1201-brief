// PIN gate — every request passes through here except the PWA plumbing
// excluded in `config.matcher`. PAGE_PIN + PIN_SALT live in Vercel env vars.
// Missing env fails closed (503) — the page is never silently public.
const YEAR = 31536000;

const GATE_HTML = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex"><title>12:01</title><style>
:root{--bg:#101013;--fg:#e8e8ec;--muted:#8f8f9c;--rule:#26262d;--card:#17171c;--accent:#ff6a4d}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font:16px/1.5 -apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;min-height:100vh;min-height:100dvh;display:grid;place-items:center}
form{background:var(--card);border:1px solid var(--rule);border-radius:14px;padding:28px 24px;width:min(320px,calc(100vw - 48px));text-align:center}
h1{font-size:15px;font-weight:600;letter-spacing:.02em}
p{color:var(--muted);font-size:13px;margin-top:4px}
input{margin-top:18px;width:100%;background:var(--bg);border:1px solid var(--rule);border-radius:10px;color:var(--fg);font-size:24px;letter-spacing:.4em;text-align:center;padding:10px 0 10px .4em;outline:none}
input:focus{border-color:var(--muted)}
button{margin-top:14px;width:100%;background:var(--fg);color:var(--bg);border:0;border-radius:10px;padding:11px 0;font-size:14px;font-weight:600;cursor:pointer}
.err{color:var(--accent);font-size:12.5px;margin-top:10px}
</style></head><body>
<form method="POST" action="/unlock">
<h1>12:01</h1><p>enter pin</p>
<input name="pin" inputmode="numeric" autocomplete="off" pattern="[0-9]*" maxlength="8" autofocus>
<button>unlock</button>
{ERR}
</form></body></html>`;

const gate = (wrong) =>
  new Response(GATE_HTML.replace('{ERR}', wrong ? '<div class="err">wrong pin</div>' : ''), {
    status: 401,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });

async function token(pin, salt) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${pin}|${salt}`));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default async function middleware(req) {
  const pin = process.env.PAGE_PIN;
  const salt = process.env.PIN_SALT;
  if (!pin || !salt) return new Response('12:01 — PIN not configured', { status: 503 });

  const expected = await token(pin, salt);
  const cookie = (req.headers.get('cookie') || '').match(/(?:^|;\s*)k12=([a-f0-9]{64})/)?.[1];
  const url = new URL(req.url);

  if (url.pathname === '/unlock' && req.method === 'POST') {
    const form = await req.formData().catch(() => null);
    if ((form?.get('pin') || '') === pin) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/',
          'Set-Cookie': `k12=${expected}; Max-Age=${YEAR}; Path=/; HttpOnly; Secure; SameSite=Lax`,
          'Cache-Control': 'no-store',
        },
      });
    }
    await new Promise((r) => setTimeout(r, 600)); // slow down PIN guessing
    return gate(true);
  }

  if (cookie === expected) return; // unlocked — continue to the page

  return gate(false);
}

export const config = {
  matcher: ['/((?!manifest\\.json|robots\\.txt|favicon\\.png|icon-512\\.png|apple-touch-icon\\.png).*)'],
};
