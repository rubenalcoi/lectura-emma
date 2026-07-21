/* ==========================================================================
   LLIBRE DE LECTURA D'EMMA - JOC D'ESCRIURE AMB NIVELLS I CELEBRACIÓ CADA 20 PARAULES
   ========================================================================== */

const unitsData = [
    { id: 'cover', title: 'Portada', isCover: true },
    {
        id: 'n1-m', level: 1, letter: 'M', title: 'LA LLETRA M (NIVELL 1)', subtitle: 'Sols la lletra M + Vocals (MA, ME, MI, MO, MU)',
        syllables: [
            { text: 'MA', comb: 'M + A', cardClass: 'syl-card-a' },
            { text: 'ME', comb: 'M + E', cardClass: 'syl-card-e' },
            { text: 'MI', comb: 'M + I', cardClass: 'syl-card-i' },
            { text: 'MO', comb: 'M + O', cardClass: 'syl-card-o' },
            { text: 'MU', comb: 'M + U', cardClass: 'syl-card-u' }
        ],
        shuffledLines: [['ME', 'MO', 'MA', 'MU', 'MI'], ['MU', 'MI', 'ME', 'MA', 'MO']],
        words: [
            { parts: ['MA', 'MÀ'], icon: '👩', fullText: 'MA-MÀ' },
            { parts: ['MI', 'A'], icon: '👧', fullText: 'MI-A' },
            { parts: ['MI', 'U'], icon: '🐱', fullText: 'MI-U' },
            { parts: ['MO', 'MI', 'A'], icon: '🧟', fullText: 'MO-MI-A' }
        ],
        sentences: [
            { words: [{ syls: ['MA', 'MÀ'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['MI', 'A'] }], cleanText: 'MA-MÀ AMA A MIA.' },
            { words: [{ syls: ['MI', 'A'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['MA', 'MÀ'] }], cleanText: 'MIA AMA A MA-MÀ.' },
            { words: [{ syls: ['MI', 'U'] }, { syls: ['MI', 'A'] }, { syls: ['MA', 'MÀ'] }], cleanText: 'MIU MIA MAMÀ.' }
        ]
    },
    {
        id: 'n1-p', level: 1, letter: 'P', title: 'LA LLETRA P (NIVELL 1)', subtitle: 'Sols la lletra P + Vocals (PA, PE, PI, PO, PU)',
        syllables: [
            { text: 'PA', comb: 'P + A', cardClass: 'syl-card-a' },
            { text: 'PE', comb: 'P + E', cardClass: 'syl-card-e' },
            { text: 'PI', comb: 'P + I', cardClass: 'syl-card-i' },
            { text: 'PO', comb: 'P + O', cardClass: 'syl-card-o' },
            { text: 'PU', comb: 'P + U', cardClass: 'syl-card-u' }
        ],
        shuffledLines: [['PE', 'PO', 'PA', 'PU', 'PI'], ['PU', 'PI', 'PE', 'PA', 'PO']],
        words: [
            { parts: ['PA', 'PA'], icon: '👨', fullText: 'PA-PA' },
            { parts: ['PI', 'PA'], icon: '🎷', fullText: 'PI-PA' },
            { parts: ['PE', 'PA'], icon: '🐷', fullText: 'PE-PA' },
            { parts: ['PO', 'PA'], icon: '⛵', fullText: 'PO-PA' }
        ],
        sentences: [
            { words: [{ syls: ['PA', 'PA'] }, { syls: ['PI', 'A'] }], cleanText: 'PA-PA PIA.' },
            { words: [{ syls: ['PE', 'PA'] }, { syls: ['PI', 'A'] }], cleanText: 'PE-PA PIA.' },
            { words: [{ syls: ['PA', 'PA'] }, { syls: ['PE', 'PA'] }, { syls: ['PO', 'PA'] }], cleanText: 'PA-PA PE-PA PO-PA.' }
        ]
    },
    {
        id: 'n1-l', level: 1, letter: 'L', title: 'LA LLETRA L (NIVELL 1)', subtitle: 'Sols la lletra L + Vocals (LA, LE, LI, LO, LU)',
        syllables: [
            { text: 'LA', comb: 'L + A', cardClass: 'syl-card-a' },
            { text: 'LE', comb: 'L + E', cardClass: 'syl-card-e' },
            { text: 'LI', comb: 'L + I', cardClass: 'syl-card-i' },
            { text: 'LO', comb: 'L + O', cardClass: 'syl-card-o' },
            { text: 'LU', comb: 'L + U', cardClass: 'syl-card-u' }
        ],
        shuffledLines: [['LE', 'LO', 'LA', 'LU', 'LI'], ['LU', 'LI', 'LE', 'LA', 'LO']],
        words: [
            { parts: ['LA', 'LA'], icon: '👩', fullText: 'LA-LA' },
            { parts: ['LU', 'LU'], icon: '👧', fullText: 'LU-LU' },
            { parts: ['LI', 'LI'], icon: '🌸', fullText: 'LI-LI' },
            { parts: ['A', 'LA'], icon: '🪶', fullText: 'A-LA' }
        ],
        sentences: [
            { words: [{ syls: ['LA', 'LA'] }, { syls: ['A', 'LA'] }], cleanText: 'LA-LA ALA.' },
            { words: [{ syls: ['LU', 'LU'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['LA', 'LA'] }], cleanText: 'LU-LU AMA A LA-LA.' },
            { words: [{ syls: ['O', 'LA'] }, { syls: ['LU', 'LU'] }], cleanText: 'OLA LU-LU.' }
        ]
    },
    {
        id: 'n2-m', level: 2, letter: 'M', title: 'LA LLETRA M (NIVELL 2)', subtitle: 'Combinada amb altres consonants (MA, ME, MI, MO, MU)',
        syllables: [
            { text: 'MA', comb: 'M + A', cardClass: 'syl-card-a' },
            { text: 'ME', comb: 'M + E', cardClass: 'syl-card-e' },
            { text: 'MI', comb: 'M + I', cardClass: 'syl-card-i' },
            { text: 'MO', comb: 'M + O', cardClass: 'syl-card-o' },
            { text: 'MU', comb: 'M + U', cardClass: 'syl-card-u' }
        ],
        shuffledLines: [['ME', 'MO', 'MA', 'MU', 'MI'], ['MU', 'MI', 'ME', 'MA', 'MO']],
        words: [
            { parts: ['MA', 'MÀ'], icon: '👩', fullText: 'MA-MÀ' },
            { parts: ['PO', 'MA'], icon: '🍎', fullText: 'PO-MA' },
            { parts: ['LLI', 'MA'], icon: '🍋', fullText: 'LLI-MA' },
            { parts: ['MO', 'MI', 'A'], icon: '🧟', fullText: 'MO-MI-A' }
        ],
        sentences: [
            { words: [{ syls: ['LA'] }, { syls: ['MA', 'MÀ'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['EM', 'MA'] }], cleanText: 'LA MA-MÀ AMA A EMMA.' },
            { words: [{ syls: ['LA'] }, { syls: ['PO', 'MA'] }, { syls: ['ÉS'] }, { syls: ['BO', 'NA'] }], cleanText: 'LA PO-MA ÉS BONA.' },
            { words: [{ syls: ['MI', 'A'] }, { syls: ['TÉ'] }, { syls: ['U', 'NA'] }, { syls: ['LLI', 'MA'] }], cleanText: 'MIA TÉ UNA LLI-MA.' }
        ]
    }
];

// Estat del Joc i Nivells de Dificultat
let currentUnitId = 'cover';
let isAllUnitsMode = false;
let isGameMode = false;
let userStars = JSON.parse(localStorage.getItem('emma_stars') || '{}');

let gameScore = parseInt(localStorage.getItem('emma_game_score') || '0');
let totalWordsCompleted = parseInt(localStorage.getItem('emma_words_completed') || '0');
let currentLevelNumber = Math.floor(totalWordsCompleted / 20) + 1;
let currentDifficulty = 'facil'; // 'facil', 'mitja', 'avancat'
let gameTargetIndex = 0;
let currentWordObj = null;
let typedChars = [];

// Bancs de paraules per nivell de dificultat
const difficultyWordBanks = {
    facil: [
        { word: 'MIU', icon: '🐱', text: 'MI-U' },
        { word: 'MÀ', icon: '✋', text: 'MÀ' },
        { word: 'PAPA', icon: '👨', text: 'PA-PA' },
        { word: 'MAMA', icon: '👩', text: 'MA-MÀ' },
        { word: 'PEPA', icon: '🐷', text: 'PE-PA' },
        { word: 'SOL', icon: '☀️', text: 'SOL' },
        { word: 'ALA', icon: '🪶', text: 'A-LA' },
        { word: 'OLA', icon: '🌊', text: 'O-LA' }
    ],
    mitja: [
        { word: 'POMA', icon: '🍎', text: 'PO-MA' },
        { word: 'LUNA', icon: '🌙', text: 'LU-NA' },
        { word: 'PIPA', icon: '🎷', text: 'PI-PA' },
        { word: 'VACA', icon: '🐮', text: 'VA-CA' },
        { word: 'BICI', icon: '🚲', text: 'BI-CI' },
        { word: 'DADO', icon: '🎲', text: 'DA-DO' },
        { word: 'SOPA', icon: '🍲', text: 'SO-PA' },
        { word: 'LLIMA', icon: '🍋', text: 'LLI-MA' },
        { word: 'CASA', icon: '🏠', text: 'CA-SA' },
        { word: 'FOCA', icon: '🦭', text: 'FO-CA' }
    ],
    avancat: [
        { word: 'TOMATA', icon: '🍅', text: 'TO-MA-TA' },
        { word: 'TULIPÀ', icon: '🌷', text: 'TU-LI-PÀ' },
        { word: 'PAQUET', icon: '📦', text: 'PA-QUET' },
        { word: 'NINU', icon: '🪆', text: 'NIN-U' },
        { word: 'LLEÓ', icon: '🦁', text: 'LLE-Ó' },
        { word: 'SACO', icon: '🎒', text: 'SA-CO' },
        { word: 'FADA', icon: '🧚', text: 'FA-DA' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupPhysicalKeyboardListener();
});

function initApp() {
    renderUnitTabs();
    renderCurrentStage();
}

function renderUnitTabs() {
    const tabsContainer = document.getElementById('unitTabs');
    if (!tabsContainer) return;

    const n1 = unitsData.filter(u => u.level === 1);
    const n2 = unitsData.filter(u => u.level === 2);

    let html = `
        <button class="unit-tab ${currentUnitId === 'cover' && !isAllUnitsMode && !isGameMode ? 'active' : ''}" onclick="switchUnit('cover')">
            🌈 PORTADA
        </button>
        <button class="unit-tab tab-game ${isGameMode ? 'active' : ''}" onclick="startTypingGame()">
            🎮 JOC D'ESCRIURE (NIV ${currentLevelNumber})
        </button>
        <div class="level-group-label">🟢 N1 (Úniques):</div>
    `;
    n1.forEach(u => { html += `<button class="unit-tab tab-n1 ${currentUnitId === u.id && !isAllUnitsMode && !isGameMode ? 'active' : ''}" onclick="switchUnit('${u.id}')">${u.letter}</button>`; });

    html += `<div class="level-group-label">🔵 N2 (Combinades):</div>`;
    n2.forEach(u => { html += `<button class="unit-tab tab-n2 ${currentUnitId === u.id && !isAllUnitsMode && !isGameMode ? 'active' : ''}" onclick="switchUnit('${u.id}')">${u.letter}</button>`; });

    html += `
        <button class="unit-tab btn-all-units ${isAllUnitsMode ? 'active' : ''}" onclick="showAllUnitsForPrint()">
            📚 TOT EL LLIBRE (PDF A4)
        </button>
    `;

    tabsContainer.innerHTML = html;
}

window.switchUnit = function(unitId) {
    currentUnitId = unitId;
    isAllUnitsMode = false;
    isGameMode = false;
    renderUnitTabs();
    renderCurrentStage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showAllUnitsForPrint = function() {
    isAllUnitsMode = true;
    isGameMode = false;
    renderUnitTabs();
    renderCurrentStage();
};

window.startTypingGame = function() {
    isGameMode = true;
    isAllUnitsMode = false;
    renderUnitTabs();
    renderTypingGameStage();
    loadNextGameTarget();
};

function renderCurrentStage() {
    const stageContainer = document.getElementById('mainStage');
    if (!stageContainer) return;

    if (isGameMode) {
        renderTypingGameStage();
        return;
    }

    if (isAllUnitsMode) {
        let html = renderCoverHTML();
        unitsData.forEach((unit, index) => {
            if (!unit.isCover) {
                html += renderUnitSheetHTML(unit, index);
            }
        });
        stageContainer.innerHTML = html;
    } else {
        const unit = unitsData.find(u => u.id === currentUnitId) || unitsData[0];
        if (unit.isCover) {
            stageContainer.innerHTML = renderCoverHTML();
        } else {
            const index = unitsData.findIndex(u => u.id === currentUnitId);
            stageContainer.innerHTML = renderUnitSheetHTML(unit, index);
        }
    }
}

// RENDERITZADOR DEL JOC AMB NIVELLS I DIFICULTAT
function renderTypingGameStage() {
    const stageContainer = document.getElementById('mainStage');
    if (!stageContainer) return;

    stageContainer.innerHTML = `
        <div class="game-container">
            <div class="game-header-bar">
                <div class="game-title-group">
                    <ion-icon name="trophy" style="font-size: 2rem; color: var(--accent-yellow);"></ion-icon>
                    <span>JOC D'ESCRIURE D'EMMA</span>
                </div>
                
                <div class="game-stats-group">
                    <div class="score-badge badge-lvl">🏆 NIVELL <strong id="gameLvlNum">${currentLevelNumber}</strong></div>
                    <div class="score-badge badge-words">🎯 ${totalWordsCompleted % 20}/20 Paraules</div>
                    <div class="score-badge badge-pts">⭐ ${gameScore} pts</div>
                </div>

                <div class="diff-selector">
                    <button class="diff-btn ${currentDifficulty === 'facil' ? 'active' : ''}" onclick="setDifficulty('facil')">🌱 Fàcil</button>
                    <button class="diff-btn ${currentDifficulty === 'mitja' ? 'active' : ''}" onclick="setDifficulty('mitja')">⭐ Mitjà</button>
                    <button class="diff-btn ${currentDifficulty === 'avancat' ? 'active' : ''}" onclick="setDifficulty('avancat')">🚀 Avançat</button>
                </div>
            </div>

            <div class="game-play-area" id="gamePlayArea">
                <div class="target-visual" id="targetIcon">🍎</div>
                <div class="target-text-display" id="targetWordText">PO-MA</div>
                
                <div class="typing-boxes" id="typingBoxes"></div>
                <div class="hint-msg" id="hintMsg">Prem les lletres al teu teclat o a la pantalla!</div>
            </div>

            <div class="virtual-keyboard" id="virtualKeyboard">
                <div class="keyboard-row">
                    ${['A','B','C','D','E','F','G','H','I'].map(k => `<button class="key-btn" data-key="${k}" onclick="handleVirtualKeyClick('${k}')">${k}</button>`).join('')}
                </div>
                <div class="keyboard-row">
                    ${['J','K','L','M','N','O','P','Q','R','S'].map(k => `<button class="key-btn" data-key="${k}" onclick="handleVirtualKeyClick('${k}')">${k}</button>`).join('')}
                </div>
                <div class="keyboard-row">
                    ${['T','U','V','W','X','Y','Z'].map(k => `<button class="key-btn" data-key="${k}" onclick="handleVirtualKeyClick('${k}')">${k}</button>`).join('')}
                </div>
            </div>
        </div>

        <!-- MODAL DE CELEBRACIÓ DE NIVELL SUPERAT (CADA 20 PARAULES) -->
        <div class="celebration-overlay" id="celebrationModal">
            <div class="celebration-card">
                <div class="celebration-icon">🏆 🎉 🌟</div>
                <h2>ENHORABONA EMMA!</h2>
                <p class="celebration-msg">HAS COMPLETAT 20 PARAULES AMB ÈXIT!</p>
                <div class="celebration-lvl-badge">PUJES AL NIVELL <span id="newLvlNum">2</span>!</div>
                <button class="btn btn-primary btn-lg" onclick="closeCelebrationModal()">
                    🚀 CONTINUAR JUGANT!
                </button>
            </div>
        </div>
        <canvas id="confettiCanvas" class="confetti-canvas"></canvas>
    `;

    loadNextGameTarget();
}

window.setDifficulty = function(diff) {
    currentDifficulty = diff;
    renderTypingGameStage();
};

function loadNextGameTarget() {
    if (!isGameMode) return;

    const bank = difficultyWordBanks[currentDifficulty] || difficultyWordBanks.facil;
    currentWordObj = bank[gameTargetIndex % bank.length];
    typedChars = [];

    const targetIconEl = document.getElementById('targetIcon');
    const targetWordTextEl = document.getElementById('targetWordText');
    const typingBoxesEl = document.getElementById('typingBoxes');

    if (!targetIconEl || !targetWordTextEl || !typingBoxesEl) return;

    targetIconEl.innerText = currentWordObj.icon;
    targetWordTextEl.innerText = currentWordObj.text || currentWordObj.word;

    let boxesHtml = '';
    for (let i = 0; i < currentWordObj.word.length; i++) {
        boxesHtml += `<div class="char-box ${i === 0 ? 'current-target' : ''}" id="box-${i}">_</div>`;
    }
    typingBoxesEl.innerHTML = boxesHtml;

    highlightNextKey();
    speakText(`Escriu ${currentWordObj.word}`);
}

function highlightNextKey() {
    if (!currentWordObj) return;

    document.querySelectorAll('.key-btn').forEach(btn => btn.classList.remove('highlighted'));

    if (typedChars.length < currentWordObj.word.length) {
        const nextChar = currentWordObj.word[typedChars.length];
        const keyBtn = document.querySelector(`.key-btn[data-key="${nextChar}"]`);
        if (keyBtn) {
            keyBtn.classList.add('highlighted');
        }
    }
}

window.handleVirtualKeyClick = function(char) {
    processTypedChar(char.toUpperCase());
};

function setupPhysicalKeyboardListener() {
    window.addEventListener('keydown', (e) => {
        if (!isGameMode) return;
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
            processTypedChar(key);
        }
    });
}

function processTypedChar(char) {
    if (!isGameMode || !currentWordObj) return;

    const targetChar = currentWordObj.word[typedChars.length];

    if (char === targetChar) {
        playPopSound();
        const currentBox = document.getElementById(`box-${typedChars.length}`);
        if (currentBox) {
            currentBox.innerText = char;
            currentBox.classList.remove('current-target');
            currentBox.classList.add('filled');
        }

        typedChars.push(char);

        if (typedChars.length === currentWordObj.word.length) {
            // PARAULA COMPLETADA AMB ÈXIT
            gameScore += 10;
            totalWordsCompleted++;

            localStorage.setItem('emma_game_score', gameScore);
            localStorage.setItem('emma_words_completed', totalWordsCompleted);

            playSuccessSound();
            speakText(`Molt bé! Has escrit ${currentWordObj.word}!`);

            // COMPROVAR SI HA COMPLETAT 20 PARAULES PER A CELEBRAR PUJADA DE NIVELL!
            if (totalWordsCompleted > 0 && totalWordsCompleted % 20 === 0) {
                currentLevelNumber = Math.floor(totalWordsCompleted / 20) + 1;
                renderUnitTabs();
                setTimeout(() => {
                    triggerLevelUpCelebration();
                }, 1000);
            } else {
                gameTargetIndex++;
                setTimeout(() => {
                    renderTypingGameStage();
                }, 1600);
            }
        } else {
            const nextBox = document.getElementById(`box-${typedChars.length}`);
            if (nextBox) nextBox.classList.add('current-target');
            highlightNextKey();
        }
    } else {
        playErrorSound();
    }
}

// ANIMACIÓ DE CELEBRACIÓ I CONFETI CADA 20 PARAULES
function triggerLevelUpCelebration() {
    playFanfareSound();
    const modal = document.getElementById('celebrationModal');
    const newLvlNum = document.getElementById('newLvlNum');
    if (newLvlNum) newLvlNum.innerText = currentLevelNumber;
    if (modal) modal.classList.add('show');

    startConfettiAnimation();
}

window.closeCelebrationModal = function() {
    const modal = document.getElementById('celebrationModal');
    if (modal) modal.classList.remove('show');
    stopConfettiAnimation();
    gameTargetIndex++;
    renderTypingGameStage();
};

// CONFETI AMB CANVAS HTML5
let confettiActive = false;
let confettiParticles = [];

function startConfettiAnimation() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    confettiActive = true;
    confettiParticles = [];
    const colors = ['#FF5964', '#35A7FF', '#FFD166', '#06D6A0', '#9B5DE5', '#FF9F1C'];

    for (let i = 0; i < 120; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 12 + 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            vy: Math.random() * 3 + 2,
            vx: Math.random() * 2 - 1,
            rot: Math.random() * 360
        });
    }

    function loop() {
        if (!confettiActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiParticles.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            p.rot += 3;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(loop);
    }
    loop();
}

function stopConfettiAnimation() {
    confettiActive = false;
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// SONS SYNTH
function playPopSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch(e){}
}

function playSuccessSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
            gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.2);
        });
    } catch(e){}
}

function playFanfareSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [440, 554.37, 659.25, 880, 1046.50];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
            gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.12);
            osc.stop(ctx.currentTime + i * 0.12 + 0.3);
        });
    } catch(e){}
}

function playErrorSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch(e){}
}

function renderCoverHTML() {
    return `
        <div class="a4-page cover-page pretty-cover">
            <div class="cover-header-decor">
                <span class="star-badge-glow">⭐ EL MEU PRIMER LLIBRE ⭐</span>
            </div>
            
            <div class="cover-hero-box">
                <div class="cover-main-icon">🦄 🌈 📖</div>
                <h1 class="cover-hero-title">EL LLIBRE DE LECTURA D'EMMA</h1>
                <div class="cover-name-ribbon">
                    <span>AQUEST LLIBRE PERTANY A:</span>
                    <strong class="student-name">EMMA ✨</strong>
                </div>
            </div>

            <div class="cover-levels-grid">
                <div class="cover-level-card card-n1">
                    <span class="lvl-tag">🟢 NIVELL 1</span>
                    <p>Consonants Inicials Úniques (M, P, L, T)</p>
                </div>
                <div class="cover-level-card card-n2">
                    <span class="lvl-tag">🔵 NIVELL 2</span>
                    <p>Consonants Inicials Combinades (PO-MA...)</p>
                </div>
                <div class="cover-level-card card-n3">
                    <span class="lvl-tag">🟣 NIVELL 3</span>
                    <p>Resta de Consonants Úniques (B/V, C/Q, F...)</p>
                </div>
                <div class="cover-level-card card-n4">
                    <span class="lvl-tag">🟠 NIVELL 4</span>
                    <p>Totes les Consonants Combinades (Abecedari)</p>
                </div>
            </div>

            <div class="cover-footer-decor">
                <div class="footer-stickers">🎈 🎨 🚀 🐱 🍎 🧸</div>
                <p><strong>Lletra MAJÚSCULA | Valencià</strong></p>
            </div>
        </div>
    `;
}

