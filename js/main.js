document.addEventListener('DOMContentLoaded', () => {
    // 預加載圖片
    const preloadImages = [
        "assets/img/bg/雨果房間_晚上.png",
        "assets/img/bg/社團教室_白天.png",
        "assets/img/cha/雨果_頭像_平常.png",
        "assets/img/cha/雨果_頭像_忍耐.png",
        "assets/img/cha/雨果_頭像_緊張.png",
        "assets/img/cha/雨果_頭像_絕望.png",
        "assets/img/cha/艾薇_立繪_普通.png",
        "assets/img/cha/艾薇_立繪_說話.png",
        "assets/img/cha/盧卡斯_立繪_普通.png",
        "assets/img/cha/盧卡斯_立繪_擔心.png",
        "assets/img/chat_img/聊天頭像_艾薇.png",
        "assets/img/chat_img/聊天頭像_雨果.png",
        "assets/img/cha/雨果_羞憤交加.png"
    ];

    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // 初始化遊戲引擎
    window.gameEngine = new GameEngine();

    // 手機端與觸控防護：防止點擊對話框、按鈕時產生文字選取反白與長按菜單
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });

    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    }, { passive: false });

    document.addEventListener('dblclick', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});
