const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');
const rsvpConfirm = document.getElementById('rsvp-confirm');
const rsvpBack = document.getElementById('rsvp-back');
const stepChoice = document.getElementById('rsvp-step-choice');
const stepCount = document.getElementById('rsvp-step-count');
const tyMsg = document.getElementById('ty-msg');

// Party size picked in step 2.
const party = { adults: 1, kids: 0 };

function showStep(step) {
  stepChoice.hidden = step !== 'choice';
  stepCount.hidden = step !== 'count';
}

function openModal() {
  showStep('choice');
  modalOverlay.classList.add('open');
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.getElementById('ty-close').addEventListener('click', () => tyMsg.classList.remove('show'));

// ─── Guest-count steppers ──────────────────────────────────────────────────────
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function renderParty() {
  document.querySelectorAll('.stepper').forEach((s) => {
    const key = s.dataset.count;
    const value = party[key];
    s.querySelector('.step-value').textContent = value;
    s.querySelector('[data-step="-1"]').disabled = value <= Number(s.dataset.min);
    s.querySelector('[data-step="1"]').disabled = value >= Number(s.dataset.max);
  });
  const total = party.adults + party.kids;
  document.getElementById('party-total').textContent =
    `Total: ${plural(total, 'guest', 'guests')}` + (party.kids ? ` (${plural(party.kids, 'kid', 'kids')})` : '');
}

document.querySelectorAll('.stepper').forEach((s) => {
  s.addEventListener('click', (e) => {
    const btn = e.target.closest('.step-btn');
    if (!btn) return;
    const key = s.dataset.count;
    const next = party[key] + Number(btn.dataset.step);
    party[key] = Math.min(Number(s.dataset.max), Math.max(Number(s.dataset.min), next));
    renderParty();
  });
});
renderParty();

// ─── Submit ────────────────────────────────────────────────────────────────────
async function handleRsvp(response) {
  const loader = document.getElementById('modal-loading');
  const buttons = [rsvpYes, rsvpNo, rsvpConfirm, rsvpBack];
  buttons.forEach((b) => (b.disabled = true));
  loader.classList.add('active');

  const counts = response === 'yes' ? { ...party } : { adults: 0, kids: 0 };
  try {
    await saveDeviceAction(guestName, response, counts);
  } catch (e) {
    console.error(e);
  }

  loader.classList.remove('active');
  buttons.forEach((b) => (b.disabled = false));
  renderParty();
  closeModal();

  const name = guestName || 'dear guest';
  if (response === 'yes') {
    const total = counts.adults + counts.kids;
    const crew = total === 1 ? '' : ` all ${total} of you`;
    document.getElementById('ty-emoji').textContent = '🎉';
    document.getElementById('ty-text').textContent = 'See You on the Dance Floor!';
    document.getElementById('ty-sub').textContent = `Yay, ${name}! Can't wait to see${crew} there — get your sparkliest outfits ready! 💃✨`;
    burstConfetti();
  } else {
    document.getElementById('ty-emoji').textContent = '🧡';
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

rsvpYes.addEventListener('click', () => showStep('count'));
rsvpBack.addEventListener('click', () => showStep('choice'));
rsvpConfirm.addEventListener('click', () => handleRsvp('yes'));
rsvpNo.addEventListener('click', () => handleRsvp('no'));
