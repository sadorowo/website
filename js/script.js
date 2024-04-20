// update age
function updateAge() {
    const difference = (Date.now() - 1182722400000) / (1000 * 60 * 60 * 24 * 365);
    age.textContent = difference.toFixed(4);
}

// wrapper for setInterval
const runEvery = (task, ms) => {
    task()
    setInterval(task, ms)
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

// command management
const TAB = '    ';

command?.addEventListener('focusout', () => {
    setTimeout(() => command.focus(), 0);
})

command?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const [commandName, ...args] = e.target.value.split(' ') || [e.target.value]
        const command = COMMANDS.find(c => c.name === commandName)

        if (!command) {
            result.textContent = 'invalid command';
            return
        }

        const { arguments, output } = command;
        for (const i in arguments) {
            const argument = arguments[i]

            if (argument.required && !args[i]) {
                result.textContent = `argument ${argument.name} is missing`;
                return
            }

            const errorMessage = argument.check(argument.multiword ? args.join(' ') : args[i])

            if (typeof errorMessage === 'string') {
                result.textContent = `error while executing ${command.name}: ${errorMessage}`;
                return
            }
        }

        result.innerHTML = output(...args).replaceAll(TAB, '')
    }
})

// run all tasks
if (typeof age !== 'undefined') runEvery(updateAge, 10 * 1000)
command?.focus()

// initial theme configuration
const theme = localStorage.getItem('theme');
if (theme === 'dark')
    document.body.classList.add('dark')