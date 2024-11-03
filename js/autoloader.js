const AutoLoader = {
    stylesheets: {
        'main': 'css/style.css',
        'images': 'css/fontawesome.css',
        'theme': 'css/bootstrap-yeti.css',
    },

    scripts: [
        'js/translation-engine.js',
        'js/settings-engine.js',
        'js/paragraph-engine.js',
        'js/theme-engine.js',

        'data/settings.js',
        'data/translations.js',
    ],

    languages: {
        'en': 'English',
        'pl': 'polski',
        'sx': 'ślōnski'
    },

    themes: {
        'bootstrap-flatly': 'Flatly',
        'bootstrap-yeti': 'Yeti',
        'bootstrap-sketchy': 'Sketchy',
        'bootstrap-vibes': 'Vibes',
        'bootstrap-solar': 'Solar',
        'bootstrap-sandstone': 'Sandstone'
    },

    transformations: {
        'theme-light': 'Base',
        'theme-dark': 'Negative'
    },

    defaultLanguage: 'en',
    defaultTheme: 'bootstrap-yeti',
    defaultTransformation: 'theme-dark',

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

    setActiveButton(buttonValue) {
        let allButtons = document.querySelectorAll('.btn-group-vertical button');
        let targetButton = Array.from(allButtons).find(button => button.value === buttonValue);

        if (targetButton) {
            let groupButtons = targetButton.parentElement.querySelectorAll('button');

            groupButtons.forEach(button => button.classList.remove('active'));

            targetButton.classList.add('active');
            targetButton.blur();
        }
    },

    setItem(key, value) {
        let storage = (this.isMentallyRetardedBrowser()) ? window.sessionStorage : window.localStorage;

        storage.setItem(key, value);
    },

    getItem(key) {
        let storage = (this.isMentallyRetardedBrowser()) ? window.sessionStorage : window.localStorage;

        return storage.getItem(key);
    },

    isMentallyRetardedBrowser() {
        return navigator.userAgent.includes('Firefox');
    }
};

window.addEventListener("load", function() {
    AutoLoader.loadResources().then(() => {
        SettingsEngine.processDocument();
        ThemeEngine.generateColorTables();

        if (!ThemeEngine.getTheme()) {ThemeEngine.setTheme()} else {ThemeEngine.switchTheme(ThemeEngine.getTheme())}
        if (!ThemeEngine.getTransformation()) {ThemeEngine.setTransformation()} else {ThemeEngine.switchTheme(ThemeEngine.getTheme())}
        if (!TranslationEngine.getLanguage()) {TranslationEngine.setLanguage()} else {TranslationEngine.translateDocument(TranslationEngine.getLanguage())}
    });
});