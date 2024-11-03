const ChapterEngine = {
    getCurrentChapterIndex() {
        return AutoLoader.getItem('chapter');
    },
    setCurrentChapterIndex: function(index) {
        AutoLoader.setItem('chapter', index);
    }
}