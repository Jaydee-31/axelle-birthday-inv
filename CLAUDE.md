# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A digital invitation for Axelle's 1st birthday, themed as a Taylor Swift "Eras" party. The look is midnight-plum stage lighting, sequin confetti, a disco ball, a concert-ticket intro and a friendship-bracelet bead strand. It is a sibling of the christening invitation (`axelle-invitation`) and keeps the same architecture: plain HTML/CSS/JS with no build system, no dependencies and no package manager.

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
    ├── config.js         # guestName, EVENT details object
    ├── particles.js      # createConfetti(), createSparkles(), createBracelet(), PARTY_COLORS
    ├── audio.js          # Background music toggle (assets/audio/life_of_a_showgirl.mp3)
    ├── modal.js          # openModal(), RSVP yes/no handlers, burstConfetti()
    ├── page.js           # startPage() — scroll-in .reveal animations; RSVP button → openModal
    ├── intro.js          # "Open My Ticket" button → unlocks the page, calls startPage()
    └── init.js           # Binds EVENT → [data-event] elements, guest greeting, countdown, decor
```

Classic scripts load in the order above and share global state, so load order matters. `firebase.js` is a deferred module and exposes `window.saveDeviceAction`.

## Editing event details

All party details live in the `EVENT` object in `js/config.js`. Any element with `data-event="<key>"` is filled from it by `init.js`. To change the date, time, venue, map link, dress code or age, edit `EVENT` only, plus `dateISO`, which drives the "N days to go" countdown.

Things that are *not* driven by `EVENT`:
- `<title>` and Open Graph/Twitter meta tags in `index.html`
- Polaroid captions and section copy in `index.html`
- RSVP thank-you copy in `js/modal.js`

### Page flow

The ticket intro (`#intro`) is a fixed overlay. Until it is dismissed, `body.pre-show` hides `#page` and locks scrolling. The error screen keeps it that way. After the ticket is opened, `#page` is one scrolling page of stacked `<section>`s:

| Section | Content |
|---------|---------|
| `#hello` | Full-height greeting: "Hi, {guest}! You're Invited!" plus a scroll cue |
| `#eras` | "My Eras": three polaroids |
| `#details` | "The Party": date, time, venue (map link), dress code, countdown |
| `#rsvp` | "Are You Ready For It?" and the RSVP button (opens the modal) |
| footer | Friendship-bracelet bead strand |

Any element with class `reveal` fades up when it scrolls into view (`js/page.js`).

### RSVP storage

Responses are written to Firestore collection `birthday_responses` (`RESPONSES_COLLECTION`), keyed by a per-browser device ID in localStorage. The Firebase project is shared with the christening invitation, whose data lives in `guest_responses`. Firestore security rules must allow read/write on `birthday_responses`.

### Theme

The palette is set by CSS custom properties at the top of `css/styles.css` (`--pink`, `--lilac`, `--gold`, `--sky`, `--night`…). Fonts are Abril Fatface (headlines), Great Vibes (names), Playfair Display (body copy) and Quicksand (UI).

### Audio

The track is `assets/audio/life_of_a_showgirl.mp3` (path set in `js/audio.js`). If the file is missing, the music toggle hides itself.

### Responsive layout

Mobile-first: `#page` is constrained to `min(430px, 100vw)` and centered on desktop. A `max-height: 700px` media query shrinks the ticket intro for short phones, and `prefers-reduced-motion` disables the confetti, beams, looping animations and scroll reveals.
