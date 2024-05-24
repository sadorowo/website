// update age
function updateAge() {
    const difference = (Date.now() - 1182722400000) / (1000 * 60 * 60 * 24 * 365);
    age.textContent = difference.toFixed(4);
}

// process command function
function processCommand(input) {
    const [commandName, ...args] = input.split(' ') || [input]
    const suppliedCommand = COMMANDS.find(c => c.name === commandName)

    if (!suppliedCommand) {
        result.textContent = '';
        return;
    }

    const { arguments, output } = suppliedCommand;
    for (const i in arguments) {
        const argument = arguments[i]

        if (argument.required && !args[i]) {
            result.textContent = `argument ${argument.name} is missing`;
            return
        }

        const errorMessage = argument.check(argument.multiword ? args.join(' ') : args[i])

        if (typeof errorMessage === 'string') {
            result.textContent = `error while executing ${suppliedCommand.name}: ${errorMessage}`;
            return
        }
    }

    result.innerHTML = output(...args).replaceAll(TAB, '')
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

command?.addEventListener('input', () => processCommand(command.value))

// run all tasks
if (typeof age !== 'undefined') runEvery(updateAge, 10 * 1000)
command?.focus()

// initial theme configuration
const theme = localStorage.getItem('theme');
if (theme === 'dark')
    document.body.classList.add('dark')

// listen to help tooltip
help.addEventListener('click', () => {
    command.value = 'help';
    processCommand('help');
})

// ignore context menu
document.addEventListener('contextmenu', e => e.preventDefault());

// check for command in input
if (command?.value) processCommand(command.value);