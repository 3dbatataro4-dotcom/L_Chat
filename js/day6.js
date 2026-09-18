const Day6Script = [
    // =====================================================================
    // 🎬 場景一：清晨，別墅大廳 (今天，你想跟誰走？)
    // =====================================================================
    // 註：本日已配置音效 (SFX)，人物語音待日後補上；BGM 依新素材重新編排。
    // 註：本日含劇情分歧（A 線：星空 / B 線：祭典），選擇會存入 flag "day6_route" 供 Day 7 使用。
    // 註：原定回程時間為「明天」，故流星雨 / 祭典（皆在明晚）理論上都趕不上——直到雷雨沖斷了橋。
    { type: "bg", src: "assets/img/bg/豪華的別墅一樓客廳。大理石地板折射著精緻的吊燈光芒，落地窗外是高山森林的壯麗景致。.png", fade: true, bgm: "assets/audio/bgm/溫馨事件BGM.mp3", location: "清晨，別墅一樓客廳" },
    { type: "dialogue", name: "旁白", text: "合宿的第二天早晨，我是被一股濃郁的、奶油混著焦糖的香氣給喚醒的。" },
    { type: "dialogue", name: "旁白", text: "餐桌上，奧拉老師的私人主廚變出了一整桌現烤的可頌與抹了厚厚果醬的法式吐司。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_開心.png" },
    { type: "dialogue", name: "旁白", text: "蜜拉思二哥幸福得整張臉都快埋進盤子裡，連白袍袖口沾到了果醬都渾然不覺。" },
    { type: "dialogue", name: "蜜拉思", text: "唔嗯——這就是資本主義的早餐！科學家的舌頭，也是需要做對照實驗的。", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "dialogue", name: "蜜拉思", text: "我宣布，這塊可頌比昨天的還要完美 3.7%！" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_正常.png" },
    { type: "dialogue", name: "奧拉", text: "嘴角。擦一下。", voice: "assets/audio/voice/奧拉_嗯.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我小口小口地喝著熱可可，努力降低自己的存在感。" },
    { type: "dialogue", name: "旁白", text: "昨晚陽台上那句「你好像一直在躲我」，到現在都還懸在我頭頂上，像一把隨時會掉下來的劍。" },
    { type: "sfx", src: "assets/audio/sfx/椅子拉動聲.mp3" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞社長放下咖啡杯，用不容置疑的節奏，宣布了今天的行程。" },
    { type: "dialogue", name: "西爾維亞", text: "今天，兩條路線。一，我和妻子，去南面山頂回收採樣器，順路探勘地形。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "dialogue", name: "西爾維亞", text: "二，蜜拉思、奧拉、艾薇，去北側溪谷，採集對照組樣本兼做孢子分析。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "山頂約會！我是說——山頂『探勘』！西爾維亞，我把野餐墊都帶來了！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_一般.png" },
    { type: "dialogue", name: "旁白", text: "社長的視線平移過來，精準地釘在我身上。" },
    { type: "dialogue", name: "西爾維亞", text: "雨果。你跟哪一隊，自己選。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "dialogue", name: "西爾維亞", text: "盧卡斯，都會跟。" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（……等等。為什麼「盧卡斯都會跟」，可以講得像自然法則一樣？！）", avatar: "assets/img/cha/雨果_頭像_便服_絕望.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "嗯，昨天的採樣資料是我和雨果一組記錄的，後續我得跟著他，數據才對得上。", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "盧卡斯", text: "……雨果，你想去哪邊？我都可以。" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "他說得理直氣壯，理直氣壯到我完全找不到反駁的餘地。所有人的視線都集中了過來——" },
    { type: "dialogue", name: "旁白", text: "好吧。今天的命運，就由我自己來選。" },

    // ------------------------------------------------------------------
    // ★ 劇情分歧：路線選擇（影響 Day 7 結局分線）
    // ------------------------------------------------------------------
    {
        type: "story_choice",
        prompt: "今天，要跟哪一隊行動？<br><small>（這個選擇，將悄悄改變之後的故事走向……）</small>",
        options: [
            {
                text: "🏔️ 跟西爾維亞＆安娜塔西亞，去南面山頂",
                hint: "想暫時遠離學長，找個人說說話……大小姐雖然毒舌，但意外地是個好聽眾？",
                jump: "routeA",
                flag: { key: "day6_route", value: "A" }
            },
            {
                text: "🏞️ 跟蜜拉思＆奧拉＆艾薇，去北側溪谷",
                hint: "想搞懂自己身上這該死的孢子……也許能從二哥嘴裡問出點什麼。",
                jump: "routeB",
                flag: { key: "day6_route", value: "B" }
            }
        ]
    },

    // =====================================================================
    // 🅰️ 路線 A：南面山頂線
    // =====================================================================
    { type: "label", name: "routeA" },
    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    { type: "bg", src: "assets/img/bg/開闊的高山山徑。視野遼闊，腳下是翻湧的雲海，遠處的山巒層層疊疊.png", fade: true, bgm: "assets/audio/bgm/清晨森林的漫步（西爾維亞線）.mp3", location: "上午，南面山徑" },
    { type: "dialogue", name: "旁白", text: "南面的山徑意外地開闊，腳下是翻湧的雲海，遠處的山巒像被誰隨手暈開的水墨，一層一層地淡進天色裡。" },
    { type: "dialogue", name: "旁白", text: "跟著西爾維亞和安娜塔西亞爬山，氣氛意外地輕鬆——因為大小姐的全部注意力，從頭到尾都黏在她的「白馬王子」身上。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "西爾維亞你看！那朵雲好像一隻兔子！欸不對，現在更像一隻在啃蘿蔔的兔子！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_一般.png" },
    { type: "dialogue", name: "西爾維亞", text: "嗯。很像。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "而我，刻意放慢腳步，和走在隊伍最後的盧卡斯拉開了一段安全距離，悄悄挪到了安娜塔西亞身邊。" },
    { type: "dialogue", name: "旁白", text: "比起會讓我心跳爆表的盧卡斯，跟這位大小姐待在一起，反而讓我安心得多。然而，我這點小心思，立刻就被她逮個正著。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_說話.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "我說你啊，雨果。你從剛剛就一直躲在我後面，是把我當擋箭牌嗎？你該不會……是在躲庸俗吧？", voice: "assets/audio/voice/安娜塔西亞_嗯？.wav" },
    { type: "dialogue", name: "雨果", text: "咳！沒、沒有的事——", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_普通.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "少騙我。你看庸俗的那個眼神，至少和我看白馬王子的時候，有三成像。", voice: "assets/audio/voice/安娜塔西亞_失望or嫌棄.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我整個人如遭雷擊，當場僵在原地。腳下的碎石子滾了兩圈，滾進雲海裡去了。" },
    { type: "dialogue", name: "雨果", text: "（被、被看穿了？！三成像？！那剩下七成是什麼？！）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png" },
    { type: "dialogue", name: "旁白", text: "孢子在這一刻又開始興風作浪，逼著我那道緊繃的心防裂開一條縫。鬼使神差地——我竟然想把這個憋了好幾天的秘密說出來。" },
    { type: "dialogue", name: "旁白", text: "可是話一湧到嘴邊，孢子卻連「措辭」都想替我作主。那些絕對不能說出口的真心話，正和體面的說法擠在同一個喉嚨裡……" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：坦白衝動觸發！孢子正在劫持你的語言中樞！</b><br><br><b>🎮 組織語言・真心話拼句</b><br>上方是一句待填空的坦白。從下方詞卡裡挑出<b style='color:#8fe3c0;'>得體的詞</b>填進空格；<br>詞卡裡混進了<b style='color:#ff77bb;'>母湯的真心話</b>——<b>戳到就會讓社死值飆升</b>！<br><br><b>玩法（限時 18 秒）：</b>把空格全部填滿、社死值別爆表！</div>" },

    // ------------------------------------------------------------------
    // 🎮 A-小遊戲 1：組織語言・真心話拼句 (Word Pick)
    // ------------------------------------------------------------------
    {
        type: "word_pick_qte",
        time: 18.0,
        title: "向大小姐坦白 — 填出體面的那句話！",
        sentence: ["我好像", "喜歡上", "學長了", "……但我", "不敢說"],
        decoys: ["每天都夢到他", "想被他抱緊", "他的鎖骨", "想咬一口", "睡衣底下"],
        decoyPenalty: 26
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "雨果", text: "我好像……喜歡上學長了。從很久以前就……但我不敢說。", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "dialogue", name: "旁白", text: "說完的瞬間，我整個人像被抽掉了骨頭，又輕又虛。連帶著那株孢子，都彷彿滿足地安靜了幾秒。" },
    { type: "dialogue", name: "旁白", text: "然後，我把孢子的事、這幾天的雞飛狗跳，全都一五一十地倒了出來。安娜塔西亞挑著眉聽完，慵懶地撥了撥垂落的捲髮。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_普通.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "就這？我還以為是什麼驚天動地的大事呢。喜歡庸俗喔……嗯，雖然我是真的看不太出來他那張庸俗臉到底哪裡好啦。", voice: "assets/audio/voice/安娜塔西亞_失望or嫌棄.wav" },
    { type: "dialogue", name: "安娜塔西亞", text: "不過——這是你的事，跟我又沒關係。" },
    { type: "dialogue", name: "雨果", text: "妳……不覺得這樣很糟糕嗎？偷偷喜歡他，還連正眼都不太敢看他……", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_說話.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "糟糕？我為什麼要覺得糟糕？談戀愛又不犯法。", voice: "assets/audio/voice/安娜塔西亞_嗯？.wav" },
    { type: "dialogue", name: "安娜塔西亞", text: "你要鼓起勇氣去告白也好、要憋著讓它爛在心裡也好，反正是你自己的人生，我可懶得替你操心。" },
    { type: "dialogue", name: "旁白", text: "她說得雲淡風輕，順手還從隨身的小包裡掏出一顆糖，剝開，扔進嘴裡。" },
    { type: "dialogue", name: "安娜塔西亞", text: "真要說的話——我跟西爾維亞當初，從我發現喜歡她到在一起，前後不超過三天。" },
    { type: "dialogue", name: "安娜塔西亞", text: "喜歡就說，不喜歡也有一種失戀的浪漫。扭扭捏捏的最浪費時間了。當然，你要是想自生自滅下去，我也完全沒意見。" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（這位學姐……明明一點都不在乎，語氣還欠揍得很。但不知道為什麼，竟意外地讓人鬆了一口氣。）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png" },
    { type: "dialogue", name: "旁白", text: "原來，把壓在心底好幾天的秘密說出口，然後被人用一種「這沒什麼大不了」的態度輕輕接住——是這麼讓人安心的一件事。" },
    { type: "dialogue", name: "旁白", text: "山風掠過雲海，把我肩上那塊看不見的石頭，悄悄吹輕了一點。" },

    // ------------------------------------------------------------------
    // 🎮 A-小遊戲 2：艾薇的遠程小測驗（登山途中）
    // ------------------------------------------------------------------
    { type: "sfx", src: "assets/audio/sfx/(SFX：劇烈的手機震動聲！）.wav" },
    { type: "dialogue", name: "旁白", text: "就在這時，我口袋裡的手機震動了一下。即使分隔兩座山頭，艾薇依然準時得像一台精密的鬧鐘。" },
    { type: "dialogue", name: "旁白", text: "我掏出手機一看，螢幕上跳出了熟悉的對話框。看來她在遠端也沒打算放過我的腦神經。" },
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：我們能看見流星，是因為流星體高速衝入大氣層、與空氣摩擦生熱而發光。請問這個發光過程，主要發生在大氣層的哪一層？", targetChat: "ivy" },
    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>🎮 艾薇的遠程小測驗</b><br><br>孢子又在搗亂，把選項用<b style='color:#ff66aa;'>妄想泡泡</b>蓋住了！<br><br><b>玩法：</b>狂點戳破泡泡，看清選項，再選出<b>正確答案</b>！</div>" },
    { type: "wait_for_chat", chatId: "ivy" },
    {
        type: "chat_qte_academic",
        targetChat: "ivy",
        time: 14.0,
        glitch: false,
        bubbles: {
            count: 5,
            texts: [
                "想跟學長一起看流星……",
                "他剛剛那個笑……",
                "「約會」兩個字好燙……",
                "山上會冷……可以靠近一點嗎……",
                "學長的眼睛比星星還亮……"
            ]
        },
        mutangOptions: [
            { text: "選項 A：想牽學長的手看星星", isCorrect: false },
            { text: "選項 B：靠在學長肩膀上", isCorrect: false },
            { text: "選項 C：學長比流星還耀眼", isCorrect: false }
        ],
        options: [
            { text: "選項 A：對流層", isCorrect: false },
            { text: "選項 B：中氣層", isCorrect: true },
            { text: "選項 C：學長比流星還耀眼", isCorrect: false }
        ],
        successMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👍回答正確。中氣層。看來你的前額葉在山頂稀薄的空氣下依然堪用。" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "順帶一提，我偵測到你今天的心率基線偏高。建議遠離特定光源——例如盧卡斯。" }
        ],
        failMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👎回答錯誤。你的答案帶有強烈的孢子妄想特徵。" },
            { sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "抱歉抱歉，山上訊號不好（才怪）。再來一次！", isSelf: true },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我重新發送。請先清除妄想泡泡。" },
            { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：我們能看見流星，是因為流星體高速衝入大氣層、與空氣摩擦生熱而發光。請問這個發光過程，主要發生在大氣層的哪一層？", targetChat: "ivy" }
        ]
    },
    { type: "transition", to: "VN", fade: true },
    { type: "dialogue", name: "旁白", text: "測驗總算結束，我揉了揉被閃爍螢幕刺得發酸的眼睛，這才收起手機。這傢伙到底為什麼在登山途中還要出題啊……" },

    // --- A：下午，山頂 ---
    { type: "bg", src: "assets/img/bg/南面山頂的觀景台。午後的天空開始堆積起厚重的雲層，光線變得有些陰沉。.png", fade: true, bgm: "assets/audio/bgm/傍晚活動.mp3", location: "下午，南面山頂觀景台" },
    { type: "dialogue", name: "旁白", text: "抵達山頂、回收完採樣器時，天色已經悄悄變了。厚重的雲層在遠方堆積，光線變得有些陰沉，山風裡開始有潮濕的味道。" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "西爾維亞望著遠方翻湧的雲海，難得地、主動開了口。" },
    { type: "dialogue", name: "西爾維亞", text: "氣象資料顯示，明晚有獅子座流星雨。極大期，每小時可達數十顆。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "流星雨？！真的假的？！你看這雲——要是今晚下一場雨把空氣裡的灰塵都洗乾淨，明晚的星星一定亮得不像話！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_抱怨.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "可是……我們明天一早就要回去了。明晚的流星雨，鐵定是看不到了，真可惜。", voice: "assets/audio/voice/安娜塔西亞_嘆氣.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "就在這片惋惜的氣氛裡，一直安靜站在我身旁的盧卡斯，忽然側過頭。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_普通.png" },
    { type: "dialogue", name: "盧卡斯", text: "我知道，我們明天一早就要下山了，多半是沒機會的……", voice: "assets/audio/voice/盧卡斯_尷尬.wav" },
    { type: "dialogue", name: "盧卡斯", text: "但萬一——萬一明晚真的能看到流星雨，雨果，你願意，跟我一起看嗎？" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（——？！這、這算什麼？！這算邀約嗎？！是那種「約會」的邀約嗎？！）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "明明是趕不上的約定，我的心跳，卻比山頂的風還要吵。" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：學長發動正面邀約！心跳失速！</b><br><br><b>🎮 流星雨的邀約・心跳節律</b><br>學長每說一句話、每靠近一步，你的<b>心率</b>就會狂飆——衝進<b style='color:#ff3366;'>紅色危險區</b>就會當場語無倫次！<br><br><b>玩法（限時 15 秒）：</b>抓準時機點擊 <b>【深呼吸・吞口水】</b>（或空白鍵），把心率壓回安全區！</div>" },

    // ------------------------------------------------------------------
    // 🎮 A-小遊戲 3：流星雨的邀約・心跳節律 (Heartbeat Rhythm)
    // ------------------------------------------------------------------
    {
        type: "heartbeat_rhythm_qte",
        time: 15.0,
        charSprite: "assets/img/cha/盧卡斯_立繪_便服_普通.png",
        startRate: 28,
        warnRate: 72,
        creep: 6,
        breathDrop: 14,
        lineGap: 2.6,
        lines: [
            { text: "兩個人一起看，應該會更清楚。", spike: 13 },
            { text: "山上晚上很冷，我會帶熱可可。", spike: 12 },
            { text: "……可以嗎？", spike: 16 },
            { text: "如果你不想的話，也沒關係。", spike: 11 },
            { text: "但我會有點失落，大概。", spike: 15 }
        ]
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "旁白", text: "我抓著登山背包的肩帶，指節發白，總算把那顆快要衝出喉嚨的心臟，一下一下地嚥了回去。" },
    { type: "dialogue", name: "雨果", text: "……如果，看得到的話。嗯，好啊。", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "旁白", text: "我低著頭，用蚊子般的音量答應了。但我能清楚地感覺到，自己的耳朵正在以肉眼可見的速度燒紅。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "好。那就說定了。", voice: "assets/audio/voice/盧卡斯_笑.wav" },
    { type: "dialogue", name: "旁白", text: "盧卡斯臉上綻開了一個格外明亮的笑容——那是我從未見過的、像個少年一樣的笑。" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（可是……我們明天一早就要回程了啊。這個約定，根本不可能實現吧……）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png" },
    { type: "dialogue", name: "雨果", text: "（明明知道趕不上，我卻是第一次覺得，這個倒數計時，有點捨不得走完。）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png" },
    { type: "jump", to: "camp" },

    // =====================================================================
    // 🅱️ 路線 B：北側溪谷線
    // =====================================================================
    { type: "label", name: "routeB" },
    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    { type: "bg", src: "assets/img/bg/清澈的溪谷。流水潺潺，溪邊的岩石上長滿了濕潤的青苔與奇異的菌類。.png", fade: true, bgm: "assets/audio/bgm/清晨森林的漫步（蜜拉思線）.mp3", location: "上午，北側溪谷" },
    { type: "dialogue", name: "旁白", text: "北側的溪谷，是另一種畫風的世界。流水潺潺，溪邊的岩石上長滿濕潤的青苔，幾株發著微光的奇異菌類，從石縫間怯生生地探出頭。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_開心.png" },
    { type: "dialogue", name: "旁白", text: "蜜拉思二哥蹲在溪邊，用鑷子小心翼翼地夾起一株發光孢子，活像個挖到寶的孩子。" },
    { type: "dialogue", name: "蜜拉思", text: "喔喔喔——你看看這個孢子囊的飽滿度！這絕對是教科書等級的樣本！奧拉，快看！", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_正常.png" },
    { type: "dialogue", name: "旁白", text: "奧拉老師撐著一把黑傘站在他身後，面無表情地確保自己的伴侶不會一個踉蹌栽進溪裡。" },
    { type: "dialogue", name: "奧拉", text: "很好。往後退半步，你的鞋跟已經在水裡了。", voice: "assets/audio/voice/奧拉_嗯.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_普通.png" },
    { type: "dialogue", name: "艾薇", text: "溪水溫度 11.3 度，濕度 87%。此環境下的孢子活性，預估為別墅周邊的 1.6 倍。採樣價值：極高。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我蹲到二哥旁邊幫忙遞試管，趁著他心情大好的空檔，狀似不經意地問出了那個困擾我好幾天的問題。" },
    { type: "dialogue", name: "雨果", text: "二哥……那個孢子，到底還要多久才會代謝完啊？它除了讓人變得『誠實』，真的沒有別的影響嗎？", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "喲，這麼關心？放心啦三弟。這孢子的原理，跟我以前那款成名作『50%:50% 愛情魔藥』有點像。", voice: "assets/audio/voice/蜜拉思_了解.wav" },
    { type: "dialogue", name: "蜜拉思", text: "它不會無中生有，只會把你心裡『本來就有』的東西，放大、再放大，然後逼著它誠實地表現出來而已。" },
    { type: "dialogue", name: "旁白", text: "他壓低聲音，湊到我耳邊，露出一個欠揍的賊笑。" },
    { type: "dialogue", name: "蜜拉思", text: "換句話說，你現在腦子裡那些不可告人的小劇場……可都是貨真價實、發自你內心的喔。孢子可不會憑空捏造。" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（……可惡。果然不該問的。）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png" },
    { type: "dialogue", name: "旁白", text: "我又一次，無比強烈地，想對他比一個義大利不友善手勢。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_微笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "好了好了，別擺那張臉。來，將功贖罪的機會——幫二哥把這三管新鮮孢子封裝起來。", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "dialogue", name: "蜜拉思", text: "壓力要抓得剛剛好喔，壓不夠會漏氣，壓過頭會直接炸給你看。" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（等等，這種聽起來就很危險的工作，為什麼要交給一個受害者來做啊？！）", avatar: "assets/img/cha/雨果_頭像_便服_絕望.png" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>🎮 孢子封裝・壓力閥門</b><br><br>新鮮孢子囊極不穩定，封裝時的壓力必須拿捏得分毫不差！<br><br><b>玩法（限時 20 秒）：</b><br><b>按住</b>下方按鈕替封裝瓶加壓，壓力錶會不斷上升；<br>在指針落進<b style='color:#7CFC00;'>綠色密封區間</b>的瞬間<b>放開</b>！<br>放太早會漏氣、衝破 100% 會爆瓶——連續封好 <b>3 瓶</b>就過關！</div>" },

    // ------------------------------------------------------------------
    // 🎮 B-小遊戲 1：孢子封裝・壓力閥門 (Pressure Seal)
    // ------------------------------------------------------------------
    {
        type: "pressure_seal_qte",
        time: 20.0,
        vials: 3,
        fillSpeed: 52,
        bandWidth: 16
    },

    // ------------------------------------------------------------------
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_開心.png", action: "jump" },
    { type: "dialogue", name: "蜜拉思", text: "漂亮！三弟你很有當實驗助手的天分嘛！要不要考慮以後加入化學社？我們的福利是每週一次爆炸體驗！", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "dialogue", name: "雨果", text: "婉拒。我的人生已經夠多爆炸了。", avatar: "assets/img/cha/雨果_頭像_便服_平常.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "hide_char" },

    // ------------------------------------------------------------------
    // 🎮 B-小遊戲 2：艾薇的隨隊小測驗（溪谷邊）
    // ------------------------------------------------------------------
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "艾薇不知何時走到我身旁，面無表情地把電子數據板遞了過來。" },
    { type: "dialogue", name: "艾薇", text: "雨果。既然你今天貢獻了勞力，那就順便完成一下每日的認知功能檢測吧。這是你身為孢子受試者的義務。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "我無奈地嘆了口氣，接過數據板。就算人在野外，實驗狂魔的日常測驗也是躲不掉的。" },
    { type: "sfx", src: "assets/audio/sfx/手機提示.mp3" },
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：真菌與孢子植物，主要是透過哪一種構造，來進行繁殖與傳播？", targetChat: "ivy" },
    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>🎮 艾薇的隨隊小測驗</b><br><br>剛封裝完的孢子甜香還沒散，選項又被<b style='color:#ff66aa;'>妄想泡泡</b>蓋住了！<br><br><b>玩法：</b>狂點戳破泡泡，再選出<b>正確答案</b>！</div>" },
    { type: "wait_for_chat", chatId: "ivy" },
    {
        type: "chat_qte_academic",
        targetChat: "ivy",
        time: 14.0,
        glitch: false,
        bubbles: {
            count: 5,
            texts: [
                "剛剛湊得好近……",
                "他俯身的時候……",
                "溪水好涼……但我好熱……",
                "浴衣……不對，現在還沒到晚上……",
                "二哥說都是真心話……糟了……"
            ]
        },
        mutangOptions: [
            { text: "選項 A：想被學長從背後圈住", isCorrect: false },
            { text: "選項 B：學長濕掉的瀏海", isCorrect: false },
            { text: "選項 C：都是我的真心話", isCorrect: false }
        ],
        options: [
            { text: "選項 A：種子", isCorrect: false },
            { text: "選項 B：孢子囊", isCorrect: true },
            { text: "選項 C：都是我的真心話", isCorrect: false }
        ],
        successMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👍回答正確。孢子囊。你的邏輯功能在高濃度甜香下依然運作，值得記錄。" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "順帶一提，小白剛剛叼走了二哥的一根鑷子。牠看起來很得意。" }
        ],
        failMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👎回答錯誤。你的腦波再次集中在與『繁殖』相關的區域。" },
            { sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "剛吸太多甜香了！再給我一次！", isSelf: true },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我重新發送。請先清除妄想泡泡。" },
            { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：真菌與孢子植物，主要是透過哪一種構造，來進行繁殖與傳播？", targetChat: "ivy" }
        ]
    },
    { type: "transition", to: "VN", fade: true },
    { type: "dialogue", name: "旁白", text: "我一邊小聲抱怨一邊把數據板還給她。艾薇推了推眼鏡，滿意地記錄下數據，轉身又繼續去觀測她的植物了。" },

    // --- B：下午，山村 ---
    { type: "sfx", src: "assets/audio/sfx/腳步聲.mp3" },
    { type: "bg", src: "assets/img/bg/通往山下村莊的林間小路 → 古樸的山村廣場，公告欄上貼著一張色彩鮮豔的祭典海報。.png", fade: true, bgm: "assets/audio/bgm/社團時間.mp3", location: "下午，山腳下的村莊" },
    { type: "dialogue", name: "旁白", text: "下午，採樣結束得早，一行人順著林間小路下山，來到了山腳下一座古樸的小村莊補給物資。" },
    { type: "dialogue", name: "旁白", text: "村口的公告欄上，貼著一張色彩鮮豔的海報——紅燈籠、金魚、還有在夜空中炸開的煙火圖樣。" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_說話.png" },
    { type: "dialogue", name: "艾薇", text: "公告顯示，明晚此地將舉辦『夏日祭典』。內容包含：傳統小吃、攤位遊戲，以及……煙火大會。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_說話.png" },
    { type: "dialogue", name: "旁白", text: "奧拉老師推了推眼鏡，罕見地，對某件「無用之物」表現出了興致。" },
    { type: "dialogue", name: "奧拉", text: "煙火。聽起來不錯。如果參加，我可以聯絡主辦方，把施放時間延長一些。三個小時起跳，應該可以。", voice: "assets/audio/voice/奧拉_喔.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_唔？.png", action: "jump" },
    { type: "dialogue", name: "蜜拉思", text: "不行不行！我們明天一早就要回去了！而且三個小時的煙火是想把整座山炸了嗎？！你這個鈔能力凡爾賽！", voice: "assets/audio/voice/蜜拉思_疑惑.wav" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_正常.png" },
    { type: "dialogue", name: "奧拉", text: "……你不喜歡煙火？", voice: "assets/audio/voice/奧拉_嗯.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_困擾.png" },
    { type: "dialogue", name: "蜜拉思", text: "喜、喜歡啦。喜歡。但三十分鐘就很夠了！科學家講究的是精準的劑量控制！", voice: "assets/audio/voice/蜜拉思_尷尬or困擾.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_普通.png" },
    { type: "dialogue", name: "艾薇", text: "可惜，我們明天一早就要返程了，趕不上明晚的祭典。……不過，我對它懷有 17% 的好奇。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "dialogue", name: "旁白", text: "她頓了頓，用一貫平板的語氣，補充了一句讓我瞬間如臨大敵的情報。" },
    { type: "dialogue", name: "艾薇", text: "另外，公告上說，村裡的吳服店，提供浴衣的租借服務。" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（浴衣……？）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png" },
    { type: "dialogue", name: "旁白", text: "這個詞，像一把鑰匙，「咔嚓」一聲，打開了我腦中那扇絕對不該被打開的門——" },
    { type: "dialogue", name: "旁白", text: "深色的浴衣，利落束起的腰帶，微敞衣襟下若隱若現的鎖骨……那個畫面，正在我的腦海裡像相片顯影一樣，一吋一吋地變清晰！" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：浴衣聯想觸發！妄想正在腦內高速顯影！</b><br><br><b>🎮 妄想顯影・擦除防禦</b><br>腦裡那張「浴衣學長」的妄想畫面，正像相片一樣越顯越清晰！<br><br><b>玩法（限時 15 秒）：</b><br>按住畫面<b>來回用力摩擦</b>，把整張妄想畫面擦掉！<br>放著不管，它會慢慢<b style='color:#ff77bb;'>重新顯影</b>回來——擦掉九成才算贏！</div>" },

    // ------------------------------------------------------------------
    // 🎮 B-小遊戲 3：妄想顯影・擦除防禦 (Scrub Erase・含底圖)
    // ------------------------------------------------------------------
    {
        type: "scrub_erase_qte",
        time: 16.0,
        cg: "assets/img/CG/浴衣想像畫面.png",
        cols: 4,
        rows: 6,
        scrubNeed: 300,
        regrow: 0.045,
        whispers: [
            "腰帶……好想拆……",
            "微敞的衣襟……",
            "祭典夜裡牽手……",
            "不行！擦掉！擦掉！"
        ]
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "旁白", text: "我在腦內奮力地擦、擦、擦，總算趕在畫面高清顯影之前，把那張不可告人的妄想整個抹掉了。呼……好險。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_微笑.png" },
    { type: "dialogue", name: "旁白", text: "就在我滿臉通紅、拼命平復呼吸的時候，盧卡斯不知何時走到了我身邊，和我一起望著那張祭典海報。" },
    { type: "dialogue", name: "盧卡斯", text: "祭典啊……可惜，明晚我們大概已經在回家的路上了。", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "盧卡斯", text: "不過……萬一還在山上的話，雨果，要不要一起去逛逛？" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（又來了——！這個人，是不是把『邀約』當成呼吸了啊！明明就趕不上……）", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png" },
    { type: "dialogue", name: "雨果", text: "如、如果還在的話……好啊。", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "旁白", text: "我捂著發燙的臉，幾乎不敢去看他眼底那片溫柔的期待。回程的路上，海報上的煙火，一直在我的腦海裡靜靜地炸開。" },

    // =====================================================================
    // 🌩️ 共用劇情：傍晚營地・BBQ 與鬼故事（兩線匯合）
    // =====================================================================
    { type: "label", name: "camp" },
    { type: "sfx", src: "assets/audio/sfx/篝火環境音效（可以循環播放）.mp3", loop: true },
    { type: "bg", src: "assets/img/bg/別墅後院的營地。夕陽西下，BBQ 烤架上滋滋作響，篝火在漸暗的天色裡跳動著暖橙色的火光。.png", fade: true, bgm: "assets/audio/bgm/星空下的營火晚會.mp3", location: "傍晚，別墅後院營地" },
    { type: "dialogue", name: "旁白", text: "傍晚，兩支隊伍在別墅後院會合。烤架上的肉滋滋作響，油脂滴進炭火裡「啪」地竄起一小簇火苗，香氣混著篝火的煙味瀰漫了整個營地。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_開心.png" },
    { type: "dialogue", name: "蜜拉思", text: "烤肉是一門科學！梅納反應的黃金溫度是 155 度！都讓開，讓專業的來！", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "show_char", name: "奧拉", src: "assets/img/cha/奧拉_便服_正常.png" },
    { type: "dialogue", name: "旁白", text: "二哥當仁不讓地霸佔了烤肉架。奧拉老師則優雅地坐在一旁，用公筷把他烤焦的部分，一片、一片、面無表情地夾走。" },
    { type: "dialogue", name: "奧拉", text: "155 度的科學，燒焦率 40%。", voice: "assets/audio/voice/奧拉_嗯.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_花癡.png" },
    { type: "dialogue", name: "旁白", text: "另一頭，安娜塔西亞抱著西爾維亞的手臂，即興哼起了聲樂社的詠嘆調。高亢的花腔劃破山間的暮色——我親眼看見，盧卡斯端著盤子的手，微微地抖了一下。" },
    { type: "dialogue", name: "安娜塔西亞", text: "～♪ 啊～～～我的愛，如篝火般燃燒～～♪", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "（小聲）雨果……你昨天說的耳塞，帶在身上嗎？", voice: "assets/audio/voice/盧卡斯_困擾.wav" },
    { type: "dialogue", name: "雨果", text: "（小聲）……學長，我只帶了一副。分你一邊。", avatar: "assets/img/cha/雨果_頭像_便服_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "旁白", text: "我們像地下交易一樣，在餐盤的掩護下完成了耳塞的交接。他憋著笑接過去的樣子，讓這場高分貝災難，忽然變得沒那麼難熬了。" },
    { type: "hide_char" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_普通.png" },
    { type: "dialogue", name: "艾薇", text: "根據小白的進食量推算，牠對烤玉米的滿意度為 94%。牠現在很幸福。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "酒足飯飽，夜色徹底沉了下來。篝火燒得正旺，火星子劈劈啪啪地竄上夜空，和最早亮起的幾顆星星混在一起。" },

    // --- 鬼故事（鏡頭演出：ghost-mode 壓暗 + 篝火閃爍）---
    { type: "dialogue", name: "旁白", text: "就在這時，蜜拉思二哥往篝火裡添了一根柴。木柴「啪」地爆出一串火星，照亮了他緩緩壓低嗓音時，臉上那種——「不像好人」的、幽幽的笑容。", stopBgm: true },
    { type: "add_class", target: "#vn-screen", className: "ghost-mode" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_微笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "夜深了，篝火也旺了……不如，我來給大家講個故事吧。", voice: "assets/audio/voice/蜜拉思_笑.wav" },
    { type: "dialogue", name: "蜜拉思", text: "一個，發生在很多年前、某座跟我們現在這棟『一模一樣』的深山別墅裡的……真實故事。" },
    { type: "delay", time: 1.2 },
    { type: "dialogue", name: "旁白", text: "他刻意頓了頓。環視一圈被火光映得明明滅滅的我們，才慢條斯理地開了口。四周的黑暗，好像悄悄地又濃了一分。" },
    { type: "dialogue", name: "蜜拉思", text: "那年夏天，也有一群學生，來這附近的山裡合宿。六個人，住進了一棟很漂亮的別墅。" },
    { type: "dialogue", name: "蜜拉思", text: "第一天晚上，他們也像我們這樣圍著篝火烤肉、聊天。負責清點人數的隊長數了數——一、二、三、四、五、六。沒錯，六個人，全到齊了。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "可是那天半夜，睡在一樓的女孩，被樓梯上的腳步聲吵醒了。" },
    { type: "dialogue", name: "蜜拉思", text: "咯、噔。咯、噔。一步，一步。很慢，很重。從三樓，一路走下來。" },
    { type: "dialogue", name: "旁白", text: "篝火「啪」地爆了一聲。我旁邊不知道是誰，倒吸了一口涼氣。" },
    { type: "dialogue", name: "蜜拉思", text: "她以為是哪個同伴起來上廁所，就沒在意。直到那腳步聲，停在了她的房門口——" },
    { type: "delay", time: 1.2 },
    { type: "sfx", src: "assets/audio/sfx/敲門.mp3" },
    { type: "dialogue", name: "蜜拉思", text: "然後，門縫底下，伸進來一隻濕淋淋的、沾著泥土和松針的手。輕輕地，敲了敲她的床板。" },
    { type: "dialogue", name: "旁白", text: "山風恰好在這時穿過林梢，發出嗚咽一般的低鳴。我感覺自己的雞皮疙瘩，從腳踝一路爬上了後頸。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_便服_微笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "隔天早上，大家清點人數，準備出發。隊長又數了一遍——" },
    { type: "dialogue", name: "蜜拉思", text: "一、二、三、四、五、六、……七。" },
    { type: "delay", time: 1.5 },
    { type: "dialogue", name: "旁白", text: "他緩緩地、一字一頓地，露出了那個欠揍又滲人的笑。" },
    { type: "dialogue", name: "蜜拉思", text: "明明只有六個人來。可是從那天起，無論怎麼數，營地裡永遠都會多出『一個』人。" },
    { type: "dialogue", name: "蜜拉思", text: "而且啊……那第七個，總是站在隊伍的『最後面』。緊緊地，跟著走在最後的那個人。" },
    { type: "dialogue", name: "旁白", text: "他說完，意味深長地——朝著我們這群人裡，此刻正好坐在最邊邊的方向，慢慢地瞟了一眼。" },
    { type: "hide_char" },
    { type: "delay", time: 1.2 },
    { type: "dialogue", name: "旁白", text: "四下一片寂靜。只剩下篝火燃燒的劈啪聲。……順帶一提，坐在最邊邊的，是盧卡斯。" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_抱怨.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "就這？一點都不可怕。還沒我以前音樂學院那個室友卡謬的惡作劇嚇人呢。那傢伙才是真正的怪談。", voice: "assets/audio/voice/安娜塔西亞_失望or嫌棄.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_便服_普通.png" },
    { type: "dialogue", name: "艾薇", text: "為了維持情緒穩定，我決定判定剛才那段聲波輸入為『未接收』。", voice: "assets/audio/voice/艾薇_擔憂.wav" },
    { type: "hide_char" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_便服_擔心.png" },
    { type: "dialogue", name: "旁白", text: "唯獨盧卡斯——平時最沉穩可靠的他，此刻臉色有些發白，端著茶杯的手指微微收緊。他若無其事地、不著痕跡地，往人群中間挪了半個位子。" },
    { type: "dialogue", name: "雨果", text: "（咦……？學長他，該不會……是被嚇到了吧？）", avatar: "assets/img/cha/雨果_頭像_便服_平常.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "這個發現，讓我心裡某個角落，意外地軟了一下。原來這個近乎完美的人，也有這麼可愛的、會害怕的一面。" },
    { type: "hide_char" },

    // --- 雷雨（鏡頭演出：lightning-flash 三連閃）---
    { type: "sfx", src: "assets/audio/sfx/雷聲.mp3" },
    { type: "add_class", target: "#vn-screen", className: "lightning-flash" },
    { type: "dialogue", name: "旁白", text: "轟隆——！！就在這一刻，夜空毫無預兆地劈下一道慘白的閃電！震耳欲聾的雷聲緊隨其後，整座山都跟著顫了一下！" },
    { type: "remove_class", target: "#vn-screen", className: "lightning-flash" },
    { type: "remove_class", target: "#vn-screen", className: "ghost-mode" },
    { type: "sfx", src: "assets/audio/sfx/雨聲環境音.mp3", loop: true },
    { type: "dialogue", name: "旁白", text: "豆大的雨點瞬間砸落，轉眼就連成了一片瓢潑的大雨。篝火「滋」地一聲熄了一半，白煙翻滾著竄起。" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_便服_說話.png" },
    { type: "dialogue", name: "西爾維亞", text: "收東西。撤回別墅。植株和儀器優先。", voice: "assets/audio/voice/西爾維亞_嗯.wav" },
    { type: "dialogue", name: "旁白", text: "眾人手忙腳亂地搶救著研究樣本和食材，狼狽地衝回了別墅。西爾維亞抹了把臉上的雨水，套上雨衣。" },
    { type: "dialogue", name: "西爾維亞", text: "我去確認回程的路和橋的狀況。你們先去洗澡，別著涼。" },
    { type: "hide_char" },
    { type: "show_char", name: "安娜塔西亞", src: "assets/img/cha/安娜塔西亞_便服_說話.png" },
    { type: "dialogue", name: "安娜塔西亞", text: "我的王子！路上小心——！回來我幫你吹頭髮！", voice: "assets/audio/voice/安娜塔西亞_開心.wav" },
    { type: "hide_char" },
    { type: "sfx", src: "assets/audio/sfx/跑步聲.mp3" },
    { type: "dialogue", name: "旁白", text: "說完，社長的身影便義無反顧地，消失在了那片白茫茫的雨幕裡。" },

    // =====================================================================
    // 🎬 深夜：二樓浴室外走廊（一牆之隔的酷刑）
    // =====================================================================
    { type: "sfx", src: "assets/audio/sfx/室內雨聲環境音.mp3", loop: true },
    { type: "bg", src: "assets/img/bg/深夜，二樓浴室外走廊 .png", fade: true, bgm: "assets/audio/bgm/夜晚獨自一人BGM.mp3", location: "深夜，二樓浴室外走廊" },
    { type: "dialogue", name: "旁白", text: "然後，問題來了。淋成落湯雞的所有人都急著洗澡，而二樓這間浴室，偏偏只有一套熱水系統，得排隊。" },
    { type: "dialogue", name: "旁白", text: "我抱著換洗的睡衣站在走廊上，等著前一位使用者出來。窗外雷雨未歇，走廊的燈光昏昏黃黃。" },
    { type: "sfx", src: "assets/audio/sfx/洗澡（音效有點長，請保證會適時暫停）.mp3" },
    { type: "dialogue", name: "旁白", text: "然後我聽見了——浴室裡傳來的、嘩啦啦的水聲。以及，一個無比熟悉的、低沉的、正在隨意哼著歌的嗓音。" },
    { type: "dialogue", name: "雨果", text: "（……是學長。學長，正在裡面，洗澡。）", avatar: "assets/img/cha/雨果_頭像_便服_緊張.png" },
    { type: "dialogue", name: "旁白", text: "一牆之隔。水聲。哼歌聲。氤氳的熱氣正從門縫裡絲絲縷縷地飄出來，纏上我的呼吸。" },
    { type: "dialogue", name: "旁白", text: "我的大腦「啪」地一聲，燒斷了保險絲。孢子在這密閉而濕熱的走廊裡活性衝上巔峰——我的呼吸，開始不受控制地越來越急、越來越亂……" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：水聲＋熱氣＋一牆之隔！宿主瀕臨過度換氣！</b><br><br><b>🎮 呼吸同步</b><br>唯一的自救方法：跟上正確的呼吸節奏！<br><br><b>玩法（限時 14 秒）：</b><br>畫面中央有一圈虛線<b>「引導環」</b>在規律脹縮。<br><b>按住</b>畫面讓白圈變大（吸氣）、<b>放開</b>讓它變小（吐氣）——把白圈<b>貼合</b>引導環（可用空白鍵），撐住換氣值別爆表！</div>" },

    // ------------------------------------------------------------------
    // 🎮 共用小遊戲 1：呼吸同步 (Breath Sync)
    // ------------------------------------------------------------------
    {
        type: "breath_sync_qte",
        time: 14.0,
        period: 4.2,
        startVal: 35,
        wrongRate: 15,
        rightRate: 9,
        tolerance: 0.15,
        whispers: [
            "門後的水聲……",
            "他在哼歌……",
            "熱氣好燙……",
            "只隔著一扇門……",
            "不要想不要想不要想……"
        ]
    },

    // ------------------------------------------------------------------
    { type: "dialogue", name: "旁白", text: "吸氣——吐氣——吸氣——吐氣——我閉著眼睛，數著自己的呼吸，總算在理智斷線的前一刻，把自己從失控邊緣拉了回來。" },
    { type: "sfx", src: "assets/audio/sfx/開門聲.mp3" },
    { type: "dialogue", name: "旁白", text: "浴室的門，恰好在這時打開了。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_普通.png" },
    { type: "dialogue", name: "旁白", text: "盧卡斯擦著濕髮走出來，渾身還帶著沐浴後的熱氣與皂香。沒戴眼鏡的紅棕色眼眸，一眼就捕捉到了縮在走廊角落、臉紅得像煮熟蝦子的我。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "雨果？你怎麼靠著牆站？臉這麼紅……是不是淋了雨，不舒服？", voice: "assets/audio/voice/盧卡斯_擔心.wav" },
    { type: "dialogue", name: "雨果", text: "沒、沒有！我只是……在做睡前的深呼吸冥想！很流行的！輪到我了吧，那我先進去了！", avatar: "assets/img/cha/雨果_頭像_便服_羞憤交加.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "hide_char" },
    { type: "sfx", src: "assets/audio/sfx/甩門.mp3" },
    { type: "dialogue", name: "旁白", text: "我抱著衣服，像逃命一樣竄進浴室，「砰」地關上門，背靠著門板大口喘氣。門板上，還殘留著蒸氣的餘溫。" },
    { type: "dialogue", name: "雨果", text: "（撐住……洗個冷水澡，回房間鎖上門，今天就平安結束了……）", avatar: "assets/img/cha/雨果_頭像_便服_忍耐.png" },
    { type: "dialogue", name: "旁白", text: "我天真地，這麼以為著。" },

    // =====================================================================
    // 🎬 深夜：雨果的房間（敲門聲與被窩裡的距離）
    // =====================================================================
    { type: "bg", src: "assets/img/bg/深夜，豪華森林別墅酒店的房間。（雨果的房間）.png", fade: true, bgm: "assets/audio/bgm/盧卡斯夜訪BGM.mp3", location: "深夜，雨果的房間" },
    { type: "dialogue", name: "旁白", text: "洗完澡，我換上睡衣鑽進被窩，把自己裹得嚴嚴實實。床頭的小夜燈散著昏黃的光，窗外的雷雨還沒停，閃電不時把窗簾照得慘白。" },
    { type: "dialogue", name: "旁白", text: "就在我的意識即將沉入夢鄉的邊緣——" },
    { type: "sfx", src: "assets/audio/sfx/敲門.mp3" },
    { type: "dialogue", name: "旁白", text: "篤、篤、篤。房門，被人輕輕地敲響了。" },
    { type: "dialogue", name: "雨果", text: "（……這種時間？）", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png" },
    { type: "sfx", src: "assets/audio/sfx/開門聲.mp3" },
    { type: "dialogue", name: "旁白", text: "我心裡一驚，披衣起身開門。門外站著的，竟然是盧卡斯。他抱著自己的枕頭，穿著睡衣，額前的碎髮還沒全乾。" },
    { type: "dialogue", name: "旁白", text: "而那雙紅棕色的眼睛，在走廊的陰影裡，顯得有些罕見的……侷促。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "雨果……抱歉，這麼晚打擾你。那個……可能是被蜜拉思老師的鬼故事影響了，加上這場雷雨……", voice: "assets/audio/voice/盧卡斯_困擾.wav" },
    { type: "dialogue", name: "盧卡斯", text: "我一個人在房間裡，總覺得有點睡不著。" },
    { type: "dialogue", name: "旁白", text: "他罕見地、有些窘迫地頓了頓。我甚至看見，他的耳根，微微地泛起了紅。" },
    { type: "dialogue", name: "盧卡斯", text: "今晚……我能不能，跟你擠一擠？", voice: "assets/audio/voice/盧卡斯_尷尬.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "雨果", text: "（——！！！）", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png" },
    { type: "dialogue", name: "旁白", text: "我的大腦瞬間宕機。被鬼故事嚇到的盧卡斯。雷雨夜。擠一張床。這一連串的關鍵詞砸下來，幾乎要把我當場炸成灰燼。" },
    { type: "dialogue", name: "雨果", text: "（理智：這是死亡邀約！絕對不行！立刻拒絕！）", avatar: "assets/img/cha/雨果_頭像_睡衣_忍耐.png" },
    { type: "dialogue", name: "旁白", text: "可是——看著他抱著枕頭站在門口、像一隻淋了雨的大型犬一樣的模樣，我那句準備好的拒絕，怎麼樣都說不出口。" },
    { type: "dialogue", name: "雨果", text: "（……完了。我果然，還是無法拒絕他。）", avatar: "assets/img/cha/雨果_頭像_睡衣_絕望.png" },
    { type: "dialogue", name: "雨果", text: "……進、進來吧。床有點小，學長你睡裡面。", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "旁白", text: "於是，這個雷雨交加的夜晚，我和盧卡斯蓋著同一條被子，並肩躺在了同一張狹窄的床上。" },
    { type: "dialogue", name: "旁白", text: "「晚安，雨果。」他說。然後不到十分鐘，他的呼吸就漸漸變得綿長而均勻——這個人，居然真的就這樣安心地睡著了。" },
    { type: "dialogue", name: "雨果", text: "（睡著了？！在我旁邊？！學長你的警戒心呢？！我可是一顆隨時會爆炸的孢子炸彈啊？！）", avatar: "assets/img/cha/雨果_頭像_睡衣_羞憤交加.png" },

    // --- 鏡頭演出：切入學長睡顏 CG，壓暗 + 緩慢推鏡 ---
    { type: "bg", src: "assets/img/CG/盧卡斯睡覺_閉眼.png", fade: true },
    { type: "add_class", target: "#vn-screen", className: "cam-dim" },
    { type: "dialogue", name: "旁白", text: "而我，睜著眼睛，僵硬得像一具石化的木乃伊。就在這時，他似乎是睡熟了，無意識地朝我這邊翻了個身——" },
    { type: "dialogue", name: "旁白", text: "一張近在咫尺的、毫無防備的睡顏，就這樣猝不及防地，撞進了我的眼底。" },
    { type: "add_class", target: "#vn-screen", className: "cam-zoom-slow" },
    { type: "dialogue", name: "旁白", text: "小夜燈昏黃的光，落在他長長的睫毛上。挺直的鼻樑。呼吸間微微起伏的胸口。還有那片在睡夢中放鬆下來的、柔軟的唇。" },
    { type: "dialogue", name: "雨果", text: "（太近了……這個距離……太犯規了……）", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png" },
    { type: "dialogue", name: "旁白", text: "孢子在這一刻發出了它有史以來最瘋狂、最不容抗拒的尖叫。一個念頭，像藤蔓一樣纏上我的整個大腦，越收越緊——" },
    { type: "dialogue", name: "雨果", text: "（好想……好想吻上去。就一下。只要一下就好……）", avatar: "assets/img/cha/雨果_頭像_睡衣_羞憤交加.png" },

    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 系統警告：理智大壩全面潰堤！</b><br>宿主正試圖做出無法挽回的越界行為！<br><br><b>🎮 忍住——不可以吻下去！</b><br>孢子的引力，正讓你的臉一寸一寸靠近學長的睡顏。<b>鏡頭越拉越近，距離越縮越短……</b><br><br><b>玩法（限時 12 秒）：</b><br>瘋狂點擊<b>畫面兩側空白處</b>向後撤！<br><b style='color:#ff5c8a;'>但千萬別點到正中央那片嘴唇</b>——一戳就前功盡棄！而且你的意志力，會隨著每次點擊而衰減……</div>" },

    // ------------------------------------------------------------------
    // 🎮 共用小遊戲 2：忍住不要吻下去 (Resist Kiss・鏡頭連動＋嘴唇反饋)
    // ------------------------------------------------------------------
    {
        type: "resist_kiss_qte",
        time: 12.0,
        cg: "assets/img/CG/盧卡斯睡覺_閉眼.png",
        drainBase: 7,
        drainGrow: 0.6,
        tapPower: 7.5,
        tapDecay: 0.94,
        tapMin: 2.6,
        lipsRadius: 0.14,
        lipsPenalty: 16,
        whispers: [
            "就一下……",
            "他睡著了……不會發現的……",
            "睫毛好長……",
            "只要低下頭就……",
            "不行！我不能……！"
        ]
    },

    // ------------------------------------------------------------------
    // --- 吻（鏡頭演出：閉眼→睜眼 CG 交叉淡入 → 心跳閃爍 →「雨果。」→ 閉眼(黑)→ 陷入黑暗）---
    { type: "dialogue", name: "旁白", text: "……守住了。我用盡全身最後一絲意志力，在嘴唇即將相觸的前一毫米，硬生生地把自己拽了回來。" },
    { type: "dialogue", name: "旁白", text: "心臟在胸腔裡擂鼓。我大口喘著氣，慶幸自己守住了最後的底線，慢慢地、慢慢地抬起眼——" },
    { type: "sfx", src: "assets/audio/sfx/心跳聲.mp3" },
    { type: "bg", src: "assets/img/CG/盧卡斯睡覺_睜眼.png", fade: true },
    { type: "add_class", target: "#vn-screen", className: "heartbeat-flash" },
    { type: "dialogue", name: "雨果", text: "（——！！！）", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png" },
    { type: "remove_class", target: "#vn-screen", className: "heartbeat-flash" },
    { type: "dialogue", name: "旁白", text: "一雙早已睜開的、清醒的、紅棕色的眼睛，正靜靜地，望著我。" },
    { type: "dialogue", name: "雨果", text: "（學、學長他——什麼時候醒的？！看到了多少？！從哪裡開始看的？！）", avatar: "assets/img/cha/雨果_頭像_睡衣_羞憤交加.png" },
    { type: "dialogue", name: "旁白", text: "他就這樣看著我。看著我近在咫尺的、滿臉通紅的、寫滿了驚慌與渴望的臉。" },
    { type: "dialogue", name: "旁白", text: "沒有責備，沒有錯愕——只有一種我從未見過的、深沉而灼熱的東西，正在那片紅棕色裡緩緩地燃燒起來。" },
    { type: "dialogue", name: "盧卡斯", text: "雨果。", voice: "assets/audio/voice/盧卡斯_輕笑.wav" },
    { type: "dialogue", name: "旁白", text: "他低低地、沙啞地，喚了我的名字。然後，在我來不及做出任何反應之前——他抬起手，輕輕扣住我的後頸。" },
    // 閉眼 → 黑（取代原本的柔白閃光）
    { type: "sfx", src: "assets/audio/sfx/親吻.mp3" },
    { type: "remove_class", target: "#vn-screen", className: "cam-dim" },
    { type: "add_class", target: "#vn-screen", className: "blink-close" },
    { type: "dialogue", name: "旁白", text: "我閉上了眼睛。他俯身，吻了上來。" },
    { type: "remove_class", target: "#vn-screen", className: "cam-zoom-slow" },
    { type: "bg", src: "", fade: true },
    { type: "remove_class", target: "#vn-screen", className: "blink-close" },
    { type: "sfx", src: "assets/audio/sfx/深吻長音效.mp3" },
    { type: "dialogue", name: "旁白", text: "那個吻，起初很輕。像一片羽毛落在水面，像一次小心翼翼的試探。" },
    { type: "dialogue", name: "旁白", text: "可當我因為震驚而微微張口的瞬間，它便毫無預兆地，被一點、一點地加深了。" },
    { type: "dialogue", name: "旁白", text: "我的大腦一片空白。所有的理智、所有的偽裝、所有這幾天拼死壓抑的渴望，都在這個溫柔而霸道的吻裡，土崩瓦解。" },
    { type: "dialogue", name: "旁白", text: "黑暗中，我甚至能感覺到——他和我一樣，呼吸早已亂了套。扣著我後頸的那隻手的指尖，微微地，在發顫。" },
    { type: "dialogue", name: "旁白", text: "就在這個吻越來越深、體溫越來越燙、眼看就要徹底越過那條線的時候——" },

    // --- 打斷：西爾維亞的群組訊息 ---
    { type: "sfx", src: "assets/audio/sfx/(SFX：劇烈的手機震動聲！）.wav", stopBgm: true },
    { type: "dialogue", name: "旁白", text: "突如其來的震動聲像警鈴一樣在寂靜的房間裡炸開。我們兩個人同時觸電般地彈開，盧卡斯慌亂地退到了床邊，連呼吸都在發抖。" },
    { type: "dialogue", name: "雨果", text: "（怎、怎麼回事？！誰這個時候傳訊息來？！）", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
    { type: "dialogue", name: "旁白", text: "我手忙腳亂地從枕頭底下摸出手機，點開螢幕。" },
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_separator", text: "深夜 23:47", targetChat: "group" },
    { type: "chat_msg", sender: "西爾維亞", avatar: "assets/img/chat_img/聊天頭像_西爾維亞.png", text: "路況回報。橋體經大雨沖刷，結構不穩，明日無法通行。需先行加固，回程延後一天。各位早點休息。", targetChat: "group" },
    { type: "chat_tutorial", text: "【系統提示】<br>兩支手機同時瘋狂震動。<br>請點擊進入「生物社群組」。" },
    { type: "wait_for_chat", chatId: "group" },
    { type: "delay", time: 1.5 },
    { type: "chat_msg", sender: "蜜拉思", avatar: "assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png", text: "Oops，多住一天！我的孢子觀測數據有救了😎", targetChat: "group" },
    { type: "delay", time: 1.0 },

    // --- 冷卻與收尾 ---
    { type: "transition", to: "VN", fade: true },
    { type: "remove_class", target: "#vn-screen", className: "cam-dim" },
    { type: "remove_class", target: "#vn-screen", className: "blink-close" },
    { type: "bg", src: "assets/img/bg/深夜，豪華森林別墅酒店的房間。（雨果的房間）.png", fade: true, bgm: "assets/audio/bgm/夜晚時間.mp3", stopSfx: true },
    { type: "dialogue", name: "旁白", text: "床頭櫃上，兩支手機的震動聲，像一盆冰水，把我們同時從那片灼熱的暈眩中，澆醒了。" },
    { type: "dialogue", name: "旁白", text: "我們倉皇地分開。黑暗裡，只剩下兩個人交錯的、還沒平復下來的呼吸聲。誰都不敢看誰。" },
    { type: "dialogue", name: "雨果", text: "（橋、橋斷了……回程延後……所以剛才那個是……我們剛才是——）", avatar: "assets/img/cha/雨果_頭像_睡衣_羞憤交加.png" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_睡衣_羞愧.png" },
    { type: "dialogue", name: "旁白", text: "良久，盧卡斯先開了口。他的聲音還有些沙啞，別開的視線落在窗簾上，耳根紅得幾乎要滴血。" },
    { type: "dialogue", name: "盧卡斯", text: "……我知道了。橋的事。那個……雨果，抱歉。今天，是我失態了。", voice: "assets/audio/voice/盧卡斯_尷尬.wav" },
    { type: "dialogue", name: "盧卡斯", text: "我……我還是，回自己房間睡吧。" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "他幾乎是逃也似地，抱起自己的枕頭，匆匆離開了我的房間。門「喀噠」一聲輕輕合上，把整個世界的聲音都關在了外面。" },
    { type: "dialogue", name: "旁白", text: "留下我一個人，怔怔地坐在床上。指尖無意識地，撫上自己還殘留著他溫度的唇。" },
    { type: "dialogue", name: "雨果", text: "（剛剛那個……不是妄想。不是孢子的幻覺。是真的……）", avatar: "assets/img/cha/雨果_頭像_睡衣_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "窗外，雷聲漸漸遠了，只剩下雨點敲打玻璃的、細細密密的聲音。" },
    { type: "dialogue", name: "旁白", text: "而我的世界，在這個夜晚，被那個吻，徹底地掀翻了。這一夜，註定無眠。" },

    {
        type: "fade_text",
        text: "<span class='fade-line-1'>Day 6 存活確認。</span><br><br><span class='fade-line-2'>……不，或許該說：理智，已正式宣告陣亡。剩餘：15%</span>"
    },
    { type: "delay", time: 8, stopBgm: true },
    { type: "end_day", day: 6 }
];
