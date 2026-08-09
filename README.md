<div align="center">
  <img src="https://cauliflare.vercel.app/vite.svg" width="64" height="64" alt="Cauliflare Logo" />
  <h1>CAULIFLARE</h1>
  <p><strong>Sub-10ms Developer Infrastructure APIs for Disposable Email Blocking, Scam Detection, Domain Intelligence & Fraud Defense.</strong></p>
  <p><em>Engineered in Go & React for high-throughput internet platforms.</em></p>

  <p>
    <a href="https://github.com/techxsarwar/cauliflare/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-GPL--3.0-blue.svg?style=for-the-badge" alt="License" /></a>
    <a href="https://cauliflare.vercel.app/status"><img src="https://img.shields.io/badge/Uptime-99.99%25-00e676?style=for-the-badge" alt="Uptime" /></a>
    <a href="https://cauliflare.vercel.app"><img src="https://img.shields.io/badge/Speed-%3C8ms%20Go%20Engine-blue?style=for-the-badge" alt="Speed" /></a>
    <a href="https://cauliflare.vercel.app"><img src="https://img.shields.io/badge/Signatures-75%2C000%2B%20Live-orange?style=for-the-badge" alt="Signatures" /></a>
  </p>
</div>

<br />

---

## ⚡ What is Cauliflare?

**Cauliflare** is an enterprise-grade developer security platform that protects user sign-ups, payment funnels, and web applications from fraudulent actors, botnets, and temporary disposable email burners.

Built with an ultra-lightweight **Go In-Memory Threat Engine** and a **Cyber-Industrial React Dashboard**, Cauliflare delivers sub-10 millisecond lookups without external database latency.

---

## 🛡️ Key Capabilities

| Feature | Endpoint | Description |
| :--- | :--- | :--- |
| **5-Layer Temp-Mail Defense** | `POST /v1/check-email` | 75,000+ GitHub signatures, high-entropy TLD scanners, DNS MX analysis, and live website sniffing. |
| **Email Typo Engine** | `POST /v1/check-email` | Levenshtein distance typo corrections (`user@gamil.com` ➔ `user@gmail.com`). |
| **Domain Intelligence & SPF/DMARC** | `POST /v1/inspect-domain` | Classifies Corporate vs Freemail and validates DNS SPF & DMARC anti-spoofing policies. |
| **Virtual VoIP & Burner Phone Checker** | `POST /v1/check-phone` | Intercepts Twilio, Bandwidth, and public online SMS burner pools. |
| **Phishing & Malware URL Scanner** | `POST /v1/scan-url` | Detects credential phishing chains, malicious redirect paths, and unverified SSL certificates. |
| **Scam & Social Engineering Detector** | `POST /v1/detect-scam` | Natural language threat scanner for urgent financial fraud, crypto scams, and OTP harvesting. |
| **IP Reputation & Tor/VPN Detector** | `POST /v1/check-ip` | Flags Datacenter ASNs, Tor Exit Nodes, and anonymous proxy relays. |
| **Batch Bulk Email Cleaner** | `POST /v1/batch-check-email` | Clean entire CSVs or batch payloads of up to 1,000 emails concurrently. |

---

## 💻 1-Line Drop-in Form Guard SDK (`cauliflare.js`)

Add client-side form validation to any HTML form with a single line of code:

```html
<script 
  src="https://cauliflare.vercel.app/cauliflare.js" 
  data-cauliflare-key="cf_sarwar_cauliflare_live_x829a47f01b92c81d"
  data-block-disposable="true"
  data-suggest-typos="true"
  async>
</script>
```

---

## 🚀 Quickstart API Examples

### cURL
```bash
curl -X POST "https://cauliflare-backend.onrender.com/v1/check-email" \
  -H "Authorization: Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@mailinator.com"}'
```

### Python
```python
import requests

res = requests.post(
    "https://cauliflare-backend.onrender.com/v1/check-email",
    headers={"Authorization": "Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d"},
    json={"email": "user@gamil.com"}
)
data = res.json()
if data.get("typo_detected"):
    print(f"Did you mean {data.get('did_you_mean')}?")
```

### Node.js / Express Middleware
```javascript
async function cauliflareGuard(req, res, next) {
  const { email } = req.body;
  const check = await fetch("https://cauliflare-backend.onrender.com/v1/check-email", {
    method: "POST",
    headers: {
      "Authorization": "Bearer cf_sarwar_cauliflare_live_x829a47f01b92c81d",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  }).then(r => r.json());

  if (check.recommendation === "BLOCK") {
    return res.status(400).json({ error: "Disposable email addresses not permitted." });
  }
  next();
}
```

### PHP / Laravel
```php
use Illuminate\Support\Facades\Http;

$response = Http::withToken('cf_sarwar_cauliflare_live_x829a47f01b92c81d')
    ->post('https://cauliflare-backend.onrender.com/v1/check-email', [
        'email' => $request->input('email')
    ]);

if ($response->json('recommendation') === 'BLOCK') {
    return back()->withErrors(['email' => 'Disposable email not permitted.']);
}
```

### Rust
```rust
use reqwest::Client;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let res = client.post("https://cauliflare-backend.onrender.com/v1/check-email")
        .bearer_auth("cf_sarwar_cauliflare_live_x829a47f01b92c81d")
        .json(&json!({ "email": "user@mailinator.com" }))
        .send()
        .await?
        .json::<serde_json::Value>()
        .await?;

    if res["recommendation"] == "BLOCK" {
        println!("Blocked: {}", res["provider"]);
    }
    Ok(())
}
```

---

## 🛠️ Local Development

### 1. Clone the repository
```bash
git clone https://github.com/techxsarwar/cauliflare.git
cd cauliflare
```

### 2. Run Backend (Go)
```bash
cd backend
go run .
# Running on http://127.0.0.1:8000
```

### 3. Run Frontend (React / Vite)
```bash
cd ../frontend
npm install
npm run dev
# Running on http://localhost:5173
```

---

## ⭐ Support & Community Courtesy

If you are self-hosting Cauliflare or find this project helpful, please consider:
- 🌟 **Starring this repository on GitHub** to help more developers discover it!
- 👤 **Following [@techxsarwar](https://github.com/techxsarwar)** on GitHub for more open-source security tools.

---

## 📜 License

Distributed under the **GNU General Public License v3.0 (GPL-3.0)**. Anyone is free to use, modify, and build upon this software provided all derivative works remain **open-source & public** with prominent attribution to **Sarwar**. See [LICENSE](LICENSE) for full details.

<div align="center">
  <sub>Designed & Developed by Sarwar • Powered by Go, React, Clerk & Supabase</sub>
</div>
