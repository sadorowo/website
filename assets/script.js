if (typeof age !== 'undefined') {
    const difference = (Date.now() - 1182722400000) / (1000 * 60 * 60 * 24 * 365);
    age.textContent = difference.toFixed(4);
}

if (typeof arrow_top !== 'undefined' && typeof arrow_bottom !== 'undefined') {
    [arrow_top, arrow_bottom].forEach(arrow => {
        arrow.addEventListener('click', () => {
            console.warn('scroll!')
            window.scrollTo({
                top: arrow === arrow_top ? 0 : document.body.scrollHeight,
                behavior: 'smooth'
            });
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

const theme = localStorage.getItem('theme');

switch_theme?.addEventListener('click', () => {
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