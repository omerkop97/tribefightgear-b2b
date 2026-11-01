export const SITE_NAME = 'Tribe Gear B2B';

export const PHONE_DISPLAY = '+31 6 54 29 69 77';
export const PHONE_E164 = '31654296977';

// Leave empty until the Google Workspace mailbox on the new domain exists.
export const EMAIL = '';

export const ISPO = {
  venue: 'RAI Amsterdam',
  dates: { en: '4–5 November 2026', nl: '4–5 november 2026' },
  stand: '2E30',
  // The banner hides itself after this moment.
  endsAt: '2026-11-06T00:00:00+01:00',
};

/** Google Calendar appointment schedule (ISPO meetings). Every "Book a meeting" button uses this. */
export const BOOKING_URL = 'https://calendar.app.google/WeXy7qgfbDDd6ZGz7';

export function whatsappUrl(message: string) {
  return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`;
}
