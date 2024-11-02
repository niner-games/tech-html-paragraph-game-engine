let AutoLoader = {
    stylesheets: {
        'main': 'css/style.css',
        'theme': 'css/bootstrap-solar.css',
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
        'bootstrap-flatly': 'Flatly',
        'bootstrap-morph': 'Morph',
        'bootstrap-sketchy': 'Sketchy',
        'bootstrap-solar': 'Solar',
        'bootstrap-vibes': 'Vibes',
        'bootstrap-yeti': 'Yeti'
    },

    transformations: {
        'theme-light': 'Base',
        'theme-dark': 'Negative'
    },

    defaultLanguage: 'en',
    defaultTheme: 'bootstrap-solar',
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
    }
};

window.addEventListener("load", function() {
    AutoLoader.loadResources().then(() => {
        ThemeEngine.generateColorTables();

        if (!ThemeEngine.getTheme()) {ThemeEngine.setTheme()} else {ThemeEngine.switchTheme(ThemeEngine.getTheme())}
        if (!ThemeEngine.getTransformation()) {ThemeEngine.setTransformation()} else {ThemeEngine.switchTheme(ThemeEngine.getTheme())}
        if (!TranslationEngine.getLanguage()) {TranslationEngine.setLanguage()} else {TranslationEngine.translateDocument(TranslationEngine.getLanguage())}
    });
});