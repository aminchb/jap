// DONE.

import { LOAD, LOAD_HIRA, LOAD_KANJI, LOAD_KATA, LOAD_VERBES } from "./load.js";
import { TO_MAP } from "./load.js";


// VARIABLES :
let keyboard = {
    verbes: new Map(),
    kanji: new Map(),
    hiragana: new Map(),
    katakana: new Map()
};

async function LOAD_KEYBOARD(){
    console.log("loading keyboard...");
    // HIRA :
    let hira = await LOAD_HIRA();
    keyboard.hiragana = TO_MAP(hira);
    // KATA :
    let kata = await LOAD_KATA();
    keyboard.katakana = TO_MAP(kata);
    // KANJI :
    let kanji = await LOAD_KANJI();
    keyboard.kanji = TO_MAP(kanji);
    // VERBES :
    let verbes = await LOAD_VERBES();
    keyboard.verbes = TO_MAP(verbes);
    console.log("keyboard loaded successfully :\n" + keyboard);
}

// KEYBOARD : 
// @param input : une String à traduire.
// =>return : la String* traduite.
// !disclaimer : String*
//               String* : Homonimes possibles.
function TRADUIT(input){
    return input.trim().split(/\s+/)
        .map(mot => TRADUIT_MOT(mot))
        .join(" ");
}

// TRADUIT_MOT :
// @param mot : un mot à traduire.
// =>return : le mot traduit.
function TRADUIT_MOT(mot){
    // si le mot est un verbe :
    if(keyboard.verbes.has(mot)){
        // HOIMONIMES POSSIBLES !!!!!!!
        return keyboard.verbes.get(mot)[1];
    }
    // si le mot est un kanji :
    if(keyboard.kanji.has(mot)){
        // HOIMONIMES POSSIBLES !!!!!!!
        return keyboard.kanji.get(mot)[1];
    }
    // si le mot est un hiragana :
    if(keyboard.hiragana.has(mot)){
        return keyboard.hiragana.get(mot)[0];
    }
    // si le mot est un katakana :
    if(keyboard.katakana.has(mot)){
        return keyboard.katakana.get(mot)[0];
    }
    // si le mot n'est pas trouvé :
    return mot;
}

function updateTranslation() {
    const input = document.getElementById('input').value; // Récupère le texte de l'input
    const translatedText = TRADUIT(input); // Traduction du texte
    document.getElementById('translatedText').textContent = translatedText; // Affiche la traduction
}

window.onload = async function() {
    console.log("loading window...");
    await LOAD_KEYBOARD(); // Assure que les données sont chargées avant d'ajouter l'écouteur
    document.getElementById('input').addEventListener('input', updateTranslation);
};