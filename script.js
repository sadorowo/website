// update age
function updateAge() {
    const difference = new Date().getFullYear() - 2007;
    age.textContent = difference;
}

// smooth scrolling
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const target = document.querySelector(event.target.hash);

        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// theme management
switch_theme?.addEventListener('click', () => {
    const theme = localStorage.getItem('theme');

    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark')
})

// run all tasks
if (typeof age !== 'undefined') updateAge()

// initial theme configuration
const theme = localStorage.getItem('theme');
if (theme === 'dark')
    document.body.classList.add('dark')

// ignore context menu
document.addEventListener('contextmenu', e => e.preventDefault());