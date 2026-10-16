export const SITE_NAME = 'Tribe Gear B2B';

export const PHONE_DISPLAY = '+31 6 54 29 69 77';
export const PHONE_E164 = '31654296977';

// Leave empty until the Google Workspace mailbox on the new domain exists.
export const EMAIL = '';

export const ISPO = {
  venue: 'RAI Amsterdam',
  dates: { en: '3–5 November 2026', nl: '3–5 november 2026' },
  stand: '2E30',
  // The banner hides itself after this moment.
  endsAt: '2026-11-06T00:00:00+01:00',
};

/*
 * TODO: replace with the public link of a Google Calendar "Appointment schedule"
 * (Google Workspace → Calendar → Create → Appointment schedule → "Open booking page").
 * Until then this opens Google Calendar with a pre-filled meeting at the stand.
 */
const details = encodeURIComponent(
  `Meeting with Tribe Gear B2B at ISPO 2026, RAI Amsterdam, stand ${ISPO.stand}.\nConfirm via WhatsApp: +${PHONE_E164}`,
);
export const BOOKING_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent('Meeting Tribe Gear B2B, ISPO 2026') +
  '&dates=20261103T100000/20261103T103000&ctz=Europe/Amsterdam' +
  '&location=' + encodeURIComponent(`RAI Amsterdam, Stand ${ISPO.stand}`) +
  '&details=' + details;

export function whatsappUrl(message: string) {
  return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`;
}
