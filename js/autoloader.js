const AutoLoader = {
    stylesheets: [
        'css/style.css'
    ],

    scripts: [
        'data/translations.js',
        'js/translation-engine.js'
    ],

    promises: [],

    defaultLanguage: 'en',

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

        return Promise.all(this.promises);
    }
};

window.addEventListener("load", function() {
    AutoLoader.loadResources().then(() => {
        TranslationEngine.translateDocument(TranslationEngine.getLanguage())
    });
});