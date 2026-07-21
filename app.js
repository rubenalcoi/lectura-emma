/* ==========================================================================
   LLIBRE DE LECTURA D'EMMA - ACCESOS DIRECTES A LA PORTADA I CAMÍ ANIMAT
   ========================================================================== */

const unitsData = [
    { id: 'cover', title: 'Portada', isCover: true },

    // =========================================================================
    // NIVELL 1: CONSONANTS INICIALS (UNA SOLA CONSONANT)
    // =========================================================================
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
            { parts: ['MA', 'MA'], icon: '👩', fullText: 'MA-MA' },
            { parts: ['MI', 'A'], icon: '👧', fullText: 'MI-A' },
            { parts: ['MI', 'U'], icon: '🐱', fullText: 'MI-U' },
            { parts: ['MO', 'MI', 'A'], icon: '🧟', fullText: 'MO-MI-A' }
        ],
        sentences: [
            { words: [{ syls: ['MA', 'MA'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['MI', 'A'] }], cleanText: 'MA-MA AMA A MIA.' },
            { words: [{ syls: ['MI', 'A'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['MA', 'MA'] }], cleanText: 'MIA AMA A MA-MA.' },
            { words: [{ syls: ['MI', 'U'] }, { syls: ['MI', 'A'] }, { syls: ['MA', 'MA'] }], cleanText: 'MIU MIA MAMA.' }
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
        id: 'n1-t', level: 1, letter: 'T', title: 'LA LLETRA T (NIVELL 1)', subtitle: 'Sols la lletra T + Vocals (TA, TE, TI, TO, TU)',
        syllables: [
            { text: 'TA', comb: 'T + A', cardClass: 'syl-card-a' },
            { text: 'TE', comb: 'T + E', cardClass: 'syl-card-e' },
            { text: 'TI', comb: 'T + I', cardClass: 'syl-card-i' },
            { text: 'TO', comb: 'T + O', cardClass: 'syl-card-o' },
            { text: 'TU', comb: 'T + U', cardClass: 'syl-card-u' }
        ],
        shuffledLines: [['TE', 'TO', 'TA', 'TU', 'TI'], ['TU', 'TI', 'TE', 'TA', 'TO']],
        words: [
            { parts: ['TO', 'TO'], icon: '🧸', fullText: 'TO-TO' },
            { parts: ['TA', 'TA'], icon: '👵', fullText: 'TA-TA' },
            { parts: ['TI', 'TI'], icon: '🐵', fullText: 'TI-TI' },
            { parts: ['TU', 'TU'], icon: '👗', fullText: 'TU-TU' }
        ],
        sentences: [
            { words: [{ syls: ['TO', 'TO'] }, { syls: ['TA', 'TA'] }], cleanText: 'TO-TO TA-TA.' },
            { words: [{ syls: ['TI', 'TI'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['TO', 'TO'] }], cleanText: 'TI-TI AMA A TO-TO.' },
            { words: [{ syls: ['TU'] }, { syls: ['TA', 'TA'] }], cleanText: 'TU TA-TA.' }
        ]
    },

    // =========================================================================
    // NIVELL 2: CONSONANTS INICIALS COMBINADES
    // =========================================================================
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
            { parts: ['MA', 'MA'], icon: '👩', fullText: 'MA-MA' },
            { parts: ['PO', 'MA'], icon: '🍎', fullText: 'PO-MA' },
            { parts: ['LLI', 'MA'], icon: '🍋', fullText: 'LLI-MA' },
            { parts: ['MO', 'MI', 'A'], icon: '🧟', fullText: 'MO-MI-A' }
        ],
        sentences: [
            { words: [{ syls: ['LA'] }, { syls: ['MA', 'MA'] }, { syls: ['A', 'MA'] }, { syls: ['A'] }, { syls: ['EM', 'MA'] }], cleanText: 'LA MA-MA AMA A EMMA.' },
            { words: [{ syls: ['LA'] }, { syls: ['PO', 'MA'] }, { syls: ['ES'] }, { syls: ['BO', 'NA'] }], cleanText: 'LA PO-MA ES BONA.' },
            { words: [{ syls: ['MI', 'A'] }, { syls: ['TE'] }, { syls: ['U', 'NA'] }, { syls: ['LLI', 'MA'] }], cleanText: 'MIA TE UNA LLI-MA.' }
        ]
    },
    {
        id: 'n2-p', level: 2, letter: 'P', title: 'LA LLETRA P (NIVELL 2)', subtitle: 'Combinada amb altres consonants (PA, PE, PI, PO, PU)',
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
            { words: [{ syls: ['EL'] }, { syls: ['PA', 'PA'] }, { syls: ['TE'] }, { syls: ['U', 'NA'] }, { syls: ['PI', 'PA'] }], cleanText: 'EL PA-PA TE UNA PI-PA.' },
            { words: [{ syls: ['PE', 'PA'] }, { syls: ['MEN', 'JA'] }, { syls: ['PO', 'MA'] }], cleanText: 'PE-PA MENJA PO-MA.' },
            { words: [{ syls: ['EL'] }, { syls: ['PI', 'A', 'NO'] }, { syls: ['SO', 'NA'] }, { syls: ['BE'] }], cleanText: 'EL PI-A-NO SONA BE.' }
        ]
    },
    {
        id: 'n3-bv', level: 3, letter: 'B/V', title: 'LES LLETRES B I V (NIVELL 3)', subtitle: 'Sols B/V + Vocals (BA, BE, BI, BO, BU / VA, VE, VI, VO, VU)',
        syllables: [
            { text: 'BA', comb: 'B + A', cardClass: 'syl-card-a' },
            { text: 'BE', comb: 'B + E', cardClass: 'syl-card-e' },
            { text: 'VI', comb: 'V + I', cardClass: 'syl-card-i' },
            { text: 'VO', comb: 'V + O', cardClass: 'syl-card-o' },
            { text: 'VU', comb: 'V + U', cardClass: 'syl-card-u' }
        ],
        shuffledLines: [['BE', 'VO', 'BA', 'VU', 'VI'], ['VU', 'VI', 'BE', 'BA', 'VO']],
        words: [
            { parts: ['BA', 'BA'], icon: '👵', fullText: 'BA-BA' },
            { parts: ['BI', 'BI'], icon: '🍼', fullText: 'BI-BI' },
            { parts: ['BO', 'BO'], icon: '🤡', fullText: 'BO-BO' },
            { parts: ['VA', 'VA'], icon: '🐮', fullText: 'VA-VA' }
        ],
        sentences: [
            { words: [{ syls: ['BA', 'BA'] }, { syls: ['VA', 'VA'] }], cleanText: 'BA-BA VA-VA.' },
            { words: [{ syls: ['BI', 'BI'] }, { syls: ['BO', 'BO'] }], cleanText: 'BI-BI BO-BO.' },
            { words: [{ syls: ['VI', 'VI'] }, { syls: ['BA', 'BA'] }], cleanText: 'VI-VI BA-BA.' }
        ]
    },
    {
        id: 'n4-bv', level: 4, letter: 'B/V', title: 'B I V COMBINADES (NIVELL 4)', subtitle: 'Lectura completa de paraules amb B i V',
        syllables: [
            { text: 'BA', comb: 'B + A', cardClass: 'syl-card-a' },
            { text: 'BE', comb: 'B + E', cardClass: 'syl-card-e' },
            { text: 'VA', comb: 'V + A', cardClass: 'syl-card-a' },
            { text: 'VI', comb: 'V + I', cardClass: 'syl-card-i' },
            { text: 'BO', comb: 'B + O', cardClass: 'syl-card-o' }
        ],
        shuffledLines: [['BE', 'VO', 'BA', 'VU', 'VI'], ['VU', 'VI', 'BE', 'BA', 'VO']],
        words: [
            { parts: ['VA', 'CA'], icon: '🐮', fullText: 'VA-CA' },
            { parts: ['BA', 'TO'], icon: '🦆', fullText: 'BA-TO' },
            { parts: ['BO', 'TA'], icon: '🥾', fullText: 'BO-TA' },
            { parts: ['BI', 'CI'], icon: '🚲', fullText: 'BI-CI' }
        ],
        sentences: [
            { words: [{ syls: ['LA'] }, { syls: ['VA', 'CA'] }, { syls: ['DO', 'NA'] }, { syls: ['LLET'] }], cleanText: 'LA VA-CA DONA LLET.' },
            { words: [{ syls: ['EM', 'MA'] }, { syls: ['VA'] }, { syls: ['EN'] }, { syls: ['BI', 'CI'] }], cleanText: 'EMMA VA EN BI-CI.' },
            { words: [{ syls: ['LA'] }, { syls: ['BO', 'TA'] }, { syls: ['ES'] }, { syls: ['BLA', 'VA'] }], cleanText: 'LA BO-TA ES BLAVA.' }
        ]
    }
];

