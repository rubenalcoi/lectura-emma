/* ==========================================================================
   LLIBRE I JOCS D'EMMA - LÒGICA 10 NIVELLS I ZERO REPETICIONS
   ========================================================================== */

const unitsData = [
    { id: 'cover', title: 'Portada', isCover: true },
    {
        id: 'n1-m', level: 1, letter: 'M', title: 'LA LLETRA M', subtitle: 'Sols la lletra M + Vocals',
        syllables: [
            { text: 'MA', comb: 'M + A', cardClass: 'syl-card-a' }, { text: 'ME', comb: 'M + E', cardClass: 'syl-card-e' },
            { text: 'MI', comb: 'M + I', cardClass: 'syl-card-i' }, { text: 'MO', comb: 'M + O', cardClass: 'syl-card-o' }, { text: 'MU', comb: 'M + U', cardClass: 'syl-card-u' }
        ],
        shuffledLines: [['ME', 'MO', 'MA', 'MU', 'MI'], ['MU', 'MI', 'ME', 'MA', 'MO']],
        words: [ { parts: ['MA', 'MA'], icon: '👩', fullText: 'MA-MA' }, { parts: ['MI', 'A'], icon: '👧', fullText: 'MI-A' } ],
        sentences: [ { words: [{ syls: ['MA', 'MA'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['MI', 'A'] }], cleanText: 'MA-MA AMA A MIA.' } ]
    },
    // (Pots afegir la resta d'unitats de lectura per al mode imprimir si ho desitges, però ací optimitzem l'espai pel joc)
];

// ESTAT DE L'APLICACIÓ
let currentUnitId = 'cover';
let isAllUnitsMode = false;
let isGameMode = false;
let isReadingGameMode = false;
let userStars = JSON.parse(localStorage.getItem('emma_stars') || '{}');

// ESTAT DEL JOC
let gameScore = parseInt(localStorage.getItem('emma_game_score') || '0');
let totalWordsCompleted = parseInt(localStorage.getItem('emma_words_completed') || '0');
let currentLevelNumber = Math.floor(totalWordsCompleted / 10) + 1; // 10 PARAULES PER NIVELL

// GESTIÓ ROBUSTA ANTI-REPETICIONS
let currentLevelShuffledWords = JSON.parse(localStorage.getItem('emma_shuffled_words') || '[]');
let savedLevelForShuffle = parseInt(localStorage.getItem('emma_shuffle_level') || '0');
let currentWordObj = null;
let typedChars = [];

// =========================================================================
// BANC DE 100 PARAULES EN VALENCIÀ CORRECTE (SENSE ACCENTS, 10 PER NIVELL)
// =========================================================================
const levelWordBanks = {
    1: [
        { word: 'POMA', icon: '🍎', text: 'PO-MA' }, { word: 'CASA', icon: '🏠', text: 'CA-SA' },
        { word: 'GATA', icon: '🐈', text: 'GA-TA' }, { word: 'BOTA', icon: '🥾', text: 'BO-TA' },
        { word: 'MAMA', icon: '👩', text: 'MA-MA' }, { word: 'PAPA', icon: '👨', text: 'PA-PA' },
        { word: 'RODA', icon: '🛞', text: 'RO-DA' }, { word: 'SOPA', icon: '🍲', text: 'SO-PA' },
        { word: 'VACA', icon: '🐮', text: 'VA-CA' }, { word: 'FADA', icon: '🧚', text: 'FA-DA' }
    ],
    2: [
        { word: 'BICI', icon: '🚲', text: 'BI-CI' }, { word: 'COPA', icon: '🏆', text: 'CO-PA' },
        { word: 'FOCA', icon: '🦭', text: 'FO-CA' }, { word: 'MOTO', icon: '🏍️', text: 'MO-TO' },
        { word: 'PILA', icon: '🔋', text: 'PI-LA' }, { word: 'RATA', icon: '🐀', text: 'RA-TA' },
        { word: 'TELA', icon: '🧵', text: 'TE-LA' }, { word: 'PIPA', icon: '🎷', text: 'PI-PA' },
        { word: 'NINA', icon: '🪆', text: 'NI-NA' }, { word: 'LUPA', icon: '🔍', text: 'LU-PA' }
    ],
    3: [
        { word: 'LLUNA', icon: '🌙', text: 'LLU-NA' }, { word: 'PINYA', icon: '🍍', text: 'PI-NYA' },
        { word: 'CANYA', icon: '🎋', text: 'CA-NYA' }, { word: 'BANYA', icon: '🦌', text: 'BA-NYA' },
        { word: 'LLEO', icon: '🦁', text: 'LLE-O' }, { word: 'LLIMA', icon: '🍋', text: 'LLI-MA' },
        { word: 'GOTA', icon: '💧', text: 'GO-TA' }, { word: 'ROSA', icon: '🌹', text: 'RO-SA' },
        { word: 'MULA', icon: '🐴', text: 'MU-LA' }, { word: 'FAVA', icon: '🌱', text: 'FA-VA' }
    ],
    4: [
        { word: 'ARBRE', icon: '🌳', text: 'AR-BRE' }, { word: 'COTXE', icon: '🚗', text: 'COT-XE' },
        { word: 'BARCA', icon: '⛵', text: 'BAR-CA' }, { word: 'MOSCA', icon: '🪰', text: 'MOS-CA' },
        { word: 'PORTA', icon: '🚪', text: 'POR-TA' }, { word: 'PORC', icon: '🐖', text: 'PORC' },
        { word: 'GOSSA', icon: '🐕', text: 'GOS-SA' }, { word: 'BOLET', icon: '🍄', text: 'BO-LET' },
        { word: 'GATET', icon: '🐱', text: 'GA-TET' }, { word: 'CARRO', icon: '🛒', text: 'CAR-RO' }
    ],
    5: [
        { word: 'LLIBRE', icon: '📚', text: 'LLI-BRE' }, { word: 'PLANTA', icon: '🪴', text: 'PLAN-TA' },
        { word: 'GLOBUS', icon: '🎈', text: 'GLO-BUS' }, { word: 'PLATJA', icon: '🏖️', text: 'PLAT-JA' },
        { word: 'TIGRE', icon: '🐅', text: 'TI-GRE' }, { word: 'BRUIXA', icon: '🧙‍♀️', text: 'BRUI-XA' },
        { word: 'CORONA', icon: '👑', text: 'CO-RO-NA' }, { word: 'SABATA', icon: '👞', text: 'SA-BA-TA' },
        { word: 'CAMISA', icon: '👔', text: 'CA-MI-SA' }, { word: 'FORCA', icon: '🔱', text: 'FOR-CA' }
    ],
    6: [
        { word: 'TOMATA', icon: '🍅', text: 'TO-MA-TA' }, { word: 'TULIPA', icon: '🌷', text: 'TU-LI-PA' },
        { word: 'PILOTA', icon: '⚽', text: 'PI-LO-TA' }, { word: 'BALENA', icon: '🐳', text: 'BA-LE-NA' },
        { word: 'CADIRA', icon: '🪑', text: 'CA-DI-RA' }, { word: 'TAULA', icon: '🪵', text: 'TAU-LA' },
        { word: 'GELAT', icon: '🍦', text: 'GE-LAT' }, { word: 'ESTEL', icon: '⭐', text: 'ES-TEL' },
        { word: 'SIRENA', icon: '🧜‍♀️', text: 'SI-RE-NA' }, { word: 'CASTELL', icon: '🏰', text: 'CAS-TELL' }
    ],
    7: [
        { word: 'CAVALL', icon: '🐎', text: 'CA-VALL' }, { word: 'TORTUGA', icon: '🐢', text: 'TOR-TU-GA' },
        { word: 'FORMIGA', icon: '🐜', text: 'FOR-MI-GA' }, { word: 'PLUJA', icon: '🌧️', text: 'PLU-JA' },
        { word: 'PAQUET', icon: '📦', text: 'PA-QUET' }, { word: 'VAIXELL', icon: '🚢', text: 'VAI-XELL' },
        { word: 'GUITARRA', icon: '🎸', text: 'GUI-TAR-RA' }, { word: 'FORMATGE', icon: '🧀', text: 'FOR-MAT-GE' },
        { word: 'PALLASSO', icon: '🤡', text: 'PAL-LAS-SO' }, { word: 'CARGOL', icon: '🐌', text: 'CAR-GOL' }
    ],
    8: [
        { word: 'FAMILIA', icon: '👨‍👩‍👧‍👦', text: 'FA-MI-LI-A' }, { word: 'ESCOLA', icon: '🏫', text: 'ES-CO-LA' },
        { word: 'MOTXILLA', icon: '🎒', text: 'MOT-XIL-LA' }, { word: 'PISSARRA', icon: '🪧', text: 'PIS-SAR-RA' },
        { word: 'LLAPIS', icon: '✏️', text: 'LLA-PIS' }, { word: 'TISORES', icon: '✂️', text: 'TI-SO-RES' },
        { word: 'PINTURA', icon: '🎨', text: 'PIN-TU-RA' }, { word: 'PAPER', icon: '📄', text: 'PA-PER' },
        { word: 'REGLE', icon: '📏', text: 'RE-GLE' }, { word: 'LLIBRETA', icon: '📓', text: 'LLI-BRE-TA' }
    ],
    9: [
        { word: 'PLANETA', icon: '🪐', text: 'PLA-NE-TA' }, { word: 'ESTRELA', icon: '🌟', text: 'ES-TRE-LA' },
        { word: 'COET', icon: '🚀', text: 'CO-ET' }, { word: 'COMETA', icon: '☄️', text: 'CO-ME-TA' },
        { word: 'VOLCA', icon: '🌋', text: 'VOL-CA' }, { word: 'MUNTANYA', icon: '⛰️', text: 'MUN-TA-NYA' },
        { word: 'DESERT', icon: '🏜️', text: 'DE-SERT' }, { word: 'OCEA', icon: '🌊', text: 'O-CE-A' },
        { word: 'SELVA', icon: '🌴', text: 'SEL-VA' }, { word: 'ANIMAL', icon: '🐾', text: 'A-NI-MAL' }
    ],
    10: [
        { word: 'TRICICLE', icon: '🛺', text: 'TRI-CI-CLE' }, { word: 'HELICOPTER', icon: '🚁', text: 'HE-LI-COP-TER' },
        { word: 'TELEVISIO', icon: '📺', text: 'TE-LE-VI-SI-O' }, { word: 'ORDINADOR', icon: '💻', text: 'OR-DI-NA-DOR' },
        { word: 'DINOSAURE', icon: '🦖', text: 'DI-NO-SAU-RE' }, { word: 'PAPALLONA', icon: '🦋', text: 'PA-PAL-LO-NA' },
        { word: 'NEVERA', icon: '🧊', text: 'NE-VE-RA' }, { word: 'ESQUIROL', icon: '🐿️', text: 'ES-QUI-ROL' },
        { word: 'ESQUELET', icon: '💀', text: 'ES-QUE-LET' }, { word: 'XOCOLATA', icon: '🍫', text: 'XO-CO-LA-TA' }
    ]
};

// UTILITATS
function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getEffectiveLevel() {
    let lvl = currentLevelNumber;
    while (lvl > 10) lvl -= 10; 
    return lvl;
}

// GARANTIR CAP REPETICIÓ DINS D'UN NIVELL (I PERSISTENT ENTRE RECARREGUES)
function ensureShuffledBank() {
    const effLvl = getEffectiveLevel();
    // Si hem canviat de nivell, o no tenim el banc guardat de 10 paraules, el generem
    if (savedLevelForShuffle !== currentLevelNumber || currentLevelShuffledWords.length !== 10) {
        currentLevelShuffledWords = shuffleArray(levelWordBanks[effLvl]);
        savedLevelForShuffle = currentLevelNumber;
        localStorage.setItem('emma_shuffled_words', JSON.stringify(currentLevelShuffledWords));
        localStorage.setItem('emma_shuffle_level', savedLevelForShuffle.toString());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupPhysicalKeyboardListener();
});

function initApp() {
    renderCurrentStage();
}

window.startTypingGame = function() {
    isGameMode = true;
    isReadingGameMode = false;
    isAllUnitsMode = false;
    document.body.classList.add('game-mode-active');
    renderTypingGameStage();
    loadNextGameTarget();
};

window.startReadingGame = function() {
    isReadingGameMode = true;
    isGameMode = false;
    isAllUnitsMode = false;
    document.body.classList.add('game-mode-active');
    renderReadingGameStage();
    loadNextReadingTarget();
};

window.goBackToMenu = function() {
    isGameMode = false;
    isReadingGameMode = false;
    isAllUnitsMode = false;
    document.body.classList.remove('game-mode-active');
    renderCurrentStage();
}

window.resetGameData = function() {
    if (confirm("⚠️ Vols reiniciar tota l'aventura i tornar al Nivell 1?")) {
        localStorage.removeItem('emma_game_score');
        localStorage.removeItem('emma_words_completed');
        localStorage.removeItem('emma_shuffled_words');
        localStorage.removeItem('emma_shuffle_level');
        gameScore = 0;
        totalWordsCompleted = 0;
        currentLevelNumber = 1;
        savedLevelForShuffle = 0;
        currentLevelShuffledWords = [];
        goBackToMenu();
    }
}

function renderCurrentStage() {
    const stageContainer = document.getElementById('mainStage');
    if (!stageContainer) return;

    if (isGameMode) {
        renderTypingGameStage();
        return;
    }
    if (isReadingGameMode) {
        renderReadingGameStage();
        return;
    }
    
    stageContainer.innerHTML = renderCoverHTML();
}

// =========================================================================
// HUD PROGRESS TRACK (BARRA DE CAMÍ VIDEOJOC)
// =========================================================================
function renderProgressTrackHTML() {
    const stepCount = totalWordsCompleted % 10;
    const percentage = (stepCount / 10) * 100;

    return `
        <div class="progress-track-container">
            <div class="track-bar-bg">
                <div class="track-bar-fill" style="width: ${percentage}%"></div>
                <div class="track-mascot" style="left: calc(${percentage}% - 20px)">🦄</div>
                <div class="track-finish-flag">🏁</div>
            </div>
        </div>
    `;
}

// =========================================================================
// PORTADA (MENU PRINCIPAL VIDEOJOC)
// =========================================================================
function renderCoverHTML() {
    return `
        <div class="arcade-cover-container">
            <div class="hero-title-group">
                <h1 class="hero-main-title" data-text="L'AVENTURA D'EMMA">L'AVENTURA D'EMMA</h1>
                <div class="hero-sub-ribbon">⭐ PREPARA'T PER JUGAR ⭐</div>
            </div>

            <div class="main-game-buttons-grid">
                <button class="arcade-game-card card-reading" onclick="startReadingGame()">
                    <div class="card-icon-box">📖</div>
                    <h2>LLEGIR</h2>
                    <span class="play-pill">PLAY</span>
                </button>

                <button class="arcade-game-card card-typing" onclick="startTypingGame()">
                    <div class="card-icon-box">⌨️</div>
                    <h2>ESCRIURE</h2>
                    <span class="play-pill">PLAY</span>
                </button>
            </div>
            
            <div class="stats-board">
                <span>🏆 NIVELL ACTUAL: ${currentLevelNumber}</span>
                <span>⭐ PUNTS: ${gameScore}</span>
            </div>

            <button class="reset-game-btn" onclick="resetGameData()">🔄 REINICIAR JOC (Nivell 1)</button>
        </div>
    `;
}

// =========================================================================
// 1. JOC DE LECTURA 
// =========================================================================
function renderReadingGameStage() {
    const stageContainer = document.getElementById('mainStage');
    if (!stageContainer) return;

    stageContainer.innerHTML = `
        <div class="arcade-game-wrapper">
            <div class="game-hud-top">
                <button class="btn-back" onclick="goBackToMenu()">⬅ MENÚ</button>
                <div class="hud-center">NIVELL ${currentLevelNumber}</div>
                <div class="hud-score">⭐ ${gameScore}</div>
            </div>

            ${renderProgressTrackHTML()}

            <div class="reading-game-play-area">
                <div class="word-read-wrapper">
                    <div class="reading-target-word" id="readingTargetWord">...</div>
                    <button class="hint-audio-btn" title="Pista d'àudio" onclick="speakText(currentWordObj.text || currentWordObj.word)">
                        🔊 PISTA
                    </button>
                </div>
                <div class="image-options-grid" id="imageOptionsGrid"></div>
            </div>
        </div>
        
        <div class="celebration-overlay" id="celebrationModal">
            <div class="celebration-card">
                <h2>NIVELL COMPLETAT!</h2>
                <div class="celebration-lvl-badge">🏆 NIVELL ${currentLevelNumber} DESBLOQUEJAT</div>
                <button class="btn-next-level" onclick="closeCelebrationModal()">SEGUENT NIVELL 🚀</button>
            </div>
        </div>
        <canvas id="confettiCanvas" class="confetti-canvas"></canvas>
    `;
}

function loadNextReadingTarget() {
    if (!isReadingGameMode) return;
    ensureShuffledBank();

    const idx = totalWordsCompleted % 10;
    currentWordObj = currentLevelShuffledWords[idx];

    const targetWordEl = document.getElementById('readingTargetWord');
    const optionsGridEl = document.getElementById('imageOptionsGrid');
    if (!targetWordEl || !optionsGridEl) return;

    targetWordEl.innerText = currentWordObj.text || currentWordObj.word;

    // Obtenim 3 distractors del mateix nivell
    const effLvl = getEffectiveLevel();
    let bank = levelWordBanks[effLvl];
    let otherWords = bank.filter(w => w.word !== currentWordObj.word);
    
    let options = [currentWordObj];
    while (options.length < 4 && otherWords.length > 0) {
        const rIdx = Math.floor(Math.random() * otherWords.length);
        options.push(otherWords[rIdx]);
        otherWords.splice(rIdx, 1);
    }
    options.sort(() => Math.random() - 0.5);

    optionsGridEl.innerHTML = options.map(opt => `
        <div class="image-option-card" onclick="handleReadingChoice('${opt.word}', this)">
            <div class="option-icon">${opt.icon}</div>
        </div>
    `).join('');
}

window.handleReadingChoice = function(chosenWord, element) {
    if (!currentWordObj) return;

    if (chosenWord === currentWordObj.word) {
        element.classList.add('correct');
        playSuccessSound();
        gameScore += 10;
        totalWordsCompleted++;

        localStorage.setItem('emma_game_score', gameScore);
        localStorage.setItem('emma_words_completed', totalWordsCompleted);
        speakText(`Molt bé! És ${currentWordObj.word}!`);

        if (totalWordsCompleted > 0 && totalWordsCompleted % 10 === 0) {
            currentLevelNumber = Math.floor(totalWordsCompleted / 10) + 1;
            setTimeout(() => triggerLevelUpCelebration(), 800);
        } else {
            setTimeout(() => {
                renderReadingGameStage();
                loadNextReadingTarget();
            }, 1400);
        }
    } else {
        element.classList.add('wrong');
        playErrorSound();
        setTimeout(() => element.classList.remove('wrong'), 500);
    }
};

// =========================================================================
// 2. JOC D'ESCRIURE
// =========================================================================
function renderTypingGameStage() {
    const stageContainer = document.getElementById('mainStage');
    if (!stageContainer) return;

    stageContainer.innerHTML = `
        <div class="arcade-game-wrapper">
            <div class="game-hud-top">
                <button class="btn-back" onclick="goBackToMenu()">⬅ MENÚ</button>
                <div class="hud-center">NIVELL ${currentLevelNumber}</div>
                <div class="hud-score">⭐ ${gameScore}</div>
            </div>

            ${renderProgressTrackHTML()}

            <div class="game-play-area" id="gamePlayArea">
                <div class="target-visual-compact">
                    <span id="targetIcon">🍎</span>
                </div>
                <div class="typing-boxes" id="typingBoxes"></div>
            </div>

            <div class="virtual-keyboard" id="virtualKeyboard">
                <div class="keyboard-row">
                    ${['Q','W','E','R','T','Y','U','I','O','P'].map(k => `<button class="key-btn" data-key="${k}" onclick="handleVirtualKeyClick('${k}')">${k}</button>`).join('')}
                </div>
                <div class="keyboard-row">
                    ${['A','S','D','F','G','H','J','K','L','Ç'].map(k => `<button class="key-btn" data-key="${k}" onclick="handleVirtualKeyClick('${k}')">${k}</button>`).join('')}
                </div>
                <div class="keyboard-row">
                    ${['Z','X','C','V','B','N','M'].map(k => `<button class="key-btn" data-key="${k}" onclick="handleVirtualKeyClick('${k}')">${k}</button>`).join('')}
                </div>
            </div>
        </div>

        <div class="celebration-overlay" id="celebrationModal">
            <div class="celebration-card">
                <h2>NIVELL COMPLETAT!</h2>
                <div class="celebration-lvl-badge">🏆 NIVELL ${currentLevelNumber} DESBLOQUEJAT</div>
                <button class="btn-next-level" onclick="closeCelebrationModal()">SEGUENT NIVELL 🚀</button>
            </div>
        </div>
        <canvas id="confettiCanvas" class="confetti-canvas"></canvas>
    `;
}

function loadNextGameTarget() {
    if (!isGameMode) return;
    ensureShuffledBank();

    const idx = totalWordsCompleted % 10;
    currentWordObj = currentLevelShuffledWords[idx];
    typedChars = [];

    const targetIconEl = document.getElementById('targetIcon');
    const typingBoxesEl = document.getElementById('typingBoxes');
    if (!targetIconEl || !typingBoxesEl) return;

    targetIconEl.innerText = currentWordObj.icon;

    let boxesHtml = '';
    for (let i = 0; i < currentWordObj.word.length; i++) {
        boxesHtml += `<div class="char-box ${i === 0 ? 'current-target' : ''}" id="box-${i}"></div>`;
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
        if (keyBtn) keyBtn.classList.add('highlighted');
    }
}

window.handleVirtualKeyClick = function(char) {
    processTypedChar(char.toUpperCase());
};

function setupPhysicalKeyboardListener() {
    window.addEventListener('keydown', (e) => {
        if (!isGameMode) return;
        const key = e.key.toUpperCase();
        if (/^[A-ZÇ]$/.test(key)) {
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
            gameScore += 10;
            totalWordsCompleted++;
            localStorage.setItem('emma_game_score', gameScore);
            localStorage.setItem('emma_words_completed', totalWordsCompleted);

            playSuccessSound();
            speakText(`Molt bé! Has escrit ${currentWordObj.word}!`);

            if (totalWordsCompleted > 0 && totalWordsCompleted % 10 === 0) {
                currentLevelNumber = Math.floor(totalWordsCompleted / 10) + 1;
                setTimeout(() => triggerLevelUpCelebration(), 800);
            } else {
                setTimeout(() => renderTypingGameStage(), 1200);
            }
        } else {
            const nextBox = document.getElementById(`box-${typedChars.length}`);
            if (nextBox) nextBox.classList.add('current-target');
            highlightNextKey();
        }
    } else {
        playErrorSound();
        const keyBtn = document.querySelector(`.key-btn[data-key="${char}"]`);
        if(keyBtn) {
            keyBtn.classList.add('error-shake');
            setTimeout(() => keyBtn.classList.remove('error-shake'), 300);
        }
    }
}

// =========================================================================
// CELEBRACIÓ I SISTEMA D'AUDIO
// =========================================================================

let preferredVoice = null;
function setBestVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Busquem veus en valencià/català
    let caVoices = voices.filter(v => v.lang.startsWith('ca'));
    if (caVoices.length > 0) {
        // Intentem agafar la més "natural" (Navegadors moderns com Edge tenen 'Natural', Chrome té 'Google')
        preferredVoice = caVoices.find(v => 
            v.name.toLowerCase().includes('natural') || 
            v.name.toLowerCase().includes('google') ||
            v.name.toLowerCase().includes('online') ||
            v.name.toLowerCase().includes('premium')
        ) || caVoices[0];
    }
}

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = setBestVoice;
    setBestVoice();
}