function renderUnitSheetHTML(unit, pageNum) {
    const savedStars = userStars[unit.id] || 0;
    
    let levelBadgeText = '';
    let levelBadgeClass = '';
    let levelBgClass = '';

    if (unit.level === 1) { levelBadgeText = '🟢 NIVELL 1: ÚNICA I'; levelBadgeClass = 'badge-n1'; levelBgClass = 'bg-n1'; }
    else if (unit.level === 2) { levelBadgeText = '🔵 NIVELL 2: COMBINADA I'; levelBadgeClass = 'badge-n2'; levelBgClass = 'bg-n2'; }
    else if (unit.level === 3) { levelBadgeText = '🟣 NIVELL 3: ÚNICA II'; levelBadgeClass = 'badge-n3'; levelBgClass = 'bg-n3'; }
    else if (unit.level === 4) { levelBadgeText = '🟠 NIVELL 4: COMBINADA II'; levelBadgeClass = 'badge-n4'; levelBgClass = 'bg-n4'; }

    return `
        <div class="a4-page" id="sheet-${unit.id}">
            <!-- Capçalera del Full -->
            <div class="sheet-header">
                <div class="letter-badge-box">
                    <div class="letter-circle ${levelBgClass}">${unit.letter}</div>
                    <div class="sheet-title-group">
                        <h2>${unit.title}</h2>
                        <p>${unit.subtitle}</p>
                    </div>
                </div>
                <div class="level-indicator-badge ${levelBadgeClass}">
                    ${levelBadgeText}
                </div>
            </div>

            <!-- Secció 1.A: La Roda de Sílabes Ordenades -->
            <div class="syllable-section">
                <div class="section-label">
                    <ion-icon name="color-palette-outline"></ion-icon> 1. SÍLABES ORDENADES
                </div>
                <div class="syllables-grid">
                    ${unit.syllables.map(syl => `
                        <div class="syllable-card ${syl.cardClass}" onclick="speakText('${syl.text}', this)">
                            <div class="syllable-text">${syl.text}</div>
                            <div class="syllable-combination">${syl.comb}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Secció 1.B: SÍLABES DESORDENADES -->
            ${unit.shuffledLines ? `
                <div class="shuffled-section">
                    <div class="section-label" style="color: #7C3AED;">
                        <ion-icon name="extension-puzzle-outline"></ion-icon> 2. SÍLABES DESORDENADES (ÀGILITAT LECTORA)
                    </div>
                    <div class="shuffled-lines-container">
                        ${unit.shuffledLines.map((line, lIdx) => `
                            <div class="shuffled-line">
                                <span class="line-num">${lIdx + 1}</span>
                                ${line.map(syl => `
                                    <span class="shuffled-syl-badge" onclick="speakText('${syl}', this)">${syl}</span>
                                `).join('<span class="shuffled-sep">•</span>')}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Secció 3: Paraules Bisílabes -->
            <div class="words-section">
                <div class="section-label">
                    <ion-icon name="shapes-outline"></ion-icon> 3. LLEGEIX LES PARAULES
                </div>
                <div class="words-grid">
                    ${unit.words.map(w => `
                        <div class="word-card" onclick="speakText('${w.fullText}', this)">
                            <div class="word-syllables">
                                ${w.parts.map((p, idx) => `
                                    <span class="syl-part">${p}</span>${idx < w.parts.length - 1 ? '<span class="syl-dash">-</span>' : ''}
                                `).join('')}
                            </div>
                            <div class="word-visual">${w.icon}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Secció 4: Frases Curtes -->
            <div class="sentences-section">
                <div class="section-label" style="color: #B45309;">
                    <ion-icon name="rocket-outline"></ion-icon> 4. LLEGEIX LES FRASES!
                </div>
                <div class="sentence-list">
                    ${unit.sentences.map((st, i) => `
                        <div class="sentence-item" onclick="speakText('${st.cleanText}', this)">
                            <div class="sentence-num">${i + 1}</div>
                            <div class="sentence-words-container">
                                ${st.words.map(w => `
                                    <div class="word-box">
                                        ${w.syls.map((syl, idx) => `
                                            <span>${syl}</span>${idx < w.syls.length - 1 ? '<span class="word-syl-dash">-</span>' : ''}
                                        `).join('')}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Secció 5: Peu i Estrelles -->
            <div class="sheet-footer">
                <div class="star-rating">
                    <span>Pinta les estrelles al llegir el full!</span>
                    <div class="stars-group">
                        ${[1, 2, 3, 4, 5].map(starIdx => `
                            <ion-icon name="${starIdx <= savedStars ? 'star' : 'star-outline'}" 
                                      class="star-icon ${starIdx <= savedStars ? 'filled' : ''}" 
                                      onclick="toggleStar('${unit.id}', ${starIdx})"></ion-icon>
                        `).join('')}
                    </div>
                </div>
                <div class="page-number">Pàgina ${pageNum}</div>
            </div>
        </div>
    `;
}

window.speakText = function(text, element) {
    if (!('speechSynthesis' in window)) return;

    if (element) {
        element.classList.add('active-play');
        setTimeout(() => element.classList.remove('active-play'), 600);
    }

    window.speechSynthesis.cancel();
    const cleanSpeechText = text.replace(/-/g, '').toLowerCase();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.lang = 'ca-ES';
    utterance.rate = 0.85;

    showAudioToast(`🔊 Llegint: "${text}"`);
    window.speechSynthesis.speak(utterance);
};

function showAudioToast(msg) {
    let toast = document.getElementById('audioToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'audioToast';
        toast.className = 'audio-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<ion-icon name="volume-high-outline"></ion-icon> <span>${msg}</span>`;
    toast.classList.add('show');

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

window.toggleStar = function(unitId, count) {
    userStars[unitId] = count;
    localStorage.setItem('emma_stars', JSON.stringify(userStars));
    renderCurrentStage();
};

window.printApp = function() {
    window.print();
};
