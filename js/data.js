const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const LINKS = {
    'gitea': 'https://git.sador.me/sadorowo',
    'instagram': 'https://instagram.com/sadorowo',
    'immich': 'https://photos.sador.me/',
    'email': 'mailto:contact@sador.me'
}

const MUSIC_METADATA = {
    'heavy metal': [
        'Poisonblack',
        'Metallica'
    ],
    'gothic metal': [
        'Draconian',
        'Beseech',
        'To/Die/For',
        'For My Pain...',
        'Charon',
        'Entwine'
    ],
    'death suicidal black metal': [
        'minuta agonii',
        'Decalius'
    ],
    'black metal': [
        'Behemoth',
        'Venom',
        'Mgła',
        'Watain',
        'Bathory',
        'Carpathian Forest',
        'Darkthrone'
    ],
    'nu metal': [
        'Slipknot',
        'Evanescence'
    ],
    'other genres': [
        'Rammstein'
    ]
}