// Fill every data-event="<key>" element from EVENT (config.js).
document.querySelectorAll("[data-event]").forEach((el) => {
  const value = EVENT[el.dataset.event];
  if (value != null) el.textContent = value;
});
document.getElementById("venue-link").href = EVENT.mapUrl;
document.getElementById("hero-hi").textContent = `Hi, ${guestName || "friend"}!`;
document.getElementById("ending-guest").textContent = guestName || "dear friend";

// "N days to go" pill in the party details.
(function renderCountdown() {
  const el = document.getElementById("countdown");
  const start = new Date(EVENT.dateISO);
  const today = new Date();
  const days = Math.ceil((new Date(start.toDateString()) - new Date(today.toDateString())) / 86400000);
  if (isNaN(days) || days < 0) {
    el.style.display = "none";
  } else {
    el.textContent = days === 0 ? "🎉 It's party day!" : `⏳ ${days} day${days === 1 ? "" : "s"} to go`;
  }
})();

createConfetti();
createSparkles();
createBracelet();
