// Fill every data-event="<key>" element from EVENT (config.js).
document.querySelectorAll("[data-event]").forEach((el) => {
  const value = EVENT[el.dataset.event];
  if (value != null) el.textContent = value;
});
document.getElementById("venue-link").href = EVENT.mapUrl;

// "Add to Google Calendar" link — times are sent in UTC so they land correctly
// in every guest's own timezone.
(function buildCalendarLink() {
  const start = new Date(EVENT.dateISO);
  if (isNaN(start)) return;
  const end = new Date(start.getTime() + (EVENT.durationHours || 3) * 3600000);
  const fmt = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, ""); // 20261106T080000Z
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${EVENT.firstName}'s ${EVENT.ageOrdinal} Birthday — ${EVENT.partyTitle} 🎂`,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: `${EVENT.venueName}, ${EVENT.venueAddress}`,
    details: `Dress code: ${EVENT.dressCode} — ${EVENT.dressCodeSub}\nMap: ${EVENT.mapUrl}`,
  });
  document.getElementById("gcal-link").href = `https://calendar.google.com/calendar/render?${params}`;
})();
document.getElementById("hero-hi").textContent = `Hi, ${guestName || "friend"}!`;
document.getElementById("ending-guest").textContent = guestName || "dear friend";

// Dress-code color swatches.
const swatches = document.getElementById("swatches");
DRESS_COLORS.forEach((c) => {
  const s = document.createElement("span");
  s.className = "swatch";
  s.innerHTML = '<span class="swatch-dot"></span>';
  s.firstChild.style.background = c.hex;
  s.append(c.name);
  swatches.appendChild(s);
});

renderGallery();
startCountdown();

createConfetti();
createSparkles();
createBalloons();
createFringe();
createBeadBanners();
createBracelet();
