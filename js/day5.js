const Day5Script = [
    // =====================================================================
    // 🎬 場景一：清晨，別墅門口 (出征前的最後通牒)
    // =====================================================================
    // 註：本日全員便服 / 居家服立繪。配音先以 assets/audio/voice 通用素材點綴，
    //     日後再替換為 day5_語音 完整配音；其餘僅保留 SFX 與 BGM。
    { type: "bg", src: "assets/img/bg/高山風景。原本預期中的破舊小木屋還在，但更顯眼的是一棟極度奢華、帶有大片落地窗和庭院的現代化三層樓別墅。.png", fade: true, bgm: "assets/audio/bgm/清晨森林的漫步.mp3", location: "清晨，別墅門口" },
    { type: "dialogue", name: "旁白", text: "合宿的第一個正式早晨，是被一陣不講道理的鳥鳴給吵醒的。薄霧還沒散，遠處的針葉林像一排沉默的綠色衛兵，欄杆上的露珠閃著細碎的光。" },
    { type: "dialogue", name: "旁白", text: "我頂著一夜沒睡好的腦袋走下樓，卻在玄關處被眼前的景象釘在了原地——" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_普通.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯已經換上了一身俐落的戶外便服，正低頭仔細地檢查著兩人份的採樣裝備。晨光落在他低垂的睫毛上，替他鍍上了一層毛茸茸的金邊。" },
    { type: "dialogue", name: "雨果", text: "（……才早上七點，這個人帥得有點不合法。）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "我默默把這句心聲連同口水一起嚥了回去，扯了扯自己居家服的領口，試圖讓滾燙的臉頰冷卻下來。" },
    { type: "hide_char" },

    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞社長拎著一個專業級的登山包，面無表情地做著最後的分組確認。她身旁的艾薇，正小心翼翼地把小白安置進一個透氣的保溫提籠裡。" },
    { type: "dialogue", name: "西爾維亞", text: "重申分組。我和艾薇，東側水源地。盧卡斯，雨果，西側針葉林斜坡。奧拉老師留守，協助蜜拉思老師接收數據。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "蜜拉思二哥端著奧拉遞來的、熱氣騰騰的現磨咖啡，整個人窩在沙發裡，舒服得連眼皮都懶得抬。" },
    { type: "dialogue", name: "蜜拉思", text: "放心去吧三弟～二哥我會在這個有暖氣、有咖啡的文明世界，遠程守護你們的。科學家，也是需要後勤的嘛。", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "dialogue", name: "雨果", text: "（這個二哥，到底是來做研究，還是來給奧拉老師當金絲雀的……）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png" },
    { type: "dialogue", name: "旁白", text: "我在心裡，默默地比了一個義大利不友善手勢。" },
    { type: "hide_char" },

    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯把一壺溫水塞進我的背包側袋，又蹲下身，仔細替我把鬆掉的鞋帶重新繫好，動作自然得像是已經做過千百遍。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "西側的坡比較陡，昨晚好像又下過一場小雨，地會很滑。雨果，跟緊我，別逞強。", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "雨果", text: "……嗯，我知道了，謝謝學長。", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "我低著頭應聲，卻不敢去看他的眼睛。只因為昨晚廚房那一幕——他貼上我額頭的手掌的溫度，到現在都還燙在我的皮膚上，揮之不去。" },
    { type: "hide_char" },
    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    { type: "dialogue", name: "旁白", text: "就這樣，在西爾維亞一聲令下後，兩支隊伍朝著相反的方向出發。而我，再一次，被命運和社長聯手，推進了「與誘惑源獨處」的修羅場。" },

    // =====================================================================
    // 🎬 場景二：西側針葉林斜坡 (一寸一寸的理智凌遲)
    // =====================================================================
    { type: "bg", src: "assets/img/bg/清晨的濕滑針葉林斜坡。陽光被高大的樹冠篩成細碎的光斑.png", fade: true, location: "上午，西側針葉林斜坡" },
    { type: "dialogue", name: "旁白", text: "針葉林裡的空氣冷冽而清新，每一次呼吸都帶著松針的清香。如果不是身旁這個移動的費洛蒙發射器，這趟路本該是相當愜意的。" },
    { type: "dialogue", name: "旁白", text: "我們沿著濕滑的斜坡向上攀爬，盧卡斯走在前面替我探路，總會在難走的地方停下來，回頭等我。" },
    { type: "dialogue", name: "旁白", text: "就在一處覆滿青苔的陡坡前，我的鞋底毫無預警地一打滑——" },
    { type: "dialogue", name: "雨果", text: "唔哇——！", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    { type: "sfx", src: "assets/audio/sfx/踩空的悶響.mp3" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "旁白", text: "一隻骨節分明、溫熱有力的手，毫不猶豫地穿過下墜的失重感，牢牢地扣住了我的手腕，又順勢將我整個人帶進了一個安穩的懷抱裡。" },
    { type: "dialogue", name: "盧卡斯", text: "小心。我說過了，跟緊我。", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "bg", src: "assets/img/CG/森林牽手CG.png", fade: true },
    { type: "dialogue", name: "旁白", text: "他沒有鬆手。反而很自然地、十指相扣地，將我的手，包進了他寬大而溫暖的掌心裡。" },
    { type: "dialogue", name: "雨果", text: "（手……手牽手了。十指交扣的那種。）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "我的大腦瞬間「嗡」地一聲，炸成了一片雪白。體內那株安分了一整個早上的孢子，像是聞到血腥味的鯊魚，瞬間瘋狂地暴走起來——" },
    { type: "hide_char" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：肌膚接觸！孢子活性突破閾值！</b><br>潛意識妄想正在大量湧現！<br><br><b>🎮 牽手過坡・心動妄想退散</b><br>被學長牽著手走過陡坡的這一路，腦海會不斷由上往下掉落各種羞恥的妄想方塊。<br><br><b>玩法（限時 12 秒）：</b><br>用手指<b>按住妄想方塊</b>，向<b>左或向右快速滑開</b>（Dismiss）！<br>別讓它們落到螢幕底部——理智溫度衝破崩潰線就前功盡棄了！</div>" },

    // ------------------------------------------------------------------
    // 🎮 小遊戲：牽手過坡・心動妄想退散 (Swipe-to-Dismiss)
    // ------------------------------------------------------------------
    {
        type: "swipe_dismiss_qte",
        time: 12.0,
        cg: "assets/img/CG/森林牽手CG.png",
        startTemp: 30,
        warnTemp: 80,
        maxTemp: 100,
        dismissCool: 4,
        leakHeat: 15,
        thoughts: [
            "他的手好大……",
            "想被這樣牽一輩子……",
            "手心好燙……是不是也喜歡我？",
            "再握緊一點……",
            "十指交扣……太犯規了……",
            "好想就這樣不要放開……"
        ]
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "旁白", text: "我拼命在腦海裡把一個又一個妄想甩出意識之外，總算撐著沒讓自己當場做出什麼丟臉的事。走完陡坡，他才終於鬆開手。" },
    { type: "bg", src: "assets/img/bg/清晨的濕滑針葉林斜坡。陽光被高大的樹冠篩成細碎的光斑.png", fade: true },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "旁白", text: "我像是剛跑完一場馬拉松，心臟狂跳，手心全是汗。" },
    { type: "dialogue", name: "盧卡斯", text: "你的手好燙。是不是又開始發熱了？要不要先休息一下？", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "雨果", text: "不、不用！我只是……爬坡爬得有點喘而已！我們快點找採樣點吧！", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_生氣.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_笑.png" },
    { type: "dialogue", name: "旁白", text: "我幾乎是落荒而逃地搶到他前面去，把那隻還殘留著他溫度的手，死死地塞進了口袋。盧卡斯看著我慌張的背影，若有所思地，低低笑了一聲。" },
    { type: "hide_char" },

    // =====================================================================
    // 🎬 場景三：採樣點 (來自東側的遠程突襲)
    // =====================================================================
    { type: "bg", src: "assets/img/bg/林間一處較平緩的空地，幾株泛著微弱紫光的奇異植物從腐葉間探出頭來。.png", fade: true, location: "上午，森林採樣點" },
    { type: "dialogue", name: "旁白", text: "好不容易抵達座標標記的採樣點，正當我蹲下身、準備架設第一個採樣器時，口袋裡的手機毫無預警地震動起來。" },
    { type: "sfx", src: "assets/audio/sfx/(SFX：劇烈的手機震動聲！）.wav" },
    { type: "dialogue", name: "旁白", text: "是艾薇。即使分隔兩座山頭，她依然準時得像一台精密的鬧鐘。" },

    // ------------------------------------------------------------------
    // 🎮 遊戲環節：艾薇的晨間遠程小測驗 (Chat 模式 / 戳破妄想泡泡)
    // ------------------------------------------------------------------
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "早安，雨果。今天的晨間小問答啟動！", targetChat: "ivy" },
    { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：植物在進行光合作用時，負責吸收光能的綠色色素，主要存在於細胞中的哪一個胞器？", targetChat: "ivy" },
    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>🎮 艾薇的遠程小測驗</b><br><br>正要回答時，蹲在身旁的學長為了看清植株俯身湊了過來——孢子暴走，選項全被<b style='color:#ff66aa;'>妄想泡泡</b>蓋住了！<br><br><b>玩法：</b><br>狂點戳破泡泡，看清底下的選項，再選出<b>正確答案</b>！</div>" },
    { type: "wait_for_chat", chatId: "ivy" },
    {
        type: "chat_qte_academic",
        targetChat: "ivy",
        time: 14.0,
        glitch: false,
        bubbles: {
            count: 5,
            texts: [
                "學長的睫毛好長……",
                "鼻息噴在耳朵上……好癢……",
                "靠這麼近是想害死我嗎……",
                "側臉的線條也太好看……",
                "聞得到他身上的味道……"
            ]
        },
        mutangOptions: [
            { text: "選項 A：想偷看學長的側臉", isCorrect: false },
            { text: "選項 B：把耳朵湊過去", isCorrect: false },
            { text: "選項 C：學長的睫毛好長", isCorrect: false }
        ],
        options: [
            { text: "選項 A：粒線體", isCorrect: false },
            { text: "選項 B：葉綠體", isCorrect: true },
            { text: "選項 C：學長的睫毛好長", isCorrect: false }
        ],
        successMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👍回答正確。葉綠體。你的邏輯功能依然在線，我很欣慰。" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "順帶一提，小白剛剛在水源地抓到一條蟲，牠看起來很滿足。" }
        ],
        failMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👎回答錯誤。你的腦波異常集中在與『繁殖』相關的區域，需要我通知盧卡斯嗎？" },
            { sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "不用！！！我再答一次！", isSelf: true },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我重新發送。請先清除妄想泡泡。" },
            { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：植物在進行光合作用時，負責吸收光能的綠色色素，主要存在於細胞中的哪一個胞器？", targetChat: "ivy" }
        ]
    },

    // ------------------------------------------------------------------
    { type: "transition", to: "VN", fade: true },
    { type: "bg", src: "assets/img/bg/林間一處較平緩的空地，幾株泛著微弱紫光的奇異植物從腐葉間探出頭來。.png", fade: true },
    { type: "dialogue", name: "旁白", text: "回完訊息，我抬起頭，正好對上盧卡斯近在咫尺的、含著笑意的紅棕色眼眸。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "在跟艾薇聊什麼？聊得這麼專心，臉都紅了。", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "雨果", text: "……在、在討論生物作業！她出題考我！", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我手忙腳亂地把手機塞回口袋，卻在轉身時，瞥見那株孢子母株的頂端，正「噗」地一聲，彈開了一個飽滿的孢子囊。" },
    { type: "dialogue", name: "旁白", text: "一小團幾乎看不見的、帶著淡淡甜香的孢子粉末，就這樣朝著我和盧卡斯的方向，緩緩地飄散開來。" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：吸入高濃度新鮮孢子！視線開始模糊躁動！</b><br><br><b>🎮 專注採樣・別看學長</b><br>孢子讓你的視野一陣陣發暈。你得趕在暈眩加劇前，把三個採樣器都校準好——<br><br><b>玩法（限時 14 秒）：</b><br>① 狂點畫面上冒出的<b style='color:#7CFC00;'>綠色採樣校準點</b>，湊滿「採樣」進度條！<br>② 但畫面也會冒出誘人的<b style='color:#ff77bb;'>粉紅色學長部位</b>（側臉／後頸／小臂）——<b>手殘戳下去</b>就會「失神」暴走！<br>忍住別看，把採樣做完！</div>" },

    // ------------------------------------------------------------------
    // 🎮 小遊戲：專注採樣・別看學長 (Focus Tap)
    // ------------------------------------------------------------------
    {
        type: "focus_tap_qte",
        time: 14.0,
        charSprite: "assets/img/cha/盧卡斯_立繪_便服_普通.png",
        needTaps: 9,
        greenLife: 1.3,
        greenGap: 0.72,
        lureGap: 1.25,
        lureLife: 1.5,
        lurePenalty: 22,
        greenLabels: ["🔬 採樣器 A", "🔬 採樣器 B", "🔬 採樣器 C", "🧪 校準點", "📡 感測器"],
        lures: ["側臉", "被汗濡濕的後頸", "捲袖的小臂", "微張的唇", "滑動的喉結"]
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "旁白", text: "我死死盯著手中的採樣器，把眼角餘光裡那個礙眼（不，是太過好看）的人影狠狠地屏蔽掉，總算撐過了那陣令人頭暈目眩的甜香。完成三個採樣器的架設後——" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯遞給我一塊巧克力能量棒和那壺溫水。" },
    { type: "dialogue", name: "盧卡斯", text: "辛苦了。你今天臉色一直不太好，多補充點熱量。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "dialogue", name: "旁白", text: "他說著，極其自然地抬手，用指腹替我拭去了額角的一滴汗。那個動作太輕、太自然，輕得像是一陣風，卻讓我的呼吸又一次徹底亂了套。" },
    { type: "dialogue", name: "雨果", text: "（學長……你到底知不知道，你每一個動作，都在精準地往我心臟上補刀啊……）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "hide_char" },

    // =====================================================================
    // 🎬 場景四：中午，別墅營地 (大小姐空降)
    // =====================================================================
    { type: "bg", src: "assets/img/bg/豪華的別墅一樓客廳。大理石地板折射著精緻的吊燈光芒，落地窗外是高山森林的壯麗景致。.png", fade: true, bgm: "assets/audio/bgm/日常BGM.mp3", location: "中午，別墅一樓客廳" },
    { type: "dialogue", name: "旁白", text: "中午回到別墅，兩支隊伍陸續會合。我正癱在沙發上回血，別墅的大門就被人「碰」地一聲，用一種極具戲劇張力的方式推開了。" },
    { type: "sfx", src: "assets/audio/sfx/開門聲.mp3" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "旁白", text: "一位有著粉紫漸層波浪捲髮、氣質宛如千金大小姐的女孩，拖著一個鑲滿亮鑽的行李箱，風風火火地走了進來。她一眼就鎖定了人群中的西爾維亞，那雙下垂的紫藍色眼睛瞬間亮成了星星。" },
    { type: "dialogue", name: "安娜塔西亞", text: "西爾維亞——！我的白馬王子！我搭頭班車趕上來啦！你有沒有想我？", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_一般.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞面不改色地、極其自然地將撲過來的安娜塔西亞穩穩接住，打橫抱起，彷彿這只是一個再普通不過的問候。" },
    { type: "dialogue", name: "西爾維亞", text: "有。一路辛苦了，妻子。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_微笑.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "討厭啦～你怎麼這麼會說話！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "dialogue", name: "雨果", text: "（……單身狗的眼睛，有點被閃瞎。）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png" },
    { type: "hide_char" },

    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_抱怨.png" },
    { type: "dialogue", name: "旁白", text: "被放下來的安娜塔西亞理了理裙擺，這才慢條斯理地環視一圈。當那雙下垂的紫藍色眼睛掃過盧卡斯時，她毫不留情地瞇了瞇眼，撇了撇嘴。" },
    { type: "dialogue", name: "安娜塔西亞", text: "喔，庸俗也在啊。", voice: "assets/audio/voice/安娜塔西亞_失望or嫌棄.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "安娜塔西亞，我有名字，叫盧卡斯。", voice: "assets/audio/voice/盧卡斯_困擾.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_說話.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "我知道啊。但你連名字都這麼大眾，在路上喊一聲『盧卡斯』，肯定一堆人回頭。可要是喊一聲『庸俗』，大概就只有你會回頭了。", voice: "assets/audio/voice/安娜塔西亞_嗯？.wav" },
    { type: "dialogue", name: "安娜塔西亞", text: "對了，庸俗——我的行李箱還丟在門口。搬上二樓我的房間去。當白馬王子的好朋友，這種粗活你最拿手了吧？" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "……我知道了。", voice: "assets/audio/voice/盧卡斯_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "盧卡斯認命地嘆了口氣，彎腰扛起那只沉甸甸、鑲滿亮鑽的行李箱，那副狼狽又無可奈何的模樣，看得我一陣於心不忍。" },
    { type: "dialogue", name: "雨果", text: "（……學長，辛苦你了。我很想替你說句公道話，可是這位大小姐的氣場實在太強，我這種社恐小人物，是萬萬不敢惹的……只能在心裡默默為你哀悼三秒鐘。）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "hide_char" },

    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "打發完免費勞力，安娜塔西亞的目光才轉到縮在沙發角落、努力降低存在感的我身上。" },
    { type: "dialogue", name: "安娜塔西亞", text: "喔，雨果也來啦。嗯……上次在社辦見到你，好像也是這樣安安靜靜地窩在角落。像蘑菇一樣。", voice: "assets/audio/voice/安娜塔西亞_嗯？.wav" },
    { type: "dialogue", name: "雨果", text: "安娜塔西亞學姐……妳好。好久沒在社辦看到妳了。", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "旁白", text: "（安娜塔西亞是西爾維亞交往多年的女朋友，社團攏共就我們四個人，她又時常來社辦串門子探班——一來二去，我跟她也算是熟面孔了。雖然每次見面，我的耳膜都得先做好被高分貝洗禮的心理準備。）" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_說話.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "說起來，你能加入西爾維亞的社團、給這麼完美的人打下手，可是天大的福氣呢。你看我，明明最討厭這種蟲子多、連間像樣下午茶店都沒有的鬼地方——", voice: "assets/audio/voice/安娜塔西亞_失望or嫌棄.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "還不是為了我的白馬王子，大老遠跑到這種深山裡來！為了西爾維亞，這點犧牲算得了什麼～", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_一般.png" },
    { type: "dialogue", name: "西爾維亞", text: "妻子，妳不用勉強。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "才不勉強呢！只要和你在一起，連蟲子看起來都變可愛了！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "dialogue", name: "雨果", text: "（……我完全不會吃社長的醋。西爾維亞社長確實是個值得尊敬的人。只是這撲面而來的高糖濃度，讓我這條單身狗的血糖有點超標。）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png" },
    { type: "hide_char" },

    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "這時，搬完行李的盧卡斯正好走回客廳，恰恰聽見了這句高分貝的告白，默默地摸了摸自己被震得發疼的耳朵。" },
    { type: "dialogue", name: "安娜塔西亞", text: "對了！難得來一趟合宿，氣氛當然要熱鬧、要浪漫一點才行！我提議——明天晚上，我們就在星空下辦一場戶外 BBQ 加篝火晚會吧！烤肉、唱歌，多有情調！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "雨果", text: "（唱歌……我彷彿已經聽見學長的耳膜，提前發出了破碎的悲鳴。）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_開心.png", action: "jump" },
    { type: "dialogue", name: "蜜拉思", text: "我贊成！科學家，也是需要補充蛋白質的！", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "dialogue", name: "旁白", text: "就這樣，在大小姐一聲令下，明晚的 BBQ 篝火晚會，就這麼愉快地決定了。" },
    { type: "hide_char" },

    // =====================================================================
    // 🎬 場景五：午後，研究進度匯報 (難得的正經)
    // =====================================================================
    { type: "bg", src: "assets/img/bg/豪華的別墅一樓客廳。大理石地板折射著精緻的吊燈光芒，落地窗外是高山森林的壯麗景致。.png", fade: true, bgm: "assets/audio/bgm/社團時間.mp3", location: "午後，別墅一樓客廳" },
    { type: "dialogue", name: "旁白", text: "午後，西爾維亞召集眾人，簡短地匯報了上午的研究進度。" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "艾薇將數據投影到牆上，淡藍色的曲線交錯成一張複雜的網。" },
    { type: "dialogue", name: "艾薇", text: "東西兩側的採樣器皆已就位。根據初步數據，西側針葉林斜坡的孢子母株活性，比東側高出 23%。推測與該區午後濕度較高、日照較少有關。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "西爾維亞", text: "明天上午，回收採樣器，做最後一次數據比對。後天，回程。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "聽到「後天回程」這四個字，我懸了好幾天的心，總算落下了一半。" },
    { type: "dialogue", name: "雨果", text: "（再撐兩天……只要再撐過兩天，我就能回到那個沒有費洛蒙轟炸的、安全的家了……）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "旁白", text: "我一邊在心裡盤算著倒數計時，一邊悄悄抬眼，卻又一次撞進了盧卡斯溫和的注視裡。他不知在想什麼，只是望著我，嘴角噙著一抹很淺的笑。" },
    { type: "dialogue", name: "雨果", text: "（……為什麼，一想到要回程，我的心裡，又有那麼一點點……捨不得呢？）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "這個突如其來的念頭，把我自己都嚇了一跳。我慌忙搖了搖頭，把它甩出了腦外。一定是孢子的錯。一定是。" },

    // =====================================================================
    // 🎬 場景六：深夜，別墅二樓陽台 (月光下的失守)
    // =====================================================================
    { type: "bg", src: "assets/img/bg/別墅二樓的露天陽台。深邃的夜空綴滿繁星，遠處的森林在月光下化作一片墨色的剪影.png", fade: true, bgm: "assets/audio/bgm/夜晚時間.mp3", location: "深夜，別墅二樓陽台" },
    { type: "dialogue", name: "旁白", text: "夜深了。我又一次被體內躁動的熱流折騰得睡不著，索性披了件外套，溜到二樓的陽台透氣。" },
    { type: "dialogue", name: "旁白", text: "高山的夜空乾淨得不可思議，密密麻麻的星子彷彿觸手可及。我趴在欄杆上，貪婪地呼吸著冰涼的空氣，總算覺得發燙的腦袋清醒了一些。" },
    { type: "sfx", src: "assets/audio/sfx/開門聲.mp3" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "也睡不著？", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "旁白", text: "我渾身一僵。回頭，就看見盧卡斯端著兩杯熱牛奶，不知何時也走上了陽台。他換上了居家的睡衣，額前的碎髮柔軟地散著，少了白天的銳利，多了幾分慵懶的溫柔。" },
    { type: "dialogue", name: "盧卡斯", text: "廚房還有溫熱的牛奶，給你帶了一杯。喝點熱的，比較好睡。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "dialogue", name: "旁白", text: "他把溫熱的馬克杯塞進我手裡，然後很自然地，在我身旁的欄杆前站定。兩人之間的距離，近得能聞到他身上淡淡的雪松香。" },
    { type: "dialogue", name: "雨果", text: "……謝謝學長。", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "旁白", text: "我捧著那杯牛奶，覺得手心和心臟都燙得厲害。我們並肩站著，誰都沒有說話，只有夜風拂過林梢的沙沙聲。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_普通.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯忽然開口，聲音低沉而柔和，像是怕驚擾了這片星空。" },
    { type: "dialogue", name: "盧卡斯", text: "雨果，這幾天……你好像一直在躲我。", voice: "assets/audio/voice/盧卡斯_困擾.wav" },
    { type: "dialogue", name: "雨果", text: "（——！！被發現了？！）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "我的心臟猛地一縮。就在我大腦一片空白、孢子又開始蠢蠢欲動、潛意識叫囂著要我「乾脆就告訴他吧」的危急關頭——" },
    { type: "hide_char" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：高濃度費洛蒙 ＋ 深夜 ＋ 獨處！</b><br>理智防線瀕臨崩潰，心跳失速！<br><br><b>🎮 星空下的心跳節律・吞嚥時機</b><br>學長每說一句溫柔的話、或不經意地靠近一點，你的<b>心率</b>就會狂飆——衝進最右側<b style='color:#ff3366;'>紅色危險區</b>就會發出可疑的喘息聲！<br><br><b>玩法（限時 16 秒）：</b><br>下方有一條來回掃動的<b>「吞嚥時機條」</b>。<b>只有</b>在游標掃進<b style='color:#7CFC00;'>綠色區間</b>時點擊 <b>【吞口水・深呼吸】</b>（或<b>空白鍵</b>），才能有效把心率壓下去；<b style='color:#ff5c8a;'>按錯時機會「嗆到」，心率反而上升！</b><br>時機條會越掃越快，撐過這 16 秒！</div>" },

    // ------------------------------------------------------------------
    // 🎮 小遊戲：星空下的心跳節律・吞嚥時機 (Swallow Timing・HARD)
    // ------------------------------------------------------------------
    {
        type: "swallow_timing_qte",
        time: 16.0,
        charSprite: "assets/img/cha/盧卡斯_立繪_睡衣_普通.png",
        startRate: 30,
        warnRate: 72,
        creep: 5,
        goodDrop: 20,
        missPenalty: 4,
        sweepSpeed: 0.75,
        greenWidth: 26,
        lineGap: 2.6,
        lines: [
            { text: "你的臉，怎麼又紅了？", spike: 11 },
            { text: "離我近一點，外面很冷。", spike: 13 },
            { text: "我有哪裡……讓你不自在嗎？", spike: 10 },
            { text: "看著我，雨果。", spike: 15 },
            { text: "你的手，在抖。", spike: 12 },
            { text: "別怕，我又不會吃了你。", spike: 14 }
        ]
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "旁白", text: "我死死盯著自己的心跳，在盧卡斯一聲又一聲的溫柔轟炸中，抓準每一次吞嚥的時機，艱難地把它壓回了安全線。然後，我深吸一口氣，用盡畢生的演技，擠出了一個面癱的微笑。" },
    { type: "dialogue", name: "雨果", text: "我沒有躲學長啦。只是……最近換了環境，有點認床，精神不太好而已。", avatar: "assets/img/cha/雨果_頭像_便服_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_微笑.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯凝視了我幾秒，似乎想說什麼，最終卻只是輕輕嘆了口氣，伸手揉了揉我的頭髮。" },
    { type: "dialogue", name: "盧卡斯", text: "……是嗎。那就好。早點回去睡吧，別著涼了。明天還要回收採樣器。", voice: "assets/audio/voice/盧卡斯_輕輕笑.wav" },
    { type: "dialogue", name: "旁白", text: "他替我把外套的領子拉好，動作溫柔得近乎縱容。" },
    { type: "dialogue", name: "雨果", text: "嗯。學長也是，晚安。", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "hide_char" },
    { type: "sfx", src: "assets/audio/sfx/關門聲.mp3", stopBgm: true },
    { type: "dialogue", name: "旁白", text: "我逃也似地回到房間，背靠著門板，緩緩地滑坐到地上，捂住了自己那顆幾乎要跳出胸口的心臟。" },
    { type: "dialogue", name: "雨果", text: "（不行……不能再這樣下去了。我感覺，我撐不到孢子代謝完的那一天，就會先因為心跳過速而暴斃了。）", avatar: "assets/img/cha/雨果_頭像_便服_絕望.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "dialogue", name: "旁白", text: "窗外，星河璀璨。而我那點搖搖欲墜的理智，正在這片過於浪漫的星空下，一寸一寸地，融化。" },

    {
        type: "fade_text",
        text: "<span class='fade-line-1'>Day 5 存活確認。</span><br><br><span class='fade-line-2'>理智值剩餘：15%</span>"
    },
    { type: "delay", time: 8, stopBgm: true },
    { type: "end_day", day: 5 }
];
