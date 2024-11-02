const TranslationEngine = {
    getLanguage() {
        return window.localStorage.getItem('language');
    },

    setLanguage: function(language = AutoLoader.defaultLanguage) {
        window.localStorage.setItem('language', language);

        AutoLoader.setActiveButton(language);
        this.translateDocument(language);
    },

    translateDocument: function(language) {
        let matchingNodes = document.querySelectorAll('[data-text]');

        if (matchingNodes.length === 0) return null;

        matchingNodes.forEach(matchingElement => {
            let sourceText = matchingElement.getAttribute("data-text");

            matchingElement.textContent = this.translateText(sourceText, language);
            matchingElement.style.direction = (language === "iw") ? "rtl" : "ltr";
        });
    },

    translateText: function(sourceText, language) {
        let translatedText;

        if (typeof Translations === 'undefined') return null;
        if (typeof language === 'undefined' || language === "") return null;

        translatedText = (typeof Translations[language] === "undefined") ? sourceText : Translations[language][sourceText];

        return (typeof translatedText === "undefined" || translatedText === "") ? sourceText : translatedText;
    }
};