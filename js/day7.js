const Day7Script = [
    // =====================================================================
    // 🎬 Day 7：星空、煙火與遲來的真心 (多重結局)
    // =====================================================================
    // 註：本日依 Day6 的路線選擇 (flag: day6_route) 自動分線；若無存檔則手動選路。
    { type: "bg", src: "assets/img/bg/豪華的別墅一樓客廳。大理石地板折射著精緻的吊燈光芒，落地窗外是高山森林的壯麗景致。.png", fade: true, bgm: "assets/audio/bgm/日常BGM.mp3", location: "清晨，別墅一樓客廳" },
    { type: "dialogue", name: "旁白", text: "昨夜那場驚天動地的雷雨，在清晨徹底放晴了。陽光透過落地窗灑進來，亮得有些不真實。" },
    { type: "dialogue", name: "旁白", text: "然而，餐桌上的氣氛，卻和這晴朗的天氣完全相反。" },
    { type: "dialogue", name: "旁白", text: "我和盧卡斯，一個坐在餐桌的最東邊，一個坐在最西邊，中間隔著整整一條長桌的距離，誰都不敢抬頭直視對方。" },
    { type: "dialogue", name: "雨果", text: "（昨、昨晚那個吻……到底算什麼？是孢子讓他一時失控了嗎？還是……他只是被鬼故事嚇到，找個人壯膽？）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "我捏著叉子，無意識地戳著盤子裡的可頌，一口都吃不下。餘光瞥見對面的盧卡斯，也罕見地有些心不在焉，連咖啡涼了都忘了喝。" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞抹了把臉，打破了這片詭異的沉默，帶來了今天的最新情報。" },
    { type: "dialogue", name: "西爾維亞", text: "山下橋樑的加固工程，還需要一整天。回程大巴順延至明天。今天，自由活動。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_笑.png" },
    { type: "dialogue", name: "旁白", text: "蜜拉思二哥幸災樂禍地夾了塊培根，眼神意味深長地在我和盧卡斯之間打量著。" },
    { type: "dialogue", name: "蜜拉思", text: "哎呀～那不就又能多玩一天了嗎？真是不幸中的大幸呢～某些人昨晚好像過得很精彩嘛～", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（二、二哥！你那個曖昧的眼神到底是想暗示什麼啊啊啊！）", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_生氣.wav" },
    { type: "dialogue", name: "旁白", text: "我被他那一眼看得渾身發毛，趕緊低下頭，把通紅的臉死死埋進了牛奶杯裡。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "旁白", text: "安娜塔西亞興奮地拍了拍手，聲音瞬間蓋過了滿桌的尷尬。" },
    { type: "dialogue", name: "安娜塔西亞", text: "既然多了一天——那今晚的獅子座流星雨與山下祭典，我們就有機會享受啦！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "dialogue", name: "安娜塔西亞", text: "昨晚下了那麼大的雨，今晚的天空一定亮得像撒了一整把碎鑽！" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "多出來的這一天，究竟會通往什麼樣的夜晚——此刻的我，還一無所知。" },

    // 依 Day6 選擇自動分線；無存檔則走手動選路
    { type: "jump_flag", key: "day6_route", map: { "A": "routeA_d7", "B": "routeB_d7" } },
    {
        type: "story_choice",
        prompt: "（偵測不到 Day 6 的路線紀錄）<br>今天要延續哪一條路線？",
        options: [
            { text: "🌌 星空線（前往南面山頂觀星）", jump: "routeA_d7" },
            { text: "🎆 煙花線（前往山村夏日祭典）", jump: "routeB_d7" }
        ]
    },

    // =====================================================================
    // 🌌 路線 A：星空線
    // =====================================================================
    { type: "label", name: "routeA_d7" },
    { type: "bg", src: "assets/img/bg/高山風景。原本預期中的破舊小木屋還在，但更顯眼的是一棟極度奢華、帶有大片落地窗和庭院的現代化三層樓別墅。.png", fade: true, bgm: "assets/audio/bgm/日常BGM.mp3", location: "午後，別墅庭院" },
    { type: "dialogue", name: "旁白", text: "午後的陽光暖洋洋地灑在別墅庭院裡，遠處的南面山頂在藍天下輪廓分明。安娜塔西亞拉著西爾維亞，早早就開始規劃今晚的觀星行程。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_微笑.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "決定了！今晚我們去南面山頂觀景台看流星雨！那裡視野最好！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_說話.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "雨果，你昨晚可是答應庸俗要一起看的，可不准臨陣脫逃反悔喔～", voice: "assets/audio/voice/安娜塔西亞_嗯？.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（——！這位大小姐，記性怎麼偏偏在這種時候這麼好啊！）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "……嗯。雨果，如果你不嫌棄的話，今晚……我們一起看吧。", voice: "assets/audio/voice/盧卡斯_尷尬.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "昨晚那個吻的餘溫彷彿還在唇上發燙，此刻被當眾點破「約定」，我只覺得整張臉都要燒起來了。" },
    { type: "dialogue", name: "雨果", text: "我、我沒有要反悔……", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "旁白", text: "我把後半句「只是怕自己心臟會受不了暴斃」嚥了回去，低著頭，幾不可察地點了點頭。" },

    // --- A-場景一：夜間登山（trace_path 小遊戲）---
    { type: "bg", src: "assets/img/bg/入夜的山徑。天色由橘紅轉為深藍，群山化作墨色的剪影，只有手電筒的光束在前方搖晃。.png", fade: true, bgm: "assets/audio/bgm/深夜活動.mp3", location: "傍晚，上山的夜路" },
    { type: "dialogue", name: "旁白", text: "傍晚時分，一行人打著手電筒，朝南面山頂出發。雨後的山路格外濕滑泥濘，在黑暗中更是難行。" },
    { type: "dialogue", name: "旁白", text: "走在前頭的安娜塔西亞，理所當然地全程掛在西爾維亞身上，享受著白馬王子一路的親密攙扶。" },
    { type: "dialogue", name: "旁白", text: "而落在後面的我，在一處泥濘的陡坡上，腳下一滑——" },
    { type: "sfx", src: "assets/audio/sfx/踩空的悶響.mp3" },
    { type: "dialogue", name: "雨果", text: "啊——！", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯眼疾手快地一把攬住我的腰。黑暗中，他的呼吸近在耳畔，溫熱的氣息撫過我的耳廓。" },
    { type: "dialogue", name: "盧卡斯", text: "小心腳下。把手給我，這段路太黑了，我用手電筒替你照著。", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "他不由分說地，再一次牽住了我的手。而這一次，孢子的妄想混雜著昨夜那個吻的記憶，幾乎要把我的理智徹底沖垮。" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：濕滑夜路＋牽手＋昨夜的吻！重心與理智同時搖搖欲墜！</b><br><br><b>🎮 夜路提燈・循跡</b><br>學長替你打著手電筒帶路。<br><br><b>玩法（限時 16 秒）：</b><br>拖動<b>手電筒光圈</b>，把前方那個<b style='color:#ffe08a;'>✦ 帶路光點</b>一直罩在光圈裡；<br>光點跑出光圈就會<b>打滑</b>、穩定度下降。跟緊它，安全走完夜路抵達山頂！</div>" },

    {
        type: "trace_path_qte",
        time: 16.0,
        lightRadius: 13,
        stableDrop: 24,
        stableRecover: 13,
        whispers: [
            "他的手好穩……",
            "黑暗裡……只有他的溫度……",
            "別滑倒、別栽進他懷裡……",
            "再走一段就到了……"
        ]
    },

    { type: "dialogue", name: "旁白", text: "我死死跟著他手電筒的光，一步一步、穩穩地走完了那段濕滑的夜路——至少，身體上沒有出糗。" },

    // --- A-場景二：艾薇的小測驗 ---
    { type: "dialogue", name: "旁白", text: "抵達山頂的途中，我的手機照例震動了一下——是艾薇。即便她今晚在別墅裡陪小白，也沒忘了她的「醫療助理」職責。" },
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：我們肉眼能看到流星，是流星體高速衝入大氣層、與空氣摩擦生熱而發光。這個過程主要發生在大氣層的哪一層？", targetChat: "ivy" },
    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>🎮 艾薇的遠程小測驗</b><br><br>星空太犯規，孢子又把選項用<b style='color:#ff66aa;'>妄想泡泡</b>蓋住了！<br><br><b>玩法：</b>狂點戳破泡泡，再選出<b>正確答案</b>！</div>" },
    { type: "wait_for_chat", chatId: "ivy" },
    {
        type: "chat_qte_academic",
        targetChat: "ivy",
        time: 14.0,
        glitch: false,
        bubbles: {
            count: 5,
            texts: ["他牽著我的手一路上山……", "山頂只有我們兩個……", "等下就要看流星了……", "他的側臉映著星光……", "心跳好吵，會被聽到嗎……"]
        },
        mutangOptions: [
            { text: "選項 A：想靠在學長肩上看星星", isCorrect: false },
            { text: "選項 B：想牽著他一直到天亮", isCorrect: false },
            { text: "選項 C：學長的眼睛比星星還亮", isCorrect: false }
        ],
        options: [
            { text: "選項 A：對流層", isCorrect: false },
            { text: "選項 B：中氣層", isCorrect: true },
            { text: "選項 C：學長的眼睛比星星還亮", isCorrect: false }
        ],
        successMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👍回答正確。中氣層。" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "順帶一提，你今晚的瞳孔反射率異常地高。建議減少注視特定光源——例如盧卡斯。" }
        ],
        failMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👎回答錯誤。你的答案帶有強烈的孢子妄想特徵。" },
            { sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "山上訊號不好啦（才怪）！再一次！", isSelf: true },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我重新發送。請先清除妄想泡泡。" },
            { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：我們肉眼能看到流星，是流星體高速衝入大氣層、與空氣摩擦生熱而發光。這個過程主要發生在大氣層的哪一層？", targetChat: "ivy" }
        ]
    },
    { type: "transition", to: "VN", fade: true },

    // --- A-場景三：山頂・流星雨 ---
    { type: "bg", src: "assets/img/bg/南面山頂的觀景台。墨藍色的夜空鋪滿了密密麻麻、亮得驚人的星辰。.png", fade: true, bgm: "assets/audio/bgm/溫馨事件BGM.mp3", location: "夜晚，南面山頂觀景台" },
    { type: "dialogue", name: "旁白", text: "回完訊息，眾人總算在山頂的觀景台上席地而坐。墨藍色的夜空，鋪滿了密密麻麻、亮得驚人的星辰。" },
    { type: "dialogue", name: "旁白", text: "第一顆流星，拖著長長的尾巴，劃破了夜空。緊接著是第二顆、第三顆……無數顆流星，像被打翻的銀河，紛紛揚揚地灑落下來。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "哇——！好美！西爾維亞快看！我要許願！我希望永遠和你在一起——啊不對，這種願望說出來就不靈了！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_一般.png" },
    { type: "dialogue", name: "西爾維亞", text: "……說出來，我也會努力實現。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "西爾維亞——！！！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "看著那對閃瞎人眼的戀人，安娜塔西亞忽然回過頭，朝我和盧卡斯使了個極其誇張的眼色，然後一把拉起西爾維亞。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_說話.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "哎呀，我突然想去那邊的觀景台看，那裡角度更好！西爾維亞陪我去！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "dialogue", name: "安娜塔西亞", text: "你們兩個——就待在這兒，別跟過來打擾我們的浪漫時刻喔！" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "眨眼間，偌大的山頂，就只剩下了我和盧卡斯兩個人，以及，滿天傾瀉而下的流星雨。" },

    // =====================================================================
    // 💗🌌 A-告白：流星雨下，說不清的距離
    // =====================================================================
    { type: "bg", src: "assets/img/bg/流星雨下的山頂一隅。墨藍的夜空被一道道流星劃開，四下卻安靜得能聽見彼此的呼吸。.png", fade: true, bgm: "assets/audio/bgm/告白.mp3", location: "流星雨下的山頂一隅" },
    { type: "dialogue", name: "旁白", text: "安娜塔西亞和西爾維亞的身影一消失，那片好不容易被人聲沖淡的尷尬，便又鋪天蓋地地、濃稠地湧了回來。" },
    { type: "dialogue", name: "旁白", text: "流星在頭頂無聲地墜落。可我和盧卡斯之間，卻隔著一段說不清、也跨不過去的距離，誰都沒有先開口。" },
    { type: "dialogue", name: "雨果", text: "（說點什麼啊……隨便說點什麼都好……可是腦袋一片空白，連『今天星星真多』這種廢話都擠不出來……）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "沉默，一秒一秒地被拉長，曖昧的張力在冷冽的夜風裡幾乎要凝成實體。最終，是盧卡斯先打破了這片令人窒息的安靜。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "雨果……昨天晚上的事。我，不想當作沒發生過。", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "旁白", text: "我的肩膀猛地一顫。" },
    { type: "dialogue", name: "盧卡斯", text: "我也不想用『孢子』或『一時衝動』來搪塞。那個吻……是我真心想做的。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_普通.png" },
    { type: "dialogue", name: "旁白", text: "他向前邁了半步，那半步的距離，卻讓我的心臟狂跳得幾乎要撞碎肋骨。他低下頭，聲音又輕又慢，像怕驚擾了什麼。" },
    { type: "dialogue", name: "盧卡斯", text: "我想……我大概很久以前，就喜歡上你了。久到，我自己都沒察覺。", voice: "assets/audio/voice/盧卡斯_輕輕笑.wav" },
    { type: "dialogue", name: "盧卡斯", text: "所以……我想知道，你的心意。可以嗎？" },
    { type: "hide_char" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：學長正式告白！這是孢子代謝以來，最大的一次心跳衝擊！</b><br><br><b>🎮 最後的心跳節律</b><br>在這片過於安靜、過於曖昧的星空下，每一次失控的喘息都無所遁形。<br><br><b>玩法（限時 13 秒）：</b>抓準時機點擊 <b>【深呼吸・吞口水】</b>（或空白鍵），把心跳穩住——這一次不是為了隱藏，而是為了能好好地、不結巴地，說出那句話。</div>" },

    {
        type: "heartbeat_rhythm_qte",
        time: 13.0,
        charSprite: "assets/img/cha/盧卡斯_立繪_便服_普通.png",
        startRate: 40,
        warnRate: 74,
        creep: 7,
        breathDrop: 15,
        lineGap: 2.5,
        lines: [
            { text: "（他在等我的答案……）", spike: 13 },
            { text: "（星星安靜得能聽見心跳……）", spike: 15 },
            { text: "（他的眼睛，比流星還亮……）", spike: 16 },
            { text: "（說出來……這一次，說出來……）", spike: 14 }
        ]
    },

    { type: "dialogue", name: "旁白", text: "我在能聽見針落的寂靜裡，死死壓住瀕臨爆炸的心跳，總算能抬起頭，直視他的眼睛。" },
    {
        type: "story_choice",
        prompt: "面對學長的告白，你（雨果）要如何回應？",
        options: [
            { text: "💗 鼓起勇氣，坦白心意", hint: "把藏了這麼久的話，親口說給他聽。", jump: "A_honest" },
            { text: "…… 還是說不出口", hint: "自卑和膽怯堵住了喉嚨……但他不會放棄。", jump: "A_shy" }
        ]
    },

    { type: "label", name: "A_honest" },
    { type: "dialogue", name: "旁白", text: "這幾天拼死壓抑的一切，在這片墜落的星河下，再也藏不住了。我攥緊了拳頭，逼自己迎上他的目光。" },
    { type: "dialogue", name: "雨果", text: "我……我也喜歡你。學長。很久、很久了。", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "雨果", text: "久到……我都已經做好打算，要把這個秘密，一個人帶進墳墓裡了。", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_笑.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯先是怔住，隨即，他眼底那片紅棕色，亮得比身後整片流星雨還要燦爛。他伸出手，動作甚至有些笨拙地，將我輕輕擁進懷裡。" },
    { type: "dialogue", name: "盧卡斯", text: "……還好。還好我說出口了。謝謝你，雨果。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "hide_char" },
    { type: "jump", to: "A_confmerge" },

    { type: "label", name: "A_shy" },
    { type: "dialogue", name: "旁白", text: "千言萬語湧到喉嚨口，卻被那份根深蒂固的自卑與膽怯，死死地堵了回去。我猛地別開臉，逃避著他的目光。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_普通.png" },
    { type: "dialogue", name: "旁白", text: "偏偏盧卡斯沒有放棄。他伸手，極輕地扳回我的臉，指腹微涼，迫使我與他對視。" },
    { type: "dialogue", name: "盧卡斯", text: "雨果，看著我。別怕。你說不出口，那就由我來說——我喜歡你。", voice: "assets/audio/voice/盧卡斯_輕輕笑.wav" },
    { type: "dialogue", name: "盧卡斯", text: "不是學長對學弟，也不是朋友。是想把你藏起來、只屬於我一個人的那種喜歡。" },
    { type: "dialogue", name: "旁白", text: "他的額頭，輕輕抵上我的額頭，呼吸交纏在這片清冷的夜風裡。" },
    { type: "dialogue", name: "盧卡斯", text: "所以，別再躲我了。好不好？" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "在他這份近乎縱容的、灼熱的深情面前，我那點可憐的抵抗，終於潰不成軍。我紅著眼眶，極輕極輕地，點了點頭。" },
    { type: "dialogue", name: "雨果", text: "……嗯。我也，喜歡你。對不起……讓你，等了這麼久。", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_乖巧.wav" },

    { type: "label", name: "A_confmerge" },
    { type: "dialogue", name: "旁白", text: "這一刻，在漫天傾瀉的流星見證下，我們終於跨過了那段尷尬而曖昧的距離。" },
    { type: "sfx", src: "assets/audio/sfx/親吻.mp3" },
    { type: "dialogue", name: "旁白", text: "他低下頭，再一次吻住了我。這個吻，起初依然帶著一點試探的青澀，卻在我顫抖著回應的瞬間，化作了失而復得的、滿溢的溫柔。" },
    { type: "dialogue", name: "雨果", text: "（原來……被自己喜歡的人，同樣喜歡著。是這種，連指尖都在發麻、像要從心底融化掉的，幸福的感覺。）", avatar: "assets/img/cha/雨果_頭像_便服_微笑.png", voice: "assets/audio/voice/雨果_開心.wav" },

    // =====================================================================
    // 🎬 A-尾聲：深夜，別墅・雨果的房間（便服版・沒能煞住的車）
    // =====================================================================
    { type: "bg", src: "assets/img/bg/深夜，豪華森林別墅酒店的房間。（雨果的房間）.png", fade: true, bgm: "assets/audio/bgm/盧卡斯夜訪BGM.mp3", location: "深夜，雨果的房間" },
    { type: "dialogue", name: "旁白", text: "那一夜，下山回到別墅，盧卡斯甚至沒換下外出的便服，就跟著我走到了房門口。" },
    { type: "dialogue", name: "旁白", text: "這一次，沒有鬼故事的藉口，也沒有雷雨的掩護。門開的瞬間，我們只是隔著門框，靜靜地對視著。空氣裡那根名為「理智」的弦，早已繃到了極限。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_普通.png" },
    { type: "dialogue", name: "旁白", text: "他沒有說話，只是抬起手，指尖帶著微微的顫，極輕地撫上我的臉頰。那點熟悉的溫度一觸到皮膚，我們之間僅存的那點克制與尷尬，便像薄冰一樣，無聲地裂開了。" },
    { type: "dialogue", name: "雨果", text: "（學長的手……在抖。原來……不只有我一個人，這麼緊張。）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png" },
    { type: "dialogue", name: "旁白", text: "他俯身過來，動作很慢，慢得像是在給我留足逃開的餘地。可是我沒有逃。我反而微微仰起頭，主動迎了上去。" },
    { type: "hide_char" },
    { type: "sfx", src: "assets/audio/sfx/關門聲2.mp3" },
    { type: "dialogue", name: "旁白", text: "門，在我們身後，被輕輕地合上。——這一次，誰也沒能再把那輛失控的車，煞住。" },
    {
        type: "story_choice",
        prompt: "接下來的內容涉及親密場面與 CG 演出，你可以選擇：",
        options: [
            { text: "…… 跳過，直接到隔天清晨", jump: "A_morning" },
            { text: "💗 留下來，陪他度過這一夜", jump: "A_night" }
        ]
    },

    { type: "label", name: "A_night" },
    { type: "add_class", target: "#vn-screen", className: "cam-dim" },
    { type: "bg", src: "assets/img/CG/H_cg_星空線/01他沒有給我任何喘息的餘地，灼熱的吻一路從唇瓣蜿蜒而下，順著下顎線，重重地落在我的頸側。我忍不住發出一聲變調的輕喘，雙腿一軟，整個人被他抵在了冰涼的門板上。.png", fade: true },
    { type: "sfx", src: "assets/audio/sfx/深吻長音效.mp3" },
    { type: "dialogue", name: "旁白", text: "房裡的燈被他反手按滅。窗外雨後澄澈的星光瞬間成為唯一的照明，將兩人糾纏的身影拉長。" },
    { type: "dialogue", name: "旁白", text: "他沒有給我任何喘息的餘地，灼熱的吻一路從唇瓣蜿蜒而下，順著下顎線，重重地落在我的頸側。" },
    { type: "dialogue", name: "雨果", text: "唔……學長……嗯啊……", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png" },
    { type: "dialogue", name: "旁白", text: "我忍不住發出一聲變調的輕喘，雙腿一軟，整個人被他抵在了冰涼的門板上。" },

    { type: "bg", src: "assets/img/CG/H_cg_星空線/02他的雙手輕而易舉地扣住了我的手腕，將它們舉高壓在門板上。隔著單薄的便服，我能清晰地感覺到他胸膛劇烈的起伏，以及那具高大身軀壓迫而來的驚人熱度。.png", fade: true },
    { type: "sfx", src: "assets/audio/sfx/心跳聲.mp3" },
    { type: "dialogue", name: "盧卡斯", text: "雨果……" },
    { type: "dialogue", name: "旁白", text: "他低啞地喚著我的名字，聲音裡透著壓抑已久的乾渴。那雙一向沉穩的紅棕色眼眸，此刻翻湧著毫不掩飾的侵略性。" },
    { type: "dialogue", name: "旁白", text: "他的雙手輕而易舉地扣住了我的手腕，將它們舉高壓在門板上。隔著單薄的便服，我能清晰地感覺到他胸膛劇烈的起伏。" },

    { type: "bg", src: "assets/img/CG/H_cg_星空線/03他牽起我的一隻手，十指緊緊交扣，壓在枕邊。那雙總是帶著從容笑意的紅棕色眼眸，此刻被濃重的慾望染成了深諳的暗紅。他溫熱的唇順著我的鎖骨一路向下，牙齒輕輕嚙咬著胸前那點已經因為緊張而挺立的紅點，惹得我發出一聲難耐的變調呻吟。.png", fade: true },
    { type: "dialogue", name: "旁白", text: "他一把將我抱起，壓倒在柔軟的床鋪上。他牽起我的一隻手，十指緊緊交扣，壓在枕邊。" },
    { type: "dialogue", name: "旁白", text: "他溫熱的唇順著我的鎖骨一路向下，輕輕嚙咬，惹得我發出一聲難耐的變調呻吟。" },
    { type: "dialogue", name: "雨果", text: "學長……別咬那裡……嗯啊……", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png" },

    { type: "bg", src: "assets/img/CG/H_cg_星空線/04下一秒，他將早已硬挺發燙、尺寸驚人的性器抵在了穴口。那可怕的熱度與存在感，讓我本能地想要往後退縮。.png", fade: true },
    { type: "dialogue", name: "盧卡斯", text: "放輕鬆……交給我。" },
    { type: "dialogue", name: "旁白", text: "他低啞地哄著，沾取了潤滑液耐心地擴張。下一秒，那可怕的熱度與存在感抵在入口，強勢而緩慢地一貫到底。" },

    { type: "bg", src: "assets/img/CG/H_cg_星空線/05雨果：「啊啊——！太、太大了……學長、停下……肚子、要被撐破了……」.png", fade: true },
    { type: "dialogue", name: "雨果", text: "啊啊——！太、太大了……學長、停下……肚子、要被撐破了……", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png" },
    { type: "dialogue", name: "盧卡斯", text: "乖……深呼吸……你裡面咬得好緊……好熱……" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>✨ 沒能煞住的車・星空與十指交扣</b><br><br><b>長按畫面【十指交扣】</b>累積星光歡愉；<br>當「熱浪衝擊」襲來時，快速點擊閃爍的 <b>🌟 星光脈衝</b>！</div>" },

    // 🎮 星空線專屬 H 小遊戲：十指交扣與熱度忍耐 (A線)
    {
        type: "h_starlight_grip_qte",
        time: 16.0,
        needBliss: 100,
        prompt: "長按畫面【十指交扣】累積熱度；熱浪襲來時點擊星光脈衝！",
        whispers: [
            "學長的手指……扣得好緊……",
            "別咬那裡……嗯啊……",
            "好熱……要被融化了……",
            "盧卡斯……再深一點……！",
            "手心全是汗……受不了了……"
        ]
    },

    { type: "bg", src: "assets/img/CG/H_cg_星空線/06痛楚逐漸褪去，取而代之的是一種頭皮發麻、連脊椎都在發酸的強烈快感。理智的防線全面崩潰，我無法自控地發出甜膩的叫床聲。.png", fade: true },
    { type: "sfx", src: "assets/audio/sfx/深吻長音效.mp3" },
    { type: "dialogue", name: "旁白", text: "痛楚逐漸褪去，取而代之的是一種頭皮發麻、連脊椎都在發酸的強烈快感。理智的防線全面崩潰。" },
    { type: "dialogue", name: "雨果", text: "盧卡斯……啊啊、盧卡斯……我不行了、要、要去了……", avatar: "assets/img/cha/雨果_頭像_便服_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "雨果……我的雨果……你好棒……" },

    { type: "bg", src: "assets/img/CG/H_cg_星空線/07(窗外，雨後的星河格外明亮，溫柔地、靜靜地，籠罩著這棟別墅。).png", fade: true },
    { type: "dialogue", name: "旁白", text: "在被徹底填滿的極致快感與熱潮中，我們緊緊擁抱在一起。" },
    { type: "dialogue", name: "旁白", text: "窗外，雨後的星河格外明亮，溫柔地、靜靜地，籠罩著這棟別墅與緊緊相依的兩人。" },

    { type: "label", name: "A_morning" },
    { type: "remove_class", target: "#vn-screen", className: "cam-dim" },
    { type: "bg", src: "assets/img/bg/深夜，豪華森林別墅酒店的房間。（雨果的房間）.png", fade: true, bgm: "assets/audio/bgm/溫馨事件BGM.mp3", location: "隔天清晨，雨果的房間" },
    { type: "dialogue", name: "旁白", text: "清晨的陽光，從窗簾縫隙裡溜了進來，落在有些凌亂的床鋪上。我睜開眼，發現自己正被盧卡斯整個圈在懷裡。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_微笑.png" },
    { type: "dialogue", name: "旁白", text: "他感覺到懷裡的動靜，慵懶地睜開眼，聲音還帶著晨起的沙啞與寵溺。" },
    { type: "dialogue", name: "盧卡斯", text: "早安。……昨晚睡得好嗎？腰還酸不酸？", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "雨果", text: "學、學長……早安……（臉爆紅）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "他低笑了一聲，在我的唇上落下一個帶著晨光暖意的深吻，作惡的大手則輕輕揉了揉我的腰。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "還想再抱一會兒……但今天得搭車下山了。乖，先起來吧。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我把發燙的臉埋回他的頸窩，直到門外傳來蜜拉思「吃早餐啦——！」的大喊，我們才手忙腳亂地爬起來穿衣服。" },
    { type: "jump", to: "epilogue" },

    // =====================================================================
    // 🎆 路線 B：煙花線
    // =====================================================================
    { type: "label", name: "routeB_d7" },
    { type: "bg", src: "assets/img/bg/古樸的山村吳服店。木質的櫃檯上整齊地疊放著各色花紋的浴衣，門外是熱鬧的祭典準備景象。.png", fade: true, bgm: "assets/audio/bgm/社團時間.mp3", location: "午後，山村吳服店" },
    { type: "dialogue", name: "旁白", text: "既然多留了一天，下山趕赴山村的夏日祭典，便成了今天的主題。一進村，奧拉老師便大手一揮，包下了整間吳服店。" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_浴衣_說話.png" },
    { type: "dialogue", name: "奧拉", text: "難得來一趟。替大家都挑一身最好看的浴衣。錢，不是問題。", voice: "assets/audio/voice/奧拉_喔.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_浴衣_微笑.png" },
    { type: "dialogue", name: "旁白", text: "蜜拉思二哥換上一身白紫色的浴衣，難得地有了點翩翩公子的味道。" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我也手忙腳亂地套上了一身淺色的浴衣，光是那條腰帶，就折騰了我好半天。" },
    { type: "dialogue", name: "旁白", text: "然而，當盧卡斯撩開吳服店的門簾走出來時，我感覺自己的呼吸，在那一瞬間徹底停止了。" },
    { type: "bg", src: "assets/img/CG/浴衣想像畫面.png", fade: true },
    { type: "dialogue", name: "旁白", text: "他穿著一身深藍近墨的浴衣，腰帶利落地束出勁瘦的腰線，半敞的領口若隱若現地露出鎖骨。額前的碎髮被山風吹得微亂，少了眼鏡的斯文，多了幾分慵懶又危險的成熟氣息。" },
    { type: "dialogue", name: "雨果", text: "（——這、這根本就是我前天妄想裡的那個畫面！不，比妄想還要犯規一百倍！）", avatar: "assets/img/cha/雨果_頭像_浴衣_羞憤交加.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：浴衣學長實體化！妄想正在以三倍速暴走！理智告急！</b><br><br><b>🎮 浴衣現形・心動退散</b><br>浴衣學長的衝擊力遠超想像，腦海瘋狂掉落妄想方塊！<br><br><b>玩法（限時 12 秒）：</b>在妄想落地前，用手指<b>向左或向右快速滑開</b>它們，把理智溫度壓在崩潰線以下！</div>" },

    {
        type: "swipe_dismiss_qte",
        time: 12.0,
        cg: "assets/img/CG/浴衣想像畫面.png",
        startTemp: 34,
        warnTemp: 82,
        dismissCool: 4,
        leakHeat: 15,
        thoughts: ["腰帶……好想拆……", "半敞的領口……鎖骨……", "祭典夜的浴衣……太犯規了……", "想被他牽著逛祭典……", "沒戴眼鏡的樣子……"]
    },

    { type: "bg", src: "assets/img/bg/古樸的山村吳服店。木質的櫃檯上整齊地疊放著各色花紋的浴衣，門外是熱鬧的祭典準備景象。.png", fade: true },
    { type: "dialogue", name: "旁白", text: "我拼命甩開一個又一個浴衣妄想，總算把噴到嘴邊的鼻血和口水嚥了回去。" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_浴衣_說話.png" },
    { type: "dialogue", name: "旁白", text: "艾薇穿著一身淺藍浴衣，面無表情地遞來一支手機。" },
    { type: "dialogue", name: "艾薇", text: "雨果。在沉浸於祭典之前，請先完成今日的認知功能檢測。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "她的小測驗，果然連祭典都不會放過。" },
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：傳統煙火能綻放出不同顏色，是利用不同金屬元素燃燒時的『焰色反應』。燃燒時會產生鮮豔『紅色』的，通常是哪一種金屬元素？", targetChat: "ivy" },
    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>🎮 艾薇的祭典小測驗</b><br><br>浴衣學長的殘影還在腦裡，選項又被<b style='color:#ff66aa;'>妄想泡泡</b>蓋住了！<br><br><b>玩法：</b>狂點戳破泡泡，再選出<b>正確答案</b>！</div>" },
    { type: "wait_for_chat", chatId: "ivy" },
    {
        type: "chat_qte_academic",
        targetChat: "ivy",
        time: 14.0,
        glitch: false,
        bubbles: {
            count: 5,
            texts: ["浴衣好好看……", "想幫他繫腰帶……", "煙火下的側臉……", "祭典牽手……", "今晚他都是我的……"]
        },
        mutangOptions: [
            { text: "選項 A：想和學長逛遍整個祭典", isCorrect: false },
            { text: "選項 B：想幫學長重繫腰帶", isCorrect: false },
            { text: "選項 C：學長臉紅的顏色", isCorrect: false }
        ],
        options: [
            { text: "選項 A：鈉（黃色）", isCorrect: false },
            { text: "選項 B：鍶（紅色）", isCorrect: true },
            { text: "選項 C：學長臉紅的顏色", isCorrect: false }
        ],
        successMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👍回答正確。鍶。" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "順帶一提，你等下看煙火時若再次臉紅，其波長應與鍶的焰色相近。具有研究價值。" }
        ],
        failMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👎回答錯誤。你的腦波集中在與『浴衣』相關的區域。" },
            { sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "浴衣的殺傷力太強了！再一次！", isSelf: true },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我重新發送。請先清除妄想泡泡。" },
            { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：傳統煙火能綻放出不同顏色，是利用不同金屬元素燃燒時的『焰色反應』。燃燒時會產生鮮豔『紅色』的，通常是哪一種金屬元素？", targetChat: "ivy" }
        ]
    },
    { type: "transition", to: "VN", fade: true },

    // --- B-場景一：祭典攤位・射擊小熊 ---
    { type: "bg", src: "assets/img/bg/熱鬧的山村祭典。紅燈籠高高掛起，攤位上飄著章魚燒與烤玉米的香氣，人聲鼎沸。.png", fade: true, bgm: "assets/audio/bgm/傍晚活動.mp3", location: "傍晚，山村夏日祭典" },
    { type: "dialogue", name: "旁白", text: "夜幕低垂，祭典的紅燈籠次第亮起。我們一行人提著小巧的金魚袋，穿梭在熱鬧的攤位之間。" },
    { type: "dialogue", name: "旁白", text: "走到一個射擊攤位前，盧卡斯停下了腳步。攤位最高處的架子上，擺著一隻抱著星星的絨毛小熊。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "雨果，你看那隻小熊。……想要嗎？", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "雨果", text: "咦？！不、不用啦，那個很難打中的——", avatar: "assets/img/cha/雨果_頭像_浴衣_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_笑.png" },
    { type: "dialogue", name: "旁白", text: "話還沒說完，盧卡斯已經拿起了軟木槍，挽起袖子，露出線條漂亮的小臂——那畫面，直接把我的準心晃成了一團漿糊。" },
    { type: "dialogue", name: "盧卡斯", text: "……交給你。我幫你穩著肩膀。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "hide_char" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>🎮 祭典射擊・瞄準命中</b><br><br>學長挽著袖子的小臂就在眼前，孢子讓你的準星不受控制地飄移！<br><br><b>玩法（限時 20 秒／6 發子彈）：</b><br><b>拖動畫面</b>移動準星、對準會亂跑的<b style='color:#ffe08a;'>星星小熊</b>，對準後按 <b>【射擊】</b>！<br>穩住飄移的準星，在子彈用完前命中 <b>3 次</b>就能贏得小熊！</div>" },

    {
        type: "carnival_aim_qte",
        time: 20.0,
        bullets: 6,
        needHits: 3,
        drift: 34,
        targetSpeed: 16,
        hitRadius: 9
    },

    { type: "dialogue", name: "旁白", text: "在一聲清脆的命中聲後，那隻抱著星星的小熊，被穩穩地放進了我的懷裡。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "送你。……抱著它，就當是抱著今晚的星星了。", voice: "assets/audio/voice/盧卡斯_輕輕笑.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（這、這個人……今天是把『撩』字直接刻在臉上了嗎……）", avatar: "assets/img/cha/雨果_頭像_浴衣_羞憤交加.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "我抱著那隻還帶著體溫的小熊，把通紅的臉，深深地埋了進去。" },

    // --- B-場景二：壓軸・煙火大會 ---
    { type: "bg", src: "assets/img/bg/祭典的河岸邊。人群仰頭望著夜空，等待煙火綻放。.png", fade: true, bgm: "assets/audio/bgm/星空下的營火晚會.mp3", location: "夜晚，祭典河岸邊" },
    { type: "dialogue", name: "旁白", text: "祭典的壓軸，是煙火大會。奧拉老師不知何時，已經悄悄地對主辦方動用了他的「鈔能力」。" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_浴衣_說話.png" },
    { type: "dialogue", name: "奧拉", text: "我贊助了一些。施放時間，延長到三個小時。", voice: "assets/audio/voice/奧拉_喔.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_浴衣_困擾.png", action: "jump" },
    { type: "dialogue", name: "蜜拉思", text: "三個小時？！奧拉你瘋了嗎！村民今晚還要不要睡覺了！最多三十分鐘，你再不去叫停，我親自去找主辦方截胡！", voice: "assets/audio/voice/蜜拉思_疑惑.wav" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_浴衣_正常.png" },
    { type: "dialogue", name: "奧拉", text: "……知道了。三十分鐘。", voice: "assets/audio/voice/奧拉_嗯.wav" },
    { type: "hide_char" },

    { type: "sfx", src: "assets/audio/sfx/(SFX：咻——砰！絢爛的煙火炸開的聲響).mp3" },
    { type: "dialogue", name: "旁白", text: "（第一朵煙火，在墨色的夜空中璀璨地綻放開來！）" },
    { type: "bg", src: "assets/img/bg/綻放的煙火.png", fade: true },
    { type: "sfx", src: "assets/audio/sfx/煙花線H場景時的循環煙火音效.mp3", loop: true },
    { type: "dialogue", name: "旁白", text: "漫天的火樹銀花，將每個人的臉龐都映照得五彩斑斕。我仰著頭，一時看得呆了。" },
    { type: "dialogue", name: "旁白", text: "直到身旁傳來盧卡斯低沉而溫柔的聲音，近得幾乎貼著我的耳朵。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "……雨果。比起煙火，我好像，更想看你。", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（——！！！）", avatar: "assets/img/cha/雨果_頭像_浴衣_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "我猛地回頭，正撞進他那雙映著煙火、亮得驚人的紅棕色眼眸裡。就在這滿天煙火、人聲鼎沸的浪漫氛圍中，他忽然牽起我的手，將我從擁擠的人群裡，輕輕地拉了出來。" },

    // =====================================================================
    // 💗🎆 B-告白：煙火為證，藏不住的笑
    // =====================================================================
    { type: "bg", src: "assets/img/bg/祭典的河岸邊。人群仰頭望著夜空，等待煙火綻放。.png", fade: true, bgm: "assets/audio/bgm/告白.mp3", location: "煙火下、祭典外圍的河堤" },
    { type: "dialogue", name: "旁白", text: "被拉到安靜的河堤邊時，我的心還在「咚咚」地跳。但奇怪的是，比起山頂上那種令人窒息的尷尬，此刻的一切，都讓這份緊張，染上了一層甜絲絲的、軟乎乎的暖意。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_笑.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯回過頭，身後正好「砰」地炸開一朵金色的煙火，將他的側臉映得熠熠生輝。他看著我懷裡那隻抱著星星的小熊，忍不住笑了。" },
    { type: "dialogue", name: "盧卡斯", text: "你看，連小熊都替我作證了。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "dialogue", name: "雨果", text: "作、作什麼證……", avatar: "assets/img/cha/雨果_頭像_浴衣_緊張.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "作證我說的這句話，是真心的——雨果，昨晚那個吻，我一點都不後悔。不是孢子，也不是衝動。", voice: "assets/audio/voice/盧卡斯_輕輕笑.wav" },
    { type: "dialogue", name: "旁白", text: "他輕輕晃了晃我們交握的手，語氣輕快，眼神卻熱得燙人。" },
    { type: "dialogue", name: "盧卡斯", text: "我喜歡你。喜歡了很久。久到我自己回過神時，都嚇了一跳。所以……現在，我想聽聽你的答案。" },
    { type: "hide_char" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：學長正式告白！這是孢子代謝以來，最大的一次心跳衝擊！</b><br><br><b>🎮 最後的心跳節律・煙花版</b><br>在絢爛的煙火與歡快的祭典樂聲中，他帶著笑意的每一句告白，都讓你甜蜜地失速。<br><br><b>玩法（限時 13 秒）：</b>跟著煙火的節奏點擊 <b>【深呼吸・吞口水】</b>（或空白鍵）穩住心跳——這一次，是為了能笑著把那句話說出口。</div>" },

    {
        type: "heartbeat_rhythm_qte",
        time: 13.0,
        charSprite: "assets/img/cha/盧卡斯_立繪_浴衣_微笑.png",
        startRate: 42,
        warnRate: 74,
        creep: 7,
        breathDrop: 15,
        lineGap: 2.4,
        lines: [
            { text: "（他在笑……我也想笑……）", spike: 13 },
            { text: "（煙火好吵、心跳更吵……）", spike: 15 },
            { text: "（這次……我想笑著說出來……）", spike: 14 },
            { text: "（別哭別哭別哭……）", spike: 16 }
        ]
    },

    { type: "dialogue", name: "旁白", text: "我在一聲又一聲的煙火轟鳴中，按著節奏壓住雀躍的心跳，總算能笑著抬起頭。" },
    {
        type: "story_choice",
        prompt: "面對學長的告白，你（雨果）要如何回應？",
        options: [
            { text: "💗 鼓起勇氣，坦白心意", hint: "在這滿天煙火下，把心裡的話笑著說出來。", jump: "B_honest" },
            { text: "…… 還是說不出口", hint: "那句話卡在喉嚨裡……但他會寵著你、等著你。", jump: "B_shy" }
        ]
    },

    { type: "label", name: "B_honest" },
    { type: "dialogue", name: "旁白", text: "也許是被這滿天的煙火感染，也許是被他眼底的笑意融化，那句藏了好幾天的話，竟意外順暢地、帶著哽咽的笑意，從我嘴裡溜了出來。" },
    { type: "dialogue", name: "雨果", text: "我也喜歡你……學長。很久了。久到我都已經放棄治療，打算把這個秘密爛在肚子裡一輩子了。", avatar: "assets/img/cha/雨果_頭像_浴衣_微笑.png", voice: "assets/audio/voice/雨果_開心.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_笑.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯先是一愣，隨即笑得像個偷到糖的孩子。他乾脆利落地一把將我連人帶小熊都圈進懷裡，在我耳邊低低地笑出了聲。" },
    { type: "dialogue", name: "盧卡斯", text: "太好了……我們有一樣的想法。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "hide_char" },
    { type: "jump", to: "B_confmerge" },

    { type: "label", name: "B_shy" },
    { type: "dialogue", name: "旁白", text: "明明氣氛這麼好，那句話卻還是卡在喉嚨裡，被那份膽怯死死地攔了下來。我抿著唇，紅著臉，半天說不出一個字。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_笑.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯也不惱，反而被我這副糾結的模樣逗得眉眼彎彎。他低下頭，用額頭輕輕碰了碰我的，語氣寵溺得能滴出蜜來。" },
    { type: "dialogue", name: "盧卡斯", text: "不說沒關係。那我多說幾次，說到你願意回答為止——", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "盧卡斯", text: "我喜歡你。是想牽著你逛完每一場祭典、看完每一場煙火的那種喜歡。現在呢？要不要試著，把答案還給我？" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "在他這樣輕快又執著的攻勢下，我那點彆扭，終於繃不住了，紅著臉，悶悶地點了頭。" },
    { type: "dialogue", name: "雨果", text: "……嗯，我也喜歡你。", avatar: "assets/img/cha/雨果_頭像_浴衣_羞憤交加.png", voice: "assets/audio/voice/雨果_乖巧.wav" },

    { type: "label", name: "B_confmerge" },
    { type: "dialogue", name: "旁白", text: "這一刻，在漫天綻放的煙火見證下，所有的彆扭與曖昧，都化成了藏不住的笑意。" },
    { type: "sfx", src: "assets/audio/sfx/親吻.mp3" },
    { type: "dialogue", name: "旁白", text: "他低下頭，吻住了我。這個吻，帶著祭典甜酒的微醺與棉花糖般的甜，又輕又軟，吻到最後，我們倆都忍不住因為太過幸福，而彎起了嘴角。" },
    { type: "dialogue", name: "雨果", text: "（原來……喜歡的人也喜歡自己，是這種會讓人忍不住一直笑、像含了一整口蜜的，幸福的感覺。）", avatar: "assets/img/cha/雨果_頭像_浴衣_微笑.png", voice: "assets/audio/voice/雨果_開心.wav" },

    // =====================================================================
    // 🎬 B-尾聲：深夜，別墅・雨果的房間（浴衣版・沒能煞住的車）
    // =====================================================================
    { type: "bg", src: "assets/img/bg/深夜，豪華森林別墅酒店的房間。（雨果的房間）.png", fade: true, bgm: "assets/audio/bgm/盧卡斯夜訪BGM.mp3", location: "深夜，雨果的房間" },
    { type: "dialogue", name: "旁白", text: "那一夜，下山回到別墅，兩人身上都還穿著那身祭典的浴衣，連換下的功夫都沒來得及。盧卡斯跟著我，一路笑著走到房門口。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_羞愧.png" },
    { type: "dialogue", name: "盧卡斯", text: "你穿浴衣的樣子……今晚我已經偷看好幾次了。", voice: "assets/audio/voice/盧卡斯_尷尬.wav" },
    { type: "dialogue", name: "雨果", text: "什麼……", avatar: "assets/img/cha/雨果_頭像_浴衣_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "我的話還沒說完，他便已俯身吻了上來，帶著祭典甜酒殘留的、暖融融的氣息。" },
    { type: "hide_char" },
    { type: "sfx", src: "assets/audio/sfx/關門聲2.mp3" },
    { type: "dialogue", name: "旁白", text: "帶著祭典歡愉的餘溫、煙火的甜，與藏不住的、相視而笑的曖昧，這一次，誰也沒有想要去踩那道名為「理智」的煞車。" },
    {
        type: "story_choice",
        prompt: "接下來的內容涉及親密場面與 CG 演出，你可以選擇：",
        options: [
            { text: "…… 跳過，直接到隔天清晨", jump: "B_morning" },
            { text: "💗 留下來，陪他度過這一夜", jump: "B_night" }
        ]
    },

    { type: "label", name: "B_night" },
    { type: "add_class", target: "#vn-screen", className: "cam-dim" },
    { type: "bg", src: "assets/img/CG/H_cg_煙花線/01他將我拉到床邊坐下，自己則單膝跪在我的雙腿間。那雙總是帶著笑意的紅棕色眼眸，此刻微微暗了下來，像一潭深不見底的酒，倒映著微弱的光斑。.png", fade: true },
    { type: "sfx", src: "assets/audio/sfx/深吻長音效.mp3" },
    { type: "dialogue", name: "旁白", text: "房裡的燈被他隨手關上。只剩窗外漏進來的幾縷淺淡月光，與遠處尚未散盡的祭典煙火餘音。" },
    { type: "dialogue", name: "盧卡斯", text: "雨果，你好可愛……" },
    { type: "dialogue", name: "旁白", text: "他將我拉到床邊坐下，自己則單膝跪在我的雙腿間。那雙眼睛在半明半暗中，像一潭深不見底的酒。" },

    { type: "bg", src: "assets/img/CG/H_cg_煙花線/02他的一隻手撐在我的耳側，另一隻手則沿著我的脊椎緩慢地下滑，每到一處敏感的脊骨，便輕輕揉捏，惹得我無法抑制地弓起腰，發出甜膩的泣音。.png", fade: true },
    { type: "dialogue", name: "旁白", text: "他的指尖勾住我浴衣的腰帶，輕輕一扯。原本就繫得鬆散的布料瞬間散開，從肩頭滑落。" },
    { type: "dialogue", name: "旁白", text: "他的一隻手撐在我的耳側，另一隻手則沿著我的脊椎緩慢地下滑，每到一處敏感的脊骨，便輕輕揉捏。" },
    { type: "dialogue", name: "雨果", text: "唔……學長、有點冷……嗯啊……", avatar: "assets/img/cha/雨果_頭像_浴衣_緊張.png" },

    { type: "bg", src: "assets/img/CG/H_cg_煙花線/03他溫柔地吻去我的眼淚，修長的手指卻已經探向了那從未被觸碰過的隱密地帶。.png", fade: true },
    { type: "dialogue", name: "盧卡斯", text: "很快就不冷了……乖，放輕鬆。" },
    { type: "dialogue", name: "旁白", text: "他溫柔地吻去我的眼淚與眉眼，修長的手指沾著潤滑油，探向那從未被觸碰過的隱密地帶，耐心地擴張。" },

    { type: "bg", src: "assets/img/CG/H_cg_煙花線/04沒有任何猶豫，他沉下腰，碩大的龜頭一點一點地撐開緊緻的媚肉。這種緩慢的進入比直接貫穿更加折磨，我能清晰地感覺到自己的身體正一點點被那個可怕的尺寸撐開、填滿。.png", fade: true },
    { type: "dialogue", name: "旁白", text: "沒有任何猶豫，他沉下腰，碩大的性器一點一點地撐開緊緻的媚肉，強勢而緩慢地一貫到底。" },
    { type: "dialogue", name: "雨果", text: "太大了……肚子……學長、停一下……", avatar: "assets/img/cha/雨果_頭像_浴衣_羞憤交加.png" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>💗 沒能煞住的車・情慾共鳴小遊戲</b><br><br>配合煙火轟鳴與撞擊節律，在脈動環重合時點擊 <b>【夾緊 · 迎合】</b>！<br>將情慾滿溢度推向極致高潮！</div>" },

    // 🎮 H 專屬小遊戲：夾緊與快感共鳴 (B線)
    {
        type: "h_rhythm_squeeze_qte",
        time: 16.0,
        needHits: 7,
        isFireworks: true,
        prompt: "配合祭典煙火的轟鳴節律，點擊【夾緊 · 迎合】！",
        whispers: [
            "叫我的名字……雨果……",
            "盧卡斯……我不行了……",
            "好深……學長最喜歡你了……",
            "要被填滿了……！",
            "夾得好緊……好熱……"
        ]
    },

    { type: "bg", src: "assets/img/CG/H_cg_煙花線/05在極致的快感與愛語的交融中，我崩潰地迎來了高潮，前端一股股地射出白濁，將他的腹肌弄得泥濘不堪。後穴也跟著強烈痙攣，死死絞緊了體內的硬物。盧卡斯發出一聲極具野性的低吼，在最深處狠狠地頂弄了幾下後，將滾燙的精液盡數釋放，滿滿地灌注進我的體內，讓我連腳趾都舒服得蜷縮了起來。.png", fade: true },
    { type: "sfx", src: "assets/audio/sfx/深吻長音效.mp3" },
    { type: "dialogue", name: "旁白", text: "在極致的快感與愛語的交融中，我崩潰地迎來了高潮，後穴跟著強烈痙攣，死死絞緊了體內的硬物。" },
    { type: "dialogue", name: "旁白", text: "盧卡斯發出一聲極具野性的低吼，將滾燙的精液盡數釋放在最深處，燙得我連腳趾都舒服得蜷縮起來。" },

    { type: "bg", src: "assets/img/CG/H_cg_煙花線/06(窗外，最後一朵煙火在遠方溫柔地散開，為這個甜得發膩的夜晚，落下了完美的句點。).png", fade: true },
    { type: "dialogue", name: "旁白", text: "窗外，最後一朵煙火在遠方溫柔地散開，為這個甜得發膩的夜晚，落下了完美的句點。" },

    { type: "label", name: "B_morning" },
    { type: "stopSfx" },
    { type: "remove_class", target: "#vn-screen", className: "cam-dim" },
    { type: "bg", src: "assets/img/bg/深夜，豪華森林別墅酒店的房間。（雨果的房間）.png", fade: true, bgm: "assets/audio/bgm/溫馨事件BGM.mp3", location: "隔天清晨，雨果的房間" },
    { type: "dialogue", name: "旁白", text: "清晨，我是被一陣若有似無的輕吻弄醒的。陽光灑在床鋪上，散落一地的深藍與淺色浴衣交纏在一起。" },
    { type: "dialogue", name: "旁白", text: "我懶洋洋地睜開眼，對上了盧卡斯那雙盛滿笑意的眼睛。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "早安。睡得好嗎？" },
    { type: "dialogue", name: "旁白", text: "他單手撐著頭，側躺在我身邊，另一隻手正把玩著我的一綹頭髮，笑得像隻偷了腥還一臉滿足的貓。" },
    { type: "dialogue", name: "雨果", text: "（唔……全身都懶洋洋的，一點力氣都沒有……都是這個人害的……）", avatar: "assets/img/cha/雨果_頭像_浴衣_羞憤交加.png" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_浴衣_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "抱歉，昨晚……因為你太可愛了。如果不是今天還要搭車，我真想就這樣和你待在房間裡，哪也不去。" },
    { type: "dialogue", name: "旁白", text: "他湊到我耳邊，溫熱的呼吸帶著一絲惡劣的調笑。我羞惱地把頭埋進被子裡，卻被他撈住，順勢落下一個瀰漫著清晨慵懶氣息的、又長又輕的吻。" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "直到門外傳來奧拉老師平靜的敲門聲「起床。收拾行李。」，我們才依依不捨地分開。" },
    { type: "jump", to: "epilogue" },

    // =====================================================================
    // 🔍 暗線揭示 ＋ 🌅 Day 8：回程的大巴 (Good End)
    // =====================================================================
    { type: "label", name: "epilogue" },
    { type: "bg", src: "assets/img/bg/巴士內部.png", fade: true, bgm: "assets/audio/bgm/溫馨事件BGM.mp3", location: "隔天午後，回程的大巴" },
    { type: "dialogue", name: "旁白", text: "山路蜿蜒平穩，午後暖黃的陽光穿過車窗，灑在狹窄溫馨的車廂內。" },
    { type: "dialogue", name: "旁白", text: "經過了幾天驚心動魄的合宿與昨夜的坦白，大家都累壞了。西爾維亞戴著耳機注視著窗外，艾薇閉目養神，蜜拉思老師和奧拉則在後排打著輕柔的哈欠。" },
    { type: "dialogue", name: "雨果", text: "（好安靜……這大概是這一週以來，最平靜的一刻了吧。）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png" },
    { type: "dialogue", name: "旁白", text: "身旁的盧卡斯因為連續兩夜都沒能好好休息，此刻正靠著椅背，眉眼間帶著少見的疲憊。" },
    { type: "dialogue", name: "旁白", text: "大巴隨著山路的起伏輕輕搖晃，盧卡斯在睡夢中身形微傾，腦袋順勢歪倒，輕輕枕在了我的肩膀上。" },
    { type: "dialogue", name: "雨果", text: "（等——？！學、學長？！）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },

    // 醒來前：閉眼 CG
    { type: "dialogue", name: "旁白", text: "我的身體瞬間緊繃成一根弦，連呼吸都下意識地屏住了，生怕稍微動一下就會吵醒他。" },
    { type: "dialogue", name: "旁白", text: "可肩頭沉甸甸的重量與頸側傳來溫熱規律的呼吸感，卻真實得讓人心跳加速。午後暖黃的陽光透過車窗，斑駁地灑在盧卡斯放鬆的側臉上，連那幾抹天生的白色挑染都顯得格外柔和可親。" },
    { type: "dialogue", name: "雨果", text: "（學長的睡顏……真的好好看啊。）", avatar: "assets/img/cha/雨果_頭像_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "我看著他毫無防備的睡容，原本緊繃的肩膀也漸漸放鬆下來，眼底漫開踏實而溫柔的笑意。" },
    { type: "dialogue", name: "雨果", text: "（這一週真的發生了好多好多事……差點暴露秘密、差點社會性死亡、無數次心跳暴走……但如果沒有那些意外，我們是不是還在互相克制？）", avatar: "assets/img/cha/雨果_頭像_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "車廂隨著山路的起伏輕輕搖晃。盧卡斯在睡夢中微微側過臉，鼻尖若有似無地蹭著我的頸窩，發出一聲極輕、極放鬆的嘆息，眉宇間常年緊繃的嚴謹徹底化開。" },
    { type: "dialogue", name: "盧卡斯", text: "……雨果……", voice: "assets/audio/voice/盧卡斯_輕輕笑.wav" },
    { type: "dialogue", name: "旁白", text: "那一聲低喃模糊得幾乎聽不清，卻像羽毛般輕輕拂過心尖。午後金色的陽光在車窗上緩緩流動，泛起一片如夢似幻的暖光，思緒彷彿也隨之融化，悄無聲息地沉入了盧卡斯深沉而漫長的夢境深處——" },

    // --- 進入盧卡斯視角回憶倒敘 ---
    { type: "bg", src: "", fade: true, stopBgm: true },
    { type: "bg", src: "assets/img/bg/社團教室_黃昏.png", fade: true, bgm: "assets/audio/bgm/告白.mp3", location: "【盧卡斯視角】" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "有時候我常在想……那一場荒唐又混亂的合宿，到底是從什麼時候開始失控的？", avatar: "assets/img/cha/盧卡斯_頭像_普通.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "或者說，孢子是什麼什麼時候……", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },

    // Day 1 閃回
    { type: "dialogue", name: "盧卡斯的獨白", text: "第一天在生物社，培養皿失手摔落的瞬間，我搶上前伸手將雨果護住。那一蓬散發著甜香的紫色迷霧，或許就已經在社團教室裡徹底爆開了。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "那時我一心只擔憂著雨果的狀況，根本沒意識到自己也已經吸入了孢子。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "當我把手掌覆在雨果微微發顫的脊背上時，掌心傳來的溫度與觸感，讓我的心臟劇烈地失序跳動起來。", avatar: "assets/img/cha/盧卡斯_頭像_普通.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "那一刻，我心裡第一次產生了想要順著脊椎下滑、抱住他腰肢的渴望。我感到無比的震驚與自責——", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "我這是怎麼了？我一定會嚇到他的。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "但那時我以為只是一時間有了奇怪的想法，並沒有懷疑到孢子頭上。", avatar: "assets/img/cha/盧卡斯_頭像_普通.png" },

    // Day 2 閃回
    { type: "bg", src: "assets/img/bg/通往學校的林蔭大道.png", fade: true },
    { type: "dialogue", name: "盧卡斯的獨白", text: "第二天看著小白鳥停在雨果頭頂，他滿臉生無可戀卻又乖乖不敢亂動的模樣，我真的覺得非常可愛。", avatar: "assets/img/cha/盧卡斯_頭像_笑.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "放學後，一向注重社交邊界的我，竟然忍不住撥通了他的電話。聽著耳機裡他緊張得結結巴巴的聲音，我甚至不得不咬著下唇才能忍住笑意。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "掛斷通話後，我甚至神差鬼使地繞了遠路走去他家樓下，將備好的蜂蜜茶悄悄放進他的信箱。站在冷風裡按著自己滾燙的胸口，我還在暗暗自責：自己什麼時候產生了這種想法？", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },

    // Day 4 閃回
    { type: "bg", src: "assets/img/bg/清晨的濕滑針葉林斜坡。陽光被高大的樹冠篩成細碎的光斑.png", fade: true },
    { type: "dialogue", name: "盧卡斯的獨白", text: "直到合宿的山路上，雨果踩空滑倒的那一秒——我的大腦甚至來不及思考，身體就已經自己過去把它護住了。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "感受著他急促的心跳與溫軟的體溫，BBQ 時目光時刻追隨、忍不住想投餵他……我依然只當自己只是把他當作了需要被照顧的可愛學弟。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },

    // Day 6 閃回 + 偷吻後的頓悟
    { type: "bg", src: "assets/img/bg/深夜，豪華森林別墅酒店的房間。（雨果的房間）.png", fade: true },
    { type: "dialogue", name: "盧卡斯的獨白", text: "雷雨夜的鬼故事讓我有點心慌。但這可能也只是我用來敲開他房門的藉口。我那時可能也只是很想見他而已。", avatar: "assets/img/cha/盧卡斯_頭像_普通.png" },
    { type: "bg", src: "assets/img/CG/雨果睡覺.png", fade: true },
    { type: "dialogue", name: "盧卡斯的獨白", text: "但當我們擠在同一張被窩裡，聞著他身上淡淡的薰衣草香，近距離凝視著他毫無防備的睡顏與泛紅的臉頰……看著他因為緊張而微微顫抖的睫毛，我所有的自持徹底潰散，俯身吻了上去。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "那個吻又深又急。直到鬆開他時，看著雨果被我吻得泛紅微腫的嘴唇，我靠在床頭劇烈喘息，大腦一片空白，才猛然驚醒。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "直到那一刻，我才後知後覺地回想起第一天在社團爆開的那陣紫色甜香。原來……那一天的孢子，我也吸進去了。我也早就中招了。", avatar: "assets/img/cha/盧卡斯_頭像_擔心.png" },

    // 暗線領悟
    { type: "dialogue", name: "盧卡斯的獨白", text: "後來蜜拉思老師說：『變異吐真孢子不會無中生有，只會把心裡『本來就有』的東西，放大、再放大，然後逼著它誠實地表現出來。』", avatar: "assets/img/cha/盧卡斯_頭像_普通.png" },
    { type: "dialogue", name: "盧卡斯的獨白", text: "那一刻，長久以來的困惑徹底煙消雲散。我才真正明白——不是孢子改變了我，而是孢子打碎了我遲鈍而笨拙的自持，讓我正視了那份早就深陷其中的真心。", avatar: "assets/img/cha/盧卡斯_頭像_笑.png" },

    // --- 回歸大巴現實 ---

    // 回程大巴
    { type: "bg", src: "assets/img/bg/巴士內部.png", fade: true, bgm: "assets/audio/bgm/溫馨事件BGM.mp3", location: "回程的大巴車廂" },
    { type: "dialogue", name: "旁白", text: "肩頭傳來微弱的摩挲感。盧卡斯的睫毛動了動，像是即將從漫長而香甜的夢境中甦醒。" },

    // 甦醒
    { type: "dialogue", name: "盧卡斯", text: "唔……雨果？", voice: "assets/audio/voice/盧卡斯_疑惑.wav" },
    { type: "dialogue", name: "旁白", text: "他緩緩睜開眼，瞳孔裡倒映著我的臉龐，眼裡滿是剛睡醒的慵懶。他沒有立刻抬起頭，反而像隻貪戀溫暖的大貓，依賴地在我的頸窩裡蹭了蹭，低沉的嗓音帶著剛醒時特有的沙啞。" },

    // 切換回巴士內部背景與立繪
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "抱歉……把你當成枕頭靠了這麼久，肩膀很痠吧？", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "雨果", text: "不、一點都不痠！學長睡得很香，完全沒關係的！", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "真乖。", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "旁白", text: "盧卡斯低低地輕笑出聲，坐直身子。在座椅下方、同伴們視線不及的盲區裡，他修長的手指悄悄探了過來，溫柔而堅定地扣住了我的五指。" },
    { type: "dialogue", name: "旁白", text: "兩隻手在座位間十指相扣，掌心的溫度熨燙著彼此的心跳。我臉頰發熱，卻也收緊了手指，不願放開分毫。" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "車廂內安靜極了，午後的微風帶著初秋的涼意拂過窗櫺。盧卡斯轉頭凝視著我，眼底漾著狡黠而溫柔的笑意，隨後低頭拿出了手機。" },
    { type: "sfx", src: "assets/audio/sfx/(SFX：劇烈的手機震動聲！）.wav" },
    { type: "dialogue", name: "旁白", text: "口袋裡的手機輕輕震動了一下。" },

    // --- 切換至 L-Chat 手機對話介面 ---
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_separator", text: "回程大巴上 14:20", targetChat: "lucas" },
    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "明明就坐在你旁邊……但還是忍不住想用訊息跟你說話。", targetChat: "lucas" },
    { type: "delay", time: 1.0 },
    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "剛剛睡得很沉，夢到了第一天在生物社，你接住培養皿的樣子。", targetChat: "lucas" },
    { type: "wait_for_chat", chatId: "lucas" },

    { type: "delay", time: 1.0 },
    { type: "chat_type", draft: "學長……不要提這個了……！", targetChat: "lucas", requireSend: true },
    { type: "chat_msg", sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "學長……不要提這個了……！", targetChat: "lucas" },

    { type: "delay", time: 1.2 },
    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "<img src='assets/img/chat_img/點讚貼圖.png' style='width: 90px; height: auto;'>", targetChat: "lucas" },
    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "抱歉，我只是覺得這幾天的體驗很奇妙。", targetChat: "lucas" },
    { type: "delay", time: 1.0 },
    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "對了，回學校之後，等社團值日結束……要一起去喝咖啡嗎？作為情侶的……第一次正式約會。", targetChat: "lucas" },
    { type: "wait_for_chat", chatId: "lucas" },
    { type: "delay", time: 1.2 },
    { type: "chat_type", draft: "好。約好了，學長。", targetChat: "lucas", requireSend: true },
    { type: "chat_msg", sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "好。約好了，學長。", targetChat: "lucas" },

    { type: "delay", time: 1.0 },
    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "嗯，約好了。雨果。", targetChat: "lucas" },

    { type: "delay", time: 2.0 },
    {
        type: "fade_text",
        text: "<span class='fade-line-1'>Day 7 ─ 心跳隱蔽協議，永久解除。</span><br><br><span class='fade-line-2'>曾經在對話框裡刪除過無數次的「喜歡」，如今都已化作掌心相扣的溫度。</span><br><br><span class='fade-line-1'>—— Good End ‧ 完 ——</span>",
        time: 9,
        returnToTitle: true
    }
];
