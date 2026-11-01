/**
 * Printable QR code for Bart, pointing at /welcome on the live domain (astro.config.mjs `site`).
 * Download from /qr/welcome.svg once the final domain is set.
 */
import type { APIRoute } from 'astro';
import QRCode from 'qrcode';

export const GET: APIRoute = async ({ site }) => {
  const url = new URL('/welcome', site).href;
  const svg = await QRCode.toString(url, { type: 'svg', margin: 2, errorCorrectionLevel: 'H', color: { dark: '#0a0b08', light: '#ffffff' } });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
