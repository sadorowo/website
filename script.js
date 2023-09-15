const contentContainer = document.getElementById('content');
const ageElement = document.getElementById('age');
const points = document.getElementById('points');

const box = document.getElementById('box');
const boxPoints = document.querySelector('#points span');

let bonusPoints = Number(localStorage.getItem('points') ?? 0);
let currentTheme = localStorage.getItem('theme') ?? 'light';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms * 1000))
async function updateOpacity(block, show) {
    if (!show) {
        block.style.opacity = '0';
        await wait(0.3);
        block.style.display = 'none';
    } else {
        block.style.display = 'block';
        await wait(0.3);
        block.style.opacity = '1';
    }
 
    block.classList.toggle('visible');
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}

function resetPoints() {
    localStorage.removeItem('points');
    bonusPoints = 0;
    boxPoints.textContent = bonusPoints;
}

// listeners
if (box) box.addEventListener('click', () => {
    bonusPoints++;
    localStorage.setItem('points', bonusPoints);
    boxPoints.textContent = bonusPoints;
})

window.onload = async () => {
    if (boxPoints) boxPoints.textContent = bonusPoints;
    if (box) await updateOpacity(box, true);

    await updateOpacity(contentContainer, true);
}

// update theme
if (currentTheme === 'dark')
    document.body.classList.add('dark');

// update age
if (typeof ageElement !== 'undefined') {
    const difference = (Date.now() - 1182722400000) / (1000 * 60 * 60 * 24 * 365);
    ageElement.innerText = difference.toFixed(4);
}