class ChatSystem {
    constructor(engine) {
        this.engine = engine;
        this.chatData = {
            'group': [],
            'lucas': [],
            'ivy': [],
            'melas': [],
            'silvia': []
        };
        this.activeChatId = null;

        // DOM Elements
        this.chatScreen = document.getElementById('chat-screen');
        this.chatListView = document.getElementById('chat-list-view');
        this.chatConversationView = document.getElementById('chat-conversation-view');
        this.chatHistoryList = document.getElementById('chat-list-items');
        this.chatHistory = document.getElementById('chat-history');
        this.chatInputText = document.getElementById('chat-input-text');
        this.chatTitle = document.querySelector('#chat-conversation-view .chat-title');

        // Forum & Nav DOM Elements
        this.forumView = document.getElementById('forum-view');
        this.bottomNav = document.getElementById('lchat-bottom-nav');
        this.navChat = document.getElementById('nav-chat');
        this.navForum = document.getElementById('nav-forum');
        this.forumFeed = document.getElementById('forum-feed');
        // QTE DOM Elements
        this.qteOverlay = document.getElementById('qte-overlay');
        this.qteTimerFill = document.querySelector('.qte-timer-fill');
        this.qteInstruction = document.getElementById('qte-instruction');
        this.qteOptions = document.getElementById('qte-options');
        this.qteBackspaceBtn = document.getElementById('qte-backspace-btn');

        this.chatTimer1 = null;
        this.chatTimer2 = null;
        this.qteInterval = null;
        this.salvageInterval = null;
        this.qtePaused = false;
        this.waitingForSend = false;
        this.pendingSendText = '';

        this.bindEvents();
        this.initializeFakeHistory();
    }

