class CallSystem {
    constructor(engine) {
        this.engine = engine;
        this.overlay = document.getElementById('call-screen');
        this.marker = document.getElementById('rhythm-ecg-marker');
        this.subtitles = document.getElementById('rhythm-call-subtitles');
        this.breathBtn = document.getElementById('rhythm-breath-btn');
        this.avatar = document.querySelector('.call-avatar');
        this.nameText = document.querySelector('.call-name');

        this.heartRate = 10; // 0 to 100
        this.isActive = false;
        this.isFinished = false;
        this.scriptIndex = 0;
        this.currentAudio = null;
        this.loopInterval = null;
        this.timerInterval = null;
        this.elapsedSeconds = 0;
        this.currentEvent = null;
        this.callStatusText = document.querySelector('.call-status');

        this.spacebarHandler = this.spacebarHandler.bind(this);
        this.takeBreath = this.takeBreath.bind(this);

        if (this.breathBtn) {
            this.breathBtn.onclick = this.takeBreath;
        }
    }

    startCall(event) {
        if (!this.overlay || !this.marker || !this.subtitles || !this.breathBtn) {
            console.error('Rhythm Call UI missing');
            this.engine.nextEvent();
            return;
        }

        this.currentEvent = event;
        this.currentScript = event.script || [];
        this.scriptIndex = 0;

        this.engine.showScreen('call');

        this.isActive = true;
        this.isFinished = false;
        this.heartRate = 10;

        if (event.avatar && this.avatar) {
            this.avatar.style.backgroundImage = `url('${this.engine.resolveAsset(event.avatar)}')`;
            const incomingAvatar = document.getElementById('incoming-avatar');
            if (incomingAvatar) incomingAvatar.style.backgroundImage = `url('${this.engine.resolveAsset(event.avatar)}')`;
        }
        if (event.caller && this.nameText) {
            this.nameText.textContent = event.caller;
            const incomingName = document.getElementById('incoming-name');
            if (incomingName) incomingName.textContent = event.caller;
        }

        this.subtitles.textContent = '';
        this.elapsedSeconds = 0;
        this.updateTimeDisplay();

        const incomingUI = document.getElementById('incoming-call-ui');
        if (incomingUI) {
            incomingUI.style.display = 'flex';

            const acceptBtn = document.getElementById('btn-accept-call');
            const declineBtn = document.getElementById('btn-decline-call');
            const declineToast = document.getElementById('decline-toast');

            if (acceptBtn) acceptBtn.onclick = () => {
                incomingUI.style.display = 'none';
                this.engine.vnDialogBox.classList.remove('call-mode'); // Remove from incoming call
                this.beginCallLogic();
            };
            if (declineBtn) declineBtn.onclick = () => {
                if (declineToast) {
                    declineToast.style.opacity = '1';
                    setTimeout(() => { declineToast.style.opacity = '0'; }, 2000);
                }
            };
        } else {
            this.beginCallLogic();
        }
    }

    beginCallLogic() {
        // Adjust dialog box z-index so it overlays the call screen
        this.engine.vnDialogBox.classList.add('call-mode');

        document.addEventListener('keydown', this.spacebarHandler);

        this.loopInterval = setInterval(() => {
            if (this.isFinished) return;
            this.heartRate += 1.2; // Steadily creeps up
            this.updateUI();
        }, 100);

        this.timerInterval = setInterval(() => {
            if (this.isFinished) return;
            this.elapsedSeconds++;
            this.updateTimeDisplay();
        }, 1000);

        this.nextLine();
    }

    updateTimeDisplay() {
        if (!this.callStatusText) return;
        const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
        this.callStatusText.textContent = `通話中 ${mins}:${secs}`;
    }

    updateUI() {
        if (!this.marker) return;
        // Clamp heartRate between 0 and 100
        this.heartRate = Math.max(0, Math.min(100, this.heartRate));
        this.marker.style.left = `${this.heartRate}%`;

        // Adjust ECG pulse speed
        const pulseSpeed = Math.max(0.2, 1.0 - (this.heartRate / 200));
        if (this.avatar) {
            this.avatar.style.animationDuration = `${pulseSpeed}s`;
        }

        if (this.heartRate >= 95 && !this.isFinished) {
            this.loseCall();
        }
    }

    loseCall() {
        this.isActive = false;
        this.isFinished = true;
        clearInterval(this.loopInterval);
        clearInterval(this.timerInterval);
        if (this.currentAudio) this.currentAudio.pause();
        document.removeEventListener('keydown', this.spacebarHandler);

        // Restore pointer events and styling for dialog box
        this.engine.vnDialogBox.style.pointerEvents = 'auto';
        this.engine.vnDialogBox.classList.remove('call-mode');

        this.engine.currentScript = [
            { type: "transition", to: "VN" },
            { type: "dialogue", name: "雨果", text: "「學長……我、我喜歡你！我真的好喜歡你！」", avatar: "assets/img/cha/雨果_頭像_羞憤交加.png" },
            { type: "dialogue", name: "盧卡斯", text: "「……雨果？」", voice: "assets/audio/voice/day2_語音/電話_06_雨果？.wav" },
            { type: "sfx", src: "assets/audio/sfx/(SFX：掛斷電話).mp3" },
            { type: "dialogue", name: "旁白", text: "過載的交感神經讓你把內心最深處的渴望吼了出來，隨後你驚恐地掛斷了電話。" },
            { type: "dialogue", name: "旁白", text: "隔天，你在學校裡無法直視盧卡斯學長的眼睛了……" },
            { type: "show_be" }
        ];
        this.engine.scriptIndex = -1;
        this.engine.nextEvent();
    }

