const TranslationEngine = {
    getLanguage() {
        return AutoLoader.getItem('language');
    },

    setLanguage: function(language) {
        language = this.validateLanguage(language);
        AutoLoader.setItem('language', language);

        AutoLoader.setActiveButton(language);
        this.translateDocument(language);
    },

    validateLanguage: function(language) {
        if (!language || typeof language !== 'string' || !AutoLoader.languages.hasOwnProperty(language)) {
            return AutoLoader.defaultLanguage;
        }

        return language;
    },

    translateDocument: function(language) {
        let matchingNodes = document.querySelectorAll('[data-text]');

        language = this.validateLanguage(language);

        if (matchingNodes.length === 0) return null;

        matchingNodes.forEach(matchingElement => {
            let sourceText = matchingElement.getAttribute("data-text");

            matchingElement.textContent = this.translateText(sourceText, language);
            matchingElement.style.direction = (language === "iw") ? "rtl" : "ltr";
        });
    },

    translateText: function(sourceText, language) {
        let translatedText;

        language = this.validateLanguage(language);

        if (typeof Translations === 'undefined') return null;
        if (typeof language === 'undefined' || language === "") return null;

        translatedText = (typeof Translations[language] === "undefined") ? sourceText : Translations[language][sourceText];

        return (typeof translatedText === "undefined" || translatedText === "") ? sourceText : translatedText;
    }
};