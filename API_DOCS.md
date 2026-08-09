<div align="center">
  <h1>Cauliflare API Documentation</h1>
  <p>Developer infrastructure APIs for scam detection, URL analysis, search intelligence, and internet security.</p>
  
  <a href="#"><b>Get API Key</b></a> &nbsp; | &nbsp; <a href="#endpoint-docs"><b>API Reference</b></a> &nbsp; | &nbsp; <a href="#quick-start"><b>Quick Start</b></a>
</div>

---

## Authentication

All API requests require an API key.

Include your API key in the `Authorization` header.

```http
Authorization: Bearer YOUR_API_KEY
```

---

## Base URL

```text
https://api.cauliflare.in/v1
```

---

## Quick Start

```bash
curl -X POST https://api.cauliflare.in/v1/scan-url \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

---

# ENDPOINT DOCS

## URL Scan API

**Scan URL**

Analyze suspicious URLs for phishing, scams, malware, and threats.

### Endpoint

`POST /scan-url`

### Request Body

```json
{
  "url": "https://example.com"
}
```

### Success Response

```json
{
  "safe": false,
  "risk_score": 92,
  "phishing": true,
  "malware": false,
  "reasons": [
    "Suspicious redirect chain",
    "Known phishing domain"
  ]
}
```

### Error Response

```json
{
  "error": "Invalid URL"
}
```

---

## Temp Mail Detection Docs

**Check Email**

Detect temporary and disposable email addresses.

### Endpoint

`POST /check-email`

### Request Body

```json
{
  "email": "test@mailinator.com"
}
```

### Success Response

```json
{
  "valid": false,
  "temporary": true,
  "provider": "Mailinator",
  "risk_score": 87
}
```

---

## Scam Detection Docs

**Detect Scam**

Analyze text for scams and fraudulent intent.

### Endpoint

`POST /detect-scam`

### Request Body

```json
{
  "text": "Send OTP to claim your reward"
}
```

### Success Response

```json
{
  "scam": true,
  "risk_score": 96,
  "categories": [
    "otp_fraud",
    "social_engineering"
  ]
}
```

---

## Rate Limits

| Plan | Requests |
|------|----------|
| **Free** | 100/min |
| **Pro** | 1000/min |

---

## Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Invalid Request |
| `401` | Unauthorized |
| `429` | Rate Limited |
| `500` | Internal Error |

---

## SDK Examples

### JavaScript

```javascript
const result = await cauliflare.scanURL(url)
```

### Python

```python
result = client.scan_url(url)
```
