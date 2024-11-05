const AutoLoader = {
    stylesheets: {
        'main': 'data/styles/style.css',
        'images': 'data/styles/fontawesome.css',
        'theme': 'data/styles/bootstrap-yeti.css'
    },

    scripts: [
        'engine/translation-engine.js',
        'engine/settings-engine.js',
        'engine/paragraph-engine.js',
        'engine/theme-engine.js',

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
    defaultParagraph: 'I',
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

            script.src = scriptSrc + '?v=' + new Date().getTime();
            script.async = true;

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
    },

    updateDefaultValues: function() {
        const attributes = [
            'themes',
            'languages',
            'defaultTheme',
            'transformations',
            'defaultLanguage',
            'defaultParagraph',
            'defaultTransformation'
        ];

        attributes.forEach(attribute => {
            const value = SettingsEngine.getSettingValue(attribute);

            if (value !== undefined) {
                if (
                    (typeof value === 'object') ||
                    (Array.isArray(value) && value.length > 0) ||
                    (typeof value === 'number' && !isNaN(value)) ||
                    (typeof value === 'string' && value.trim() !== '')
                ) {
                    this[attribute] = value;
                }
            }
        });
    }
};

window.addEventListener("load", function() {
    AutoLoader.loadResources().then(() => {
        AutoLoader.updateDefaultValues();

        if (AutoLoader.getContext() === 'paragraph') {
            ParagraphEngine.goToParagraph(ParagraphEngine.getCurrentParagraphIndex());
        }

        if (AutoLoader.getContext() === 'settings') {
            let themesCount;
            let languagesCount;
            let transformationsCount;


            languagesCount = SettingsEngine.generateButtons(
                AutoLoader.languages,
                ['btn-success'],
                (event, key) => TranslationEngine.setLanguage(key),
                document.getElementById('language-overlay'),
                'language'
            );

            themesCount = SettingsEngine.generateButtons(
                AutoLoader.themes,
                ['btn-warning'],
                (event, key) => ThemeEngine.setTheme(key),
                document.getElementById('theme-overlay'),
                'theme'
            );

            transformationsCount = SettingsEngine.generateButtons(
                AutoLoader.transformations,
                ['btn-info'],
                (event, key) => ThemeEngine.setTransformation(key),
                document.getElementById('transformation-overlay'),
                'transformation'
            );

            SettingsEngine.updateColumnVisibility(languagesCount, themesCount, transformationsCount);
        }

        if (AutoLoader.getContext() === 'menu') {
            let continueButton = document.getElementById('continue-button');

            if (Number(ParagraphEngine.getCurrentParagraphIndex()) > 0) {
                continueButton.removeAttribute('disabled');
            } else {
                continueButton.setAttribute('disabled', 'disabled');
            }
        }

        SettingsEngine.processDocument();
        ThemeEngine.generateColorTables();
        TranslationEngine.setDefaultLanguage();

        if (!ThemeEngine.getTheme()) {ThemeEngine.setTheme()} else {ThemeEngine.switchTheme(ThemeEngine.getTheme())}
        if (!ThemeEngine.getTransformation()) {ThemeEngine.setTransformation()} else {ThemeEngine.switchTheme(ThemeEngine.getTheme())}
        if (!TranslationEngine.getLanguage()) {TranslationEngine.setLanguage()} else {TranslationEngine.translateDocument(TranslationEngine.getLanguage())}
    });
});