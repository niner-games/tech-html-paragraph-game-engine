const ThemeEngine = {
    elementColors: {},
    invertedColors: {},

    getTheme() {
        return window.localStorage.getItem('theme');
    },

    setTheme: function(theme = AutoLoader.defaultTheme) {
        window.localStorage.setItem('theme', theme);

        AutoLoader.setActiveButton(theme);
        this.switchTheme(theme);
    },

    switchTheme: function(theme) {
        let themeCSS = document.getElementById('theme');

        if (typeof themeCSS === 'undefined') return null;
        theme = (typeof theme === 'undefined') ? this.getTheme() : theme;

        themeCSS.href = this.getPath(theme);

        this.invertColors();
    },

    getPath(theme) {
        return 'css/' + theme + '.css';
    },

    getTransformation() {
        return window.localStorage.getItem('transformation');
    },

    setTransformation: function(transformation = AutoLoader.defaultTransformation) {
        window.localStorage.setItem('transformation', transformation);

        AutoLoader.setActiveButton(transformation);
        this.switchTheme();
    },
    
    invertColors() {
        let colorTable = (this.getTransformation() === 'theme-dark') ? this.invertedColors : this.elementColors;

        Object.keys(colorTable).forEach(id => {
            let element = document.getElementById(id);

            if (element) {
                if (element.tagName.toLowerCase() === 'body') {
                    element.style.backgroundColor = colorTable[id];
                } else {
                    element.style.color = colorTable[id];
                }
            }
        });
    },
    
    invertColor(rgbColor) {
        let rgb = rgbColor.match(/\d+/g);
        let r = 255 - rgb[0];
        let g = 255 - rgb[1];
        let b = 255 - rgb[2];
        
        return `rgb(${r}, ${g}, ${b})`;
    },

    generateColorTables() {
        let color;
        let elementsArray = document.querySelectorAll('*:not(html):not(head):not(meta):not(link):not(script):not(title)');

        elementsArray.forEach((element) => {
            let computedStyles = window.getComputedStyle(element);

            element.id = (!element.id) ? element.tagName.toLowerCase() + Math.random().toString(36).substring(2, 9) : element.id;

            color = (element.tagName.toLowerCase() === 'body') ? computedStyles.backgroundColor : computedStyles.color;
            this.elementColors[element.id] = color;
            this.invertedColors[element.id] = this.invertColor(color);
        });
    }
};