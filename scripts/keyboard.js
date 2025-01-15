// DONE.

import { LOAD, LOAD_HIRA, LOAD_KANJI, LOAD_KATA, LOAD_VERBES } from "./load.js";
import { TO_MAP } from "./load.js";

// CONST : 
const path_hira = "/jap/vocab/hiragana.csv";
const path_kata = "/jap/vocab/katakana.csv";
const path_kanji = "/jap/vocab/kanji.csv";
const path_verbes = "/jap/vocab/verbes.csv";


// VARIABLES :
let keyboard = {
    verbes: new Map(),
    kanji: new Map(),
    hiragana: new Map(),
    katakana: new Map()
};

async function LOAD_KEYBOARD(){
    console.log("loading keyboard...");
    let hira = await LOAD(path_hira);
    keyboard.hiragana = TO_MAP(hira);

    let kata = await LOAD(path_kata);
    keyboard.katakana = TO_MAP(kata);

    let kanji = await LOAD(path_kanji);
    keyboard.kanji = TO_MAP(kanji);

    let verbes = await LOAD(path_verbes);
    keyboard.verbes = TO_MAP(verbes);

    /*
    // HIRA :
    let hira = await LOAD_HIRA();
    console.log("HIRA :\n");
    afficherTableauObjets(hira);
    keyboard.hiragana = TO_MAP(hira);
    // KATA :
    let kata = await LOAD_KATA();
    console.log("KATA :\n");
    afficherTableauObjets(kata);
    keyboard.katakana = TO_MAP(kata);
    // KANJI :
    let kanji = await LOAD_KANJI();
    console.log("KANJI :\n");
    afficherTableauObjets(kanji);
    keyboard.kanji = TO_MAP(kanji);
    // VERBES :
    let verbes = await LOAD_VERBES();
    console.log("VERBES :\n");
    afficherTableauObjets(verbes);
    keyboard.verbes = TO_MAP(verbes);
    console.log("keyboard loaded successfully :\n" + keyboard);
    */
}

// KEYBOARD : 
// @param input : une String à traduire.
// =>return : la String* traduite.
// !disclaimer : String*
//               String* : Homonimes possibles.
function TRADUIT(input){
    console.log("TRADUCTION EN COURS de : " + input);
    // TRADUIT_MOT :
    // @param mot : un mot à traduire.
    // =>return : le mot traduit.
    function TRADUIT_MOT(mot){
        // si le mot est un verbe :
        if(keyboard.verbes.has(mot)){
            console.log("le mot est un verbe ...\n");
            // HOIMONIMES POSSIBLES !!!!!!!
            return keyboard.verbes.get(mot)[1];
        }
        // si le mot est un kanji :
        else if(keyboard.kanji.has(mot)){
            console.log("le mot est un kanji ...\n");
            // HOIMONIMES POSSIBLES !!!!!!!
            return keyboard.kanji.get(mot)[1];
        }
        // si le mot est un hiragana :
        else if(keyboard.hiragana.has(mot)){
            console.log("le mot est un hiragana ...\n");
            return keyboard.hiragana.get(mot)[0];
        }
        // si le mot est un katakana :
        else if(keyboard.katakana.has(mot)){
            console.log("le mot est un katakana ...\n");
            return keyboard.katakana.get(mot)[0];
        }
        console.log("le mot n'est pas connu ...\n");
        // si le mot n'est pas trouvé :
        return mot;
    }
    return input.trim().split(/\s+/)
        .map(mot => TRADUIT_MOT(mot))
        .join(" ");
}

function updateTranslation() {
    const input = document.getElementById('input').value; // Récupère le texte de l'input
    const translatedText = TRADUIT(input); // Traduction du texte
    document.getElementById('translatedText').textContent = translatedText; // Affiche la traduction
}


// TMP :
function afficherMap(map) {
    console.log("Contenu de la Map :");
    for (const [key, values] of map.entries()) {
        console.log(`- Clé : ${key}`);
        console.log("  Valeurs :");
        values.forEach((value, index) => {
            console.log(`    [${index}] ${value}`);
        });
    }
}

function afficherTableauObjets(tableau) {
    if (tableau && tableau.length > 0) {
        tableau.forEach((obj, index) => {
            console.log(`Objet ${index + 1}:`);
            console.log(obj);
        });
    } else {
        console.log("Tableau vide ou invalide");
    }
}

window.onload = async function() {
    console.log("loading window...");
    await LOAD_KEYBOARD(); // Assure que les données sont chargées avant d'ajouter l'écouteur
    // VERBES :
    console.log("verbes :\n");
    afficherMap(keyboard.verbes);
    // KANJI :
    console.log("kanji :\n");
    afficherMap(keyboard.kanji);
    // HIRA :
    console.log("hiragana :\n");
    afficherMap(keyboard.hiragana);
    // KATA :
    console.log("katakana :\n");
    afficherMap(keyboard.katakana);
    // FINAL TEST : 
    let tmp = await LOAD("/jap/vocab/kanji.csv");
    let test = TO_MAP(tmp);
    console.log("TEST FINAL :\n");
    //afficherTableauObjets(tmp);
    afficherMap(test);

    console.log("test hira has a :" + keyboard.hiragana.has("a"));
    
    document.getElementById('input').addEventListener('input', updateTranslation);
    
};