// Estat de l'aplicació
let currentUnitId = 'cover';
let isAllUnitsMode = false;
let isGameMode = false;
let isReadingGameMode = false;
let userStars = JSON.parse(localStorage.getItem('emma_stars') || '{}');

// Estat del Joc
let gameScore = parseInt(localStorage.getItem('emma_game_score') || '0');
let totalWordsCompleted = parseInt(localStorage.getItem('emma_words_completed') || '0');
let currentLevelNumber = Math.floor(totalWordsCompleted / 10) + 1; // PUJA DE NIVELL CADA 10 PARAULES
let currentDifficulty = 'facil';
let gameTargetIndex = 0;
let currentWordObj = null;
let typedChars = [];

// Bancs de paraules (Mínim 4 lletres, sense accents)
const difficultyWordBanks = {
    facil: [
        { word: 'POMA', icon: '🍎', text: 'PO-MA' },
        { word: 'LUNA', icon: '🌙', text: 'LU-NA' },
        { word: 'VACA', icon: '🐮', text: 'VA-CA' },
        { word: 'BICI', icon: '🚲', text: 'BI-CI' },
        { word: 'DADO', icon: '🎲', text: 'DA-DO' },
        { word: 'SOPA', icon: '🍲', text: 'SO-PA' },
        { word: 'RODA', icon: '🛞', text: 'RO-DA' },
        { word: 'CASA', icon: '🏠', text: 'CA-SA' },
        { word: 'PEPA', icon: '🐷', text: 'PE-PA' },
        { word: 'PAPA', icon: '👨', text: 'PA-PA' },
        { word: 'MAMA', icon: '👩', text: 'MA-MA' }
    ],
    mitja: [
        { word: 'LLIMA', icon: '🍋', text: 'LLI-MA' },
        { word: 'SALA', icon: '🛋️', text: 'SA-LA' },
        { word: 'COPA', icon: '🏆', text: 'CO-PA' },
        { word: 'FOCA', icon: '🦭', text: 'FO-CA' },
        { word: 'TOTO', icon: '🧸', text: 'TO-TO' },
        { word: 'TATA', icon: '👵', text: 'TA-TA' },
        { word: 'POPA', icon: '⛵', text: 'PO-PA' },
        { word: 'PIPA', icon: '🎷', text: 'PI-PA' }
    ],
    avancat: [
        { word: 'TOMATA', icon: '🍅', text: 'TO-MA-TA' },
        { word: 'TULIPA', icon: '🌷', text: 'TU-LI-PA' },
        { word: 'PAQUET', icon: '📦', text: 'PA-QUET' },
        { word: 'NINU', icon: '🪆', text: 'NIN-U' },
        { word: 'LLEO', icon: '🦁', text: 'LLE-O' },
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
        <button class="unit-tab ${currentUnitId === 'cover' && !isAllUnitsMode && !isGameMode && !isReadingGameMode ? 'active' : ''}" onclick="switchUnit('cover')">
            🌈 PORTADA
        </button>
        <button class="unit-tab tab-reading-game ${isReadingGameMode ? 'active' : ''}" onclick="startReadingGame()">
            📖 JOC DE LECTURA (NIV ${currentLevelNumber})
        </button>
        <button class="unit-tab tab-game ${isGameMode ? 'active' : ''}" onclick="startTypingGame()">
            ⌨️ JOC D'ESCRIURE (NIV ${currentLevelNumber})
        </button>
        <div class="level-group-label">🟢 N1 (Úniques):</div>
    `;
    n1.forEach(u => { html += `<button class="unit-tab tab-n1 ${currentUnitId === u.id && !isAllUnitsMode && !isGameMode && !isReadingGameMode ? 'active' : ''}" onclick="switchUnit('${u.id}')">${u.letter}</button>`; });

    html += `<div class="level-group-label">🔵 N2 (Combinades):</div>`;
    n2.forEach(u => { html += `<button class="unit-tab tab-n2 ${currentUnitId === u.id && !isAllUnitsMode && !isGameMode && !isReadingGameMode ? 'active' : ''}" onclick="switchUnit('${u.id}')">${u.letter}</button>`; });

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
    isReadingGameMode = false;
    renderUnitTabs();
    renderCurrentStage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showAllUnitsForPrint = function() {
    isAllUnitsMode = true;
    isGameMode = false;
    isReadingGameMode = false;
    renderUnitTabs();
    renderCurrentStage();
};

window.startTypingGame = function() {
    isGameMode = true;
    isReadingGameMode = false;
    isAllUnitsMode = false;
    renderUnitTabs();
    renderTypingGameStage();
    loadNextGameTarget();
};

window.startReadingGame = function() {
    isReadingGameMode = true;
    isGameMode = false;
    isAllUnitsMode = false;
    renderUnitTabs();
    renderReadingGameStage();
    loadNextReadingTarget();
};

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

// Generar la barra del camí animat (Progress Track Bar)
function renderProgressTrackHTML() {
    const stepCount = totalWordsCompleted % 10;
    const percentage = (stepCount / 10) * 100;

    return `
        <div class="progress-track-container">
            <div class="track-info">
                <span>🏃 CAMÍ CAP AL TROFEU: <strong>${stepCount}/10 passos</strong></span>
                <span>🏆 NIVELL ${currentLevelNumber}</span>
            </div>
            <div class="track-bar-bg">
                <div class="track-bar-fill" style="width: ${percentage}%"></div>
                <div class="track-mascot" style="left: calc(${percentage}% - 25px)">🦄</div>
                <div class="track-finish-flag">🏆</div>
            </div>
        </div>
    `;
}

// =========================================================================
// 1. JOC DE LECTURA ("ENDEVINA LA IMATGE")
// =========================================================================
function renderReadingGameStage() {
    const stageContainer = document.getElementById('mainStage');
    if (!stageContainer) return;

    stageContainer.innerHTML = `
        <div class="game-container">
            <div class="game-header-bar">
                <div class="game-title-group">
                    <ion-icon name="book" style="font-size: 2rem; color: var(--secondary);"></ion-icon>
                    <span>JOC DE LECTURA D'EMMA 📖</span>
                </div>
                
                <div class="game-stats-group">
                    <div class="score-badge badge-lvl">🏆 NIVELL <strong id="gameLvlNum">${currentLevelNumber}</strong></div>
                    <div class="score-badge badge-words">🎯 ${totalWordsCompleted % 10}/10 Paraules</div>
                    <div class="score-badge badge-pts">⭐ ${gameScore} pts</div>
                </div>
            </div>

            ${renderProgressTrackHTML()}

            <div class="reading-game-play-area">
                <p class="reading-instruction">LLEGEIX LA PARAULA I SELECCIONA LA IMATGE CORRECTA:</p>
                <div class="reading-target-word" id="readingTargetWord" onclick="speakText(this.innerText)">PO-MA</div>

                <div class="image-options-grid" id="imageOptionsGrid"></div>
            </div>
        </div>

        <div class="celebration-overlay" id="celebrationModal">
            <div class="celebration-card">
                <div class="celebration-icon">🏆 🎉 🌟</div>
                <h2>ENHORABONA EMMA!</h2>
                <p class="celebration-msg">HAS COMPLETAT 10 PARAULES AMB ÈXIT!</p>
                <div class="celebration-lvl-badge">PUJES AL NIVELL <span id="newLvlNum">2</span>!</div>
                <button class="btn btn-primary btn-lg" onclick="closeCelebrationModal()">
                    🚀 CONTINUAR JUGANT!
                </button>
            </div>
        </div>
        <canvas id="confettiCanvas" class="confetti-canvas"></canvas>
    `;
}

function loadNextReadingTarget() {
    if (!isReadingGameMode) return;

    const bank = difficultyWordBanks[currentDifficulty] || difficultyWordBanks.facil;
    currentWordObj = bank[gameTargetIndex % bank.length];

    const targetWordEl = document.getElementById('readingTargetWord');
    const optionsGridEl = document.getElementById('imageOptionsGrid');

    if (!targetWordEl || !optionsGridEl) return;

    targetWordEl.innerText = currentWordObj.text || currentWordObj.word;

    let options = [currentWordObj];
    let otherWords = bank.filter(w => w.word !== currentWordObj.word);

    while (options.length < 4 && otherWords.length > 0) {
        const randIdx = Math.floor(Math.random() * otherWords.length);
        options.push(otherWords[randIdx]);
        otherWords.splice(randIdx, 1);
    }

    options.sort(() => Math.random() - 0.5);

    optionsGridEl.innerHTML = options.map(opt => `
        <div class="image-option-card" onclick="handleReadingChoice('${opt.word}', this)">
            <div class="option-icon">${opt.icon}</div>
        </div>
    `).join('');

    speakText(currentWordObj.text || currentWordObj.word);
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
            renderUnitTabs();
            setTimeout(() => {
                triggerLevelUpCelebration();
            }, 800);
        } else {
            gameTargetIndex++;
            setTimeout(() => {
                renderReadingGameStage();
                loadNextReadingTarget();
            }, 1400);
        }
    } else {
        element.classList.add('wrong');
        playErrorSound();
    }
};

// =========================================================================
// 2. JOC D'ESCRIURE EN TECLAT
// =========================================================================
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
                    <div class="score-badge badge-words">🎯 ${totalWordsCompleted % 10}/10 Paraules</div>
                    <div class="score-badge badge-pts">⭐ ${gameScore} pts</div>
                </div>

                <div class="diff-selector">
                    <button class="diff-btn ${currentDifficulty === 'facil' ? 'active' : ''}" onclick="setDifficulty('facil')">🌱 Fàcil (4 lletres)</button>
                    <button class="diff-btn ${currentDifficulty === 'mitja' ? 'active' : ''}" onclick="setDifficulty('mitja')">⭐ Mitjà</button>
                    <button class="diff-btn ${currentDifficulty === 'avancat' ? 'active' : ''}" onclick="setDifficulty('avancat')">🚀 Avançat</button>
                </div>
            </div>

            ${renderProgressTrackHTML()}

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

        <div class="celebration-overlay" id="celebrationModal">
            <div class="celebration-card">
                <div class="celebration-icon">🏆 🎉 🌟</div>
                <h2>ENHORABONA EMMA!</h2>
                <p class="celebration-msg">HAS COMPLETAT 10 PARAULES AMB ÈXIT!</p>
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
    if (isGameMode) renderTypingGameStage();
    if (isReadingGameMode) renderReadingGameStage();
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
            gameScore += 10;
            totalWordsCompleted++;

            localStorage.setItem('emma_game_score', gameScore);
            localStorage.setItem('emma_words_completed', totalWordsCompleted);

            playSuccessSound();
            speakText(`Molt bé! Has escrit ${currentWordObj.word}!`);

            if (totalWordsCompleted > 0 && totalWordsCompleted % 10 === 0) {
                currentLevelNumber = Math.floor(totalWordsCompleted / 10) + 1;
                renderUnitTabs();
                setTimeout(() => {
                    triggerLevelUpCelebration();
                }, 800);
            } else {
                gameTargetIndex++;
                setTimeout(() => {
                    renderTypingGameStage();
                }, 1400);
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
    if (isGameMode) renderTypingGameStage();
    if (isReadingGameMode) {
        renderReadingGameStage();
        loadNextReadingTarget();
    }
};

// ANIMACIÓ CONFETI
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

            <!-- TARGETES D'ACCÉS DIRECTE ALS JOCS A LA PORTADA -->
            <div class="cover-games-shortcuts-grid">
                <div class="game-shortcut-card card-reading-shortcut" onclick="startReadingGame()">
                    <div class="shortcut-icon">📖</div>
                    <div class="shortcut-info">
                        <h3>JOC DE LECTURA</h3>
                        <p>Llegeix la paraula i troba la imatge correcta!</p>
                    </div>
                    <button class="btn btn-shortcut-reading">🚀 JUGAR A LLEGIR</button>
                </div>

                <div class="game-shortcut-card card-typing-shortcut" onclick="startTypingGame()">
                    <div class="shortcut-icon">🎹</div>
                    <div class="shortcut-info">
                        <h3>JOC D'ESCRIURE</h3>
                        <p>Practica les síl·labes escrivint en el teclat!</p>
                    </div>
                    <button class="btn btn-shortcut-typing">⌨️ JUGAR A ESCRIURE</button>
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
    
    let levelBadgeText = unit.level === 1 ? '🟢 NIVELL 1: ÚNICA' : '🔵 NIVELL 2: COMBINADA';
    let levelBadgeClass = unit.level === 1 ? 'badge-n1' : 'badge-n2';
    let levelBgClass = unit.level === 1 ? 'bg-n1' : 'bg-n2';

    return `
        <div class="a4-page" id="sheet-${unit.id}">
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
