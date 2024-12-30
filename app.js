import { generateMusic } from './api.js';

let midiUrl;

// Generate Music
async function generateMusic() {
    const prompt = document.getElementById('prompt').value || 'simple melody';
    const url = await generateMusic(prompt);

    if (url) {
        midiUrl = url;
        document.getElementById('downloadLink').href = midiUrl;
        document.getElementById('downloadLink').style.display = 'inline';
    }
}

// Play Music
function playMusic() {
    if (!midiUrl) {
        alert('Please generate music first!');
        return;
    }

    const audio = new Audio(midiUrl);
    audio.play();
}

// Share on Twitter
function shareOnTwitter() {
    if (!midiUrl) {
        alert('Please generate music first!');
        return;
    }

    const text = encodeURIComponent('Check out this AI-generated song from DJAPE Music Lab!');
    const url = encodeURIComponent(midiUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// Visualizer (Optional, Enhances UX)
const canvas = document.getElementById('musicVisualizer');
const ctx = canvas.getContext('2d');

function drawVisualizer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 100, 200, 50);
}

setInterval(drawVisualizer, 1000);
