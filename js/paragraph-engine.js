const ParagraphEngine = {
    getCurrentParagraphIndex() {
        return AutoLoader.getItem('paragraph');
    },
    setCurrentParagraphIndex: function(index) {
        AutoLoader.setItem('paragraph', index);
    },

    getTitle: function(paragraphId, language) {
        language = TranslationEngine.validateLanguage(language);

        const paragraph = paragraphData.paragraphs.find(para => para.id === paragraphId.toString());
        if (paragraph && paragraph.title[language]) {
            return paragraph.title[language];
        } else if (paragraph && paragraph.title['en']) {
            return paragraph.title['en'];
        } else {
            return "Title not available";
        }
    },

    getDescription: function(paragraphId, language) {
        language = TranslationEngine.validateLanguage(language);

        const paragraph = paragraphData.paragraphs.find(para => para.id === paragraphId.toString());
        if (paragraph && paragraph.description[language]) {
            return paragraph.description[language];
        } else if (paragraph && paragraph.description['en']) {
            return paragraph.description['en'];
        } else {
            return "Description not available";
        }
    },

    getConnectors: function(paragraphId, language) {
        language = TranslationEngine.validateLanguage(language);

        const paragraph = paragraphData.paragraphs.find(para => para.id === paragraphId.toString());

        if (paragraph) {
            return paragraph.connectors.map(connector => {
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
                    return {
                        label: "Label not available",
                        destination: connector.destination
                    };
                }
            });
        } else {
            return null;
        }
    },

    getImage: function(paragraphId, language) {
        language = TranslationEngine.validateLanguage(language);

        const paragraph = paragraphData.paragraphs.find(para => para.id === paragraphId.toString());
        if (paragraph) {
            if (typeof paragraph.image === 'string') {
                return paragraph.image;
            } else if (paragraph.image && paragraph.image[language]) {
                return paragraph.image[language];
            } else if (paragraph.image && paragraph.image['en']) {
                return paragraph.image['en'];
            } else {
                return "Image not available";
            }
        } else {
            return "Image not available";
        }
    }
};