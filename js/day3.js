const Day3Script = [
    { type: "bg", src: "assets/img/bg/雨果房間_早上.png", fade: true, bgm: "assets/audio/bgm/day1開場.mp3", location: "清晨，雨果的房間" },
    { type: "dialogue", name: "旁白", text: "早晨的陽光透過窗簾縫隙灑在床上。我頂著一頭微亂的紫髮，眼神毫無生氣地盯著天花板。" },
    { type: "dialogue", name: "雨果", text: "早安，世界……", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "dialogue", name: "旁白", text: "回想起昨天那場驚心動魄的通話，我不禁打了個冷顫。" },
    { type: "dialogue", name: "雨果", text: "昨晚喝了盧卡斯學長放在信箱裡的蜂蜜茶，我久違地獲得了無夢的睡眠。", avatar: "assets/img/cha/雨果_頭像_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "dialogue", name: "雨果", text: "……但這並不代表我忘記了昨天差點社會性死亡的恐懼。", avatar: "assets/img/cha/雨果_頭像_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "旁白", text: "我拉起棉被蓋住半張臉，試圖逃避現實。" },
    { type: "dialogue", name: "雨果", text: "事實上，我昨晚在理智稍稍回籠後，還是把那封訊息發出去了。", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "chat_type", draft: "", targetChat: "melas" },
    // Switch to Chat View with flashback vignette
    { type: "bg", src: "" },
    { type: "transition", to: "CHAT", fade: true },
    { type: "add_class", target: "#chat-screen", className: "flashback-vignette" },

    // Auto populate the message *after* transitioning so it rings and pops up
    { type: "delay", time: 0.5 },
    { type: "chat_separator", text: "昨晚 21:05", targetChat: "melas" },
    { type: "chat_msg", sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "二哥！您放在生物社的孢子植物已經造成了嚴重的生物危害！作為您在學校隨便認的乾弟弟，我要求您立刻回收，並且給我一個合理的解釋！否則我這週都有生命危險！", targetChat: "melas", silent: true },
    { type: "delay", time: 1.0 },
    { type: "chat_separator", text: "昨晚 21:30", targetChat: "melas" },
    { type: "chat_msg", sender: "蜜拉思", avatar: "assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png", text: "😎收到啦三弟！抱歉抱歉，明天中午社辦見！", targetChat: "melas", silent: true },

    { type: "wait_for_chat", chatId: "melas" },

    { type: "delay", time: 1.5 },
    { type: "chat_type", draft: "好的。務必給我一個交代！", targetChat: "melas", requireSend: true },
    { type: "chat_msg", sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "好的。務必給我一個交代！", targetChat: "melas" },
    { type: "delay", time: 1.0 },
    { type: "remove_class", target: "#chat-screen", className: "flashback-vignette" },

    { type: "transition", to: "VN", fade: true },
    { type: "bg", src: "assets/img/bg/雨果房間_早上.png", fade: true },
    { type: "dialogue", name: "旁白", text: "我長長地嘆了一口氣，煩躁地揉了揉眉心。" },
    { type: "dialogue", name: "雨果", text: "只要今天中午看著他把那盆鬼東西搬走，然後這幾天死命躲著盧卡斯學長……", avatar: "assets/img/cha/雨果_頭像_忍耐.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "雨果", text: "我一定能平安活過這週！", avatar: "assets/img/cha/雨果_頭像_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },

    // Scene 2: The Commute
    { type: "bg", src: "assets/img/bg/通往學校的林蔭大道.png", fade: true, location: "清晨，前往學校的林蔭大道" },
    {
        type: "sfx",
        src: "assets/audio/sfx/腳步聲.mp3"
    },
    { type: "dialogue", name: "旁白", text: "早晨的通學路上，我低著頭，努力縮小自己的存在感往前走。突然，身旁傳來熟悉的、毫無起伏的女聲。" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_普通.png" },
    { type: "dialogue", name: "艾薇", text: "早安，雨果。你的步伐頻率比平時快了 12%，體表溫度上升至 37.1 度。綜合判斷，你目前的精神狀態處於『瀕臨崩潰邊緣』。", voice: "assets/audio/voice/艾薇_擔憂.wav" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_說話.png" },
    { type: "dialogue", name: "艾薇", text: "根據我的數據庫，昨晚的蜂蜜茶雖然發揮了 15% 的鎮定作用，但孢子的潛伏期依然活躍。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "被精準地一語道破現狀，我心虛地推了推眼鏡，試圖讓自己的聲音聽起來平靜無波。" },
    { type: "dialogue", name: "雨果", text: "我很好，艾薇。我現在的理智堅若磐石，完全可以專注於學習。", avatar: "assets/img/cha/雨果_頭像_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_普通.png" },
    { type: "dialogue", name: "艾薇", text: "口頭聲明不具備科學效力。身為你的專屬醫療助理，我必須介入進行認知功能檢測。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_說話.png" },
    { type: "dialogue", name: "艾薇", text: "啟動晨間小問答。請拿出你的手機接收測驗。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "hide_char" },

    { type: "dialogue", name: "旁白", text: "艾薇話音剛落，我的大腦突然一陣暈眩。耳邊彷彿又響起了昨晚那通電話裡的低沉嗓音……" },
    { type: "dialogue", name: "雨果", text: "（糟了……只是提到『昨晚』兩個字，學長的聲音就一直在腦袋裡迴盪……）", avatar: "assets/img/cha/雨果_頭像_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },

    // Morning QTE - Academic Bubbles
    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：在人體內，主要負責調節晝夜節律與睡眠的激素『褪黑激素』，是由大腦的哪一個腺體分泌的？", targetChat: "ivy" },
    { type: "chat_tutorial", text: "【系統提示】<br>請點擊進入與「艾薇」的聊天室。" },
    { type: "wait_for_chat", chatId: "ivy" },

    {
        type: "chat_qte_academic",
        targetChat: "ivy",
        time: 12.0,
        glitch: false,
        voice: "assets/audio/voice/day2_語音/電話_02_下午看你被小白黏著的樣子，總覺得你像隻小動物，有點可愛。.wav",
        bubbles: {
            count: 5,
            texts: [
                "學長的聲音……",
                "好溫柔……",
                "好想聽他多說話……",
                "學長……",
                "不要掛電話……"
            ]
        },
        mutangOptions: [
            { text: "選項 A：想跟學長在一起", isCorrect: false },
            { text: "選項 B：學長的床", isCorrect: false },
            { text: "選項 C：學長的懷裡", isCorrect: false }
        ],
        options: [
            { text: "選項 A：腦下垂體", isCorrect: false },
            { text: "選項 B：松果體", isCorrect: true },
            { text: "選項 C：甲狀腺", isCorrect: false }
        ],
        successMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👍" },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "回答正確。看來你的前額葉還在運作。請繼續保持。" }
        ],
        failMsgs: [
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "👎回答錯誤。你的認知功能已受到孢子嚴重干擾，我需要請盧卡斯學長送你去保健室嗎？" },
            { sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "對不起我錯了。請給我重來的機會。", isSelf: true },
            { sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "我重新發送。" },
            { type: "chat_msg", sender: "艾薇", avatar: "assets/img/chat_img/聊天頭像_艾薇.png", text: "提問：在人體內，主要負責調節晝夜節律與睡眠的激素『褪黑激素』，是由大腦的哪一個腺體分泌的？", targetChat: "ivy" },

        ]
    },
    { type: "transition", to: "VN", fade: true },
    { type: "bg", src: "assets/img/bg/通往學校的林蔭大道.png", fade: true },
    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_普通.png" },
    { type: "dialogue", name: "艾薇", text: "看來我的朋友還是很正常，我感到很高興。希望你繼續保持。", voice: "assets/audio/voice/艾薇_認同.wav" },
    { type: "dialogue", name: "雨果", text: "我也是。我們還是趕快去上課吧。", avatar: "assets/img/cha/雨果_頭像_平常.png", voice: "assets/audio/voice/雨果_乖巧.wav" },
    { type: "hide_char" },
    {
        type: "sfx",
        src: "assets/audio/sfx/腳步聲.mp3"
    },
    { type: "delay", time: 0.5 },
    // Chemistry class bridge

    { type: "bg", src: "assets/img/bg/二年級教室.png", fade: true, bgm: "assets/audio/bgm/day2艾薇的測試.mp3", location: "上午，二年級教室" },
    { type: "dialogue", name: "旁白", text: "上午第三節，化學課。" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_微笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "……好的同學們！所以當我們把這兩種溶液混合，就會產生非常美麗的放熱反應！大家看這個顏色是不是很像夏天的夕陽？", voice: "assets/audio/voice/day3_語音/040好的同學們！所以當我們把這兩種溶液混合，就會產生非常美麗的放熱反應！大家看這個顏色是不是很像夏天的夕陽？.wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "講台上的蜜拉思老師正興高采烈地展示著燒杯裡冒泡的橘紅色液體，而我坐在座位上，表面看似在認真做筆記，實際上滿腦子都是剛才艾薇的小測驗，以及腦袋裡揮之不去的電話語音殘響。" },
    { type: "dialogue", name: "雨果", text: "（可惡……只是聽到聲音而已，為什麼身體會這麼燥熱……這孢子的後遺症也太強了吧……）", avatar: "assets/img/cha/雨果_頭像_忍耐.png", voice: "assets/audio/voice/day3_語音/041（可惡……只是聽到聲音而已，為什麼身體會這麼燥熱……這孢子的後遺症也太強了吧……）.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_唔？.png" },
    { type: "dialogue", name: "蜜拉思", text: "咦？雨果同學，你的臉有點紅喔？是不是我這杯『夕陽之戀』的熱量傳遞到你那邊了？還是教室太悶了？", voice: "assets/audio/voice/day3_語音/042咦？雨果同學，你的臉有點紅喔？是不是我這杯『夕陽之戀』的熱量傳遞到你那邊了？還是教室太悶了？.wav" },
    { type: "dialogue", name: "雨果", text: "我沒事！謝謝老師關心！請繼續上課！", avatar: "assets/img/cha/雨果_頭像_緊張.png", voice: "assets/audio/voice/day3_語音/043我沒事！謝謝老師關心！請繼續上課！.wav" },
    { type: "dialogue", name: "旁白", text: "全班同學紛紛轉頭看我，我恨不得把頭埋進抽屜裡。好不容易熬到了下課鐘響，我立刻從座位上彈了起來，衝向講台。" },

    // Scene 3: Noon at the Biology Club
    {
        type: "sfx",
        src: "assets/audio/sfx/跑步聲.mp3"
    },
    {
        type: "bg", src: "assets/img/bg/社團教室_白天.png", fade: true
    },
    {
        type: "sfx",
        src: "assets/audio/sfx/關門聲2.mp3"
    },
    { type: "dialogue", name: "旁白", text: "我將剛下課、還拿著教材的化學老師蜜拉思，連拖帶拽地請到了生物教室。" },

    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_微笑.png" },
    { type: "dialogue", name: "旁白", text: "那盆散發著微弱紫光的奇怪植物，正大剌剌地放置在講台上。" },
    { type: "dialogue", name: "雨果", text: "老師，請。立刻。把它。帶走。您知不知道這東西昨天害我差點對著學長——", avatar: "assets/img/cha/雨果_頭像_羞憤交加.png", voice: "assets/audio/voice/day3_語音/044老師，請。立刻。把它。帶走。您知不知道這東西昨天害我差點對著學長——.wav" },
    { type: "dialogue", name: "旁白", text: "意識到自己差點脫口而出昨晚的窘境，我猛地閉上嘴，臉頰泛起一陣可疑的紅暈。" },

    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_唔？.png" },
    { type: "dialogue", name: "蜜拉思", text: "哎呀，別生氣嘛三弟！我真的不是故意的！", voice: "assets/audio/voice/day3_語音/045哎呀，別生氣嘛三弟！我真的不是故意的！.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_困擾.png" },
    { type: "dialogue", name: "蜜拉思", text: "化學大樓的溫室空調壞了，我這批用來提煉『新型溫和安神劑』的植物需要自然光，才拜託西爾維亞借放一下。我發誓，這絕對是正規實驗！", voice: "assets/audio/voice/day3_語音/046化學大樓的溫室空調壞了，我這批用來提煉『新型溫和安神劑』的植物需要自然光，才拜託西爾維亞借放一下。我發誓，這絕對是正規實驗！.wav" },
    { type: "dialogue", name: "旁白", text: "蜜拉思走上前，語氣誠懇但帶著一絲無奈，輕輕戳了戳那盆孢子植物的葉片。" },

    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_微笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "不過放心啦三弟！根據我的計算，你昨天吸入的微量氣體，效果最多只會維持一週。", voice: "assets/audio/voice/day3_語音/047不過放心啦三弟！根據我的計算，你昨天吸入的微量氣體，效果最多只會維持一週。.wav" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_開心.png", action: "jump" },
    { type: "dialogue", name: "蜜拉思", text: "它只是會讓人比較『誠實』，對身體絕對無害！如果真的那麼害怕暴露……這週和學長保持一下距離也不難啦！", voice: "assets/audio/voice/day3_語音/048它只是會讓人比較『誠實』，對身體絕對無害！如果真的那麼害怕暴露……這週和學長保持一下距離也不難啦！.wav" },

    { type: "dialogue", name: "旁白", text: "看著老師那張『沒什麼大不了』的笑臉，我的右手在口袋裡死死捏緊。" },
    { type: "dialogue", name: "雨果", text: "……好想比一個義大利不友善手勢。真的很想比！", avatar: "assets/img/cha/雨果_頭像_忍耐.png", voice: "assets/audio/voice/day3_語音/049……好想比一個義大利不友善手勢。真的很想比！.wav" },
    { type: "dialogue", name: "雨果", text: "你說得倒輕鬆，這可是關乎我社會性死亡的尊嚴問題啊！", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/day3_語音/050你說得倒輕鬆，這可是關乎我社會性死亡的尊嚴問題啊！.wav" },
    {
        type: "sfx",
        src: "assets/audio/sfx/開門聲.mp3",
        stopBgm: true
    },
    { type: "dialogue", name: "旁白", text: "突然，一聲巨響打斷了我的抗議，生物社的門被猛力推開。", stopBgm: true, },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_一般.png" },
    {
        type: "sfx",
        src: "assets/audio/sfx/腳步聲.mp3"
    },
    { type: "dialogue", name: "旁白", text: "西爾維亞面無表情地走了進來，手裡拿著一張蓋了校長印章的公文。盧卡斯和艾薇緊隨其後。" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_說話.png" },
    { type: "dialogue", name: "西爾維亞", text: "學校批准。明天出發。生物社『暑期高山生態合宿』。三天兩夜。", voice: "assets/audio/voice/day3_語音/051學校批准。明天出發。生物社『暑期高山生態合宿』。三天兩夜。.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "對，我們申請通過了。", voice: "assets/audio/voice/day3_語音/052對，我們申請通過了。.wav", bgm: "assets/audio/bgm/day1意外後.mp3" },
    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_說話.png" },
    { type: "dialogue", name: "西爾維亞", text: "我女朋友有空的話也會來。", voice: "assets/audio/voice/day3_語音/053我女朋友有空的話也會來。.wav" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "……", voice: "assets/audio/voice/day3_語音/054…….wav" },
    { type: "hide_char" },
    { type: "dialogue", name: "旁白", text: "宛如晴天霹靂，我瞬間石化，瞳孔失去了焦距。" },
    { type: "dialogue", name: "雨果", text: "……明、明天？三天兩夜？！可是，學校規定的校外合宿，不是必須要有指導老師隨行嗎？", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/day3_語音/055……明、明天？三天兩夜？！可是，學校規定的校外合宿，不是必須要有指導老師隨行嗎？.wav" },

    { type: "show_char", name: "艾薇", src: "assets/img/cha/艾薇_立繪_普通.png" },
    { type: "dialogue", name: "艾薇", text: "對。根據教務處紀錄，本校原生物社指導老師，前幾天在進行野外考察時迷失在森林裡了。目前搜救隊仍未尋獲他的蹤跡。", voice: "assets/audio/voice/day3_語音/056對。根據教務處紀錄，本校原生物社指導老師，前幾天在進行野外考察時迷失在森林裡了。目前搜救隊仍未尋獲他的蹤跡。.wav" },

    { type: "show_char", name: "西爾維亞", src: "assets/img/cha/西爾維亞_立繪_一般.png" },
    { type: "dialogue", name: "西爾維亞", text: "人，沒了。但我們只要找到老師就能合宿。", voice: "assets/audio/voice/day3_語音/056.5人，沒了。但我們只要找到老師就能合宿。.wav" },

    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_開心.png" },
    { type: "dialogue", name: "旁白", text: "聽到這個消息，一直站在角落的蜜拉思眼睛突然一亮，高高地舉起了手。" },
    { type: "dialogue", name: "蜜拉思", text: "Oops！既然這樣，那不如我跟你們一起去吧？", voice: "assets/audio/voice/day3_語音/057Oops！既然這樣，那不如我跟你們一起去吧？.wav", action: "jump" },
    { type: "show_char", name: "蜜拉思", src: "assets/img/cha/蜜拉思_立繪_笑.png" },
    { type: "dialogue", name: "蜜拉思", text: "高山的低氧環境剛好適合我收集其他對比數據。我來當隨隊指導老師，教務處那邊絕對秒過！", voice: "assets/audio/voice/day3_語音/058高山的低氧環境剛好適合我收集其他對比數據。我來當隨隊指導老師，教務處那邊絕對秒過！.wav" },

    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_微笑.png" },
    { type: "dialogue", name: "盧卡斯", text: "如果有蜜拉思老師隨隊，安全問題就有保障了。那就這麼定了吧。大家今天放學後早點回家整理行李。", voice: "assets/audio/voice/day3_語音/059如果有蜜拉思老師隨隊，安全問題就有保障了。那就這麼定了吧。大家今天放學後早點回家整理行李。.wav" },
    { type: "dialogue", name: "旁白", text: "盧卡斯轉頭看向我，敏銳地察覺到了我異常僵硬的肩膀。" },
    { type: "show_char", name: "盧卡斯", src: "assets/img/cha/盧卡斯_立繪_擔心.png" },
    { type: "dialogue", name: "盧卡斯", text: "雨果，你還好嗎？如果不舒服，不要勉強。", voice: "assets/audio/voice/day3_語音/060雨果，你還好嗎？如果不舒服，不要勉強。.wav" },
    { type: "dialogue", name: "旁白", text: "我絕望地看著蜜拉思，再看看盧卡斯，用盡全身力氣搖頭。" },
    { type: "dialogue", name: "雨果", text: "我……沒事。我回家收行李。", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/day3_語音/061我……沒事。我回家收行李。.wav" },
    { type: "dialogue", name: "旁白", text: "我說完這句話後，西爾維亞簡單交代了行程和注意事項後，社團課就提早結束了。" },
    // Scene 4: Evening Packing

    { type: "bg", src: "assets/img/bg/雨果房間_晚上.png", fade: true, bgm: "assets/audio/bgm/day1夜晚.mp3", location: "晚上，雨果的房間" },
    { type: "dialogue", name: "旁白", text: "夜晚的房間裡，地板上攤開著一個紫色的行李箱，裡面孤零零地只放了兩件素色 T 恤。" },
    { type: "dialogue", name: "旁白", text: "我焦慮地抓著頭髮，根本無心整理裝備。" },
    { type: "dialogue", name: "雨果", text: "明天就要出發了……這三天兩夜，我該不會要跟學長睡同一個房間吧？", avatar: "assets/img/cha/雨果_頭像_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "雨果", text: "如果我半夜孢子發作，不小心爬到他床上怎麼辦？", avatar: "assets/img/cha/雨果_頭像_羞憤交加.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },

    { type: "transition", to: "CHAT", fade: true },
    { type: "delay", time: 0.5 },
    { type: "chat_separator", text: "今天 19:30", targetChat: "group" },
    { type: "chat_msg", sender: "蜜拉思", avatar: "assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png", text: "各位！既然明天就要合宿了，小木屋是兩間雙人房、一間單人房。為了方便我晚上處理實驗數據，我自願睡單人房！剩下的房間你們自己分喔～", targetChat: "group" },

    { type: "chat_tutorial", text: "【系統提示】<br>請點擊進入「生物社群組」。" },
    { type: "wait_for_chat", chatId: "group" },

    { type: "dialogue", name: "旁白", text: "就在我陷入極度恐慌時，放在床上的手機無情地震動了起來。蜜拉思不知何時已經加入了社團的群組。" },

    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "好的，謝謝老師。那剩下的房間我們怎麼分配？", targetChat: "group" },
    { type: "delay", time: 1.5 },
    { type: "chat_msg", sender: "蜜拉思", avatar: "assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png", text: "為了確保我們親愛的三弟 (雨果) 在高山上不會因為某種『神經燥熱』而發生意外，我強烈建議副社長盧卡斯跟雨果睡同一間！就近照顧！😎", targetChat: "group" },
    { type: "dialogue", name: "雨果", text: "等等！這絕對不行！二哥在發什麼啊！", avatar: "assets/img/cha/雨果_頭像_羞憤交加.png" },
    { type: "dialogue", name: "雨果", text: "這下就算是要刷貼圖，我也要阻止學長看到二哥亂說話！", avatar: "assets/img/cha/雨果_頭像_緊張.png", voice: "assets/audio/voice/雨果_困擾.wav" },
    { type: "dialogue", name: "雨果", text: "……怎麼偏偏這個時候，手又……！", avatar: "assets/img/cha/雨果_頭像_忍耐.png" },
    { type: "chat_tutorial", text: "<div style='text-align:left;'><b>⚠️ 【極限修羅場 - 規則說明】 ⚠️</b><br><br>蜜拉思正在群組瞎起鬨！<br><br><b>操作方式：</b><br>1. 上方聊天區會不斷跳出蜜拉思的危險訊息，請點擊下方的<b style='color:red;'>『🛡️ 攔截訊息』</b>按鈕 (或按<b>空白鍵</b>) 來發送貼圖攔截她！<br>2. 同時，你自己的輸入框也會暴走產生黃色廢料，請點擊下方的<b style='color:#ffaa00;'>『🗑️ 刪除廢料』</b>按鈕 (或狂按<b>Backspace</b>) 刪除它！<br><br><b>勝負條件：</b><br>在 15 秒內維持防線，不能讓輸入框被填滿，也不能讓蜜拉思的訊息存活太久。撐到最後自動發送安全回覆！</div>" },

    {
        type: "chat_qte_defense_pack",
        targetChat: "group",
        time: 20.0,
        draft: "好想睡在學長的懷裡，把學長當成抱枕...聞著學長身上的味道...一定很溫暖...",
        enemyMsgs: [
            "雨果最近很需要『肢體接觸』來降溫喔～",
            "你們睡近一點對他的病情有幫助！",
            "不要客氣嘛，年輕人就是要多交流！",
            "我聽說高山的夜晚特別冷，兩個人擠一擠才暖和！"
        ],
        successReply: "不用了老師，我自己睡一間就好，我睡相不好怕打擾到別人。",
        failReply: {
            sender: "盧卡斯",
            avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png",
            text: "神經燥熱需要肢體接觸？雨果，你真的生病了嗎？明天在車上我幫你檢查一下。",
            ending: true
        }
    },

    { type: "chat_type", draft: "不用了老師，我自己睡一間就好，我睡相不好怕打擾到別人", targetChat: "group", requireSend: true },
    { type: "chat_msg", sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "不用了老師，我自己睡一間就好，我睡相不好怕打擾到別人", targetChat: "group" },

    { type: "chat_msg", sender: "蜜拉思", avatar: "assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png", text: "但我要照顧孢子餒！", targetChat: "group" },
    { type: "chat_msg", sender: "西爾維亞", avatar: "assets/img/chat_img/聊天頭像_西爾維亞.png", text: "你們不介意我就不介意。但老師自己一間的話，你要和我或艾薇睡嗎？", targetChat: "group" },

    { type: "chat_type", draft: "……算了。", targetChat: "group", requireSend: true },
    { type: "chat_msg", sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: "……算了。", targetChat: "group" },
    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "西爾維亞說得對。雨果，行李慢慢收，早點休息。明天見。", targetChat: "group" },

    { type: "transition", to: "VN", fade: true },
    { type: "dialogue", name: "旁白", text: "群組終於安靜了下來。經歷了這場多工處理的修羅場，我精疲力盡。" },
    { type: "dialogue", name: "旁白", text: "我整個人往後仰，呈大字型躺在行李箱旁邊的地板上，胸口劇烈起伏。" },
    { type: "dialogue", name: "旁白", text: "轉過頭，看著鏡子裡自己發紅的耳根，我深深嘆了口氣。" },
    { type: "dialogue", name: "雨果", text: "明天……完了……", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/雨果_嘆氣.wav" },
    { type: "dialogue", name: "旁白", text: "我絕望地閉上了眼睛，彷彿已經看見了社會性死亡的未來。" },

    {
        type: "fade_text",
        text: "<span class='fade-line-1'>Day 3 存活確認。</span><br><br><span class='fade-line-2'>理智值剩餘：45%</span>"
    },
    { type: "delay", time: 8, stopBgm: true, },
    { type: "end_day", day: 3 }
];
