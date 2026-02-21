let _0x2a1b = null;
const _0x4c2e = fetch('textdata.json').then(_0x1b2c => _0x1b2c.json()).then(_0x5d3e => {
    _0x2a1b = _0x5d3e;
    document.getElementById('msg-box').innerText = _0x2a1b.gameMsg.ready;
    return _0x5d3e;
}).catch(_0x9f8e => console.error("Data Load Error:", _0x9f8e));

const _0xfbConfig = {
    apiKey: "AIzaSyCvxUeqc28cRZ8RL4jpAwtakMxRo5d6zbU",
    authDomain: "aviewpro.firebaseapp.com",
    databaseURL: "https://aviewpro-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aviewpro",
    storageBucket: "aviewpro.firebasestorage.app",
    messagingSenderId: "592622610945",
    appId: "1:592622610945:web:7d56b09e966a4faac62e00",
    measurementId: "G-NZQ5ZFXG2F"
};

window.addEventListener('keydown', (_0xe) => {
    if (document.getElementById('main-screen').style.display !== 'none') return;
    if (_0xe.key === 'Shift') {
        const _0xov = document.getElementById('game-over-overlay');
        if (_0xov.style.display === 'flex') {
            _0x5a1b2c(); _0x4f2d1e.resetForNewGame();
            return;
        }
    }
    if (_0xe.key === 'Enter') {
        const _0xdB = document.getElementById('btn-deal');
        const _0xrB = document.getElementById('btn-reveal');
        const _0xsB = document.getElementById('btn-showdown');
        if (!_0xdB.disabled) { _0x5a1b2c(); _0x4f2d1e.handleBtnClick('deal'); }
        else if (!_0xrB.disabled) _0x4f2d1e.handleBtnClick('reveal');
        else if (!_0xsB.disabled) _0x4f2d1e.handleBtnClick('showdown');
    }
    if (_0x4f2d1e.phase === 'reveal' && ['1', '2', '3', '4', '5'].includes(_0xe.key)) {
        _0x4f2d1e.toggleCardSelection(parseInt(_0xe.key) - 1);
    }
    if (_0xe.key === '0') {
        const _0xfB = document.getElementById('btn-fold');
        if (!_0xfB.disabled) _0x4f2d1e.handleBtnClick('fold');
    }
});

function _0x5a1b2c() {
    const _0xs = document.getElementById('sfx-delt4');
    if (_0xs) {
        _0xs.volume = 1.0; _0xs.currentTime = 0; _0xs.play().catch(_0xerr => {});
    }
}

function _0x7a8b9c(_0xt, _0xv) {
    if (_0xt === 'bgm') document.getElementById('bgm').volume = _0xv;
    if (_0xt === 'sfx') _0x4f2d1e.sfxVol = _0xv;
}

function _0x2c3d4e() {
    const _0xp = document.getElementById('sound-panel');
    _0xp.style.display = _0xp.style.display === 'flex' ? 'none' : 'flex';
}

const _0xVO = {'7':6, 'A':5, '5':4, '4':3, '3':2, '2':1};
const _0xSO = {'♠':4, '♥':3, '♦':2, '♣':1, 'N':0};
const _0xV = ['2', '3', '4', '5', 'A'];
const _0xS = ['♠', '♥', '♣', '♦'];

let _0xist = false;
let _0xst = 0;

async function _0x1a2b3c() {
    if (!_0x2a1b) await _0x4c2e;
    _0xist = true; _0xst = 1;
    document.getElementById('main-screen').style.display = 'none';
    document.body.classList.add('tutorial-active-lock');
    window.addEventListener('keydown', _0xHesc);
    _0xappTut();
}

function _0xHesc(_0xe) { if (_0xe.key === 'Escape') { _0xist = false; location.reload(); } }

function _0xappTut() {
    if (!_0x2a1b) return;
    const _0xti = document.getElementById('tut-title');
    const _0xde = document.getElementById('tut-desc');
    const _0xov = document.getElementById('tutorial-overlay');
    document.querySelectorAll('.tutorial-highlight').forEach(_0xel => _0xel.classList.remove('tutorial-highlight'));
    const _0xsk = 'step' + _0xst;
    const _0xd = _0x2a1b.tutorial[_0xsk];
    if (_0xd) {
        _0xti.innerText = _0xd.title;
        _0xde.innerHTML = _0xd.content;
        _0xov.style.display = 'flex';
    } else {
        _0xov.style.display = 'none';
        if (_0xst === 4) document.getElementById('btn-deal').classList.add('tutorial-highlight');
        if (_0xst === 7) {
            document.getElementById('zone-human').classList.add('tutorial-highlight');
            document.getElementById('btn-reveal').classList.add('tutorial-highlight');
        }
        if (_0xst === 10) {
            document.getElementById('btn-showdown').classList.add('tutorial-highlight');
            document.getElementById('btn-fold').classList.add('tutorial-highlight');
        }
    }
}