function triggerLevelUpCelebration() {
    playFanfareSound();
    const modal = document.getElementById('celebrationModal');
    if (modal) modal.classList.add('show');
    startConfettiAnimation();
}

window.closeCelebrationModal = function() {
    const modal = document.getElementById('celebrationModal');
    if (modal) modal.classList.remove('show');
    stopConfettiAnimation();
    if (isGameMode) {
        renderTypingGameStage();
        loadNextGameTarget();
    }
    if (isReadingGameMode) {
        renderReadingGameStage();
        loadNextReadingTarget();
    }
};

window.speakText = function(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    // Netegem els guionets per a que es llisca la paraula sencera de forma fluida
    const cleanSpeechText = text.replace(/-/g, '').toLowerCase();
    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    
    utterance.lang = 'ca-ES';
    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }
    
    // Ajustem el to i la velocitat per llevar-li aspresa robòtica
    utterance.rate = 0.9;
    utterance.pitch = 1.15; // Un to lleugerament més alt i expressiu
    
    window.speechSynthesis.speak(utterance);
};

// AUDIO SYNTH (Bàsic, sense fitxers externs)
function playPopSound() {
    try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.frequency.setValueAtTime(400, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1); gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.1); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.1); } catch(e){}
}
function playSuccessSound() {
    try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => { const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'triangle'; osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1); gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.1); gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2); osc.connect(gain); gain.connect(ctx.destination); osc.start(ctx.currentTime + i * 0.1); osc.stop(ctx.currentTime + i * 0.1 + 0.2); }); } catch(e){}
}
function playFanfareSound() {
    try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); [440, 554.37, 659.25, 880, 1046.50].forEach((freq, i) => { const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'square'; osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12); gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.12); gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.3); osc.connect(gain); gain.connect(ctx.destination); osc.start(ctx.currentTime + i * 0.12); osc.stop(ctx.currentTime + i * 0.12 + 0.3); }); } catch(e){}
}
function playErrorSound() {
    try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'sawtooth'; osc.frequency.setValueAtTime(180, ctx.currentTime); gain.gain.setValueAtTime(0.15, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.15); } catch(e){}
}

// CONFETI
let confettiActive = false;
let confettiParticles = [];
function startConfettiAnimation() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    confettiActive = true; confettiParticles = [];
    const colors = ['#FF5964', '#35A7FF', '#FFD166', '#06D6A0', '#9B5DE5', '#FF9F1C'];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height, size: Math.random() * 12 + 8, color: colors[Math.floor(Math.random() * colors.length)], vy: Math.random() * 4 + 2, vx: Math.random() * 2 - 1, rot: Math.random() * 360 });
    }
    function loop() {
        if (!confettiActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiParticles.forEach(p => {
            p.y += p.vy; p.x += p.vx; p.rot += 3;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rot * Math.PI) / 180); ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); ctx.restore();
            if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
        });
        requestAnimationFrame(loop);
    }
    loop();
}
function stopConfettiAnimation() {
    confettiActive = false;
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}
