const PARTY_COLORS = ["#ff8fc7", "#ff5fa8", "#c9a7f5", "#a45bf0", "#f5d07a", "#9ad7ff", "#ffffff"];

function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// Falling sequins: a mix of round sequins and paper-strip confetti.
function createConfetti() {
	const layer = document.getElementById("confetti-layer");
	for (let i = 0; i < 34; i++) {
		const c = document.createElement("div");
		const round = Math.random() < 0.5;
		c.className = "confetti" + (round ? " sequin" : "");
		const size = round ? 5 + Math.random() * 6 : 4 + Math.random() * 4;
		c.style.cssText = `
      left:${Math.random() * 100}%;
      width:${size}px; height:${round ? size : size * 2.2}px;
      background:${pick(PARTY_COLORS)};
      animation-duration:${6 + Math.random() * 8}s, ${1.2 + Math.random() * 1.6}s;
      animation-delay:${Math.random() * 10}s, ${Math.random() * 2}s;
    `;
		layer.appendChild(c);
	}
}

function createSparkles() {
	const layer = document.getElementById("sparkle-layer");
	for (let i = 0; i < 22; i++) {
		const s = document.createElement("div");
		s.className = "sparkle";
		const size = 2 + Math.random() * 4;
		s.style.cssText = `
      left:${Math.random() * 95}%;
      top:${Math.random() * 90}%;
      width:${size}px; height:${size}px;
      animation-duration:${2 + Math.random() * 3}s;
      animation-delay:${Math.random() * 4}s;
    `;
		layer.appendChild(s);
	}
}

// Friendship bracelet strand: colored beads with the birthday girl's name
// spelled out in letter beads in the middle.
function createBracelet() {
	const el = document.getElementById("bracelet");
	const word = `${EVENT.firstName} ✦ ${EVENT.age}`.toUpperCase();
	const side = 7;
	const addBead = () => {
		const b = document.createElement("span");
		b.className = "bead";
		b.style.background = pick(PARTY_COLORS);
		el.appendChild(b);
	};
	for (let i = 0; i < side; i++) addBead();
	for (const ch of word) {
		if (ch === " ") continue;
		const b = document.createElement("span");
		b.className = "bead letter";
		b.textContent = ch;
		el.appendChild(b);
	}
	for (let i = 0; i < side; i++) addBead();
}
