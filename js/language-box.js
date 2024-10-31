const LanguageBox = {
    languages: {
        'pl': 'polski',
        'en': 'English',
        'sx': 'ślōnskŏ gŏdka'
    },
    
    isSet: function (variable, def) {
        def = (def === undefined) ? 'default value' : def;
        
        if (typeof variable === 'string') {
            return (variable.trim() !== '') ? variable : def;
        } else if (typeof variable === 'object') {
            return variable
        } else return def;
    },

    createOverlay: function() {
        let style = "ltr";
        let overlay = document.getElementById('language-overlay');

        for (let key in this.languages) {
            if (this.languages.hasOwnProperty(key)) {
                let button = document.createElement("button");
                
                style = (key === "iw") ? "rtl" : style;

                button.value = key;
                button.style.direction = style;
                button.textContent = this.languages[key];

                button.addEventListener('click', () => { this.setLanguage(key) });

                overlay.appendChild(button);
            }
        }
        
        return false;
    },
    
    setLanguage: function(selected = AutoLoader.defaultLanguage) {
        TranslationEngine.translateDocument(selected);

        window.localStorage.setItem("language", selected);
    }
};