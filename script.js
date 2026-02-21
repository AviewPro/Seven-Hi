let TEXT_DATA = null;

// JSON 로드 완료 시까지 기다리는 Promise 생성
const dataPromise = fetch('textdata.json')
    .then(res => res.json())
    .then(data => {
        TEXT_DATA = data;
        document.getElementById('msg-box').innerText = TEXT_DATA.gameMsg.ready;
        return data;
    })
    .catch(err => console.error("Data Load Error:", err));

const firebaseConfig = { 
    apiKey: "AIzaSyCvxUeqc28cRZ8RL4jpAwtakMxRo5d6zbU", 
    authDomain: "aviewpro.firebaseapp.com", 
    databaseURL: "https://aviewpro-default-rtdb.asia-southeast1.firebasedatabase.app", 
    projectId: "aviewpro", 
    storageBucket: "aviewpro.firebasestorage.app", 
    messagingSenderId: "592622610945", 
    appId: "1:592622610945:web:7d56b09e966a4faac62e00", 
    measurementId: "G-NZQ5ZFXG2F" 
};

window.addEventListener('keydown', (e) => {
    if (document.getElementById('main-screen').style.display !== 'none') return;
    if (e.key === 'Shift') {
        const gameOverOverlay = document.getElementById('game-over-overlay');
        if (gameOverOverlay.style.display === 'flex') {
            playDelt4(); gm.resetForNewGame();
            return;
        }
    }
    if (e.key === 'Enter') {
        const dealBtn = document.getElementById('btn-deal');
        const revealBtn = document.getElementById('btn-reveal');
        const showdownBtn = document.getElementById('btn-showdown');
        if (!dealBtn.disabled) { playDelt4(); gm.handleBtnClick('deal'); }
        else if (!revealBtn.disabled) gm.handleBtnClick('reveal');
        else if (!showdownBtn.disabled) gm.handleBtnClick('showdown');
    }
    if (gm.phase === 'reveal' && ['1', '2', '3', '4', '5'].includes(e.key)) {
        gm.toggleCardSelection(parseInt(e.key) - 1);
    }
    if (e.key === '0') {
        const foldBtn = document.getElementById('btn-fold');
        if (!foldBtn.disabled) gm.handleBtnClick('fold');
    }
});

function playDelt4() {
    const sfx = document.getElementById('sfx-delt4');
    if(sfx) {
        sfx.volume = 1.0; sfx.currentTime = 0; sfx.play().catch(e => {});
    }
}

function updateMasterVol(type, val) {
    if(type === 'bgm') document.getElementById('bgm').volume = val;
    if(type === 'sfx') gm.sfxVol = val;
}

function toggleSoundPanel() {
    const p = document.getElementById('sound-panel');
    p.style.display = p.style.display === 'flex' ? 'none' : 'flex';
}

const VAL_ORDER = {'7':6, 'A':5, '5':4, '4':3, '3':2, '2':1};
const SUIT_ORDER = {'♠':4, '♥':3, '♦':2, '♣':1, 'N':0};
const VALUES = ['2', '3', '4', '5', 'A'];
const SUITS = ['♠', '♥', '♣', '♦'];

let _0xisTutorial = false;
let _0xtutorialStep = 0;

async function _0x1d2e() {
    if (!TEXT_DATA) await dataPromise; 
    _0xisTutorial = true; _0xtutorialStep = 1;
    document.getElementById('main-screen').style.display = 'none';
    document.body.classList.add('tutorial-active-lock');
    window.addEventListener('keydown', _0xHandleEsc);
    _0xappTut();
}

function _0xHandleEsc(e) { if (e.key === 'Escape') { _0xisTutorial = false; location.reload(); } }

