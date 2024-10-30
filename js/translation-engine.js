const defaultLanguageCode = 'en';

window.addEventListener("load", function() {
    TranslationEngine.translateDocument(TranslationEngine.getLanguage());
});

const TranslationEngine = {
    getLanguage() {
        return window.localStorage.getItem("language") || defaultLanguageCode;
    },

    translateDocument: function(language) {
        let matchingNodes = document.querySelectorAll('[text]');
        let style = (language === "iw") ? "direction: rtl;" : "direction: ltr;";
        
        if (matchingNodes.length === 0) return null;
        if (typeof language === 'undefined') return null;
        if (typeof translation === 'undefined') return null;
        
        matchingNodes.forEach(matchingElement => {
            let translatedText;
            let sourceText = matchingElement.getAttribute("text");

            translatedText = (typeof translation[language] === "undefined") ? sourceText : translation[language][sourceText];
            translatedText = (typeof translatedText === "undefined" || translatedText === "") ? sourceText : translatedText;

            matchingElement.style = style;
            matchingElement.textContent = translatedText;
        });
    }
};