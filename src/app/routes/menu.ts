const Trainees = {
    text: 'Allievi',
    link: '/allievi',
    icon: 'icon-people'
};
const Trainers = {
    text: 'Istruttori',
    link: '/istruttori',
    icon: 'icon-user'
};

const ClassSession = {
    text: 'Sessioni In Aula',
    link: '/sessioni-in-aula',
    icon: 'icon-graduation'
};

const BoatSession = {
    text: 'Sessioni In Barca',
    link: '/sessioni-in-barca',
    icon: 'icon-anchor'
};

const Reports = {
    text   : 'Reports',
    link   : '/reports',
    icon   : 'icon-pie-chart',
    submenu: [
        {
            text: 'first',
            link: '/reports/first'
        },
        {
            text: 'second',
            link: '/reports/second'
        }
    ]
};

export const menu = [
    ClassSession,
    BoatSession,
    Trainees,
    Trainers,
    Reports
];
