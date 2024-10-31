let AutoLoader = {
    stylesheets: {
        'main': 'css/style.css',
        'theme': 'css/bootstrap-vibes.css',
    },

    scripts: [
        'data/translations.js',
        'js/theme-engine.js',
        'js/translation-engine.js'
    ],

    languages: {
        'en': 'English',
        'pl': 'polski',
        'sx': 'ślōnski'
    },

    themes: {
        'bootstrap-darkly': 'Darkly',
        'bootstrap-flatly': 'Flatly',
        'bootstrap-minty': 'Minty',
        'bootstrap-morph': 'Morph',
        'bootstrap-sketchy': 'Sketchy',
        'bootstrap-solar': 'Solar',
        'bootstrap-vibes': 'Vibes',
        'bootstrap-yeti': 'Yeti'
    },

    defaultLanguage: 'en',
    defaultTheme: 'bootstrap-darkly',

    promises: [],

    loadResources() {

        Object.keys(this.stylesheets).forEach(function (key) {
            const link = document.createElement('link');

            link.id = key;
            link.rel = 'stylesheet';
            link.href = this.stylesheets[key];

            document.head.appendChild(link);

            AutoLoader.promises.push(new Promise((resolve) => {
                link.onload = resolve;
            }));
        }.bind(this));

        this.scripts.forEach(function (scriptSrc) {
            const script = document.createElement('script');

            script.src = scriptSrc;

            document.body.appendChild(script);

            AutoLoader.promises.push(new Promise((resolve) => {
                script.onload = resolve;
            }));
        });

        return Promise.all(this.promises);
    },
};

window.addEventListener("load", function() {
    AutoLoader.loadResources().then(() => {
        ThemeEngine.switchTheme(ThemeEngine.getTheme());
        TranslationEngine.translateDocument(TranslationEngine.getLanguage());
    });
});