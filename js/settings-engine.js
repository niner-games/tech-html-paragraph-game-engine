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
    }
};