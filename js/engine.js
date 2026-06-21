class GameEngine {
    constructor() {
        this.screens = {
            mode: document.getElementById('mode-screen'),
            title: document.getElementById('title-screen'),
            vn: document.getElementById('vn-screen'),
            chat: document.getElementById('chat-screen'),
            call: document.getElementById('call-screen'),
            be: document.getElementById('be-screen')
        };
        this.activeScreenName = 'mode';

        this.assetMode = 'local';
        this.assetBaseUrl = "https://file.garden/aWe99vhwaGcNwkok/L_Chat/";

        this.vnBg = document.getElementById('vn-bg');
        this.vnBgOverlay = document.getElementById('vn-bg-overlay');
        this.vnChars = document.getElementById('vn-characters');
        this.vnDialogBox = document.getElementById('vn-dialogue-box');
        this.vnName = document.getElementById('vn-name');
        this.vnText = document.getElementById('vn-text');
        this.vnAvatar = document.getElementById('vn-avatar');

        this.dialogueLog = [];

        this.chatSystem = new ChatSystem(this);
        this.forumSystem = new ForumSystem(this);
        this.callSystem = new CallSystem(this);

        this.bgm = document.getElementById('bgm-player');
        this.voice = document.getElementById('voice-player');
        this.sfx = document.getElementById('sfx-player');

        // Default volumes & speed
        this.bgm.volume = 0.3;
        this.voice.volume = 0.8;
        this.sfx.volume = 0.4;
        this.textSpeedValue = 6;

        this.currentScript = [];
        this.scriptIndex = 0;
        this.currentDay = 1;
        this.isTyping = false;
        this.isAuto = false;
        this.isSkip = false;
        this.autoTimer = null;
        this.typeTimer = null;
        this.qteInterval = null;
        this.waitingForChat = undefined;
        this.waitingForForum = false;
        this.waitingForStory = false;

        this.charColors = {
            "西爾維亞": { bg: "#C1F5EA", text: "#2c3e50" },
            "艾薇": { bg: "#C1F5EF", text: "#2c3e50" },
            "盧卡斯": { bg: "#E88B72", text: "#ffffff" },
            "雨果": { bg: "#917EA8", text: "#ffffff" },
            "旁白": { bg: "rgba(255, 255, 255, 0.8)", text: "#2c3e50" }
        };

        this.bindEvents();
    }

    bindEvents() {
        // Mode Selection
        document.getElementById('btn-mode-local').addEventListener('click', () => {
            this.assetMode = 'local';
            this.showScreen('title');
        });
        document.getElementById('btn-mode-online').addEventListener('click', () => {
            this.assetMode = 'online';
            this.showScreen('title');
        });

        document.getElementById('btn-start').addEventListener('click', () => {
            const daySelect = document.getElementById('day-select');
            const selectedDay = daySelect ? parseInt(daySelect.value, 10) : 1;
            this.startGame(selectedDay);
        });
        document.getElementById('btn-load').addEventListener('click', () => {
            const savedStateStr = localStorage.getItem('L_Chat_SaveState');
            if (savedStateStr) {
                try {
                    const savedState = JSON.parse(savedStateStr);
                    this.loadGame(savedState);
                } catch (e) {
                    this.showModal('錯誤', '存檔資料損毀。');
                }
            } else {
                this.showModal('提示', '沒有找到存檔紀錄。');
            }
        });

        document.getElementById('btn-preload').addEventListener('click', () => {
            if (typeof Day1Script !== 'undefined') {
                this.showModal('提示', '正在預加載素材，請稍候...');
                let total = 0;
                let loaded = 0;
                const setLoaded = () => {
                    loaded++;
                    if (loaded >= total) {
                        this.showModal('提示', '所有素材預加載完成！');
                    }
                };

                const assets = new Set();
                Day1Script.forEach(e => {
                    if (e.src) assets.add(e.src);
                    if (e.avatar) assets.add(e.avatar);
                    if (e.voice) assets.add(e.voice);
                });

                total = assets.size;
                if (total === 0) setLoaded();

                assets.forEach(url => {
                    const resolvedUrl = this.resolveAsset(url);
                    if (url.match(/\.(png|jpg|jpeg|gif)$/i)) {
                        const img = new Image();
                        img.onload = setLoaded;
                        img.onerror = setLoaded;
                        img.src = resolvedUrl;
                    } else if (url.match(/\.(mp3|wav|ogg)$/i)) {
                        const audio = new Audio();
                        audio.oncanplaythrough = setLoaded;
                        audio.onerror = setLoaded;
                        audio.src = resolvedUrl;
                        audio.load();
                    } else {
                        setLoaded();
                    }
                });
            } else {
                this.showModal('提示', '找不到可預加載的腳本。');
            }
        });

        this.vnDialogBox.addEventListener('click', () => {
            // Prevent clicking dialogue box if it's currently hidden
            if (this.vnDialogBox.classList.contains('hidden')) return;
            // Prevent double click skipping during modals
            if (document.getElementById('system-modal').classList.contains('active')) return;

            // Handle call system clicks
            if (this.activeScreenName === 'call' && this.callSystem && this.callSystem.isActive) {
                // User requested to completely block clicks during the call mini-game
                return;
            }

            // Turn off Skip on manual interaction
            if (this.isSkip) {
                this.isSkip = false;
                const skipIndicator = document.getElementById('skip-indicator');
                if (skipIndicator) skipIndicator.classList.add('hidden');
                if (this.autoTimer) clearTimeout(this.autoTimer);
            }

            if (!this.isTyping) {
                this.nextEvent();
            } else {
                // Skip typing
                this.isTyping = false;
                clearTimeout(this.typeTimer);
                const event = this.currentScript[this.scriptIndex];
                if (event && event.type === 'dialogue') {
                    this.vnText.innerHTML = event.text;
                }
            }
        });

        // Drawer UI Skip & Load Buttons
        document.getElementById('btn-drawer-skip').addEventListener('click', (e) => {
            e.stopPropagation();
            this.isSkip = !this.isSkip;
            
            const skipIndicator = document.getElementById('skip-indicator');
            if (skipIndicator) {
                if (this.isSkip) skipIndicator.classList.remove('hidden');
                else skipIndicator.classList.add('hidden');
            }

            const drawer = document.getElementById('settings-drawer');
            drawer.classList.remove('open');

            if (this.isSkip) {
                if (this.isTyping) {
                    this.isTyping = false;
                    clearTimeout(this.typeTimer);
                    const event = this.currentScript[this.scriptIndex];
                    if (event && event.type === 'dialogue') {
                        this.vnText.innerHTML = event.text;
                    }
                    this.nextEvent();
                } else if (!this.vnDialogBox.classList.contains('hidden')) {
                    this.nextEvent();
                }
            }
        });

        document.getElementById('btn-drawer-load').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('system-modal').classList.remove('active');
        });

        // Settings Drawer Events
        const drawer = document.getElementById('settings-drawer');
        document.getElementById('drawer-handle').addEventListener('click', () => {
            drawer.classList.toggle('open');
        });
        document.getElementById('vol-bgm').addEventListener('input', (e) => {
            this.bgm.volume = e.target.value;
        });
        document.getElementById('vol-voice').addEventListener('input', (e) => {
            this.voice.volume = e.target.value;
        });
        document.getElementById('vol-sfx').addEventListener('input', (e) => {
            this.sfx.volume = e.target.value;
        });
        document.getElementById('vol-textspeed').addEventListener('input', (e) => {
            this.textSpeedValue = parseInt(e.target.value);
        });
        document.getElementById('btn-save-game').addEventListener('click', () => {
            if (this.scriptIndex < 0) return; // Cannot save on title screen
            
            const isForum = this.forumSystem.forumView && this.forumSystem.forumView.classList.contains('active') ? true : false;

            const state = {
                day: this.currentDay,
                index: this.scriptIndex,
                bg: (this.vnBgOverlay.style.opacity == 1) ? this.vnBgOverlay.style.backgroundImage : this.vnBg.style.backgroundImage,
                chars: this.vnChars.innerHTML,
                bgm: this.bgm.src,
                chatData: this.chatSystem.chatData,
                lucasUnread: this.chatSystem.lucasUnread,
                forumData: this.forumSystem ? this.forumSystem.forumData : [],
                activeScreen: this.activeScreenName,
                activeChatId: this.chatSystem.activeChatId,
                isForumActive: isForum,
                log: JSON.stringify(this.dialogueLog)
            };
            localStorage.setItem('L_Chat_SaveState', JSON.stringify(state));
            this.showModal('提示', '進度已成功儲存。');
            drawer.classList.remove('open');
        });

        // Log UI Events
        const btnDrawerLog = document.getElementById('btn-drawer-log');
        if (btnDrawerLog) {
            btnDrawerLog.addEventListener('click', (e) => {
                e.stopPropagation();
                drawer.classList.remove('open');
                this.renderLog();
                document.getElementById('log-overlay').classList.remove('hidden');
            });
        }
        const btnCloseLog = document.getElementById('btn-close-log');
        if (btnCloseLog) {
            btnCloseLog.addEventListener('click', () => {
                document.getElementById('log-overlay').classList.add('hidden');
            });
        }
    }

    renderLog() {
        const content = document.getElementById('log-content');
        if (!content) return;
        content.innerHTML = '';
        this.dialogueLog.forEach(log => {
            const item = document.createElement('div');
            item.className = 'log-item';

            const nameEl = document.createElement('div');
            nameEl.className = 'log-name';
            nameEl.textContent = log.name || '旁白';

            if (log.voice) {
                const voiceBtn = document.createElement('button');
                voiceBtn.className = 'log-voice-btn';
                voiceBtn.textContent = '▶';
                voiceBtn.onclick = () => this.playAudio(this.voice, log.voice);
                nameEl.appendChild(voiceBtn);
            }

            const textEl = document.createElement('div');
            textEl.className = 'log-text';
            textEl.innerHTML = log.text;

            item.appendChild(nameEl);
            item.appendChild(textEl);
            content.appendChild(item);
        });
        setTimeout(() => {
            content.scrollTop = content.scrollHeight;
        }, 50);
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(s => s.classList.remove('active'));
        if (this.screens[screenName]) {
            this.screens[screenName].classList.remove('hidden');
            this.screens[screenName].classList.add('active');
        }
        this.activeScreenName = screenName;

        if (screenName === 'title') {
            this.resetGame();
        }
    }

    resetGame() {
        this.chatSystem.reset();
        this.chatSystem.chatData = {};
        this.chatSystem.initializeFakeHistory();
        if (this.forumSystem) this.forumSystem.forumData = [];
        this.scriptIndex = -1;
        this.dialogueLog = [];
        this.bgm.pause();
        this.voice.pause();
        this.sfx.pause();
        clearTimeout(this.typeTimer);
        clearTimeout(this.chatTimer1);
        clearTimeout(this.chatTimer2);
        clearTimeout(this.autoTimer);
        clearTimeout(this.fadeTimer);
        clearTimeout(this.qteFailTimer);
        clearInterval(this.qteInterval);
        clearInterval(this.salvageInterval);
        this.isTyping = false;

        this.isSkip = false;
        const skipIndicator = document.getElementById('skip-indicator');
        if (skipIndicator) skipIndicator.classList.add('hidden');
        this.waitingForChat = undefined;
        this.waitingForForum = false;
        this.waitingForStory = false;

        this.vnChars.innerHTML = '';
        delete this.vnChars.dataset.currentChar;
        this.hideDialogueBox();
        this.chatSystem.reset();
    }

    startGame(day) {
        this.currentDay = day;
        this.chatSystem.reset();

        // Use fade screen to mask the jump
        const fadeScreen = document.getElementById('fade-screen');
        fadeScreen.classList.add('active');
        document.getElementById('fade-text').innerHTML = "";

        setTimeout(() => {
            this.showScreen('vn');
            this.vnBg.style.backgroundImage = '';
            this.vnChars.innerHTML = '';

            const bottomNav = document.getElementById('lchat-bottom-nav');
            if (bottomNav) {
                bottomNav.style.display = (day >= 3) ? 'flex' : 'none';
            }

            if (day === 1 && typeof Day1Script !== 'undefined') {
                this.currentScript = Day1Script;
            } else if (day === 2 && typeof Day2Script !== 'undefined') {
                this.currentScript = Day2Script;
            } else {
                this.showModal('錯誤', `Day ${day} 尚未實裝或腳本未載入。`);
                return;
            }

            this.scriptIndex = -1;
            this.justFaded = true;
            this.nextEvent();
            setTimeout(() => {
                fadeScreen.classList.remove('active');
            }, 100);
        }, 800); // Wait for black screen to fully cover
    }

    loadGame(state) {
        this.currentDay = state.day;
        if (this.currentDay === 1 && typeof Day1Script !== 'undefined') {
            this.currentScript = Day1Script;
        } else if (this.currentDay === 2 && typeof Day2Script !== 'undefined') {
            this.currentScript = Day2Script;
        } else {
            this.showModal('錯誤', '找不到對應章節的劇本。');
            return;
        }

        this.resetGame();

        // Restore state
        this.vnBg.style.backgroundImage = state.bg || '';
        this.vnChars.innerHTML = state.chars || '';
        if (state.chatData) {
            this.chatSystem.chatData = state.chatData;
        }
        this.chatSystem.lucasUnread = state.lucasUnread || 0;
        if (this.forumSystem && state.forumData) {
            this.forumSystem.forumData = state.forumData;
        }

        if (state.log) {
            try {
                this.dialogueLog = JSON.parse(state.log);
            } catch (e) { }
        }

        if (state.bgm && state.bgm !== '') {
            this.bgm.src = state.bgm;
            this.bgm.play().catch(e => console.log('Audio load failed', e));
        }

        // Let it start from the exact index
        this.scriptIndex = state.index - 1;

        // Restore screen
        if (state.activeScreen) {
            this.showScreen(state.activeScreen);
            if (state.activeScreen === 'chat') {
                if (state.isForumActive && this.forumSystem) {
                    this.forumSystem.showForum();
                } else if (state.activeChatId) {
                    this.chatSystem.showChatConversation(state.activeChatId);
                } else {
                    this.chatSystem.showChatList();
                }
            }
        } else {
            // Fallback for older saves
            const nextEvt = this.currentScript[this.scriptIndex + 1];
            if (nextEvt && (nextEvt.type === 'chat_msg' || nextEvt.type === 'chat_tutorial')) {
                this.showScreen('chat');
            } else {
                this.showScreen('vn');
            }
        }

        this.nextEvent();
    }

    hideDialogueBox() {
        this.vnDialogBox.classList.add('hidden');
        this.vnDialogBox.style.opacity = '0';
        this.vnDialogBox.style.pointerEvents = 'none';
    }

    showDialogueBox() {
        this.vnDialogBox.classList.remove('hidden');
        this.vnDialogBox.style.opacity = '1';
        this.vnDialogBox.style.pointerEvents = 'auto';
    }

    nextEvent() {
        if (this.waitingForChat || this.waitingForForum || this.waitingForStory) return;

        this.scriptIndex++;
        if (this.scriptIndex >= this.currentScript.length) return;

        const event = this.currentScript[this.scriptIndex];

        if (event.stopBgm) {
            this.bgm.pause();
        }
        if (event.bgm) {
            this.playAudio(this.bgm, event.bgm);
        }

        if (event.type === 'sfx' && event.src) {
            this.playAudio(this.sfx, event.src);
            this.nextEvent();
            return;
        }

        switch (event.type) {
            case 'bg':
                if (event.bgm) {
                    this.playAudio(this.bgm, event.bgm, true);
                }
                const hint = document.getElementById('location-hint');
                if (event.location) {
                    hint.textContent = event.location;
                    hint.classList.add('show');
                    setTimeout(() => hint.classList.remove('show'), 3500); // Hide after 3.5 seconds
                }

                // Hide dialogue box during BG/CG change
                this.hideDialogueBox();
                this.vnChars.innerHTML = ''; // Hide characters on bg change
                delete this.vnChars.dataset.currentChar;

                const newBgUrl = event.src ? `url('${this.resolveAsset(event.src)}')` : 'none';

                if (this.isSkip) {
                    this.vnBg.style.backgroundImage = newBgUrl;
                    this.vnBgOverlay.style.opacity = 0;
                    this.nextEvent();
                } else {
                    const currentVisBg = (this.vnBgOverlay.style.opacity == 1) ? this.vnBgOverlay.style.backgroundImage : this.vnBg.style.backgroundImage;

                    const isOldEmpty = (!currentVisBg || currentVisBg === 'none');
                    const isNewEmpty = (newBgUrl === 'none');

                    // Crossfade logic
                    if (!this.justFaded && currentVisBg !== newBgUrl && !(isOldEmpty && isNewEmpty)) {
                        if (isNewEmpty) {
                            // Fading to black: put current image on overlay, clear background, fade out overlay
                            this.vnBg.style.backgroundImage = 'none';
                            this.vnBgOverlay.style.transition = 'none';
                            this.vnBgOverlay.style.backgroundImage = currentVisBg;
                            this.vnBgOverlay.style.opacity = 1;

                            void this.vnBgOverlay.offsetWidth;
                            this.vnBgOverlay.style.transition = 'opacity 1.5s ease-in-out';
                            this.vnBgOverlay.style.opacity = 0;

                            setTimeout(() => this.nextEvent(), event.location ? 2500 : 1500);
                        } else {
                            // Fading to a new image
                            this.vnBg.style.backgroundImage = isOldEmpty ? 'none' : currentVisBg;
                            this.vnBgOverlay.style.transition = 'none';
                            this.vnBgOverlay.style.backgroundImage = newBgUrl;
                            this.vnBgOverlay.style.opacity = 0;

                            void this.vnBgOverlay.offsetWidth;
                            this.vnBgOverlay.style.transition = 'opacity 1.5s ease-in-out';
                            this.vnBgOverlay.style.opacity = 1;

                            setTimeout(() => {
                                setTimeout(() => this.nextEvent(), event.location ? 1000 : 0);
                            }, 1500);
                        }
                    } else {
                        this.vnBg.style.backgroundImage = newBgUrl;
                        this.vnBgOverlay.style.transition = 'none';
                        this.vnBgOverlay.style.opacity = 0;
                        this.justFaded = false;
                        setTimeout(() => this.nextEvent(), event.location ? 2500 : 0);
                    }
                }
                break;
            case 'show_char':
            case 'char':
                const lastCharName = this.vnChars.dataset.currentChar;
                const isSameChar = lastCharName === event.name;

                // User requested exclusive screen for characters
                this.vnChars.innerHTML = '';
                
                const imgSrc = event.src || event.sprite;
                if (imgSrc) {
                    const img = document.createElement('img');
                    img.src = this.resolveAsset(imgSrc);
                    img.className = isSameChar ? 'character-sprite' : 'character-sprite fade-in';
                    this.vnChars.appendChild(img);
                    this.vnChars.dataset.currentChar = event.name;
                } else {
                    delete this.vnChars.dataset.currentChar;
                }
                this.nextEvent();
                break;
            case 'hide_char':
                this.vnChars.innerHTML = '';
                delete this.vnChars.dataset.currentChar;
                this.nextEvent();
                break;
            case 'dialogue':
                this.showDialogueBox();
                this.vnName.textContent = event.name;

                // Set character specific colors
                const colorConfig = this.charColors[event.name] || { bg: '#ffffff', text: '#2c3e50' };
                this.vnName.style.backgroundColor = colorConfig.bg;
                this.vnName.style.borderColor = colorConfig.bg;
                this.vnName.style.color = colorConfig.text;

                // Set Voice
                if (event.voice) {
                    this.playAudio(this.voice, event.voice);
                }

                // Add to Log
                this.dialogueLog.push({
                    name: event.name,
                    text: event.text,
                    voice: event.voice
                });

                if (event.avatar) {
                    this.vnAvatar.style.backgroundImage = `url('${this.resolveAsset(event.avatar)}')`;
                    this.vnAvatar.style.display = 'block';
                    this.vnDialogBox.style.paddingLeft = '155px'; // ensure no text overlap
                    this.vnName.style.left = '110px'; // Name tag slides behind avatar's right edge
                } else {
                    this.vnAvatar.style.display = 'none';
                    this.vnDialogBox.style.paddingLeft = '25px';
                    this.vnName.style.left = '25px'; // Standard position
                }
                this.typeText(event.text);
                break;
            case 'transition':
                this.vnChars.innerHTML = ''; // Hide characters on transition
                delete this.vnChars.dataset.currentChar;
                if (event.to === 'CHAT') {
                    if (event.fade) {
                        const fadeScreen = document.getElementById('fade-screen');
                        document.getElementById('fade-text').innerHTML = "";
                        fadeScreen.classList.add('active');
                        setTimeout(() => {
                            this.showScreen('chat');
                            this.chatSystem.showChatList();
                            this.justFaded = true;
                            this.nextEvent();
                            setTimeout(() => fadeScreen.classList.remove('active'), 100);
                        }, 800); // Wait for fade in
                    } else {
                        this.showScreen('chat');
                        this.chatSystem.showChatList();
                        if (this.isSkip) this.nextEvent();
                        else setTimeout(() => this.nextEvent(), 1000);
                    }
                } else if (event.to === 'VN') {
                    if (event.fade) {
                        const fadeScreen = document.getElementById('fade-screen');
                        document.getElementById('fade-text').innerHTML = "";
                        fadeScreen.classList.add('active');
                        if (this.isSkip) {
                            this.showScreen('vn');
                            this.justFaded = true;
                            fadeScreen.classList.remove('active');
                            this.nextEvent();
                        } else {
                            setTimeout(() => {
                                this.showScreen('vn');
                                this.justFaded = true;
                                this.nextEvent();
                                setTimeout(() => fadeScreen.classList.remove('active'), 100);
                            }, 800); // Wait 0.8s for screen to become fully black
                        }
                    } else {
                        this.showScreen('vn');
                        if (this.isSkip) this.nextEvent();
                        else setTimeout(() => this.nextEvent(), 1000);
                    }
                }
                break;
            case 'chat_msg':
                this.hideDialogueBox();
                this.chatSystem.handleIncomingMessage(event);
                break;
            case 'chat_type':
                this.hideDialogueBox();
                this.chatSystem.simulateTyping(event);
                break;
            case 'chat_separator':
                this.hideDialogueBox();
                this.chatSystem.handleIncomingSeparator(event);
                break;
            case 'wait_for_chat':
                if (this.chatSystem.activeChatId === event.chatId) {
                    // Already in the correct chat, auto resume
                    setTimeout(() => this.nextEvent(), 500);
                } else {
                    this.waitingForChat = event.chatId;
                    this.chatSystem.updateBackBtnState();
                    // Script pauses here. Will resume in ChatSystem.showChatConversation
                }
                break;
            case 'add_forum_post':
                this.forumSystem.addForumPost(event);
                this.nextEvent();
                break;
            case 'show_forum':
                this.hideDialogueBox();
                this.forumSystem.showForum();
                break;
            case 'wait_for_forum':
                this.waitingForForum = true;
                // Script pauses here. Will resume in ForumSystem when user taps Forum Nav
                break;
            case 'wait_for_story':
                this.hideDialogueBox();
                if (this.forumSystem.currentStoryIndex >= event.index) {
                    this.nextEvent();
                } else {
                    this.waitingForStory = true;
                }
                break;
            case 'chat_tutorial':
                this.hideDialogueBox();
                this.showModal('系統引導', event.text);
                document.getElementById('modal-close').onclick = () => {
                    document.getElementById('modal-close').onclick = null;
                    document.getElementById('system-modal').classList.remove('active');
                    this.nextEvent();
                };
                break;
            case 'delay':
                if (this.isSkip) {
                    this.nextEvent();
                } else {
                    setTimeout(() => this.nextEvent(), event.time * 1000);
                }
                break;
            case 'chat_qte_delete':
                this.hideDialogueBox();
                this.chatSystem.startQTEDelete(event);
                break;
            case 'chat_qte_academic':
                this.chatSystem.startQTEAcademic(event);
                break;
            case 'forum_sanity_qte':
                this.forumSystem.startForumSanityQTE(event);
                break;
            case 'end_day':
                localStorage.setItem('L_Chat_SaveDay', event.day + 1);
                this.startGame(event.day + 1);
                break;
            case 'fade_text':
                this.hideDialogueBox();
                const fadeScreen = document.getElementById('fade-screen');
                fadeScreen.classList.add('active');
                document.getElementById('fade-text').innerHTML = event.text;

                const waitTime = event.time ? event.time * 1000 : 8000;
                this.fadeTimer = setTimeout(() => {
                    if (this.scriptIndex >= this.currentScript.length - 1) {
                        fadeScreen.classList.remove('active');
                        setTimeout(() => this.showScreen('title'), 800);
                    } else {
                        fadeScreen.classList.remove('active');
                        setTimeout(() => this.nextEvent(), 800);
                    }
                }, this.isSkip ? 100 : waitTime);
                break;

            case 'show_bottom_nav':
                const bNav = document.getElementById('lchat-bottom-nav');
                if (bNav) bNav.style.display = 'flex';
                this.nextEvent();
                break;

            case 'show_be':
                this.showScreen('be');
                document.getElementById('btn-be-restart').onclick = () => {
                    this.resetGame();
                    this.showScreen('title');
                };
                break;
            case 'return_title':
                this.resetGame();
                this.showScreen('title');
                break;

            case 'rhythm_call_qte':
                this.hideDialogueBox();
                this.callSystem.startCall(event);
                break;
                
            case 'show_incoming_call':
                this.showScreen('call');
                const incomingUI = document.getElementById('incoming-call-ui');
                if (incomingUI) incomingUI.style.display = 'flex';
                
                const incAvatar = document.getElementById('incoming-avatar');
                if (incAvatar && event.avatar) incAvatar.style.backgroundImage = `url('${this.resolveAsset(event.avatar)}')`;
                
                const incName = document.getElementById('incoming-name');
                if (incName && event.caller) incName.textContent = event.caller;
                
                this.vnDialogBox.classList.add('call-mode');
                
                this.nextEvent();
                break;
        }
    }

    typeText(text) {
        if (this.typeTimer) clearTimeout(this.typeTimer);
        this.isTyping = true;
        this.vnText.innerHTML = '';

        if (this.isSkip) {
            this.vnText.innerHTML = text;
            this.isTyping = false;
            this.autoTimer = setTimeout(() => this.nextEvent(), 100);
            return;
        }

        let i = 0;
        const type = () => {
            if (i < text.length) {
                const char = text.charAt(i);
                this.vnText.innerHTML += char;
                i++;

                let delay = (11 - this.textSpeedValue) * 8; // base speed: value 6 -> 40ms. value 10 -> 8ms
                if (char === '。' || char === ',') {
                    delay += 80;
                } else if (char === '！' || char === '？' || char === '；' || char === '……') {
                    delay += 150;
                }

                this.typeTimer = setTimeout(type, delay);
            } else {
                this.isTyping = false;
                if (this.isSkip) {
                    this.autoTimer = setTimeout(() => this.nextEvent(), 100);
                }
            }
        };
        type();
    }

    playAudio(player, src) {
        // Stop current if playing
        player.pause();
        player.src = this.resolveAsset(src);
        player.play().catch(e => console.log("Audio play blocked by browser policy"));
    }

    playSound(src) {
        const audio = new Audio(this.resolveAsset(src));
        audio.play().catch(e => { });
    }

    resolveAsset(path) {
        if (!path) return path;
        if (this.assetMode === 'online' && path.startsWith('assets/')) {
            const parts = path.split('/');
            const encodedParts = parts.map(p => encodeURIComponent(p));
            return this.assetBaseUrl + encodedParts.join('/');
        }
        return path;
    }

    showModal(title, msg) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = msg;
        const modal = document.getElementById('system-modal');

        // Setup default close button behavior
        const closeBtn = document.getElementById('modal-close');
        closeBtn.onclick = () => {
            modal.classList.remove('active');
            closeBtn.onclick = null;
        };

        modal.classList.remove('hidden');
        modal.classList.add('active');
    }

}

