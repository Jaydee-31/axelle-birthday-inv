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
	dateISO: "2026-11-06T15:00:00+08:00",
	dateLabel: "November 6, 2026",
	dayLabel: "Friday",
	monthShort: "Nov",
	dayNum: "6",
	timeLabel: "4:00 PM",
	timeSub: "'til the party's over",
	venueName: "Guzman Residence",
	venueAddress: "P-12, Pinatilan, Valencia City, Bukidnon",
	mapUrl: "https://maps.google.com/?q=Pinatilan,+Valencia+City,+Bukidnon",
	dressCode: "Come dressed in your favorite Era",
	dressCodeSub: "Sequins, cowboy boots & glitter strongly encouraged",
};

