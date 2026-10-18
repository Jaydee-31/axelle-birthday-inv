const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');
const tyMsg = document.getElementById('ty-msg');

function openModal() {
  modalOverlay.classList.add('open');
}

modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('open');
});
document.getElementById('ty-close').addEventListener('click', () => tyMsg.classList.remove('show'));

async function handleRsvp(response) {
  const loader = document.getElementById('modal-loading');
  rsvpYes.disabled = true;
  rsvpNo.disabled = true;
  loader.classList.add('active');

  try {
    await saveDeviceAction(guestName, response);
  } catch (e) {
    console.error(e);
  }

  loader.classList.remove('active');
  rsvpYes.disabled = false;
  rsvpNo.disabled = false;
  modalOverlay.classList.remove('open');

  const name = guestName || 'dear guest';
  if (response === 'yes') {
    document.getElementById('ty-emoji').textContent = '🪩';
    document.getElementById('ty-text').textContent = 'See You on the Dance Floor!';
    document.getElementById('ty-sub').textContent = `Yay, ${name}! Get your sparkliest outfit ready — it's gonna be a love story of a party! 💃✨`;
    burstConfetti();
  } else {
    document.getElementById('ty-emoji').textContent = '💜';
    document.getElementById('ty-text').textContent = "I'll Miss You!";
    document.getElementById('ty-sub').textContent = `Thank you for letting me know, ${name}. I'll save you a friendship bracelet! 📿`;
  }
  tyMsg.classList.add('show');
}

// One-off celebratory burst from the center of the screen.
function burstConfetti() {
  const layer = document.body;
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.className = 'burst';
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    c.style.cssText = `
      background:${pick(PARTY_COLORS)};
      --dx:${Math.cos(angle) * dist}px;
      --dy:${Math.sin(angle) * dist - 80}px;
      --rot:${Math.random() * 720 - 360}deg;
      animation-delay:${Math.random() * 120}ms;
    `;
    layer.appendChild(c);
    setTimeout(() => c.remove(), 1800);
  }
}

rsvpYes.addEventListener('click', () => handleRsvp('yes'));
rsvpNo.addEventListener('click', () => handleRsvp('no'));
