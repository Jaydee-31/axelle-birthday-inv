// Drop a track at assets/audio/audio.mp3 to enable background music.
// If the file is missing, the toggle button hides itself.
let musicPlaying = false;
const audioBtn = document.getElementById("audio-btn");
const backgroundMusic = new Audio("assets/audio/life_of_a_showgirl.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

backgroundMusic.addEventListener("error", () => {
	audioBtn.style.display = "none";
});

function setPlaying(on) {
	musicPlaying = on;
	audioBtn.textContent = on ? "🔊" : "🔇";
}

function tryPlayAmbient() {
	backgroundMusic
		.play()
		.then(() => setPlaying(true))
		.catch(() => {});
}

audioBtn.addEventListener("click", () => {
	if (!musicPlaying) {
		tryPlayAmbient();
	} else {
		backgroundMusic.pause();
		setPlaying(false);
	}
});
