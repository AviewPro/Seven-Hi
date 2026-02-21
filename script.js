(function(){
    function updateVh() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    updateVh();

    function requestFullScreenIfMobile() {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (!isMobile) return;
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) docEl.requestFullscreen();
        else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
        else if (docEl.mozRequestFullScreen) docEl.mozRequestFullScreen();
        else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
    }

    const _0x5f2a = ['7','A','5','4','3','2'];
    const _0x12e3 = {'7':6,'A':5,'5':4,'4':3,'3':2,'2':1};
    const _0x4c11 = {'♠':4,'♥':3,'♦':2,'♣':1,'N':0};
    const _0x3b2a = ['♠','♥','♣','♦'];
    let _0x9d2e = null;

    const _0x2a1c = fetch('textdata.json').then(r=>r.json()).then(d=>{_0x9d2e=d;document.getElementById('msg-box').innerText=_0x9d2e.gameMsg.ready;return d;}).catch(e=>console.error(e));

    window._0x4a1b = function(){const s=document.getElementById('sfx-delt4');s.volume=1.0;s.currentTime=0;s.play().catch(e=>{});};
    window._0x8c9d = function(t,v){if(t==='bgm')document.getElementById('bgm').volume=v;if(t==='sfx')_0x7f2e.sfxVol=v;};
    window._0x2b3c = function(){const p=document.getElementById('sound-panel');p.style.display=p.style.display==='flex'?'none':'flex';};

    let _0x6b2d = false; let _0x8f1e = 0;
    window._0x1b2c = async function(){if(!_0x9d2e)await _0x2a1c;_0x6b2d=true;_0x8f1e=1;document.getElementById('main-screen').style.display='none';document.body.classList.add('tutorial-active-lock');window.addEventListener('keydown',_0x3e4f);_0x5c6d();};
    function _0x3e4f(e){if(e.key==='Escape'){_0x6b2d=false;location.reload();}}
    function _0x5c6d(){if(!_0x9d2e)return;const t=document.getElementById('tut-title'),d=document.getElementById('tut-desc'),o=document.getElementById('tutorial-overlay');document.querySelectorAll('.tutorial-highlight').forEach(el=>el.classList.remove('tutorial-highlight'));const s=_0x9d2e.tutorial['step'+_0x8f1e];if(s){t.innerText=s.title;d.innerHTML=s.content;o.style.display='flex';}else{o.style.display='none';if(_0x8f1e===4)document.getElementById('btn-deal').classList.add('tutorial-highlight');if(_0x8f1e===7){document.getElementById('zone-human').classList.add('tutorial-highlight');document.getElementById('btn-reveal').classList.add('tutorial-highlight');}if(_0x8f1e===10){document.getElementById('btn-showdown').classList.add('tutorial-highlight');document.getElementById('btn-fold').classList.add('tutorial-highlight');}}}
    window._0x9d8e = function(){const b=document.getElementById('sfx-btn');b.volume=_0x7f2e.sfxVol;b.currentTime=0;b.play().catch(e=>{});_0x8f1e++;if(_0x8f1e>12){_0x6b2d=false;location.reload();return;}_0x5c6d();};

    window._0x7f2e = {
        round:1, players:['ai1','ai2','ai3','human'], names:{ai1:'Paldo',ai2:'Fisher',ai3:'Kitty',human:'YOU'},
        scores:{ai1:0,ai2:0,ai3:0,human:0}, logs:{ai1:Array(7).fill(''),ai2:Array(7).fill(''),ai3:Array(7).fill(''),human:Array(7).fill('')},
        hands:{ai1:[],ai2:[],ai3:[],human:[]}, revIdx:{ai1:[],ai2:[],ai3:[],human:[]}, folded:{ai1:false,ai2:false,ai3:false,human:false},
        selected:[], deck:[], phase:'idle', sfxVol:0.4,

        handleBtnClick(a){
            requestFullScreenIfMobile();
            const s=document.getElementById('sfx-btn');s.volume=this.sfxVol;s.currentTime=0;s.play().catch(e=>{});
            if(a==='deal'){this.dl();if(_0x6b2d&&_0x8f1e===4){_0x8f1e=5;_0x5c6d();}}
            if(a==='reveal'){this.toFp();if(_0x6b2d&&_0x8f1e===7){_0x8f1e=8;_0x5c6d();}}
            if(a==='fold'||a==='showdown'){if(a==='fold')this.hmF();else this.exS();if(_0x6b2d&&_0x8f1e===10){_0x8f1e=11;_0x5c6d();}}
        },
        startGame(){document.getElementById('main-screen').style.display='none';this.handleBtnClick('deal');},
        resetForNewGame(){document.getElementById('game-over-overlay').style.display='none';this.round=1;this.scores={ai1:0,ai2:0,ai3:0,human:0};this.logs={ai1:Array(7).fill(''),ai2:Array(7).fill(''),ai3:Array(7).fill(''),human:Array(7).fill('')};this.dl();},
        dl(){
            const b=document.getElementById('bgm');if(b.paused){b.volume=0.06;b.play().catch(e=>{});}
            if(this.round>7)return;this.phase='reveal';this.selected=[];this.folded={ai1:false,ai2:false,ai3:false,human:false};
            this.players.forEach(p=>{document.getElementById('zone-'+p).classList.remove('folded');document.getElementById('fold-rank-'+p).innerText="";const r=document.getElementById('res-'+p);r.className='p-result';r.innerText="";});
            let d=[];_0x5f2a.slice(1).forEach(v=>_0x3b2a.forEach(s=>d.push({v,s,is7:false})));d.push({v:'7',s:'N',is7:true});d.sort(()=>Math.random()-0.5);
            this.players.forEach((p,i)=>{this.hands[p]=d.slice(i*5,(i+1)*5);if(p.startsWith('ai'))this.aiDR(p);});
            this.deck=d.slice(20);document.getElementById('btn-deal').disabled=true;document.getElementById('msg-box').innerText=_0x9d2e?_0x9d2e.gameMsg.selectReveal:"";
            this.rn(true);this.upU();this.shU();
        },
        aiDR(p){
            const h=this.hands[p],vC={};h.forEach((c,i)=>{vC[c.v]=vC[c.v]||[];vC[c.v].push(i);});let hi=-1;
            const pV=Object.keys(vC).find(v=>vC[v].length===2);if(pV){hi=vC[pV][0];this.revIdx[p]=[0,1,2,3,4].filter(i=>i!==hi);return;}
            const sI=h.findIndex(c=>c.is7);if(sI!==-1){hi=sI;this.revIdx[p]=[0,1,2,3,4].filter(i=>i!==hi);return;}
            const fV=Object.keys(vC).find(v=>vC[v].length===4);if(fV){hi=vC[fV][0];this.revIdx[p]=[0,1,2,3,4].filter(i=>i!==hi);return;}
            hi=Math.floor(Math.random()*5);this.revIdx[p]=[0,1,2,3,4].filter(i=>i!==hi);
        },
        aiPF(){
            this.players.slice(0,3).forEach(p=>{
                if(this.folded[p])return;const mH=this.hands[p],mE=this.ev(mH);let sY=false,pl=[...this.deck];
                this.players.forEach(po=>{if(po===p)return;this.hands[po].forEach((c,idx)=>{if(!this.revIdx[po].includes(idx))pl.push(c);});});
                let sc=[];const pt=(a,m=[])=>{if(sc.length>=24)return;if(a.length===0)sc.push(m);else{for(let i=0;i<a.length;i++){let c=a.slice(),n=c.splice(i,1);pt(c,m.concat(n));if(sc.length>=24)return;}}};pt(pl);
                if(mE.rank===10){const afs=this.players.some(po=>{if(po===p)return false;const vc=this.revIdx[po].map(idx=>this.hands[po][idx]);return this.ev(vc).rank>=1;});if(afs)sY=true;if(!sY){let ssc=0;sc.forEach(s=>{let si=0,hss=false;this.players.forEach(po=>{if(po===p)return;const sm=this.revIdx[po].map(idx=>this.hands[po][idx]);sm.push(s[si++]);if(this.ev(sm).rank>=1)hss=true;});if(hss)ssc++;});if(ssc>=18)sY=true;}if(!sY&&Math.random()<0.5)sY=true;}
                else{let wc=0;sc.forEach(s=>{let si=0;const be=[];this.players.forEach(pc=>{if(pc===p)be.push({p:pc,ev:mE});else{const fh=this.revIdx[pc].map(idx=>this.hands[pc][idx]);fh.push(s[si++]);be.push({p:pc,ev:this.ev(fh)});}});const ws=this.jdR(be,be.map(b=>b.p));if(ws.includes(p))wc++;});if(wc>=9)sY=true;}
                if(!sY)this.f(p,1);
            });
        },
        jdR(pd,ak){const rm={};pd.forEach(d=>rm[d.p]=d.ev);return this.jd(rm,ak);},
        toFp(){this.phase='fold';this.revIdx.human=[...this.selected];this.selected=[];document.getElementById('btn-reveal').disabled=true;document.getElementById('btn-fold').disabled=false;document.getElementById('btn-showdown').disabled=false;document.getElementById('msg-box').innerText=_0x9d2e?_0x9d2e.gameMsg.chooseAction:"";this.rn();this.shU();},
        hmF(){this.aiPF();this.f('human',1);this.exS(true);},
        f(p,s){if(!this.folded[p]){this.folded[p]=true;this.scores[p]+=s;this.logs[p][this.round-1]=s;const e=this.ev(this.hands[p]);document.getElementById('fold-rank-'+p).innerText=`(${e.name})`;const r=document.getElementById('res-'+p);r.className='p-result txt-fold';r.innerText="FOLD (+1)";}},
        shU(){const e=document.getElementById('remaining-cards');if(!e)return;e.innerHTML="";if(this.phase==='reveal'||this.phase==='idle'){for(let i=0;i<4;i++){const d=document.createElement('div');d.className="mini-card locked";e.appendChild(d);}return;}let ur=[];if(this.phase==='result')ur=[...this.deck];else{ur=[...this.deck];this.players.slice(0,3).forEach(p=>{this.hands[p].forEach((c,i)=>{if(!this.revIdx[p].includes(i))ur.push(c);});});}ur.sort((a,b)=>this.cC(a,b)).forEach(c=>{const d=document.createElement('div');d.className=`mini-card ${c.is7?'special':(c.s==='♥'||c.s==='♦'?'red':'black')}`;d.innerHTML=`<div class="suit">${c.s==='N'?'★':c.s}</div><div class="val">${c.v}</div>`;e.appendChild(d);});},
        exS(ihf=false){this.phase='result';if(!ihf)this.aiPF();document.getElementById('btn-fold').disabled=true;document.getElementById('btn-showdown').disabled=true;const ak=this.players.filter(p=>!this.folded[p]);if(ak.length>0){const rs={};this.players.forEach(p=>rs[p]=this.ev(this.hands[p]));const ws=this.jd(rs,ak);this.players.forEach(p=>{if(!this.folded[p]){const r=document.getElementById('res-'+p);r.innerText=rs[p].name;r.className=ws.includes(p)?"p-result txt-win":"p-result txt-lose";}});ws.forEach(w=>{let s=ak.length+2+(rs[w].rank===10?1:0);this.scores[w]+=s;this.logs[w][this.round-1]=s;});ak.forEach(p=>{if(!ws.includes(p))this.logs[p][this.round-1]=0;});}this.rn();this.upU();this.shU();if(this.round>=7)setTimeout(()=>this.shFR(),2000);else{this.round++;document.getElementById('btn-deal').disabled=false;}},
        shFR(){
            const o=document.getElementById('game-over-overlay'),w=document.getElementById('final-winner-text'),s=document.getElementById('final-score-container'),ms=Math.max(...Object.values(this.scores)),ws=this.players.filter(p=>this.scores[p]===ms);
            w.innerText=ws.length>1?`DRAW: ${ws.map(p=>this.names[p]).join(' & ')}`:`WINNER: ${this.names[ws[0]]}`;
            s.innerHTML=this.players.map(p=>{const l=this.logs[p].map(x=>`<td>${x}</td>`).join(""),mc=(p==='human')?'my-score':'',sc=(this.scores[p]===ms)?'total-winner':'total-normal';return `<div class="score-player-unit ${mc}" style="flex:none; margin-bottom:1vh; padding:1.5vh;"><div class="p-top-info"><span class="p-name-label">${this.names[p]}</span><span class="p-total-label ${sc}">${this.scores[p]}</span></div><table class="p-mini-table"><tr><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>R5</th><th>R6</th><th>R7</th></tr><tr>${l}</tr></table></div>`;}).join("");o.style.display='flex';
        },
        ev(c){
            let v={},h7=false,sd=[...c].sort((a,b)=>this.cC(a,b));c.forEach(x=>{v[x.v]=(v[x.v]||0)+1;if(x.is7)h7=true;});let ct=Object.entries(v).sort((a,b)=>b[1]-a[1]||_0x12e3[b[0]]-_0x12e3[a[0]]);let r={rank:0,name:"HIGH CARD",s_a:sd.map(x=>_0x12e3[x.v]),h7,cards:sd};
            if(ct[0][1]===4)r={rank:6,name:"FOUR CARD",s_a:[_0x12e3[ct[0][0]]],h7,cards:sd};else if(ct[0][1]===3&&ct[1]&&ct[1][1]===2)r={rank:4,name:"FULL HOUSE",s_a:[_0x12e3[ct[0][0]]],h7,cards:sd};else if(Object.keys(v).length===5&&c.length===5&&(_0x12e3[sd[0].v]-_0x12e3[sd[4].v]===4)&&!h7)r={rank:3,name:"STRAIGHT",s_a:[_0x12e3[sd[0].v]],h7,cards:sd};else if(ct[0][1]===3)r={rank:2,name:"TRIPLE",s_a:[_0x12e3[ct[0][0]]],h7,cards:sd};else if(ct[0][1]===2&&ct[1]&&ct[1][1]===2)r={rank:1,name:"TWO PAIR",s_a:[_0x12e3[ct[0][0]],_0x12e3[ct[1][0]]],h7,cards:sd};else if(ct[0][1]===2)r={rank:0.5,name:"ONE PAIR",s_a:[_0x12e3[ct[0][0]]],h7,cards:sd};
            if(r.rank===0&&h7&&c.length===5)return {rank:10,name:"7-HIGH",s_a:sd.map(x=>_0x12e3[x.v]),h7:true,cards:sd};return r;
        },
        jd(r,ak){
            const h7h=ak.some(k=>r[k].rank===10),hop=ak.some(k=>r[k].rank===0.5);if(h7h&&hop){const opk=ak.filter(k=>r[k].rank===0.5);let w=opk[0];for(let i=1;i<opk.length;i++){if(this.cpN(r[opk[i]],r[w])>0)w=opk[i];}return opk.filter(k=>this.cpN(r[k],r[w])===0);}
            const ws=[];ak.forEach(p=>{let w=true;ak.forEach(o=>{if(p!==o&&this.cp(r[p],r[o],ak.map(k=>r[k]))<0)w=false;});if(w)ws.push(p);});return ws;
        },
        cp(r1,r2,ar){const h7o=ar.some(r=>r&&r.rank===10);if(h7o){if(r1.rank===10){if(r2.rank===0.5)return-1;if(r2.rank===10)return 0;return 1;}if(r1.rank===0.5)return 1;}return this.cpN(r1,r2);},
        cpN(r1,r2){if(r1.rank>r2.rank)return 1;if(r1.rank<r2.rank)return-1;for(let i=0;i<Math.min(r1.s_a.length,r2.s_a.length);i++){if(r1.s_a[i]>r2.s_a[i])return 1;if(r1.s_a[i]<r2.s_a[i])return-1;}if(r1.cards.length>0&&r2.cards.length>0){const s1=_0x4c11[r1.cards[0].s],s2=_0x4c11[r2.cards[0].s];if(s1>s2)return 1;if(s1<s2)return-1;}return 0;},
        upU(){document.getElementById('round-info').innerText=`ROUND ${this.round} / 7`;const c=document.getElementById('side-score'),ms=Math.max(...Object.values(this.scores));c.innerHTML=this.players.map(p=>{const l=this.logs[p].map(x=>`<td>${x}</td>`).join(""),mc=(p==='human')?'my-score':'',sc=(this.scores[p]===ms&&ms>0)?'total-winner':'total-normal';return `<div class="score-player-unit ${mc}"><div class="p-top-info"><span class="p-name-label">${this.names[p]}</span><span class="p-total-label ${sc}">${this.scores[p]}</span></div><table class="p-mini-table"><tr><th>R1</th><th>R2</th><th>R3</th><th>R4</th><th>R5</th><th>R6</th><th>R7</th></tr><tr>${l}</tr></table></div>`;}).join("");},
        cC(a,b){if(_0x12e3[a.v]!==_0x12e3[b.v])return _0x12e3[b.v]-_0x12e3[a.v];return _0x4c11[b.s]-_0x4c11[a.s];},
        tCS(idx){const s=document.getElementById('sfx-click');s.volume=this.sfxVol;s.play().catch(e=>{});const si=this.selected.indexOf(idx);if(si>-1)this.selected.splice(si,1);else if(this.selected.length<4)this.selected.push(idx);document.getElementById('btn-reveal').disabled=(this.selected.length!==4);this.rn();},
        rn(wa=false){this.players.forEach(pk=>{const ia=pk.startsWith('ai'),el=document.getElementById('cards-'+pk);el.innerHTML="";let ids=[0,1,2,3,4];if(this.phase!=='reveal'){ids.sort((a,b)=>{const ar=this.revIdx[pk].includes(a),br=this.revIdx[pk].includes(b);if(ar!==br)return br-ar;return this.cC(this.hands[pk][a],this.hands[pk][b]);});}ids.forEach((oi,vi)=>{const c=this.hands[pk][oi],d=document.createElement('div');d.className=`card ${(c.s==='♥'||c.s==='♦'?'red':'black')}`;if(this.folded[pk])d.classList.add('folded-filter');if(wa&&pk==='human'){d.classList.add('human-deal-anim');d.style.animationDelay=`${vi*0.52}s`;}let iv=!ia||(this.phase==='fold'&&this.revIdx[pk].includes(oi))||this.phase==='result';if(!iv)d.classList.add('hidden');else{if(c.is7)d.classList.add('special');d.innerHTML=`<div class="suit">${c.s==='N'?'★':c.s}</div><div class="val">${c.v}</div>`;}if(this.phase!=='reveal'){if(this.revIdx[pk].includes(oi))d.classList.add('revealed-border');if(vi===4)d.classList.add('push-right');}if(!ia&&this.phase==='reveal'){if(this.selected.includes(oi))d.classList.add('selected');d.onclick=()=>this.tCS(oi);}el.appendChild(d);});});}
    };

    document.addEventListener('touchstart', function (e) {
        if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', (e)=>{
        if(document.getElementById('main-screen').style.display!=='none')return;
        if(e.key==='Shift' && document.getElementById('game-over-overlay').style.display==='flex'){_0x4a1b();_0x7f2e.resetForNewGame();return;}
        if(e.key==='Enter'){const d=document.getElementById('btn-deal'),r=document.getElementById('btn-reveal'),s=document.getElementById('btn-showdown');if(!d.disabled){_0x4a1b();_0x7f2e.handleBtnClick('deal');}else if(!r.disabled)_0x7f2e.handleBtnClick('reveal');else if(!s.disabled)_0x7f2e.handleBtnClick('showdown');}
        if(_0x7f2e.phase==='reveal'&&['1','2','3','4','5'].includes(e.key)){_0x7f2e.tCS(parseInt(e.key)-1);}
        if(e.key==='0'){const f=document.getElementById('btn-fold');if(!f.disabled)_0x7f2e.handleBtnClick('fold');}
    });
})();