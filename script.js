/* script.js */
document.getElementById('sw-lap').onclick = () => {
const li = document.createElement('li');
li.textContent = formatMs(swTime);
lapsEl.prepend(li);
};


document.getElementById('sw-reset').onclick = () => {
clearInterval(swInterval);
swRunning = false;
swTime = 0;
swDisplay.textContent = '00:00:00';
lapsEl.innerHTML = '';
};


function formatMs(ms) {
const totalSec = Math.floor(ms / 1000);
const h = Math.floor(totalSec / 3600).toString().padStart(2, '0');
const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
const s = (totalSec % 60).toString().padStart(2, '0');
return `${h}:${m}:${s}`;
}


// Timer
const timerInput = document.getElementById('timer-minutes');
const timerDisplay = document.getElementById('timer-display');
let timerInterval;


document.getElementById('start-timer').onclick = () => {
let seconds = parseInt(timerInput.value) * 60;
if (isNaN(seconds) || seconds <= 0) return alert('Enter minutes');
clearInterval(timerInterval);
timerInterval = setInterval(() => {
seconds--;
const m = Math.floor(seconds / 60).toString().padStart(2, '0');
const s = (seconds % 60).toString().padStart(2, '0');
timerDisplay.textContent = `${m}:${s}`;
if (seconds <= 0) {
clearInterval(timerInterval);
playTone('bell');
alert('⏲️ Timer Done');
}
}, 1000);
};


// World Clock
const worldTimes = document.getElementById('world-times');
const zones = ['Asia/Kolkata', 'Europe/London', 'America/New_York', 'Asia/Tokyo'];
function updateWorld() {
worldTimes.innerHTML = '';
zones.forEach(tz => {
const li = document.createElement('li');
const now = new Date().toLocaleTimeString('en-US', { timeZone: tz });
li.textContent = `${tz}: ${now}`;
worldTimes.appendChild(li);
});
}
setInterval(updateWorld, 1000);
updateWorld();


// Tone
function playTone(type) {
const ctx = new (window.AudioContext || window.webkitAudioContext)();
const o = ctx.createOscillator();
const g = ctx.createGain();
o.connect(g);
g.connect(ctx.destination);
if (type === 'beep') o.frequency.value = 800;
if (type === 'chime') o.frequency.value = 500;
if (type === 'bell') o.frequency.value = 300;
o.type = 'sine';
o.start();
g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2);
o.stop(ctx.currentTime + 2);
}