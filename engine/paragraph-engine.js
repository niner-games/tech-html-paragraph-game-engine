const ParagraphEngine = {
    loadExternalTexts: function() {
        window.t = {};
        const promises = [];

        for (let paragraph of paragraphData.paragraphs) {
            for (let lang in paragraph.description) {
                const filePath = paragraph.description[lang];
                if (filePath) {
                    promises.push(new Promise((resolve, reject) => {
                        const script = document.createElement('script');

                        script.src = 'data/paragraphs/' + filePath + '.js?v=' + new Date().getTime();
                        script.async = true;

                        script.onload = () => {
                            try {
                                paragraph.description[lang] = window.t[filePath];
                                resolve();
                            } catch (error) {
                                reject(`Failed to load text from ${filePath}`);
                            }
                        };

                        script.onerror = () => reject(`Failed to load script: ${filePath}`);
                        document.body.appendChild(script);
                    }));
                }
            }
        }

        return Promise.all(promises);
    },

    getCurrentParagraphIndex() {
        return AutoLoader.getItem('paragraph');
    },

    setCurrentParagraphIndex: function(index) {
        AutoLoader.setItem('paragraph', index);
    },

    verySimpleMarkdownParser: function(input, skipNewLines = false) {
        input = input
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>');

            // input = (skipNewLines) ? input : input.split('\n').map(line => `<p>${line}</p>`).join('');
            input = (skipNewLines) ? input : input.split('\n').filter(line => line.trim() !== '').map(line => `<p>${line}</p>`) .join('');
            // input = (skipNewLines) ? input : input.replace(/\n/g, '<br />');

        return input;
    },

    getTitle: function(paragraph, language) {
        let title = '';

        language = TranslationEngine.validateLanguage(language);

        const paragraphObj = paragraphData.paragraphs.find(para => para.id === paragraph.toString());
        if (paragraphObj && paragraphObj.title[language]) {
            title = paragraphObj.title[language];
        } else if (paragraphObj && paragraphObj.title[AutoLoader.defaultLanguage]) {
            title = paragraphObj.title[AutoLoader.defaultLanguage];
        }

        return this.verySimpleMarkdownParser(title, true);
    },

    getDescription: function(paragraph, language) {
        let description;
        const paragraphObj = paragraphData.paragraphs.find(para => para.id === paragraph.toString());

        language = TranslationEngine.validateLanguage(language);

        if (paragraphObj) {
            let currentDescription = (paragraphObj.description[language]) || '';
            let defaultDescription = (paragraphObj.description[AutoLoader.defaultLanguage]) || '';

            currentDescription = currentDescription.replace(/^\s+|\s+$/g, '');
            defaultDescription = defaultDescription.replace(/^\s+|\s+$/g, '');

            if (currentDescription !== '') {
                description = currentDescription;
            } else if (defaultDescription !== '') {
                description = defaultDescription;
            } else {
                description = 'Description not available for paragraph no "' + paragraph + '" and language "' + language + '".';
            }
        }

        return this.verySimpleMarkdownParser(description);
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
                } else if (connector.label[AutoLoader.defaultLanguage]) {
                    return {
                        label: connector.label[AutoLoader.defaultLanguage],
                        destination: connector.destination
                    };
                } else {
                    return {
                        label: TranslationEngine.translateText('Go to', language) + ' ' + connector.destination,
                        destination: connector.destination
                    };
                }
            });
        } else {
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
            } else if (paragraphObj.image && paragraphObj.image[AutoLoader.defaultLanguage]) {
                return paragraphObj.image[AutoLoader.defaultLanguage];
            }
        }

        return "";
    },

    loadImage: function(paragraph, language, imgElementId, callback) {
        language = TranslationEngine.validateLanguage(language);

        const img = document.getElementById(imgElementId);
        let imagePath = 'data/images/' + this.getImage(paragraph, language);

        if (img) {
            img.onload = function() {
                callback(true, imagePath);
            };

            img.onerror = function() {
                imagePath = 'data/images/' + ParagraphEngine.getImage(paragraph, AutoLoader.defaultLanguage);

                img.onload = function() {
                    callback(true, imagePath);
                };

                img.onerror = function() {
                    callback(false, imagePath);
                };

                img.src = imagePath;
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
        const newClass = `w-${buttons.length * 25}`;

        buttonGroup.innerHTML = '';

        buttons.forEach((button) => {
            let btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-success button-25 me-2';
            btn.classList.add(`w-${100 / buttons.length}`);
            btn.innerHTML = button.label;
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
        buttonGroup.classList.add(newClass);

        if (AutoLoader.debugMode) {
            const buttonGroup = document.getElementById('control-buttons');
            const newButton = document.createElement('button');

            newButton.id = 'debug-button';
            newButton.type = 'button';
            newButton.className = 'btn btn-danger me-2';
            newButton.innerHTML = 'Jump';

            buttonGroup.appendChild(newButton);
            buttonGroup.classList.add('w-75');
            buttonGroup.classList.remove('w-50');

            newButton.addEventListener('click', function() {
                const userValue = prompt('Where do you want to go today?');
                if (userValue !== null && userValue !== "" && userValue !== undefined && !isNaN(userValue)) {
                    const numericValue = Number(userValue);

                    ParagraphEngine.setCurrentParagraphIndex(numericValue);
                    window.location.href = 'paragraph.html';
                }
            });
        }
    },

    goToParagraph: function(paragraph) {
        let language = TranslationEngine.getLanguage();

        this.setCurrentParagraphIndex(paragraph);
        this.loadParagraph(paragraph, language);
    },

    loadParagraph: function(paragraph, language) {
        paragraph = this.validateParagraph(paragraph);
        language = TranslationEngine.validateLanguage(language);

        this.loadImage(paragraph, language, 'paragraph-image', function(exists) {
            ParagraphEngine.toggleColumns(exists);
        });

        document.getElementById('paragraph-number').textContent = paragraph.toUpperCase();
        document.getElementById('paragraph-title').innerHTML = this.getTitle(paragraph, language);
        document.getElementById('paragraph-description').innerHTML = this.getDescription(paragraph, language);

        this.generateButtons(this.getConnectors(paragraph, language));
    }
};