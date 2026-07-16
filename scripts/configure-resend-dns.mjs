/**
 * Add Resend DNS records for mail.verdiflow.com to Cloudflare.
 *
 * Required env:
 *   CLOUDFLARE_API_TOKEN - token with Zone.DNS Edit for verdiflow.com
 *
 * Optional env:
 *   RESEND_DOMAIN=mail.verdiflow.com
 *   CLOUDFLARE_ZONE_NAME=verdiflow.com
 *
 * Get DNS values from Resend dashboard after adding the domain, or pass:
 *   RESEND_DKIM_VALUE, RESEND_SPF_MX, RESEND_SPF_TXT
 */

import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const zoneName = process.env.CLOUDFLARE_ZONE_NAME ?? "verdiflow.com";
const token = process.env.CLOUDFLARE_API_TOKEN;
const subdomain = process.env.RESEND_DOMAIN ?? "mail.verdiflow.com";

const dkimName = process.env.RESEND_DKIM_NAME ?? "resend._domainkey.mail";
const dkimValue =
  process.env.RESEND_DKIM_VALUE ??
  "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEMsc9VxLIu6ik8O9LzShykyY1Y+um3yXw2Ok3QEWLEIwSCW1HLKjW3bCZXh7xUHc9vCtILu7dh/vEbG48Lxf98WywawReMVqrheoZmWMUkw1VqHR0R0wEYkOhxScshWQicTC6HXUMaf26I2BS/ejxZWFKaIHt72FigZW8vr8njwIDAQAB";
const spfMx = process.env.RESEND_SPF_MX ?? "feedback-smtp.eu-west-1.amazonses.com";
const spfTxt = process.env.RESEND_SPF_TXT ?? "v=spf1 include:amazonses.com ~all";
const dmarcName = process.env.RESEND_DMARC_NAME ?? "_dmarc";
const dmarcValue = process.env.RESEND_DMARC_VALUE ?? "v=DMARC1; p=none;";

if (!token) {
  console.error(
    "FAIL: Set CLOUDFLARE_API_TOKEN with Zone.DNS Edit permission for verdiflow.com",
  );
  process.exit(1);
}

async function cf(path, init = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await response.json();
  if (!response.ok || !body.success) {
    throw new Error(JSON.stringify(body.errors ?? body));
  }
  return body.result;
}

async function upsertRecord(zoneId, record) {
  const existing = await cf(
    `/zones/${zoneId}/dns_records?type=${encodeURIComponent(record.type)}&name=${encodeURIComponent(record.name)}`,
  );

  const match = existing.find((item) => item.name === record.name && item.type === record.type);
  if (match) {
    await cf(`/zones/${zoneId}/dns_records/${match.id}`, {
      method: "PATCH",
      body: JSON.stringify(record),
    });
    console.log(`Updated ${record.type} ${record.name}`);
    return;
  }

  await cf(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify(record),
  });
  console.log(`Created ${record.type} ${record.name}`);
}

const zones = await cf(`/zones?name=${encodeURIComponent(zoneName)}`);
const zone = zones[0];

if (!zone) {
  console.error(`FAIL: Cloudflare zone not found for ${zoneName}`);
  process.exit(1);
}

console.log(`Using zone ${zone.name} (${zone.id}) for ${subdomain}`);

const records = [
  {
    type: "TXT",
    name: `${dkimName}.${zoneName}`,
    content: dkimValue,
    ttl: 3600,
  },
  {
    type: "MX",
    name: `send.mail.${zoneName}`,
    content: spfMx,
    priority: 10,
    ttl: 3600,
  },
  {
    type: "TXT",
    name: `send.mail.${zoneName}`,
    content: spfTxt,
    ttl: 3600,
  },
  {
    type: "TXT",
    name: `${dmarcName}.${subdomain}`,
    content: dmarcValue,
    ttl: 3600,
  },
];

for (const record of records) {
  await upsertRecord(zone.id, record);
}

console.log("\nOK: Resend DNS records applied. Verify in Resend → Domains → mail.verdiflow.com");
