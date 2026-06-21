const Day1Script = [
    // 🎬 【開場：純黑畫面，伴隨沉重的鍵盤敲擊聲】
    {
        type: "bg",
        src: "", // Black bg
        bgm: "assets/audio/bgm/day1開場.mp3"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "我叫雨果，高二 A 班。",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day1_語音/001我叫雨果，高二 A 班。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "我喜歡安靜，喜歡規律，喜歡把自己藏在厚重的黑框眼鏡和瀏海後面。",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day1_語音/002我喜歡安靜，喜歡規律，喜歡把自己藏在厚重的黑框眼鏡和瀏海後面。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "我的人生信條是『不惹麻煩、不引人注目、絕對服從道德底線』。",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/day1_語音/003我的人生信條是『不惹麻煩、不引人注目、絕對服從道德底線』。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "但很不幸地，我有一個秘密。",
        avatar: "assets/img/cha/雨果_頭像_緊張.png",
        voice: "assets/audio/voice/day1_語音/004但很不幸地，我有一個秘密。.wav"
    },
    {
        type: "bg",
        src: "assets/img/CG/畫面浮現一張照片：陽光下，穿著白襯衫的盧卡斯正推著半框眼鏡微笑。照片邊緣微微泛著曖昧的紅暈。.png"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "盧卡斯學長。三年級，生物社副社長。溫柔、正經、完美無缺。",
        avatar: "assets/img/cha/雨果_頭像_忍耐.png",
        voice: "assets/audio/voice/day1_語音/005盧卡斯學長。三年級，生物社副社長。溫柔、正經、完美無缺。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "因為過高的道德感，我把這份骯髒的妄想鎖在大腦最深處。",
        avatar: "assets/img/cha/雨果_頭像_忍耐.png",
        voice: "assets/audio/voice/day1_語音/006因為道德感，我把這份骯髒的妄想鎖在大腦最深處。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "只要我不說、不表現出來，在現實中維持面癱，這份感情就會安靜地跟著我畢業。",
        avatar: "assets/img/cha/雨果_頭像_忍耐.png",
        voice: "assets/audio/voice/day1_語音/007只要我不說、不表現出來，在現實中維持面癱，這份感情就會安靜地跟著我畢業。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "我是這麼深信著……直到今天下午的社團活動。",
        avatar: "assets/img/cha/雨果_頭像_絕望.png",
        voice: "assets/audio/voice/day1_語音/008我是這麼深信的……直到今天下午的社團活動。.wav"
    },

    // 🎬 【場景一：放學後的生物社辦公室】
    {
        type: "bg",
        src: "assets/img/bg/社團教室_白天.png",
        bgm: "assets/audio/bgm/日常BGM.mp3",
        location: "放學後，生物社辦公室"
    },
    {
        type: "char",
        name: "艾薇",
        src: "assets/img/cha/艾薇_立繪_普通.png"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "雨果，請接住這個培養皿。根據重力加速度計算，它將在 1.5 秒後從桌邊滑落。",
        voice: "assets/audio/voice/day1_語音/009雨果，請接住這個培養皿。根據重力加速度計算，它將在 1.5 秒後從桌邊滑落。.wav"
    },
    {
        type: "sfx",
        src: "assets/audio/sfx/玻璃滑動聲.mp3"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "等——！",
        avatar: "assets/img/cha/雨果_頭像_緊張.png",
        voice: "assets/audio/voice/day1_語音/010等——！.wav"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我一個箭步衝向桌邊，總算穩穩接住那個散發詭異紫光的培養皿。但就在接住的那一瞬間，培養皿的蓋子竟然微微彈開了一條縫。"
    },
    {
        type: "sfx",
        src: "assets/audio/sfx/『噗哧』聲.mp3",
        stopBgm: true
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "咳、咳咳……這是什麼？",
        avatar: "assets/img/cha/雨果_頭像_絕望.png",
        voice: "assets/audio/voice/day1_語音/011咳、咳咳……這是什麼？.wav"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我扶了下差點滑落的黑框眼鏡。鼻腔裡突然竄入一股奇怪的甜香，緊接著，大腦深處傳來一陣細微的酥麻感。"
    },
    {
        type: "char",
        name: "盧卡斯",
        src: "assets/img/cha/盧卡斯_立繪_擔心.png"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "就在這時，一隻骨節分明、帶著溫度的手，輕輕拍了拍我的背。"
    },
    {
        type: "dialogue",
        name: "盧卡斯",
        text: "沒事吧，雨果？抱歉，我剛才在整理顯微鏡，沒注意到培養皿邊緣沒扣緊。",
        voice: "assets/audio/voice/day1_語音/012沒事吧，雨果？抱歉，我剛才在整理顯微鏡，沒注意到培養皿邊緣沒扣緊。.wav"
    },
    {
        type: "sfx",
        src: "assets/audio/sfx/心跳聲.mp3"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我抬起頭，隔著瀏海正好對上盧卡斯那雙深邃的紅棕色眼睛。平時我絕對能完美地移開視線，但這一次，腦海裡卻不受控制地閃過一個超級清晰的念頭"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "——如果學長的手順著我的背脊一路往下摸，會是什麼感覺？"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "沒、沒事。學長不用道歉。",
        avatar: "assets/img/cha/雨果_頭像_羞憤交加.png",
        voice: "assets/audio/voice/day1_語音/013沒、沒事。學長不用道歉。.wav"
    },
    {
        type: "char",
        name: "艾薇",
        src: "assets/img/cha/艾薇_立繪_說話.png"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "情況不太樂觀。那是『變異吐真孢子』。它不會危害生命，但會麻痺大腦前額葉的抑制神經。簡單來說——",
        voice: "assets/audio/voice/day1_語音/014情況不太樂觀。那是『變異吐真孢子』。它不會危害生命，但會麻痺大腦前額葉的抑制神經。簡單來說——.wav"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "——接下來的一週內，你潛意識裡最強烈、最渴望的事物，將會不受控制地表現在你的肢體動作與表達上。也就是說，如果你現在正處於發情期，你可能會無法克制地向目標對象展現交配意願。",
        voice: "assets/audio/voice/day1_語音/015——接下來的一週內，你潛意識裡最強烈、最渴望的事物，將會不受控制地表現在你的肢體動作與表達上。也就是說，如果你現在正處於發情期，你可能會無法克制地向目標對象展現交配意願。.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "……妳說什麼？！",
        avatar: "assets/img/cha/雨果_頭像_絕望.png",
        voice: "assets/audio/voice/day1_語音/016……妳說什麼？！.wav",
        bgm: "assets/audio/bgm/day1意外後.mp3"
    },
    {
        type: "char",
        name: "西爾維亞",
        src: "assets/img/cha/西爾維亞_立繪_一般.png"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "此時，西爾維亞學姐面無表情地從門外走進來，手裡還輕鬆地提著兩袋 20 公斤重的肥料。"
    },
    {
        type: "dialogue",
        name: "西爾維亞",
        text: "死了嗎。",
        voice: "assets/audio/voice/day1_語音/017死了嗎？.wav"
    },
    {
        type: "char",
        name: "艾薇",
        src: "assets/img/cha/艾薇_立繪_普通.png"
    },
    {
        type: "dialogue",
        name: "艾薇",
        text: "物理上沒有。但社會學層面上，他接下來的一週死亡率高達 99%。",
        voice: "assets/audio/voice/day1_語音/018物理上沒有。但社會學層面上，他接下來的一週死亡率高達 99%。.wav"
    },
    {
        type: "char",
        name: "盧卡斯",
        src: "assets/img/cha/盧卡斯_立繪_擔心.png"
    },
    {
        type: "dialogue",
        name: "盧卡斯",
        text: "需要去保健室嗎？",
        voice: "assets/audio/voice/day1_語音/019需要去保健室嗎？.wav"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "不用……我先回家了！！",
        avatar: "assets/img/cha/雨果_頭像_絕望.png",
        voice: "assets/audio/voice/day1_語音/020不用……我先回家了！！.wav"
    },
    {
        type: "sfx",
        src: "assets/audio/sfx/跑步聲.mp3"
    },
    {
        type: "sfx",
        src: "assets/audio/sfx/甩門.mp3"
    },

    // 📱 【場景二：深夜，雨果的房間】
    {
        type: "bg",
        src: "assets/img/bg/雨果房間_晚上.png",
        bgm: "assets/audio/bgm/day1夜晚.mp3",
        location: "深夜，雨果的房間"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "冷靜下來。只要不見面，只要躲在螢幕後面，孢子就沒辦法控制我的肢體。我只需要像平常一樣回覆訊息就好。",
        avatar: "assets/img/cha/雨果_頭像_平常.png",
        voice: "assets/audio/voice/雨果_困擾.wav"
    },
    { type: "transition", to: "CHAT" },
    { type: "chat_tutorial", text: "【系統提示】<br>請點擊進入「生物社群組」。" },
    { type: "wait_for_chat", chatId: "group" },
    { type: "delay", time: 1.0 },
    {
        type: "sfx",
        src: "assets/audio/sfx/收到訊息.mp3"
    },
    {
        type: "chat_separator",
        targetChat: "group",
        text: "今天 晚上 9:45"
    },
    {
        type: "chat_msg",
        sender: "西爾維亞",
        avatar: "assets/img/chat_img/聊天頭像_西爾維亞.png",
        text: "活著？"
    },
    {
        type: "chat_msg",
        sender: "艾薇",
        avatar: "assets/img/chat_img/聊天頭像_艾薇.png",
        text: "根據孢子代謝模型，雨果目前的理智防線正處於最脆弱的第一階段。"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "好，只要回覆『我很好，謝謝社長關心』就可以了……",
        avatar: "assets/img/cha/雨果_頭像_忍耐.png",
        voice: "assets/audio/voice/雨果_乖巧.wav"
    },

    // 🎮 【新手教學小遊戲：潛意識消除 (Chat 模式)】
    {
        type: "dialogue",
        name: "雨果",
        text: "糟了……我突然控制不了自己的手……！",
        avatar: "assets/img/cha/雨果_頭像_緊張.png",
        voice: "assets/audio/voice/雨果_驚嚇.wav"
    },
    {
        type: "chat_tutorial",
        text: "【系統警告：孢子活性激增！潛意識暴走！】<br>請在倒數 8 秒內，狂按 BACKSPACE 鍵刪除暴走的文字！"
    },
    {
        type: "chat_qte_delete",
        draft: "西爾維亞學姐，盧卡斯學長今天拍我背的時候手好大，他的手指如果掐住我的腰一定……",
        target: "我很好，謝謝社長關心。明天見。",
        time: 10,
        checkpoints: [
            {
                maxLength: 15,
                minLength: 8,
                options: [
                    { text: "辛苦了，我很好。明天見。", correct: true },
                    { text: "真的好帥喔。", correct: false }
                ]
            },
            {
                maxLength: 7,
                minLength: 1,
                options: [
                    { text: "我很好，謝謝社長關心。明天見。", correct: true },
                    { text: "他真的好帥喔。", correct: false }
                ]
            }
        ]
    },
    {
        type: "chat_msg",
        sender: "雨果",
        avatar: "assets/img/chat_img/聊天頭像_雨果.png",
        text: "我很好，謝謝社長關心。明天見。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我癱軟在床上，額頭全是冷汗。差點……差點就直接社會性死亡了……"
    },
    {
        type: "sfx",
        src: "assets/audio/sfx/收到訊息.mp3"
    },
    {
        type: "chat_separator",
        targetChat: "lucas",
        text: "今天 晚上 10:15"
    },
    {
        type: "chat_msg",
        targetChat: "lucas",
        sender: "盧卡斯",
        avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png",
        text: "雨果，還好嗎？今天看你走得匆忙。如果是因為我的疏忽讓你吸入了不舒服的粉末，我真的很抱歉。"
    },
    {
        type: "chat_tutorial",
        text: "【系統提示：收到新私訊！】<br>請點擊左上角的「&lt;」返回聊天列表，並進入盧卡斯的對話框查看。"
    },
    {
        type: "wait_for_chat",
        chatId: "lucas"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "這次是私訊。頭像是一個帶著半框眼鏡的溫和側臉。"
    },
    {
        type: "chat_msg",
        targetChat: "lucas",
        sender: "盧卡斯",
        avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png",
        text: "早點休息，如果明天還是不舒服，可以隨時打給我。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "我看著螢幕上的「隨時打給我」，心臟不受控制地狂跳起來。孢子似乎嗅到了宿主最渴望的氣息，大腦裡的某個開關再次被強行打開。"
    },

    // 🎮 【進階小遊戲：極限潛意識消除 (Chat 模式)】
    {
        type: "dialogue",
        name: "雨果",
        text: "糟了……我突然控制不了自己的手……！",
        avatar: "assets/img/cha/雨果_頭像_緊張.png",
        voice: "assets/audio/voice/雨果_驚嚇.wav"
    },
    {
        type: "chat_tutorial",
        text: "<div class='qte-instruction bounce-in'><h4>【極限潛意識消除】</h4><p>請在時限內快速點擊或按下 <b>Backspace</b> 鍵，消除以下危險發言！</p><div class='danger-box popup-shake' style='animation: popup-shake 0.5s infinite;'>「學長……我現在好熱，閉上眼睛都是你今天低頭看我的樣子……」</div></div>"
    },
    {
        type: "chat_qte_delete",
        draft: "學長……我現在好熱，閉上眼睛都是你今天低頭看我的樣子，你可以現在就打給我嗎，用你那種氣泡音叫我的名字……",
        target: "謝謝學長，我沒事，只是需要睡眠。學長也早點休息。",
        time: 5,
        checkpoints: [
            {
                maxLength: 9,
                minLength: 5,
                options: [
                    { text: "冷氣好像壞了，我先去洗個冷水澡，學長晚安。", correct: true },
                    { text: "你可以現在打給我嗎……", correct: false }
                ]
            },
            {
                maxLength: 4,
                minLength: 1,
                options: [
                    { text: "謝謝學長的關心，我沒事，只是需要睡眠。學長也早點休息。", correct: true },
                    { text: "我好熱……", correct: false }
                ]
            }
        ]
    },
    {
        type: "chat_msg",
        targetChat: "lucas",
        sender: "雨果",
        avatar: "assets/img/chat_img/聊天頭像_雨果.png",
        text: "謝謝學長，我沒事，只是需要睡眠。學長也早點休息。"
    },
    {
        type: "sfx",
        src: "assets/audio/sfx/收到訊息.mp3"
    },
    {
        type: "chat_msg",
        targetChat: "lucas",
        sender: "盧卡斯",
        avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png",
        text: "好，晚安，好夢。"
    },
    {
        type: "dialogue",
        name: "旁白",
        text: "看著那句「好夢」，我把手機扔到床尾，雙手摀住自己已經紅透的臉頰，在床上痛苦地蜷縮成一團蝦米。"
    },
    {
        type: "dialogue",
        name: "雨果",
        text: "還剩六天……我真的能活到下禮拜嗎……",
        avatar: "assets/img/cha/雨果_頭像_絕望.png",
        voice: "assets/audio/voice/雨果_嘆氣.wav",
        stopBgm: true,
    },
    {
        type: "fade_text",
        text: "<span class='fade-line-1'>Day 1 存活確認。</span><br><br><span class='fade-line-2'>理智值剩餘：85%</span>"
    },
    {
        type: "end_day",
        day: 1
    }
];