function _0xappTut() {
    if (!TEXT_DATA) return;
    const title = document.getElementById('tut-title');
    const desc = document.getElementById('tut-desc');
    const overlay = document.getElementById('tutorial-overlay');
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    
    const stepKey = 'step' + _0xtutorialStep;
    const data = TEXT_DATA.tutorial[stepKey];
    
    if (data) {
        title.innerText = data.title;
        desc.innerHTML = data.content;
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
        if (_0xtutorialStep === 4) document.getElementById('btn-deal').classList.add('tutorial-highlight');
        if (_0xtutorialStep === 7) { 
            document.getElementById('zone-human').classList.add('tutorial-highlight'); 
            document.getElementById('btn-reveal').classList.add('tutorial-highlight'); 
        }
        if (_0xtutorialStep === 10) { 
            document.getElementById('btn-showdown').classList.add('tutorial-highlight'); 
            document.getElementById('btn-fold').classList.add('tutorial-highlight'); 
        }
    }
}

function _0x5a1b() {
    const btnSfx = document.getElementById('sfx-btn');
    btnSfx.volume = gm.sfxVol; btnSfx.currentTime = 0; btnSfx.play().catch(e => {});
    _0xtutorialStep++;
    if (_0xtutorialStep > 12) { _0xisTutorial = false; location.reload(); return; }
    _0xappTut();
}

