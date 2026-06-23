const Day2Script = [
    { type: "bg", src: "" }, // 開頭先全黑屏

    // 🎬 【場景一：上午，高二 A 班教室】
    {
        type: "bg",
        src: "assets/img/bg/二年級教室.png",
        bgm: "assets/audio/bgm/day1開場.mp3",
        location: "上午，高二 A 班教室"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "只要在現實中不和盧卡斯學長說話，孢子就沒有發作的機會。",
        avatar: "assets/img/cha/雨果_頭像_忍耐.png",
        voice: "assets/audio/voice/雨果_嘆氣.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "身為一個邊緣人，『不說話』是我最擅長的事。今天的我，依然會是個完美的隱形人。",
        avatar: "assets/img/cha/雨果_頭像_忍耐.png"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我推了推額前略顯沉重的黑框眼鏡，刻意把左眼藏在紫色的瀏海後，死氣沉沉地盯著黑板。"
    },
    { type: "sfx", src: "assets/audio/sfx/椅子拉動聲.mp3" },
    {
        type: "char",
        name: "艾薇",
        src: "assets/img/cha/艾薇_立繪_普通.png"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "鄰座的艾薇轉過頭，灰藍色的眼睛精準地掃描著我的臉。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "她肩膀上的小白鳥今天被塞進了桌墊抽屜裡，只露出一個圓滾滾的白色腦袋。"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "雨果。根據你的黑眼圈色號與呼吸頻率，你昨晚的交感神經顯然沒有得到充分的休息。",
        voice: "assets/audio/voice/艾薇_擔憂.wav"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "孢子正在試圖接管你的前額葉。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我壓低了聲音，用極度微弱的氣音試圖辯解。"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "我很好。我用強大的意志力把它壓下去了。",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/雨果_乖巧.wav"
    },
    {
        type: "char",
        name: "艾薇",
        src: "assets/img/cha/艾薇_立繪_說話.png"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "意志力在神經毒素面前是不具備量化價值的。",
        voice: "assets/audio/voice/艾薇_認同.wav"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "為了確認你的理智防線沒有被『交配渴望』完全覆蓋，我現在要透過 L-Chat 對你進行基礎的認知測試。"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "拿出手機。"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "……在課堂上傳訊息違反校規。",
        avatar: "assets/img/cha/雨果_頭像_緊張.png",
        voice: "assets/audio/voice/雨果_困擾.wav"
    },
    {
        type: "char",
        name: "艾薇",
        src: "assets/img/cha/艾薇_立繪_普通.png"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "你的理智崩潰會在社團裡引發更大的道德災難。選一個。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我痛苦地閉上眼，在桌子底下偷偷解鎖了手機。"
    },
    { type: "sfx", src: "assets/audio/sfx/手機提示.mp3" },
    { type: "transition", to: "CHAT" },
    { type: "chat_tutorial", text: "【系統提示】<br>請進入「艾薇」的聊天室接受認知測試。" },

    { type: "chat_separator", targetChat: "ivy", text: "今天 早上 10:00" },
    { type: "chat_msg", sender: "艾薇", targetChat: "ivy", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "雨果。準備好了嗎？" },
    { type: "chat_msg", sender: "艾薇", targetChat: "ivy", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我即將發送題目。" },

    { type: "wait_for_chat", chatId: "ivy" },

    { type: "chat_msg", sender: "艾薇", targetChat: "ivy", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "認知測試 01：在生物細胞的減數分裂中，同源染色體發生聯會（Synapsis）並可能進行基因重組的階段，發生在什麼時期？" },
    { type: "delay", time: 1.5 },
    {
        type: "chat_qte_academic", time: 8.0, targetChat: "ivy",
        options: [
            { text: "A: 有絲分裂末期", isCorrect: false },
            { text: "B: 減數第一分裂前期", isCorrect: true },
            { text: "C: 盧卡斯學長的腹肌線條期", isCorrect: false }
        ],
        successMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👍。" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "正確。看來你的大腦皮層還有 30% 的區域屬於你自己。繼續保持。" }
        ],
        failMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "你的腦波異常集中在繁殖相關的區域。需要我通知盧卡斯學長來把你帶去保健室隔離嗎？" },
            { sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "對不起我錯了。請給我重來的機會。", isSelf: true },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我重新發送。" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "認知測試 01：在生物細胞的減數分裂中，同源染色體發生聯會（Synapsis）並可能進行基因重組的階段，發生在什麼時期？" }
        ]
    },
    { type: "transition", to: "VN", fade: true },
    { type: "dialogue", name: "雨果", text: "（呼...雖然過程有點驚險，但總算應付過去了。）", avatar: "assets/img/cha/雨果_頭像_平常.png" },
    { type: "dialogue", name: "雨果", text: "（艾薇真的是越來越難以捉摸了，竟然用生物題來測試我的理智...）", avatar: "assets/img/cha/雨果_頭像_平常.png" },
    { type: "dialogue", name: "雨果", text: "（不過話說回來，那盆孢子的影響力還真是可怕，我到現在都還覺得臉頰發燙。）", avatar: "assets/img/cha/雨果_頭像_忍耐.png" },

    { type: "show_char", name: "艾薇", sprite: "assets/img/cha/艾薇_立繪_普通.png", position: "center" },
    { type: "dialogue", name: "艾薇", text: "雨果。" },
    { type: "dialogue", name: "雨果", text: "哇！你什麼時候走過來的？！", voice: "assets/audio/voice/雨果_驚嚇.wav", avatar: "assets/img/cha/雨果_頭像_緊張.png" },
    { type: "dialogue", name: "艾薇", text: "根據剛才的隨機認知測試結果，你的大腦前額葉皮質目前運作正常，理智值暫時穩定。" },
    { type: "dialogue", name: "艾薇", text: "目前觀察沒有即時危險。你可以繼續上課了。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "dialogue", name: "雨果", text: "（所以剛才的題目真的是在測試我有沒有發瘋嗎...？）", avatar: "assets/img/cha/雨果_頭像_平常.png" },
    { type: "dialogue", name: "雨果", text: "呃，謝謝你的『觀察』，艾薇。我現在感覺好多了。", avatar: "assets/img/cha/雨果_頭像_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "艾薇", text: "很好。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char", name: "艾薇" },

    { type: "sfx", src: "assets/audio/sfx/學校鐘聲.mp3" },
    { type: "dialogue", name: "雨果", text: "（午休時間到了。生物社今天沒有特別活動...）", avatar: "assets/img/cha/雨果_頭像_平常.png" },
    { type: "dialogue", name: "雨果", text: "（我還是去個沒人的地方吃午餐吧，順便讓這顆差點超載的腦袋冷靜一下。）", avatar: "assets/img/cha/雨果_頭像_平常.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },

    // 🎬 【場景二：午休時間，校園角落】
    {
        type: "bg",
        src: "assets/img/bg/樓梯間.png",
        location: "午休時間，樓梯間"
    },

    {
        type: "dialogue",
        name: "雨果",
        text: "（艾薇的測試太危險了。我需要轉移注意力。看看社團的論壇動態好了，只要不跟任何人對話，就絕對安全。）",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/雨果_嘆氣.wav"
    },
    { type: "add_forum_post", author: "西爾維亞", avatar: "assets/img/chat_img/聊天頭像_西爾維亞.png", text: "溫室。番茄。紅了。", img: "assets/img/CG/論壇圖片：一顆極度完美的番茄.png" },
    { type: "add_forum_post", author: "匿名學生#1206", avatar: "assets/img/chat_img/群組頭像.png", text: "", img: "assets/img/CG/論壇圖片：西爾維亞的照片，旁邊剛好有拍到盧卡斯仰起頭喝水，喉結滑動，水滴順著下顎線流進微敞的衣領裡。.png", isQte: true },
    {
        type: "dialogue",
        name: "旁白",
        text: "一邊咬著麵包，我一邊熟練地打開手機，準備滑一下 L-Chat。"
    },
    { type: "transition", to: "CHAT" },
    { type: "show_bottom_nav" },
    { type: "chat_tutorial", text: "【系統提示】<br>點擊下方的「動態」按鈕進入論壇。" },
    { type: "wait_for_forum" },
    { type: "wait_for_story", index: 0 },
    { type: "dialogue", name: "雨果", text: "（社長的動態還是那麼極簡。）" },

    { type: "wait_for_story", index: 1 },
    { type: "dialogue", name: "雨果", text: "（看起來是社長的粉絲拍攝的照片，什麼都沒打。可能是不小心按到上傳了。）" },
    { type: "dialogue", name: "雨果", text: "（但，怎麼就剛好拍到了理論上無人在意的盧卡斯......！？）" },
    {
        type: "forum_sanity_qte",
        time: 10.0
    },
    { type: "transition", to: "VN", fade: true },
    {
        type: "dialogue",
        name: "雨果",
        text: "（還好沒發出去......論壇也不安全啊！）",
        avatar: "assets/img/cha/雨果_頭像_絕望.png",
        voice: "assets/audio/voice/雨果_嘆氣.wav"
    },

    // 🎬 【場景三：下午 16:30，生物社團教室】
    {
        type: "bg",
        src: "assets/img/bg/社團教室_白天.png",
        bgm: "assets/audio/bgm/社團時間.mp3",
        location: "下午 16:30，生物社團教室"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "（午休的論壇危機總算過去了。）",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day2_語音/021午休的論壇危機總算過去了。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "（只要撐過放學前的社團時間，今天就算安全了。）",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day2_語音/022只要撐過放學前的社團時間，今天就算安全了。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "（幸好社團裡還有西爾維亞社長和艾薇，只要維持四人拉鋸，孢子就沒機會讓我對著盧卡斯學長暴走。）",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day2_語音/023幸好社團裡還有西爾維亞社長和艾薇，只要維持四人拉鋸，孢子就沒機會讓我對著盧卡斯學長暴走。.wav"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我推開門，正準備走到角落安靜地整理藥劑標籤。"
    },
    { type: "sfx", src: "assets/audio/sfx/碰.mp3" },
    {
        type: "show_char",
        name: "西爾維亞",
        sprite: "assets/img/cha/西爾維亞_立繪_一般.png",
        position: "left",
        add: true
    },
    { type: "sfx", src: "assets/audio/sfx/(SFX：巨響！碰！！).mp3" },
    {
        type: "dialogue",
        name: "旁白",
        text: "西爾維亞面無表情地將一整箱重達 30 公斤、還在冒著白煙的乾冰砸在實驗桌上。她的制服袖子挽得極高，露出線條流暢且充滿爆發力的小臂。"
    },
    {
        type: "show_char",
        name: "西爾維亞",
        sprite: "assets/img/cha/西爾維亞_立繪_說話.png",
        position: "left",
        add: true
    },
    {
        type: "dialogue",
        name: "西爾維亞",
        text: "冰塊。標本用的。搬完了。",
        voice: "assets/audio/voice/day2_語音/024冰塊。標本用的。搬完了。.wav"
    },
    {
        type: "show_char",
        name: "西爾維亞",
        sprite: "assets/img/cha/西爾維亞_立繪_一般.png",
        position: "left",
        add: true
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "（不愧是社長。跟她比起來，吸了孢子的我簡直像個廢物。）",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day2_語音/025不愧是社長。跟她比起來，吸了孢子的我簡直像個廢物。.wav"
    },
    {
        type: "show_char",
        name: "艾薇",
        sprite: "assets/img/cha/艾薇_立繪_普通.png",
        position: "right",
        add: true
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "這時，鄰座的艾薇僵硬地轉過頭來，灰藍色的眼睛一動不動地盯著我。而小白正站在艾薇的肩膀上，用那雙圓溜溜的藍色眼睛充滿渴望地注視著我。"
    },
    {
        type: "show_char",
        name: "艾薇",
        sprite: "assets/img/cha/艾薇_立繪_說話.png",
        position: "right",
        add: true
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "雨果。根據小白的行為學特徵分析，牠對你身上殘留的薰衣草洗衣精香氣產生了強烈的築巢衝動。",
        voice: "assets/audio/voice/day2_語音/026雨果。根據小白的行為學特徵分析，牠對你身上殘留的薰衣草洗衣精香氣產生了強烈的築巢衝動。.wav"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "如果我不放開牠，牠的壓力激素會上升 12%。",
        voice: "assets/audio/voice/day2_語音/027如果我不放開牠，牠的壓力激素會上升 12%。.wav"
    },
    {
        type: "show_char",
        name: "艾薇",
        sprite: "assets/img/cha/艾薇_立繪_普通.png",
        position: "right",
        add: true
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "……所以呢？",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day2_語音/028……所以呢？.wav"
    },
    {
        type: "show_char",
        name: "艾薇",
        sprite: "assets/img/cha/艾薇_立繪_說話.png",
        position: "right",
        add: true
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "所以，請一動不動地接受牠。",
        voice: "assets/audio/voice/day2_語音/029所以，請一動不動地接受牠。.wav"
    },
    {
        type: "show_char",
        name: "艾薇",
        sprite: "assets/img/cha/艾薇_立繪_普通.png",
        position: "right",
        add: true
    },
    { type: "sfx", src: "assets/audio/sfx/(SFX：啪噠啪噠的翅膀聲).mp3" },
    {
        type: "dialogue",
        name: "旁白",
        text: "小白輕快地飛了過來，直接降落在我頭髮的正中央，甚至舒適地伸展了一下爪子，開始用屁股蹭我的挑染前髮。"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "……？",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day2_語音/030……？.wav"
    },
    {
        type: "show_char",
        name: "盧卡斯",
        sprite: "assets/img/cha/盧卡斯_立繪_笑.png",
        position: "center",
        add: true
    },
    { type: "sfx", src: "assets/audio/voice/day2_語音/031(溫柔的低笑聲從講台那側傳來).wav" },
    {
        type: "dialogue",
        name: "旁白",
        text: "盧卡斯摘下了半框眼鏡，一邊用絨布慢條斯理地擦拭鏡片，一邊笑著看向被小白「佔領」的我。因為沒戴眼鏡，他的紅棕色眼睛顯得有些失焦，平添了幾分平時少見的、慵懶而勾人的英俊。"
    },
    {
        type: "dialogue",
        name: "盧卡斯",
        text: "小白還是一樣喜歡你呢。真好。",
        voice: "assets/audio/voice/day2_語音/032小白還是一樣喜歡你呢。真好。.wav"
    },
    { type: "sfx", src: "assets/audio/sfx/心跳聲.mp3" },
    {
        type: "dialogue",
        name: "旁白",
        text: "我猛地移開視線，強迫自己看著旁邊的乾冰。不行，摘下眼鏡的學長殺傷力太大了。為了轉移注意力，我連忙清了清喉嚨，生硬地轉開話題："
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "對了……話說回來，我們教室裡為什麼會存放昨天那種危險的『變異吐真孢子』？身為生物社，這算違規存放危險化學品吧？",
        avatar: "assets/img/cha/雨果_頭像_緊張.png",
        voice: "assets/audio/voice/day2_語音/033對了……話說回來，我們教室裡為什麼會存放昨天那種危險的『變異吐真孢子』？身為生物社，這算違規存放危險化學品吧？.wav"
    },
    {
        type: "show_char",
        name: "西爾維亞",
        sprite: "assets/img/cha/西爾維亞_立繪_說話.png",
        position: "left",
        add: true
    },
    {
        type: "dialogue",
        name: "西爾維亞",
        text: "化學老師。",
        voice: "assets/audio/voice/day2_語音/034化學老師。.wav"
    },
    {
        type: "show_char",
        name: "西爾維亞",
        sprite: "assets/img/cha/西爾維亞_立繪_一般.png",
        position: "left",
        add: true
    },
    {
        type: "show_char",
        name: "艾薇",
        sprite: "assets/img/cha/艾薇_立繪_說話.png",
        position: "right",
        add: true
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "沒錯。是化學社的老師蜜拉思。他最近正在著手研發一種不具備成癮性、能有效安撫精神焦慮的新型神經抑制劑。",
        voice: "assets/audio/voice/day2_語音/035沒錯。是化學社的老師蜜拉思。他最近正在著手研發一種不具備成癮性、能有效安撫精神焦慮的新型神經抑制劑。.wav"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "因為化學大樓的溫控系統故障，他非常禮貌地請求西爾維亞將這盆孢子植物暫存在這裡，藉由生物教室的自然採光進行最後的熟成。",
        voice: "assets/audio/voice/day2_語音/036因為化學大樓的溫控系統故障，他非常禮貌地請求西爾維亞將這盆孢子植物暫存在這裡，藉由生物教室的自然採光進行最後的熟成。.wav"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "他強調過，這只是純粹的學術研究，絕對沒有任何惡作劇意圖。",
        voice: "assets/audio/voice/day2_語音/037他強調過，這只是純粹的學術研究，絕對沒有任何惡作劇意圖。.wav"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "只是他忘記強調孢子在熟成期會產生微量氣體揮發，需要密封。這在醫學上屬於嚴謹的『實驗室管理疏忽』。",
        voice: "assets/audio/voice/day2_語音/038只是他忘記強調孢子在熟成期會產生微量氣體揮發，需要密封。這在醫學上屬於嚴謹的『實驗室管理疏忽』。.wav"
    },
    {
        type: "show_char",
        name: "艾薇",
        sprite: "assets/img/cha/艾薇_立繪_普通.png",
        position: "right",
        add: true
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "（老師……！這根本是校園安全危害吧！！他知不知道他的新藥差點讓我當場社會性死亡啊！）",
        avatar: "assets/img/cha/雨果_頭像_忍耐.png",
        voice: "assets/audio/voice/day2_語音/039老師……！這根本是校園安全危害吧！！他知不知道他的新藥差點讓我當場社會性死亡啊！.wav"
    },
    {
        type: "show_char",
        name: "盧卡斯",
        sprite: "assets/img/cha/盧卡斯_立繪_微笑.png",
        position: "center",
        add: true
    },
    {
        type: "dialogue",
        name: "盧卡斯",
        text: "別生氣了，雨果。明天化學大樓修好後，我會親手把那盆孢子送回給蜜拉思老師。今天大家就提早放學吧。",
        voice: "assets/audio/voice/day2_語音/040別生氣了，雨果。明天化學大樓修好後，我會親手把那盆孢子送回給蜜拉思老師。今天大家就提早放學吧。.wav"
    },
    {
        type: "show_char",
        name: "盧卡斯",
        sprite: "assets/img/cha/盧卡斯_立繪_普通.png",
        position: "center",
        add: true
    },
    { type: "hide_char", name: "西爾維亞" },
    { type: "hide_char", name: "艾薇" },
    { type: "hide_char", name: "盧卡斯" },

    // 🎬 【場景四：放學後，回家的街道】
    { type: "transition", to: "VN", fade: true },
    {
        type: "bg",
        src: "assets/img/bg/放學後，回家的街道.png",
        location: "放學後，回家的街道"
    },
    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    {
        type: "dialogue",
        name: "雨果",
        text: "（不行，越想越覺得不能就這樣算了。我跟蜜拉思老師那麼熟，身為一個差點被害死的學生，我必須向他表達嚴正的抗議！）",
        avatar: "assets/img/cha/雨果_頭像_忍耐.png"
    },
    { type: "transition", to: "CHAT" },

    // Switch to Melas chatroom & Type draft
    { type: "chat_type", targetChat: "melas", text: "二哥，關於您放在生物社的孢子植物，我認為這已經嚴重影響了學生的生理與心理健康！作為您隨便在學校認的乾弟弟，我要求您立刻回收，並且在明天的化學課給我一個合理的解釋……", append: true },
    { type: "delay", time: 2 },

    { type: "sfx", src: "assets/audio/sfx/(SFX：劇烈的手機震動聲！）.wav" },

    { type: "show_incoming_call", caller: "盧卡斯學長", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png" },
    {
        type: "dialogue",
        name: "雨果",
        text: "（學、學學學長來電話了？！怎麼辦，現在接的話我聲音一定會發抖啊！）",
        avatar: "assets/img/cha/雨果_頭像_緊張.png",
        voice: "assets/audio/voice/雨果_驚嚇.wav"
    },
    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>📞 【電話節奏 QTE - 規則說明】 📞</b><br><br>學長打電話來了！<br><br><b>操作方式：</b><br>1. 當學長說話時，你的心跳會隨著對話逐漸加快。<br>2. 請在心跳條變紅前，點擊<b style='color:#4caf50;'>『深呼吸』</b>按鈕 (或按<b>空白鍵</b>) 來平復情緒。<br>3. 如果心跳爆表，學長會發現你的異樣並導致通話失敗！<br><br><b>勝負條件：</b><br>成功撐過整通電話，不讓心跳爆表。</div>" },
    {
        type: "rhythm_call_qte",
        caller: "盧卡斯學長",
        avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png",
        script: [
            { type: "voice", text: "「喂？雨果，是我。你到家了嗎？」", src: "assets/audio/voice/day2_語音/電話_01_喂？雨果，是我。你到家了嗎？.wav", duration: 5000, spike: 40 },
            { type: "dialogue", name: "雨果", text: "啊，嗯……學長？", duration: 2000 },
            { type: "voice", text: "「下午看你被小白黏著的樣子，總覺得你也像隻小動物一樣，有點可愛。」", src: "assets/audio/voice/day2_語音/電話_02_下午看你被小白黏著的樣子，總覺得你像隻小動物，有點可愛。.wav", duration: 6000, spike: 60 },
            { type: "dialogue", name: "雨果", text: "（可、可愛？！學長說我可愛？！）", duration: 2000 },
            { type: "voice", text: "「不過……你真的沒事嗎？孢子的毒性雖然不高，但可能會引發輕微的神經燥熱。」", src: "assets/audio/voice/day2_語音/電話_03_不過……你真的沒事嗎？孢子的毒性雖然不高，但可能會引發輕微的神經燥熱。.wav", duration: 5000, spike: 50 },
            { type: "dialogue", name: "雨果", text: "我……我沒事。謝謝學長關心……", duration: 2000 },
            { type: "voice", text: "「那就好。你到家之後，記得看一下門口的信箱，我把蜂蜜茶包放進去了。用熱水泡開喝，對神經代謝很有幫助。」", src: "assets/audio/voice/day2_語音/電話_04_那就好。你到家之後，記得看一下門口的信箱，我把蜂蜜茶包放進去了。用熱水泡開喝，對神經代謝很有幫助。.wav", duration: 8000, spike: 40 },
            { type: "dialogue", name: "雨果", text: "謝謝學長……", duration: 2000 },
            { type: "voice", text: "「那……明天學校見了，雨果，晚安。」", src: "assets/audio/voice/day2_語音/電話_05_那……明天學校見了，雨果，晚安。.wav", duration: 4000, spike: 20 },
            {
                type: "choice",
                options: [
                    { text: "學長晚安……", action: "win" },
                    { text: "學長我喜歡你！！！", action: "lose" }
                ]
            },
            { type: "sfx", src: "assets/audio/sfx/(SFX：嘟——嘟—— 通話結束。).mp3", duration: 2000 }
        ]
    },

    // 🎬 【結尾演出】
    { type: "transition", to: "VN" },
    { type: "bg", src: "assets/img/bg/放學後，回家的街道.png" },
    {
        type: "dialogue",
        name: "旁白",
        text: "我維持著把手機貼在耳朵上的姿勢，整個人像是化石一樣僵在人行道中央。脖子此時已經徹底紅透，耳根燙得像是要冒煙。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "過了整整三分鐘，我才大口大口地喘著氣，把手機放了下來。我的大腦此時被學長剛剛打來的電話給完全格式化了，滿腦子都是學長的聲音。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我暈乎乎地滑開手機解鎖。螢幕跳回了 L-Chat。畫面依然停留在與【蜜拉思】的對話框。看著那行密密麻麻、義正言辭的「興師問罪控訴文」……"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "（……等等，我本來要幹嘛？……算了。）",
        avatar: "assets/img/cha/雨果_頭像_絕望.png",
        voice: "assets/audio/voice/雨果_嘆氣.wav"
    },
    { type: "sfx", src: "assets/audio/sfx/刪除.mp3" },
    {
        type: "dialogue",
        name: "旁白",
        text: "我面無表情地按住刪除鍵，把好不容易打完的控訴文全部清除，然後把手機塞回口袋，腳步飄浮、雙眼無神地往家的方向走去。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "而那個被無辜遺忘的蜜拉思，或許正在辦公室裡莫名其妙地打噴嚏。"
    },
    {
        type: "fade_text",
        text: "<span class='fade-line-1'>Day 2 存活確認。</span><br><br><span class='fade-line-2'>理智值剩餘：70%</span>"
    },
    { type: "delay", time: 8, stopBgm: true, },
    {
        type: "end_day",
        day: 2
    }
];