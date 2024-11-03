const ChapterEngine = {
    getCurrentChapterIndex() {
        return window.localStorage.getItem('chapter');
    },

    setCurrentChapterIndex: function(index) {
        window.localStorage.setItem('chapter', index);
    },
};