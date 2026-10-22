// Showgirl party palette: tangerine, mint, bubblegum, ivory, silver.
const PARTY_COLORS = ["#f47b20", "#f9a35c", "#8fd3bf", "#5fbfa3", "#f6a9c5", "#ee86ae", "#f3e6cf", "#c9cdd3"];

function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// Falling sequins: a mix of round sequins and paper-strip confetti.
function createConfetti() {
	const layer = document.getElementById("confetti-layer");
	for (let i = 0; i < 18; i++) {
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
	for (let i = 0; i < 12; i++) {
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

// Balloons drifting up behind the page.
function createBalloons() {
	const layer = document.getElementById("balloon-layer");
	for (let i = 0; i < 8; i++) {
		const b = document.createElement("div");
		b.className = "balloon";
		const size = 34 + Math.random() * 22;
		b.style.cssText = `
      left:${4 + (i / 8) * 88 + Math.random() * 6}%;
      --size:${size}px;
      --color:${PARTY_COLORS[i % PARTY_COLORS.length]};
      animation-duration:${16 + Math.random() * 12}s, ${3 + Math.random() * 2}s;
      animation-delay:${-Math.random() * 24}s, ${-Math.random() * 3}s;
    `;
		layer.appendChild(b);
	}
}

// Orange tinsel fringe curtain across the top of the greeting.
function createFringe() {
	const el = document.getElementById("fringe");
	const tones = ["#f47b20", "#ff9a3d", "#e2660e", "#ffb862"];
	for (let i = 0; i < 44; i++) {
		const s = document.createElement("span");
		s.style.cssText = `
      height:${46 + Math.random() * 30}px;
      background:linear-gradient(180deg, ${pick(tones)}, ${pick(tones)});
      animation-delay:${-Math.random() * 3}s;
      animation-duration:${2.4 + Math.random() * 1.6}s;
    `;
		el.appendChild(s);
	}
}

// Letter-bead banners like the party sign: data-beads="LINE ONE|LINE TWO".
// Spaces become little pink star beads.
function createBeadBanners() {
	document.querySelectorAll("[data-beads]").forEach((el) => {
		el.dataset.beads.split("|").forEach((line) => {
			const row = document.createElement("div");
			row.className = "bead-row";
			for (const ch of line) {
				const b = document.createElement("span");
				if (ch === " ") {
					b.className = "bead-star";
					b.textContent = "★";
				} else {
					b.className = "bead-letter";
					b.textContent = ch;
				}
				row.appendChild(b);
			}
			el.appendChild(row);
		});
	});
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

// Dressing-room vanity bulbs around the countdown: a row along the top and
// bottom (corners included) and a column down each side.
function createVanityLights() {
	const el = document.getElementById("vanity-lights");
	const strips = { top: 9, bottom: 9, left: 3, right: 3 };
	let n = 0;
	for (const [side, count] of Object.entries(strips)) {
		const strip = document.createElement("div");
		strip.className = `vanity-strip ${side}`;
		for (let i = 0; i < count; i++) {
			const b = document.createElement("span");
			b.className = "bulb";
			b.style.setProperty("--d", `${(n++ % 2) * -1.6}s`);
			strip.appendChild(b);
		}
		el.appendChild(strip);
	}
}
