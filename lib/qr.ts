import { cache } from "react";
import QRCode from "qrcode";
import { getContent } from "./content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://divinegabriel.dev";

/** Build a vCard string from the current (editable) contact details. */
export function buildVCard(contact: {
  email: string;
  xUrl: string;
  instagramUrl: string;
}): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Gabriel;Divine;Ugokanu;;",
    "FN:Ugokanu Divine Gabriel",
    "TITLE:Founder · Trader · Builder",
    "ORG:LinkUpNaija;Aerovigil;EcoFlux Energy",
    `EMAIL;TYPE=INTERNET:${contact.email}`,
    `URL:${SITE_URL}`,
    `X-SOCIALPROFILE;TYPE=twitter:${contact.xUrl}`,
    `X-SOCIALPROFILE;TYPE=instagram:${contact.instagramUrl}`,
    "ADR;TYPE=WORK:;;Abuja;;;;Nigeria",
    "END:VCARD",
  ].join("\n");
}

/**
 * QR code (PNG data URL) encoding a vCard so a phone camera offers
 * to add the contact directly. Cached per request.
 */
export const getContactQrDataUrl = cache(async (): Promise<string> => {
  const content = await getContent();
  const vcard = buildVCard(content.contact);
  return QRCode.toDataURL(vcard, {
    errorCorrectionLevel: "M",
    margin: 1,
    scale: 8,
    color: { dark: "#0A0A0A", light: "#FFFFFF" },
  });
});
