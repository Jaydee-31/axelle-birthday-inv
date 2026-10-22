// Gift wishlist: hidden until the "Show my wishlist" button is tapped.
// Starts with WISHLIST (config.js); firebase.js swaps in the list saved on
// wishlist.html once it loads.
function fillWishlist(items) {
	const list = document.getElementById("wish-list");
	list.replaceChildren();
	// An empty list hides the whole section.
	document.getElementById("wishlist").hidden = items.length === 0;

	items.forEach((w, i) => {
		const li = document.createElement("li");
		li.className = "wish-item";
		li.style.setProperty("--i", i);
		li.innerHTML = '<span class="wish-icon"></span><span class="wish-text"><strong></strong></span>';
		li.querySelector(".wish-icon").textContent = w.emoji || "🎁";
		li.querySelector("strong").textContent = w.item;
		if (w.note) {
			const note = document.createElement("small");
			note.textContent = w.note;
			li.querySelector(".wish-text").appendChild(note);
		}
		list.appendChild(li);
	});
}

function renderWishlist() {
	const btn = document.getElementById("wish-btn");
	const list = document.getElementById("wish-list");

	fillWishlist(WISHLIST);

	btn.addEventListener("click", () => {
		const open = list.hidden;
		list.hidden = !open;
		btn.setAttribute("aria-expanded", open);
		btn.textContent = open ? "🎀 Hide my wishlist" : "🎀 Show my wishlist";
	});
}
