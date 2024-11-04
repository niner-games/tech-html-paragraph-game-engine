const SettingsEngine = {
    getSettingValue(key) {
        if (typeof Settings === 'undefined') return null;
        if (typeof key === 'undefined' || key === "") return null;

        return Settings[key];
    },

    processDocument: function() {
        let matchingNodes = document.querySelectorAll('[data-key]');

        matchingNodes.forEach(matchingElement => {
            matchingElement.textContent = this.getSettingValue(matchingElement.getAttribute("data-key"));
        });

        matchingNodes = document.querySelectorAll('[data-target]');

        matchingNodes.forEach(matchingElement => {
            matchingElement.addEventListener('click', () => {
                window.location.href = matchingElement.getAttribute('data-target') + '.html';
            });
        });
    },

    generateButtons: function(sourceArray, colorsArray, eventListener, parentElement, storageKey) {
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

                if (AutoLoader.getItem(storageKey) === key) {
                    button.classList.add('active');
                }

                button.addEventListener('click', (event) => eventListener(event, key));

                parentElement.appendChild(button);

                i++;
            }
        }

        return i;
    },

    updateColumnVisibility: function(languagesCount = 0, themesCount = 0, transformationsCount = 0) {
        const themesColumn = document.getElementById("theme-buttons");
        const languageColumn = document.getElementById("language-buttons");
        const transformationsColumn = document.getElementById("transformation-buttons");

        if (languagesCount === 0 && themesCount === 0 && transformationsCount === 0) {
            languageColumn.style.display = 'none';
            themesColumn.style.display = 'none';
            transformationsColumn.style.display = 'none';
        } else if (languagesCount === 0 && themesCount === 0) {
            languageColumn.style.display = 'none';
            themesColumn.style.display = 'none';
            transformationsColumn.style.display = 'block';

            transformationsColumn.classList.remove('col-md-6', 'col-lg-4');
            transformationsColumn.classList.add('col-md-12', 'col-lg-12');
        } else if (languagesCount === 0 && transformationsCount === 0) {
            languageColumn.style.display = 'none';
            themesColumn.style.display = 'block';
            transformationsColumn.style.display = 'none';

            themesColumn.classList.remove('col-md-6', 'col-lg-4');
            themesColumn.classList.add('col-md-12', 'col-lg-12');
        } else if (themesCount === 0 && transformationsCount === 0) {
            languageColumn.style.display = 'block';
            themesColumn.style.display = 'none';
            transformationsColumn.style.display = 'none';

            languageColumn.classList.remove('col-md-6', 'col-lg-4');
            languageColumn.classList.add('col-md-12', 'col-lg-12');
        } else if (languagesCount === 0) {
            languageColumn.style.display = 'none';
            themesColumn.style.display = 'block';
            transformationsColumn.style.display = 'block';

            themesColumn.classList.remove('col-md-6', 'col-lg-4', 'col-lg-6');
            themesColumn.classList.add('col-md-6', 'col-lg-6');
            transformationsColumn.classList.remove('col-md-6', 'col-lg-4');
            transformationsColumn.classList.add('col-md-6', 'col-lg-6');
        } else if (themesCount === 0) {
            languageColumn.style.display = 'block';
            themesColumn.style.display = 'none';
            transformationsColumn.style.display = 'block';

            languageColumn.classList.remove('col-md-6', 'col-lg-4', 'col-lg-6');
            languageColumn.classList.add('col-md-6', 'col-lg-6');
            transformationsColumn.classList.remove('col-md-6', 'col-lg-4');
            transformationsColumn.classList.add('col-md-6', 'col-lg-6');
        } else if (transformationsCount === 0) {
            languageColumn.style.display = 'block';
            themesColumn.style.display = 'block';
            transformationsColumn.style.display = 'none';

            languageColumn.classList.remove('col-md-6', 'col-lg-4', 'col-lg-6');
            languageColumn.classList.add('col-md-6', 'col-lg-6');
            themesColumn.classList.remove('col-md-6', 'col-lg-4');
            themesColumn.classList.add('col-md-6', 'col-lg-6');
        } else {
            languageColumn.style.display = 'block';
            themesColumn.style.display = 'block';
            transformationsColumn.style.display = 'block';

            languageColumn.classList.remove('col-md-12', 'col-lg-12', 'col-lg-6');
            languageColumn.classList.add('col-md-6', 'col-lg-4');
            themesColumn.classList.remove('col-md-6', 'col-lg-6');
            themesColumn.classList.add('col-md-6', 'col-lg-4');
            transformationsColumn.classList.remove('col-md-6', 'col-lg-6');
            transformationsColumn.classList.add('col-md-6', 'col-lg-4');
        }
    }
};