function _0x3d4e5f() {
    const _0xbs = document.getElementById('sfx-btn');
    _0xbs.volume = _0x4f2d1e.sfxVol; _0xbs.currentTime = 0; _0xbs.play().catch(_0xerr => {});
    _0xst++;
    if (_0xst > 12) { _0xist = false; location.reload(); return; }
    _0xappTut();
}

const _0x4f2d1e = {
    round: 1, players: ['ai1', 'ai2', 'ai3', 'human'],
    totalScores: { ai1:0, ai2:0, ai3:0, human:0 },
    roundLogs: { ai1: Array(7).fill(''), ai2: Array(7).fill(''), ai3: Array(7).fill(''), human: Array(7).fill('') },
    hands: { ai1:[], ai2:[], ai3:[], human:[] },
    revealedIdx: { ai1:[], ai2:[], ai3:[], human:[] },
    isFolded: { ai1:false, ai2:false, ai3:false, human:false },
    selected: [], deckLeft: [], phase: 'idle', sfxVol: 0.4,

    handleBtnClick(_0xa) {
        const _0xbs = document.getElementById('sfx-btn');
        _0xbs.volume = this.sfxVol; _0xbs.currentTime = 0; _0xbs.play().catch(_0xerr => {});
        if(_0xa === 'deal') { this.deal(); if(_0xist && _0xst === 4) { _0xst = 5; _0xappTut(); } }
        if(_0xa === 'reveal') { this.toFoldPhase(); if(_0xist && _0xst === 7) { _0xst = 8; _0xappTut(); } }
        if(_0xa === 'fold' || _0xa === 'showdown') { if(_0xa === 'fold') this.humanFold(); else this.executeShowdown(); if(_0xist && _0xst === 10) { _0xst = 11; _0xappTut(); } }
    },
    startGame() { document.getElementById('main-screen').style.display = 'none'; this.handleBtnClick('deal'); },
    resetForNewGame() {
        document.getElementById('game-over-overlay').style.display = 'none';
        this.round = 1; this.totalScores = { ai1:0, ai2:0, ai3:0, human:0 };
        this.roundLogs = { ai1: Array(7).fill(''), ai2: Array(7).fill(''), ai3: Array(7).fill(''), human: Array(7).fill('') };
        this.deal();
    },
    deal() {
        const _0xaud = document.getElementById('bgm'); if(_0xaud.paused) { _0xaud.volume = 0.06; _0xaud.play().catch(_0xe => {}); }
        if (this.round > 7) return;
        this.phase = 'reveal'; this.selected = []; this.isFolded = { ai1:false, ai2:false, ai3:false, human:false };
        this.clearResults();
        this.players.forEach(_0xp => {
            document.getElementById('zone-'+_0xp).classList.remove('folded');
            document.getElementById('fold-rank-'+_0xp).innerText = "";
            const _0xre = document.getElementById('res-'+_0xp); _0xre.className = 'p-result'; _0xre.innerText = "";
        });
        let _0xdk = []; _0xV.forEach(_0xv => _0xS.forEach(_0xs => _0xdk.push({v:_0xv, s:_0xs, is7:false})));
        _0xdk.push({v: '7', s: 'N', is7: true}); _0xdk.sort(() => Math.random() - 0.5);
        this.players.forEach((_0xp, _0xi) => {
            this.hands[_0xp] = _0xdk.slice(_0xi * 5, (_0xi + 1) * 5);
            if(_0xp.startsWith('ai')) this.aiDecideReveal(_0xp);
        });
        this.deckLeft = _0xdk.slice(20);
        document.getElementById('btn-deal').disabled = true;
        document.getElementById('msg-box').innerText = _0x2a1b ? _0x2a1b.gameMsg.selectReveal : "";
        this.render(true);
        this.updateUI();
        this.showUnrevealed();
    },

    aiDecideReveal(_0xp) {
        const _0xh = this.hands[_0xp];
        const _0xev = this.evaluate(_0xh);
        const _0xvc = {};
        _0xh.forEach((_0xc, _0xi) => { _0xvc[_0xc.v] = _0xvc[_0xc.v] || []; _0xvc[_0xc.v].push(_0xi); });
        let _0xhi = -1;
        if (_0xev.rank === 0.5) {
            const _0xpv = Object.keys(_0xvc).find(_0xv => _0xvc[_0xv].length === 2);
            if (_0xpv) _0xhi = _0xvc[_0xpv][0];
        } else if (_0xev.rank === 10) {
            _0xhi = _0xh.findIndex(_0xc => _0xc.is7);
        } else if (_0xev.rank === 6) {
            const _0xfv = Object.keys(_0xvc).find(_0xv => _0xvc[_0xv].length === 4);
            if (_0xfv) _0xhi = _0xvc[_0xfv][0];
        }
        if (_0xhi === -1) { _0xhi = Math.floor(Math.random() * 5); }
        this.revealedIdx[_0xp] = [0, 1, 2, 3, 4].filter(_0xi => _0xi !== _0xhi);
    },

    aiProcessFold() {
        this.players.slice(0, 3).forEach(_0xp => {
            if (this.isFolded[_0xp]) return;
            const _0xmh = this.hands[_0xp];
            const _0xme = this.evaluate(_0xmh);
            const _0xhc = [];
            this.players.forEach(_0xpo => {
                this.hands[_0xpo].forEach((_0xc, _0xidx) => {
                    if (!this.revealedIdx[_0xpo].includes(_0xidx)) _0xhc.push(_0xc);
                });
            });
            this.deckLeft.forEach(_0xc => _0xhc.push(_0xc));
            let _0xscen = [];
            const _0xgs = (_0xpool, _0xcount, _0xcurr = []) => {
                if (_0xcurr.length === _0xcount) { _0xscen.push([..._0xcurr]); return; }
                for (let _0xi = 0; _0xi < _0xpool.length; _0xi++) {
                    let _0xnp = [..._0xpool];
                    let _0xpk = _0xnp.splice(_0xi, 1)[0];
                    _0xgs(_0xnp, _0xcount, [..._0xcurr, _0xpk]);
                    if (_0xscen.length >= 24) return;
                }
            };
            _0xgs(_0xhc, 4);
            let _0xwc = 0, _0xhrc = 0, _0xofhr = false;
            this.players.forEach(_0xpo => {
                if (_0xpo === _0xp) return;
                const _0xrev = this.revealedIdx[_0xpo].map(_0xidx => this.hands[_0xpo][_0xidx]);
                const _0xef = this.evaluate(_0xrev);
                if (_0xef.rank >= 1) _0xofhr = true;
            });
            _0xscen.forEach(_0xsc => {
                const _0xofh = {};
                let _0xsi = 0;
                this.players.forEach(_0xpo => {
                    if (_0xpo === _0xp) return;
                    const _0xfh = this.revealedIdx[_0xpo].map(_0xidx => this.hands[_0xpo][_0xidx]);
                    _0xfh.push(_0xsc[_0xsi++]);
                    _0xofh[_0xpo] = this.evaluate(_0xfh);
                });
                const _0xar = [_0xme, ...Object.values(_0xofh)];
                const _0xpk = Object.keys(_0xofh);
                let _0xiw = true;
                _0xpk.forEach(_0xk => {
                    if (this.compare(_0xme, _0xofh[_0xk], _0xar) < 0) _0xiw = false;
                    if (_0xofh[_0xk].rank >= 1) _0xhrc++;
                });
                if (_0xiw) _0xwc++;
            });
            let _0xss = false;
            if (_0xme.rank === 10) {
                if (_0xofhr) _0xss = true;
                else if (_0xhrc >= 18) _0xss = true;
                else if (Math.random() < 0.5) _0xss = true;
            } else {
                if (_0xwc >= 6) _0xss = true;
            }
            if (!_0xss) this.fold(_0xp, 1);
        });
    },

    toFoldPhase() {
        this.phase = 'fold'; this.revealedIdx.human = [...this.selected]; this.selected = [];
        document.getElementById('btn-reveal').disabled = true; document.getElementById('btn-fold').disabled = false; document.getElementById('btn-showdown').disabled = false;
        document.getElementById('msg-box').innerText = _0x2a1b ? _0x2a1b.gameMsg.chooseAction : "";
        this.render(); this.showUnrevealed();
    },

    humanFold() { this.aiProcessFold(); this.fold('human', 1); this.executeShowdown(true); },
    fold(_0xp, _0xsc) {
        if (!this.isFolded[_0xp]) {
            this.isFolded[_0xp] = true; this.totalScores[_0xp] += _0xsc; this.roundLogs[_0xp][this.round-1] = _0xsc;
            const _0xev = this.evaluate(this.hands[_0xp]); document.getElementById('fold-rank-'+_0xp).innerText = `(${_0xev.name})`;
            const _0xre = document.getElementById('res-'+_0xp); _0xre.className = 'p-result txt-fold'; _0xre.innerText = "FOLD (+1)";
        }
    },

    showUnrevealed() {
        const _0xel = document.getElementById('remaining-cards');
        if (!_0xel) return;
        _0xel.innerHTML = "";
        if (this.phase === 'reveal' || this.phase === 'idle') {
            for (let _0xi = 0; _0xi < 4; _0xi++) { const _0xd = document.createElement('div'); _0xd.className = "mini-card locked"; _0xel.appendChild(_0xd); }
            return;
        }
        let _0xun = [];
        if (this.phase === 'result') { _0xun = [...this.deckLeft]; }
        else {
            _0xun = [...this.deckLeft];
            this.players.slice(0, 3).forEach(_0xp => {
                this.hands[_0xp].forEach((_0xc, _0xi) => { if(!this.revealedIdx[_0xp].includes(_0xi)) _0xun.push(_0xc); });
            });
        }
        _0xun.sort((_0xa, _0xb) => this.cardCmp(_0xa, _0xb)).forEach(_0xc => {
            const _0xd = document.createElement('div');
            _0xd.className = `mini-card ${_0xc.is7?'special':(_0xc.s==='♥'||_0xc.s==='♦'?'red':'black')}`;
            _0xd.innerHTML = `<div class="suit">${_0xc.s==='N'?'★':_0xc.s}</div><div class="val">${_0xc.v}</div>`;
            _0xel.appendChild(_0xd);
        });
    },

    executeShowdown(_0xhf = false) {
        this.phase = 'result'; if (!_0xhf) this.aiProcessFold();
        document.getElementById('btn-fold').disabled = true; document.getElementById('btn-showdown').disabled = true;
        const _0xap = this.players.filter(_0xp => !this.isFolded[_0xp]);
        if (_0xap.length > 0) {
            const _0xres = {}; this.players.forEach(_0xp => _0xres[_0xp] = this.evaluate(this.hands[_0xp]));
            const _0xwns = this.judge(_0xres, _0xap);
            this.players.forEach(_0xp => { if(!this.isFolded[_0xp]) { const _0xre = document.getElementById('res-'+_0xp); _0xre.innerText = _0xres[_0xp].name; _0xre.className = _0xwns.includes(_0xp) ? "p-result txt-win" : "p-result txt-lose"; } });
            _0xwns.forEach(_0xw => { let _0xs = _0xap.length + 2 + (_0xres[_0xw].rank === 10 ? 1 : 0); this.totalScores[_0xw] += _0xs; this.roundLogs[_0xw][this.round-1] = _0xs; });
            _0xap.forEach(_0xp => { if(!_0xwns.includes(_0xp)) this.roundLogs[_0xp][this.round-1] = 0; });
        }
        this.render(); this.updateUI(); this.showUnrevealed();
        if (this.round >= 7) setTimeout(() => this.showFinalResult(), 2000);
        else { this.round++; document.getElementById('btn-deal').disabled = false; }
    },

    showFinalResult() { document.getElementById('game-over-overlay').style.display = 'flex'; },

    evaluate(_0xcds) {
        let _0xv = {}, _0xh7 = false; let _0xsor = [..._0xcds].sort((_0xa, _0xb) => this.cardCmp(_0xa, _0xb));
        _0xcds.forEach(_0xc => { _0xv[_0xc.v] = (_0xv[_0xc.v] || 0) + 1; if (_0xc.is7) _0xh7 = true; });
        let _0xcts = Object.entries(_0xv).sort((_0xa,_0xb) => _0xb[1] - _0xa[1] || _0xVO[_0xb[0]] - _0xVO[_0xa[0]]);
        let _0xr = { rank: 0, name: "HIGH CARD", score_arr: _0xsor.map(_0xc => _0xVO[_0xc.v]), is7: _0xh7, cards: _0xsor };
        if (_0xcts[0][1] === 4) _0xr = { rank: 6, name: "FOUR CARD", score_arr: [_0xVO[_0xcts[0][0]]], is7: _0xh7, cards: _0xsor };
        else if (Object.keys(_0xv).length === 5 && _0xcds.length === 5 && (_0xVO[_0xsor[0].v] - _0xVO[_0xsor[4].v] === 4) && !_0xh7) _0xr = { rank: 4, name: "STRAIGHT", score_arr: [_0xVO[_0xsor[0].v]], is7: _0xh7, cards: _0xsor };
        else if (_0xcts[0][1] === 3 && _0xcts[1] && _0xcts[1][1] === 2) _0xr = { rank: 3, name: "FULL HOUSE", score_arr: [_0xVO[_0xcts[0][0]]], is7: _0xh7, cards: _0xsor };
        else if (_0xcts[0][1] === 3) _0xr = { rank: 2, name: "TRIPLE", score_arr: [_0xVO[_0xcts[0][0]]], is7: _0xh7, cards: _0xsor };
        else if (_0xcts[0][1] === 2 && _0xcts[1] && _0xcts[1][1] === 2) _0xr = { rank: 1, name: "TWO PAIR", score_arr: [_0xVO[_0xcts[0][0]], _0xVO[_0xcts[1][0]]], is7: _0xh7, cards: _0xsor };
        else if (_0xcts[0][1] === 2) _0xr = { rank: 0.5, name: "ONE PAIR", score_arr: [_0xVO[_0xcts[0][0]]], is7: _0xh7, cards: _0xsor };
        if (_0xr.rank === 0 && _0xh7) return { rank: 10, name: "7-HIGH", score_arr: _0xsor.map(_0xc => _0xVO[_0xc.v]), is7: true, cards: _0xsor };
        return _0xr;
    },

    judge(_0xres, _0xak) {
        const _0xh7h = _0xak.some(_0xk => _0xres[_0xk].rank === 10);
        const _0xh1p = _0xak.some(_0xk => _0xres[_0xk].rank === 0.5);
        if (_0xh7h && _0xh1p) {
            const _0x1pk = _0xak.filter(_0xk => _0xres[_0xk].rank === 0.5);
            let _0xwin = _0x1pk[0];
            for (let _0xi = 1; _0xi < _0x1pk.length; _0xi++) { if (this.compareNormal(_0xres[_0x1pk[_0xi]], _0xres[_0xwin]) > 0) _0xwin = _0x1pk[_0xi]; }
            return _0x1pk.filter(_0xk => this.compareNormal(_0xres[_0xk], _0xres[_0xwin]) === 0);
        }
        const _0xwns = [];
        _0xak.forEach(_0xp => {
            let _0xw = true;
            _0xak.forEach(_0xo => { if (_0xp !== _0xo && this.compare(_0xres[_0xp], _0xres[_0xo], _0xak.map(_0xk => _0xres[_0xk])) < 0) _0xw = false; });
            if (_0xw) _0xwns.push(_0xp);
        });
        return _0xwns;
    },

    compare(_0xr1, _0xr2, _0xar) {
        const _0xh7f = _0xar.some(_0xr => _0xr.rank === 10);
        if (_0xh7f) {
            if (_0xr1.rank === 10) {
                if (_0xr2.rank === 0.5) return -1;
                if (_0xr2.rank === 10) return 0;
                return 1;
            }
            if (_0xr1.rank === 0.5) return 1;
            if (_0xr1.rank >= 1 && _0xr1.rank <= 6) {
                if (_0xr2.rank === 10) return -1;
                return this.compareNormal(_0xr1, _0xr2);
            }
        }
        return this.compareNormal(_0xr1, _0xr2);
    },

    compareNormal(_0xr1, _0xr2) {
        if (_0xr1.rank > _0xr2.rank) return 1;
        if (_0xr1.rank < _0xr2.rank) return -1;
        for (let _0xi = 0; _0xi < _0xr1.score_arr.length; _0xi++) {
            if (_0xr1.score_arr[_0xi] > _0xr2.score_arr[_0xi]) return 1;
            if (_0xr1.score_arr[_0xi] < _0xr2.score_arr[_0xi]) return -1;
        }
        const _0xs1 = _0xSO[_0xr1.cards[0].s], _0xs2 = _0xSO[_0xr2.cards[0].s];
        if (_0xs1 > _0xs2) return 1; if (_0xs1 < _0xs2) return -1;
        return 0;
    },

    updateUI() {
        document.getElementById('round-info').innerText = `ROUND ${this.round} / 7`;
        const _0xcon = document.getElementById('side-score');
        if(!_0xcon) return;
        const _0xms = Math.max(...Object.values(this.totalScores));
        _0xcon.innerHTML = this.players.map(_0xp => {
            const _0xlg = this.roundLogs[_0xp].map(_0xl => `<td>${_0xl}</td>`).join("");
            const _0xmc = (_0xp === 'human') ? 'my-score' : '';
            const _0xsc = (this.totalScores[_0xp] === _0xms && _0xms > 0) ? 'total-winner' : 'total-normal';
            return `<div class="score-player-unit ${_0xmc}"><div class="p-top-info"><span class="p-name-label">${_0xp === 'human' ? 'YOU' : 'Bot ' + _0xp.slice(-1)}</span><span class="p-total-label ${_0xsc}">${this.totalScores[_0xp]}</span></div><table class="p-mini-table"><tr><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>R5</th><th>R6</th><th>R7</th></tr><tr>${_0xlg}</tr></table></div>`;
        }).join("");
    },

    clearResults() { this.players.forEach(_0xp => document.getElementById('res-'+_0xp).innerText = ""); },
    cardCmp(_0xa, _0xb) { if (_0xVO[_0xa.v] !== _0xVO[_0xb.v]) return _0xVO[_0xb.v] - _0xVO[_0xa.v]; return _0xSO[_0xb.s] - _0xSO[_0xa.s]; },

    toggleCardSelection(_0xidx) {
        const _0xcs = document.getElementById('sfx-click');
        if(_0xcs) { _0xcs.volume = this.sfxVol; _0xcs.play().catch(_0xe => {}); }
        const _0xsi = this.selected.indexOf(_0xidx); if (_0xsi > -1) this.selected.splice(_0xsi, 1); else if (this.selected.length < 4) this.selected.push(_0xidx);
        document.getElementById('btn-reveal').disabled = (this.selected.length !== 4);
        this.render();
    },

    render(_0xwa = false) {
        this.players.forEach(_0xpk => {
            const _0xisA = _0xpk.startsWith('ai'); const _0xel = document.getElementById('cards-' + _0xpk); _0xel.innerHTML = "";
            let _0xind = [0,1,2,3,4];
            if (this.phase !== 'reveal') {
                _0xind.sort((_0xa, _0xb) => {
                    const _0xar = this.revealedIdx[_0xpk].includes(_0xa);
                    const _0xbr = this.revealedIdx[_0xpk].includes(_0xb);
                    if (_0xar !== _0xbr) return _0xbr - _0xar;
                    return this.cardCmp(this.hands[_0xpk][_0xa], this.hands[_0xpk][_0xb]);
                });
            }
            _0xind.forEach((_0xoid, _0xvid) => {
                const _0xc = this.hands[_0xpk][_0xoid];
                const _0xdiv = document.createElement('div');
                _0xdiv.className = `card ${(_0xc.s==='♥'||_0xc.s==='♦'?'red':'black')}`;
                if (this.isFolded[_0xpk]) _0xdiv.classList.add('folded-filter');
                if (_0xwa && _0xpk === 'human') { _0xdiv.classList.add('human-deal-anim'); _0xdiv.style.animationDelay = `${_0xvid * 0.52}s`; }
                let _0xisV = !_0xisA || (this.phase === 'fold' && this.revealedIdx[_0xpk].includes(_0xoid)) || this.phase === 'result';
                if (!_0xisV) _0xdiv.classList.add('hidden');
                else {
                    if (_0xc.is7) _0xdiv.classList.add('special');
                    _0xdiv.innerHTML = `<div class="suit">${_0xc.s==='N'?'★':_0xc.s}</div><div class="val">${_0xc.v}</div>`;
                }
                if (this.phase !== 'reveal') {
                    if (this.revealedIdx[_0xpk].includes(_0xoid)) _0xdiv.classList.add('revealed-border');
                    if (_0xvid === 4) _0xdiv.classList.add('push-right');
                }
                if (!_0xisA && this.phase === 'reveal') {
                    if (this.selected.includes(_0xoid)) _0xdiv.classList.add('selected');
                    _0xdiv.onclick = () => this.toggleCardSelection(_0xoid);
                }
                _0xel.appendChild(_0xdiv);
            });
        });
    }
};