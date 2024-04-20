const COMMANDS = [
    {
        name: 'help',
        description: 'shows list of all commands',
        usage: '<command?>',
        usage_examples: ['help help', 'help music'],
        arguments: [
            {
                name: 'command',
                description: 'command name',
                required: false,
                check: (command) => !!command && !COMMANDS.find(c => c.name === command)
                    ? "invalid command"
                    : null
            }
        ],
        output: (command) => !!command
            ? getCommandHelp(command)
            : COMMANDS
            .map(c => `${c.name}: ${c.description}`)
            .join('\n')
    },
    {
        name: 'music',
        description: 'show information about my music taste',
        usage: '<genre?>',
        usage_examples: ['music heavy metal', 'music gothic metal', 'music'],
        arguments: [
            {
                name: 'genre',
                description: 'music genre',
                required: false,
                multiword: true,
                check: (genre) => !!genre && !Object.keys(MUSIC_METADATA).includes(genre)
                    ? "no informations about this music genre, run 'music' command to find available genres"
                    : null
            }
        ],
        output: (...partialGenre) => {
            const genre = partialGenre.join(' ')

            return !!genre
                ? getGenreHelp(genre)
                : `
                    i am listening to these music genres:

                    ${Object.keys(MUSIC_METADATA)
                        .map(genre => `${genre} - more info: 'music ${genre}'`)
                        .join('\n')}
                `
        }
    },
    {
        name: 'hardware',
        description: 'show information about my hardware',
        usage: '',
        usage_examples: ['hardware'],
        arguments: [],
        output: () => [
            'cpu: intel i5-4590',
            'gpu: radeon rx 5500 xt',
            'bluetooth & wi-fi: fenvi t919',
            'keyboard: microsoft all-in-one media keyboard',
            'headphones: beats studio buds',
            'display: lg m2450d',
            'motherboard: asrock h97m pro4',
            'ram: 16gb ddr3',
            'ssd: adata 500gb'
        ].join('\n')
    },
    {
        name: 'software',
        description: 'show information about my software',
        usage: '',
        usage_examples: ['software'],
        arguments: [],
        output: () => [
            'recording/editing:',
            '',
            'gimp',
            'davinci resolve',
            '',
            'programming/web dev.:',
            '',
            'vscodium',
            'android studio',
            'ssh in terminal',
            'postman',
            'git',
            'internet:',
            'firefox',
            '',
            'music - tidal',
            '',
            'other:',
            '',
            'bitwarden (self-hosted)',
            'libreoffice'
        
        ].join('\n')
    },
    {
        name: 'plans',
        description: 'show my plans',
        usage: '',
        usage_examples: ['plans'],
        arguments: [],
        output: () => [
            'i want to:',
            '',
            'change style/look',
            'have maximum privacy',
            'forget about my past',
            'be happy',
            'be successful',
            'meet some kind and respective people'
        ].join('\n')
    },
    {
        name: 'links',
        description: 'show URLs related to me & my services',
        usage: '',
        usage_examples: ['links'],
        arguments: [],
        output: () => Object.entries(LINKS)
            .map(([name, url]) => `<a href="${url}" target="_blank">${name}</a>`)
            .join('\n')
    },
    {
        name: 'curl',
        description: 'open website in new tab',
        usage: '<website>',
        usage_examples: ['curl google.com'],
        arguments: [
            {
                name: 'url',
                description: 'URL to open',
                required: true,
                multiword: true,
                check: (url) => URL_REGEX.test(url)
                    ? null
                    : "invalid URL"
            }
        ],
        output: (url) => {
            Object.assign(document.createElement('a'), {
                target: '_blank',
                rel: 'noopener noreferrer',
                href: url,
              }).click();

            return ''
        }
    }
]

function getGenreHelp(genreName) {
    const genre = MUSIC_METADATA[genreName];

    if (!genre) return 'music: no informations about this music genre';

    return `
        i enjoy listening to ${genreName}.
        example ${genreName} artists/bands that i am listening to:

        ${genre.join('\n')}
    `
}

function getCommandHelp(commandName) {
    const command = COMMANDS.find(c => c.name === commandName)

    if (!command) return 'help: invalid command';

    return `
        -> ${command.name} command

        ${command.description}

        usage:
        ${command.name} ${command.usage}

        arguments:
            ${command.arguments
            .map(a => `${a.required ? 'required: ' : ''}${a.name} - ${a.description}`)
            .join('\n')}

        examples:
            ${command.usage_examples.join('\n')}
    `
}