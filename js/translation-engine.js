const TranslationEngine = {
    getLanguage() {
        return window.localStorage.getItem("language") || AutoLoader.defaultLanguage;
    },

    translateDocument: function(language) {
        let matchingNodes = document.querySelectorAll('[text]');

        if (matchingNodes.length === 0) return null;
        if (typeof language === 'undefined') return null;
        if (typeof translationsTable === 'undefined') return null;
        
        matchingNodes.forEach(matchingElement => {
            let translatedText;
            let sourceText = matchingElement.getAttribute("text");

            translatedText = (typeof translationsTable[language] === "undefined") ? sourceText : translationsTable[language][sourceText];
            translatedText = (typeof translatedText === "undefined" || translatedText === "") ? sourceText : translatedText;

            matchingElement.textContent = translatedText;
            matchingElement.style.direction = (language === "iw") ? "rtl" : "ltr";
        });
    }
};