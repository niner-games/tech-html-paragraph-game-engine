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
};