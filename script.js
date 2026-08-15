// ============================================================
// CONFIGURACIÓN
// ============================================================
// Solo necesitas cambiar estos datos.
// La portada y el audio se cambian desde la carpeta assets.

const song = {
  title: "Algo Especial",
  artist: "Carlos",
  dedication: "Para mi cuysite tiii?",
  endMessage: "Espero te haya gsutado amorcito"
};

// ============================================================
// ELEMENTOS
// ============================================================

const audio = document.getElementById("audio");

const welcomeScreen = document.getElementById("welcomeScreen");
const playerScreen = document.getElementById("playerScreen");
const openButton = document.getElementById("openButton");

const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const heroPlay = document.getElementById("heroPlay");
const heroPlayIcon = document.getElementById("heroPlayIcon");

const restartButton = document.getElementById("restartButton");
const muteButton = document.getElementById("muteButton");
const volumeIcon = document.getElementById("volumeIcon");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const trackDuration = document.getElementById("trackDuration");

const heartButtons = [
  document.getElementById("heroHeart"),
  document.getElementById("nowPlayingHeart"),
  document.getElementById("mobileHeart")
];

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const dedicationText = document.getElementById("dedicationText");

const sideSongTitle = document.getElementById("sideSongTitle");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");

const nowPlayingTitle = document.getElementById("nowPlayingTitle");
const nowPlayingArtist = document.getElementById("nowPlayingArtist");

const trackRow = document.getElementById("trackRow");
const endMessage = document.getElementById("endMessage");
const endText = document.getElementById("endText");
const replayButton = document.getElementById("replayButton");

// ============================================================
// DATOS
// ============================================================

songTitle.textContent = song.title;
artistName.textContent = song.artist;
dedicationText.textContent = song.dedication;

sideSongTitle.textContent = song.title;
trackTitle.textContent = song.title;
trackArtist.textContent = song.artist;

nowPlayingTitle.textContent = song.title;
nowPlayingArtist.textContent = song.artist;

endText.textContent = song.endMessage;
document.title = `${song.title} ♡`;

// ============================================================
// INTRO
// ============================================================

openButton.addEventListener("click", async () => {
  welcomeScreen.style.transition = "opacity .7s ease, transform .7s ease";
  welcomeScreen.style.opacity = "0";
  welcomeScreen.style.transform = "scale(1.03)";

  setTimeout(() => {
    welcomeScreen.classList.add("hidden");
    playerScreen.classList.remove("hidden");
  }, 650);

  try {
    await audio.play();
  } catch (error) {
    console.log("El navegador bloqueó la reproducción automática. Pulsa Play.");
  }
});

// ============================================================
// PLAY / PAUSE
// ============================================================

playButton.addEventListener("click", togglePlay);
heroPlay.addEventListener("click", togglePlay);
trackRow.addEventListener("click", togglePlay);

async function togglePlay() {
  if (audio.paused) {
    try {
      await audio.play();
    } catch (error) {
      console.error("No se pudo reproducir el audio:", error);
    }
  } else {
    audio.pause();
  }
}

function setPlayIcon() {
  const icon = audio.paused ? "assets/icon-play.svg" : "assets/icon-pause.svg";

  playIcon.src = icon;
  heroPlayIcon.src = icon;
}

audio.addEventListener("play", setPlayIcon);
audio.addEventListener("pause", setPlayIcon);

// ============================================================
// PROGRESO
// ============================================================

audio.addEventListener("loadedmetadata", () => {
  const time = formatTime(audio.duration);
  duration.textContent = time;
  trackDuration.textContent = time;
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;

  progress.value = percent;
  currentTime.textContent = formatTime(audio.currentTime);

  progress.style.background =
    `linear-gradient(to right, #ffffff ${percent}%, #454545 ${percent}%)`;
});

progress.addEventListener("input", () => {
  if (!audio.duration) return;

  audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ============================================================
// REINICIAR
// ============================================================

restartButton.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();
});

// ============================================================
// VOLUMEN
// ============================================================

muteButton.addEventListener("click", () => {
  audio.muted = !audio.muted;

  volumeIcon.src = audio.muted
    ? "assets/icon-mute.svg"
    : "assets/icon-volume.svg";
});

// ============================================================
// ME GUSTA
// ============================================================

heartButtons.forEach(button => {
  if (!button) return;

  button.addEventListener("click", () => {
    heartButtons.forEach(otherButton => {
      if (otherButton) otherButton.classList.toggle(
        "liked",
        !button.classList.contains("liked")
      );
    });
  });
});

// ============================================================
// FIN DE LA CANCIÓN
// ============================================================

audio.addEventListener("ended", () => {
  setPlayIcon();

  setTimeout(() => {
    endMessage.classList.add("show");
  }, 600);
});

// ============================================================
// REPETIR
// ============================================================

replayButton.addEventListener("click", () => {
  endMessage.classList.remove("show");
  audio.currentTime = 0;
  audio.play();
});
