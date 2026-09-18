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
            thoughts: event.thoughts || ["想靠過去……"],
            cg: event.cg || null
        };

        const overlay = makeOverlay('swipe-dismiss-overlay');
        if (cfg.cg) overlay.classList.add('sd-has-cg');
        overlay.innerHTML = `
            ${cfg.cg ? `<img class="sd-cg" src="${this.resolveAsset(cfg.cg)}" alt="">` : ''}
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
                    this.playSound('assets/audio/sfx/滑動音效.mp3');
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

    // ==================================================================
    // 4. 面對面・心跳節律 (Heartbeat Rhythm)  -> "heartbeat_rhythm_qte"
    //    學長的每一句溫柔話語都會讓心率飆升；玩家點「深呼吸」壓回安全區，
    //    在限時內維持心跳不衝破紅線即可過關。（Day5 陽台 / Day6、Day7 告白皆可沿用）
    // ==================================================================
    GameEngine.prototype.startHeartbeatRhythmQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 15,
            charSprite: event.charSprite || null,
            startRate: event.startRate != null ? event.startRate : 22,
            warnRate: event.warnRate != null ? event.warnRate : 72,
            creep: event.creep != null ? event.creep : 8,        // 每秒基礎爬升
            breathDrop: event.breathDrop != null ? event.breathDrop : 13,
            lineGap: event.lineGap != null ? event.lineGap : 2.6, // 學長台詞出現間隔
            lines: event.lines && event.lines.length ? event.lines : [
                { text: '……', spike: 14 }
            ]
        };

        const overlay = makeOverlay('heartbeat-rhythm-overlay');
        overlay.innerHTML = `
            ${cfg.charSprite ? `<img class="hr-char" src="${this.resolveAsset(cfg.charSprite)}" alt="">` : ''}
            <div class="hr-vignette" id="hr-vignette"></div>
            <div class="hr-topbar">
                <div class="hr-title">穩住心跳 — 別讓學長發現！</div>
                <div class="hr-timer" id="hr-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="hr-ecg">
                <div class="hr-ecg-zone safe"></div>
                <div class="hr-ecg-zone warn"></div>
                <div class="hr-ecg-zone red"></div>
                <div class="hr-marker" id="hr-marker">❤</div>
            </div>
            <div class="hr-survive"><div class="hr-survive-fill" id="hr-survive-fill"></div></div>
            <div class="hr-subtitle" id="hr-subtitle"></div>
            <button class="hr-breath-btn" id="hr-breath-btn">深呼吸・吞口水<small>（點擊 / 空白鍵）</small></button>
        `;

        const marker = overlay.querySelector('#hr-marker');
        const timerEl = overlay.querySelector('#hr-timer');
        const surviveFill = overlay.querySelector('#hr-survive-fill');
        const subtitle = overlay.querySelector('#hr-subtitle');
        const vignette = overlay.querySelector('#hr-vignette');
        const breathBtn = overlay.querySelector('#hr-breath-btn');

        let rate = cfg.startRate;
        let finished = false, lastTs = null, elapsed = 0, lineAcc = cfg.lineGap, lineIdx = 0, rafId = null;

        const updateMarker = () => {
            const r = Math.max(0, Math.min(100, rate));
            marker.style.left = r + '%';
            const danger = rate >= cfg.warnRate;
            marker.classList.toggle('danger', danger);
            vignette.style.opacity = danger ? String(Math.min(1, (rate - cfg.warnRate) / (100 - cfg.warnRate))) : '0';
            // 心跳越快，愛心跳動越急
            marker.style.animationDuration = Math.max(0.22, 0.9 - rate / 160) + 's';
        };
        updateMarker();

        const cleanup = () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('keydown', keyHandler);
        };

        const takeBreath = () => {
            if (finished) return;
            rate = Math.max(0, rate - cfg.breathDrop);
            updateMarker();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            breathBtn.classList.add('active');
            setTimeout(() => breathBtn.classList.remove('active'), 100);
        };
        const keyHandler = (e) => { if (e.code === 'Space') { e.preventDefault(); takeBreath(); } };
        breathBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); takeBreath(); });
        window.addEventListener('keydown', keyHandler);

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="hr-result win">
                <div class="hr-result-big">😮‍💨 心跳穩住了</div>
                <div class="hr-result-sub">你用最平靜的表情，撐過了這一波溫柔轟炸。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1500);
        };
        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="hr-result lose">
                <div class="hr-result-big">💗 心跳失控！</div>
                <div class="hr-result-sub">你發出了可疑的喘息……深呼吸，再來一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startHeartbeatRhythmQTE(event); }, 1700);
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts;
            elapsed += dt;

            rate += cfg.creep * dt;

            // 學長的溫柔台詞：定時出現並讓心率飆升
            lineAcc += dt;
            if (lineAcc >= cfg.lineGap) {
                lineAcc = 0;
                const line = cfg.lines[lineIdx % cfg.lines.length];
                lineIdx++;
                subtitle.textContent = '「' + line.text + '」';
                subtitle.classList.remove('pop'); void subtitle.offsetWidth; subtitle.classList.add('pop');
                rate = Math.min(100, rate + (line.spike || 14));
                this.playSound('assets/audio/sfx/心跳聲.mp3');
            }

            updateMarker();
            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            surviveFill.style.width = Math.min(100, elapsed / cfg.time * 100) + '%';

            if (rate >= 100) { loseGame(); return; }
            if (elapsed >= cfg.time) { winGame(); return; }
            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 5. 專注採樣・別看學長 (Focus Tap)  -> "focus_tap_qte"
    //    孢子讓視線模糊躁動：狂點綠色「採樣校準點」湊滿採樣進度，
    //    但畫面上會冒出誘人的粉紅「學長部位」——手殘點下去就會失神暴走！
    // ==================================================================
    GameEngine.prototype.startFocusTapQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 14,
            charSprite: event.charSprite || null,
            needTaps: event.needTaps || 8,
            greenLife: event.greenLife != null ? event.greenLife : 1.35,
            greenGap: event.greenGap != null ? event.greenGap : 0.75,
            lureGap: event.lureGap != null ? event.lureGap : 1.3,
            lureLife: event.lureLife != null ? event.lureLife : 1.6,
            lurePenalty: event.lurePenalty != null ? event.lurePenalty : 24,
            greenLabels: event.greenLabels || ['🔬 採樣器', '🧪 校準點', '📡 感測器'],
            lures: event.lures || ['側臉', '後頸', '小臂']
        };

        const overlay = makeOverlay('focus-tap-overlay');
        overlay.innerHTML = `
            ${cfg.charSprite ? `<img class="ft-char" src="${this.resolveAsset(cfg.charSprite)}" alt="">` : ''}
            <div class="ft-haze" id="ft-haze"></div>
            <div class="ft-topbar">
                <div class="ft-title">校準採樣器 — 別看學長！</div>
                <div class="ft-timer" id="ft-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="ft-bars">
                <div class="ft-bar-row"><span>採樣</span><div class="ft-bar"><div class="ft-bar-fill sample" id="ft-sample"></div></div></div>
                <div class="ft-bar-row"><span>失神</span><div class="ft-bar"><div class="ft-bar-fill daze" id="ft-daze"></div></div></div>
            </div>
            <div class="ft-field" id="ft-field"></div>
            <div class="ft-hint">狂點<b style="color:#7CFC00;">綠色採樣點</b>；忍住，別去戳<b style="color:#ff77bb;">粉紅色的學長</b>！</div>
        `;

        const field = overlay.querySelector('#ft-field');
        const timerEl = overlay.querySelector('#ft-timer');
        const sampleFill = overlay.querySelector('#ft-sample');
        const dazeFill = overlay.querySelector('#ft-daze');
        const haze = overlay.querySelector('#ft-haze');

        let sampled = 0, daze = 0;
        let finished = false, lastTs = null, elapsed = 0, rafId = null;
        let greenAcc = 0, lureAcc = cfg.lureGap * 0.6;

        const updateBars = () => {
            sampleFill.style.width = Math.min(100, sampled / cfg.needTaps * 100) + '%';
            dazeFill.style.width = Math.max(0, Math.min(100, daze)) + '%';
            haze.style.opacity = String(0.25 + Math.min(0.55, daze / 100 * 0.55));
        };
        updateBars();

        const cleanup = () => { if (rafId) cancelAnimationFrame(rafId); };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="ft-result win">
                <div class="ft-result-big">🔬 採樣完成！</div>
                <div class="ft-result-sub">三個採樣器都校準好了——而且你成功忍住沒偷看學長。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1400);
        };
        const loseGame = (reason) => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="ft-result lose">
                <div class="ft-result-big">💗 失神了……</div>
                <div class="ft-result-sub">${reason || '眼睛不聽使喚地黏在學長身上……深呼吸，再試一次！'}</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startFocusTapQTE(event); }, 1700);
        };

        const fieldRect = () => field.getBoundingClientRect();

        const spawnGreen = () => {
            const el = document.createElement('div');
            el.className = 'ft-target green pop';
            el.textContent = cfg.greenLabels[Math.floor(Math.random() * cfg.greenLabels.length)];
            const w = field.clientWidth, h = field.clientHeight;
            el.style.left = (8 + Math.random() * 80) + '%';
            el.style.top = (8 + Math.random() * 80) + '%';
            field.appendChild(el);
            let alive = true;
            const kill = () => { if (!alive) return; alive = false; el.remove(); };
            el.addEventListener('pointerdown', (e) => {
                e.preventDefault(); e.stopPropagation();
                if (finished || !alive) return;
                sampled++;
                this.playSound('assets/audio/sfx/按鍵音效.mp3');
                el.classList.add('tapped');
                kill();
                updateBars();
                if (sampled >= cfg.needTaps) winGame();
            });
            setTimeout(kill, cfg.greenLife * 1000);
        };

        const spawnLure = () => {
            const el = document.createElement('div');
            el.className = 'ft-target lure pop';
            el.innerHTML = `💗<span>${cfg.lures[Math.floor(Math.random() * cfg.lures.length)]}</span>`;
            el.style.left = (10 + Math.random() * 74) + '%';
            el.style.top = (10 + Math.random() * 74) + '%';
            field.appendChild(el);
            let alive = true;
            const kill = () => { if (!alive) return; alive = false; el.remove(); };
            el.addEventListener('pointerdown', (e) => {
                e.preventDefault(); e.stopPropagation();
                if (finished || !alive) return;
                daze = Math.min(100, daze + cfg.lurePenalty);
                this.playSound('assets/audio/sfx/心跳聲.mp3');
                overlay.classList.add('ft-flash');
                setTimeout(() => overlay.classList.remove('ft-flash'), 250);
                el.classList.add('tapped');
                kill();
                updateBars();
                if (daze >= 100) loseGame();
            });
            setTimeout(kill, cfg.lureLife * 1000);
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            greenAcc += dt;
            if (greenAcc >= cfg.greenGap) { greenAcc = 0; spawnGreen(); }
            lureAcc += dt;
            if (lureAcc >= cfg.lureGap) { lureAcc = 0; spawnLure(); }

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';

            if (elapsed >= cfg.time) {
                if (sampled >= cfg.needTaps) winGame();
                else loseGame('時間到，採樣器還沒校準完……分心太多了！再試一次！');
                return;
            }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 6. 吞嚥時機・心跳節律 HARD (Swallow Timing)  -> "swallow_timing_qte"
    //    心率照樣飆升，但「深呼吸」不能亂按——必須抓準來回掃動的
    //    「吞嚥時機條」落在綠色區間時按下才有效；按錯時機會嗆到，心率反升。
    // ==================================================================
    GameEngine.prototype.startSwallowTimingQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 16,
            charSprite: event.charSprite || null,
            startRate: event.startRate != null ? event.startRate : 30,
            warnRate: event.warnRate != null ? event.warnRate : 72,
            creep: event.creep != null ? event.creep : 5,
            lineGap: event.lineGap != null ? event.lineGap : 2.4,
            goodDrop: event.goodDrop != null ? event.goodDrop : 20,
            missPenalty: event.missPenalty != null ? event.missPenalty : 4,
            sweepSpeed: event.sweepSpeed != null ? event.sweepSpeed : 0.75, // 每秒來回比例（會隨時間加快）
            greenWidth: event.greenWidth != null ? event.greenWidth : 26,   // 綠色時機區寬度(%)
            lines: event.lines && event.lines.length ? event.lines : [{ text: '……', spike: 15 }]
        };

        const overlay = makeOverlay('swallow-timing-overlay');
        overlay.innerHTML = `
            ${cfg.charSprite ? `<img class="st-char" src="${this.resolveAsset(cfg.charSprite)}" alt="">` : ''}
            <div class="st-vignette" id="st-vignette"></div>
            <div class="st-topbar">
                <div class="st-title">吞嚥時機 — 抓準時機壓下心跳！</div>
                <div class="st-timer" id="st-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="st-ecg">
                <div class="st-ecg-zone safe"></div>
                <div class="st-ecg-zone warn"></div>
                <div class="st-ecg-zone red"></div>
                <div class="st-marker" id="st-marker">❤</div>
            </div>
            <div class="st-subtitle" id="st-subtitle"></div>
            <div class="st-timing">
                <div class="st-timing-green" id="st-timing-green"></div>
                <div class="st-timing-cursor" id="st-timing-cursor"></div>
            </div>
            <button class="st-btn" id="st-btn">吞口水・深呼吸<small>（時機條進綠區時點擊 / 空白鍵）</small></button>
        `;

        const marker = overlay.querySelector('#st-marker');
        const timerEl = overlay.querySelector('#st-timer');
        const subtitle = overlay.querySelector('#st-subtitle');
        const vignette = overlay.querySelector('#st-vignette');
        const greenEl = overlay.querySelector('#st-timing-green');
        const cursor = overlay.querySelector('#st-timing-cursor');
        const btn = overlay.querySelector('#st-btn');

        // 綠色時機區置中
        const greenStart = 50 - cfg.greenWidth / 2;
        greenEl.style.left = greenStart + '%';
        greenEl.style.width = cfg.greenWidth + '%';

        let rate = cfg.startRate;
        let finished = false, lastTs = null, elapsed = 0, lineAcc = cfg.lineGap, lineIdx = 0, rafId = null;
        let sweepPhase = 0; // 0..1 三角波
        let cursorPos = 50;

        const updateMarker = () => {
            const r = Math.max(0, Math.min(100, rate));
            marker.style.left = r + '%';
            const danger = rate >= cfg.warnRate;
            marker.classList.toggle('danger', danger);
            vignette.style.opacity = danger ? String(Math.min(1, (rate - cfg.warnRate) / (100 - cfg.warnRate))) : '0';
            marker.style.animationDuration = Math.max(0.22, 0.9 - rate / 160) + 's';
        };
        updateMarker();

        const cleanup = () => { if (rafId) cancelAnimationFrame(rafId); window.removeEventListener('keydown', keyHandler); };

        const attempt = () => {
            if (finished) return;
            const inGreen = cursorPos >= greenStart && cursorPos <= greenStart + cfg.greenWidth;
            if (inGreen) {
                rate = Math.max(0, rate - cfg.goodDrop);
                this.playSound('assets/audio/sfx/按鍵音效.mp3');
                cursor.classList.add('good'); setTimeout(() => cursor.classList.remove('good'), 150);
            } else {
                rate = Math.min(100, rate + cfg.missPenalty);
                this.playSound('assets/audio/sfx/心跳聲.mp3');
                overlay.classList.add('st-choke'); setTimeout(() => overlay.classList.remove('st-choke'), 200);
            }
            updateMarker();
        };
        const keyHandler = (e) => { if (e.code === 'Space') { e.preventDefault(); attempt(); } };
        btn.addEventListener('pointerdown', (e) => { e.preventDefault(); attempt(); });
        window.addEventListener('keydown', keyHandler);

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="st-result win">
                <div class="st-result-big">😮‍💨 撐住了</div>
                <div class="st-result-sub">你抓準每一次吞嚥的時機，硬是把心跳壓在了安全線內。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1500);
        };
        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="st-result lose">
                <div class="st-result-big">💗 心跳失控！</div>
                <div class="st-result-sub">一個沒忍住嗆了聲，心跳徹底暴走……再來一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startSwallowTimingQTE(event); }, 1700);
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            // 掃動游標（三角波，速度隨時間加快 → 越後面越難抓）
            const speed = cfg.sweepSpeed * (1 + elapsed / cfg.time * 0.8);
            sweepPhase = (sweepPhase + speed * dt) % 1;
            const tri = sweepPhase < 0.5 ? sweepPhase * 2 : (1 - sweepPhase) * 2; // 0..1..0
            cursorPos = tri * 100;
            cursor.style.left = cursorPos + '%';
            cursor.classList.toggle('inzone', cursorPos >= greenStart && cursorPos <= greenStart + cfg.greenWidth);

            rate += cfg.creep * dt;

            lineAcc += dt;
            if (lineAcc >= cfg.lineGap) {
                lineAcc = 0;
                const line = cfg.lines[lineIdx % cfg.lines.length]; lineIdx++;
                subtitle.textContent = '「' + line.text + '」';
                subtitle.classList.remove('pop'); void subtitle.offsetWidth; subtitle.classList.add('pop');
                rate = Math.min(100, rate + (line.spike || 15));
                this.playSound('assets/audio/sfx/心跳聲.mp3');
            }

            updateMarker();
            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';

            if (rate >= 100) { loseGame(); return; }
            if (elapsed >= cfg.time) { winGame(); return; }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 7. 組織語言・真心話拼句 (Word Pick)  -> "word_pick_qte"
    //    上方是一句待填空的話（□ □ □）。玩家從下方的詞卡裡挑出「得體的詞」，
    //    依序自動填入空格；挑到混進來的「母湯真心話」會讓社死值飆升！
    //    （優化：格位式 UI + 詞卡整齊排列，不必猜順序，只需分辨得體 / 母湯。）
    // ==================================================================
    GameEngine.prototype.startWordPickQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 18,
            title: event.title || '組織語言 — 拼出能見人的那句話！',
            sentence: event.sentence || ['我', '沒事'],
            decoys: event.decoys || [],
            decoyPenalty: event.decoyPenalty != null ? event.decoyPenalty : 25
        };

        const overlay = makeOverlay('word-pick-overlay');
        overlay.innerHTML = `
            <div class="wp-topbar">
                <div class="wp-title">${cfg.title}</div>
                <div class="wp-timer" id="wp-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="wp-shame-row"><span>社死值</span><div class="wp-shame"><div class="wp-shame-fill" id="wp-shame-fill"></div></div></div>
            <div class="wp-slots" id="wp-slots"></div>
            <div class="wp-tray-label">從下面挑出<b style="color:#8fe3c0;">得體的詞</b>填進空格；別碰<b style="color:#ff77bb;">粉紅色的母湯真心話</b>！</div>
            <div class="wp-tray" id="wp-tray"></div>
        `;

        const slotsEl = overlay.querySelector('#wp-slots');
        const trayEl = overlay.querySelector('#wp-tray');
        const timerEl = overlay.querySelector('#wp-timer');
        const shameFill = overlay.querySelector('#wp-shame-fill');

        let progress = 0;
        let shame = 0;
        let finished = false, lastTs = null, elapsed = 0, rafId = null;

        // 建立空格
        const slotEls = cfg.sentence.map((w, i) => {
            const s = document.createElement('div');
            s.className = 'wp-slot';
            s.textContent = '';
            s.dataset.word = w;
            slotsEl.appendChild(s);
            return s;
        });

        const updateShame = () => {
            shameFill.style.width = Math.max(0, Math.min(100, shame)) + '%';
            overlay.classList.toggle('wp-danger', shame >= 70);
        };
        updateShame();

        // 建立詞卡（正確 + 干擾），整齊排入 tray
        const allWords = cfg.sentence.map((w, i) => ({ text: w, correctIdx: i }))
            .concat(cfg.decoys.map(w => ({ text: w, correctIdx: -1 })));
        for (let i = allWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
        }

        const cleanup = () => { if (rafId) cancelAnimationFrame(rafId); };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/發送訊息.mp3');
            overlay.innerHTML = `<div class="wp-result win">
                <div class="wp-result-big">🗣️ 順利說出口了</div>
                <div class="wp-result-sub">「${cfg.sentence.join('')}」——體面。非常體面。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1600);
        };
        const loseGame = (reason) => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="wp-result lose">
                <div class="wp-result-big">💥 話卡在喉嚨裡……</div>
                <div class="wp-result-sub">${reason || '差點把不能說的說出來……深呼吸，重新組織一次！'}</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startWordPickQTE(event); }, 1700);
        };

        allWords.forEach(w => {
            const chip = document.createElement('button');
            chip.className = 'wp-chip' + (w.correctIdx < 0 ? ' decoy' : '');
            chip.textContent = w.text;
            
            // Scatter transforms
            const rot = (Math.random() - 0.5) * 30;
            const tx = (Math.random() - 0.5) * 20;
            const ty = (Math.random() - 0.5) * 20;
            chip.style.setProperty('--rx', `${rot}deg`);
            chip.style.setProperty('--tx', `${tx}px`);
            chip.style.setProperty('--ty', `${ty}px`);
            
            chip.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                if (finished || chip.classList.contains('used')) return;
                if (w.correctIdx >= 0) {
                    // 得體詞：無論點選順序，都填進它在句中的位置
                    const slot = slotEls[w.correctIdx];
                    slot.textContent = w.text;
                    slot.classList.add('filled');
                    chip.classList.add('used');
                    this.playSound('assets/audio/sfx/按鍵音效.mp3');
                    progress++;
                    if (progress >= cfg.sentence.length) winGame();
                } else {
                    // 母湯詞
                    shame = Math.min(100, shame + cfg.decoyPenalty);
                    this.playSound('assets/audio/sfx/心跳聲.mp3');
                    chip.classList.add('exposed');
                    overlay.classList.add('wp-flash');
                    setTimeout(() => overlay.classList.remove('wp-flash'), 260);
                    updateShame();
                    if (shame >= 100) loseGame('母湯的真心話已經湧到嘴邊了！');
                }
            });
            trayEl.appendChild(chip);
        });

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;
            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (elapsed >= cfg.time) { loseGame('時間到，你的沉默已經開始顯得可疑了……'); return; }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 8. 孢子封裝・壓力閥門 (Pressure Seal)  -> "pressure_seal_qte"
    //    長按為封裝瓶加壓，在壓力錶指針落在「綠色密封區間」時放開！
    //    放開時機錯誤（過低 / 爆表）孢子囊就會炸開。連續封裝三瓶即成功。
    // ==================================================================
    GameEngine.prototype.startPressureSealQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 20,
            vials: event.vials || 3,
            fillSpeed: event.fillSpeed != null ? event.fillSpeed : 52,   // 每秒加壓 %
            bandWidth: event.bandWidth != null ? event.bandWidth : 16    // 綠色區間寬(%)
        };

        const overlay = makeOverlay('pressure-seal-overlay');
        overlay.innerHTML = `
            <div class="ps-topbar">
                <div class="ps-title">孢子封裝 — 抓準壓力，放手密封！</div>
                <div class="ps-timer" id="ps-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="ps-vials" id="ps-vials"></div>
            <div class="ps-gauge-wrap">
                <div class="ps-gauge">
                    <div class="ps-band" id="ps-band"></div>
                    <div class="ps-fill" id="ps-fill"></div>
                </div>
                <div class="ps-gauge-label" id="ps-gauge-label">0%</div>
            </div>
            <div class="ps-msg" id="ps-msg">按住下方按鈕加壓，指針進入綠區時放開！</div>
            <button class="ps-btn" id="ps-btn">按住加壓<small>（放開＝密封）</small></button>
        `;

        const timerEl = overlay.querySelector('#ps-timer');
        const vialsEl = overlay.querySelector('#ps-vials');
        const band = overlay.querySelector('#ps-band');
        const fill = overlay.querySelector('#ps-fill');
        const gaugeLabel = overlay.querySelector('#ps-gauge-label');
        const msg = overlay.querySelector('#ps-msg');
        const btn = overlay.querySelector('#ps-btn');

        let sealed = 0;
        let pressure = 0;
        let holding = false;
        let bandLow = 0;
        let finished = false, lastTs = null, elapsed = 0, rafId = null;

        const renderVials = () => {
            vialsEl.innerHTML = '';
            for (let i = 0; i < cfg.vials; i++) {
                const v = document.createElement('div');
                v.className = 'ps-vial' + (i < sealed ? ' sealed' : (i === sealed ? ' active' : ''));
                v.textContent = i < sealed ? '✅' : '🧪';
                vialsEl.appendChild(v);
            }
        };
        const newBand = () => {
            bandLow = 52 + Math.random() * (92 - cfg.bandWidth - 52);
            band.style.bottom = bandLow + '%';
            band.style.height = cfg.bandWidth + '%';
            pressure = 0;
        };
        renderVials(); newBand();

        const cleanup = () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('pointerup', release);
        };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="ps-result win">
                <div class="ps-result-big">🧪 全數封裝完成！</div>
                <div class="ps-result-sub">三管孢子樣本安全入庫。二哥對你比了個讚。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1500);
        };
        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="ps-result lose">
                <div class="ps-result-big">💥 孢子囊炸開了！</div>
                <div class="ps-result-sub">你又吸了一大口甜香……頭好暈。重新來過！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startPressureSealQTE(event); }, 1700);
        };

        const burst = (reason) => {
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.classList.add('ps-burst');
            setTimeout(() => overlay.classList.remove('ps-burst'), 300);
            msg.textContent = reason;
            newBand();
        };

        const press = (e) => { if (e) e.preventDefault(); if (finished) return; holding = true; btn.classList.add('active'); };
        const release = () => {
            if (finished || !holding) return;
            holding = false; btn.classList.remove('active');
            if (pressure >= bandLow && pressure <= bandLow + cfg.bandWidth) {
                sealed++;
                this.playSound('assets/audio/sfx/按鍵音效.mp3');
                msg.textContent = '密封成功！';
                renderVials();
                if (sealed >= cfg.vials) { winGame(); return; }
                newBand();
            } else if (pressure > 5) {
                burst('壓力沒對準綠區，孢子囊「噗」地漏氣了！重新加壓！');
            }
        };
        btn.addEventListener('pointerdown', press);
        window.addEventListener('pointerup', release);

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            if (holding) {
                pressure += cfg.fillSpeed * dt;
                if (pressure >= 100) {
                    pressure = 0; holding = false; btn.classList.remove('active');
                    burst('加壓過頭，爆表了！');
                }
            }
            fill.style.height = Math.min(100, pressure) + '%';
            const inBand = pressure >= bandLow && pressure <= bandLow + cfg.bandWidth;
            fill.classList.toggle('inband', inBand);
            gaugeLabel.textContent = Math.round(pressure) + '%';

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (elapsed >= cfg.time) { loseGame(); return; }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 9. 妄想顯影・擦除防禦 (Scrub Erase)  -> "scrub_erase_qte"
    //    腦內的粉紅妄想像相片顯影般浮現：玩家必須按住並「來回摩擦」把它們
    //    一塊一塊擦掉！放著不管，它們會越顯影越清晰……
    // ==================================================================
    GameEngine.prototype.startScrubEraseQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 15,
            cg: event.cg || null,                                          // 底圖（腦內的妄想畫面）
            cols: event.cols != null ? event.cols : 4,
            rows: event.rows != null ? event.rows : 6,
            scrubNeed: event.scrubNeed != null ? event.scrubNeed : 320,    // 每格需要的摩擦量(px)
            regrow: event.regrow != null ? event.regrow : 0.04,           // 每秒顯影回復比例
            whispers: event.whispers || []
        };

        const overlay = makeOverlay('scrub-erase-overlay');
        overlay.innerHTML = `
            <div class="se-topbar">
                <div class="se-title">妄想顯影中 — 把它擦掉！</div>
                <div class="se-timer" id="se-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="se-progress-row"><span>清除</span><div class="se-progress"><div class="se-progress-fill" id="se-progress-fill"></div></div></div>
            <div class="se-grid" id="se-grid"></div>
            <div class="se-whisper" id="se-whisper"></div>
            <div class="se-hint">按住畫面<b>來回用力摩擦</b>，把腦裡那張浴衣妄想整個擦掉！<br>放著不管，它會慢慢<b style="color:#ff77bb;">重新顯影</b>回來……</div>
        `;

        const grid = overlay.querySelector('#se-grid');
        const timerEl = overlay.querySelector('#se-timer');
        const progressFill = overlay.querySelector('#se-progress-fill');
        const whisperEl = overlay.querySelector('#se-whisper');

        let finished = false, lastTs = null, elapsed = 0, rafId = null;
        let scrubbing = false, lastX = 0, lastY = 0;
        let whisperAcc = 0, whisperIdx = 0;

        // 建立「顯影遮罩」網格（每一格是CG的碎片，擦掉後露出底下的黑）
        const cells = [];
        grid.style.gridTemplateColumns = `repeat(${cfg.cols}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${cfg.rows}, 1fr)`;
        const bgUrl = cfg.cg ? `url("${this.resolveAsset(cfg.cg)}")` : '';
        for (let r = 0; r < cfg.rows; r++) {
            for (let c = 0; c < cfg.cols; c++) {
                const el = document.createElement('div');
                el.className = 'se-cell';
                if (bgUrl) {
                    el.style.backgroundImage = bgUrl;
                    el.style.backgroundSize = `${cfg.cols * 100}% ${cfg.rows * 100}%`;
                    const posX = cfg.cols > 1 ? (c / (cfg.cols - 1)) * 100 : 0;
                    const posY = cfg.rows > 1 ? (r / (cfg.rows - 1)) * 100 : 0;
                    el.style.backgroundPosition = `${posX}% ${posY}%`;
                }
                grid.appendChild(el);
                cells.push({ el, hp: cfg.scrubNeed, max: cfg.scrubNeed });
            }
        }

        const cleanup = () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('pointerup', stopScrub);
        };

        const clearedRatio = () => {
            let sum = 0;
            cells.forEach(c => { sum += 1 - c.hp / c.max; });
            return sum / cells.length;
        };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/滑動音效.mp3');
            overlay.innerHTML = `<div class="se-result win">
                <div class="se-result-big">🧽 腦內一片乾淨</div>
                <div class="se-result-sub">那張浴衣妄想被你物理性地擦除了。阿彌陀佛。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1500);
        };
        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="se-result lose">
                <div class="se-result-big">📸 妄想顯影完成……</div>
                <div class="se-result-sub">那個畫面已經在腦海裡高清放映了。快擦掉重來！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startScrubEraseQTE(event); }, 1700);
        };

        const applyCellVisual = (c) => {
            const v = c.hp / c.max;               // 1=全霧, 0=擦淨
            c.el.style.opacity = v.toFixed(3);
            if (v <= 0.02) c.el.classList.add('cleared'); else c.el.classList.remove('cleared');
        };

        const scrubAt = (x, y, dist) => {
            cells.forEach(c => {
                if (c.hp <= 0) return;
                const r = c.el.getBoundingClientRect();
                if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
                    c.hp = Math.max(0, c.hp - dist * 1.4);
                    applyCellVisual(c);
                    if (c.hp <= 0 && !c.el.dataset.dinged) {
                        c.el.dataset.dinged = '1';
                    }
                }
            });
        };

        const hasActiveBubbles = () => overlay.querySelectorAll('.se-bubble:not(.popped)').length > 0;

        const startScrub = (e) => { e.preventDefault(); scrubbing = true; lastX = e.clientX; lastY = e.clientY; };
        const moveScrub = (e) => {
            if (!scrubbing || finished) return;
            if (hasActiveBubbles()) return; // Block scrubbing if bubbles exist
            const dx = e.clientX - lastX, dy = e.clientY - lastY;
            const dist = Math.hypot(dx, dy);
            lastX = e.clientX; lastY = e.clientY;
            if (dist > 0) scrubAt(e.clientX, e.clientY, dist);
        };
        const stopScrub = () => { scrubbing = false; };
        overlay.addEventListener('pointerdown', startScrub);
        overlay.addEventListener('pointermove', moveScrub);
        window.addEventListener('pointerup', stopScrub);

        let sfxAcc = 0;
        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            // 妄想緩慢「顯影」回來
            cells.forEach(c => {
                if (c.hp < c.max) { c.hp = Math.min(c.max, c.hp + c.max * cfg.regrow * dt); applyCellVisual(c); }
            });

            if (scrubbing) { sfxAcc += dt; if (sfxAcc > 0.18) { sfxAcc = 0; this.playSound('assets/audio/sfx/滑動音效.mp3'); } }

            const cr = clearedRatio();
            progressFill.style.width = (cr * 100).toFixed(0) + '%';

            if (cfg.whispers.length) {
                whisperAcc += dt;
                if (whisperAcc >= 2.6 && !hasActiveBubbles()) {
                    whisperAcc = 0;
                    const text = cfg.whispers[whisperIdx % cfg.whispers.length];
                    whisperIdx++;
                    
                    // Spawn bubble
                    const b = document.createElement('div');
                    b.className = 'se-bubble pop';
                    b.textContent = text;
                    b.style.left = (20 + Math.random() * 60) + '%';
                    b.style.top = (25 + Math.random() * 45) + '%';
                    
                    b.addEventListener('pointerdown', (e) => {
                        e.preventDefault(); e.stopPropagation();
                        if (b.classList.contains('popped')) return;
                        b.classList.add('popped');
                        this.playSound('assets/audio/sfx/按鍵音效.mp3');
                        setTimeout(() => b.remove(), 200);
                    });
                    
                    overlay.appendChild(b);
                }
            }

            // Update blocked visual state
            overlay.classList.toggle('blocked', hasActiveBubbles());

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (cr >= 0.9) { winGame(); return; }
            if (elapsed >= cfg.time) { loseGame(); return; }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 10. 呼吸同步 (Breath Sync)  -> "breath_sync_qte"
    //     （優化玩法）畫面中央有一個規律脹縮的「呼吸引導環」。
    //     玩家按住 = 自己的圈變大（吸氣），放開 = 變小（吐氣）。
    //     讓自己的圈「貼合」引導環的大小，就能把換氣值壓下來。
    // ==================================================================
    GameEngine.prototype.startBreathSyncQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 14,
            period: event.period != null ? event.period : 4.2,   // 一次呼吸的秒數
            startVal: event.startVal != null ? event.startVal : 30,
            wrongRate: event.wrongRate != null ? event.wrongRate : 15,
            rightRate: event.rightRate != null ? event.rightRate : 9,
            tolerance: event.tolerance != null ? event.tolerance : 0.14, // 貼合容差
            respond: event.respond != null ? event.respond : 2.4,        // 玩家圈反應速度
            whispers: event.whispers || []
        };

        const overlay = makeOverlay('breath-sync-overlay');
        overlay.innerHTML = `
            <div class="bs-topbar">
                <div class="bs-title">同步呼吸 — 貼合引導環，別過度換氣！</div>
                <div class="bs-timer" id="bs-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="bs-meter-row"><span>換氣值</span><div class="bs-meter"><div class="bs-meter-fill" id="bs-meter-fill"></div></div></div>
            <div class="bs-stage">
                <div class="bs-guide" id="bs-guide"></div>
                <div class="bs-player" id="bs-player"></div>
                <div class="bs-phase" id="bs-phase">預備……</div>
            </div>
            <div class="bs-whisper" id="bs-whisper"></div>
            <div class="bs-hint"><b style="color:#8fe3c0;">按住</b>畫面讓白圈變大（吸氣）、<b style="color:#8fb3ff;">放開</b>讓它變小（吐氣）；<br>把白圈<b>貼合</b>那圈虛線引導環（也可用空白鍵）</div>
        `;

        const timerEl = overlay.querySelector('#bs-timer');
        const meterFill = overlay.querySelector('#bs-meter-fill');
        const guide = overlay.querySelector('#bs-guide');
        const player = overlay.querySelector('#bs-player');
        const phaseEl = overlay.querySelector('#bs-phase');
        const whisperEl = overlay.querySelector('#bs-whisper');

        const MIN = 0.42, MAX = 1.0;
        let val = cfg.startVal;
        let holding = false;
        let playerSize = 0.5;        // 0..1
        let finished = false, lastTs = null, elapsed = 0, rafId = null;
        let whisperAcc = 0, whisperIdx = 0;

        const cleanup = () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('keydown', keyDown);
            window.removeEventListener('keyup', keyUp);
        };

        const down = (e) => { if (e) e.preventDefault(); holding = true; };
        const up = () => { holding = false; };
        const keyDown = (e) => { if (e.code === 'Space') { e.preventDefault(); holding = true; } };
        const keyUp = (e) => { if (e.code === 'Space') holding = false; };
        overlay.addEventListener('pointerdown', down);
        window.addEventListener('pointerup', up);
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="bs-result win">
                <div class="bs-result-big">🫁 呼吸平穩了下來</div>
                <div class="bs-result-sub">吸——吐——你成功把自己從失控邊緣拉了回來。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1500);
        };
        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="bs-result lose">
                <div class="bs-result-big">😵 過度換氣！</div>
                <div class="bs-result-sub">眼前發白、指尖發麻……重新跟上呼吸的節奏！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startBreathSyncQTE(event); }, 1700);
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            // 引導環：0..1 的正弦脹縮
            const guideNorm = 0.5 + 0.5 * Math.sin(elapsed * 2 * Math.PI / cfg.period - Math.PI / 2);
            const expanding = Math.cos(elapsed * 2 * Math.PI / cfg.period - Math.PI / 2) > 0;

            // 玩家圈：按住 → 朝 1 靠攏；放開 → 朝 0 靠攏
            const target = holding ? 1 : 0;
            playerSize += (target - playerSize) * Math.min(1, cfg.respond * dt);

            const guideScale = MIN + (MAX - MIN) * guideNorm;
            const playerScale = MIN + (MAX - MIN) * playerSize;
            guide.style.transform = `scale(${guideScale.toFixed(3)})`;
            player.style.transform = `scale(${playerScale.toFixed(3)})`;

            const diff = Math.abs(playerSize - guideNorm);
            const synced = diff <= cfg.tolerance;
            player.classList.toggle('synced', synced);
            player.classList.toggle('off', !synced);
            phaseEl.textContent = synced ? '很好，保持……' : (expanding ? '吸氣 ↑（按住）' : '吐氣 ↓（放開）');

            if (synced) val = Math.max(0, val - cfg.rightRate * dt);
            else val = Math.min(100, val + cfg.wrongRate * dt);
            meterFill.style.width = val + '%';
            meterFill.classList.toggle('danger', val >= 70);

            if (cfg.whispers.length) {
                whisperAcc += dt;
                if (whisperAcc >= 2.8) {
                    whisperAcc = 0;
                    whisperEl.textContent = cfg.whispers[whisperIdx % cfg.whispers.length];
                    whisperIdx++;
                    whisperEl.classList.remove('pop'); void whisperEl.offsetWidth; whisperEl.classList.add('pop');
                }
            }

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (val >= 100) { loseGame(); return; }
            if (elapsed >= cfg.time) { winGame(); return; }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 11. 忍住不要吻下去 (Resist Kiss)  -> "resist_kiss_qte"
    //     學長的睡顏近在咫尺。孢子的引力會讓「距離」不斷縮短，
    //     玩家必須瘋狂點擊往後撤——但意志力會隨著每一次點擊而衰減……
    //     鏡頭會隨著距離縮短緩緩拉近，營造窒息的心動感。
    // ==================================================================
    GameEngine.prototype.startResistKissQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 12,
            cg: event.cg || null,
            drainBase: event.drainBase != null ? event.drainBase : 7,
            drainGrow: event.drainGrow != null ? event.drainGrow : 0.6,
            tapPower: event.tapPower != null ? event.tapPower : 7.5,
            tapDecay: event.tapDecay != null ? event.tapDecay : 0.94,
            tapMin: event.tapMin != null ? event.tapMin : 2.6,
            lipsRadius: event.lipsRadius != null ? event.lipsRadius : 0.14, // 嘴唇危險區半徑（相對短邊）
            lipsPenalty: event.lipsPenalty != null ? event.lipsPenalty : 16, // 誤觸嘴唇：距離大幅減少
            whispers: event.whispers || ['就一下……', '他睡著了……不會發現的……']
        };

        const overlay = makeOverlay('resist-kiss-overlay');
        overlay.innerHTML = `
            ${cfg.cg ? `<img class="rk-cg" id="rk-cg" src="${this.resolveAsset(cfg.cg)}" alt="">` : ''}
            <div class="rk-vignette" id="rk-vignette"></div>
            <div class="rk-lips" id="rk-lips" title="嘴唇">💋</div>
            <div class="rk-topbar">
                <div class="rk-title">忍住——不可以吻下去！</div>
                <div class="rk-timer" id="rk-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="rk-dist-row"><span>距離</span><div class="rk-dist"><div class="rk-dist-fill" id="rk-dist-fill"></div></div></div>
            <div class="rk-whisper" id="rk-whisper"></div>
            <div class="rk-hint">瘋狂點擊<b>畫面兩側空白處</b>向後撤！<br>但<b style="color:#ff5c8a;">千萬別點到正中央那片嘴唇</b>——一戳就前功盡棄！</div>
        `;

        const cgEl = overlay.querySelector('#rk-cg');
        const vignette = overlay.querySelector('#rk-vignette');
        const lipsEl = overlay.querySelector('#rk-lips');
        const timerEl = overlay.querySelector('#rk-timer');
        const distFill = overlay.querySelector('#rk-dist-fill');
        const whisperEl = overlay.querySelector('#rk-whisper');

        let dist = 100;
        let power = cfg.tapPower;
        let finished = false, lastTs = null, elapsed = 0, rafId = null;
        let whisperAcc = 1.2, whisperIdx = 0;

        const cleanup = () => { if (rafId) cancelAnimationFrame(rafId); };

        const tap = (e) => {
            if (e) e.preventDefault();
            if (finished) return;
            
            const r = overlay.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height * 0.55; // 嘴唇約在畫面中央偏下
            const dx = e.clientX - cx, dy = e.clientY - cy;
            const rad = cfg.lipsRadius * Math.min(r.width, r.height);
            if (Math.hypot(dx, dy) <= rad) {
                // 誤觸嘴唇：不但沒後撤，還忍不住湊了上去！
                dist = Math.max(0, dist - cfg.lipsPenalty);
                this.playSound('assets/audio/sfx/心跳聲.mp3');
                lipsEl.classList.remove('kissed'); void lipsEl.offsetWidth; lipsEl.classList.add('kissed');
                overlay.classList.add('rk-flush');
                setTimeout(() => overlay.classList.remove('rk-flush'), 260);
                whisperEl.textContent = '（！差點就吻上去了……）';
                whisperEl.classList.remove('pop'); void whisperEl.offsetWidth; whisperEl.classList.add('pop');
                if (dist <= 0) { loseGame(); }
                return;
            }
            
            // 正常後撤
            dist = Math.min(100, dist + power);
            power = Math.max(cfg.tapMin, power * cfg.tapDecay);
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
        };
        overlay.addEventListener('pointerdown', tap);

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            overlay.innerHTML = `<div class="rk-result win">
                <div class="rk-result-big">🙏 ……守住了。</div>
                <div class="rk-result-sub">你用最後一絲理智，把自己從那張睡顏前拉了回來。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1600);
        };
        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="rk-result lose">
                <div class="rk-result-big">💗 在最後一毫米——</div>
                <div class="rk-result-sub">你猛地驚醒，拼命把自己拽了回來。心臟狂跳……再撐一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startResistKissQTE(event); }, 1700);
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            dist -= (cfg.drainBase + cfg.drainGrow * elapsed) * dt;

            // 鏡頭隨距離縮短緩緩拉近；嘴唇區也隨之放大
            const closeness = (100 - Math.max(0, dist)) / 100;
            if (cgEl) cgEl.style.transform = `scale(${(1 + closeness * 0.3).toFixed(3)})`;
            if (lipsEl) lipsEl.style.transform = `translate(-50%, -50%) scale(${(1 + closeness * 0.9).toFixed(3)})`;
            vignette.style.opacity = String(Math.min(1, closeness * 1.2));
            distFill.style.width = Math.max(0, dist) + '%';
            distFill.classList.toggle('danger', dist <= 35);

            whisperAcc += dt;
            if (whisperAcc >= 2.4) {
                whisperAcc = 0;
                whisperEl.textContent = cfg.whispers[whisperIdx % cfg.whispers.length];
                whisperIdx++;
                whisperEl.classList.remove('pop'); void whisperEl.offsetWidth; whisperEl.classList.add('pop');
            }

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (dist <= 0) { loseGame(); return; }
            if (elapsed >= cfg.time) { winGame(); return; }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 12. 祭典射擊・瞄準命中 (Carnival Aim)  -> "carnival_aim_qte"
    //     孢子讓準星不受控制地飄移。玩家拖動準星鎖定會移動的星星小熊，
    //     在限定的子彈數內命中 needHits 次即獲勝。（Day7・B 線祭典）
    // ==================================================================
    GameEngine.prototype.startCarnivalAimQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 20,
            bullets: event.bullets != null ? event.bullets : 6,
            needHits: event.needHits != null ? event.needHits : 3,
            drift: event.drift != null ? event.drift : 34,       // 準星每秒飄移量
            targetSpeed: event.targetSpeed != null ? event.targetSpeed : 16, // 目標移動 (%/s)
            hitRadius: event.hitRadius != null ? event.hitRadius : 9  // 命中判定半徑(%)
        };

        const overlay = makeOverlay('carnival-aim-overlay');
        overlay.innerHTML = `
            <div class="ca-topbar">
                <div class="ca-title">祭典射擊 — 打下那隻星星小熊！</div>
                <div class="ca-timer" id="ca-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="ca-status">
                <span>🎯 命中 <b id="ca-hits">0</b> / ${cfg.needHits}</span>
                <span>🔫 子彈 <b id="ca-bullets">${cfg.bullets}</b></span>
            </div>
            <div class="ca-field" id="ca-field">
                <div class="ca-target" id="ca-target">🧸<span>⭐</span></div>
                <div class="ca-cross" id="ca-cross">✛</div>
            </div>
            <button class="ca-btn" id="ca-btn">🔫 射　擊<small>（拖動畫面移動準星 · 對準後按此開火）</small></button>
        `;

        const field = overlay.querySelector('#ca-field');
        const timerEl = overlay.querySelector('#ca-timer');
        const hitsEl = overlay.querySelector('#ca-hits');
        const bulletsEl = overlay.querySelector('#ca-bullets');
        const targetEl = overlay.querySelector('#ca-target');
        const crossEl = overlay.querySelector('#ca-cross');
        const btn = overlay.querySelector('#ca-btn');

        // 座標皆以百分比 (0..100)
        let crossX = 50, crossY = 55;
        let pointerX = 50, pointerY = 55, pointerActive = false;
        let tx = 50, ty = 30, tvx = cfg.targetSpeed, tvy = cfg.targetSpeed * 0.6;
        let driftAngle = Math.random() * Math.PI * 2;
        let hits = 0, bullets = cfg.bullets;
        let finished = false, lastTs = null, elapsed = 0, rafId = null;

        const setCross = () => { crossEl.style.left = crossX + '%'; crossEl.style.top = crossY + '%'; };
        const setTarget = () => { targetEl.style.left = tx + '%'; targetEl.style.top = ty + '%'; };
        setCross(); setTarget();

        const toPct = (e) => {
            const r = field.getBoundingClientRect();
            pointerX = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
            pointerY = Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100));
        };
        field.addEventListener('pointerdown', (e) => { e.preventDefault(); pointerActive = true; toPct(e); });
        field.addEventListener('pointermove', (e) => { if (pointerActive) toPct(e); });
        const endPtr = () => { pointerActive = false; };
        field.addEventListener('pointerup', endPtr);
        field.addEventListener('pointerleave', endPtr);

        const cleanup = () => { if (rafId) cancelAnimationFrame(rafId); };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="ca-result win">
                <div class="ca-result-big">🎯 命中！小熊到手！</div>
                <div class="ca-result-sub">「送你。抱著它，就當是抱著今晚的星星了。」</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1500);
        };
        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="ca-result lose">
                <div class="ca-result-big">😣 子彈用完了……</div>
                <div class="ca-result-sub">手一直抖，根本瞄不準……深呼吸，再來一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startCarnivalAimQTE(event); }, 1700);
        };

        const shoot = () => {
            if (finished || bullets <= 0) return;
            bullets--; bulletsEl.textContent = bullets;
            const d = Math.hypot(crossX - tx, crossY - ty);
            if (d <= cfg.hitRadius) {
                hits++; hitsEl.textContent = hits;
                this.playSound('assets/audio/sfx/按鍵音效.mp3');
                targetEl.classList.remove('hit'); void targetEl.offsetWidth; targetEl.classList.add('hit');
                if (hits >= cfg.needHits) { winGame(); return; }
                // 命中後目標換位、加速一點
                tx = 15 + Math.random() * 70; ty = 12 + Math.random() * 40;
                tvx = (Math.random() < 0.5 ? -1 : 1) * (cfg.targetSpeed + hits * 4);
                tvy = (Math.random() < 0.5 ? -1 : 1) * (cfg.targetSpeed * 0.6 + hits * 2);
            } else {
                crossEl.classList.remove('miss'); void crossEl.offsetWidth; crossEl.classList.add('miss');
                overlay.classList.add('ca-shake'); setTimeout(() => overlay.classList.remove('ca-shake'), 160);
            }
            if (bullets <= 0 && hits < cfg.needHits) loseGame();
        };
        btn.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); shoot(); });

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            // 準星：玩家拖動 + 孢子飄移
            if (pointerActive) { crossX += (pointerX - crossX) * Math.min(1, 12 * dt); crossY += (pointerY - crossY) * Math.min(1, 12 * dt); }
            driftAngle += (Math.random() - 0.5) * 3 * dt;
            crossX += Math.cos(driftAngle) * cfg.drift * dt;
            crossY += Math.sin(driftAngle) * cfg.drift * dt;
            crossX = Math.max(3, Math.min(97, crossX)); crossY = Math.max(3, Math.min(97, crossY));
            setCross();

            // 目標移動並反彈
            tx += tvx * dt; ty += tvy * dt;
            if (tx < 8 || tx > 92) { tvx *= -1; tx = Math.max(8, Math.min(92, tx)); }
            if (ty < 8 || ty > 52) { tvy *= -1; ty = Math.max(8, Math.min(52, ty)); }
            setTarget();

            const onTarget = Math.hypot(crossX - tx, crossY - ty) <= cfg.hitRadius;
            crossEl.classList.toggle('locked', onTarget);

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (elapsed >= cfg.time) { if (hits >= cfg.needHits) winGame(); else loseGame(); return; }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 13. 夜路提燈・循跡 (Trace Path)  -> "trace_path_qte"
    //     漆黑濕滑的下山夜路：玩家拖動手電筒光圈，緊跟著前方帶路的
    //     光點前進。光點離開光圈就會打滑，穩定度下降；走完全程即抵達山頂。
    //     （Day7・A 線夜間登山，取代重複的平衡玩法）
    // ==================================================================
    GameEngine.prototype.startTracePathQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 16,
            lightRadius: event.lightRadius != null ? event.lightRadius : 13, // 光圈判定半徑(%)
            guideSpeed: event.guideSpeed != null ? event.guideSpeed : 100 / (event.time || 16), // 進度/秒
            stableDrop: event.stableDrop != null ? event.stableDrop : 26,   // 脫軌時穩定度每秒下降
            stableRecover: event.stableRecover != null ? event.stableRecover : 12,
            whispers: event.whispers || []
        };

        const overlay = makeOverlay('trace-path-overlay');
        overlay.innerHTML = `
            <div class="tp-topbar">
                <div class="tp-title">夜路提燈 — 跟緊帶路的光點！</div>
                <div class="tp-timer" id="tp-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="tp-bars">
                <div class="tp-bar-row"><span>路程</span><div class="tp-bar"><div class="tp-bar-fill prog" id="tp-prog"></div></div></div>
                <div class="tp-bar-row"><span>穩定</span><div class="tp-bar"><div class="tp-bar-fill stable" id="tp-stable"></div></div></div>
            </div>
            <div class="tp-field" id="tp-field">
                <div class="tp-guide" id="tp-guide">✦</div>
                <div class="tp-light" id="tp-light"></div>
            </div>
            <div class="tp-whisper" id="tp-whisper"></div>
            <div class="tp-hint">拖動<b>手電筒光圈</b>，把前方那個<b style="color:#ffe08a;">✦ 光點</b>一直罩在光圈裡！脫軌會打滑。</div>
        `;

        const field = overlay.querySelector('#tp-field');
        const timerEl = overlay.querySelector('#tp-timer');
        const progFill = overlay.querySelector('#tp-prog');
        const stableFill = overlay.querySelector('#tp-stable');
        const guideEl = overlay.querySelector('#tp-guide');
        const lightEl = overlay.querySelector('#tp-light');
        const whisperEl = overlay.querySelector('#tp-whisper');

        let progress = 0, stable = 100;
        let lx = 50, ly = 80, pointerActive = false, px = 50, py = 80;
        let finished = false, lastTs = null, elapsed = 0, rafId = null;
        let whisperAcc = 0, whisperIdx = 0;

        // 蜿蜒下山路徑：以 progress(0..100) 為參數的曲線
        const guidePos = (p) => {
            const t = p / 100;
            const x = 50 + 34 * Math.sin(t * Math.PI * 3.2);       // 左右蜿蜒
            const y = 86 - t * 74;                                 // 由下往上（往山頂）
            return { x, y };
        };
        const setLight = () => { lightEl.style.left = lx + '%'; lightEl.style.top = ly + '%'; };
        setLight();

        const toPct = (e) => {
            const r = field.getBoundingClientRect();
            px = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
            py = Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100));
        };
        field.addEventListener('pointerdown', (e) => { e.preventDefault(); pointerActive = true; toPct(e); });
        field.addEventListener('pointermove', (e) => { if (pointerActive) toPct(e); });
        const endPtr = () => { pointerActive = false; };
        field.addEventListener('pointerup', endPtr);
        field.addEventListener('pointerleave', endPtr);

        const cleanup = () => { if (rafId) cancelAnimationFrame(rafId); };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/按鍵音效.mp3');
            overlay.innerHTML = `<div class="tp-result win">
                <div class="tp-result-big">🏔️ 抵達山頂！</div>
                <div class="tp-result-sub">你緊跟著學長的手電筒，安全走完了這段夜路——至少，身體上沒有出糗。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1500);
        };
        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="tp-result lose">
                <div class="tp-result-big">💫 一個踉蹌——</div>
                <div class="tp-result-sub">腳下一滑，差點又栽進學長懷裡！穩住，再走一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startTracePathQTE(event); }, 1700);
        };

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            // 光圈跟隨指標
            if (pointerActive) { lx += (px - lx) * Math.min(1, 14 * dt); ly += (py - ly) * Math.min(1, 14 * dt); }
            setLight();

            // 光點是否在光圈內？在的話推進進度，否則穩定度下降
            const gp = guidePos(progress);
            const onTrack = Math.hypot(lx - gp.x, ly - gp.y) <= cfg.lightRadius;
            if (onTrack) {
                progress = Math.min(100, progress + cfg.guideSpeed * dt);
                stable = Math.min(100, stable + cfg.stableRecover * dt);
                guideEl.classList.remove('lost');
                overlay.classList.remove('tp-danger');
            } else {
                stable = Math.max(0, stable - cfg.stableDrop * dt);
                guideEl.classList.add('lost');
                overlay.classList.toggle('tp-danger', stable < 40);
            }
            const gp2 = guidePos(progress);
            guideEl.style.left = gp2.x + '%'; guideEl.style.top = gp2.y + '%';

            progFill.style.width = progress + '%';
            stableFill.style.width = stable + '%';
            stableFill.classList.toggle('danger', stable < 40);

            if (cfg.whispers.length) {
                whisperAcc += dt;
                if (whisperAcc >= 3.0) {
                    whisperAcc = 0;
                    whisperEl.textContent = cfg.whispers[whisperIdx % cfg.whispers.length];
                    whisperIdx++;
                    whisperEl.classList.remove('pop'); void whisperEl.offsetWidth; whisperEl.classList.add('pop');
                }
            }

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (progress >= 100) { winGame(); return; }
            if (stable <= 0) { loseGame(); return; }
            if (elapsed >= cfg.time) { if (progress >= 92) winGame(); else loseGame(); return; }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 14. 沒能煞住的車・夾緊與快感共鳴 (Pleasure Rhythm & Squeeze) -> "h_rhythm_squeeze_qte"
    //     配合脈動環的擴張與收縮節律，在綠色重合區間點擊【夾緊 / 迎合】，
    //     累積情慾與快感度，解鎖極致高潮演出。（Day7 H 場景專用）
    // ==================================================================
    GameEngine.prototype.startHRhythmSqueezeQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 16,
            needHits: event.needHits || 7,
            isFireworks: !!event.isFireworks,
            prompt: event.prompt || "抓準律動重合的時機，點擊【夾緊 · 迎合】！",
            whispers: event.whispers && event.whispers.length ? event.whispers : [
                "哈啊……太深了……",
                "學長……別碰那裡……嗯！",
                "要被填滿了……",
                "盧卡斯……好舒服……！",
                "夾得好緊……受不了了……"
            ]
        };

        const overlay = makeOverlay('h-rhythm-squeeze-overlay');
        overlay.innerHTML = `
            <div class="hrs-vignette"></div>
            <div class="hrs-topbar">
                <div class="hrs-title">💗 快感與律動共鳴</div>
                <div class="hrs-timer" id="hrs-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="hrs-progress-row">
                <span>滿溢度</span>
                <div class="hrs-progress-bar"><div class="hrs-progress-fill" id="hrs-progress-fill"></div></div>
            </div>
            <div class="hrs-stage" id="hrs-stage">
                <div class="hrs-ring-outer" id="hrs-ring-outer"></div>
                <div class="hrs-ring-zone" id="hrs-ring-zone"></div>
                <div class="hrs-heart-target" id="hrs-heart-target">💖</div>
                <div class="hrs-feedback" id="hrs-feedback"></div>
            </div>
            <div class="hrs-whisper" id="hrs-whisper">${cfg.prompt}</div>
            <button class="hrs-btn" id="hrs-btn">💗 夾緊 · 迎合<small>（跟著重合節律點擊）</small></button>
        `;

        const timerEl = overlay.querySelector('#hrs-timer');
        const fillEl = overlay.querySelector('#hrs-progress-fill');
        const ringOuter = overlay.querySelector('#hrs-ring-outer');
        const heartTarget = overlay.querySelector('#hrs-heart-target');
        const feedbackEl = overlay.querySelector('#hrs-feedback');
        const whisperEl = overlay.querySelector('#hrs-whisper');
        const btn = overlay.querySelector('#hrs-btn');

        let hits = 0;
        let finished = false, lastTs = null, elapsed = 0, rafId = null;
        let ringPhase = 0; // 0..1 pulse phase
        let pulseSpeed = 1.4; // pulses per sec
        let whisperAcc = 0, whisperIdx = 0;

        const cleanup = () => { if (rafId) cancelAnimationFrame(rafId); };

        const showFeedback = (text, isGood) => {
            feedbackEl.textContent = text;
            feedbackEl.className = 'hrs-feedback pop ' + (isGood ? 'good' : 'miss');
            void feedbackEl.offsetWidth;
        };

        const spawnHeartParticle = (x, y) => {
            const h = document.createElement('div');
            h.className = 'hrs-particle';
            const icons = ['💗', '💖', '✨', '🔥', '💦'];
            h.textContent = icons[Math.floor(Math.random() * icons.length)];
            h.style.left = (x || (30 + Math.random() * 40)) + '%';
            h.style.top = (y || (30 + Math.random() * 40)) + '%';
            overlay.appendChild(h);
            setTimeout(() => h.remove(), 900);
        };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/深吻長音效.mp3');
            overlay.classList.add('hrs-climax-boom');
            overlay.innerHTML = `<div class="hrs-result win">
                <div class="hrs-result-big">💖 滿溢的高潮絕頂……！</div>
                <div class="hrs-result-sub">整個人彷彿熔化在他的懷抱與溫柔裡。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1800);
        };

        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="hrs-result lose">
                <div class="hrs-result-big">💦 差一點點……</div>
                <div class="hrs-result-sub">呼吸太亂了，重新調整節奏再來一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startHRhythmSqueezeQTE(event); }, 1700);
        };

        const squeeze = (e) => {
            if (e) e.preventDefault();
            if (finished) return;

            // Rating window: ringPhase around 0.45..0.75 (when outer ring matches inner zone)
            const distToZone = Math.abs(ringPhase - 0.6);
            if (distToZone <= 0.18) {
                hits++;
                this.playSound('assets/audio/sfx/親吻.mp3');
                overlay.classList.remove('hrs-shake'); void overlay.offsetWidth; overlay.classList.add('hrs-shake');
                showFeedback(distToZone <= 0.08 ? '💖 PERFECT 迎合！' : '💗 GOOD 夾緊！', true);
                spawnHeartParticle(50, 45);
                fillEl.style.width = Math.min(100, (hits / cfg.needHits) * 100) + '%';
                
                if (cfg.whispers.length) {
                    whisperEl.textContent = cfg.whispers[whisperIdx % cfg.whispers.length];
                    whisperIdx++;
                }

                if (hits >= cfg.needHits) {
                    winGame();
                }
            } else {
                this.playSound('assets/audio/sfx/心跳聲.mp3');
                showFeedback('💦 沒對準節奏……', false);
            }
        };

        btn.addEventListener('pointerdown', squeeze);
        overlay.querySelector('#hrs-stage').addEventListener('pointerdown', squeeze);

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            // Pulse cycle
            ringPhase = (ringPhase + pulseSpeed * dt) % 1;
            // Scale ring Outer: 0.3 -> 1.2 -> 0.3 triangle wave
            const scale = 0.3 + Math.abs(Math.sin(ringPhase * Math.PI)) * 0.95;
            ringOuter.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
            ringOuter.style.borderColor = (ringPhase >= 0.45 && ringPhase <= 0.75) ? '#ff3388' : '#ffffff88';

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (elapsed >= cfg.time) {
                if (hits >= cfg.needHits - 1) winGame(); else loseGame();
                return;
            }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };

    // ==================================================================
    // 15. 沒能煞住的車・星空下的十指交扣與熱度忍耐 (Starlight Heat & Grip) -> "h_starlight_grip_qte"
    //     星空線專屬 H 小遊戲：
    //     按住畫面與學長「十指交扣」，連鎖累積星光熱度；當「熱浪衝擊」襲來時，
    //     點擊閃爍的【星光脈衝點】忍住嬌喘並迎合，達到極致高潮！
    // ==================================================================
    GameEngine.prototype.startHStarlightGripQTE = function (event) {
        this.hideDialogueBox();

        const cfg = {
            time: event.time || 16,
            needBliss: event.needBliss || 100,
            prompt: event.prompt || "長按畫面【十指交扣】累積熱度；熱浪襲來時點擊星光脈衝！",
            whispers: event.whispers && event.whispers.length ? event.whispers : [
                "學長的手指……扣得好緊……",
                "別咬那裡……嗯啊……",
                "好熱……要被融化了……",
                "盧卡斯……再深一點……！",
                "手心全是汗……受不了了……"
            ]
        };

        const overlay = makeOverlay('h-starlight-grip-overlay');
        overlay.innerHTML = `
            <div class="hsg-vignette"></div>
            <div class="hsg-topbar">
                <div class="hsg-title">✨ 星光熱度與十指交扣</div>
                <div class="hsg-timer" id="hsg-timer">${cfg.time.toFixed(1)}s</div>
            </div>
            <div class="hsg-progress-row">
                <span>歡愉度</span>
                <div class="hsg-progress-bar"><div class="hsg-progress-fill" id="hsg-progress-fill"></div></div>
            </div>
            <div class="hsg-stage" id="hsg-stage">
                <div class="hsg-hand-icon" id="hsg-hand-icon">🤝<small>✨</small></div>
                <div class="hsg-pulse-point" id="hsg-pulse-point">🌟</div>
                <div class="hsg-feedback" id="hsg-feedback"></div>
            </div>
            <div class="hsg-whisper" id="hsg-whisper">${cfg.prompt}</div>
            <button class="hsg-btn" id="hsg-btn">🤝 十指交扣 · 忍耐熱度<small>（按住累積歡愉 · 出現🌟時快速點擊）</small></button>
        `;

        const timerEl = overlay.querySelector('#hsg-timer');
        const fillEl = overlay.querySelector('#hsg-progress-fill');
        const handIcon = overlay.querySelector('#hsg-hand-icon');
        const pulsePoint = overlay.querySelector('#hsg-pulse-point');
        const feedbackEl = overlay.querySelector('#hsg-feedback');
        const whisperEl = overlay.querySelector('#hsg-whisper');
        const btn = overlay.querySelector('#hsg-btn');
        const stage = overlay.querySelector('#hsg-stage');

        let bliss = 0;
        let holding = false;
        let finished = false, lastTs = null, elapsed = 0, rafId = null;
        let pulseActive = false;
        let pulseTimer = 0, pulseInterval = 2.4;
        let whisperAcc = 0, whisperIdx = 0;

        const cleanup = () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('pointerup', endHold);
        };

        const showFeedback = (text, isGood) => {
            feedbackEl.textContent = text;
            feedbackEl.className = 'hsg-feedback pop ' + (isGood ? 'good' : 'miss');
            void feedbackEl.offsetWidth;
        };

        const spawnStarParticle = () => {
            const s = document.createElement('div');
            s.className = 'hsg-particle';
            const icons = ['✨', '⭐', '💫', '💖', '🔥'];
            s.textContent = icons[Math.floor(Math.random() * icons.length)];
            s.style.left = (25 + Math.random() * 50) + '%';
            s.style.top = (25 + Math.random() * 50) + '%';
            overlay.appendChild(s);
            setTimeout(() => s.remove(), 900);
        };

        const winGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/深吻長音效.mp3');
            overlay.classList.add('hsg-climax-boom');
            overlay.innerHTML = `<div class="hsg-result win">
                <div class="hsg-result-big">✨ 璀璨絕頂的高潮……！</div>
                <div class="hsg-result-sub">十指緊扣的掌心滾燙，整個人融化在星光與愛意裡。</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.nextEvent(); }, 1800);
        };

        const loseGame = () => {
            if (finished) return;
            finished = true; cleanup();
            this.playSound('assets/audio/sfx/心跳聲.mp3');
            overlay.innerHTML = `<div class="hsg-result lose">
                <div class="hsg-result-big">💦 差一點點……</div>
                <div class="hsg-result-sub">交扣的手鬆開了……穩住熱度，重來一次！</div>
            </div>`;
            setTimeout(() => { overlay.remove(); this.startHStarlightGripQTE(event); }, 1700);
        };

        const startHold = (e) => {
            if (e) e.preventDefault();
            if (finished) return;
            holding = true;
            btn.classList.add('holding');
            handIcon.classList.add('active');
        };

        const endHold = () => {
            holding = false;
            btn.classList.remove('holding');
            handIcon.classList.remove('active');
        };

        const tapPulsePoint = (e) => {
            if (e) e.stopPropagation();
            if (finished || !pulseActive) return;
            pulseActive = false;
            pulsePoint.classList.remove('active');
            bliss = Math.min(100, bliss + 22);
            this.playSound('assets/audio/sfx/親吻.mp3');
            overlay.classList.remove('hsg-shake'); void overlay.offsetWidth; overlay.classList.add('hsg-shake');
            showFeedback('🌟 PERFECT 衝擊迎合！', true);
            spawnStarParticle();
            fillEl.style.width = bliss + '%';

            if (cfg.whispers.length) {
                whisperEl.textContent = cfg.whispers[whisperIdx % cfg.whispers.length];
                whisperIdx++;
            }

            if (bliss >= cfg.needBliss) winGame();
        };

        btn.addEventListener('pointerdown', startHold);
        stage.addEventListener('pointerdown', startHold);
        window.addEventListener('pointerup', endHold);
        pulsePoint.addEventListener('pointerdown', tapPulsePoint);

        const loop = (ts) => {
            if (finished) return;
            if (lastTs == null) lastTs = ts;
            const dt = Math.min(0.05, (ts - lastTs) / 1000);
            lastTs = ts; elapsed += dt;

            if (holding) {
                bliss = Math.min(100, bliss + 14 * dt);
                fillEl.style.width = bliss + '%';
                if (Math.random() < 0.1) spawnStarParticle();
            } else {
                bliss = Math.max(0, bliss - 6 * dt);
                fillEl.style.width = bliss + '%';
            }

            // Pulse wave timer
            pulseTimer += dt;
            if (pulseTimer >= pulseInterval) {
                pulseTimer = 0;
                pulseActive = true;
                pulsePoint.style.left = (20 + Math.random() * 60) + '%';
                pulsePoint.style.top = (25 + Math.random() * 45) + '%';
                pulsePoint.classList.add('active');
                this.playSound('assets/audio/sfx/心跳聲.mp3');
                setTimeout(() => {
                    if (pulseActive) {
                        pulseActive = false;
                        pulsePoint.classList.remove('active');
                    }
                }, 1400);
            }

            timerEl.textContent = Math.max(0, cfg.time - elapsed).toFixed(1) + 's';
            if (bliss >= cfg.needBliss) { winGame(); return; }
            if (elapsed >= cfg.time) {
                if (bliss >= 80) winGame(); else loseGame();
                return;
            }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
    };
})();


