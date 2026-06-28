const Day4Script = [
    // =====================================================================
    // 🎬 場景一：早晨，學校集合地點 (群組的最終判決)
    // =====================================================================
    // 註：本日為合宿出遊，雨果與眾人皆換上便服立繪 / 頭像。
    // 註：場景三～場景三點五採用 day4_語音 完整配音；其餘場景以 assets/audio/voice 通用語音適時點綴。
    { type: "bg", src: "assets/img/bg/早晨的校門口，停著一輛準備開往山區的中型巴士。.png", fade: true, bgm: "assets/audio/bgm/出發.mp3", location: "早晨，學校集合地點" },
    { type: "dialogue", name: "旁白", text: "清晨六點半，天色還泛著一層未醒的青灰。我拖著沉重的行李箱站在校門口，箱輪碾過柏油路面的聲音在空蕩的街上顯得格外刺耳。" },
    { type: "dialogue", name: "旁白", text: "眼眶底下掛著雙層發青的黑眼圈，在微弱的晨光下，我整張臉看起來格外生無可戀。" },
    { type: "dialogue", name: "雨果", text: "早安，世界……", avatar: "assets/img/cha/雨果_頭像_便服_絕望.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "dialogue", name: "旁白", text: "我對著停在校門口、那輛即將載我駛向地獄的中型巴士，深深地長嘆了一口氣。昨晚群組裡關於房間分配的最後討論，簡直成了壓垮我理智的最後一根稻草。" },
    { type: "dialogue", name: "旁白", text: "因為「男女授受不親」這個無可反駁的鐵則，西爾維亞社長和艾薇必須睡一間雙人房；而身為隨隊指導老師的蜜拉思二哥，又以「需要獨立空間徹夜觀測孢子反應數據」為由，死皮賴臉地霸佔了唯一的單人房。" },
    { type: "dialogue", name: "雨果", text: "（其最終結果就是：我，必須，也只能，和盧卡斯學長睡在同一個雙人房裡。）", avatar: "assets/img/cha/雨果_頭像_便服_絕望.png" },
    { type: "dialogue", name: "雨果", text: "（這意味著我這顆長滿黃色廢料的腦袋，將在接下來的三天兩夜裡，與誘惑源本尊被關在同一個密閉空間中。）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png" },
    { type: "dialogue", name: "旁白", text: "光是想像那個畫面，我的胃就抽痛了一下。" },
    { type: "dialogue", name: "雨果", text: "（我覺得，我的生命線大概只剩下不到 12 小時了。）", avatar: "assets/img/cha/雨果_頭像_便服_絕望.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },

    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    { type: "dialogue", name: "旁白", text: "就在我對著行李箱發呆時，一陣平穩而規律的腳步聲，不疾不徐地朝我靠近。" },
    { type: "dialogue", name: "旁白", text: "我一轉頭，就看到艾薇手裡拿著電子數據板，那雙如冷冽湖水般的灰藍色眼睛，正面無表情地、精準地鎖定了我。" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_普通.png" },
    { type: "dialogue", name: "艾薇", text: "雨果。根據你的瞳孔放大率、不自覺的肩膀聳起，以及手指在行李箱拉桿上的肌肉緊繃程度，你正處於極度的焦慮狀態。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_說話.png" },
    { type: "dialogue", name: "艾薇", text: "你的皮質醇濃度已經飆升了 42%，這會嚴重損害你的判斷力與前額葉皮質的功能。" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "被一大清早就用數據劈頭蓋臉地分析，我無力地揉了揉眉心。" },
    { type: "dialogue", name: "雨果", text: "早，艾薇……我承認我現在的焦慮程度已經可以引發一場小型爆炸了。但你就不能當作沒看見嗎？身為同學，有時候裝傻也是一種溫柔。", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_說話.png" },
    { type: "dialogue", name: "艾薇", text: "裝傻是違背科學實事求是原則的。為了防止你在登上巴士前因急性焦慮而引發過度換氣，進而拖延我們的發車行程，我必須強行介入。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "dialogue", name: "艾薇", text: "現在，啟動晨間快問快答。藉由解題產生的邏輯思考，強制轉移你的神經注意力。" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "……我可以選擇棄權嗎？我覺得我現在的腦袋只能轉移到『如何安全退社』這個話題上。", avatar: "assets/img/cha/雨果_頭像_便服_絕望.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_普通.png" },
    { type: "dialogue", name: "艾薇", text: "棄權選項不存在。請拿出手機接收數據。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "她說得理所當然，彷彿這是世界上最自然的事。我認命地掏出手機，螢幕應聲亮起。" },

    // --- 鋪墊：學長從薄霧中走來，孢子暴走 ---
    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    { type: "dialogue", name: "旁白", text: "正當我嘆了口氣，準備在手機上選出正確答案時，不遠處的薄霧裡，傳來了另一陣皮鞋踩在落葉上的、沙沙的聲響。" },
    { type: "dialogue", name: "旁白", text: "我下意識抬起頭——然後，整個人頓時倒吸了一口冷氣。" },
    { type: "dialogue", name: "旁白", text: "學長提著行李，正從清晨的薄霧中緩步朝我們走來。他今天沒有穿平時那身略顯嚴肅的制服，而是換上了一件挽起袖子的白襯衫，外面套了一件合身的黑色針織背心。襯衫領口隨意地解開了一顆釦子，挽起的袖口下，露出線條利落的小臂。" },
    { type: "dialogue", name: "旁白", text: "半框眼鏡下的那雙紅棕色眼眸，帶著清晨特有的慵懶笑意，隔著一層薄霧，直直地朝我看了過來。" },
    { type: "dialogue", name: "雨果", text: "（……糟了。）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "那一瞬間，我的大腦「嗡」地一聲，體內的孢子在突如其來的男色衝擊下開始瘋狂暴走，在我的視線中投射出一大片虛幻的、粉紅色的妄想泡泡，幾乎要把手機螢幕上的選項全部淹沒！" },

    // ------------------------------------------------------------------
    // 🎮 遊戲環節 1：晨間快問快答 (Chat 模式 / 戳破妄想泡泡)
    // ------------------------------------------------------------------
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：當人體進入高海拔地區時，為了應對空氣中氧分壓的降低，身體會分泌何種激素來刺激紅血球的生成？", targetChat: "ivy" },
    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>🎮 晨間快問快答</b><br><br>學長從晨霧中走來，孢子讓你滿腦子妄想，選項全被<b style='color:#ff66aa;'>粉紅色妄想泡泡</b>蓋住了！<br><br><b>玩法：</b><br>用力<b>狂點泡泡</b>把它們戳破，看清底下真正的選項，再選出<b>正確答案</b>！</div>" },
    { type: "wait_for_chat", chatId: "ivy" },
    {
        type: "chat_qte_academic",
        targetChat: "ivy",
        time: 14.0,
        glitch: false,
        bubbles: {
            count: 5,
            texts: [
                "學長今天帥得太犯規了……",
                "好想被那雙挽著袖子的手臂抱住……",
                "想咬一口襯衫領口露出的脖子……",
                "挽起的袖子配背心……太犯規了……",
                "學長……早安……"
            ]
        },
        mutangOptions: [
            { text: "選項 A：想衝過去抱住學長", isCorrect: false },
            { text: "選項 B：把臉埋進學長的針織背心裡", isCorrect: false },
            { text: "選項 C：被學長抱緊", isCorrect: false }
        ],
        options: [
            { text: "選項 A：腎上腺素", isCorrect: false },
            { text: "選項 B：紅血球生成素 (EPO)", isCorrect: true },
            { text: "選項 C：被學長抱緊的衝動素", isCorrect: false }
        ],
        successMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👍回答正確。EPO（紅血球生成素）。看來你的前額葉在妄想干擾下依然守住了底線。" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "你的注意力已成功轉移，過度換氣風險下降 31%。請保持。" }
        ],
        failMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👎回答錯誤。你選的選項在生理學上並不存在，且帶有強烈的孢子妄想特徵。" },
            { sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "對不起我腦子被泡泡蓋住了。再給我一次機會。", isSelf: true },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我重新發送。請先清除妄想泡泡。" },
            { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：當人體進入高海拔地區時，為了應對空氣中氧分壓的降低，身體會分泌何種激素來刺激紅血球的生成？", targetChat: "ivy" }
        ]
    },

    // ------------------------------------------------------------------
    { type: "transition", to: "VN", fade: true },
    { type: "bg", src: "assets/img/bg/早晨的校門口，停著一輛準備開往山區的中型巴士。.png", fade: true },
    { type: "dialogue", name: "旁白", text: "選對的瞬間，學長的私服殘影連同那些粉紅色泡泡一起「啵」地消散。我用力搖了搖頭，勉強把那些羞恥的妄想壓回腦袋最深處。" },
    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    { type: "dialogue", name: "旁白", text: "等我回過神，學長已經走到了我們面前。他臉上掛著極其溫和優雅的微笑，手裡還提著一個便利商店的紙袋，袋口飄出淡淡的咖啡香。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "早安，艾薇，雨果。抱歉我晚了幾分鐘。剛剛順路去幫大家買了熱咖啡和一些防暈車的藥。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "雨果，你的臉色看起來真的很差，昨晚沒有睡好嗎？", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "旁白", text: "他遞過來一杯溫熱的咖啡，指尖不經意地擦過我的手背，那點溫度讓我的心臟漏跳了半拍。" },
    { type: "dialogue", name: "雨果", text: "……謝、謝謝學長，我沒事，只是稍微有點失眠。", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "雨果", text: "（學長！這都是因為你啊！要不是昨晚你在群組裡答應了二哥的房間分配，我至於失眠到想把腦袋拔掉嗎？！）", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_生氣.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "山路會很崎嶇。待會上車後，你坐我旁邊吧，我方便照顧你。如果累了，就閉上眼睛休息。", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "旁白", text: "我差點一口咖啡噴出來。" },
    { type: "dialogue", name: "雨果", text: "（坐你旁邊？！這根本是把炸彈直接綁在我的心臟上啊！）", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_生氣.wav" },
    { type: "dialogue", name: "旁白", text: "一旁的艾薇咬著溫熱的吸管，冷不防地、用最一本正經的學術口吻開了口。" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_說話.png" },
    { type: "dialogue", name: "艾薇", text: "盧卡斯。根據數據，雨果目前的呼吸頻率有 15% 的異常加快，體表溫度正在以每分鐘 0.1 度的速度上升。若他在車上出現急性發熱或妄想症狀，請立刻通知我，我帶了攜帶型冰敷袋。", voice: "assets/audio/voice/艾薇_擔憂.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_普通.png" },
    { type: "dialogue", name: "旁白", text: "學長有些迷茫地眨了眨眼，但還是十分正經地點了點頭。" },
    { type: "dialogue", name: "盧卡斯", text: "好，我會隨時注意的。", voice: "assets/audio/voice/盧卡斯_疑惑.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "……艾薇，感謝妳的好心。但我們該上車了！", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "我幾乎是用逃的，默默地將下半張臉埋進大衣的領子裡，覺得自己現在的體溫，大概已經可以拿來煎雞蛋了。" },

    // =====================================================================
    // 🎬 場景二：搖晃的巴士 (理智的極限拉扯)
    // =====================================================================
    { type: "bg", src: "assets/img/bg/巴士內部.png", fade: true, location: "上午，行駛中的巴士" },
    { type: "dialogue", name: "旁白", text: "中巴駛上蜿蜒崎嶇的山路，引擎發出低沉的轟鳴，車身隨著起伏的路面，傳來一下又一下規律而綿長的搖晃。" },
    { type: "dialogue", name: "旁白", text: "車窗外，連綿的針葉林與雲霧飛快地向後退去。而我——和學長並肩坐在這狹窄的雙人座上，連呼吸都不敢太大聲。" },
    { type: "dialogue", name: "旁白", text: "不知是因為昨晚的嚴重失眠，還是高海拔造成的空氣稀薄，亦或是體內那株「變異吐真孢子」又在作祟，我總覺得這小小的車廂裡，溫度高得有些異常。" },
    { type: "dialogue", name: "旁白", text: "尤其是身旁——學長身上那股清冽的雪松香氣，正伴隨著他的體溫，源源不斷地穿過這短短幾公分的距離，無孔不入地刺激著我的每一根神經。" },
    { type: "dialogue", name: "旁白", text: "我雙手死死抓著膝蓋上的背包，指關節因為過度用力而有些發白，整副身軀僵硬得像一塊鋼板。" },
    { type: "dialogue", name: "雨果", text: "（不行，頭好暈……大腦沉得要命，眼皮也好重，好想直接睡過去……）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "雨果", text: "（可是學長的肩膀就在我旁邊不到五公分的地方，每次轉彎，他挽著襯衫的手臂都會輕輕擦過我的手臂……）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "巴士又是一個大轉彎，慣性將我的身體輕輕往他那側帶去。我腦子裡那個被孢子餵養肥大的聲音，又開始喋喋不休地慫恿我。" },
    { type: "dialogue", name: "雨果", text: "（靠過去吧……那件針織背心看起來那麼軟，學長一定不會介意的，靠一下、就一下，一定很舒服……）", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_生氣.wav" },
    { type: "dialogue", name: "雨果", text: "（不能靠！絕對不能靠過去——！）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "我拼命繃緊脖子上的每一條肌肉，強迫自己的頭顱朝反方向使力。但孢子的燥熱與睡意正聯手瓦解我的意志，那股「向右倒去」的引力，越來越難抗衡……" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：孢子活性激增！</b><br>宿主陷入半昏迷狀態，身體控制權正在流失！<br><br><b>🎮 地心引力的誘惑</b><br>巴士的搖晃加上孢子的誘惑，會讓你的<b>頭部指針不受控制地倒向學長的肩膀（右側）</b>！<br><br><b>玩法（限時 15 秒）：</b><br>依照畫面指示，<b>連點或長按</b>下方的 <b>【◀ 左】 / 【右 ▶】</b> 按鈕（電腦可用 ← → 方向鍵），把指針拉回中央的<b style='color:#4caf50;'>綠色安全區</b>。<br>千萬別讓它衝進最右側的<b style='color:#ff3366;'>紅色警戒區</b>——否則你的頭就會直接砸上學長的肩膀！</div>" },

    // ------------------------------------------------------------------
    // 🎮 Day 4 特殊小遊戲：地心引力的誘惑 (Gravity Balance)
    // 註：左右滑動的「心動妄想退散」小遊戲 (swipe_dismiss_qte) 已保留，預計 Day 5 使用。
    // ------------------------------------------------------------------
    {
        type: "gravity_balance_qte",
        time: 15.0,
        crash: 100,
        headIcon: "assets/img/chat_img/聊天頭像_雨果.png"
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "旁白", text: "整整十五秒，我的脖子都在極力朝左側使勁抗衡，硬生生把那顆快要倒戈的腦袋，一次又一次地拉了回來。" },
    { type: "sfx", src: "assets/audio/sfx/(SFX：巨響！碰！！).mp3" },
    { type: "dialogue", name: "旁白", text: "車身猛地一頓，所有人的身體都往前一甩。" },
    { type: "dialogue", name: "旁白", text: "司機用粗獷的嗓音，扯著喉嚨大喊：「各位乘客，目的地高山營地到啦！」" },
    { type: "dialogue", name: "雨果", text: "（嘶——！）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "我猛地一震，睜開了眼睛。因為剛才一直在跟「倒向學長」的衝動死命對抗，此刻一放鬆，脖子的關節竟發出了一聲清脆的『喀啦』脆響，疼得我眼眶差點飆出生理性的淚水。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "旁白", text: "學長轉過頭，略帶擔憂又無奈地，看著我此刻這副像是被點了穴的怪異姿勢。" },
    { type: "dialogue", name: "盧卡斯", text: "雨果？你一路上脖子都挺得這麼僵硬，好像一直在跟某種重力對抗一樣。這樣很容易落枕的……其實，如果你覺得累了，靠著我的肩膀睡也沒關係的。", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "旁白", text: "我咬緊牙關，強行壓下脖頸傳來的酸痛，用我畢生所學、最平靜的面癱表情，說出了最鬼扯的謊言。" },
    { type: "dialogue", name: "雨果", text: "謝謝學長。這是我……最近剛研發的……鍛鍊頸椎咬合力的一種方式。", avatar: "assets/img/cha/雨果_頭像_便服_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_笑.png" },
    { type: "dialogue", name: "旁白", text: "學長看著我，眼底深處閃過一絲好笑又無奈的溫柔。他伸出手，幫我把頭頂上被睡意揉亂的紫髮稍微理了理，然後彎腰，一手提起了我們兩人的行李。" },
    { type: "dialogue", name: "盧卡斯", text: "好吧。那走吧，我們先下車跟社長他們會合。", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "旁白", text: "我捂著通紅的耳根，默默跟在他高大的背影後面，恨不得把剛才那個死要面子的自己，一腳踢下山去。" },
    { type: "hide_char" },

    // =====================================================================
    // 🎬 場景三：目的地，天降的豪華別墅 (The Sugar Daddy Arrives) — 完整配音
    // =====================================================================
    { type: "bg", src: "assets/img/bg/高山風景。原本預期中的破舊小木屋還在，但更顯眼的是一棟極度奢華、帶有大片落地窗和庭院的現代化三層樓別墅。.png", fade: true, bgm: "assets/audio/bgm/day1意外後.mp3", location: "中午，高山營地" },
    { type: "dialogue", name: "旁白", text: "山頂的空氣冷冽而清新，帶著松針的味道。然而，當我們一行人走下巴士、站定後，所有人都不約而同地陷入了一片長久的、集體的沉默。" },
    { type: "dialogue", name: "旁白", text: "原本預期中、那棟該由我們入住的破舊小木屋，此刻竟像是被施了魔法一般，被旁邊一棟極度奢華、帶有大片落地窗與噴泉庭院的現代化三層樓別墅，硬生生地搶走了所有的風頭。" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞社長眉頭緊鎖，拿著地圖反覆核對了好幾遍。" },
    { type: "dialogue", name: "西爾維亞", text: "座標無誤。但，小木屋不見了。", voice: "assets/audio/voice/day4_語音/062座標無誤。但，小木屋不見了。.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_唔？.png" },
    { type: "dialogue", name: "旁白", text: "蜜拉思二哥推了推額頭上的護目鏡，一臉懵逼地看著面前那座精美的噴泉庭院。" },
    { type: "dialogue", name: "蜜拉思", text: "Oops，這太不科學了！難道是某種高山稀薄空氣引發的空間折疊反應？還是學校的經費，突然在教務處手裡發生了超新星爆炸？", voice: "assets/audio/voice/day4_語音/063Oops，這太不科學了！難道是某種高山稀薄空氣引發的空間折疊反應？還是學校的經費，突然在教務處手裡發生了超新星爆炸？.wav" },
    { type: "hide_char" },

    { type: "sfx", src: "assets/audio/sfx/大門緩緩開啟的電子音.mp3" },
    { type: "dialogue", name: "旁白", text: "就在我們面面相覷、不知所措時，別墅那扇黑鐵雕花大門，突然發出一聲清脆的解鎖音，緩緩地朝兩側敞開。" },
    { type: "dialogue", name: "旁白", text: "一位穿著藍色休閒服、平時氣質冷峻得像是一尊精緻冰雕的男人，手裡端著一杯散發著濃郁香氣的黑咖啡，邁著優雅的步伐，從門後走了出來。" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_正常.png" },
    { type: "dialogue", name: "雨果", text: "（那是……我們的班導師，奧拉老師？！）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/day4_語音/064那是……我們的班導師，奧拉老師？！.wav" },
    { type: "dialogue", name: "旁白", text: "二哥一看到他，整個人猛地往後彈跳了一大步，差點把站在他身後的艾薇撞個滿懷。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_唔？.png" },
    { type: "dialogue", name: "蜜拉思", text: "奧、奧拉？！你怎麼會在這裡？！你今天早上不是還有高三的模擬考監考嗎？！", voice: "assets/audio/voice/day4_語音/065奧、奧拉？！你怎麼會在這裡？！你今天早上不是還有高三的模擬考監考嗎？！.wav" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "奧拉老師推了推細框眼鏡，目光冷冷地，在二哥那身有些凌亂、甚至還沾了泥土的白袍上掃過。" },
    { type: "dialogue", name: "奧拉", text: "我請假了。身為你的合法伴侶，我昨天下午偶然在教務處的公文裡得知，你打算帶著一群學生，擠在一個沒有熱水、充滿蟲子且木板漏風的破舊木屋裡度過三天兩夜。", voice: "assets/audio/voice/day4_語音/066我請假了。身為你的合法伴侶，我昨天下午偶然在教務處的公文裡得知，你打算帶著一群學生，擠在一個沒有熱水、充滿蟲子且木板漏風的破舊木屋裡度過三天兩夜。.wav" },
    { type: "dialogue", name: "旁白", text: "他輕抿了一口咖啡，語氣平淡無波，卻帶著一種令人窒息的、絕對的財力壓制。" },
    { type: "dialogue", name: "奧拉", text: "所以我昨天連夜把那間小木屋旁邊的這棟別墅包了下來，作為你們這幾天的『民宿』。費用我已經結清了。", voice: "assets/audio/voice/day4_語音/067所以我昨天連夜把那間小木屋旁邊的這棟別墅包了下來，作為你們這幾天的『民宿』。費用我已經結清了。.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_困擾.png" },
    { type: "dialogue", name: "旁白", text: "二哥顯得極其不服氣，雙手叉腰，在原地氣呼呼地跳腳抗議。" },
    { type: "dialogue", name: "蜜拉思", text: "奧拉！你這是在破壞我的野外求生實驗變數！我是一個科學家！科學家是需要經歷嚴酷環境的淬鍊的！", voice: "assets/audio/voice/day4_語音/068奧拉！你這是在破壞我的野外求生實驗變數！我是一個科學家！科學家是需要經歷嚴酷環境的淬鍊的！.wav" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "奧拉老師眼神微微一沉，淡淡地拋出了致命的誘餌。" },
    { type: "dialogue", name: "奧拉", text: "這棟別墅有一個附帶恆溫系統的地下酒窖，非常適合用來存放你的那些瓶瓶罐罐。還有三個獨立的豪華衛浴。你確定你比較喜歡小木屋嗎？", voice: "assets/audio/voice/day4_語音/069這棟別墅有一個附帶恆溫系統的地下酒窖，非常適合用來存放你的那些瓶瓶罐罐。還有三個獨立的豪華衛浴。你確定你比較喜歡小木屋嗎？.wav" },
    { type: "dialogue", name: "旁白", text: "二哥的聲音瞬間就低了下去。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_微笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "……報告奧拉，別墅非常完美。科學家偶爾，也是需要享受一下資本主義的便利的。", voice: "assets/audio/voice/day4_語音/070……報告奧拉，別墅非常完美。科學家偶爾，也是需要享受一下資本主義的便利的。.wav" },
    { type: "hide_char" },

    { type: "dialogue", name: "旁白", text: "看著這對伴侶之間的拉扯，我覺得很有趣。但此時，我那顆被孢子折磨的敏銳大腦，卻精準地捕捉到了一個關鍵詞——「非常大」。" },
    { type: "dialogue", name: "旁白", text: "我有些顫抖地舉起手，聲音裡充滿了重獲新生的、卑微的希冀。" },
    { type: "dialogue", name: "雨果", text: "請問……奧拉老師，這棟別墅的房間數量，夠我們分嗎？", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/day4_語音/071請問……奧拉老師，這棟別墅的房間數量，夠我們分嗎？.wav" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_正常.png" },
    { type: "dialogue", name: "旁白", text: "奧拉老師瞥了我一眼，語氣平靜得像在陳述一個再普通不過的事實。" },
    { type: "dialogue", name: "奧拉", text: "有六間獨立的套房，每一間都有獨立的指紋鎖。你們每個人，都可以單獨住一間。", voice: "assets/audio/voice/day4_語音/072有六間獨立的套房，每一間都有獨立的指紋鎖。你們每個人，都可以單獨住一間。.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（——！！那一瞬間，我的耳邊彷彿有聖潔的天堂鐘聲，大聲地敲響了！）", avatar: "assets/img/cha/雨果_頭像_便服_微笑.png", voice: "assets/audio/voice/day4_語音/073（——！！那一瞬間，我的耳邊彷彿有聖潔的天堂鐘聲，大聲地敲響了！）.wav" },
    { type: "dialogue", name: "旁白", text: "我激動得差點當場跪下來給奧拉老師磕頭！我不用和盧卡斯學長同房了！我的清白、我的心跳，還有我那搖搖欲墜的社會性地位，在最關鍵的時刻被完整地保住了！" },
    { type: "dialogue", name: "旁白", text: "這簡直是數學公式所創造出的、宇宙級的奇蹟！" },

    // =====================================================================
    // 🎬 場景三點五：別墅大廳，安頓與研究目標交代 — 完整配音
    // =====================================================================
    { type: "bg", src: "assets/img/bg/豪華的別墅一樓客廳。大理石地板折射著精緻的吊燈光芒，落地窗外是高山森林的壯麗景致。.png", fade: true, bgm: "assets/audio/bgm/傍晚活動.mp3", location: "下午，別墅一樓客廳" },
    { type: "dialogue", name: "旁白", text: "走進別墅，大理石地板折射著頭頂吊燈精緻的光芒，落地窗外是望不盡的高山森林。大家都將行李暫時放在一旁，圍坐在柔軟的真皮沙發上。" },
    { type: "dialogue", name: "旁白", text: "奧拉老師則姿態優雅地坐在中島吧台邊，一手敲著筆記型電腦，一手端著那杯永遠喝不完的咖啡。" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞社長一言不發地站在沙發旁，開始主持房間的分配。" },
    { type: "dialogue", name: "西爾維亞", text: "分配房間。我睡 201 套房。艾薇睡 202 套房。", voice: "assets/audio/voice/day4_語音/074分配房間。我睡 201 套房。艾薇睡 202 套房。.wav" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_普通.png" },
    { type: "dialogue", name: "旁白", text: "艾薇點點頭，推了推眼鏡，有些嚴肅地看著自己懷裡那個鼓鼓的提袋。" },
    { type: "dialogue", name: "艾薇", text: "收到。我已經為小白在 202 號房間的抽屜裡，布置好了 100% 純棉的安全巢穴。這有助於維持牠在陌生環境下的情緒穩定。", voice: "assets/audio/voice/day4_語音/075收到。我已經為小白在 202 號房間的抽屜裡，布置好了 100% 純棉的安全巢穴。這有助於維持牠在陌生環境下的情緒穩定。.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "奧拉老師這時緩緩推了推眼鏡，用極其平淡、卻不容置疑的口吻開了口。" },
    { type: "dialogue", name: "奧拉", text: "蜜拉思，你跟我住三樓的主臥房。", voice: "assets/audio/voice/day4_語音/076蜜拉思，你跟我住三樓的主臥房。.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_唔？.png" },
    { type: "dialogue", name: "旁白", text: "二哥微微一愣，有些無辜地指了指沙發旁放著的培養箱。" },
    { type: "dialogue", name: "蜜拉思", text: "咦？可是我還要就近觀測那些植物孢子的——", voice: "assets/audio/voice/day4_語音/077咦？可是我還要就近觀測那些植物孢子的——.wav" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_說話.png" },
    { type: "dialogue", name: "奧拉", text: "晚上，我需要你在一旁協助我，進行一些高三模擬考的成績數據探討。這點很重要，不能被打擾。", voice: "assets/audio/voice/day4_語音/078晚上，我需要你在一旁協助我，進行一些高三模擬考的成績數據探討。這點很重要，不能被打擾。.wav" },
    { type: "dialogue", name: "旁白", text: "他一邊說著，一雙金眸一動不動地盯著二哥，語氣強硬得沒有一絲商量的餘地。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_困擾.png" },
    { type: "dialogue", name: "蜜拉思", text: "……好吧。那我聽你的。", voice: "assets/audio/voice/day4_語音/079……好吧。那我聽你的。。.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "平時在實驗室裡隨心所欲、誰的話都不聽的二哥，此刻在奧拉老師冷峻的氣場壓制下，竟連半句反駁都不敢說，只能乖乖低頭答應。" },

    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_一般.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞社長收回視線，面無表情地，指了指桌上剩下的兩把鑰匙。" },
    { type: "dialogue", name: "西爾維亞", text: "二樓還有兩間房。203 與 204。盧卡斯，雨果，你們自己選。", voice: "assets/audio/voice/day4_語音/080二樓還有兩間房。203 與 204。盧卡斯，雨果，你們自己選。.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "學長微笑著看向我，那溫和的目光讓我的心跳又漏了一拍。" },
    { type: "dialogue", name: "盧卡斯", text: "那雨果睡 203 號房，我睡對面的 204 號房吧。這樣剛好在正對門，如果晚上孢子的影響又加重了，或者有任何不舒服，你隨時開門叫我，我能立刻聽到。", voice: "assets/audio/voice/day4_語音/081那雨果睡 203 號房，我睡對面的 204 號房吧。這樣剛好在正對門，如果晚上孢子的影響又加重了，或者有任何不舒服，你隨時開門叫我，我能立刻聽到。.wav" },
    { type: "dialogue", name: "雨果", text: "……好的，謝謝學長。那就聽學長的安排。", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/day4_語音/082……好的，謝謝學長。那就聽學長的安排。.wav" },
    { type: "dialogue", name: "雨果", text: "（雖然隔著厚實的防音木門和牆壁，但他偏偏就睡在正對面！這簡直就像是把引線拉到最短的定時炸彈，我半夜出門去洗手間，都得小心翼翼的了。）", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/day4_語音/083雖然隔著厚實的防音木門和牆壁，但他偏偏就睡在正對面！這簡直就像是把引線拉到最短的定時炸彈，我半夜出門去洗手間，都得小心翼翼的了。.wav" },
    { type: "hide_char" },

    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞社長拍了拍手，將所有人的注意力重新吸引過去。" },
    { type: "dialogue", name: "西爾維亞", text: "安頓完畢。現在交代本次暑期合宿的研究目標。我們的目標：採集高山特有的『原始寄生孢子』母株。", voice: "assets/audio/voice/day4_語音/084安頓完畢。現在交代本次暑期合宿的研究目標。我們的目標：採集高山特有的『原始寄生孢子』母株。.wav" },
    { type: "dialogue", name: "西爾維亞", text: "這種孢子在高壓與高濕度環境下具有極強的活性，但一旦離開母株，其在稀薄大氣下的自發性揮發半衰期，會迅速縮短。", voice: "assets/audio/voice/day4_語音/085這種孢子在高壓與高濕度環境下具有極強的活性，但一旦離開母株，其在稀薄大氣下的自發性揮發半衰期，會迅速縮短。.wav" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "艾薇迅速在她的電子數據板上劃出幾條曲線，展示給我們看。" },
    { type: "dialogue", name: "艾薇", text: "根據目前掌握的數據，該孢子在氣壓下降 10% 的環境下，代謝率會提升 18%。我們需要在明天上午進入森林，在指定座標放置三個採樣器，並於後天回收。", voice: "assets/audio/voice/day4_語音/086根據目前掌握的數據，該孢子在氣壓下降 10% 的環境下，代謝率會提升 18%。我們需要在明天上午進入森林，在指定座標放置三個採樣器，並於後天回收。.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞點點頭，極其果斷地宣布了分組。" },
    { type: "dialogue", name: "西爾維亞", text: "分組。明天早上八點出發。我和艾薇一組，去東側山谷水源地採樣。", voice: "assets/audio/voice/day4_語音/087分組。明天早上八點出發。我和艾薇一組，去東側山谷水源地採樣。.wav" },
    { type: "dialogue", name: "西爾維亞", text: "盧卡斯，雨果，你們兩個人一組，去西側針葉林斜坡採樣。老師和奧拉留守別墅，看管實驗儀器和接收數據。這樣可以嗎？", voice: "assets/audio/voice/day4_語音/088盧卡斯，雨果，你們兩個人一組，去西側針葉林斜坡採樣。老師和奧拉留守別墅，看管實驗儀器和接收數據。這樣可以嗎？.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我整個人瞬間石化，瞳孔失去了焦距。" },
    { type: "dialogue", name: "雨果", text: "（等一下！！西爾維亞社長！你這不是把我直接送進狼嘴裡嗎？！為什麼我和學長，又被分在同一個小組了？！）", avatar: "assets/img/cha/雨果_頭像_便服_絕望.png", voice: "assets/audio/voice/day4_語音/089等一下！！西爾維亞社長！你這不是把我直接送進狼嘴裡嗎？！為什麼我和學長，又被分在同一個小組了？！.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "學長看著我那張震驚得快要裂開的臉，有些好笑地、輕輕拍了拍我的肩膀。" },
    { type: "dialogue", name: "盧卡斯", text: "西側的針葉林坡度比較陡，而且路面比較濕滑。雨果，明天路上要小心喔。別擔心，如果有難走的地方，我會牽著你走的。", voice: "assets/audio/voice/day4_語音/090西側的針葉林坡度比較陡，而且路面比較濕滑。雨果，明天路上要小心喔。別擔心，如果有難走的地方，我會牽著你走的。.wav" },
    { type: "dialogue", name: "旁白", text: "我臉上又是一陣滾燙，拼命搖頭，舌頭差點打結。" },
    { type: "dialogue", name: "雨果", text: "不、不用了學長！我自己能走！我……我體力很好的！", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/day4_語音/091不、不用了學長！我自己能走！我……我體力很好的！.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_笑.png" },
    { type: "dialogue", name: "旁白", text: "學長溫和地笑了笑，沒有拆穿我的慌張。他像是忽然想起什麼，轉頭看向社長。" },
    { type: "dialogue", name: "盧卡斯", text: "呃……對了，西爾維亞，安娜塔西亞……妳的妻子，今天不跟我們一起來嗎？", voice: "assets/audio/voice/day4_語音/092呃……對了，西爾維亞，安娜塔西亞……妳的妻子，今天不跟我們一起來嗎？.wav" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_一般.png" },
    { type: "dialogue", name: "西爾維亞", text: "我妻子。今天聲樂社在高中有夏季公演的總彩排，她走不開。她明天早上會搭頭班車上山，在營地跟我們會合。", voice: "assets/audio/voice/day4_語音/093我妻子。今天聲樂社在高中有夏季公演的總彩排，她走不開。她明天早上會搭頭班車上山，在營地跟我們會合。.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "旁白", text: "學長一聽到「妻子」這個詞，嘴角微微抽動了一下，有些心有餘悸地摸了摸自己的耳朵。" },
    { type: "dialogue", name: "盧卡斯", text: "……好，我的耳膜，準備好開始痛了。", voice: "assets/audio/voice/day4_語音/094……好，我的耳膜，準備好開始痛了。.wav" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "西爾維亞", text: "我覺得她的音頻還不錯。", voice: "assets/audio/voice/day4_語音/095我覺得她的音頻還不錯。.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我坐在一旁，看著社長那張面無表情、卻又無比理所當然的臉，心中對社長那強悍的戰鬥力，以及她耳膜的耐磨性，感到由衷的敬佩。" },
    { type: "dialogue", name: "雨果", text: "幸好我有帶耳塞……有機會的話，就分給學長吧。", avatar: "assets/img/cha/雨果_頭像_便服_平常.png", voice: "assets/audio/voice/day4_語音/096幸好我有帶耳塞……有機會的話，就分給學長吧。.wav" },
    { type: "dialogue", name: "旁白", text: "交代完畢，眾人便各自回房安頓行李，整理明天的採樣裝備。" },
    { type: "dialogue", name: "旁白", text: "山區的夜色降臨得極快。我才不過小睡了一會兒，再睜開眼時，窗外便已是一片漆黑——別墅，被一片冷冽而深沉的高山森林，悄無聲息地包圍了。" },

    // =====================================================================
    // 🎬 場景四：深夜的廚房，避無可避的交鋒
    // =====================================================================
    { type: "bg", src: "assets/img/bg/別墅一樓的高級中島廚房。只有一盞昏黃的壁燈亮著，窗外是高山的月色。.png", fade: true, bgm: "assets/audio/bgm/夜晚獨自一人BGM.mp3", location: "深夜 11:30，別墅一樓廚房" },
    { type: "dialogue", name: "旁白", text: "時間，來到了深夜十一點半。" },
    { type: "dialogue", name: "旁白", text: "雖然如願拿到了單人房的鑰匙，並且在裡面把門鎖得死死的，但我體內殘留的孢子，卻偏偏挑在這大半夜裡開始興風作浪。" },
    { type: "dialogue", name: "旁白", text: "高山的寒夜，並沒能澆熄我體內深處那股蠢蠢欲動的微弱熱流。我在床上翻來覆去，只覺得口乾舌燥，全身像是有一團小火在悶燒，怎麼樣都無法入睡。" },
    { type: "dialogue", name: "旁白", text: "最後，我認命地換上略顯寬鬆的睡衣，躡手躡腳地走下樓梯，打算去一樓廚房倒杯冰水，好讓自己這顆超載的大腦，能強行冷靜下來。" },
    { type: "dialogue", name: "雨果", text: "（只要快點喝完水，趕快回房間鎖上門，就安全了……）", avatar: "assets/img/cha/雨果_頭像_睡衣_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "廚房裡只亮著一盞昏黃的壁燈。我剛走到門口——整個人，卻像是被瞬間凍住了一樣，僵在原地，動彈不得。" },
    { type: "sfx", src: "assets/audio/sfx/清脆的倒水聲.mp3" },
    { type: "dialogue", name: "旁白", text: "皎潔的月光，透過大片的落地窗，靜靜地灑在高級的中島吧台旁。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_普通.png" },
    { type: "dialogue", name: "旁白", text: "學長，正背對著月光，靜靜地站在那裡。他似乎剛洗完澡，穿著一件深灰色的 V 領棉質居家服，額前微濕的紅棕色短髮，有些凌亂地散落著。" },
    { type: "dialogue", name: "旁白", text: "而最致命的是——他此刻，沒有戴上平日裡那副半框眼鏡。" },
    { type: "dialogue", name: "旁白", text: "月光精準地勾勒出他結實的身形與手臂的肌肉線條，在他微敞的領口與鎖骨處，灑下一片深邃的陰影。失去了鏡片的遮擋，那雙紅棕色的眼眸在昏暗中顯得深邃無比，無聲地散發著一種致命的、成熟男性的費洛蒙。" },
    { type: "dialogue", name: "旁白", text: "他聽到我的腳步聲，緩緩轉過頭，聲音因為夜深而帶著一絲低沉的沙啞。" },
    { type: "dialogue", name: "盧卡斯", text: "雨果？怎麼這麼晚還沒睡？", voice: "assets/audio/voice/盧卡斯_疑惑.wav" },
    { type: "dialogue", name: "雨果", text: "（……！糟、糟了，我的眼睛——根本移不開！）", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "hide_char" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：夜間防禦力下降！</b><br>高濃度費洛蒙，正在對你發動直接衝擊！<br><br><b>🎮 理智與視線的雙重防線</b><br>學長身上有三個<b style='color:#ff66aa;'>「費洛蒙高能警報區」</b>會死死勾住你的視線：<b>V 領鎖骨</b>、<b>深邃雙眼</b>、<b>修長手指</b>。<br><br><b>玩法（限時 12 秒）：</b><br>拖動你的<b>「視線圓圈」</b>，把它停在隨機出現的<b style='color:#7CFC00;'>綠色安全觀測物</b>上（玻璃杯 / 微波爐時鐘 / 冰箱貼）。<br>讓視線停在安全區的<b>累計時間達到 8 秒</b>，才能克制住快要決堤的視覺渴望！</div>" },

    // ------------------------------------------------------------------
    // 🎮 Day 4 特殊小遊戲：理智與視線的雙重防線 (Visual Gaze Defense)
    // ------------------------------------------------------------------
    {
        type: "gaze_defense_qte",
        time: 12.0,
        safeTarget: 8.0,
        lucasSprite: "assets/img/cha/盧卡斯_立繪_睡衣_普通.png",
        hotZones: [
            { label: "V 領與鎖骨", x: 50, y: 40 },
            { label: "深邃雙眼", x: 50, y: 17 },
            { label: "修長手指", x: 30, y: 70 }
        ],
        safeObjects: [
            { label: "🟩 微波爐時鐘", x: 84, y: 20 },
            { label: "🥛 乾淨玻璃杯", x: 16, y: 30 },
            { label: "🧲 冰箱貼", x: 82, y: 72 }
        ],
        barrage: [
            "好帥……",
            "沒戴眼鏡的樣子太性感了……",
            "想摸鎖骨……",
            "好想被他抱住……",
            "那雙手……"
        ]
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "旁白", text: "我死死咬著下唇，用盡了意志力，才硬生生地把視線從學長微敞的領口上扯開，將腦袋裡那些狂湧的黃色廢料，連同口水一起吞回了肚子裡。" },
    { type: "dialogue", name: "旁白", text: "我有些狼狽地避開他深邃的目光，聲音因為緊張而微微發啞。" },
    { type: "dialogue", name: "雨果", text: "我……有點口渴，下來倒杯水喝。", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "學長低低地笑了一聲，那低沉的震動聲，在寂靜的深夜裡顯得格外清晰。他轉過身，從旁邊的架子上取下一個乾淨的玻璃杯，替我倒了一杯溫水，然後端著它，朝我邁步走來。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_普通.png" },
    { type: "dialogue", name: "旁白", text: "因為沒有戴眼鏡，為了在昏暗的月光中看清我的表情，他不自覺地，靠得比平時更近了一些。" },
    { type: "dialogue", name: "旁白", text: "近到我甚至能清楚地感受到，他身上那股剛洗完澡的、溫暖的水氣，以及那縷越來越濃郁的雪松香。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_擔心.png" },
    { type: "dialogue", name: "旁白", text: "他微微低下頭，目光停留在我那不正常發紅的臉頰上，眉頭輕輕皺起。" },
    { type: "dialogue", name: "盧卡斯", text: "你的臉真的很紅，溫度好像比白天更高了。是不是高山反應讓你發燒了？還是昨天的神經燥熱，變嚴重了？", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "旁白", text: "他一邊低聲說著，一邊極其自然地抬起了手。那隻骨節分明、帶著微溫且乾燥觸感的手掌，就這樣毫無防備地、貼上了我的額頭。" },
    { type: "sfx", src: "assets/audio/sfx/心跳聲.mp3" },
    { type: "add_class", target: "#vn-screen", className: "heartbeat-flash" },
    { type: "dialogue", name: "雨果", text: "（——！！！）", avatar: "assets/img/cha/雨果_頭像_睡衣_羞憤交加.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "在肌膚相觸的那一瞬間，我體內的孢子彷彿接收到了某種渴望已久的終極信號，開始在我的神經末梢瘋狂尖叫。我的雙腿猛地一軟，差點站不穩——大腦裡那道名為理智的大壩，在這一刻被撕裂開一道巨大的裂痕。" },
    { type: "remove_class", target: "#vn-screen", className: "heartbeat-flash" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_擔心.png" },
    { type: "dialogue", name: "旁白", text: "他感受著手心傳來的異常高溫，眼神瞬間變得認真起來。他不僅沒有收回手，反而用另一隻手，穩穩地扶住了我的肩膀，將我朝他的方向托住。" },
    { type: "dialogue", name: "盧卡斯", text: "溫度真的很高。雨果，你真的病了。蜜拉思老師說的神經燥熱，是不是變嚴重了？要不要……我抱你回房休息？", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "旁白", text: "這種帶著保護慾、不容拒絕的強勢與溫柔，正是我在無數個孤單深夜的妄想中，瘋狂渴望過的碰觸……" },
    { type: "dialogue", name: "旁白", text: "我的大腦一片空白，眼角因為極度壓抑的渴望，泛起了生理性的淚水，聲音顫抖得不成樣子。" },
    { type: "dialogue", name: "雨果", text: "學長……別碰我……", avatar: "assets/img/cha/雨果_頭像_睡衣_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "雨果", text: "（——不！不要停！再多碰我一下，我就真的、真的要瘋了！）", avatar: "assets/img/cha/雨果_頭像_睡衣_羞憤交加.png", voice: "assets/audio/voice/雨果_生氣.wav" },
    { type: "hide_char" },
    { type: "sfx", src: "assets/audio/sfx/甩門.mp3", stopBgm: true },
    {
        type: "bg",
        src: "", // Black bg
    },
    { type: "dialogue", name: "旁白", text: "我用盡了全身最後一絲微弱的理智，猛地推開了學長的手，甚至連那杯溫水都顧不上接，像一隻受驚過度的兔子，轉身跌跌撞撞地逃回了樓梯上，一路衝回房裡，「砰」地一聲，死死鎖上了門。" },

    // --- 第三人稱敘述：雨果已離場，鏡頭留給盧卡斯 ---
    { type: "bg", src: "assets/img/bg/別墅一樓的高級中島廚房。只有一盞昏黃的壁燈亮著，窗外是高山的月色。.png", fade: true, location: "同一時刻，無人的廚房" },
    { type: "dialogue", name: "旁白", text: "倉皇的腳步聲沿著樓梯遠去，最終被一聲關門聲徹底切斷。偌大的廚房裡，重新只剩下盧卡斯一個人。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_普通.png" },
    { type: "dialogue", name: "旁白", text: "月光下，他維持著抬手的姿勢，靜靜地凝視著自己空落落的、還殘留著青年滾燙體溫的手心，久久沒有放下。" },
    { type: "dialogue", name: "旁白", text: "良久，他才緩緩抬起頭，望向樓梯口那片青年落荒而逃的方向。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_笑.png" },
    { type: "dialogue", name: "旁白", text: "那雙失去了鏡片遮擋的紅棕色眼眸，在一片黑暗中，閃過一絲深邃而莫測的光芒。隨後，他緩緩地收攏五指，將那份殘溫攥進掌心——嘴角，勾起了一抹極淡、卻意味深長的微笑。" },
    { type: "dialogue", name: "盧卡斯", text: "……看來，不是發燒啊。", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "hide_char" },

    {
        type: "fade_text",
        text: "<span class='fade-line-1'>Day 4 存活確認。</span><br><br><span class='fade-line-2'>理智值剩餘：30%</span>"
    },
    { type: "delay", time: 8, stopBgm: true },
    { type: "end_day", day: 4 }
];
