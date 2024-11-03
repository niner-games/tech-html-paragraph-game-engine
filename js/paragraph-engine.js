const ParagraphEngine = {
    getCurrentParagraphIndex() {
        return AutoLoader.getItem('paragraph');
    },

    setCurrentParagraphIndex: function(index) {
        AutoLoader.setItem('paragraph', index);
    },

    veryVerySimpleMarkdownfunction: function(input) {
        return input
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    },

    getTitle: function(paragraph, language) {
        let title = '';

        language = TranslationEngine.validateLanguage(language);

        const paragraphObj = paragraphData.paragraphs.find(para => para.id === paragraph.toString());
        if (paragraphObj && paragraphObj.title[language]) {
            title = paragraphObj.title[language];
        } else if (paragraphObj && paragraphObj.title['en']) {
            title = paragraphObj.title['en'];
        }

        return this.veryVerySimpleMarkdownfunction(title);
    },

    getDescription: function(paragraph, language) {
        let description;

        language = TranslationEngine.validateLanguage(language);

        const paragraphObj = paragraphData.paragraphs.find(para => para.id === paragraph.toString());
        if (paragraphObj && paragraphObj.description[language]) {
            description = paragraphObj.description[language];
        } else if (paragraphObj && paragraphObj.description['en']) {
            description = paragraphObj.description['en'];
        } else {
            console.log('Description not available for paragraph no "' + paragraph + '" and language "' + language + '".');

            description = "No **NOT** found!";
        }

        return this.veryVerySimpleMarkdownfunction(description);
    },

    getConnectors: function(paragraph, language) {
        language = TranslationEngine.validateLanguage(language);

        const paragraphObj = paragraphData.paragraphs.find(para => para.id === paragraph.toString());

        if (paragraphObj) {
            return paragraphObj.connectors.map(connector => {
                if (connector.label[language]) {
                    return {
                        label: connector.label[language],
                        destination: connector.destination
                    };
                } else if (connector.label['en']) {
                    return {
                        label: connector.label['en'],
                        destination: connector.destination
                    };
                } else {
                    console.log('Label not available for paragraph no "' + paragraph + '" and language "' + language + '".');

                    return {
                        label: "!!!",
                        destination: connector.destination
                    };
                }
            });
        } else {
            console.log("No connectors for paragraph no: " + paragraph + " and language: " + language);

            return null;
        }
    },

    getImage: function(paragraph, language) {
        language = TranslationEngine.validateLanguage(language);

        const paragraphObj = paragraphData.paragraphs.find(para => para.id === paragraph.toString());

        if (paragraphObj) {
            if (typeof paragraphObj.image === 'string') {
                return paragraphObj.image;
            } else if (paragraphObj.image && paragraphObj.image[language]) {
                return paragraphObj.image[language];
            } else if (paragraphObj.image && paragraphObj.image['en']) {
                return paragraphObj.image['en'];
            }
        }
        console.log('Image not available for paragraph no "' + paragraph + '" and language "' + language + '".');

        return "";
    },

    loadImage: function(paragraph, language, imgElementId, callback) {
        language = TranslationEngine.validateLanguage(language);

        const imagePath = 'data/images/' + this.getImage(paragraph, language);
        const img = document.getElementById(imgElementId);

        if (img) {
            img.onload = function() {
                callback(true, imagePath);
            };
            img.onerror = function() {
                callback(false, imagePath);
            };
            img.src = imagePath;
        } else {
            callback(false, 'Image element not found');
        }
    },

    validateParagraph: function(paragraph) {
        if (!paragraph || typeof paragraph !== 'string' || !paragraphData.paragraphs.some(para => para.id === paragraph.toString())) {
            return AutoLoader.defaultParagraph;
        }

        return paragraph;
    },

    toggleColumns: function(condition) {
        const leftColumn = document.getElementById('left-column');
        const rightColumn = document.getElementById('right-column');

        if (condition) {
            leftColumn.style.display = 'block';
            rightColumn.classList.remove('col-lg-12');
            rightColumn.classList.add('col-lg-8');
        } else {
            leftColumn.style.display = 'none';
            rightColumn.classList.remove('col-lg-8');
            rightColumn.classList.add('col-lg-12');
        }
    },

    generateButtons: function(buttons) {
        let buttonGroup = document.getElementById('paragraph-buttons');
        const classes = ['w-25', 'w-50', 'w-75', 'w-100'];

        buttonGroup.innerHTML = '';

        buttons.forEach((button) => {
            let btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-success button-25 me-2'; // Adjust class if needed
            btn.classList.add(`w-${100 / buttons.length}`);
            btn.innerText = button.label;
            btn.onclick = () => {
                ParagraphEngine.goToParagraph(button.destination);
            };
            buttonGroup.appendChild(btn);
        });

        if (buttonGroup.children.length > 0) {
            buttonGroup.firstElementChild.classList.add('first-child');
            buttonGroup.lastElementChild.classList.add('last-child');
        }

        buttonGroup.classList.remove(...classes);
        const newClass = `w-${buttons.length * 25}`;
        buttonGroup.classList.add(newClass);
    },

    goToParagraph: function(paragraph) {
        let language = TranslationEngine.getLanguage();

        this.setCurrentParagraphIndex(paragraph);
        this.loadParagraph(paragraph, language);
    },

    loadParagraph: function(paragraph, language) {
        paragraph = this.validateParagraph(paragraph);
        language = TranslationEngine.validateLanguage(language);

        let buttons = this.getConnectors(paragraph, language);

        this.loadImage(paragraph, language, 'paragraph-image', function(exists, imagePath) {
            ParagraphEngine.toggleColumns(exists);

            if (!exists) {
                console.log("Image not found or element not found:", imagePath);
            }
        });

        document.getElementById('paragraph-number').textContent = paragraph;
        document.getElementById('paragraph-title').innerHTML = this.getTitle(paragraph, language);
        document.getElementById('paragraph-description').innerHTML = this.getDescription(paragraph, language);

        this.generateButtons(buttons);
    }
};