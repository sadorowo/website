if (typeof age !== 'undefined') {
    const difference = (Date.now() - 1182722400000) / (1000 * 60 * 60 * 24 * 365);
    age.textContent = difference.toFixed(4);
}

if (typeof arrow !== 'undefined') {
    arrow.addEventListener('click', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
}

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const target = document.querySelector(event.target.hash);

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const switchTheme = document.getElementById('switch-theme');
const theme = localStorage.getItem('theme');

switchTheme.addEventListener('click', () => {
    if (theme === 'dark') {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }

    document.body.classList.toggle('dark');
});

if (theme === 'dark') {
    document.body.classList.add('dark');
}