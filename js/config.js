const params = new URLSearchParams(window.location.search);
const guestName = (params.get("guest") || "").trim() || null;

if (!guestName) {
	document.getElementById("error-screen").style.display = "flex";
	document.getElementById("intro").style.display = "none";
}

// ─── Party details ────────────────────────────────────────────────────────────
// Every element with data-event="<key>" gets its text from here (see init.js).
// TODO: confirm date, time and venue before sending links out.
const EVENT = {
	name: "Axelle Bree",
	firstName: "Axelle",
	age: "1",
	ageOrdinal: "1st",
	partyTitle: "The Eras Party",
	dateISO: "2026-11-06T16:00:00+08:00", // drives the live countdown — keep in sync with timeLabel
	dateLabel: "November 6, 2026",
	dayLabel: "Friday",
	monthShort: "Nov",
	dayNum: "6",
	timeLabel: "4:00 PM",
	timeSub: "'til the party's over",
	durationHours: 4, // end time for the Google Calendar event (start + this many hours)
	venueName: "DRV Family Resort",
	venueAddress: "Pinatilan, Valencia City, Bukidnon",
	mapUrl: "https://maps.app.goo.gl/oPrpNHcZyeuhMvia6",
	dressCode: "Showgirl Chic",
	dressCodeSub: "Come dressed in your favorite Era — sequins, feathers & fringe strongly encouraged!",
};

// Dress-code color swatches (taken from the party decor).
const DRESS_COLORS = [
	{ name: "Tangerine", hex: "#f47b20" },
	{ name: "Mint", hex: "#8fd3bf" },
	{ name: "Bubblegum", hex: "#f6a9c5" },
	{ name: "Silver", hex: "linear-gradient(135deg, #f4f5f7, #b9bec6 50%, #eef0f2)" },
];

// ─── First-year gallery: one Taylor era per month, in album release order ────
// Each month loads assets/img/eras/web/month-NN.jpg — small (~200 KB) web copies
// of the originals in assets/img/eras/. Keep new photos ≤1400px / a few hundred KB,
// or point `photo` at any image. Months without a photo show an era card.
const GALLERY = [
	{ era: "Debut", emoji: "🤠", color: "#7cc8b0" },
	{ era: "Fearless", emoji: "✨", color: "#e9b44c" },
	{ era: "Speak Now", emoji: "💜", color: "#b58ad8" },
	{ era: "Red", emoji: "🧣", color: "#d9534f" },
	{ era: "1989", emoji: "🕶️", color: "#7fb8e0" },
	{ era: "reputation", emoji: "🐍", color: "#4a4a4e" },
	{ era: "Lover", emoji: "💗", color: "#f39bbd" },
	{ era: "folklore", emoji: "🌲", color: "#a9a49b" },
	{ era: "evermore", emoji: "🍂", color: "#b8754a" },
	{ era: "Midnights", emoji: "🌙", color: "#4b5a8c" },
	{ era: "TTPD", emoji: "🖋️", color: "#b9ae9c" },
	{ era: "Showgirl", emoji: "🪩", color: "#f47b20" },
].map((m, i) => ({
	month: i + 1,
	photo: `assets/img/eras/web/month-${String(i + 1).padStart(2, "0")}.jpg`,
	...m,
}));
