# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A digital invitation for Axelle's 1st birthday: a baby's birthday party with a Taylor Swift twist, styled after a *Life of a Showgirl* party backdrop. The look is a warm cream party wall with tangerine, mint, bubblegum-pink and ivory balloons, silver sequins, an orange tinsel fringe, glitter-orange lettering, a vinyl-record "1", letter-bead signs, a silver disco ball, a concert-ticket intro and a friendship-bracelet bead strand. It is a sibling of the christening invitation (`axelle-invitation`) and keeps the same architecture: plain HTML/CSS/JS with no build system, no dependencies and no package manager.

## Running Locally

Serve it with any static file server. ES modules (`js/firebase.js`) don't load over `file://`.

```
python -m http.server 8080
```

Guest name personalization is driven by a URL parameter: `index.html?guest=GuestName`. Without it, an error screen ("This ticket is missing a guest name") shows.

## Structure

```
├── index.html            # Markup only — no inline CSS or JS
├── responses.html        # Admin view of RSVPs (reads Firestore)
├── css/styles.css        # All styles and animations
└── js/
    ├── error-handler.js  # Swallows/logs global errors
    ├── firebase-config.js# ES module: firebaseConfig + RESPONSES_COLLECTION (shared with responses.html)
    ├── firebase.js       # ES module: window.saveDeviceAction(guestName, response)
    ├── config.js         # guestName, EVENT details, DRESS_COLORS, GALLERY
    ├── particles.js      # createConfetti(), createSparkles(), createBalloons(), createFringe(), createBeadBanners(), createBracelet(), PARTY_COLORS
    ├── audio.js          # Background music toggle (assets/audio/life_of_a_showgirl.mp3)
    ├── modal.js          # openModal(), RSVP yes/no handlers, burstConfetti()
    ├── countdown.js      # startCountdown() — live days/hours/mins/secs to EVENT.dateISO
    ├── gallery.js        # renderGallery() from GALLERY + photo lightbox
    ├── page.js           # startPage() — scroll-in .reveal animations; RSVP button → openModal
    ├── intro.js          # "Open My Ticket" button → unlocks the page, calls startPage()
    └── init.js           # Binds EVENT → [data-event] elements, guest greeting, countdown, decor
```

Classic scripts load in the order above and share global state, so load order matters. `firebase.js` is a deferred module and exposes `window.saveDeviceAction`.

## Editing event details

All party details live in the `EVENT` object in `js/config.js`. Any element with `data-event="<key>"` is filled from it by `init.js`. To change the date, time, venue, map link, dress code or age, edit `EVENT` only. `dateISO` drives the live countdown, so keep it in sync with `timeLabel`. Dress-code swatches come from `DRESS_COLORS`.

Things that are *not* driven by `EVENT`:
- `<title>` and Open Graph/Twitter meta tags in `index.html`
- Polaroid captions and section copy in `index.html`
- RSVP thank-you copy in `js/modal.js`

### Page flow

The ticket intro (`#intro`) is a fixed overlay. Until it is dismissed, `body.pre-show` hides `#page` and locks scrolling. The error screen keeps it that way. After the ticket is opened, `#page` is one scrolling page of stacked `<section>`s:

| Section | Content |
|---------|---------|
| `#hello` | Tinsel fringe, vinyl "1", "LIFE OF A LITTLE SHOWGIRL" bead sign, "Hi, {guest}! You're Invited!" |
| `#countdown` | Live countdown on a silver sequin panel; switches to "It's Showtime!" after the start time |
| `#eras` | "My Eras": 12 months, one Taylor era per month in album release order (from `GALLERY`) |
| `#details` | "The Party": date, time, venue (map link) |
| `#dress-code` | Dress code, color swatches, sequins/feathers/fringe tips, bracelet-trade note |
| `#rsvp` | "Are You Ready For It?" and the RSVP button (opens the modal) |
| footer | Friendship-bracelet bead strand |

### Monthly photos

Put each month's photo at `assets/img/eras/month-NN.jpg` (`month-01.jpg` … `month-12.jpg`), or set `photo` on that month in `GALLERY`. Months 1 and 3 currently point at `polaroid-1.png` and `polaroid-2.png`. A month whose photo is missing shows a colored era card with an emoji instead. Tapping a month that has a photo opens it in a lightbox.

Any element with class `reveal` fades up when it scrolls into view (`js/page.js`).

### RSVP storage

Responses are written to Firestore collection `birthday_responses` (`RESPONSES_COLLECTION`), keyed by a per-browser device ID in localStorage. The RSVP pop-up has two steps. Step 1 is yes/no. On "yes", step 2 asks for party size with +/− steppers: Adults (1–10, including the guest) and Kids (0–10). Each document stores `response`, `adults`, `kids` and `totalGuests` (all 0 for "no"). `responses.html` totals the headcount and flags older "yes" RSVPs that have no count. The Firebase project is shared with the christening invitation, whose data lives in `guest_responses`. Firestore security rules must allow read/write on `birthday_responses`.

### Theme

The palette is set by CSS custom properties at the top of `css/styles.css` (`--orange`, `--mint`, `--pink`, `--cream`, `--ivory`, `--silver`, `--ink`… plus a `--sequins` texture). `.glitter` gives orange glitter lettering and `.mint` gives mint lettering. JS decor colours come from `PARTY_COLORS` in `js/particles.js`. Fonts are Fredoka (headlines), Pacifico (names and greeting) and Quicksand (body/UI). `.reveal` elements can be staggered with an inline `style="--d: 0.2s"`.

### Audio

The track is `assets/audio/life_of_a_showgirl.mp3` (path set in `js/audio.js`). If the file is missing, the music toggle hides itself.

### Responsive layout

Mobile-first: `#page` is constrained to `min(430px, 100vw)` and centered on desktop. A `max-height: 700px` media query shrinks the ticket intro for short phones, and `prefers-reduced-motion` disables the confetti, balloons, looping animations and scroll reveals.
