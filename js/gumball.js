const video = document.querySelector('.video');
const poster = document.querySelector('.video-poster');
const spacer = document.querySelector('.spacer');

let videoDuration = 0;
let lastScrollY = 0;
let isPrimed = false;
window.scrollTo(0, 0);


function updateVideo() {
  if (videoDuration) {
    const scrollable = spacer.clientHeight - window.innerHeight;
    const progress = Math.min(Math.max(lastScrollY / scrollable, 0), 1);
    video.currentTime = progress * videoDuration;
  }
  requestAnimationFrame(updateVideo);
}

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
});

video.addEventListener('loadedmetadata', () => {
  videoDuration = video.duration;
  video.currentTime = 0;
});

function primeVideo() {
  if (isPrimed) return;
  isPrimed = true;
  video.play()
    .then(() => {
      video.pause();
      video.currentTime = 0;
      poster.style.display = 'none';
    })
}

window.addEventListener('touchstart', primeVideo, { once: true });
window.addEventListener('click', primeVideo, { once: true });

requestAnimationFrame(updateVideo);
