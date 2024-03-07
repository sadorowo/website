const contentContainer = document.getElementById('content');

const swapButton = document.getElementById('swap');
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
        block.style.display = 'flex';
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

function swapContent() {
    if (window.innerWidth < 768) {
        contentContainer.style.flexDirection =
            contentContainer.style.flexDirection === 'column-reverse' ? 'column' : 'column-reverse';
    } else {
        contentContainer.style.flexDirection =
            contentContainer.style.flexDirection === 'row-reverse' ? 'row' : 'row-reverse';
    }
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
}

// update theme
if (currentTheme === 'dark')
    document.body.classList.add('dark');

// update age
if (ageElement) {
    const difference = (Date.now() - 1182722400000) / (1000 * 60 * 60 * 24 * 365);
    ageElement.innerText = difference.toFixed(4);
}

swapButton.addEventListener('click', swapContent);

const accordions = document.querySelectorAll('.accordion');

function closeOtherAccordions(accordion) {
    accordions.forEach(acc => {
        if (acc !== accordion) {
            const panel = accordion.children[1];
            
            acc.classList.remove('active');
            panel.style.maxHeight = null;
        }
    });
}

function openAccordion(accordion) {
    closeOtherAccordions(accordion);

    const panel = accordion.children[1];
    accordion.classList.toggle('active');
    
    console.log(panel, panel.style.maxHeight)
    if (panel.style.maxHeight)
        panel.style.maxHeight = null
    else
        panel.style.maxHeight = panel.scrollHeight + "px"
}

accordions.forEach(accordion => {
    accordion.addEventListener('click', () => openAccordion(accordion));
});

// Hide or show columns
const columns = document.querySelectorAll('#content > div');

function showColumn(event, column) {
    // Check if the click was on actual column, not on its children
    if (event.target !== column) return;

    columns.forEach(col => {
        if (col === column) return;

        col.dataset.closed = 'true';
    });

    column.dataset.closed = column.dataset.closed === 'true' ? 'false' : 'true';
}

// Apply only to desktop
if (window.innerWidth > 768) {
    columns.forEach(column => {
        column.addEventListener('click', (event) => showColumn(event, column));
    });
}