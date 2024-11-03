const AutoLoader = {
    stylesheets: {
        'main': 'css/style.css',
        'images': 'css/fontawesome.css',
        'theme': 'css/bootstrap-yeti.css'
    },

    scripts: [
        'js/translation-engine.js',
        'js/settings-engine.js',
        'js/paragraph-engine.js',
        'js/theme-engine.js',

        'data/settings.js',
        'data/paragraphs.js',
        'data/translations.js'
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
    },

    getContext: function() {
        let fullPath = window.location.href;
        let filenameWithExtension = fullPath.substring(fullPath.lastIndexOf('/') + 1);

        return filenameWithExtension.split('.')[0];
    }
};

window.addEventListener("load", function() {
    AutoLoader.loadResources().then(() => {
        if (AutoLoader.getContext() === 'settings') {
            SettingsEngine.generateButtons(
                AutoLoader.languages,
                ['btn-success'],
                (event, key) => TranslationEngine.setLanguage(key),
                document.getElementById('language-overlay'),
                'language'
            );

            SettingsEngine.generateButtons(
                AutoLoader.themes,
                ['btn-warning'],
                (event, key) => ThemeEngine.setTheme(key),
                document.getElementById('theme-overlay'),
                'theme'
            );

            SettingsEngine.generateButtons(
                AutoLoader.transformations,
                ['btn-info'],
                (event, key) => ThemeEngine.setTransformation(key),
                document.getElementById('transformation-overlay'),
                'transformation'
            );
        }

        if (AutoLoader.getContext() === 'paragraph') {

        }

        SettingsEngine.processDocument();
        ThemeEngine.generateColorTables();

        if (!ThemeEngine.getTheme()) {ThemeEngine.setTheme()} else {ThemeEngine.switchTheme(ThemeEngine.getTheme())}
        if (!ThemeEngine.getTransformation()) {ThemeEngine.setTransformation()} else {ThemeEngine.switchTheme(ThemeEngine.getTheme())}
        if (!TranslationEngine.getLanguage()) {TranslationEngine.setLanguage()} else {TranslationEngine.translateDocument(TranslationEngine.getLanguage())}
    });
});