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
        
        this.renderHistory(chatId);

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
        renderItem('melas', '蜜拉思', 'assets/img/chat_img/聊天頭像_蜜拉思（化學老師）.png', this.chatData['melas'], 0);
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
        bubbleDiv.className = 'msg-bubble';
        bubbleDiv.textContent = text;

        msgDiv.appendChild(avatarDiv);
        msgDiv.appendChild(bubbleDiv);

        this.chatHistory.appendChild(msgDiv);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
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
        
        // Reset if not appending
        if (!event.append) {
            this.chatInputText.textContent = '';
        }

        const typeChar = () => {
            if (i < text.length) {
                this.chatInputText.textContent += text.charAt(i);
                i++;
                if (!this.engine.isSkip) {
                    this.engine.sfx.src = this.engine.resolveAsset('assets/audio/sfx/按鍵音效.mp3');
                    this.engine.sfx.play().catch(e=>e);
                }
                const typingDelay = this.engine.isSkip ? 0 : 50;
                this.engine.typeTimer = setTimeout(typeChar, typingDelay);
            } else {
                this.engine.nextEvent();
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
        
        if (event.glitch) {
            const glitchOverlay = document.getElementById('spore-glitch-right');
            if (glitchOverlay) glitchOverlay.classList.add('active');
        }
        
        let answered = false;

        const finishQTE = (opt) => {
            if (answered) return;
            answered = true;
            clearTimeout(this.qteInterval);
            optionsContainer.classList.add('disabled');
            
            if (event.glitch) {
                const glitchOverlay = document.getElementById('spore-glitch-right');
                if (glitchOverlay) glitchOverlay.classList.remove('active');
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
            
            event.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'chat-inline-btn';
                btn.textContent = opt.text;
                if (event.glitch) {
                    btn.style.animation = 'popup-shake 0.3s infinite';
                    btn.style.margin = `${Math.random() * 10}px ${Math.random() * 20}px`;
                }
                btn.onclick = () => finishQTE(opt);
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
}
