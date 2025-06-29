/*=============== FILTERS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tc => {
            tc.classList.remove('filters__active')
        })
        target.classList.add('filters__active')

        tabs.forEach(t => {
            t.classList.remove('filter-tab-active')
        })
        tab.classList.add('filter-tab-active')
    })
})

/*=============== Audio Play Section ===============*/
const audio = document.getElementById("myAudio");
const audioSource = document.getElementById("audioSource");
const playPauseIcon = document.getElementById("playPause");
const songTitle = document.getElementById("song-title");

const playlist = [
  { title: " blue", src: "assets/audio/blue.mp3" },
  { title: "Love You Like Do", src: "assets/audio/loveme.mp3" },
  { title: "Jeene Laga Hoon", src: "assets/audio/jeene.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
  audio.pause(); // Stop any current playback
  audioSource.src = playlist[index].src;
  songTitle.textContent = playlist[index].title;
  audio.load();

  // Delay before playing to ensure proper loading
  setTimeout(() => {
    audio.play().then(() => {
      playPauseIcon.className = "ri-pause-line";
      isPlaying = true;
    }).catch(error => {
      console.warn('Autoplay failed after user interaction:', error);
    });
  }, 100); // Slight delay to ensure browser readiness
}

// Play / Pause Button
playPauseIcon.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    playPauseIcon.className = "ri-pause-line";
    isPlaying = true;
  } else {
    audio.pause();
    playPauseIcon.className = "ri-play-line";
    isPlaying = false;
  }
});

// Next Song
document.getElementById("nextBtn").addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
});

// Previous Song
document.getElementById("prevBtn").addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
});

// Autoplay after first user click on website
function startMusicOnClick() {
  if (!isPlaying) {
    loadSong(currentSongIndex);
  }
  document.removeEventListener('click', startMusicOnClick);
  document.removeEventListener('touchstart', startMusicOnClick);
}

document.addEventListener('click', startMusicOnClick, { once: true });
document.addEventListener('touchstart', startMusicOnClick, { once: true });

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

// Previously selected theme
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Get current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// Apply previously selected theme
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

// Toggle theme
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
});

sr.reveal(`.profile__border`);
sr.reveal(`.profile__name`, { delay: 500 });
sr.reveal(`.profile__profession`, { delay: 600 });
sr.reveal(`.profile__social`, { delay: 700 });
sr.reveal(`.profile__info-group`, { interval: 100, delay: 700 });
sr.reveal(`.profile__buttons`, { delay: 800 });
sr.reveal(`.filters__content`, { delay: 900 });
sr.reveal(`.filters`, { delay: 1000 });
sr.reveal(`.`, { delay: 1000 });
// ✅ Reveal animation for music player with fade & scale
sr.reveal('.music-player', {
  origin: 'bottom',
  distance: '20px',
  duration: 1000,
  delay: 500,
  scale: 0.8,
  opacity: 0,
});