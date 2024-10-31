window.addEventListener("load", function() {
    AutoLoader.loadResources().then(() => {
        // TranslationEngine.translateDocument(TranslationEngine.getLanguage());
    });
});

const defaultLanguageCode = 'en';

const AutoLoader = {
    stylesheets: [
        'css/style.css'
    ],

    scripts: [
        'data/translations.js',
        'js/translation-engine.js',
        // 'https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/js/bootstrap.bundle.min.js',
    ],

    promises: [],
    callbacks: [],

    loadResources() {
        this.stylesheets.forEach(function (stylesheet) {
            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.href = stylesheet;

            document.head.appendChild(link);

            AutoLoader.promises.push(new Promise((resolve) => {
                link.onload = resolve;
            }));
        });

        this.scripts.forEach(function (scriptSrc) {
            const script = document.createElement('script');

            script.src = scriptSrc;

            document.body.appendChild(script);

            AutoLoader.promises.push(new Promise((resolve) => {
                script.onload = resolve;
            }));
        });

        // return Promise.all(this.promises);

        return Promise.all(this.promises).then(() => {
            this.callbacks.push(TranslationEngine.translateDocument(TranslationEngine.getLanguage()));

            this.callbacks.forEach(callback => {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        });
    }
};
