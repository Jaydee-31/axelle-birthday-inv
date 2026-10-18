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
// Drop each month's photo at assets/img/eras/month-NN.jpg (e.g. month-04.jpg),
// or point `photo` at any image. Months without a photo show an era card.
const GALLERY = [
	{ era: "Debut", emoji: "🤠", color: "#7cc8b0", photo: "assets/img/eras/1.jpg" },
	{ era: "Fearless", emoji: "✨", color: "#e9b44c", photo: "assets/img/eras/2.jpg" },
	{ era: "Speak Now", emoji: "💜", color: "#b58ad8", photo: "assets/img/eras/3.png" },
	{ era: "Red", emoji: "🧣", color: "#d9534f", photo: "assets/img/eras/4.png" },
	{ era: "1989", emoji: "🕶️", color: "#7fb8e0", photo: "assets/img/eras/5.png" },
	{ era: "reputation", emoji: "🐍", color: "#4a4a4e", photo: "assets/img/eras/6.jpg" },
	{ era: "Lover", emoji: "💗", color: "#f39bbd", photo: "assets/img/eras/7.png" },
	{ era: "folklore", emoji: "🌲", color: "#a9a49b", photo: "assets/img/eras/8.png" },
	{ era: "evermore", emoji: "🍂", color: "#b8754a", photo: "assets/img/eras/9.jpg" },
	{ era: "Midnights", emoji: "🌙", color: "#4b5a8c", photo: "assets/img/eras/10.png" },
	{ era: "TTPD", emoji: "🖋️", color: "#b9ae9c", photo: "assets/img/eras/11.jpg" },
	{ era: "Showgirl", emoji: "🪩", color: "#f47b20" }, // add photo: "assets/img/eras/12.jpg" when ready
].map((m, i) => ({
	month: i + 1,
	photo: `assets/img/eras/month-${String(i + 1).padStart(2, "0")}.jpg`,
	...m,
}));
