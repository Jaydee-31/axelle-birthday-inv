// Builds the "My Eras" month-by-month gallery from GALLERY (config.js).
// A month whose photo fails to load falls back to a colored era card.
function renderGallery() {
	const grid = document.getElementById("era-grid");
	GALLERY.forEach((m, i) => {
		const tile = document.createElement("button");
		tile.type = "button";
		tile.className = "era-tile reveal no-photo";
		tile.style.setProperty("--era", m.color);
		tile.style.setProperty("--d", `${(i % 3) * 0.08}s`);
		tile.setAttribute("aria-label", `Month ${m.month}: ${m.era} era`);

		const frame = document.createElement("div");
		frame.className = "era-frame";
		const fallback = document.createElement("span");
		fallback.className = "era-emoji";
		fallback.textContent = m.emoji;
		frame.appendChild(fallback);

		if (m.photo) {
			const img = document.createElement("img");
			img.alt = `Axelle at ${m.month} month${m.month > 1 ? "s" : ""}`;
			img.loading = "lazy";
			img.addEventListener("load", () => tile.classList.remove("no-photo"));
			img.addEventListener("error", () => img.remove());
			img.src = m.photo;
			frame.appendChild(img);
		}

		const month = document.createElement("span");
		month.className = "era-month";
		month.textContent = m.month === 12 ? "Month 12 🎂" : `Month ${m.month}`;

		const name = document.createElement("span");
		name.className = "era-name";
		name.textContent = `${m.era} Era`;

		tile.append(frame, month, name);
		tile.addEventListener("click", () => {
			if (!tile.classList.contains("no-photo")) openLightbox(m);
		});
		grid.appendChild(tile);
	});
}

const lightbox = document.getElementById("lightbox");

function openLightbox(m) {
	document.getElementById("lightbox-img").src = m.photo;
	document.getElementById("lightbox-img").alt = `Axelle at ${m.month} months`;
	document.getElementById("lightbox-cap").textContent = `Month ${m.month} · ${m.era} Era ${m.emoji}`;
	lightbox.classList.add("open");
}

lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") lightbox.classList.remove("open");
});
