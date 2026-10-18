// Shared by js/firebase.js (invitation) and responses.html (admin view).
// Currently points at the christening's Firebase project; RSVPs for the
// birthday go to their own collection so the two events never mix.
// Swap in a new project's config here if you create one.
export const firebaseConfig = {
	apiKey: "AIzaSyCPgtQoMtq51J88lgo3UHqfdRHG5Br3Q_c",
	authDomain: "axelle-invitation.firebaseapp.com",
	projectId: "axelle-invitation",
	storageBucket: "axelle-invitation.firebasestorage.app",
	messagingSenderId: "598307044937",
	appId: "1:598307044937:web:9ca20b4ace929e82fbc998",
	measurementId: "G-E8CJS7LNSZ",
};

export const RESPONSES_COLLECTION = "birthday_responses";
