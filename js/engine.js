class GameEngine {
    constructor() {
        this.screens = {
            mode: document.getElementById('mode-screen'),
            title: document.getElementById('title-screen'),
            vn: document.getElementById('vn-screen'),
            chat: document.getElementById('chat-screen'),
            be: document.getElementById('be-screen'),
            fade: document.getElementById('fade-screen')
        };
        
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
        
        this.chatHistory = document.getElementById('chat-history');
        this.chatInputText = document.getElementById('chat-input-text');
        
        this.qteOverlay = document.getElementById('qte-overlay');
        this.qteTimerFill = document.querySelector('.qte-timer-fill');
        this.qteInstruction = document.getElementById('qte-instruction');
        this.qteOptions = document.getElementById('qte-options');
        this.qteBackspaceBtn = document.getElementById('qte-backspace-btn');
        
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

        document.getElementById('btn-start').addEventListener('click', () => this.startGame(1));
        document.getElementById('btn-load').addEventListener('click', () => {
            const savedStateStr = localStorage.getItem('L_Chat_SaveState');
            if (savedStateStr) {
                try {
                    const savedState = JSON.parse(savedStateStr);
                    this.loadGame(savedState);
                } catch(e) {
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
            // Turn off Skip on manual interaction
            if (this.isSkip) {
                this.isSkip = false;
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
            const drawer = document.getElementById('settings-drawer');
            drawer.classList.remove('open');
            
            const savedStateStr = localStorage.getItem('L_Chat_SaveState');
            if (savedStateStr) {
                try {
                    const savedState = JSON.parse(savedStateStr);
                    this.loadGame(savedState);
                } catch(e) {
                    this.showModal('錯誤', '存檔資料損毀。');
                }
            } else {
                this.showModal('提示', '沒有找到存檔紀錄。');
            }
        });

        document.getElementById('chat-send-btn').addEventListener('click', () => {
            if (this.waitingForSend) {
                this.waitingForSend = false;
                this.chatInputText.textContent = '';
                document.getElementById('chat-send-btn').classList.remove('pulse-highlight');
                
                // Modify the next chat_msg event to match the exact text chosen
                let offset = 1;
                let nextEvt = this.currentScript[this.scriptIndex + offset];
                // Look ahead for the actual chat_msg from Hugo
                while (nextEvt && nextEvt.type !== 'chat_msg') {
                    offset++;
                    nextEvt = this.currentScript[this.scriptIndex + offset];
                }
                if (nextEvt && nextEvt.sender === '雨果') {
                    nextEvt.text = this.pendingSendText;
                }
                
                this.nextEvent();
            }
        });

        document.getElementById('modal-close').addEventListener('click', () => {
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
            
            const state = {
                day: this.currentDay,
                index: this.scriptIndex,
                bg: this.vnBg.style.backgroundImage,
                chars: this.vnChars.innerHTML,
                bgm: this.bgm.src,
                history: this.chatHistory.innerHTML,
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
                voiceBtn.onclick = () => this.playSound(log.voice);
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
        this.screens[screenName].classList.add('active');
        
        if (screenName === 'title') {
            this.resetGame();
        }
    }

    resetGame() {
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
        
        if (this.countdownAudio) {
            this.countdownAudio.pause();
            this.countdownAudio = null;
        }
        
        if (this.qteKeydownHandler) {
            document.removeEventListener('keydown', this.qteKeydownHandler);
            this.qteKeydownHandler = null;
        }
        
        this.vnChars.innerHTML = '';
        this.chatHistory.innerHTML = '';
        this.vnDialogBox.classList.add('hidden');
        this.qteOverlay.classList.remove('active');
        this.qteOverlay.classList.remove('spore-glitch');
    }

    startGame(day) {
        this.currentDay = day;
        if (day === 1 && typeof Day1Script !== 'undefined') {
            this.currentScript = Day1Script;
        } else {
            this.showModal('錯誤', `Day ${day} 尚未實裝。`);
            return;
        }
        
        this.scriptIndex = -1;
        this.showScreen('vn');
        this.nextEvent();
    }

    loadGame(state) {
        this.currentDay = state.day;
        if (this.currentDay === 1 && typeof Day1Script !== 'undefined') {
            this.currentScript = Day1Script;
        } else {
            this.showModal('錯誤', '找不到對應章節的劇本。');
            return;
        }
        
        this.resetGame();
        
        // Restore state
        this.vnBg.style.backgroundImage = state.bg || '';
        this.vnChars.innerHTML = state.chars || '';
        this.chatHistory.innerHTML = state.history || '';
        if (state.log) {
            try {
                this.dialogueLog = JSON.parse(state.log);
            } catch(e) {}
        }
        
        if (state.bgm && state.bgm !== '') {
            this.bgm.src = state.bgm;
            this.bgm.play().catch(e => console.log('Audio load failed', e));
        }
        
        // Let it start from the exact index
        this.scriptIndex = state.index - 1;
        
        // Check current screen based on next event
        const nextEvt = this.currentScript[this.scriptIndex + 1];
        if (nextEvt && (nextEvt.type === 'chat_msg' || nextEvt.type === 'chat_tutorial')) {
            this.showScreen('chat');
        } else {
            this.showScreen('vn');
        }
        
        this.nextEvent();
    }

    nextEvent() {
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
                // Location Hint
                if (event.location) {
                    const hint = document.getElementById('location-hint');
                    hint.textContent = event.location;
                    hint.classList.add('show');
                    setTimeout(() => hint.classList.remove('show'), 3500); // Hide after 3.5 seconds
                }

                // Fade out dialogue box during BG/CG change
                this.vnDialogBox.style.opacity = '0';
                this.vnDialogBox.style.pointerEvents = 'none';
                this.vnChars.innerHTML = ''; // Hide characters on bg change
                
                // Crossfade logic
                if (this.vnBg.style.backgroundImage) {
                    this.vnBgOverlay.style.backgroundImage = `url('${this.resolveAsset(event.src)}')`;
                    this.vnBgOverlay.style.opacity = 1;
                    setTimeout(() => {
                        this.vnBg.style.backgroundImage = `url('${this.resolveAsset(event.src)}')`;
                        this.vnBgOverlay.style.opacity = 0;
                        setTimeout(() => this.nextEvent(), event.location ? 1000 : 0);
                    }, 1500); // Wait for transition
                } else {
                    this.vnBg.style.backgroundImage = `url('${this.resolveAsset(event.src)}')`;
                    setTimeout(() => this.nextEvent(), event.location ? 2500 : 0);
                }
                break;
            case 'char':
                this.vnChars.innerHTML = '';
                const img = document.createElement('img');
                img.src = this.resolveAsset(event.src);
                img.className = 'character-sprite fade-in';
                this.vnChars.appendChild(img);
                this.nextEvent();
                break;
            case 'dialogue':
                this.vnDialogBox.classList.remove('hidden');
                this.vnDialogBox.style.opacity = '1';
                this.vnDialogBox.style.pointerEvents = 'auto';
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
                if (event.to === 'CHAT') {
                    this.showScreen('chat');
                    setTimeout(() => this.nextEvent(), 1000);
                }
                break;
            case 'chat_msg':
                this.vnDialogBox.classList.add('hidden');
                
                if (event.sender === '雨果' || this.chatHistory.children.length === 0) {
                    this.addChatMessage(event.sender, event.avatar, event.text, event.sender === '雨果');
                    this.playSound('assets/audio/sfx/收到訊息.mp3');
                    this.chatTimer1 = setTimeout(() => this.nextEvent(), 1500);
                } else {
                    // Show "typing..."
                    const typingIndicator = document.createElement('div');
                    typingIndicator.className = 'chat-msg other';
                    typingIndicator.innerHTML = `
                        <div class="msg-avatar" style="background-image: url('${event.avatar}')"></div>
                        <div class="msg-bubble typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    `;
                    this.chatHistory.appendChild(typingIndicator);
                    this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
                    
                    // Delay based on text length (simulating typing speed)
                    const typingTime = Math.min(Math.max(event.text.length * 100, 1000), 3000);
                    
                    this.chatTimer2 = setTimeout(() => {
                        if(this.chatHistory.contains(typingIndicator)) {
                            this.chatHistory.removeChild(typingIndicator);
                        }
                        this.addChatMessage(event.sender, event.avatar, event.text, false);
                        this.playSound('assets/audio/sfx/收到訊息.mp3');
                        this.chatTimer1 = setTimeout(() => this.nextEvent(), 1500);
                    }, typingTime);
                }
                break;
            case 'chat_tutorial':
                this.vnDialogBox.classList.add('hidden');
                this.showModal('系統引導', event.text);
                document.getElementById('modal-close').onclick = () => {
                    document.getElementById('modal-close').onclick = null;
                    document.getElementById('system-modal').classList.remove('active');
                    this.nextEvent();
                };
                break;
            case 'chat_qte_delete':
                this.vnDialogBox.classList.add('hidden');
                this.startQTEDelete(event);
                break;
            case 'chat_qte_academic':
                this.startQTEAcademic(event);
                break;
            case 'end_day':
                localStorage.setItem('L_Chat_SaveDay', event.day + 1);
                this.showModal('章節完成', `Day ${event.day} 結束！遊戲已自動存檔。`);
                document.getElementById('modal-close').onclick = () => {
                    document.getElementById('modal-close').onclick = null;
                    document.getElementById('system-modal').classList.remove('active');
                    this.showScreen('title');
                };
                break;
            case 'fade_text':
                this.vnDialogBox.classList.add('hidden');
                this.showScreen('fade');
                document.getElementById('fade-text').innerHTML = event.text;
                this.fadeTimer = setTimeout(() => {
                    if (this.scriptIndex >= this.currentScript.length - 1) {
                        this.showScreen('title');
                    } else {
                        this.nextEvent();
                    }
                }, 8000); // Wait 8 seconds to allow staggered animations to finish
                break;
                
            case 'show_be':
                this.showScreen('be');
                document.getElementById('btn-be-restart').onclick = () => {
                    this.resetGame();
                    this.showScreen('title');
                };
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

    addChatMessage(name, avatar, text, isSelf) {
        avatar = this.resolveAsset(avatar);
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

    startQTEDelete(event) {
        clearTimeout(this.chatTimer1);
        clearTimeout(this.chatTimer2);
        clearTimeout(this.autoTimer);
        clearTimeout(this.typeTimer);
        
        if (this.isSkip) {
            this.isSkip = false;
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
        this.countdownAudio = new Audio(this.resolveAsset('assets/audio/sfx/倒計時.mp3'));
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
                this.playSound('assets/audio/sfx/按鍵音效.mp3');
                
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
            document.getElementById('chat-send-btn').classList.add('pulse-highlight');
        };

        this.qteKeydownHandler = (e) => {
            if (e.key === 'Backspace') {
                deleteAction();
            }
        };
        
        document.addEventListener('keydown', this.qteKeydownHandler);
        this.qteBackspaceBtn.onclick = deleteAction;
    }

    startQTEAcademic(event) {
        if (this.isSkip) {
            this.isSkip = false;
        }
        
        this.qteOverlay.classList.add('active');
        this.qteOverlay.classList.add('spore-glitch');
        this.qteBackspaceBtn.style.display = 'none';
        this.qteOptions.style.display = 'block';
        this.qteInstruction.textContent = event.question;
        
        this.qteOptions.innerHTML = '';
        event.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'qte-option-btn';
            btn.textContent = opt.text;
            btn.onclick = () => {
                clearInterval(this.qteInterval);
                this.qteOverlay.classList.remove('active');
                this.qteOverlay.classList.remove('spore-glitch');
                this.chatHistory.style.filter = "none";
                if (opt.correct) {
                    this.nextEvent();
                } else {
                    this.qteFail("艾薇：你的腦波異常集中在繁殖相關的區域，需要去保健室嗎？");
                }
            };
            this.qteOptions.appendChild(btn);
        });
        
        // Background hallucination effect can be added to chat UI here
        this.chatHistory.style.filter = "hue-rotate(90deg) blur(2px)";
        
        let timeLeft = event.time;
        this.qteTimerFill.style.width = '100%';
        
        const updateTimer = () => {
            timeLeft -= 0.1;
            this.qteTimerFill.style.width = `${(timeLeft / event.time) * 100}%`;
            if (timeLeft <= 0) {
                clearInterval(this.qteInterval);
                this.qteFail("大腦當機了...");
            }
        };
        
        this.qteInterval = setInterval(updateTimer, 100);
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
        
        // Implement Lucas reply failure branch
        this.qteOverlay.classList.remove('active');
        this.qteOverlay.classList.remove('spore-glitch');
        document.getElementById('qte-draft-display').style.display = 'none';
        
        // Clear history so failure looks clean? Optional.
        
        // Send the bad draft text!
        const badDraft = this.currentScript[this.scriptIndex].draft || "發送了失敗的訊息...";
        this.addChatMessage('雨果', 'assets/img/chat_img/聊天頭像_雨果.png', badDraft, true);
        
        this.currentScript = [
            { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "雨果？你傳的這是什麼意思？" },
            { type: "dialogue", name: "雨果", text: "不……不小心按出去了……完蛋了……", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
            { type: "bg", src: "" },
            { type: "dialogue", name: "旁白", text: "我眼前一黑，隔天，我再也沒去學校。" },
            { type: "show_be" }
        ];
        
        this.scriptIndex = -1;
        this.qteFailTimer = setTimeout(() => this.nextEvent(), 1500);
    }

    playAudio(player, src) {
        // Stop current if playing
        player.pause();
        player.src = this.resolveAsset(src);
        player.play().catch(e => console.log("Audio play blocked by browser policy"));
    }

    playSound(src) {
        const audio = new Audio(this.resolveAsset(src));
        audio.play().catch(e => {});
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
        modal.classList.remove('hidden');
        modal.classList.add('active');
    }
}
