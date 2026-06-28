/* =====================================================================
 * Day 4 專屬小遊戲
 *  1. 心動妄想退散 (Swipe-to-Dismiss)  -> event.type === "swipe_dismiss_qte"
 *  2. 理智與視線的雙重防線 (Gaze Defense) -> event.type === "gaze_defense_qte"
 *
 * 這兩個小遊戲以 GameEngine.prototype 擴充方式實作，
 * 自行建立 / 銷毀所需 DOM，完成後呼叫 this.nextEvent() 接回主線。
 * 載入順序需在 engine.js 之後、main.js (new GameEngine) 之前。
 * ===================================================================== */

(function () {
    if (typeof GameEngine === 'undefined') {
        console.error('[Day4Minigames] GameEngine 尚未定義，請確認 script 載入順序。');
        return;
    }

    // ------------------------------------------------------------------
    // 小工具：建立全螢幕覆蓋層
    // ------------------------------------------------------------------
    function makeOverlay(id) {
        let el = document.getElementById(id);
        if (el) el.remove();
        el = document.createElement('div');
        el.id = id;
        el.className = 'day4-mini-overlay';
        document.getElementById('game-container').appendChild(el);
        return el;
    }

    // ==================================================================
    // 1. 心動妄想退散 (Swipe-to-Dismiss)
    // ==================================================================
    GameEngine.prototype.startSwipeDismissQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 12,
            startTemp: event.startTemp != null ? event.startTemp : 30,
            warnTemp: event.warnTemp != null ? event.warnTemp : 80,
            maxTemp: event.maxTemp != null ? event.maxTemp : 100,
            dismissCool: event.dismissCool != null ? event.dismissCool : 4,
            leakHeat: event.leakHeat != null ? event.leakHeat : 15,
            thoughts: event.thoughts || ["想靠過去……"]
        };

        const overlay = makeOverlay('swipe-dismiss-overlay');
        overlay.innerHTML = `
            <div class="sd-topbar">
                <div class="sd-title">思緒斷捨離 — 把妄想甩出螢幕！</div>
                <div class="sd-timer" id="sd-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="sd-field" id="sd-field"></div>
            <div class="sd-thermo">
                <div class="sd-thermo-label">理智<br>溫度</div>
                <div class="sd-thermo-tube">
                    <div class="sd-thermo-warn" style="bottom:${cfg.warnTemp}%;"></div>
                    <div class="sd-thermo-fill" id="sd-thermo-fill"></div>
                </div>
                <div class="sd-thermo-val" id="sd-thermo-val">30°</div>
            </div>
            <div class="sd-hint">按住妄想方塊，向左或向右快速滑開！</div>
        `;

        const field = overlay.querySelector('#sd-field');
        const timerEl = overlay.querySelector('#sd-timer');
        const thermoFill = overlay.querySelector('#sd-thermo-fill');
        const thermoVal = overlay.querySelector('#sd-thermo-val');

        let temp = cfg.startTemp;
        let blocks = [];
        let finished = false;
        let lastTs = null;
        let elapsed = 0;
        let spawnAcc = 0;
        let spawnGap = 0.9;            // 妄想生成間隔（秒）
        const swipeThreshold = 80;     // px，超過即判定甩開
        let rafId = null;

        const updateThermo = () => {
            const pct = Math.max(0, Math.min(100, temp));
            thermoFill.style.height = pct + '%';
            thermoVal.textContent = Math.round(temp) + '°';
            let color = '#4caf50';
            if (temp >= cfg.warnTemp) color = '#ff3366';
            else if (temp >= 55) color = '#ffb300';
            thermoFill.style.background = color;
            thermoVal.style.color = color;
            overlay.classList.toggle('sd-danger', temp >= cfg.warnTemp);
        };
        updateThermo();

        const cleanup = () => {
            if (rafId) cancelAnimationFrame(rafId);
            blocks.forEach(b => b.el.remove());
            blocks = [];
        };

        const winGame = () => {
            if (finished) return;
            finished = true;
            cleanup();
            const perfect = temp < cfg.warnTemp;
            overlay.innerHTML = `<div class="sd-result ${perfect ? 'win' : 'pass'}">
                <div class="sd-result-big">${perfect ? '🧊 理智冷卻成功' : '😮‍💨 勉強守住'}</div>
                <div class="sd-result-sub">最終理智溫度：${Math.round(temp)}°</div>
            </div>`;
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1400);
        };

        const loseGame = () => {
            if (finished) return;
            finished = true;
            cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="sd-result lose">
                <div class="sd-result-big">💗 理智沸騰！</div>
                <div class="sd-result-sub">妄想徹底淹沒大腦……深呼吸，再來一次！</div>
            </div>`;
            // 失敗 → 重置重玩（不進壞結局，劇情仍需成功冷卻）
            setTimeout(() => { overlay.remove(); this.startSwipeDismissQTE(event); }, 1700);
        };

        const spawnBlock = () => {
            const el = document.createElement('div');
            el.className = 'sd-block';
            el.textContent = cfg.thoughts[Math.floor(Math.random() * cfg.thoughts.length)];
            const fw = field.clientWidth;
            const bx = 10 + Math.random() * Math.max(10, fw - 180);
            // 落速與欄位高度成正比：基礎約 5.5 秒落到底，確保各種螢幕難度一致
            const baseSpeed = (field.clientHeight || 600) / 5.5;
            const block = { el, x: bx, y: -40, vx: 0, dragging: false, startX: 0, offsetX: 0, dismissed: false, speed: baseSpeed * (0.85 + Math.random() * 0.5) };
            el.style.left = bx + 'px';
            el.style.top = '-40px';
            field.appendChild(el);

            el.addEventListener('pointerdown', (e) => {
                if (finished || block.dismissed) return;
                block.dragging = true;
                block.startX = e.clientX;
                block.offsetX = 0;
                el.setPointerCapture(e.pointerId);
                el.classList.add('grabbed');
            });
            el.addEventListener('pointermove', (e) => {
                if (!block.dragging) return;
                block.offsetX = e.clientX - block.startX;
                el.style.transform = `translateX(${block.offsetX}px) rotate(${block.offsetX * 0.05}deg)`;
                el.style.opacity = Math.max(0.2, 1 - Math.abs(block.offsetX) / (swipeThreshold * 2.2));
            });
            const release = (e) => {
                if (!block.dragging) return;
                block.dragging = false;
                el.classList.remove('grabbed');
                if (Math.abs(block.offsetX) >= swipeThreshold) {
                    // 成功甩開
                    block.dismissed = true;
                    const dir = block.offsetX > 0 ? 1 : -1;
                    el.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
                    el.style.transform = `translateX(${dir * 600}px) rotate(${dir * 35}deg)`;
                    el.style.opacity = '0';
                    this.playSound('assets/audio/sfx/玻璃滑動聲.mp3');
                    temp = Math.max(0, temp - cfg.dismissCool);
                    updateThermo();
                    setTimeout(() => el.remove(), 300);
                    blocks = blocks.filter(b => b !== block);
                } else {
                    // 回彈
                    el.style.transition = 'transform 0.2s ease-out, opacity 0.2s';
                    el.style.transform = 'translateX(0) rotate(0)';
                    el.style.opacity = '1';
                    setTimeout(() => { el.style.transition = ''; }, 200);
                }
            };
            el.addEventListener('pointerup', release);
            el.addEventListener('pointercancel', release);

            blocks.push(block);
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts;
            elapsed += dt;

            // 計時
            const remain = Math.max(0, cfg.time - elapsed);
            timerEl.textContent = remain.toFixed(1) + 's';

            // 生成
            spawnAcc += dt;
            if (spawnAcc >= spawnGap) {
                spawnAcc = 0;
                spawnGap = Math.max(0.5, spawnGap - 0.03); // 越來越快
                spawnBlock();
            }

            // 落下
            const fh = field.clientHeight;
            for (const b of blocks) {
                if (b.dismissed || b.dragging) continue;
                b.y += b.speed * dt;
                b.el.style.top = b.y + 'px';
                if (b.y >= fh - 40) {
                    // 落地 → 妄想攻陷潛意識
                    b.dismissed = true;
                    temp = Math.min(cfg.maxTemp, temp + cfg.leakHeat);
                    updateThermo();
                    this.playSound('assets/audio/sfx/心跳聲.mp3');
                    b.el.classList.add('sd-leak');
                    setTimeout(() => b.el.remove(), 500);
                    blocks = blocks.filter(x => x !== b);
                    if (temp >= cfg.maxTemp) { loseGame(); return; }
                }
            }

            if (elapsed >= cfg.time) { winGame(); return; }
            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 2. 理智與視線的雙重防線 (Gaze Defense)
    // ==================================================================
    GameEngine.prototype.startGazeDefenseQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 12,
            safeTarget: event.safeTarget || 8,
            lucasSprite: event.lucasSprite || 'assets/img/cha/盧卡斯_立繪_便服_普通.png',
            hotZones: event.hotZones || [],
            safeObjects: event.safeObjects || [],
            barrage: event.barrage || ['好帥……']
        };

        const overlay = makeOverlay('gaze-defense-overlay');
        overlay.innerHTML = `
            <div class="gz-vignette" id="gz-vignette"></div>
            <img class="gz-lucas" src="${this.resolveAsset(cfg.lucasSprite)}" alt="">
            <div class="gz-topbar">
                <div class="gz-title">克制視線 — 別盯著危險區！</div>
                <div class="gz-timer" id="gz-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="gz-safebar-wrap">
                <span class="gz-safebar-label">理智專注度</span>
                <div class="gz-safebar"><div class="gz-safebar-fill" id="gz-safebar-fill"></div></div>
                <span class="gz-safebar-val" id="gz-safebar-val">0.0 / ${cfg.safeTarget.toFixed(0)}s</span>
            </div>
            <div class="gz-zones" id="gz-zones"></div>
            <div class="gz-objects" id="gz-objects"></div>
            <div class="gz-gaze" id="gz-gaze"></div>
            <div class="gz-barrage" id="gz-barrage"></div>
        `;

        const zonesWrap = overlay.querySelector('#gz-zones');
        const objWrap = overlay.querySelector('#gz-objects');
        const gaze = overlay.querySelector('#gz-gaze');
        const vignette = overlay.querySelector('#gz-vignette');
        const timerEl = overlay.querySelector('#gz-timer');
        const safeFill = overlay.querySelector('#gz-safebar-fill');
        const safeVal = overlay.querySelector('#gz-safebar-val');
        const barrageWrap = overlay.querySelector('#gz-barrage');

        // 以百分比座標 → 像素
        const pct2px = (zx, zy) => {
            const r = overlay.getBoundingClientRect();
            return { x: r.width * zx / 100, y: r.height * zy / 100 };
        };

        // 建立費洛蒙警報區
        const hotEls = cfg.hotZones.map(z => {
            const el = document.createElement('div');
            el.className = 'gz-hot';
            el.style.left = z.x + '%';
            el.style.top = z.y + '%';
            el.innerHTML = `<span>${z.label}</span>`;
            zonesWrap.appendChild(el);
            return { el, x: z.x, y: z.y };
        });

        // 建立安全觀測物
        const safeEls = cfg.safeObjects.map(o => {
            const el = document.createElement('div');
            el.className = 'gz-safe';
            el.style.left = o.x + '%';
            el.style.top = o.y + '%';
            el.textContent = o.label;
            objWrap.appendChild(el);
            return { el, x: o.x, y: o.y };
        });

        // 視線圓圈初始位置（中央偏下，安全處）
        let gx, gy;
        {
            const r = overlay.getBoundingClientRect();
            gx = r.width * 0.5;
            gy = r.height * 0.55;
        }
        let pointerActive = false;
        let pointerX = gx, pointerY = gy;

        const setGaze = (x, y) => {
            gx = x; gy = y;
            gaze.style.left = x + 'px';
            gaze.style.top = y + 'px';
        };
        setGaze(gx, gy);

        overlay.addEventListener('pointerdown', (e) => {
            pointerActive = true;
            const r = overlay.getBoundingClientRect();
            pointerX = e.clientX - r.left;
            pointerY = e.clientY - r.top;
            gaze.classList.add('grabbed');
        });
        overlay.addEventListener('pointermove', (e) => {
            if (!pointerActive) return;
            const r = overlay.getBoundingClientRect();
            pointerX = e.clientX - r.left;
            pointerY = e.clientY - r.top;
        });
        const endPointer = () => { pointerActive = false; gaze.classList.remove('grabbed'); };
        overlay.addEventListener('pointerup', endPointer);
        overlay.addEventListener('pointercancel', endPointer);
        overlay.addEventListener('pointerleave', endPointer);

        let finished = false;
        let lastTs = null;
        let elapsed = 0;
        let safeTime = 0;
        let relocAcc = 0;
        let barrageAcc = 0;
        let rafId = null;
        const gazeR = 46;     // 視線圓圈判定半徑
        const safeR = 60;     // 安全物判定半徑
        const hotR = 70;      // 警報區判定半徑

        const cleanup = () => { if (rafId) cancelAnimationFrame(rafId); };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="gz-result win">
                <div class="gz-result-big">🛡️ 視線防守成功</div>
                <div class="gz-result-sub">你撐住了 ${cfg.safeTarget.toFixed(0)} 秒的理智……勉強。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1400);
        };

        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="gz-result lose">
                <div class="gz-result-big">💗 視線淪陷……</div>
                <div class="gz-result-sub">理智專注度不足，再深呼吸一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startGazeDefenseQTE(event); }, 1700);
        };

        const relocateSafe = () => {
            safeEls.forEach(s => {
                const nx = 10 + Math.random() * 80;
                const ny = 12 + Math.random() * 76;
                s.x = nx; s.y = ny;
                s.el.style.left = nx + '%';
                s.el.style.top = ny + '%';
            });
        };

        const spawnBarrage = () => {
            const el = document.createElement('div');
            el.className = 'gz-bullet';
            el.textContent = cfg.barrage[Math.floor(Math.random() * cfg.barrage.length)];
            el.style.left = (15 + Math.random() * 60) + '%';
            el.style.top = (20 + Math.random() * 55) + '%';
            barrageWrap.appendChild(el);
            setTimeout(() => el.remove(), 1500);
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts;
            elapsed += dt;

            // 視線移動：玩家拖動 vs 孢子拉力（朝最近的費洛蒙警報區）
            let nearest = null, nd = Infinity;
            for (const h of hotEls) {
                const p = pct2px(h.x, h.y);
                const d = Math.hypot(p.x - gx, p.y - gy);
                if (d < nd) { nd = d; nearest = p; }
            }
            let nx = gx, ny = gy;
            if (pointerActive) {
                nx += (pointerX - gx) * 0.45;
                ny += (pointerY - gy) * 0.45;
            }
            if (nearest) {
                // 持續拉力，距離越近拉力越強（製造黏滯感）
                const pull = 70 * dt * (1 + Math.max(0, (180 - nd) / 180));
                const dx = nearest.x - gx, dy = nearest.y - gy;
                const len = Math.hypot(dx, dy) || 1;
                nx += dx / len * pull;
                ny += dy / len * pull;
            }
            // 邊界
            const r = overlay.getBoundingClientRect();
            nx = Math.max(gazeR, Math.min(r.width - gazeR, nx));
            ny = Math.max(gazeR + 40, Math.min(r.height - gazeR, ny));
            setGaze(nx, ny);

            // 判定：在安全物？在警報區？
            let onSafe = false;
            for (const s of safeEls) {
                const p = pct2px(s.x, s.y);
                if (Math.hypot(p.x - gx, p.y - gy) < safeR) { onSafe = true; s.el.classList.add('active'); }
                else s.el.classList.remove('active');
            }
            let onHot = false;
            for (const h of hotEls) {
                const p = pct2px(h.x, h.y);
                if (Math.hypot(p.x - gx, p.y - gy) < hotR) { onHot = true; h.el.classList.add('active'); }
                else h.el.classList.remove('active');
            }

            if (onSafe && !onHot) {
                safeTime += dt;
                gaze.classList.add('safe');
                gaze.classList.remove('danger');
            } else {
                gaze.classList.remove('safe');
            }

            // 危險回饋
            if (onHot) {
                gaze.classList.add('danger');
                vignette.style.opacity = '1';
                barrageAcc += dt;
                if (barrageAcc > 0.35) { barrageAcc = 0; spawnBarrage(); }
            } else {
                gaze.classList.remove('danger');
                vignette.style.opacity = '0';
            }

            // 安全物每 3 秒重新佈置
            relocAcc += dt;
            if (relocAcc >= 3) { relocAcc = 0; relocateSafe(); }

            // UI
            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            const sp = Math.min(1, safeTime / cfg.safeTarget);
            safeFill.style.width = (sp * 100) + '%';
            safeVal.textContent = `${safeTime.toFixed(1)} / ${cfg.safeTarget.toFixed(0)}s`;

            if (safeTime >= cfg.safeTarget) { winGame(); return; }
            if (elapsed >= cfg.time) { loseGame(); return; }
            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 3. 地心引力的誘惑 (Gravity Balance)  -> "gravity_balance_qte"
    //    巴士搖晃 + 孢子誘惑，頭部指針不斷倒向學長的肩膀（右側）。
    //    玩家依畫面指示短按 / 長按 ← → ，把指針拉回中央綠色安全區，撐滿時間。
    // ==================================================================
    GameEngine.prototype.startGravityBalanceQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 15,
            crash: event.crash != null ? event.crash : 100,   // 撞肩臨界值
            headIcon: event.headIcon || 'assets/img/cha/雨果_頭像_便服_緊張.png'
        };

        const overlay = makeOverlay('gravity-balance-overlay');
        overlay.innerHTML = `
            <div class="gb-topbar">
                <div class="gb-title">維持平衡 — 別倒向學長的肩膀！</div>
                <div class="gb-timer" id="gb-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="gb-meter">
                <div class="gb-meter-zone gb-zone-safe"></div>
                <div class="gb-meter-zone gb-zone-warn"></div>
                <div class="gb-meter-zone gb-zone-red"></div>
                <div class="gb-marker" id="gb-marker"></div>
            </div>
            <div class="gb-survive"><div class="gb-survive-fill" id="gb-survive-fill"></div></div>
            <div class="gb-stage">
                <div class="gb-shoulder">學長的<br>肩膀 💗</div>
                <div class="gb-pivot">
                    <div class="gb-beam" id="gb-beam">
                        <div class="gb-head" style="background-image:url('${this.resolveAsset(cfg.headIcon)}');"></div>
                    </div>
                    <div class="gb-base"></div>
                </div>
            </div>
            <div class="gb-instruction" id="gb-instruction">穩住……</div>
            <div class="gb-controls">
                <button class="gb-btn" id="gb-left">◀ 左</button>
                <button class="gb-btn" id="gb-right">右 ▶</button>
            </div>
        `;

        const marker = overlay.querySelector('#gb-marker');
        const beam = overlay.querySelector('#gb-beam');
        const timerEl = overlay.querySelector('#gb-timer');
        const surviveFill = overlay.querySelector('#gb-survive-fill');
        const instrEl = overlay.querySelector('#gb-instruction');
        const btnL = overlay.querySelector('#gb-left');
        const btnR = overlay.querySelector('#gb-right');

        let p = 8;          // 位置 -100(左) .. +100(右)，起始略偏右製造壓力
        let v = 0;          // 速度
        let leftHeld = false, rightHeld = false;
        let finished = false;
        let lastTs = null;
        let elapsed = 0;
        let bumpAcc = 0;
        let rafId = null;

        // --- 控制：長按持續施力，按下瞬間給一個脈衝（短按） ---
        const press = (dir) => {
            if (finished) return;
            v += dir * 14;                 // 短按脈衝
            if (dir < 0) { leftHeld = true; btnL.classList.add('active'); }
            else { rightHeld = true; btnR.classList.add('active'); }
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
        };
        const release = (dir) => {
            if (dir < 0) { leftHeld = false; btnL.classList.remove('active'); }
            else { rightHeld = false; btnR.classList.remove('active'); }
        };
        btnL.addEventListener('pointerdown', (e) => { e.preventDefault(); press(-1); });
        btnR.addEventListener('pointerdown', (e) => { e.preventDefault(); press(1); });
        btnL.addEventListener('pointerup', () => release(-1));
        btnR.addEventListener('pointerup', () => release(1));
        btnL.addEventListener('pointerleave', () => release(-1));
        btnR.addEventListener('pointerleave', () => release(1));
        btnL.addEventListener('pointercancel', () => release(-1));
        btnR.addEventListener('pointercancel', () => release(1));

        const keyDown = (e) => {
            if (e.repeat) return;
            if (e.key === 'ArrowLeft') press(-1);
            else if (e.key === 'ArrowRight') press(1);
        };
        const keyUp = (e) => {
            if (e.key === 'ArrowLeft') release(-1);
            else if (e.key === 'ArrowRight') release(1);
        };
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);

        const cleanup = () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('keydown', keyDown);
            window.removeEventListener('keyup', keyUp);
        };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="gb-result win">
                <div class="gb-result-big">😤 撐住了！</div>
                <div class="gb-result-sub">脖子的肌肉在燃燒……但你成功沒有倒向學長。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1500);
        };

        const crashGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="gb-result lose">
                <div class="gb-result-big">💗 頭歪了過去……</div>
                <div class="gb-result-sub">理智一鬆，頭就要砸上學長的肩膀！再撐一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startGravityBalanceQTE(event); }, 1700);
        };

        const setInstruction = () => {
            let txt, cls = '';
            if (p > 60) { txt = '🚨 快倒向學長了！長按【◀ 左】死命撐住！'; cls = 'danger'; }
            else if (p > 22) { txt = '向右偏了……連點【◀ 左】修正！'; cls = 'warn'; }
            else if (p < -35) { txt = '⚠️ 過頭了！點【右 ▶】回正！'; cls = 'warn'; }
            else { txt = '✅ 保持平衡，穩住呼吸……'; cls = 'safe'; }
            instrEl.textContent = txt;
            instrEl.className = 'gb-instruction ' + cls;
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts;
            elapsed += dt;

            // 孢子 + 重力：持續向右的拉力，隨時間增強
            const driftA = 26 + elapsed * 3.2;
            v += driftA * dt;

            // 顛簸：巴士不定時的搖晃（多半向右，偶爾向左）
            bumpAcc += dt;
            if (bumpAcc >= 1.1) {
                bumpAcc = 0;
                const jolt = (Math.random() < 0.72 ? 1 : -1) * (8 + Math.random() * 10);
                v += jolt;
                overlay.classList.add('gb-shake');
                setTimeout(() => overlay.classList.remove('gb-shake'), 220);
            }

            // 玩家控制
            const ctrlA = 165;
            if (leftHeld) v -= ctrlA * dt;
            if (rightHeld) v += ctrlA * dt;

            // 阻尼
            v -= v * 2.6 * dt;

            p += v * dt;

            // 邊界 / 撞肩
            if (p >= cfg.crash) { p = cfg.crash; crashGame(); return; }
            if (p < -110) { p = -110; v = 0; }

            // 視覺更新
            const pct = (p + 100) / 200 * 100;             // 0..100
            marker.style.left = Math.max(0, Math.min(100, pct)) + '%';
            beam.style.transform = `rotate(${p / 100 * 42}deg)`;
            overlay.classList.toggle('gb-danger', p > 70);

            // UI
            const remain = Math.max(0, cfg.time - elapsed);
            timerEl.textContent = remain.toFixed(1) + 's';
            surviveFill.style.width = Math.min(100, elapsed / cfg.time * 100) + '%';
            setInstruction();

            if (elapsed >= cfg.time) { winGame(); return; }
            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
    };
})();