    bindEvents() {
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                backBtn.classList.remove('pulse-highlight');
                this.showChatList();
            });
        }

        const sendBtn = document.getElementById('chat-send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                if (this.waitingForSend) {
                    this.waitingForSend = false;
                    this.chatInputText.textContent = '';
                    sendBtn.classList.remove('pulse-highlight');

                    // Modify the next chat_msg event to match the exact text chosen
                    let offset = 1;
                    let nextEvt = this.engine.currentScript[this.engine.scriptIndex + offset];
                    // Look ahead for the actual chat_msg from Hugo
                    while (nextEvt && nextEvt.type !== 'chat_msg') {
                        offset++;
                        nextEvt = this.engine.currentScript[this.engine.scriptIndex + offset];
                    }
                    if (nextEvt && nextEvt.sender === '雨果') {
                        nextEvt.text = this.pendingSendText;
                    }

                    this.engine.nextEvent();
                }
            });
        }
        if (this.navChat) {
            this.navChat.addEventListener('click', () => {
                this.navChat.classList.add('active');
                const navForum = document.getElementById('nav-forum');
                if (navForum) navForum.classList.remove('active');

                const forumView = document.getElementById('forum-view');
                if (forumView) forumView.classList.remove('active');

                if (!this.activeChatId) {
                    this.chatListView.classList.add('active');
                } else {
                    this.chatConversationView.classList.add('active');
                }
            });
        }
    }

    initializeFakeHistory() {
        // Fake history for Lucas
        this.chatData['lucas'] = [
            { type: 'separator', text: '昨天 下午 4:30' },
            { sender: '盧卡斯', avatar: 'assets/img/chat_img/聊天頭像_盧卡斯.png', text: '雨果，明天社團活動要用的培養皿你準備好了嗎？' },
            { sender: '雨果', avatar: 'assets/img/chat_img/聊天頭像_雨果.png', text: '學長，已經準備好了，放在第三排櫃子裡。' },
            { sender: '盧卡斯', avatar: 'assets/img/chat_img/聊天頭像_盧卡斯.png', text: '好的，辛苦你了。' }
        ];

        // Fake history for Ivy
        this.chatData['ivy'] = [
            { type: 'separator', text: '昨天 晚上 8:15' },
            { sender: '艾薇', avatar: 'assets/img/chat_img/聊天頭像_艾薇.png', text: '雨果，今天小白的飛行高度比平均下降了 15%，且羽毛蓬鬆度增加了。可能是因為氣溫下降。' },
            { sender: '雨果', avatar: 'assets/img/chat_img/聊天頭像_雨果.png', text: '啊，是不是太冷了？要不要幫小白的籠子加個保溫燈？' },
            { sender: '艾薇', avatar: 'assets/img/chat_img/聊天頭像_艾薇.png', text: '已啟動鳥籠保溫燈模組。小白的藍色圓眼睛正注視著光源，目前已恢復正常的棲息姿態。感謝你的建議。' },
            { sender: '雨果', avatar: 'assets/img/chat_img/聊天頭像_雨果.png', text: '太好了，那明天社團時間我再去幫牠清理鳥籠。' },
            { sender: '艾薇', avatar: 'assets/img/chat_img/聊天頭像_艾薇.png', text: '收到。祝你今晚睡眠品質高於平均值。' }
        ];

        // Fake history for Melas
        this.chatData['melas'] = [
            { type: 'separator', text: '前天 下午 2:10' },
            { sender: '蜜拉思', avatar: 'assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png', text: '三弟，你今天在生物社沒出什麼事吧？聽說你們社長又在折騰什麼菌絲了。' },
            { sender: '雨果', avatar: 'assets/img/chat_img/聊天頭像_雨果.png', text: '沒事，二哥。不過學長今天人真的很好……' },
            { sender: '蜜拉思', avatar: 'assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png', text: '呵呵，那就好。對了，奧拉今天又非要拉我去吃那家超難預約的私房法式料理。我都說了想吃學校後街的麻辣燙，他居然問我是不是覺得麻辣燙比他給的飯好吃。簡真莫名其妙。' },
            { sender: '雨果', avatar: 'assets/img/chat_img/聊天頭像_雨果.png', text: '……二哥，你這是在凡爾賽吧？' },
            { sender: '蜜拉思', avatar: 'assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png', text: '哪有，我真的很想吃大排檔啊！不說了，奧拉已經把餐廳包場了，再不去他又要用那種眼神看我了。' },
            { sender: '雨果', avatar: 'assets/img/chat_img/聊天頭像_雨果.png', text: '（友善手勢）' }
        ];

        // Fake history for Silvia
        this.chatData['silvia'] = [
            { type: 'separator', text: '三天前 上午 10:00' },
            { sender: '西爾維亞', avatar: 'assets/img/chat_img/聊天頭像_西爾維亞.png', text: '雨果，下週的社團預算申請表寫好了嗎。' },
            { sender: '雨果', avatar: 'assets/img/chat_img/聊天頭像_雨果.png', text: '寫好了，社長。我已經寄到您的信箱了。' },
            { sender: '西爾維亞', avatar: 'assets/img/chat_img/聊天頭像_西爾維亞.png', text: '收到。下週一交給指導老師蓋章。' },
            { sender: '雨果', avatar: 'assets/img/chat_img/聊天頭像_雨果.png', text: '好的，沒問題。' }
        ];
    }

    reset() {
        clearTimeout(this.chatTimer1);
        clearTimeout(this.chatTimer2);
        clearInterval(this.qteInterval);
        clearInterval(this.salvageInterval);
        if (this.countdownAudio) {
            this.countdownAudio.pause();
            this.countdownAudio = null;
        }
        if (this.qteKeydownHandler) {
            document.removeEventListener('keydown', this.qteKeydownHandler);
            this.qteKeydownHandler = null;
        }
        this.chatHistory.innerHTML = '';
        this.qteOverlay.classList.remove('active');
        this.qteOverlay.classList.remove('spore-glitch');
        this.activeChatId = 'group';
        this.showChatConversation('group', '生物社群組');
    }

    showChatList() {
        this.chatConversationView.classList.remove('active');
        this.chatListView.classList.add('active');

        // Ensure forum is hidden when forcing chat view
        if (this.navForum) this.navForum.classList.remove('active');
        if (this.forumView) {
            this.forumView.classList.remove('active');
            this.forumView.style.display = 'none';
        }
        if (this.navChat) this.navChat.classList.add('active');

        this.activeChatId = null;
        this.renderChatList();
    }

    showChatConversation(chatId, title) {
        const titles = { group: '生物社群組', lucas: '盧卡斯', ivy: '艾薇', silvia: '西爾維亞', melas: '蜜拉思' };
        const finalTitle = (title === false || !title) ? (titles[chatId] || chatId) : title;

        const isAlreadyActive = (this.activeChatId === chatId && this.chatConversationView.classList.contains('active'));

        this.activeChatId = chatId;
        this.chatTitle = document.querySelector('#chat-conversation-view .chat-title');
        if (this.chatTitle) {
            this.chatTitle.textContent = finalTitle;
        }
        this.chatListView.classList.remove('active');
        this.chatConversationView.classList.add('active');

        if (chatId === 'group') this.groupUnread = 0;
        if (chatId === 'lucas') this.lucasUnread = 0;
        if (chatId === 'ivy') this.ivyUnread = 0;

        if (!isAlreadyActive) {
            this.renderHistory(chatId);
        }

        // Hide options from other chats
        document.querySelectorAll('.chat-inline-options').forEach(el => {
            el.style.display = (el.dataset.chatId === chatId) ? 'flex' : 'none';
        });

        // If engine was waiting for this chat, resume
        if (this.engine.waitingForChat === chatId) {
            this.engine.waitingForChat = undefined;
            this.engine.nextEvent();
        }

        this.updateBackBtnState();
    }

    updateBackBtnState() {
        const backBtn = document.querySelector('.back-btn');
        if (!backBtn) return;

        // Only allow back button if we are waiting for chat navigation in a tutorial or scripted sequence
        // OR if the button is currently pulsing to notify the user of a message
        // waitingForChat === null means the engine is explicitly waiting for the user to return to the chat list.
        // waitingForChat === undefined means it's not waiting for anything chat-related.
        const isWaiting = this.engine.waitingForChat !== undefined;
        const allowed = isWaiting || backBtn.classList.contains('pulse-highlight');
        if (allowed) {
            backBtn.classList.remove('disabled');
        } else {
            backBtn.classList.add('disabled');
        }
    }

    renderChatList() {
        this.chatHistoryList.innerHTML = '';

        const renderItem = (id, name, avatar, history = [], unreadCount = 0) => {
            const lastMsgObj = history.slice().reverse().find(msg => msg.type !== 'separator');
            const lastMsg = lastMsgObj ? lastMsgObj.text : '無訊息';

            const itemDiv = document.createElement('div');
            itemDiv.className = 'chat-list-item';
            itemDiv.onclick = () => {
                if (this.engine.currentDay === 1) {
                    if (id !== 'group' && id !== 'lucas') {
                        this.engine.showModal('提示', '現在不是閒聊的時候，請優先回覆重要的對話。');
                        return;
                    }
                    if (id === 'lucas' && (!this.chatData['lucas'] || !this.chatData['lucas'].some(m => m.text && m.text.includes("雨果，還好嗎")))) {
                        this.engine.showModal('提示', '學長現在應該還在忙，晚點再聯絡他吧。');
                        return;
                    }
                }
                if (id === 'lucas') this.lucasUnread = 0;
                if (id === 'ivy') this.ivyUnread = 0;
                if (id === 'melas') this.melasUnread = 0;
                this.showChatConversation(id, name);
            };

            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'chat-list-avatar';
            avatarDiv.style.backgroundImage = `url('${this.engine.resolveAsset(avatar)}')`;

            const infoDiv = document.createElement('div');
            infoDiv.className = 'chat-list-info';

            const nameEl = document.createElement('div');
            nameEl.className = 'chat-list-name';
            nameEl.textContent = name;

            const previewEl = document.createElement('div');
            previewEl.className = 'chat-list-preview';
            previewEl.textContent = lastMsg;

            infoDiv.appendChild(nameEl);
            infoDiv.appendChild(previewEl);

            if (unreadCount > 0) {
                const unreadDot = document.createElement('div');
                unreadDot.className = 'unread-dot';
                unreadDot.textContent = unreadCount;
                itemDiv.appendChild(unreadDot);
            }

            itemDiv.appendChild(avatarDiv);
            itemDiv.appendChild(infoDiv);

            if (unreadCount > 0) {
                const badge = document.createElement('div');
                badge.className = 'chat-unread-badge';
                badge.textContent = unreadCount;
                itemDiv.appendChild(badge);
            }

            this.chatHistoryList.appendChild(itemDiv);
        };

        // Order: group, lucas, ivy, silvia, melas
        renderItem('group', '生物社群組', 'assets/img/chat_img/聊天頭像_生物社.png', this.chatData['group'], this.groupUnread || 0);
        renderItem('lucas', '盧卡斯', 'assets/img/chat_img/聊天頭像_盧卡斯.png', this.chatData['lucas'], this.lucasUnread || 0);
        renderItem('ivy', '艾薇', 'assets/img/chat_img/聊天頭像_艾薇.png', this.chatData['ivy'], this.ivyUnread || 0);
        renderItem('silvia', '西爾維亞', 'assets/img/chat_img/聊天頭像_西爾維亞.png', this.chatData['silvia'], 0);
        renderItem('melas', '蜜拉思', 'assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png', this.chatData['melas'], this.melasUnread || 0);
    }


    renderHistory(chatId) {
        this.chatHistory.innerHTML = '';
        const history = this.chatData[chatId] || [];
        history.forEach(msg => {
            this.appendMessage(msg);
        });
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    appendMessage(msg) {
        if (msg.type === 'separator') {
            this.appendSeparatorDOM(msg.text);
        } else {
            const isSelf = msg.sender === '雨果';
            let avatar = msg.avatar;
            if (!avatar) {
                if (isSelf) avatar = 'assets/img/chat_img/聊天頭像_雨果.png';
                else if (msg.sender === '系統') avatar = 'assets/img/chat_img/聊天頭像_生物社.png'; // Fallback
                else avatar = 'assets/img/chat_img/聊天頭像_生物社.png';
            }
            this.appendMessageDOM(msg.sender, avatar, msg.text, isSelf);
        }
    }

    appendSeparatorDOM(text) {
        const sepDiv = document.createElement('div');
        sepDiv.className = 'chat-separator';
        sepDiv.textContent = text;
        this.chatHistory.appendChild(sepDiv);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    appendMessageDOM(name, avatar, text, isSelf) {
        avatar = this.engine.resolveAsset(avatar);
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${isSelf ? 'self' : 'other'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'msg-avatar';
        avatarDiv.style.backgroundImage = `url('${avatar}')`;

        const bubbleDiv = document.createElement('div');

        // Render stickers correctly
        if (text.includes('<img')) {
            bubbleDiv.className = 'msg-bubble sticker-bubble';
            bubbleDiv.innerHTML = text;
            bubbleDiv.style.background = 'transparent';
            bubbleDiv.style.padding = '0';
            bubbleDiv.style.border = 'none';
            bubbleDiv.style.boxShadow = 'none';
        } else {
            bubbleDiv.className = 'msg-bubble';
            // We use textContent for normal messages to preserve exact string (and escape html)
            bubbleDiv.textContent = text;
        }

        msgDiv.appendChild(avatarDiv);
        msgDiv.appendChild(bubbleDiv);

        this.chatHistory.appendChild(msgDiv);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    handleIncomingTutorial(event) {
        this.engine.showModal('提示', event.text, () => {
            this.engine.nextEvent();
        });
    }

    simulateTyping(event) {
        if (!this.chatInputText) {
            this.engine.nextEvent();
            return;
        }

        const targetChat = event.targetChat || 'group';

        // Ensure we are viewing the correct chat (unconditionally open to load history)
        this.showChatConversation(targetChat, false);

        let i = 0;
        let text = event.text || event.draft || "";

        let typedText = "";

        // Fix for jump: do not clear it entirely, just keep a non-breaking space if empty,
        // or just use typedText directly.
        if (!event.append) {
            this.chatInputText.innerHTML = '&nbsp;';
        }

        const typeChar = () => {
            if (i < text.length) {
                typedText += text.charAt(i);
                this.chatInputText.textContent = typedText;
                i++;
                if (!this.engine.isSkip) {
                    this.engine.sfx.src = this.engine.resolveAsset('assets/audio/sfx/按鍵音效.mp3');
                    this.engine.sfx.play().catch(e => e);
                }
                const typingDelay = this.engine.isSkip ? 0 : 50;
                this.engine.typeTimer = setTimeout(typeChar, typingDelay);
            } else {
                if (event.requireSend) {
                    const sendBtn = document.getElementById('chat-send-btn');
                    if (sendBtn) {
                        sendBtn.classList.remove('disabled');
                        sendBtn.classList.add('pulse-highlight');
                        // Temporary click handler for requireSend
                        const oldOnclick = sendBtn.onclick;
                        sendBtn.onclick = () => {
                            sendBtn.classList.remove('pulse-highlight');
                            sendBtn.onclick = oldOnclick;
                            sendBtn.classList.add('disabled');
                            this.engine.playSound('assets/audio/sfx/按鍵音效.mp3');
                            this.chatInputText.textContent = '';
                            this.engine.nextEvent();
                        };
                    } else {
                        this.engine.nextEvent();
                    }
                } else {
                    this.engine.nextEvent();
                }
            }
        };
        typeChar();
    }

    handleIncomingMessage(event) {
        const targetChat = event.targetChat || 'group';
        const isSelf = event.sender === '雨果';

        // Save to data
        if (!this.chatData[targetChat]) this.chatData[targetChat] = [];
        this.chatData[targetChat].push({
            sender: event.sender,
            avatar: event.avatar,
            text: event.text
        });

        // If it's the active chat, display it
        if (this.activeChatId === targetChat) {
            if (isSelf || this.chatHistory.children.length === 0 || this.engine.isSkip) {
                this.appendMessageDOM(event.sender, event.avatar, event.text, isSelf);
                if (!this.engine.isSkip) this.engine.playSound('assets/audio/sfx/收到訊息.mp3');
                this.chatTimer1 = setTimeout(() => this.engine.nextEvent(), this.engine.isSkip ? 50 : 1500);
            } else {
                // Show "typing..."
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'chat-msg other';
                typingIndicator.innerHTML = `
                    <div class="msg-avatar" style="background-image: url('${this.engine.resolveAsset(event.avatar)}')"></div>
                    <div class="msg-bubble typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                `;
                this.chatHistory.appendChild(typingIndicator);
                this.chatHistory.scrollTop = this.chatHistory.scrollHeight;

                // Delay based on text length (simulating typing speed)
                const typingTime = this.engine.isSkip ? 50 : Math.min(Math.max(event.text.length * 100, 1000), 3000);

                this.chatTimer2 = setTimeout(() => {
                    if (this.chatHistory.contains(typingIndicator)) {
                        this.chatHistory.removeChild(typingIndicator);
                    }
                    this.appendMessageDOM(event.sender, event.avatar, event.text, false);
                    if (!this.engine.isSkip) this.engine.playSound('assets/audio/sfx/收到訊息.mp3');
                    this.chatTimer1 = setTimeout(() => this.engine.nextEvent(), this.engine.isSkip ? 50 : 1500);
                }, typingTime);
            }
        } else {
            // Background message
            if (targetChat === 'lucas') {
                this.lucasUnread = (this.lucasUnread || 0) + 1;
            }
            if (targetChat === 'ivy') {
                this.ivyUnread = (this.ivyUnread || 0) + 1;
            }
            if (targetChat === 'group') {
                this.groupUnread = (this.groupUnread || 0) + 1;
            }
            if (targetChat === 'melas') {
                this.melasUnread = (this.melasUnread || 0) + 1;
            }

            // Re-render chat list to update unread dots
            if (!this.activeChatId) {
                this.renderChatList();
            }

            // Add a glow to the back button if they are inside a different chat
            if (this.activeChatId) {
                const backBtn = document.querySelector('.back-btn');
                if (backBtn) {
                    backBtn.classList.add('pulse-highlight');
                }
            }

            if (!this.engine.isSkip) this.engine.playSound('assets/audio/sfx/手機提示.mp3');
            this.chatTimer1 = setTimeout(() => this.engine.nextEvent(), this.engine.isSkip ? 50 : 1500);
        }
    }

    handleIncomingSeparator(event) {
        const targetChat = event.targetChat || 'group';

        // Save to data
        if (!this.chatData[targetChat]) this.chatData[targetChat] = [];
        this.chatData[targetChat].push({
            type: 'separator',
            text: event.text
        });

        // If it's the active chat, display it immediately
        if (this.activeChatId === targetChat) {
            this.appendSeparatorDOM(event.text);
        }

        // Auto-advance the engine to the next event
        this.engine.nextEvent();
    }

    startQTEDelete(event) {
        clearTimeout(this.chatTimer1);
        clearTimeout(this.chatTimer2);
        clearTimeout(this.engine.autoTimer);
        clearTimeout(this.engine.typeTimer);

        if (this.engine.isSkip) {
            this.engine.isSkip = false;
        }

        this.qteOverlay.classList.add('active');
        this.qteOverlay.classList.add('spore-glitch');
        this.qteOptions.style.display = 'none';
        this.qteBackspaceBtn.style.display = 'block';
        this.qteInstruction.textContent = "警告：前額葉抑制失效，潛意識暴走中！請迅速刪除！";

        const timerText = document.getElementById('qte-timer-text');
        const draftDisplay = document.getElementById('qte-draft-display');
        draftDisplay.style.display = 'block';

        let currentDraft = event.draft;
        this.chatInputText.textContent = currentDraft;
        draftDisplay.textContent = currentDraft;

        // Loop countdown sound
        this.countdownAudio = new Audio(this.engine.resolveAsset('assets/audio/sfx/倒計時.mp3'));
        this.countdownAudio.loop = true;
        this.countdownAudio.play().catch(e => console.log(e));

        let timeLeft = event.time;
        this.qteTimerFill.style.width = '100%';
        if (timerText) timerText.textContent = `0${timeLeft}.0s`;

        const updateTimer = () => {
            if (this.qtePaused) return; // Freeze timer if options are shown

            timeLeft -= 0.1;
            this.qteTimerFill.style.width = `${(timeLeft / event.time) * 100}%`;
            if (timerText) {
                const formattedTime = Math.max(0, timeLeft).toFixed(1);
                timerText.textContent = formattedTime < 10 ? `0${formattedTime}s` : `${formattedTime}s`;
            }

            if (timeLeft <= 0) {
                clearInterval(this.qteInterval);
                this.qtePaused = true;
                this.qteBackspaceBtn.style.display = 'none';

                let salvaged = false;
                if (event.checkpoints) {
                    const cpIndex = event.checkpoints.findIndex(cp => currentDraft.length <= cp.maxLength && currentDraft.length >= cp.minLength);
                    if (cpIndex !== -1) {
                        salvaged = true;

                        this.qteOverlay.classList.remove('spore-glitch'); // Stop the UI from shaking!

                        this.qteInstruction.innerHTML = `【雨果：還有機會，可以補救！】<br><span style="color: #ffcccc; font-size: 1.2rem;">剩餘選擇時間：<span id="salvage-timer">3.0</span> 秒</span>`;
                        this.qteInstruction.style.color = "#aaffaa";
                        this.qteInstruction.style.textShadow = "0 0 8px rgba(0, 255, 0, 0.8)";

                        let salvageTime = 3.0;
                        this.salvageInterval = setInterval(() => {
                            salvageTime -= 0.1;
                            const tEl = document.getElementById('salvage-timer');
                            if (tEl) tEl.textContent = salvageTime.toFixed(1);
                            if (salvageTime <= 0) {
                                clearInterval(this.salvageInterval);
                                this.qteOptions.innerHTML = '';
                                this.qteFail("猶豫了太久，錯失了補救時機...");
                            }
                        }, 100);

                        this.qteOptions.style.display = 'block';
                        this.qteOptions.innerHTML = '';

                        event.checkpoints[cpIndex].options.forEach(opt => {
                            const btn = document.createElement('button');
                            btn.className = 'qte-option-btn';

                            // Auto-complete the string based on the checkpoint's maxLength
                            const baseStr = event.draft.substring(0, event.checkpoints[cpIndex].maxLength);
                            const prefix = baseStr.endsWith('，') || baseStr.endsWith('。') || opt.text.startsWith('，') || opt.text.startsWith('。') ? '' : '，';

                            btn.textContent = baseStr + prefix + opt.text;
                            btn.onclick = () => {
                                if (this.salvageInterval) clearInterval(this.salvageInterval);
                                if (opt.correct) {
                                    finishQTE(baseStr + prefix + opt.text);
                                } else {
                                    this.qteFail("發送了錯誤的訊息...");
                                }
                            };
                            this.qteOptions.appendChild(btn);
                        });
                    }
                }

                if (!salvaged) {
                    this.qteFail("不小心發送了奇怪的訊息...");
                }
            }
        };

        this.qteInterval = setInterval(updateTimer, 100);

        const deleteAction = () => {
            if (currentDraft.length > 0 && !this.qtePaused) {
                currentDraft = currentDraft.slice(0, -1); // Delete 1 char per hit
                this.chatInputText.textContent = currentDraft;
                draftDisplay.textContent = currentDraft;
                this.engine.playSound('assets/audio/sfx/按鍵音效.mp3');

                if (currentDraft.length === 0) {
                    this.qtePaused = true;
                    clearInterval(this.qteInterval);
                    this.qteBackspaceBtn.style.display = 'none';
                    this.qteOptions.style.display = 'none';
                    if (this.salvageInterval) clearInterval(this.salvageInterval);
                    finishQTE(event.target);
                }
            }
        };

        const finishQTE = (finalText) => {
            draftDisplay.style.display = 'none';
            this.qtePaused = false;

            if (this.countdownAudio) {
                this.countdownAudio.pause();
                this.countdownAudio = null;
            }
            if (this.qteKeydownHandler) {
                document.removeEventListener('keydown', this.qteKeydownHandler);
                this.qteKeydownHandler = null;
            }

            this.qteOverlay.classList.remove('active');
            this.qteOverlay.classList.remove('spore-glitch');

            // Set input text and prompt user to click send
            this.chatInputText.textContent = finalText;
            this.waitingForSend = true;
            this.pendingSendText = finalText;
            const sendBtn = document.getElementById('chat-send-btn');
            if (sendBtn) sendBtn.classList.add('pulse-highlight');
        };

        this.qteKeydownHandler = (e) => {
            if (e.key === 'Backspace') {
                deleteAction();
            }
        };

        document.addEventListener('keydown', this.qteKeydownHandler);
        this.qteBackspaceBtn.onclick = deleteAction;
    }

    qteFail(msg) {
        if (this.countdownAudio) {
            this.countdownAudio.pause();
            this.countdownAudio = null;
        }
        if (this.qteKeydownHandler) {
            document.removeEventListener('keydown', this.qteKeydownHandler);
            this.qteKeydownHandler = null;
        }

        this.qteOverlay.classList.remove('active');
        this.qteOverlay.classList.remove('spore-glitch');
        document.getElementById('qte-draft-display').style.display = 'none';

        // Send the bad draft text!
        const badDraft = this.engine.currentScript[this.engine.scriptIndex].draft || "發送了失敗的訊息...";
        this.appendMessageDOM('雨果', 'assets/img/chat_img/聊天頭像_雨果.png', badDraft, true);

        // Manually push to the correct chat data
        if (!this.chatData[this.activeChatId]) this.chatData[this.activeChatId] = [];
        this.chatData[this.activeChatId].push({ sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: badDraft });

        this.engine.currentScript = [
            { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "雨果？你傳的這是什麼意思？", targetChat: this.activeChatId },
            { type: "delay", time: 2.0 },
            { type: "dialogue", name: "雨果", text: "不……不小心按出去了……完蛋了……", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
            { type: "bg", src: "" },
            { type: "dialogue", name: "旁白", text: "我眼前一黑，隔天，我再也沒去學校。" },
            { type: "show_be" }
        ];

        this.engine.scriptIndex = -1;
        this.engine.qteFailTimer = setTimeout(() => this.engine.nextEvent(), 1500);
    }
    startQTEAcademic(event) {
        // Clear any previous options
        let optionsContainer = document.getElementById('chat-qte-inline-options');
        if (optionsContainer) {
            optionsContainer.remove();
        }

        optionsContainer = document.createElement('div');
        optionsContainer.id = 'chat-qte-inline-options';
        optionsContainer.className = 'chat-inline-options';
        optionsContainer.dataset.chatId = event.targetChat;
        if (this.activeChatId !== event.targetChat) {
            optionsContainer.style.display = 'none';
        }

        if (event.voice) {
            this.engine.voice.src = this.engine.resolveAsset(event.voice);
            this.engine.voice.loop = true;
            this.engine.voice.play().catch(e => e);
        }

        if (event.glitch) {
            const glitchOverlay = document.getElementById('spore-glitch-right');
            if (glitchOverlay) glitchOverlay.classList.add('active');
        }
        
        if (event.bubbles) {
            this.chatScreen.classList.add('pink-glow');
        }

        let answered = false;

        const finishQTE = (opt) => {
            if (answered) return;
            answered = true;
            clearTimeout(this.qteInterval);
            if (this.academicSpawns) clearInterval(this.academicSpawns);
            optionsContainer.classList.add('disabled');

            if (event.voice) {
                this.engine.voice.loop = false;
                this.engine.voice.pause();
            }

            if (event.glitch) {
                const glitchOverlay = document.getElementById('spore-glitch-right');
                if (glitchOverlay) glitchOverlay.classList.remove('active');
            }
            if (event.bubbles) {
                this.chatScreen.classList.remove('pink-glow');
            }

            const success = opt ? (opt.isCorrect === true || opt.correct === true) : false;

            // Send the chosen answer as Hugo
            if (opt) {
                this.chatData[event.targetChat].push({ sender: "雨果", avatar: "assets/img/chat_img/聊天頭像_雨果.png", text: opt.text });
                if (this.activeChatId === event.targetChat) {
                    this.appendMessage(this.chatData[event.targetChat][this.chatData[event.targetChat].length - 1], event.targetChat);
                }
            }

            const msgs = success ? event.successMsgs : event.failMsgs;
            if (msgs && msgs.length > 0) {
                // Show typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'chat-msg other';
                typingIndicator.innerHTML = `
                    <div class="msg-avatar" style="background-image: url('${this.engine.resolveAsset('assets/img/chat_img/聊天頭像_艾薇.png')}');"></div>
                    <div class="msg-bubble typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                `;
                if (this.activeChatId === event.targetChat) {
                    this.chatHistory.appendChild(typingIndicator);
                    this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
                }

                let delay = 1500; // Initial wait time for Ivy to "type"
                msgs.forEach((msg, index) => {
                    setTimeout(() => {
                        if (index === 0 && typingIndicator.parentNode) {
                            typingIndicator.remove();
                        }
                        this.chatData[event.targetChat].push(msg);
                        if (this.activeChatId === event.targetChat) {
                            this.appendMessage(msg, event.targetChat);
                            this.engine.playSound('assets/audio/sfx/收到訊息.mp3');
                        }

                        // If it's the last message
                        if (index === msgs.length - 1) {
                            if (!success) {
                                setTimeout(() => {
                                    optionsContainer.remove();
                                    this.startQTEAcademic(event);
                                }, 1500);
                            } else {
                                setTimeout(() => {
                                    optionsContainer.remove();
                                    this.engine.nextEvent();
                                }, 2000);
                            }
                        }
                    }, delay);
                    // Add delay based on length of the message to simulate typing, capped at 2500ms
                    delay += msg.text ? Math.min(2500, Math.max(800, msg.text.length * 50)) : 1000;
                });
            } else {
                if (!success) {
                    setTimeout(() => {
                        optionsContainer.remove();
                        this.startQTEAcademic(event);
                    }, 1500);
                } else {
                    optionsContainer.remove();
                    this.engine.nextEvent();
                }
            }
        };

        this.engine.playSound('assets/audio/sfx/收到訊息.mp3');

        const delayTime = event.time ? 2000 : 0;
        setTimeout(() => {
            if (answered) return;

            const optionBtns = [];
            event.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'chat-inline-btn';

                // If there are bubbles and mutangOptions exist, show mutang text
                const showMutang = event.bubbles && event.bubbles.count > 0 && event.mutangOptions;
                btn.textContent = showMutang ? event.mutangOptions[idx].text : opt.text;

                if (event.glitch) {
                    btn.style.animation = 'popup-shake 0.3s infinite';
                    btn.style.margin = `${Math.random() * 10}px ${Math.random() * 20}px`;
                }

                // If mutang, click fails. Else use normal logic.
                btn.onclick = () => {
                    if (event.bubbles && bubblesLeft > 0 && event.mutangOptions) {
                        finishQTE(event.mutangOptions[idx]);
                    } else {
                        finishQTE(opt);
                    }
                };

                optionBtns.push(btn);
                optionsContainer.appendChild(btn);
            });

            // Ensure options are hidden if we navigated away while waiting
            if (this.activeChatId !== event.targetChat) {
                optionsContainer.style.display = 'none';
            }

            // Append just before the input area to avoid jitter during history re-renders
            const inputArea = document.querySelector('.chat-input-area');
            if (inputArea && inputArea.parentNode) {
                inputArea.parentNode.insertBefore(optionsContainer, inputArea);
            } else {
                this.chatHistory.appendChild(optionsContainer);
            }

            // --- Bubbles Mechanic ---
            let bubblesLeft = 0;
            if (event.bubbles) {
                bubblesLeft = event.bubbles.count;

                const spawnBubble = () => {
                    if (answered) return;

                    const bubble = document.createElement('div');
                    bubble.className = 'lucas-bubble pop-in';
                    bubble.textContent = event.bubbles.texts[Math.floor(Math.random() * event.bubbles.texts.length)];

                    // Random positioning
                    bubble.style.top = `${20 + Math.random() * 50}%`;
                    bubble.style.left = `${10 + Math.random() * 60}%`;

                    // Add springy pop-in animation followed by float-up
                    bubble.style.animation = 'pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, float-up 4s ease-in-out 0.4s infinite alternate';

                    bubble.onclick = (e) => {
                        e.stopPropagation();
                        if (bubble.classList.contains('popped')) return;
                        bubble.classList.add('popped');
                        this.engine.playSound('assets/audio/sfx/按鍵音效.mp3'); // Sound effect for popping
                        bubblesLeft--;
                        if (bubblesLeft <= 0 && event.mutangOptions) {
                            // Restore original text
                            optionBtns.forEach((btn, idx) => {
                                btn.textContent = event.options[idx].text;
                            });
                        }
                        setTimeout(() => bubble.remove(), 200);
                    };

                    this.chatConversationView.appendChild(bubble);
                };

                // Spawn all initial bubbles
                for (let i = 0; i < event.bubbles.count; i++) {
                    setTimeout(spawnBubble, Math.random() * 1000);
                }

                // Keep spawning more bubbles periodically if they delay
                this.academicSpawns = setInterval(() => {
                    if (bubblesLeft < event.bubbles.count && !answered) {
                        spawnBubble();
                        bubblesLeft++;
                        if (event.mutangOptions && bubblesLeft > 0) {
                            // Hide the answers again
                            optionBtns.forEach((btn, idx) => {
                                btn.textContent = event.mutangOptions[idx].text;
                            });
                        }
                    }
                }, 2500);
            }
            // ------------------------

            this.chatHistory.scrollTop = this.chatHistory.scrollHeight;

            // Auto fail if time runs out
            if (event.time) {
                this.qteInterval = setTimeout(() => {
                    this.chatData[event.targetChat].push({ sender: "系統", text: "【警告】前額葉防線已被突破，潛意識接管對話。" });
                    if (this.activeChatId === event.targetChat) {
                        this.appendMessage(this.chatData[event.targetChat][this.chatData[event.targetChat].length - 1], event.targetChat);
                    }
                    const failOpt = event.options && event.options.length > 0 ? event.options[event.options.length - 1] : { text: "...", isCorrect: false };
                    finishQTE(failOpt);
                }, event.time * 1000);
            }
        }, delayTime);
    }

    startQTEDefensePack(event) {
        clearTimeout(this.chatTimer1);
        clearTimeout(this.chatTimer2);
        clearTimeout(this.engine.autoTimer);
        clearTimeout(this.engine.typeTimer);

        if (this.engine.isSkip) this.engine.isSkip = false;

        this.qteOverlay.style.display = 'block';
        this.qteOverlay.style.background = 'transparent'; // USER REQUEST: Don't block the view
        this.qteOverlay.style.pointerEvents = 'none'; // USER REQUEST: Don't block clicks
        this.qteOptions.style.display = 'none';
        this.qteBackspaceBtn.style.display = 'none';
        this.qteInstruction.textContent = "多工處理修羅場！點擊攔截危險訊息，同時按 Backspace 壓制潛意識！";

        const timerText = document.getElementById('qte-timer-text');
        const draftDisplay = document.getElementById('qte-draft-display');
        draftDisplay.style.display = 'none'; // USER REQUEST: Do not show draft text UI on screen, let them just look at the input box

        let draftText = "";
        const targetDraft = event.draft;
        let draftIndex = 0;
        draftDisplay.textContent = draftText;
        this.chatInputText.textContent = draftText;

        this.countdownAudio = new Audio(this.engine.resolveAsset('assets/audio/sfx/倒計時.mp3'));
        this.countdownAudio.loop = true;
        this.countdownAudio.play().catch(e => e);

        let timeLeft = event.time || 15.0;
        this.qteTimerFill.style.width = '100%';
        if (timerText) timerText.textContent = timeLeft.toFixed(1) + 's';

        let failed = false;
        let qteActive = true; // Prevents ghost timers from failing after success

        // Draft Auto-typing
        const typingInterval = setInterval(() => {
            if (failed) return;
            if (draftIndex < targetDraft.length) {
                draftText += targetDraft[draftIndex];
                draftIndex++;
                draftDisplay.textContent = draftText;
                this.chatInputText.textContent = draftText;

                if (draftIndex >= targetDraft.length && qteActive) {
                    failed = true;
                    qteActive = false;

                    // Send the full text to the group
                    this.appendMessage({
                        sender: "雨果",
                        avatar: "assets/img/chat_img/聊天頭像_雨果.png",
                        text: draftText
                    }, event.targetChat);
                    this.chatInputText.textContent = ''; // clear input
                    this.engine.playSound('assets/audio/sfx/按鍵音效.mp3');

                    setTimeout(() => {
                        this.qteFailDefense("不小心把妄想發送出去了...都怪蜜拉思。", {
                            sender: "盧卡斯",
                            avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png",
                            text: "雨果？你傳了什麼到群組裡...？明天你在車上可以跟我解釋一下嗎？",
                            ending: true
                        });
                    }, 500); // wait a moment to let the user see their mistake
                }
            }
        }, 300); // USER REQUEST: 300ms

        // Unified Defense Controls UI
        const defenseControls = document.createElement('div');
        defenseControls.className = 'defense-controls';
        defenseControls.style.position = 'absolute';
        defenseControls.style.bottom = '130px'; // Raised to prevent obscuring input
        defenseControls.style.left = '50%';
        defenseControls.style.transform = 'translateX(-50%)';
        defenseControls.style.display = 'flex';
        defenseControls.style.gap = '15px';
        defenseControls.style.width = '90%';
        defenseControls.style.maxWidth = '500px';
        defenseControls.style.padding = '15px';
        defenseControls.style.background = 'rgba(255, 255, 255, 0.1)';
        defenseControls.style.backdropFilter = 'blur(10px)';
        defenseControls.style.borderRadius = '20px';
        defenseControls.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        defenseControls.style.border = '1px solid rgba(255,255,255,0.2)';
        defenseControls.style.zIndex = '999999'; // Very high z-index to be above qte-overlay

        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = `🗑️ 刪除廢料`;
        btnDelete.style.flex = '1';
        btnDelete.style.padding = '12px';
        btnDelete.style.background = 'rgba(120, 30, 30, 0.8)'; // Elegant dark red
        btnDelete.style.color = '#fff';
        btnDelete.style.border = '1px solid rgba(255, 100, 100, 0.4)';
        btnDelete.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        btnDelete.style.borderRadius = '25px';
        btnDelete.style.fontWeight = 'bold';
        btnDelete.style.fontSize = '1.1rem';
        btnDelete.style.cursor = 'pointer';
        btnDelete.style.pointerEvents = 'auto'; // Force pointer events

        const btnIntercept = document.createElement('button');
        btnIntercept.innerHTML = `🛡️ 攔截訊息`;
        btnIntercept.style.flex = '1';
        btnIntercept.style.padding = '12px';
        btnIntercept.style.background = 'rgba(50, 50, 50, 0.8)'; // Muted gray
        btnIntercept.style.color = '#fff';
        btnIntercept.style.border = '1px solid rgba(150, 150, 150, 0.4)';
        btnIntercept.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        btnIntercept.style.borderRadius = '25px';
        btnIntercept.style.fontWeight = 'bold';
        btnIntercept.style.fontSize = '1.1rem';
        btnIntercept.style.pointerEvents = 'none';
        btnIntercept.style.transition = 'all 0.3s';

        defenseControls.appendChild(btnDelete);
        defenseControls.appendChild(btnIntercept);
        // Append to game-container instead of chat view so it is always on top!
        document.getElementById('game-container').appendChild(defenseControls);

        let activeMelasInterceptCallback = null;

        const handleDelete = () => {
            if (draftText.length > 0 && !failed) {
                draftText = draftText.slice(0, -1);
                draftIndex = Math.max(0, draftIndex - 1);
                draftDisplay.textContent = draftText;
                this.chatInputText.textContent = draftText;
                this.engine.playSound('assets/audio/sfx/按鍵音效.mp3');
            }
        };

        const handleIntercept = () => {
            if (activeMelasInterceptCallback && !failed) {
                activeMelasInterceptCallback();
            }
        };

        btnDelete.onclick = handleDelete;
        btnIntercept.onclick = handleIntercept;

        // Add touch events to prevent Mobile Safari click delays and overlapping bugs
        btnDelete.ontouchstart = (e) => { e.preventDefault(); handleDelete(); };
        btnIntercept.ontouchstart = (e) => { e.preventDefault(); handleIntercept(); };

        // Keyboard handler for Backspace and Space
        this.qteKeydownHandler = (e) => {
            if (e.key === 'Backspace') {
                e.preventDefault();
                handleDelete();
            } else if (e.code === 'Space') {
                e.preventDefault();
                handleIntercept();
            }
        };
        document.addEventListener('keydown', this.qteKeydownHandler);

        // Melas message spawning
        let activeMelasTimeout = null;
        const spawnMelasMsg = () => {
            if (failed) return;
            const msgs = event.enemyMsgs || ["[蜜拉思]：雨果最近很需要『肢體接觸』來降溫喔～"];
            const msgText = msgs[Math.floor(Math.random() * msgs.length)];

            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg other defense-melas-msg`;
            msgDiv.innerHTML = `
                <div class="msg-avatar" style="background-image: url('${this.engine.resolveAsset('assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png')}')"></div>
                <div class="msg-bubble" style="border: 2px solid #ff4c4c; cursor: pointer; transition: all 0.2s;">
                    ${msgText}
                    <div style="font-size: 12px; color: #ff4c4c; font-weight: bold; text-align: center; margin-top: 5px;">[ 點擊攔截危險訊息 ]</div>
                </div>
            `;
            this.chatHistory.appendChild(msgDiv);
            this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
            this.engine.playSound('assets/audio/sfx/收到訊息.mp3');

            btnIntercept.style.background = 'rgba(30, 80, 120, 0.9)'; // Elegant dark blue
            btnIntercept.style.border = '1px solid rgba(100, 150, 200, 0.6)';
            btnIntercept.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
            btnIntercept.style.pointerEvents = 'auto';
            btnIntercept.style.animation = 'popup-shake 0.3s infinite';

            let btn = msgDiv.querySelector('.msg-bubble');
            let answered = false;
            let clicks = 0;
            const requiredClicks = 10;

            // Wait, update instruction text
            let hintDiv = btn.querySelector('div');
            if (hintDiv) hintDiv.textContent = `[ 狂點攔截！ ${clicks}/${requiredClicks} ]`;

            // Fail logic
            const triggerFail = () => {
                if (!answered && !failed && qteActive) {
                    failed = true;
                    qteActive = false;
                    activeMelasInterceptCallback = null;
                    this.qteFailDefense("盧卡斯看到了蜜拉思的危險訊息...未出發先社死。", event.failReply);
                }
            };

            // If not clicked initially within 4 seconds, GAME OVER
            let failTimer = setTimeout(triggerFail, 4000);

            const processMelasClick = () => {
                if (failed || answered) return;

                clicks++;
                this.engine.playSound('assets/audio/sfx/按鍵音效.mp3');

                // Reset the bomb timer: as long as they keep clicking, give them 2.5s per click
                clearTimeout(failTimer);
                failTimer = setTimeout(triggerFail, 2500);

                // Add 1 sticker immediately
                const spam = document.createElement('div');
                spam.className = `chat-msg self`;
                spam.innerHTML = `<div class="msg-avatar" style="background-image: url('${this.engine.resolveAsset('assets/img/chat_img/聊天頭像_雨果.png')}')"></div>
                <div class="msg-bubble sticker-bubble" style="background:transparent; padding:0; border:none; box-shadow:none;"><img src="${this.engine.resolveAsset('assets/img/chat_img/點讚貼圖.png')}" style="width:100px; height:100px; object-fit:contain;"></div>`;
                this.chatHistory.appendChild(spam);
                this.chatHistory.scrollTop = this.chatHistory.scrollHeight;

                // Save this sticker to chat history
                this.chatData[event.targetChat].push({
                    sender: "雨果",
                    avatar: "assets/img/chat_img/聊天頭像_雨果.png",
                    text: `<img src="${this.engine.resolveAsset('assets/img/chat_img/點讚貼圖.png')}" style="width:100px; height:100px; object-fit:contain;">`
                });

                if (clicks < requiredClicks) {
                    if (hintDiv) hintDiv.textContent = `[ 狂點攔截！ ${clicks}/${requiredClicks} ]`;
                    return; // Not done yet
                }

                // DONE
                answered = true;
                activeMelasInterceptCallback = null;
                btnIntercept.style.background = 'rgba(50, 50, 50, 0.8)';
                btnIntercept.style.border = '1px solid rgba(150, 150, 150, 0.4)';
                btnIntercept.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                btnIntercept.style.pointerEvents = 'none';
                btnIntercept.style.animation = 'none';

                clearTimeout(failTimer);

                // USER REQUEST: Preserve Melas's message
                btn.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                btn.style.cursor = 'default';
                if (hintDiv) hintDiv.remove();

                // Save Melas message
                let rawMelasText = "";
                for (let node of btn.childNodes) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        rawMelasText += node.nodeValue;
                    }
                }
                rawMelasText = rawMelasText.trim();

                this.chatData[event.targetChat].push({
                    sender: "蜜拉思",
                    avatar: "assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png",
                    text: rawMelasText
                });

                // Queue next attack if time allows
                if (timeLeft > 3) {
                    activeMelasTimeout = setTimeout(spawnMelasMsg, Math.random() * 1500 + 1000);
                }
            };

            // Assign to both click and standalone callback
            btn.onclick = processMelasClick;
            activeMelasInterceptCallback = processMelasClick;
        };

        // Start first attack after 1.5s
        activeMelasTimeout = setTimeout(spawnMelasMsg, 1500);

        const cleanupControls = () => {
            qteActive = false;
            const controls = document.querySelector('.defense-controls');
            if (controls) controls.remove();
        };

        const updateTimer = () => {
            if (failed) return;
            timeLeft -= 0.1;
            this.qteTimerFill.style.width = `${(timeLeft / event.time) * 100}%`;
            if (timerText) timerText.textContent = Math.max(0, timeLeft).toFixed(1) + 's';

            if (timeLeft <= 0) {
                // Time up! Did we survive?
                clearInterval(this.qteInterval);
                clearInterval(typingInterval);
                clearTimeout(activeMelasTimeout);
                cleanupControls();

                // Make any remaining active Melas messages harmless
                document.querySelectorAll('.defense-melas-msg .msg-bubble').forEach(btn => {
                    btn.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                    btn.style.cursor = 'default';
                    btn.onclick = null;
                    const hint = btn.querySelector('div');
                    if (hint) hint.remove();
                });

                // If they survived the timer without the draft hitting the limit, they win
                this.finishQTEDefense(event.successReply);
            }
        };

        this.qteInterval = setInterval(updateTimer, 100);
    }

    qteFailDefense(reason, failReply) {
        if (this.countdownAudio) {
            this.countdownAudio.pause();
            this.countdownAudio = null;
        }
        if (this.qteKeydownHandler) {
            document.removeEventListener('keydown', this.qteKeydownHandler);
            this.qteKeydownHandler = null;
        }
        const controls = document.querySelector('.defense-controls');
        if (controls) controls.remove();

        this.qteOverlay.style.display = '';
        this.qteOverlay.style.background = '';
        this.qteOverlay.style.pointerEvents = '';
        document.getElementById('qte-draft-display').style.display = 'none';

        if (failReply) {
            this.engine.currentScript = [
                { type: "chat_msg", sender: failReply.sender, avatar: failReply.avatar, text: failReply.text, targetChat: this.activeChatId },
                { type: "delay", time: 2.0 },
                { type: "dialogue", name: "雨果", text: "完蛋了……", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
                { type: "bg", src: "" },
                { type: "dialogue", name: "旁白", text: "我眼前一黑，" + reason },
                { type: "show_be" }
            ];

            this.engine.scriptIndex = -1;
            this.engine.qteFailTimer = setTimeout(() => this.engine.nextEvent(), 1500);
        }
    }

    finishQTEDefense(successText) {
        if (this.countdownAudio) {
            this.countdownAudio.pause();
            this.countdownAudio = null;
        }
        if (this.qteKeydownHandler) {
            document.removeEventListener('keydown', this.qteKeydownHandler);
            this.qteKeydownHandler = null;
        }

        this.qteOverlay.style.display = '';
        this.qteOverlay.style.background = '';
        this.qteOverlay.style.pointerEvents = '';
        document.getElementById('qte-draft-display').style.display = 'none';
        this.qteInstruction.textContent = "";

        this.chatInputText.textContent = "";

        // Return control to engine script for typing out the response
        this.engine.nextEvent();
    }
}
