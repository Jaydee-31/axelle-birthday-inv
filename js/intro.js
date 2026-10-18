const intro = document.getElementById('intro');
const enterBtn = document.getElementById('enter-btn');

// Unlocks the scrolling invitation underneath the intro.
function revealPage() {
  window.scrollTo(0, 0);
  document.body.classList.remove('pre-show');
  startPage();
  intro.classList.add('hidden');
}

enterBtn.addEventListener('click', () => {
  enterBtn.disabled = true;
  tryPlayAmbient(); // must run inside the click for autoplay rules

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealPage();
    setTimeout(() => (intro.style.display = 'none'), 1200);
    return;
  }
  playTicketOutro();
});

// ─── Ticket outro: tug → tear along the perforation → stub falls, ticket launches ───
function playTicketOutro() {
  const shell = document.querySelector('.ticket-shadow');
  const perf = shell.querySelector('.ticket-perf');
  const disco = document.querySelector('.intro-wrap > .disco');
  const rect = shell.getBoundingClientRect();
  const W = rect.width;
  const H = rect.height;
  const cutY = perf.getBoundingClientRect().top - rect.top + 1; // centre of the dashed line

  // Jagged tear edge shared by both halves so they match exactly.
  const pad = 60; // room outside the card so the drop shadow isn't clipped
  const zig = [];
  for (let x = -pad, i = 0; x <= W + pad; x += 7, i++) zig.push(`${x}px ${cutY + (i % 2 ? 3 : -3)}px`);
  const topClip = `polygon(${-pad}px ${-pad}px, ${W + pad}px ${-pad}px, ${[...zig].reverse().join(', ')})`;
  const stubClip = `polygon(${zig.join(', ')}, ${W + pad}px ${H + pad}px, ${-pad}px ${H + pad}px)`;

  // Two copies of the ticket, each clipped to one side of the tear. They keep the
  // original ids (#ticket, #enter-btn) so the ticket styles still apply; the
  // copies come after the original in the DOM and are removed after ~2s.
  const makeHalf = (clip) => {
    const half = shell.cloneNode(true);
    half.classList.add('ticket-half');
    Object.assign(half.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${W}px`,
      clipPath: clip,
    });
    document.body.appendChild(half);
    return half;
  };
  const top = makeHalf(topClip);
  const stub = makeHalf(stubClip);
  shell.style.visibility = 'hidden';

  // 1. Tug — the ticket jolts as it's pulled.
  const tug = [
    { transform: 'translate(0, 0)' },
    { transform: 'translate(-3px, 2px) rotate(-0.6deg)' },
    { transform: 'translate(3px, -1px) rotate(0.6deg)' },
    { transform: 'translate(-2px, 0)' },
    { transform: 'translate(0, 0)' },
  ];
  top.animate(tug, { duration: 220, easing: 'ease-in-out' });
  stub.animate(tug, { duration: 220, easing: 'ease-in-out' });

  // 2. Tear — the stub hinges from the left notch, then drops off screen.
  stub.style.transformOrigin = `0 ${cutY}px`;
  stub.animate(
    [
      { transform: 'translate(0, 0) rotate(0deg)' },
      { transform: 'translate(4px, 6px) rotate(9deg)', offset: 0.22 },
      { transform: `translate(-30px, ${window.innerHeight}px) rotate(32deg)` },
    ],
    { duration: 1100, delay: 220, easing: 'cubic-bezier(0.5, 0, 0.9, 0.5)', fill: 'forwards' },
  );
  setTimeout(burstConfetti, 300);

  // 3. Launch — the ticket lifts, then zooms toward the guest and fades.
  top.animate(
    [
      { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: 'translateY(-10px) scale(1) rotate(-1.5deg)', opacity: 1, offset: 0.25 },
      { transform: 'translateY(-18px) scale(1.05) rotate(0deg)', opacity: 1, offset: 0.55 },
      { transform: 'translateY(-40px) scale(2.3) rotate(0deg)', opacity: 0 },
    ],
    { duration: 1500, delay: 220, easing: 'cubic-bezier(0.55, 0, 0.45, 1)', fill: 'forwards' },
  );

  // Disco ball shoots up out of frame.
  disco.animate(
    [{ transform: 'translateY(0)' }, { transform: 'translateY(-260px)' }],
    { duration: 700, delay: 900, easing: 'cubic-bezier(0.6, 0, 0.9, 0.4)', fill: 'forwards' },
  );

  // Warm spotlight flash as the ticket "opens".
  const flash = document.createElement('div');
  flash.className = 'intro-flash';
  document.body.appendChild(flash);
  flash.animate([{ opacity: 0 }, { opacity: 1, offset: 0.35 }, { opacity: 0 }], {
    duration: 900,
    delay: 950,
    easing: 'ease-out',
    fill: 'forwards',
  });

  // 4. Reveal the page underneath while the flash peaks.
  setTimeout(revealPage, 1100);
  setTimeout(() => {
    top.remove();
    stub.remove();
    flash.remove();
    intro.style.display = 'none';
  }, 2000);
}
