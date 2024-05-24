const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

const LINKS = {
    'gitea': 'https://git.sador.me/sadorowo',
    'instagram': 'https://instagram.com/sadorowo',
    'immich (self-hosted photo hosting)': 'https://photos.sador.me/',
    'email': 'mailto:contact@sador.me'
}

const MUSIC_METADATA = [
    {
        name: 'heavy metal',
        aliases: ['hm', 'heavy'],
        artists: [
            'Poisonblack',
            'Metallica'
        ]
    },
    {
        name: 'depressive suicidal black metal',
        aliases: ['dsbm'],
        artists: [
            'Totalselfhatred',
            'Lifelover',
            'минута агонии',
            'Decalius'
        ]
    },
    {
        name: 'black metal',
        aliases: ['bm', 'black'],
        artists: [
            'Behemoth',
            'Venom',
            'Mgła',
            'Watain',
            'Bathory',
            'Carpathian Forest',
            'Darkthrone',
            'Rotting Christ'
        ]
    }
]