    winCall() {
        this.isActive = false;
        this.isFinished = true;
        clearInterval(this.loopInterval);
        clearInterval(this.timerInterval);
        if (this.currentAudio) this.currentAudio.pause();
        document.removeEventListener('keydown', this.spacebarHandler);

        // Restore pointer events and styling for dialog box
        this.engine.vnDialogBox.style.pointerEvents = 'auto';
        this.engine.vnDialogBox.classList.remove('call-mode');

        this.engine.playSound('assets/audio/sfx/(SFXï¼šå˜Ÿâ€”â€”å˜Ÿâ€”â€?é€šè©±çµ�æ�Ÿã€?.mp3');
        setTimeout(() => {

            this.engine.nextEvent();
        }, 2000);
    }

    takeBreath() {
        if (this.isFinished) return;
        this.heartRate = Math.max(0, this.heartRate - 8);
        this.updateUI();

        // Visual feedback
        this.breathBtn.style.transform = 'scale(0.95)';
        this.breathBtn.style.background = 'rgba(76, 175, 80, 0.8)';
        this.breathBtn.style.color = '#fff';
        setTimeout(() => {
            this.breathBtn.style.transform = '';
            this.breathBtn.style.background = '';
            this.breathBtn.style.color = '';
        }, 100);
    }

    spacebarHandler(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            this.takeBreath();
        }
    }

    nextLine() {
        if (this.isFinished) return;
        if (this.scriptIndex >= this.currentEvent.script.length) {
            this.winCall();
            return;
        }

        const line = this.currentEvent.script[this.scriptIndex];
        this.scriptIndex++;

        if (line.type === 'wait') {
            setTimeout(() => this.nextLine(), line.duration);
        } else if (line.type === 'voice') {
            this.subtitles.textContent = line.text || '';
            this.engine.hideDialogueBox();
            this.engine.vnDialogBox.style.pointerEvents = 'none';
            if (line.src) {
                this.currentAudio = new Audio(this.engine.resolveAsset(line.src));

                // Set up event listeners BEFORE playing
                this.currentAudio.onended = () => {
                    this.nextLine();
                };

                let playPromise = this.currentAudio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.warn('Audio play blocked or failed:', e);
                        // Fallback: wait for the duration then advance, so we don't freeze
                        setTimeout(() => this.nextLine(), line.duration || 3000);
                    });
                }

                // Spike heart rate at the start of the line
                if (line.spike) {
                    this.heartRate = Math.min(100, this.heartRate + line.spike);
                    this.updateUI();
                }
            } else {
                // Spike heart rate at the start of the line
                if (line.spike) {
                    this.heartRate = Math.min(100, this.heartRate + line.spike);
                    this.updateUI();
                }
                setTimeout(() => this.nextLine(), line.duration || 2000);
            }
        } else if (line.type === 'choice') {
            this.engine.hideDialogueBox();
            const container = document.getElementById('call-choices-container');
            if (container) {
                container.innerHTML = '';
                container.style.display = 'flex';
                line.options.forEach(opt => {
                    const btn = document.createElement('div');
                    // Style the button using inline styles to avoid adding a new CSS file dependency right now, matching Otome game aesthetics
                    btn.style.cssText = `
                        background: rgba(255, 255, 255, 0.9);
                        color: #2c3e50;
                        padding: 15px 30px;
                        border-radius: 25px;
                        font-size: 1.1rem;
                        font-weight: bold;
                        cursor: pointer;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                        transition: transform 0.2s, background 0.2s;
                        border: 2px solid #8bbdc5;
                        width: 80%;
                        text-align: center;
                    `;
                    btn.onmouseenter = () => { btn.style.background = '#8bbdc5'; btn.style.color = '#fff'; btn.style.transform = 'scale(1.05)'; };
                    btn.onmouseleave = () => { btn.style.background = 'rgba(255, 255, 255, 0.9)'; btn.style.color = '#2c3e50'; btn.style.transform = 'scale(1)'; };
                    btn.textContent = opt.text;
                    btn.onclick = () => {
                        container.style.display = 'none';
                        if (opt.action === 'win') {
                            this.nextLine();
                        } else if (opt.action === 'lose') {
                            this.loseCall();
                        } else {
                            this.nextLine();
                        }
                    };
                    container.appendChild(btn);
                });
            } else {
                this.nextLine();
            }
        } else if (line.type === 'sfx') {
            if (line.src) {
                const sfx = new Audio(this.engine.resolveAsset(line.src));
                sfx.play().catch(e => console.warn('SFX failed to play', e));
            }
            setTimeout(() => this.nextLine(), line.duration || 1000);
        } else if (line.type === 'dialogue') {
            this.engine.showDialogueBox();
            this.engine.vnDialogBox.classList.add('call-mode');
            if (this.engine.vnName) {
                this.engine.vnName.textContent = line.name || '';
                const colorConfig = this.engine.charColors && this.engine.charColors[line.name] ? this.engine.charColors[line.name] : { bg: '#ffffff', text: '#2c3e50' };
                this.engine.vnName.style.backgroundColor = colorConfig.bg;
                this.engine.vnName.style.borderColor = colorConfig.bg;
                this.engine.vnName.style.color = colorConfig.text;
            }
            if (this.engine.vnText) this.engine.vnText.innerHTML = line.text || '';

            this.engine.vnDialogBox.style.pointerEvents = 'none';
            setTimeout(() => this.nextLine(), line.duration || 1500);
        }
    }
}
