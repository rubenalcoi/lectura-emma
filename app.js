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
    ],
    11: [
        { word: 'MELO', icon: '🍈', text: 'ME-LO' },         { word: 'PERA', icon: '🍐', text: 'PE-RA' },
        { word: 'CARN', icon: '🥩', text: 'CARN' },         { word: 'PEIX', icon: '🐟', text: 'PEIX' },
        { word: 'MADUIXA', icon: '🍓', text: 'MA-DUI-XA' },         { word: 'SAL', icon: '🧂', text: 'SAL' },
        { word: 'OLIVA', icon: '🫒', text: 'O-LI-VA' },         { word: 'OU', icon: '🥚', text: 'OU' },
        { word: 'PERNIL', icon: '🍖', text: 'PER-NIL' },         { word: 'MEL', icon: '🍯', text: 'MEL' }
    ],
    12: [
        { word: 'CEREAL', icon: '🥣', text: 'CE-RE-AL' },         { word: 'LLENTILLA', icon: '🫘', text: 'LLEN-TI-LLA' },
        { word: 'MACARRO', icon: '🍝', text: 'MA-CAR-RO' },         { word: 'SANTVITX', icon: '🥪', text: 'SANT-VITX' },
        { word: 'PA', icon: '🥖', text: 'PA' },         { word: 'VI', icon: '🍷', text: 'VI' },
        { word: 'AIGUA', icon: '💧', text: 'AI-GUA' },         { word: 'SUC', icon: '🧃', text: 'SUC' },
        { word: 'LLET', icon: '🥛', text: 'LLET' },         { word: 'ARROS', icon: '🍚', text: 'A-RROS' }
    ],
    13: [
        { word: 'LLIT', icon: '🛏️', text: 'LLIT' },         { word: 'SOFA', icon: '🛋️', text: 'SO-FA' },
        { word: 'BANY', icon: '🛁', text: 'BANY' },         { word: 'CUINA', icon: '🍳', text: 'CUI-NA' },
        { word: 'FORN', icon: '🎛️', text: 'FORN' },         { word: 'PLAT', icon: '🍽️', text: 'PLAT' },
        { word: 'TETERA', icon: '🫖', text: 'TE-TE-RA' },         { word: 'FORQUILLA', icon: '🍴', text: 'FOR-QUIL-LA' },
        { word: 'CULLERA', icon: '🥄', text: 'CU-LLE-RA' },         { word: 'GANIVET', icon: '🔪', text: 'GA-NI-VET' }
    ],
    14: [
        { word: 'CLAU', icon: '🔑', text: 'CLAU' },         { word: 'PANY', icon: '🔒', text: 'PANY' },
        { word: 'FINESTRA', icon: '🪟', text: 'FI-NES-TRA' },         { word: 'TEULADA', icon: '🏘️', text: 'TEU-LA-DA' },
        { word: 'PAPERERA', icon: '🗑️', text: 'PA-PE-RE-RA' },         { word: 'PARET', icon: '🧱', text: 'PA-RET' },
        { word: 'QUADRE', icon: '🖼️', text: 'QUA-DRE' },         { word: 'RELLOTGE', icon: '🕰️', text: 'RE-LLOT-GE' },
        { word: 'BRESSOL', icon: '🚼', text: 'BRES-SOL' },         { word: 'COIXI', icon: '🛋️', text: 'COI-XI' }
    ],
    15: [
        { word: 'GALL', icon: '🐓', text: 'GALL' },         { word: 'GALLINA', icon: '🐔', text: 'GAL-LI-NA' },
        { word: 'POLLET', icon: '🐤', text: 'POL-LET' },         { word: 'PORQUET', icon: '🐷', text: 'POR-QUET' },
        { word: 'OVELLA', icon: '🐑', text: 'O-VE-LLA' },         { word: 'CABRA', icon: '🐐', text: 'CA-BRA' },
        { word: 'ASE', icon: '🫏', text: 'A-SE' },         { word: 'BOU', icon: '🐂', text: 'BOU' },
        { word: 'RATOLI', icon: '🐁', text: 'RA-TO-LI' },         { word: 'CONILL', icon: '🐇', text: 'CO-NILL' }
    ],
    16: [
        { word: 'LLEOPARD', icon: '🐆', text: 'LLE-O-PARD' },         { word: 'PANTERA', icon: '🐈‍⬛', text: 'PAN-TE-RA' },
        { word: 'HIPOPOTAM', icon: '🦛', text: 'HI-PO-PO-TAM' },         { word: 'RINOCERONT', icon: '🦏', text: 'RI-NO-CE-RONT' },
        { word: 'GIRAFA', icon: '🦒', text: 'GI-RA-FA' },         { word: 'ZEBRA', icon: '🦓', text: 'ZE-BRA' },
        { word: 'MICO', icon: '🐒', text: 'MI-CO' },         { word: 'GORILLA', icon: '🦍', text: 'GO-RIL-LA' },
        { word: 'OS', icon: '🐻', text: 'OS' },         { word: 'LLOP', icon: '🐺', text: 'LLOP' }
    ],
    17: [
        { word: 'BOSC', icon: '🌲', text: 'BOSC' },         { word: 'RIU', icon: '🏞️', text: 'RIU' },
        { word: 'LLAC', icon: '🌊', text: 'LLAC' },         { word: 'MAR', icon: '🌊', text: 'MAR' },
        { word: 'SOL', icon: '☀️', text: 'SOL' },         { word: 'NUVOL', icon: '☁️', text: 'NU-VOL' },
        { word: 'NEU', icon: '❄️', text: 'NEU' },         { word: 'GEL', icon: '🧊', text: 'GEL' },
        { word: 'FOC', icon: '🔥', text: 'FOC' },         { word: 'FUM', icon: '💨', text: 'FUM' }
    ],
    18: [
        { word: 'PANTALO', icon: '👖', text: 'PAN-TA-LO' },         { word: 'CAMISETA', icon: '👕', text: 'CA-MI-SE-TA' },
        { word: 'ABRIC', icon: '🧥', text: 'A-BRIC' },         { word: 'XANDALL', icon: '🎽', text: 'XAN-DALL' },
        { word: 'VESTIT', icon: '👗', text: 'VES-TIT' },         { word: 'BRUSA', icon: '👚', text: 'BRU-SA' },
        { word: 'CALCETINS', icon: '🧦', text: 'CAL-CE-TINS' },         { word: 'VAMBA', icon: '👟', text: 'VAM-BA' },
        { word: 'GORRA', icon: '🧢', text: 'GOR-RA' },         { word: 'BUFANDA', icon: '🧣', text: 'BU-FAN-DA' }
    ],
    19: [
        { word: 'GUANTS', icon: '🧤', text: 'GUANTS' },         { word: 'COLLAR', icon: '📿', text: 'CO-LLAR' },
        { word: 'ANELL', icon: '💍', text: 'A-NELL' },         { word: 'ULLERES', icon: '👓', text: 'U-LLE-RES' },
        { word: 'BOSSA', icon: '👜', text: 'BOS-SA' },         { word: 'CARTERA', icon: '💼', text: 'CAR-TE-RA' },
        { word: 'PARAIGUA', icon: '☂️', text: 'PA-RAI-GUA' },         { word: 'LLAC', icon: '🎀', text: 'LLAC' },
        { word: 'CORBATA', icon: '👔', text: 'COR-BA-TA' },         { word: 'CASC', icon: '⛑️', text: 'CASC' }
    ],
    20: [
        { word: 'BUST', icon: '👤', text: 'BUST' },         { word: 'CARA', icon: '😊', text: 'CA-RA' },
        { word: 'ULL', icon: '👁️', text: 'ULL' },         { word: 'NAS', icon: '👃', text: 'NAS' },
        { word: 'BOCA', icon: '👄', text: 'BO-CA' },         { word: 'DENT', icon: '🦷', text: 'DENT' },
        { word: 'ORELLA', icon: '👂', text: 'O-RE-LLA' },         { word: 'CABELL', icon: '💇', text: 'CA-BELL' },
        { word: 'BARBETA', icon: '🧔', text: 'BAR-BE-TA' },         { word: 'BRAC', icon: '💪', text: 'BRAC' }
    ],
    21: [
        { word: 'MA', icon: '🖐️', text: 'MA' },         { word: 'DIT', icon: '☝️', text: 'DIT' },
        { word: 'CAMA', icon: '🦵', text: 'CA-MA' },         { word: 'PEU', icon: '🦶', text: 'PEU' },
        { word: 'LLAGRIMA', icon: '😢', text: 'LLA-GRI-MA' },         { word: 'OS', icon: '🦴', text: 'OS' },
        { word: 'SANG', icon: '🩸', text: 'SANG' },         { word: 'COR', icon: '🫀', text: 'COR' },
        { word: 'CERVELL', icon: '🧠', text: 'CER-VELL' },         { word: 'UNGLA', icon: '💅', text: 'UN-GLA' }
    ],
    22: [
        { word: 'AVIO', icon: '✈️', text: 'A-VI-O' },         { word: 'TREN', icon: '🚂', text: 'TREN' },
        { word: 'TRAMVIA', icon: '🚋', text: 'TRAM-VI-A' },         { word: 'METRO', icon: '🚇', text: 'ME-TRO' },
        { word: 'AUTOBUS', icon: '🚌', text: 'AU-TO-BUS' },         { word: 'CAMIO', icon: '🚛', text: 'CA-MI-O' },
        { word: 'TRACTOR', icon: '🚜', text: 'TRAC-TOR' },         { word: 'FURGONETA', icon: '🚐', text: 'FUR-GO-NE-TA' },
        { word: 'VELER', icon: '⛵', text: 'VE-LER' },         { word: 'TAXI', icon: '🚕', text: 'TA-XI' }
    ],
    23: [
        { word: 'CARRER', icon: '🛣️', text: 'CAR-RER' },         { word: 'PLACA', icon: '⛲', text: 'PLA-CA' },
        { word: 'PARC', icon: '🏞️', text: 'PARC' },         { word: 'BANC', icon: '🏦', text: 'BANC' },
        { word: 'HOSPITAL', icon: '🏥', text: 'HOS-PI-TAL' },         { word: 'FARMACIA', icon: '💊', text: 'FAR-MA-CI-A' },
        { word: 'SUPERMERCAT', icon: '🛒', text: 'SU-PER-MER-CAT' },         { word: 'BOTIGA', icon: '🛍️', text: 'BO-TI-GA' },
        { word: 'CINEMA', icon: '🍿', text: 'CI-NE-MA' },         { word: 'TEATRE', icon: '🎭', text: 'TE-A-TRE' }
    ],
    24: [
        { word: 'BIBLIOTECA', icon: '📚', text: 'BI-BLI-O-TE-CA' },         { word: 'PISCINA', icon: '🏊', text: 'PIS-CI-NA' },
        { word: 'GIMNAS', icon: '🏋️', text: 'GIM-NAS' },         { word: 'ESTADI', icon: '🏟️', text: 'ES-TA-DI' },
        { word: 'PORT', icon: '🚢', text: 'PORT' },         { word: 'AEROPORT', icon: '🛬', text: 'A-E-RO-PORT' },
        { word: 'ESTACIO', icon: '🚉', text: 'ES-TA-CI-O' },         { word: 'PONT', icon: '🌉', text: 'PONT' },
        { word: 'TORRE', icon: '🗼', text: 'TOR-RE' },         { word: 'EDIFICI', icon: '🏢', text: 'E-DI-FI-CI' }
    ],
    25: [
        { word: 'METGE', icon: '👨‍⚕️', text: 'MET-GE' },         { word: 'INFERMERA', icon: '👩‍⚕️', text: 'IN-FER-ME-RA' },
        { word: 'POLICIA', icon: '👮', text: 'PO-LI-CI-A' },         { word: 'BOMBER', icon: '🧑‍🚒', text: 'BOM-BER' },
        { word: 'MESTRE', icon: '👨‍🏫', text: 'MES-TRE' },         { word: 'FORNER', icon: '🧑‍🍳', text: 'FOR-NER' },
        { word: 'CARNISSER', icon: '🔪', text: 'CAR-NIS-SER' },         { word: 'PERRUQUER', icon: '✂️', text: 'PER-RU-QUER' },
        { word: 'MECANIC', icon: '🧑‍🔧', text: 'ME-CA-NIC' },         { word: 'FUSTER', icon: '🪚', text: 'FUS-TER' }
    ],
    26: [
        { word: 'PINTOR', icon: '👨‍🎨', text: 'PIN-TOR' },         { word: 'ACTOR', icon: '🎭', text: 'AC-TOR' },
        { word: 'CANTANT', icon: '👩‍🎤', text: 'CAN-TANT' },         { word: 'MUSIC', icon: '🧑‍🎤', text: 'MU-SIC' },
        { word: 'CORREDOR', icon: '🏃', text: 'COR-RE-DOR' },         { word: 'PILOT', icon: '🧑‍✈️', text: 'PI-LOT' },
        { word: 'ASTRONAUTA', icon: '🧑‍🚀', text: 'AS-TRO-NAU-TA' },         { word: 'JUTGE', icon: '🧑‍⚖️', text: 'JUT-GE' },
        { word: 'CARTER', icon: '📭', text: 'CAR-TER' },         { word: 'CUINER', icon: '👨‍🍳', text: 'CUI-NER' }
    ],
    27: [
        { word: 'PIANO', icon: '🎹', text: 'PI-A-NO' },         { word: 'VIOLI', icon: '🎻', text: 'VI-O-LI' },
        { word: 'FLAUTA', icon: '🪈', text: 'FLAU-TA' },         { word: 'TAMBOR', icon: '🥁', text: 'TAM-BOR' },
        { word: 'TROMPETA', icon: '🎺', text: 'TROM-PE-TA' },         { word: 'BANJO', icon: '🪕', text: 'BAN-JO' },
        { word: 'ACORDIO', icon: '🪗', text: 'A-COR-DI-O' },         { word: 'MARACA', icon: '🪇', text: 'MA-RA-CA' },
        { word: 'CAMPANA', icon: '🔔', text: 'CAM-PA-NA' },         { word: 'CORN', icon: '📯', text: 'CORN' }
    ],
    28: [
        { word: 'PUZLE', icon: '🧩', text: 'PUZ-LE' },         { word: 'DAU', icon: '🎲', text: 'DAU' },
        { word: 'CARTES', icon: '🃏', text: 'CAR-TES' },         { word: 'FITXA', icon: '♟️', text: 'FIT-XA' },
        { word: 'NINOT', icon: '🧸', text: 'NI-NOT' },         { word: 'CORDA', icon: '🪢', text: 'COR-DA' },
        { word: 'ESCACS', icon: '♟️', text: 'ES-CACS' },         { word: 'PATINET', icon: '🛹', text: 'PA-TI-NET' },
        { word: 'PATINS', icon: '🛼', text: 'PA-TINS' },         { word: 'IOIO', icon: '🪀', text: 'I-O-I-O' }
    ],
    29: [
        { word: 'MARTELL', icon: '🔨', text: 'MAR-TELL' },         { word: 'TORNAVIS', icon: '🪛', text: 'TOR-NA-VIS' },
        { word: 'SERRA', icon: '🪚', text: 'SER-RA' },         { word: 'ALICATS', icon: '🗜️', text: 'A-LI-CATS' },
        { word: 'ESTRAL', icon: '🪓', text: 'ES-TRAL' },         { word: 'CINTA', icon: '📏', text: 'CIN-TA' },
        { word: 'BROTXA', icon: '🖌️', text: 'BRO-TXA' },         { word: 'PALETA', icon: '🧱', text: 'PA-LE-TA' },
        { word: 'ESCALA', icon: '🪜', text: 'ES-CA-LA' },         { word: 'PIC', icon: '⛏️', text: 'PIC' }
    ],
    30: [
        { word: 'AVI', icon: '👴', text: 'A-VI' },         { word: 'AVIA', icon: '👵', text: 'A-VI-A' },
        { word: 'FILL', icon: '👦', text: 'FILL' },         { word: 'FILLA', icon: '👧', text: 'FIL-LA' },
        { word: 'XIC', icon: '👦', text: 'XIC' },         { word: 'XICA', icon: '👧', text: 'XI-CA' },
        { word: 'HOME', icon: '👨', text: 'HO-ME' },         { word: 'DONA', icon: '👩', text: 'DO-NA' },
        { word: 'AMIC', icon: '🤝', text: 'A-MIC' },         { word: 'BEBE', icon: '👶', text: 'BE-BE' }
    ],
    31: [
        { word: 'ROIG', icon: '🔴', text: 'ROIG' },         { word: 'BLAU', icon: '🔵', text: 'BLAU' },
        { word: 'VERD', icon: '🟢', text: 'VERD' },         { word: 'GROC', icon: '🟡', text: 'GROC' },
        { word: 'NEGRE', icon: '⚫', text: 'NE-GRE' },         { word: 'BLANC', icon: '⚪', text: 'BLANC' },
        { word: 'QUADRAT', icon: '🟩', text: 'QUA-DRAT' },         { word: 'CERCLE', icon: '⭕', text: 'CER-CLE' },
        { word: 'ROMBE', icon: '🟠', text: 'ROM-BE' },         { word: 'TRIANGLE', icon: '🔺', text: 'TRI-AN-GLE' }
    ],
    32: [
        { word: 'PLATAN', icon: '🍌', text: 'PLA-TAN' },         { word: 'CIRERES', icon: '🍒', text: 'CI-RE-RES' },
        { word: 'RAIM', icon: '🍇', text: 'RA-IM' },         { word: 'PRESEC', icon: '🍑', text: 'PRE-SEC' },
        { word: 'SINDIA', icon: '🍉', text: 'SIN-DI-A' },         { word: 'CEBA', icon: '🧅', text: 'CE-BA' },
        { word: 'ALL', icon: '🧄', text: 'ALL' },         { word: 'CARBASSA', icon: '🎃', text: 'CAR-BAS-SA' },
        { word: 'CARROTA', icon: '🥕', text: 'CA-RRO-TA' },         { word: 'PEBROT', icon: '🌶️', text: 'PE-BROT' }
    ],
    33: [
        { word: 'ESTOIG', icon: '👝', text: 'ES-TOIG' },         { word: 'GOMA', icon: '🧽', text: 'GO-MA' },
        { word: 'MAQUINETA', icon: '✏️', text: 'MA-QUI-NE-TA' },         { word: 'CARPETA', icon: '📁', text: 'CAR-PE-TA' },
        { word: 'FOLI', icon: '📄', text: 'FO-LI' },         { word: 'BOLIGRAF', icon: '🖋️', text: 'BO-LI-GRAF' },
        { word: 'ROTULADOR', icon: '🖍️', text: 'RO-TU-LA-DOR' },         { word: 'PEGAMENT', icon: '🧴', text: 'PE-GA-MENT' },
        { word: 'CLIP', icon: '📎', text: 'CLIP' },         { word: 'AGENDA', icon: '📅', text: 'A-GEN-DA' }
    ],
    34: [
        { word: 'DOFI', icon: '🐬', text: 'DO-FI' },         { word: 'TAURO', icon: '🦈', text: 'TAU-RO' },
        { word: 'PINGUI', icon: '🐧', text: 'PIN-GUI' },         { word: 'MORSA', icon: '🐘', text: 'MOR-SA' },
        { word: 'CRANC', icon: '🦀', text: 'CRANC' },         { word: 'POLP', icon: '🐙', text: 'POLP' },
        { word: 'MEDUSA', icon: '🪼', text: 'ME-DU-SA' },         { word: 'CAVALLET', icon: '🐉', text: 'CA-VA-LLET' },
        { word: 'OSTRA', icon: '🦪', text: 'OS-TRA' },         { word: 'GAMBA', icon: '🦐', text: 'GAM-BA' }
    ],
    35: [
        { word: 'ARANYA', icon: '🕷️', text: 'A-RA-NYA' },         { word: 'ESCORPI', icon: '🦂', text: 'ES-COR-PI' },
        { word: 'ABELLA', icon: '🐝', text: 'A-BE-LLA' },         { word: 'MARIETA', icon: '🐞', text: 'MA-RI-E-TA' },
        { word: 'GRILL', icon: '🦗', text: 'GRILL' },         { word: 'MOSQUIT', icon: '🦟', text: 'MOS-QUIT' },
        { word: 'CUC', icon: '🐛', text: 'CUC' },         { word: 'CENTPEUS', icon: '🐛', text: 'CENT-PEUS' },
        { word: 'LLEMAPA', icon: '🐌', text: 'LLE-MA-PA' },         { word: 'GRANOTA', icon: '🐸', text: 'GRA-NO-TA' }
    ],
    36: [
        { word: 'TE', icon: '🍵', text: 'TE' },         { word: 'CAFE', icon: '☕', text: 'CA-FE' },
        { word: 'BATUT', icon: '🥤', text: 'BA-TUT' },         { word: 'REFRESC', icon: '🥤', text: 'RE-FRESC' },
        { word: 'PASTIS', icon: '🍰', text: 'PAS-TIS' },         { word: 'GALETA', icon: '🍪', text: 'GA-LE-TA' },
        { word: 'CARAMEL', icon: '🍬', text: 'CA-RA-MEL' },         { word: 'BOMBO', icon: '🍬', text: 'BOM-BO' },
        { word: 'ROSQUILLA', icon: '🍩', text: 'ROS-QUI-LLA' },         { word: 'FLAM', icon: '🍮', text: 'FLAM' }
    ],
    37: [
        { word: 'CAPELL', icon: '🧢', text: 'CA-PELL' },         { word: 'BARRET', icon: '🎩', text: 'BAR-RET' },
        { word: 'DIADEMA', icon: '🪮', text: 'DI-A-DE-MA' },         { word: 'PINCA', icon: '🧷', text: 'PIN-CA' },
        { word: 'BOTES', icon: '👢', text: 'BO-TES' },         { word: 'TRENCA', icon: '🧥', text: 'TREN-CA' },
        { word: 'MANOPLES', icon: '🧤', text: 'MA-NO-PLES' },         { word: 'MALLES', icon: '👖', text: 'MA-LLES' },
        { word: 'XANCLETES', icon: '🩴', text: 'XAN-CLE-TES' }
    ],
    38: [
        { word: 'CEL', icon: '🌌', text: 'CEL' },         { word: 'MART', icon: '🪐', text: 'MART' },
        { word: 'ASTEROIDE', icon: '🌠', text: 'AS-TE-ROI-DE' },         { word: 'GALAXIA', icon: '🌌', text: 'GA-LAX-I-A' },
        { word: 'TRO', icon: '🌩️', text: 'TRO' },         { word: 'LLAMP', icon: '⚡', text: 'LLAMP' },
        { word: 'VENT', icon: '🌬️', text: 'VENT' },         { word: 'BOIRA', icon: '🌫️', text: 'BOI-RA' },
        { word: 'TEMPESTA', icon: '🌪️', text: 'TEM-PES-TA' },         { word: 'ARC', icon: '🌈', text: 'ARC' }
    ],
    39: [
        { word: 'TELEFON', icon: '📱', text: 'TE-LE-FON' },         { word: 'TAULETA', icon: '📱', text: 'TAU-LE-TA' },
        { word: 'CAMARA', icon: '📷', text: 'CA-MA-RA' },         { word: 'AURICULARS', icon: '🎧', text: 'AU-RI-CU-LARS' },
        { word: 'RADIO', icon: '📻', text: 'RA-DI-O' },         { word: 'TECLAT', icon: '⌨️', text: 'TE-CLAT' },
        { word: 'PANTALLA', icon: '🖥️', text: 'PAN-TA-LLA' },         { word: 'CABLE', icon: '🔌', text: 'CA-BLE' },
        { word: 'BOMBETA', icon: '💡', text: 'BOM-BE-TA' },         { word: 'BATERIA', icon: '🔋', text: 'BA-TE-RI-A' }
    ],
    40: [
        { word: 'FUTBOL', icon: '⚽', text: 'FUT-BOL' },         { word: 'BASQUET', icon: '🏀', text: 'BAS-QUET' },
        { word: 'TENIS', icon: '🎾', text: 'TE-NIS' },         { word: 'NATACIO', icon: '🏊', text: 'NA-TA-CI-O' },
        { word: 'ESCALADA', icon: '🧗', text: 'ES-CA-LA-DA' },         { word: 'ESQUI', icon: '⛷️', text: 'ES-QUI' },
        { word: 'SURF', icon: '🏄', text: 'SURF' },         { word: 'KARATE', icon: '🥋', text: 'KA-RA-TE' },
        { word: 'JUDO', icon: '🥋', text: 'JU-DO' },         { word: 'GOLF', icon: '⛳', text: 'GOLF' }
    ],
    41: [
        { word: 'ILLA', icon: '🏝️', text: 'I-LLA' },         { word: 'VALL', icon: '🏞️', text: 'VALL' },
        { word: 'COVA', icon: '🦇', text: 'CO-VA' },         { word: 'CIM', icon: '🗻', text: 'CIM' },
        { word: 'CASCADA', icon: '🌊', text: 'CAS-CA-DA' },         { word: 'PANTA', icon: '🐊', text: 'PAN-TA' },
        { word: 'BADIA', icon: '🌅', text: 'BA-DI-A' },         { word: 'PENYA', icon: '🧗', text: 'PE-NYA' },
        { word: 'JUNGLA', icon: '🐒', text: 'JUN-GLA' },         { word: 'OASI', icon: '🌴', text: 'O-A-SI' }
    ],
    42: [
        { word: 'CANCO', icon: '🎶', text: 'CAN-CO' },         { word: 'NOTA', icon: '🎵', text: 'NO-TA' },
        { word: 'RITME', icon: '🥁', text: 'RIT-ME' },         { word: 'MICROFON', icon: '🎤', text: 'MI-CRO-FON' },
        { word: 'ALTAVEU', icon: '📢', text: 'AL-TA-VEU' },         { word: 'SILENCI', icon: '🤫', text: 'SI-LEN-CI' },
        { word: 'SOROLL', icon: '🔊', text: 'SOR-OLL' },         { word: 'XISCLE', icon: '🗣️', text: 'XIS-CLE' },
        { word: 'XIULET', icon: '🌬️', text: 'XIU-LET' },         { word: 'TIMBRE', icon: '🔔', text: 'TIM-BRE' }
    ],
    43: [
        { word: 'FUCSIA', icon: '🌺', text: 'FUC-SI-A' },         { word: 'LILA', icon: '🪻', text: 'LI-LA' },
        { word: 'MORAT', icon: '🍇', text: 'MO-RAT' },         { word: 'TARONJA', icon: '🍊', text: 'TA-RON-JA' },
        { word: 'MARRO', icon: '🟤', text: 'MAR-RO' },         { word: 'GRIS', icon: '🐘', text: 'GRIS' },
        { word: 'BEIX', icon: '🐪', text: 'BEIX' },         { word: 'DAURAT', icon: '🏆', text: 'DAU-RAT' },
        { word: 'PLATEJAT', icon: '🥈', text: 'PLA-TE-JAT' },         { word: 'CLAR', icon: '🧊', text: 'CLAR' }
    ],
    44: [
        { word: 'TERMIT', icon: '🪵', text: 'TER-MIT' },         { word: 'PUGO', icon: '🪲', text: 'PU-GO' },
        { word: 'ESCARABAT', icon: '🪲', text: 'ES-CA-RA-BAT' },         { word: 'SALTI', icon: '🦗', text: 'SAL-TI' },
        { word: 'ARNA', icon: '🦋', text: 'AR-NA' },         { word: 'POLILLA', icon: '🦟', text: 'PO-LI-LLA' },
        { word: 'PAPA', icon: '🕷️', text: 'PA-PA' },         { word: 'PIOLL', icon: '🪲', text: 'PI-OLL' },
        { word: 'PUCA', icon: '🐕', text: 'PU-CA' },         { word: 'BASTO', icon: '🌿', text: 'BAS-TO' }
    ],
    45: [
        { word: 'GRUA', icon: '🏗️', text: 'GRU-A' },         { word: 'MAQUINA', icon: '🚜', text: 'MA-QUI-NA' },
        { word: 'REMOLC', icon: '🛻', text: 'RE-MOLC' },         { word: 'TANC', icon: '🪖', text: 'TANC' },
        { word: 'PATRULLA', icon: '🚔', text: 'PA-TRUL-LA' },         { word: 'AMBULANCIA', icon: '🚑', text: 'AM-BU-LAN-CI-A' },
        { word: 'ESCOMBRA', icon: '🧹', text: 'ES-COM-BRA' },         { word: 'XOFER', icon: '🚗', text: 'XO-FER' },
        { word: 'FURGO', icon: '🚚', text: 'FUR-GO' },         { word: 'ASFALT', icon: '🛣️', text: 'AS-FALT' }
    ],
    46: [
        { word: 'ARMARI', icon: '🚪', text: 'AR-MA-RI' },         { word: 'CALAIX', icon: '🗄️', text: 'CA-LAIX' },
        { word: 'MIRALL', icon: '🪞', text: 'MI-RALL' },         { word: 'LLUM', icon: '💡', text: 'LLUM' },
        { word: 'CORTINA', icon: '🪟', text: 'COR-TI-NA' },         { word: 'CATIFA', icon: '🛏️', text: 'CA-TI-FA' },
        { word: 'DESPERTADOR', icon: '⏰', text: 'DES-PER-TA-DOR' },         { word: 'POSTER', icon: '🖼️', text: 'POS-TER' },
        { word: 'JOGUINA', icon: '🧸', text: 'JO-GUI-NA' },         { word: 'PERXA', icon: '🧥', text: 'PER-XA' }
    ],
    47: [
        { word: 'ENCIAM', icon: '🥬', text: 'EN-CI-AM' },         { word: 'PORRO', icon: '🧅', text: 'POR-RO' },
        { word: 'NAP', icon: '🍠', text: 'NAP' },         { word: 'CREILLA', icon: '🥔', text: 'CRE-IL-LA' },
        { word: 'MONIATO', icon: '🍠', text: 'MO-NI-A-TO' },         { word: 'COL', icon: '🥦', text: 'COL' },
        { word: 'BROQUIL', icon: '🥦', text: 'BRO-QUIL' },         { word: 'ESPINACS', icon: '🥬', text: 'ES-PI-NACS' },
        { word: 'PESOLS', icon: '🫛', text: 'PE-SOLS' },         { word: 'FESOLS', icon: '🫘', text: 'FE-SOLS' }
    ],
    48: [
        { word: 'BACO', icon: '🥓', text: 'BA-CO' },         { word: 'ANEC', icon: '🦆', text: 'A-NEC' },
        { word: 'OCA', icon: '🦢', text: 'O-CA' },         { word: 'PAVA', icon: '🦃', text: 'PA-VA' },
        { word: 'PONI', icon: '🐎', text: 'PO-NI' },         { word: 'RUC', icon: '🫏', text: 'RUC' },
        { word: 'CA', icon: '🐕', text: 'CA' },         { word: 'LLORO', icon: '🦜', text: 'LLO-RO' },
        { word: 'COLOM', icon: '🕊️', text: 'CO-LOM' },         { word: 'PAO', icon: '🦚', text: 'PA-O' }
    ],
    49: [
        { word: 'NADAL', icon: '🎄', text: 'NA-DAL' },         { word: 'REIS', icon: '👑', text: 'REIS' },
        { word: 'PASQUA', icon: '🐣', text: 'PAS-QUA' },         { word: 'FALLES', icon: '🔥', text: 'FA-LLES' },
        { word: 'FESTA', icon: '🎆', text: 'FES-TA' },         { word: 'REGAL', icon: '🎁', text: 'RE-GAL' },
        { word: 'TARTA', icon: '🎂', text: 'TAR-TA' },         { word: 'VELA', icon: '🕯️', text: 'VE-LA' },
        { word: 'PINYATA', icon: '🪅', text: 'PI-NYA-TA' },         { word: 'DISFRESSA', icon: '🎭', text: 'DIS-FRES-SA' }
    ],
    50: [
        { word: 'TASSA', icon: '☕', text: 'TAS-SA' },         { word: 'MONEDER', icon: '👛', text: 'MO-NE-DER' },
        { word: 'BITLLET', icon: '🎟️', text: 'BIT-LLET' },         { word: 'MONEDA', icon: '🪙', text: 'MO-NE-DA' },
        { word: 'CANDAT', icon: '🔒', text: 'CAN-DAT' },         { word: 'SAC', icon: '👝', text: 'SAC' },
        { word: 'CUBELL', icon: '🗑️', text: 'CU-BELL' },         { word: 'ESPONJA', icon: '🧽', text: 'ES-PON-JA' },
        { word: 'SABO', icon: '🧼', text: 'SA-BO' },         { word: 'TOVALLOLA', icon: '🛁', text: 'TO-VA-LLO-LA' }
    ],
    51: [
        { word: 'PARDAL', icon: '🐦', text: 'PAR-DAL' },         { word: 'EXTINTOR', icon: '🧯', text: 'EX-TIN-TOR' },
        { word: 'FLAMENC', icon: '🦩', text: 'FLA-MENC' },         { word: 'BRUIXOLA', icon: '🧭', text: 'BRUI-XO-LA' },
        { word: 'ESCUT', icon: '🛡️', text: 'ES-CUT' },         { word: 'MUSSOL', icon: '🦉', text: 'MUS-SOL' },
        { word: 'DARD', icon: '🎯', text: 'DARD' },         { word: 'CORB', icon: '🐦‍⬛', text: 'CORB' },
        { word: 'IMAN', icon: '🧲', text: 'I-MAN' },         { word: 'LLINTERNA', icon: '🔦', text: 'LLIN-TER-NA' }
    ],
    52: [
        { word: 'CALAMAR', icon: '🦑', text: 'CA-LA-MAR' },         { word: 'TROMPO', icon: '🧸', text: 'TROM-PO' },
        { word: 'BITLES', icon: '🎳', text: 'BIT-LES' },         { word: 'SALMO', icon: '🍣', text: 'SAL-MO' },
        { word: 'PEIXERA', icon: '🐠', text: 'PEIX-E-RA' },         { word: 'DOMINO', icon: '🁣', text: 'DO-MI-NO' },
        { word: 'CORALL', icon: '🪸', text: 'CO-RALL' },         { word: 'CARAGOL', icon: '🐚', text: 'CA-RA-GOL' },
        { word: 'ERICO', icon: '🦔', text: 'E-RI-CO' },         { word: 'PIU', icon: '📌', text: 'PIU' }
    ],
    53: [
        { word: 'RENTADORA', icon: '🧺', text: 'REN-TA-DO-RA' },         { word: 'MICROONES', icon: '🍱', text: 'MI-CRO-O-NES' },
        { word: 'TORRADORA', icon: '🍞', text: 'TO-RRA-DO-RA' },         { word: 'SOBRE', icon: '✉️', text: 'SO-BRE' },
        { word: 'ABACO', icon: '🧮', text: 'A-BA-CO' },         { word: 'CINTA', icon: '🎗️', text: 'CIN-TA' },
        { word: 'BROSSA', icon: '🪥', text: 'BROS-SA' },         { word: 'CANGUR', icon: '🦘', text: 'CAN-GUR' },
        { word: 'AIXETA', icon: '🚰', text: 'AI-XE-TA' },         { word: 'DUTXA', icon: '🚿', text: 'DUT-XA' }
    ],
    54: [
        { word: 'BISO', icon: '🦬', text: 'BI-SO' },         { word: 'FALC', icon: '🌾', text: 'FALC' },
        { word: 'GUINEU', icon: '🦊', text: 'GUI-NEU' },         { word: 'MANGUERA', icon: '💦', text: 'MAN-GUE-RA' },
        { word: 'MAPATXE', icon: '🦝', text: 'MA-PAT-XE' },         { word: 'TEIXO', icon: '🦡', text: 'TEI-XO' },
        { word: 'CASTOR', icon: '🦫', text: 'CAS-TOR' },         { word: 'ALPACA', icon: '🦙', text: 'AL-PA-CA' },
        { word: 'FEM', icon: '💩', text: 'FEM' },         { word: 'CAMELL', icon: '🐫', text: 'CA-MELL' }
    ],
    55: [
        { word: 'VINAGRE', icon: '🍶', text: 'VI-NA-GRE' },         { word: 'MANDRIL', icon: '🦧', text: 'MAN-DRIL' },
        { word: 'LLANGAR', icon: '🦎', text: 'LLAN-GAR' },         { word: 'XAROP', icon: '🥞', text: 'XA-ROP' },
        { word: 'SALSA', icon: '🥫', text: 'SAL-SA' },         { word: 'MOSTASSA', icon: '🌭', text: 'MOS-TAS-SA' },
        { word: 'SERP', icon: '🐍', text: 'SERP' },         { word: 'DINOSAUR', icon: '🦕', text: 'DI-NO-SAUR' },
        { word: 'PAELLA', icon: '🥘', text: 'PA-EL-LA' },         { word: 'EMPANADA', icon: '🥟', text: 'EM-PA-NA-DA' }
    ],
    56: [
        { word: 'MARGARIDA', icon: '🌼', text: 'MAR-GA-RI-DA' },         { word: 'GIRASOL', icon: '🌻', text: 'GI-RA-SOL' },
        { word: 'LLIRI', icon: '🪷', text: 'LLI-RI' },         { word: 'ORQUIDIA', icon: '🌸', text: 'OR-QUI-DI-A' },
        { word: 'CACTUS', icon: '🌵', text: 'CAC-TUS' },         { word: 'NOU', icon: '🌰', text: 'NOU' },
        { word: 'PISTAXO', icon: '🥜', text: 'PIS-TA-XO' },         { word: 'TREVOL', icon: '☘️', text: 'TRE-VOL' },
        { word: 'SEGELL', icon: '📮', text: 'SE-GELL' },         { word: 'PITXER', icon: '🏺', text: 'PIT-XER' }
    ],
    57: [
        { word: 'OVNI', icon: '🛸', text: 'OV-NI' },         { word: 'BALLAR', icon: '💃', text: 'BAL-LAR' },
        { word: 'ALIEN', icon: '👽', text: 'A-LI-EN' },         { word: 'ESCRIURE', icon: '✍️', text: 'ES-CRIU-RE' },
        { word: 'ROBOT', icon: '🤖', text: 'RO-BOT' },         { word: 'MONSTRE', icon: '👾', text: 'MONS-TRE' },
        { word: 'SALTAR', icon: '🤸', text: 'SAL-TAR' },         { word: 'FANTASMA', icon: '👻', text: 'FAN-TAS-MA' },
        { word: 'ZOMBI', icon: '🧟', text: 'ZOM-BI' },         { word: 'REINA', icon: '👸', text: 'REI-NA' }
    ],
    58: [
        { word: 'NINJA', icon: '🥷', text: 'NIN-JA' },         { word: 'ESPIA', icon: '🕵️', text: 'ES-PI-A' },
        { word: 'CREUER', icon: '🛳️', text: 'CREU-ER' },         { word: 'ROCA', icon: '🪨', text: 'RO-CA' },
        { word: 'TRINEU', icon: '🛷', text: 'TRI-NEU' },         { word: 'TELEFERIC', icon: '🚠', text: 'TE-LE-FE-RIC' },
        { word: 'ZEPELIN', icon: '🛩️', text: 'ZE-PE-LIN' },         { word: 'RIURE', icon: '😂', text: 'RIU-RE' },
        { word: 'PLORAR', icon: '😭', text: 'PLO-RAR' },         { word: 'SOMRIURE', icon: '🙂', text: 'SOM-RIU-RE' }
    ],
    59: [
        { word: 'ENFADAT', icon: '😡', text: 'EN-FA-DAT' },         { word: 'MOTOR', icon: '⚙️', text: 'MO-TOR' },
        { word: 'FELIC', icon: '🥳', text: 'FE-LIC' },         { word: 'SORPRESA', icon: '😲', text: 'SOR-PRE-SA' },
        { word: 'POR', icon: '😨', text: 'POR' },         { word: 'AMOR', icon: '❤️', text: 'A-MOR' },
        { word: 'PAU', icon: '✌️', text: 'PAU' },         { word: 'ANCORA', icon: '⚓', text: 'AN-CO-RA' },
        { word: 'PLASTI', icon: '🍡', text: 'PLAS-TI' },         { word: 'CANICA', icon: '🔮', text: 'CA-NI-CA' }
    ],
    60: [
        { word: 'MAGENTA', icon: '🩷', text: 'MA-GEN-TA' },         { word: 'CROMO', icon: '🖼️', text: 'CRO-MO' },
        { word: 'DIAMANT', icon: '💎', text: 'DI-A-MANT' },         { word: 'CARTA', icon: '💌', text: 'CAR-TA' },
        { word: 'LLUNA', icon: '🌜', text: 'LLU-NA' },         { word: 'PASTEL', icon: '🧁', text: 'PAS-TEL' },
        { word: 'AGULLA', icon: '🪡', text: 'A-GUL-LA' },         { word: 'OCULARS', icon: '🥽', text: 'O-CU-LARS' },
        { word: 'PAMELA', icon: '👒', text: 'PA-ME-LA' },         { word: 'SIRENA', icon: '🚨', text: 'SI-RE-NA' }
    ],
    61: [
        { word: 'FAROL', icon: '🏮', text: 'FA-ROL' },         { word: 'MUSEU', icon: '🏛️', text: 'MU-SEU' },
        { word: 'CAROTA', icon: '🎭', text: 'CA-RO-TA' },         { word: 'MARCA', icon: '🔖', text: 'MAR-CA' },
        { word: 'MOLI', icon: '🛖', text: 'MO-LI' },         { word: 'RATOLI', icon: '🖱️', text: 'RA-TO-LI' },
        { word: 'POU', icon: '🪣', text: 'POU' },         { word: 'IMPRES', icon: '🖨️', text: 'IM-PRES' },
        { word: 'KIWI', icon: '🥝', text: 'KI-WI' },         { word: 'MANGO', icon: '🥭', text: 'MAN-GO' }
    ],
    62: [
        { word: 'DISC', icon: '💿', text: 'DISC' },         { word: 'CINTA', icon: '📼', text: 'CIN-TA' },
        { word: 'VIDEO', icon: '📹', text: 'VI-DE-O' },         { word: 'COCO', icon: '🥥', text: 'CO-CO' },
        { word: 'LLIBRE', icon: '📖', text: 'LLI-BRE' },         { word: 'UNICORN', icon: '🦄', text: 'U-NI-CORN' },
        { word: 'MAMUT', icon: '🦣', text: 'MA-MUT' },         { word: 'DODO', icon: '🦤', text: 'DO-DO' },
        { word: 'PANDA', icon: '🐼', text: 'PAN-DA' },         { word: 'COALA', icon: '🐨', text: 'CO-A-LA' }
    ],
    63: [
        { word: 'GUANT', icon: '🧤', text: 'GUANT' },         { word: 'CINTURO', icon: '🥋', text: 'CIN-TU-RO' },
        { word: 'MITJO', icon: '🧦', text: 'MIT-JO' },         { word: 'XANCLETA', icon: '🩴', text: 'XAN-CLE-TA' },
        { word: 'MOCADOR', icon: '🤧', text: 'MO-CA-DOR' },         { word: 'ESQUENA', icon: '🔙', text: 'ES-QUE-NA' },
        { word: 'CINTURA', icon: '🧍', text: 'CIN-TU-RA' },         { word: 'GENOLL', icon: '🦵', text: 'GE-NOLL' },
        { word: 'TOBMELL', icon: '🦶', text: 'TOB-MELL' },         { word: 'TALO', icon: '👠', text: 'TA-LO' }
    ],
    64: [
        { word: 'POLZE', icon: '👍', text: 'POL-ZE' },         { word: 'PUNY', icon: '👊', text: 'PUNY' },
        { word: 'BARBA', icon: '🧔', text: 'BAR-BA' },         { word: 'BIGOTI', icon: '🥸', text: 'BI-GO-TI' },
        { word: 'PESTANYA', icon: '👁️', text: 'PES-TAN-YA' },         { word: 'LLENCOL', icon: '🛏️', text: 'LLEN-COL' },
        { word: 'MANTA', icon: '🛌', text: 'MAN-TA' },         { word: 'TORN', icon: '🪛', text: 'TORN' },
        { word: 'XEMENEIA', icon: '🏭', text: 'XE-ME-NEI-A' },         { word: 'COSTA', icon: '🏖️', text: 'COS-TA' }
    ],
    65: [
        { word: 'CAP', icon: '🗻', text: 'CAP' },         { word: 'ESTRET', icon: '🚤', text: 'ES-TRET' },
        { word: 'PENINSULA', icon: '🗺️', text: 'PE-NIN-SU-LA' },         { word: 'CONTINENT', icon: '🌍', text: 'CON-TI-NENT' },
        { word: 'POL', icon: '🧊', text: 'POL' },         { word: 'EQUADOR', icon: '☀️', text: 'E-QUA-DOR' },
        { word: 'TROPIC', icon: '🌴', text: 'TRO-PIC' },         { word: 'HEMISFERI', icon: '🌐', text: 'HE-MIS-FE-RI' },
        { word: 'MENJAR', icon: '🍽️', text: 'MEN-JAR' },         { word: 'BEURE', icon: '🥤', text: 'BEU-RE' }
    ],
    66: [
        { word: 'DORMIR', icon: '😴', text: 'DOR-MIR' },         { word: 'DESPERTAR', icon: '🥱', text: 'DES-PER-TAR' },
        { word: 'LLAVAR', icon: '🧼', text: 'LLA-VAR' },         { word: 'PENTINAR', icon: '梳', text: 'PEN-TI-NAR' },
        { word: 'VESTIR', icon: '👗', text: 'VES-TIR' },         { word: 'DESVESTIR', icon: '👙', text: 'DES-VES-TIR' },
        { word: 'CAMINAR', icon: '🚶', text: 'CA-MI-NAR' },         { word: 'PARAR', icon: '🛑', text: 'PA-RAR' },
        { word: 'ZERO', icon: '0️⃣', text: 'ZE-RO' },         { word: 'UN', icon: '1️⃣', text: 'UN' }
    ],
    67: [
        { word: 'DOS', icon: '2️⃣', text: 'DOS' },         { word: 'TRES', icon: '3️⃣', text: 'TRES' },
        { word: 'QUATRE', icon: '4️⃣', text: 'QUA-TRE' },         { word: 'CINC', icon: '5️⃣', text: 'CINC' },
        { word: 'SIS', icon: '6️⃣', text: 'SIS' },         { word: 'SET', icon: '7️⃣', text: 'SET' },
        { word: 'VUIT', icon: '8️⃣', text: 'VUIT' },         { word: 'NOU', icon: '9️⃣', text: 'NOU' },
        { word: 'OVAL', icon: '🥚', text: 'O-VAL' },         { word: 'CREU', icon: '➕', text: 'CREU' }
    ],
    68: [
        { word: 'FLETXA', icon: '➡️', text: 'FLET-XA' },         { word: 'LINIA', icon: '➖', text: 'LI-NI-A' },
        { word: 'PUNT', icon: '🔴', text: 'PUNT' },         { word: 'CUB', icon: '🧊', text: 'CUB' },
        { word: 'ESFERA', icon: '🔮', text: 'ES-FE-RA' },         { word: 'FUSTA', icon: '🪵', text: 'FUS-TA' },
        { word: 'FERRO', icon: '⛓️', text: 'FER-RO' },         { word: 'OR', icon: '🥇', text: 'OR' },
        { word: 'PLATA', icon: '🥈', text: 'PLA-TA' },         { word: 'COURE', icon: '🥉', text: 'COU-RE' }
    ],
    69: [
        { word: 'PEDRA', icon: '🪨', text: 'PE-DRA' },         { word: 'CRISTALL', icon: '💎', text: 'CRIS-TALL' },
        { word: 'VIDRE', icon: '🪟', text: 'VI-DRE' },         { word: 'PLASTIC', icon: '🥤', text: 'PLAS-TIC' },
        { word: 'DIA', icon: '☀️', text: 'DI-A' },         { word: 'NIT', icon: '🌙', text: 'NIT' },
        { word: 'MATI', icon: '🌅', text: 'MA-TI' },         { word: 'VESPRADA', icon: '🌆', text: 'VES-PRA-DA' },
        { word: 'HORA', icon: '⏳', text: 'HO-RA' },         { word: 'MINUT', icon: '⏱️', text: 'MI-NUT' }
    ],
    70: [
        { word: 'SEGON', icon: '⏲️', text: 'SE-GON' },         { word: 'SETMANA', icon: '📅', text: 'SET-MA-NA' },
        { word: 'MES', icon: '📆', text: 'MES' },         { word: 'ANY', icon: '🗓️', text: 'ANY' },
        { word: 'HIVERN', icon: '❄️', text: 'HI-VERN' },         { word: 'PRIMAVERA', icon: '🌸', text: 'PRI-MA-VE-RA' },
        { word: 'ESTIU', icon: '☀️', text: 'ES-TIU' },         { word: 'TARDOR', icon: '🍂', text: 'TAR-DOR' },
        { word: 'GENER', icon: '⛄', text: 'GE-NER' },         { word: 'ABRIL', icon: '🌧️', text: 'A-BRIL' }
    ],
    71: [
        { word: 'JULIOL', icon: '🏖️', text: 'JU-LI-OL' },         { word: 'AGOST', icon: '🥵', text: 'A-GOST' },
        { word: 'OCTUBRE', icon: '🎃', text: 'OC-TU-BRE' },         { word: 'DESEMBRE', icon: '🎄', text: 'DE-SEM-BRE' },
        { word: 'ARQUITECTE', icon: '📐', text: 'AR-QUI-TEC-TE' },         { word: 'ENGIYER', icon: '⚙️', text: 'EN-GI-NYER' },
        { word: 'CIENTIFIC', icon: '🔬', text: 'CI-EN-TI-FIC' },         { word: 'INFORMATIC', icon: '💻', text: 'IN-FOR-MA-TIC' },
        { word: 'PERIODISTA', icon: '📰', text: 'PE-RI-O-DIS-TA' },         { word: 'FOTOGRAF', icon: '📷', text: 'FO-TO-GRAF' }
    ],
    72: [
        { word: 'ESCRIPTOR', icon: '✍️', text: 'ES-CRIP-TOR' },         { word: 'FARMACEUTIC', icon: '💊', text: 'FAR-MA-CEU-TIC' },
        { word: 'VETERINARI', icon: '🐶', text: 'VE-TE-RI-NA-RI' },         { word: 'DENTISTA', icon: '🦷', text: 'DEN-TIS-TA' },
        { word: 'CICLISME', icon: '🚴', text: 'CI-CLIS-ME' },         { word: 'ATLETISME', icon: '🏃', text: 'AT-LE-TIS-ME' },
        { word: 'GIMNASTICA', icon: '🤸', text: 'GIM-NAS-TI-CA' },         { word: 'BOXE', icon: '🥊', text: 'BO-XE' },
        { word: 'ESGRIMA', icon: '🤺', text: 'ES-GRI-MA' },         { word: 'HOCKEY', icon: '🏑', text: 'HOC-KEY' }
    ],
    73: [
        { word: 'RUGBY', icon: '🏉', text: 'RUG-BY' },         { word: 'VOLEIBOL', icon: '🏐', text: 'VO-LEI-BOL' },
        { word: 'BEISBOL', icon: '⚾', text: 'BEIS-BOL' },         { word: 'PINGPONG', icon: '🏓', text: 'PING-PONG' },
        { word: 'SISTEMA', icon: '🌌', text: 'SIS-TE-MA' },         { word: 'SOLAR', icon: '☀️', text: 'SO-LAR' },
        { word: 'LLEVIA', icon: '☄️', text: 'LLE-VI-A' },         { word: 'METEORIT', icon: '🪨', text: 'ME-TE-O-RIT' },
        { word: 'ORBITA', icon: '🪐', text: 'OR-BI-TA' },         { word: 'SATELIT', icon: '🛰️', text: 'SA-TE-LIT' }
    ],
    74: [
        { word: 'NAU', icon: '🛸', text: 'NAU' },         { word: 'ARENA', icon: '🏖️', text: 'A-RE-NA' },
        { word: 'ONADA', icon: '🌊', text: 'O-NA-DA' },         { word: 'UMBRELA', icon: '⛱️', text: 'UM-BRE-LA' },
        { word: 'CREMA', icon: '🧴', text: 'CRE-MA' },         { word: 'PALA', icon: '⛏️', text: 'PA-LA' },
        { word: 'FULLA', icon: '🍂', text: 'FUL-LA' },         { word: 'BRANCA', icon: '🌿', text: 'BRAN-CA' },
        { word: 'TRONC', icon: '🪵', text: 'TRONC' }
    ],
    75: [
        { word: 'ARREL', icon: '🌱', text: 'AR-REL' },         { word: 'GLA', icon: '🌰', text: 'GLA' },
        { word: 'ONZE', icon: '1️⃣', text: 'ON-ZE' },         { word: 'DOTZE', icon: '1️⃣', text: 'DOT-ZE' },
        { word: 'TRETZE', icon: '1️⃣', text: 'TRET-ZE' },         { word: 'CATORZE', icon: '1️⃣', text: 'CA-TOR-ZE' },
        { word: 'QUINZE', icon: '1️⃣', text: 'QUIN-ZE' },         { word: 'SETZE', icon: '1️⃣', text: 'SET-ZE' },
        { word: 'DUISET', icon: '1️⃣', text: 'DUI-SET' },         { word: 'DIVUIT', icon: '1️⃣', text: 'DI-VUIT' }
    ],
    76: [
        { word: 'DINOU', icon: '1️⃣', text: 'DI-NOU' },         { word: 'VINT', icon: '2️⃣', text: 'VINT' },
        { word: 'VIOLETA', icon: '🍆', text: 'VI-O-LE-TA' },         { word: 'GRAN', icon: '🐘', text: 'GRAN' },
        { word: 'MENUT', icon: '🐁', text: 'ME-NUT' },         { word: 'ALT', icon: '🦒', text: 'ALT' },
        { word: 'BAIX', icon: '🐜', text: 'BAIX' },         { word: 'LLARG', icon: '🐍', text: 'LLARG' },
        { word: 'CURT', icon: '🐛', text: 'CURT' },         { word: 'GROS', icon: '🦛', text: 'GROS' }
    ],
    77: [
        { word: 'PRIM', icon: '🦩', text: 'PRIM' },         { word: 'FORT', icon: '💪', text: 'FORT' },
        { word: 'FEBLE', icon: '🥀', text: 'FE-BLE' },         { word: 'BONIC', icon: '😍', text: 'BO-NIC' },
        { word: 'LLEIG', icon: '👹', text: 'LLEIG' },         { word: 'VELL', icon: '👴', text: 'VELL' },
        { word: 'JOVE', icon: '🧒', text: 'JO-VE' },         { word: 'FRED', icon: '🥶', text: 'FRED' },
        { word: 'CALENT', icon: '🥵', text: 'CA-LENT' },         { word: 'DUR', icon: '🪨', text: 'DUR' }
    ],
    78: [
        { word: 'BIGOT', icon: '🧔', text: 'BI-GOT' },         { word: 'RAPID', icon: '🐆', text: 'RA-PID' },
        { word: 'VISTA', icon: '👁️', text: 'VIS-TA' },         { word: 'OIDA', icon: '👂', text: 'OI-DA' },
        { word: 'OLFACTE', icon: '👃', text: 'OL-FAC-TE' },         { word: 'GUST', icon: '👅', text: 'GUST' },
        { word: 'TACTE', icon: '🖐️', text: 'TAC-TE' },         { word: 'VEURE', icon: '👀', text: 'VEU-RE' },
        { word: 'ESCOLTAR', icon: '🎧', text: 'ES-COL-TAR' },         { word: 'OLORAR', icon: '💐', text: 'O-LO-RAR' }
    ],
    79: [
        { word: 'SABOREJAR', icon: '😋', text: 'SA-BO-RE-JAR' },         { word: 'TOCAR', icon: '👇', text: 'TO-CAR' },
        { word: 'METRE', icon: '📐', text: 'ME-TRE' },         { word: 'BASCULA', icon: '⚖️', text: 'BAS-CU-LA' },
        { word: 'TERMOMETRE', icon: '🌡️', text: 'TER-MO-ME-TRE' },         { word: 'RELO', icon: '⌚', text: 'RE-LO' },
        { word: 'CRONOMETRE', icon: '⏱️', text: 'CRO-NO-ME-TRE' },         { word: 'CALENDARI', icon: '📅', text: 'CA-LEN-DA-RI' },
        { word: 'BRUIXOLA', icon: '🧭', text: 'BRUI-XO-LA' },         { word: 'MAPA', icon: '🗺️', text: 'MA-PA' }
    ],
    80: [
        { word: 'QUADER', icon: '📓', text: 'QUA-DER' },         { word: 'BOLI', icon: '🖋️', text: 'BO-LI' },
        { word: 'RECTANGLE', icon: '🟦', text: 'REC-TAN-GLE' },         { word: 'PENTAGON', icon: '⬠', text: 'PEN-TA-GON' },
        { word: 'HEXAGON', icon: '⬡', text: 'HEX-A-GON' },         { word: 'OCTOGON', icon: '🛑', text: 'OC-TO-GON' },
        { word: 'PEGAS', icon: '🐎', text: 'PE-GAS' },         { word: 'CENTAUR', icon: '🏹', text: 'CEN-TAUR' },
        { word: 'GEGANT', icon: '🧌', text: 'GE-GANT' },         { word: 'ELFO', icon: '🧝', text: 'EL-FO' }
    ],
    81: [
        { word: 'GNOM', icon: '🎅', text: 'GNOM' },         { word: 'MAG', icon: '🧙‍♂️', text: 'MAG' },
        { word: 'ACROBATA', icon: '🤸', text: 'A-CRO-BA-TA' },         { word: 'MALABARISTA', icon: '🤹', text: 'MA-LA-BA-RIS-TA' },
        { word: 'DOMADOR', icon: '🦁', text: 'DO-MA-DOR' },         { word: 'CAPITA', icon: '⚓', text: 'CA-PI-TA' },
        { word: 'PIRATA', icon: '🏴‍☠️', text: 'PI-RA-TA' },         { word: 'MONOPATI', icon: '🛹', text: 'MO-NO-PA-TI' },
        { word: 'SUBMARI', icon: '⛴️', text: 'SUB-MA-RI' },         { word: 'UNIVERS', icon: '🌠', text: 'U-NI-VERS' }
    ],
    82: [
        { word: 'CANGUR', icon: '🦘', text: 'CAN-GUR' },         { word: 'TALP', icon: '🐹', text: 'TALP' },
        { word: 'BISO', icon: '🦬', text: 'BI-SO' },         { word: 'GUINEU', icon: '🦊', text: 'GUI-NEU' },
        { word: 'MAPATXE', icon: '🦝', text: 'MA-PAT-XE' },         { word: 'TEIXO', icon: '🦡', text: 'TEI-XO' },
        { word: 'CASTOR', icon: '🦫', text: 'CAS-TOR' },         { word: 'VAMPIR', icon: '🦇', text: 'VAM-PIR' },
        { word: 'ALPACA', icon: '🦙', text: 'AL-PA-CA' },         { word: 'CAMELL', icon: '🐫', text: 'CA-MELL' }
    ],
    83: [
        { word: 'MANDRIL', icon: '🦧', text: 'MAN-DRIL' },         { word: 'LLEMU', icon: '🐒', text: 'LLE-MU' },
        { word: 'GOS', icon: '🐶', text: 'GOS' },         { word: 'GAT', icon: '🐱', text: 'GAT' },
        { word: 'LLANGAR', icon: '🦎', text: 'LLAN-GAR' },         { word: 'SERP', icon: '🐍', text: 'SERP' },
        { word: 'CROCODIL', icon: '🐊', text: 'CRO-CO-DIL' },         { word: 'TIRANO', icon: '🦖', text: 'TI-RA-NO' },
        { word: 'TRICERA', icon: '🦕', text: 'TRI-CE-RA' },         { word: 'RAPTOR', icon: '🦖', text: 'RAP-TOR' }
    ],
    84: [
        { word: 'OBRIR', icon: '👐', text: 'O-BRIR' },         { word: 'TANCAR', icon: '🔒', text: 'TAN-CAR' },
        { word: 'PUJAR', icon: '🧗', text: 'PU-JAR' },         { word: 'BAIXAR', icon: '⛷️', text: 'BAI-XAR' },
        { word: 'DIR', icon: '🗣️', text: 'DIR' },         { word: 'CALLAR', icon: '🤫', text: 'CA-LLAR' },
        { word: 'ENTRAR', icon: '🚪', text: 'EN-TRAR' },         { word: 'EIXIR', icon: '🏃', text: 'EI-XIR' },
        { word: 'CAURE', icon: '🤕', text: 'CAU-RE' },         { word: 'LLIMON', icon: '🍋', text: 'LLI-MON' }
    ],
    85: [
        { word: 'ORXATA', icon: '🥛', text: 'OR-XA-TA' },         { word: 'COCA', icon: '🥮', text: 'CO-CA' },
        { word: 'FARTON', icon: '🥖', text: 'FAR-TON' },         { word: 'BUNYOL', icon: '🍩', text: 'BU-NYOL' },
        { word: 'PAELLA', icon: '🥘', text: 'PA-EL-LA' },         { word: 'FIDEUA', icon: '🥘', text: 'FI-DEU-A' },
        { word: 'PUTXERO', icon: '🍲', text: 'PUT-XE-RO' },         { word: 'GASPATX', icon: '🥣', text: 'GAS-PATX' },
        { word: 'EMPAN', icon: '🥟', text: 'EM-PAN' },         { word: 'AMETLA', icon: '🌰', text: 'A-MET-LA' }
    ],
    86: [
        { word: 'AVELLAN', icon: '🥜', text: 'A-VEL-LAN' },         { word: 'PISTAXO', icon: '🥜', text: 'PIS-TA-XO' },
        { word: 'CACA', icon: '🥜', text: 'CA-CA' },         { word: 'MANDARI', icon: '🍊', text: 'MAN-DA-RI' },
        { word: 'POMELO', icon: '🍊', text: 'PO-ME-LO' },         { word: 'MORA', icon: '🫐', text: 'MO-RA' },
        { word: 'GERD', icon: '🍓', text: 'GERD' },         { word: 'FASOL', icon: '🫘', text: 'FA-SOL' },
        { word: 'PINZELL', icon: '🖌️', text: 'PIN-ZELL' },         { word: 'TINTA', icon: '✒️', text: 'TIN-TA' }
    ],
    87: [
        { word: 'SEGELL', icon: '📮', text: 'SE-GELL' },         { word: 'SOBRE', icon: '✉️', text: 'SO-BRE' },
        { word: 'POSTAL', icon: '📯', text: 'POS-TAL' },         { word: 'CAIXA', icon: '📦', text: 'CAI-XA' },
        { word: 'PRESTAT', icon: '📚', text: 'PRES-TAT' },         { word: 'ESTORA', icon: '🛏️', text: 'ES-TO-RA' },
        { word: 'CISTELL', icon: '🧺', text: 'CIS-TELL' },         { word: 'PITXER', icon: '🏺', text: 'PIT-XER' },
        { word: 'OVNI', icon: '🛸', text: 'OV-NI' },         { word: 'ALIEN', icon: '👽', text: 'A-LI-EN' }
    ],
    88: [
        { word: 'ROBOT', icon: '🤖', text: 'RO-BOT' },         { word: 'MONSTRE', icon: '👾', text: 'MONS-TRE' },
        { word: 'MUTANT', icon: '🧟', text: 'MU-TANT' },         { word: 'FANTAS', icon: '👻', text: 'FAN-TAS' },
        { word: 'ZOMBI', icon: '🧟', text: 'ZOM-BI' },         { word: 'HEROI', icon: '🦸', text: 'HE-ROI' },
        { word: 'VILA', icon: '🦹', text: 'VI-LA' },         { word: 'NINJA', icon: '🥷', text: 'NIN-JA' },
        { word: 'REI', icon: '🤴', text: 'REI' },         { word: 'REINA', icon: '👸', text: 'REI-NA' }
    ],
    89: [
        { word: 'PRINCEP', icon: '🤴', text: 'PRIN-CEP' },         { word: 'PRINCES', icon: '👸', text: 'PRIN-CES' },
        { word: 'CAVALLER', icon: '🏇', text: 'CA-VAL-LER' },         { word: 'ESPASE', icon: '🤺', text: 'ES-PA-SE' },
        { word: 'ARQUER', icon: '🏹', text: 'AR-QUER' },         { word: 'LLADRE', icon: '🥷', text: 'LLA-DRE' },
        { word: 'ESPIA', icon: '🕵️', text: 'ES-PI-A' },         { word: 'GUARDA', icon: '💂', text: 'GUAR-DA' },
        { word: 'ESTANY', icon: '🏞️', text: 'ES-TANY' },         { word: 'BASSA', icon: '💧', text: 'BAS-SA' }
    ],
    90: [
        { word: 'TOLL', icon: '💧', text: 'TOLL' },         { word: 'SOT', icon: '🕳️', text: 'SOT' },
        { word: 'CINGLER', icon: '🏔️', text: 'CIN-GLER' },         { word: 'ROCA', icon: '🪨', text: 'RO-CA' },
        { word: 'CRATER', icon: '🌋', text: 'CRA-TER' },         { word: 'GEISER', icon: '⛲', text: 'GEI-SER' },
        { word: 'GLACAR', icon: '🧊', text: 'GLA-CAR' },         { word: 'PUDENT', icon: '🦨', text: 'PU-DENT' },
        { word: 'TRINEU', icon: '🛷', text: 'TRI-NEU' },         { word: 'TIROLIN', icon: '🚠', text: 'TI-RO-LIN' }
    ],
    91: [
        { word: 'TANDEM', icon: '🚲', text: 'TAN-DEM' },         { word: 'MOPED', icon: '🛵', text: 'MO-PED' },
        { word: 'COTXET', icon: '🦼', text: 'COT-XET' },         { word: 'RUEDO', icon: '🛞', text: 'RUE-DO' },
        { word: 'MOTOR', icon: '⚙️', text: 'MO-TOR' },         { word: 'VOLANT', icon: '🛞', text: 'VO-LANT' },
        { word: 'FRE', icon: '🛑', text: 'FRE' },         { word: 'ANCORA', icon: '⚓', text: 'AN-CO-RA' },
        { word: 'TURQUES', icon: '🩵', text: 'TUR-QUES' },         { word: 'MAGENTA', icon: '🩷', text: 'MA-GEN-TA' }
    ],
    92: [
        { word: 'GRANA', icon: '❤️', text: 'GRA-NA' },         { word: 'FOSC', icon: '🖤', text: 'FOSC' },
        { word: 'LLUMIN', icon: '✨', text: 'LLU-MIN' },         { word: 'MATE', icon: '🌫️', text: 'MA-TE' },
        { word: 'BRILLANT', icon: '💎', text: 'BRIL-LANT' },         { word: 'NEO', icon: '🟢', text: 'NE-O' },
        { word: 'PASTEL', icon: '🎨', text: 'PAS-TEL' },         { word: 'SOMBRA', icon: '👤', text: 'SOM-BRA' },
        { word: 'BROCA', icon: '🪛', text: 'BRO-CA' },         { word: 'TORNILL', icon: '🔩', text: 'TOR-NILL' }
    ],
    93: [
        { word: 'TUERCA', icon: '🔩', text: 'TU-ER-CA' },         { word: 'FIL', icon: '🧵', text: 'FIL' },
        { word: 'AGULLA', icon: '🪡', text: 'A-GUL-LA' },         { word: 'CINTUR', icon: '🪢', text: 'CIN-TUR' },
        { word: 'COLA', icon: '🧴', text: 'CO-LA' },         { word: 'NIVELL', icon: '📐', text: 'NI-VELL' },
        { word: 'SABATIL', icon: '🩰', text: 'SA-BA-TIL' },         { word: 'ESCLOP', icon: '👞', text: 'ES-CLOP' },
        { word: 'BOTI', icon: '🥾', text: 'BO-TI' },         { word: 'ANORAC', icon: '🧥', text: 'A-NO-RAC' }
    ],
    94: [
        { word: 'BUF', icon: '🧣', text: 'BUF' },         { word: 'OCULARS', icon: '🥽', text: 'O-CU-LARS' },
        { word: 'UJERES', icon: '🕶️', text: 'U-JE-RES' },         { word: 'BROSSA', icon: '🪥', text: 'BROS-SA' },
        { word: 'XOCOL', icon: '🍫', text: 'XO-COL' },         { word: 'BISCUIT', icon: '🍪', text: 'BIS-CUIT' },
        { word: 'TARTAL', icon: '🥧', text: 'TAR-TAL' },         { word: 'NATIL', icon: '🍮', text: 'NA-TIL' },
        { word: 'TORRO', icon: '🍫', text: 'TOR-RO' },         { word: 'GELATIN', icon: '🍮', text: 'GE-LA-TIN' }
    ],
    95: [
        { word: 'POLO', icon: '🍦', text: 'PO-LO' },         { word: 'XURRO', icon: '🥖', text: 'XUR-RO' },
        { word: 'XANDAL', icon: '🎽', text: 'XAN-DAL' },         { word: 'SUDADER', icon: '🧥', text: 'SU-DA-DER' },
        { word: 'XUPA', icon: '🧥', text: 'XU-PA' },         { word: 'ANOR', icon: '🧥', text: 'A-NOR' },
        { word: 'GORR', icon: '🧢', text: 'GORR' },         { word: 'PAMELA', icon: '👒', text: 'PA-ME-LA' },
        { word: 'TIARA', icon: '👑', text: 'TI-A-RA' },         { word: 'ANEL', icon: '💍', text: 'A-NEL' }
    ],
    96: [
        { word: 'PULSERA', icon: '📿', text: 'PUL-SE-RA' },         { word: 'COLLARE', icon: '📿', text: 'COL-LA-RE' },
        { word: 'PIERCING', icon: '💎', text: 'PI-ER-CING' },         { word: 'RELLOT', icon: '⌚', text: 'REL-LOT' },
        { word: 'ALARMA', icon: '⏰', text: 'A-LAR-MA' },         { word: 'CAMPAN', icon: '🔔', text: 'CAM-PAN' },
        { word: 'LLUMEN', icon: '💡', text: 'LLU-MEN' },         { word: 'FAROL', icon: '🏮', text: 'FA-ROL' },
        { word: 'LINTERN', icon: '🔦', text: 'LIN-TERN' },         { word: 'FOGUERA', icon: '🔥', text: 'FO-GUE-RA' }
    ],
    97: [
        { word: 'ESPELMA', icon: '🕯️', text: 'ES-PEL-MA' },         { word: 'RAQUETA', icon: '🏸', text: 'RA-QUE-TA' },
        { word: 'CALIU', icon: '🔥', text: 'CA-LIU' },         { word: 'FLAMA', icon: '🔥', text: 'FLA-MA' },
        { word: 'XISPA', icon: '✨', text: 'XIS-PA' },         { word: 'TROMPO', icon: '🧸', text: 'TROM-PO' },
        { word: 'MISIL', icon: '🚀', text: 'MI-SIL' },         { word: 'CAROTA', icon: '🎭', text: 'CA-RO-TA' },
        { word: 'DARD', icon: '🎯', text: 'DARD' },         { word: 'DIANA', icon: '🎯', text: 'DI-A-NA' }
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
    while (lvl > 100) lvl -= 100; 
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
    
    let maxOptions = (currentLevelNumber >= 30) ? 8 : 4;
    
    let options = [currentWordObj];
    while (options.length < maxOptions && otherWords.length > 0) {
        const rIdx = Math.floor(Math.random() * otherWords.length);
        options.push(otherWords[rIdx]);
        otherWords.splice(rIdx, 1);
    }
    options.sort(() => Math.random() - 0.5);

    if (maxOptions === 8) {
        optionsGridEl.classList.add('grid-8-items');
    } else {
        optionsGridEl.classList.remove('grid-8-items');
    }

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
