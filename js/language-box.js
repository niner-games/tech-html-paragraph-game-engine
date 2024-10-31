const defaultLanguageOverlayFontSize = '14px';
const defaultLanguageOverlayElementId = 'language-overlay';

const LanguageBox = {
    id: defaultLanguageOverlayElementId,
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
    
    getId() {
        return this.isSet(this.id, defaultLanguageOverlayElementId);
    },

    getLanguage() {
        return window.localStorage.getItem("language") || AutoLoader.defaultLanguage;
    },

    createOverlay: function() {
        let style = "ltr";
        let overlay = document.createElement("div");
        let select = document.createElement("select");
        
        overlay.id = this.getId();
        
        overlay.style.left = "0";
        overlay.style.bottom = "0";
        overlay.style.padding = "3px";
        overlay.style.position = "fixed";
        overlay.style.margin = "0 0 7px 7px";
        overlay.style.fontSize = defaultLanguageOverlayFontSize;
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        overlay.style.border = "solid 2px rgba(0, 0, 0, 0.3)";
        
        for (let key in this.languages) {
            if (this.languages.hasOwnProperty(key)) {
                let option = document.createElement("option");
                
                style = (key === "iw") ? "rtl" : style;
                
                option.value = key;
                option.style.direction = style;
                option.text = this.languages[key];
                
                select.appendChild(option);
            }
        }
        
        select.id = "the-select";
        select.value = this.getLanguage();
        
        select.style.fontSize = defaultLanguageOverlayFontSize;
        
        select.addEventListener("change", this.handleChange);

        overlay.appendChild(select);
        document.body.appendChild(overlay);

        return false;
    },
    
    handleChange: function() {
        let selected = this.options[this.selectedIndex].value;

        TranslationEngine.translateDocument(selected);
        window.localStorage.setItem("language", selected);
    }
};