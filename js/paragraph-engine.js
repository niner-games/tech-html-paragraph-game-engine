const ParagraphEngine = {
    getCurrentParagraphIndex() {
        return AutoLoader.getItem('paragraph');
    },
    setCurrentParagraphIndex: function(index) {
        AutoLoader.setItem('paragraph', index);
    }
}