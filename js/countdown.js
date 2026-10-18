// Live countdown to EVENT.dateISO. Swaps to "It's Showtime!" once it passes.
function startCountdown() {
	const target = new Date(EVENT.dateISO).getTime();
	const grid = document.getElementById("countdown-grid");
	const done = document.getElementById("countdown-done");
	const out = {
		days: document.getElementById("cd-days"),
		hours: document.getElementById("cd-hours"),
		mins: document.getElementById("cd-mins"),
		secs: document.getElementById("cd-secs"),
	};
	const pad = (n) => String(n).padStart(2, "0");

	function tick() {
		const ms = target - Date.now();
		if (isNaN(ms) || ms <= 0) {
			grid.hidden = true;
			done.hidden = false;
			clearInterval(timer);
			return;
		}
		const s = Math.floor(ms / 1000);
		out.days.textContent = Math.floor(s / 86400);
		out.hours.textContent = pad(Math.floor((s % 86400) / 3600));
		out.mins.textContent = pad(Math.floor((s % 3600) / 60));
		out.secs.textContent = pad(s % 60);
	}

	const timer = setInterval(tick, 1000);
	tick();
}
