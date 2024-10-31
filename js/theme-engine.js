const ThemeEngine = {
    getTheme() {
        return window.localStorage.getItem("theme") || AutoLoader.defaultTheme;
    },

    setTheme: function(selected = AutoLoader.defaultTheme) {
        this.switchTheme(selected);

        window.localStorage.setItem("theme", selected);
    },

    switchTheme: function(theme) {
        let themeCSS = document.getElementById('theme');

        if (typeof themeCSS === 'undefined') return null;
        if (typeof theme === 'undefined') return this.getTheme();

        themeCSS.href = this.getPath(theme);
    },

    getPath(theme) {
        return 'css/' + theme + '.css';
    }
};