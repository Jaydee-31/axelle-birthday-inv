// Fades each .reveal element up as it scrolls into view.
// Called once the ticket intro is dismissed.
function startPage() {
	const items = document.querySelectorAll(".reveal");
	if (!("IntersectionObserver" in window)) {
		items.forEach((el) => el.classList.add("in"));
		return;
	}
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("in");
				io.unobserve(entry.target);
			});
		},
		{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
	);
	items.forEach((el) => io.observe(el));
}

document.getElementById("rsvp-btn").addEventListener("click", openModal);
