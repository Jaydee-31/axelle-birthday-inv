// Fill every data-event="<key>" element from EVENT (config.js).
document.querySelectorAll("[data-event]").forEach((el) => {
  const value = EVENT[el.dataset.event];
  if (value != null) el.textContent = value;
});
document.getElementById("venue-link").href = EVENT.mapUrl;
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
