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
}
};