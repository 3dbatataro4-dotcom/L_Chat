class ForumSystem {
    constructor(engine) {
        this.engine = engine;
        this.forumData = [];
        this.currentStoryIndex = 0;

        // DOM Elements
        this.forumView = document.getElementById('forum-view');
        this.navForum = document.getElementById('nav-forum');
        this.navChat = document.getElementById('nav-chat');
        this.chatListView = document.getElementById('chat-list-view');
        this.chatConversationView = document.getElementById('chat-conversation-view');

        // Feed & Story Elements
        this.forumFeed = document.getElementById('forum-feed');
        this.storyImage = document.getElementById('story-image');
        this.storyImageBg = document.getElementById('story-image-bg');
        this.barsContainer = document.getElementById('story-progress-bars');
        this.storyAuthorAvatar = document.getElementById('story-avatar');
        this.storyAuthorName = document.getElementById('story-author');
        this.storyTime = document.getElementById('story-time'); // This might not exist in HTML, that's okay
        this.storyText = document.getElementById('story-text');

        // Navigation Elements
        this.storyNavLeft = document.getElementById('story-nav-left');
        this.storyNavRight = document.getElementById('story-nav-right');

        this.initDOM();
    }

    initDOM() {
        if (this.navForum) {
            this.navForum.addEventListener('click', () => {
                if (this.navChat) this.navChat.classList.remove('active');
                this.navForum.classList.add('active');
                if (this.chatListView) this.chatListView.classList.remove('active');
                if (this.chatConversationView) this.chatConversationView.classList.remove('active');

                this.forumView.classList.add('active');
                this.forumView.style.display = 'flex';

                if (this.forumData.length > 0) {
                    this.renderStory();
                } else {
                    this.renderForum();
                }

                // If the script is waiting for the user to open the forum
                if (this.engine.waitingForForum) {
                    this.engine.waitingForForum = false;
                    this.engine.nextEvent();
                }
            });
        }

        // Swipe support for story navigation
        let touchStartX = 0;
        let touchEndX = 0;

        if (this.forumView) {
            this.forumView.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.forumView.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            }, { passive: true });
        }

        if (this.storyNavLeft) {
            this.storyNavLeft.addEventListener('click', (e) => {
                e.stopPropagation();
                this.prevStory();
            });
        }
        if (this.storyNavRight) {
            this.storyNavRight.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextStory();
            });
        }
    }

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        // Require at least 50px swipe distance
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swiped left -> Next Story
                this.nextStory();
            } else {
                // Swiped right -> Previous Story
                this.prevStory();
            }
        }
    }

    renderForum() {
        if (!this.forumFeed) return;
        this.forumFeed.innerHTML = '';

        // Post 1: Silvia (We will dynamically inject based on script later if needed, but keeping original structure for now)
        const post1 = document.createElement('div');
        post1.className = 'forum-post';
        post1.innerHTML = `
            <div class="forum-author-info">
                <div class="forum-author-avatar" style="background-image: url('assets/img/chat_img/聊天頭像_西爾維亞學姊.png');"></div>
                <div class="forum-author-name">西爾維亞</div>
            </div>
            <div class="forum-content">溫室。番茄。紅了。</div>
            <img src="assets/img/ui/番茄.png" class="sanity-popup-img" style="margin-bottom: 10px;">
            <div class="forum-actions">
                <div class="forum-action-btn">❤️ <span>24</span></div>
                <div class="forum-action-btn">💬 <span>3</span></div>
            </div>
        `;
        this.forumFeed.appendChild(post1);

        // Post 2: Anonymous (Lucas)
        const post2 = document.createElement('div');
        post2.className = 'forum-post';
        post2.id = 'forum-post-anonymous';
        post2.innerHTML = `
            <div class="forum-author-info">
                <div class="forum-author-avatar" style="background-color: #555;"></div>
                <div class="forum-author-name">匿名同學</div>
            </div>
            <div class="forum-content"><</div>
            <div class="forum-actions">
                <div class="forum-action-btn" id="anon-like-btn">❤️ <span id="anon-like-count">102</span></div>
                <div class="forum-action-btn">💬 <span>15</span></div>
            </div>
        `;
        this.forumFeed.appendChild(post2);
    }

    addForumPost(event) {
        this.forumData.push(event);
    }

    showForum() {
        this.engine.showScreen('chat');
        if (this.navChat) this.navChat.classList.remove('active');
        if (this.navForum) this.navForum.classList.add('active');
        if (this.chatListView) this.chatListView.classList.remove('active');
        if (this.chatConversationView) this.chatConversationView.classList.remove('active');

        if (this.forumView) {
            this.forumView.classList.add('active');
            this.forumView.style.display = 'flex';
        }

        this.currentStoryIndex = 0;
        this.renderStory();
    }

    renderStory() {
        if (!this.forumData || this.forumData.length === 0) return;

        const post = this.forumData[this.currentStoryIndex];

        if (this.storyImage) this.storyImage.src = this.engine.resolveAsset(post.img);
        if (this.storyImageBg) this.storyImageBg.src = this.engine.resolveAsset(post.img);
        if (this.storyAuthorName) this.storyAuthorName.textContent = post.author || "匿名";
        if (this.storyTime) this.storyTime.textContent = post.time || "剛剛";
        if (this.storyText) this.storyText.innerHTML = post.text || "";

        if (post.avatar && this.storyAuthorAvatar) {
            this.storyAuthorAvatar.style.backgroundImage = `url('${this.engine.resolveAsset(post.avatar)}')`;
        }

        if (this.barsContainer) {
            this.barsContainer.innerHTML = '';
            for (let i = 0; i < this.forumData.length; i++) {
                const bar = document.createElement('div');
                bar.className = 'story-progress-bar';
                if (i < this.currentStoryIndex) bar.classList.add('completed');
                if (i === this.currentStoryIndex) bar.classList.add('active');
                this.barsContainer.appendChild(bar);
            }
        }
    }

    nextStory() {
        const post = this.forumData[this.currentStoryIndex];
        if (post && post.isQte) return;

        if (this.currentStoryIndex < this.forumData.length - 1) {
            this.currentStoryIndex++;
            this.renderStory();

            if (this.engine.waitingForStory) {
                const currentEvent = this.engine.currentScript[this.engine.scriptIndex];
                if (currentEvent && currentEvent.type === 'wait_for_story' && this.currentStoryIndex >= currentEvent.index) {
                    this.engine.waitingForStory = false;
                    this.engine.nextEvent();
                }
            }
        }
    }

    prevStory() {
        const post = this.forumData[this.currentStoryIndex];
        if (post && post.isQte) return;

        if (this.currentStoryIndex > 0) {
            this.currentStoryIndex--;
            this.renderStory();
        }
    }

    startForumSanityQTE(event) {
        const overlay = document.getElementById('qte-forum-sanity');
        if (!overlay) return;

        overlay.classList.remove('hidden');

        const progressFill = document.getElementById('sanity-progress-fill');
        const holdBtn = document.getElementById('sanity-hold-btn');
        const bubblesContainer = document.getElementById('sanity-bubbles-container');

        // Hide hold button and text as we are doing popups now
        if (holdBtn) holdBtn.style.display = 'none';

        const instruction = document.querySelector('.sanity-instruction');
        if (instruction) instruction.textContent = '關閉所有危險發言彈窗！';

        const startGame = () => {
            let timeLeft = event.time || 10;
            let isFinished = false;
            let popupCount = 0;
            let maxPopups = 5; // Game over if more than 5 popups exist

            const tickAudio = new Audio(this.engine.resolveAsset('assets/audio/sfx/倒計時.mp3'));
            tickAudio.loop = true;
            tickAudio.play().catch(e => console.warn('Tick audio failed', e));

            const winQTE = () => {
                if (isFinished) return;
                isFinished = true;
                tickAudio.pause();
                clearInterval(this.sanityTimer);
                clearInterval(this.sanityProgressTimer);
                overlay.classList.add('hidden');

                if (bubblesContainer) bubblesContainer.innerHTML = '';
                if (holdBtn) holdBtn.style.display = 'flex'; // restore for future

                this.engine.nextEvent();
            };

            const loseQTE = () => {
                if (isFinished) return;
                isFinished = true;
                tickAudio.pause();
                clearInterval(this.sanityTimer);
                clearInterval(this.sanityProgressTimer);
                overlay.classList.add('hidden');
                if (bubblesContainer) bubblesContainer.innerHTML = '';

                if (holdBtn) holdBtn.style.display = 'flex'; // restore

                this.engine.currentScript = [
                    { type: "dialogue", name: "系統", text: "你滑倒了，留下了公開的痴漢留言。" },
                    { type: "transition", to: "CHAT" },
                    { type: "chat_msg", sender: "盧卡斯", avatar: "assets/img/chat_img/聊天頭像_盧卡斯.png", text: "雨果...你還好嗎？你怎麼在西爾維亞的動態下面留言說要...呃...算了。", targetChat: "lucas" },
                    { type: "wait_for_chat", chatId: "lucas" },
                    { type: "delay", time: 3.5 },
                    { type: "transition", to: "VN" },
                    { type: "dialogue", name: "雨果", text: "（不......我到底發了什麼......）", avatar: "assets/img/cha/雨果_頭像_絕望.png", voice: "assets/audio/voice/雨果_驚嚇.wav" },
                    { type: "dialogue", name: "雨果", text: "（我要轉學......不，我要離開這個國家......）", avatar: "assets/img/cha/雨果_頭像_絕望.png" },
                    { type: "dialogue", name: "雨果", text: "（這下徹底社會性死亡了......）", avatar: "assets/img/cha/雨果_頭像_絕望.png" },
                    { type: "show_be" }
                ];
                this.engine.scriptIndex = -1;
                this.engine.nextEvent();
            };

            this.sanityProgressTimer = setInterval(() => {
                if (isFinished) return;
                timeLeft -= 0.1;
                if (progressFill) {
                    progressFill.style.width = `${(timeLeft / (event.time || 10)) * 100}%`;
                }
                if (timeLeft <= 0) {
                    const activePopups = Array.from(bubblesContainer.children).filter(c => !c.classList.contains('closing')).length;
                    if (activePopups > 1) {
                        loseQTE();
                    } else {
                        winQTE();
                    }
                }
            }, 100);

            this.sanityTimer = setInterval(() => {
                if (isFinished) return;

                // Stop spawning if already lots of popups, just to prevent DOM overflow
                if (popupCount >= 10) {
                    return;
                }

                const popup = document.createElement('div');
                popup.style.position = 'absolute';
                popup.style.width = '240px';
                popup.style.background = 'rgba(255, 255, 255, 0.95)';
                popup.style.borderRadius = '12px';
                popup.style.boxShadow = '0 10px 25px rgba(255,0,0,0.6)';
                popup.style.display = 'flex';
                popup.style.flexDirection = 'column';
                popup.style.pointerEvents = 'auto';
                popup.style.overflow = 'hidden';
                popup.style.zIndex = '10';
                popup.style.borderLeft = '6px solid #e74c3c';
                popup.style.maxWidth = '85%'; // prevent horizontal overflow

                const top = Math.random() * 60 + 10;
                const left = Math.random() * 15 + 5; // keep left side bounded to prevent right cutoff
                popup.style.top = `${top}%`;
                popup.style.left = `${left}%`;

                const dangerousTexts = [
                    "好帥……想舔……",
                    "盧卡斯學長的喉結……好性感……",
                    "如果能被那雙手撫摸的話……",
                    "好想成為那瓶水……"
                ];
                const textToSay = dangerousTexts[Math.floor(Math.random() * dangerousTexts.length)];

                popup.innerHTML = `
                <div style="background: #e74c3c; color: white; padding: 5px 10px; font-weight: bold; font-size: 0.9rem; display: flex; justify-content: space-between;">
                    <span>⚠️ 警告</span>
                    <button class="popup-close-btn" style="background: none; border: none; color: white; cursor: pointer; font-size: 1rem; padding: 0;">✖</button>
                </div>
                <div style="padding: 15px 10px; text-align: center; color: #333; font-weight: bold;">
                    「${textToSay}」
                </div>
                <img src="assets/img/ui/番茄.png" style="width: 100%; display: none;">
            `;

                // Add jitter effect with bounce in
                popup.style.transform = 'scale(0)';
                popup.style.animation = 'popInBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, popup-shake 0.3s infinite 0.4s';

                const closeBtn = popup.querySelector('.popup-close-btn');
                closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (bubblesContainer && bubblesContainer.contains(popup) && !popup.classList.contains('closing')) {
                        popup.classList.add('closing');
                        this.engine.playSound('assets/audio/sfx/按鍵音效.mp3');
                        popupCount--;
                        popup.style.animation = 'popOutShrink 0.2s ease-in forwards';
                        setTimeout(() => {
                            if (bubblesContainer.contains(popup)) {
                                bubblesContainer.removeChild(popup);
                            }
                        }, 200);
                    }
                };

                if (bubblesContainer) {
                    bubblesContainer.appendChild(popup);
                    popupCount++;
                }
            }, 1200); // Popup every 1.2s
        };

        this.engine.showModal('操作教學', '這是一場理智攻防戰！<br><br>請在 10 秒內關閉所有出現的危險發言彈窗。<br>不要被它們影響了判斷！');

        const closeBtn = document.getElementById('modal-close');
        // Ensure any previous onclick is cleared, and use addEventListener for robustness
        closeBtn.onclick = null;
        closeBtn.addEventListener('click', () => {
            document.getElementById('system-modal').classList.remove('active');
            startGame();
        }, { once: true });
    }
}