const gm = {
    round: 1, players: ['ai1', 'ai2', 'ai3', 'human'],
    totalScores: { ai1:0, ai2:0, ai3:0, human:0 },
    roundLogs: { ai1: Array(7).fill(''), ai2: Array(7).fill(''), ai3: Array(7).fill(''), human: Array(7).fill('') },
    hands: { ai1:[], ai2:[], ai3:[], human:[] },
    revealedIdx: { ai1:[], ai2:[], ai3:[], human:[] },
    isFolded: { ai1:false, ai2:false, ai3:false, human:false },
    selected: [], deckLeft: [], phase: 'idle', sfxVol: 0.4,

    handleBtnClick(action) {
        const btnSfx = document.getElementById('sfx-btn');
        btnSfx.volume = this.sfxVol; btnSfx.currentTime = 0; btnSfx.play().catch(e => {});
        if(action === 'deal') { this.deal(); if(_0xisTutorial && _0xtutorialStep === 4) { _0xtutorialStep = 5; _0xappTut(); } }
        if(action === 'reveal') { this.toFoldPhase(); if(_0xisTutorial && _0xtutorialStep === 7) { _0xtutorialStep = 8; _0xappTut(); } }
        if(action === 'fold' || action === 'showdown') { if(action === 'fold') this.humanFold(); else this.executeShowdown(); if(_0xisTutorial && _0xtutorialStep === 10) { _0xtutorialStep = 11; _0xappTut(); } }
    },
    startGame() { document.getElementById('main-screen').style.display = 'none'; this.handleBtnClick('deal'); },
    resetForNewGame() {
        document.getElementById('game-over-overlay').style.display = 'none';
        this.round = 1; this.totalScores = { ai1:0, ai2:0, ai3:0, human:0 };
        this.roundLogs = { ai1: Array(7).fill(''), ai2: Array(7).fill(''), ai3: Array(7).fill(''), human: Array(7).fill('') };
        this.deal();
    },
    deal() {
        const audio = document.getElementById('bgm'); if(audio.paused) { audio.volume = 0.06; audio.play().catch(e => {}); }
        if (this.round > 7) return;
        this.phase = 'reveal'; this.selected = []; this.isFolded = { ai1:false, ai2:false, ai3:false, human:false };
        this.clearResults();
        this.players.forEach(p => { 
            document.getElementById('zone-'+p).classList.remove('folded'); 
            document.getElementById('fold-rank-'+p).innerText = ""; 
            const resEl = document.getElementById('res-'+p); resEl.className = 'p-result'; resEl.innerText = ""; 
        });
        let deck = []; VALUES.forEach(v => SUITS.forEach(s => deck.push({v, s, is7:false})));
        deck.push({v: '7', s: 'N', is7: true}); deck.sort(() => Math.random() - 0.5);
        this.players.forEach((p, i) => { 
            this.hands[p] = deck.slice(i * 5, (i + 1) * 5); 
            if(p.startsWith('ai')) this.aiDecideReveal(p); 
        });
        this.deckLeft = deck.slice(20);
        document.getElementById('btn-deal').disabled = true; 
        document.getElementById('msg-box').innerText = TEXT_DATA ? TEXT_DATA.gameMsg.selectReveal : "";
        this.render(true);
        this.updateUI(); 
        this.showUnrevealed();
    },

    aiDecideReveal(p) {
        const hand = this.hands[p];
        const ev = this.evaluate(hand);
        const vCounts = {};
        hand.forEach((c, i) => { vCounts[c.v] = vCounts[c.v] || []; vCounts[c.v].push(i); });
        let hideIdx = -1;
        if (ev.rank === 0.5) {
            const pairVal = Object.keys(vCounts).find(v => vCounts[v].length === 2);
            if (pairVal) hideIdx = vCounts[pairVal][0];
        } 
        else if (ev.rank === 10) { hideIdx = hand.findIndex(c => c.is7); } 
        else if (ev.rank === 6) {
            const fourVal = Object.keys(vCounts).find(v => vCounts[v].length === 4);
            if (fourVal) hideIdx = vCounts[fourVal][0];
        }
        if (hideIdx === -1) { hideIdx = Math.floor(Math.random() * 5); }
        this.revealedIdx[p] = [0, 1, 2, 3, 4].filter(i => i !== hideIdx);
    },

    aiProcessFold() {
        this.players.slice(0, 3).forEach(p => {
            if (this.isFolded[p]) return;
            const myHand = this.hands[p];
            const myEv = this.evaluate(myHand);
            const hiddenCards = [];
            this.players.forEach(pOther => {
                this.hands[pOther].forEach((c, idx) => {
                    if (!this.revealedIdx[pOther].includes(idx)) hiddenCards.push(c);
                });
            });
            this.deckLeft.forEach(c => hiddenCards.push(c));
            let scenarios = [];
            const generateScenarios = (pool, count, current = []) => {
                if (current.length === count) { scenarios.push([...current]); return; }
                for (let i = 0; i < pool.length; i++) {
                    let nextPool = [...pool];
                    let pick = nextPool.splice(i, 1)[0];
                    generateScenarios(nextPool, count, [...current, pick]);
                    if (scenarios.length >= 24) return;
                }
            };
            generateScenarios(hiddenCards, 4);
            let winCount = 0, highRankCount = 0, opponentFixedHighRank = false;
            this.players.forEach(pOther => {
                if (pOther === p) return;
                const revealed = this.revealedIdx[pOther].map(idx => this.hands[pOther][idx]);
                const evFixed = this.evaluate(revealed);
                if (evFixed.rank >= 1) opponentFixedHighRank = true;
            });
            scenarios.forEach(scenario => {
                const othersFullHands = {};
                let sIdx = 0;
                this.players.forEach(pOther => {
                    if (pOther === p) return;
                    const fullHand = this.revealedIdx[pOther].map(idx => this.hands[pOther][idx]);
                    fullHand.push(scenario[sIdx++]);
                    othersFullHands[pOther] = this.evaluate(fullHand);
                });
                const allRes = [myEv, ...Object.values(othersFullHands)];
                const pOtherKeys = Object.keys(othersFullHands);
                let isIWin = true;
                pOtherKeys.forEach(pk => {
                    if (this.compare(myEv, othersFullHands[pk], allRes) < 0) isIWin = false;
                    if (othersFullHands[pk].rank >= 1) highRankCount++;
                });
                if (isIWin) winCount++;
            });
            let shouldStay = false;
            if (myEv.rank === 10) {
                if (opponentFixedHighRank) shouldStay = true;
                else if (highRankCount >= 18) shouldStay = true;
                else if (Math.random() < 0.5) shouldStay = true;
            } else {
                if (winCount >= 6) shouldStay = true;
            }
            if (!shouldStay) this.fold(p, 1);
        });
    },

    toFoldPhase() {
        this.phase = 'fold'; this.revealedIdx.human = [...this.selected]; this.selected = [];
        document.getElementById('btn-reveal').disabled = true; document.getElementById('btn-fold').disabled = false; document.getElementById('btn-showdown').disabled = false;
        document.getElementById('msg-box').innerText = TEXT_DATA ? TEXT_DATA.gameMsg.chooseAction : "";
        this.render(); this.showUnrevealed();
    },

    humanFold() { this.aiProcessFold(); this.fold('human', 1); this.executeShowdown(true); },
    fold(p, score) { 
        if (!this.isFolded[p]) { 
            this.isFolded[p] = true; this.totalScores[p] += score; this.roundLogs[p][this.round-1] = score; 
            const ev = this.evaluate(this.hands[p]); document.getElementById('fold-rank-'+p).innerText = `(${ev.name})`; 
            const resEl = document.getElementById('res-'+p); resEl.className = 'p-result txt-fold'; resEl.innerText = "FOLD (+1)";
        } 
    },

    showUnrevealed() {
        const el = document.getElementById('remaining-cards'); 
        if (!el) return;
        el.innerHTML = "";
        if (this.phase === 'reveal' || this.phase === 'idle') { 
            for (let i = 0; i < 4; i++) { const div = document.createElement('div'); div.className = "mini-card locked"; el.appendChild(div); } 
            return; 
        }
        let unrevealed = []; 
        if (this.phase === 'result') { unrevealed = [...this.deckLeft]; } 
        else { 
            unrevealed = [...this.deckLeft]; 
            this.players.slice(0, 3).forEach(p => { 
                this.hands[p].forEach((c, i) => { if(!this.revealedIdx[p].includes(i)) unrevealed.push(c); }); 
            }); 
        }
        unrevealed.sort((a, b) => this.cardCmp(a, b)).forEach(c => {
            const div = document.createElement('div'); 
            div.className = `mini-card ${c.is7?'special':(c.s==='♥'||c.s==='♦'?'red':'black')}`;
            div.innerHTML = `<div class="suit">${c.s==='N'?'★':c.s}</div><div class="val">${c.v}</div>`; 
            el.appendChild(div);
        });
    },

    executeShowdown(isHumanFolded = false) {
        this.phase = 'result'; if (!isHumanFolded) this.aiProcessFold(); 
        document.getElementById('btn-fold').disabled = true; document.getElementById('btn-showdown').disabled = true;
        const activePlayers = this.players.filter(p => !this.isFolded[p]);
        if (activePlayers.length > 0) {
            const results = {}; this.players.forEach(p => results[p] = this.evaluate(this.hands[p]));
            const winners = this.judge(results, activePlayers);
            this.players.forEach(p => { if(!this.isFolded[p]) { const resEl = document.getElementById('res-'+p); resEl.innerText = results[p].name; resEl.className = winners.includes(p) ? "p-result txt-win" : "p-result txt-lose"; } });
            winners.forEach(w => { let s = activePlayers.length + 2 + (results[w].rank === 10 ? 1 : 0); this.totalScores[w] += s; this.roundLogs[w][this.round-1] = s; });
            activePlayers.forEach(p => { if(!winners.includes(p)) this.roundLogs[p][this.round-1] = 0; });
        }
        this.render(); this.updateUI(); this.showUnrevealed();
        if (this.round >= 7) setTimeout(() => this.showFinalResult(), 2000); 
        else { this.round++; document.getElementById('btn-deal').disabled = false; }
    },

    showFinalResult() {
        document.getElementById('game-over-overlay').style.display = 'flex';
    },

    evaluate(cards) {
        let v = {}, has7 = false; let sorted = [...cards].sort((a, b) => this.cardCmp(a, b)); 
        cards.forEach(c => { v[c.v] = (v[c.v] || 0) + 1; if (c.is7) has7 = true; });
        let counts = Object.entries(v).sort((a,b) => b[1] - a[1] || VAL_ORDER[b[0]] - VAL_ORDER[a[0]]);
        let res = { rank: 0, name: "HIGH CARD", score_arr: sorted.map(c => VAL_ORDER[c.v]), is7: has7, cards: sorted };
        if (counts[0][1] === 4) res = { rank: 6, name: "FOUR CARD", score_arr: [VAL_ORDER[counts[0][0]]], is7: has7, cards: sorted };
        else if (Object.keys(v).length === 5 && cards.length === 5 && (VAL_ORDER[sorted[0].v] - VAL_ORDER[sorted[4].v] === 4) && !has7) res = { rank: 4, name: "STRAIGHT", score_arr: [VAL_ORDER[sorted[0].v]], is7: has7, cards: sorted };
        else if (counts[0][1] === 3 && counts[1] && counts[1][1] === 2) res = { rank: 3, name: "FULL HOUSE", score_arr: [VAL_ORDER[counts[0][0]]], is7: has7, cards: sorted };
        else if (counts[0][1] === 3) res = { rank: 2, name: "TRIPLE", score_arr: [VAL_ORDER[counts[0][0]]], is7: has7, cards: sorted };
        else if (counts[0][1] === 2 && counts[1] && counts[1][1] === 2) res = { rank: 1, name: "TWO PAIR", score_arr: [VAL_ORDER[counts[0][0]], VAL_ORDER[counts[1][0]]], is7: has7, cards: sorted };
        else if (counts[0][1] === 2) res = { rank: 0.5, name: "ONE PAIR", score_arr: [VAL_ORDER[counts[0][0]]], is7: has7, cards: sorted };
        if (res.rank === 0 && has7) return { rank: 10, name: "7-HIGH", score_arr: sorted.map(c => VAL_ORDER[c.v]), is7: true, cards: sorted };
        return res;
    },

    judge(res, activeKeys) { 
        const has7Hi = activeKeys.some(k => res[k].rank === 10);
        const hasOnePair = activeKeys.some(k => res[k].rank === 0.5);
        if (has7Hi && hasOnePair) {
            const onePairKeys = activeKeys.filter(k => res[k].rank === 0.5);
            let winner = onePairKeys[0];
            for (let i = 1; i < onePairKeys.length; i++) { if (this.compareNormal(res[onePairKeys[i]], res[winner]) > 0) winner = onePairKeys[i]; }
            return onePairKeys.filter(k => this.compareNormal(res[k], res[winner]) === 0);
        }
        const winners = []; 
        activeKeys.forEach(p => { 
            let win = true; 
            activeKeys.forEach(o => { if (p !== o && this.compare(res[p], res[o], activeKeys.map(k => res[k])) < 0) win = false; }); 
            if (win) winners.push(p); 
        }); 
        return winners; 
    },

    compare(r1, r2, allResults) {
        const has7HiOnField = allResults.some(r => r.rank === 10);
        if (has7HiOnField) {
            if (r1.rank === 10) {
                if (r2.rank === 0.5) return -1;
                if (r2.rank === 10) return 0;
                return 1;
            }
            if (r1.rank === 0.5) return 1;
            if (r1.rank >= 1 && r1.rank <= 6) {
                if (r2.rank === 10) return -1;
                return this.compareNormal(r1, r2);
            }
        }
        return this.compareNormal(r1, r2);
    },

    compareNormal(r1, r2) { 
        if (r1.rank > r2.rank) return 1; 
        if (r1.rank < r2.rank) return -1; 
        for (let i = 0; i < r1.score_arr.length; i++) { 
            if (r1.score_arr[i] > r2.score_arr[i]) return 1; 
            if (r1.score_arr[i] < r2.score_arr[i]) return -1; 
        } 
        const s1 = SUIT_ORDER[r1.cards[0].s], s2 = SUIT_ORDER[r2.cards[0].s];
        if (s1 > s2) return 1; if (s1 < s2) return -1;
        return 0; 
    },
    
    updateUI() {
        document.getElementById('round-info').innerText = `ROUND ${this.round} / 7`;
        const container = document.getElementById('side-score');
        if(!container) return;
        const maxScore = Math.max(...Object.values(this.totalScores));
        container.innerHTML = this.players.map(p => {
            const logs = this.roundLogs[p].map(l => `<td>${l}</td>`).join("");
            const myClass = (p === 'human') ? 'my-score' : '';
            const scoreClass = (this.totalScores[p] === maxScore && maxScore > 0) ? 'total-winner' : 'total-normal';
            return `<div class="score-player-unit ${myClass}"><div class="p-top-info"><span class="p-name-label">${p === 'human' ? 'YOU' : 'Bot ' + p.slice(-1)}</span><span class="p-total-label ${scoreClass}">${this.totalScores[p]}</span></div><table class="p-mini-table"><tr><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>R5</th><th>R6</th><th>R7</th></tr><tr>${logs}</tr></table></div>`;
        }).join("");
    },

    clearResults() { this.players.forEach(p => document.getElementById('res-'+p).innerText = ""); },
    cardCmp(a, b) { if (VAL_ORDER[a.v] !== VAL_ORDER[b.v]) return VAL_ORDER[b.v] - VAL_ORDER[a.v]; return SUIT_ORDER[b.s] - SUIT_ORDER[a.s]; },
    
    toggleCardSelection(idx) {
        const clickSfx = document.getElementById('sfx-click'); 
        if(clickSfx) {
            clickSfx.volume = this.sfxVol; clickSfx.play().catch(e => {});
        }
        const sIdx = this.selected.indexOf(idx); if (sIdx > -1) this.selected.splice(sIdx, 1); else if (this.selected.length < 4) this.selected.push(idx);
        document.getElementById('btn-reveal').disabled = (this.selected.length !== 4);
        this.render();
    },

    render(withAnim = false) {
        this.players.forEach(pKey => {
            const isAI = pKey.startsWith('ai'); const el = document.getElementById('cards-' + pKey); el.innerHTML = "";
            let indices = [0,1,2,3,4];
            if (this.phase !== 'reveal') {
                indices.sort((a, b) => {
                    const aRev = this.revealedIdx[pKey].includes(a);
                    const bRev = this.revealedIdx[pKey].includes(b);
                    if (aRev !== bRev) return bRev - aRev;
                    return this.cardCmp(this.hands[pKey][a], this.hands[pKey][b]);
                });
            }
            indices.forEach((origIdx, vIdx) => {
                const c = this.hands[pKey][origIdx]; 
                const div = document.createElement('div'); 
                div.className = `card ${(c.s==='♥'||c.s==='♦'?'red':'black')}`;
                if (this.isFolded[pKey]) div.classList.add('folded-filter');
                if (withAnim && pKey === 'human') { div.classList.add('human-deal-anim'); div.style.animationDelay = `${vIdx * 0.52}s`; }
                let isVisible = !isAI || (this.phase === 'fold' && this.revealedIdx[pKey].includes(origIdx)) || this.phase === 'result';
                if (!isVisible) div.classList.add('hidden'); 
                else { 
                    if (c.is7) div.classList.add('special'); 
                    div.innerHTML = `<div class="suit">${c.s==='N'?'★':c.s}</div><div class="val">${c.v}</div>`; 
                }
                if (this.phase !== 'reveal') {
                    if (this.revealedIdx[pKey].includes(origIdx)) div.classList.add('revealed-border');
                    if (vIdx === 4) div.classList.add('push-right');
                }
                if (!isAI && this.phase === 'reveal') {
                    if (this.selected.includes(origIdx)) div.classList.add('selected');
                    div.onclick = () => this.toggleCardSelection(origIdx);
                }
                el.appendChild(div);
            });
        });
    }
};