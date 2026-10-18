import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { firebaseConfig, RESPONSES_COLLECTION } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Device ID helpers ────────────────────────────────────────────────────────

// Returns the stored device ID or generates + persists a new one.
function getOrCreateDeviceId() {
	let id = null;
	try {
		id = localStorage.getItem("axelle_bday_device_id");
	} catch (_) {}
	if (!id) {
		// Combine timestamp + random suffix for uniqueness.
		id = "dev_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
		try {
			localStorage.setItem("axelle_bday_device_id", id);
		} catch (_) {}
	}
	return id;
}

// Builds the fields that are always refreshed on every action.
function currentDeviceInfo() {
	return {
		userAgent: navigator.userAgent,
		platform: navigator.platform,
		language: navigator.language,
		screenSize: `${screen.width}x${screen.height}`,
	};
}

// ─── Main save function ───────────────────────────────────────────────────────

/**
 * Saves an RSVP action using deviceId as the document ID, so the same
 * browser never creates duplicate records.
 *
 * - New device  → creates a full document with firstSeenAt + all fields.
 * - Known device → updates only lastActionAt, device info, and the latest
 *                  guestName / response / party size.
 *
 * `counts` is { adults, kids } — both 0 when the guest can't make it.
 */
async function saveDeviceAction(guestName, response, counts = { adults: 0, kids: 0 }) {
	const deviceId = getOrCreateDeviceId();
	const deviceRef = doc(db, RESPONSES_COLLECTION, deviceId);
	const snapshot = await getDoc(deviceRef);

	const updatedFields = {
		...currentDeviceInfo(),
		lastActionAt: serverTimestamp(),
		guestName: guestName || null,
		response,
		adults: counts.adults,
		kids: counts.kids,
		totalGuests: counts.adults + counts.kids,
	};

	if (!snapshot.exists()) {
		await setDoc(deviceRef, {
			deviceId,
			firstSeenAt: serverTimestamp(),
			...updatedFields,
		});
	} else {
		await updateDoc(deviceRef, updatedFields);
	}
}

window.saveDeviceAction = saveDeviceAction;
