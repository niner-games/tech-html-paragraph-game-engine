const SettingsEngine = {
    getSettingValue(key) {
        if (typeof Settings === 'undefined') return null;
        if (typeof key === 'undefined' || key === "") return null;

        return Settings[key];
    },

    processDocument: function() {
        let matchingNodes = document.querySelectorAll('[data-key]');

        if (matchingNodes.length === 0) return null;

        matchingNodes.forEach(matchingElement => {
            matchingElement.textContent = this.getSettingValue(matchingElement.getAttribute("data-key"));
        });
    },

    goToSettingsPage: function() {
        window.location.href = 'settings.html';
    },

    goToIntroPage: function() {
        window.location.href = 'index.html';
    },

    returnFromSettingsPage: function() {
        window.history.back();
    },

    generateButtons(sourceArray, colorsArray, eventListener, parentElement, storageKey) {
        let i = 0;
        let style = "ltr";

        for (let key in sourceArray) {
            if (sourceArray.hasOwnProperty(key)) {
                let button = document.createElement("button");

                style = (key === "iw") ? "rtl" : style;

                button.value = key;
                button.type = 'button';
                button.style.direction = style;
                button.setAttribute('data-text', sourceArray[key]);

                button.classList.add('btn');
                button.classList.add(colorsArray[i % colorsArray.length]);

                if (window.localStorage.getItem(storageKey) === key) {
                    button.classList.add('active');
                }

                button.addEventListener('click', (event) => eventListener(event, key));

                parentElement.appendChild(button);

                i++;
            }
        }
    }
};