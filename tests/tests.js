// IMPORTS :
import { VERSION } from "../scripts/version.js";
import { TO_MAP } from "../scripts/load.js";
import { LOAD } from "../scripts/load.js";


// TESTS : 
function test_TO_MAP() {
    const data = [
        { romaji: "ai", kana: "あい" },
        { romaji: "ai", kana: "あい", kanji: "愛" },
        { romaji: "ai", kana: "あい", kanji: "哀" },
        { romaji: "kaze", kana: "かぜ", kanji: "風" }
    ];
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
    console.log("TO MAP TEST :\n");
    try {
        let test = TO_MAP(data);
        afficherMap(test);
    } catch (error) {
        console.error("Test failed:\n", error);
    }
}

async function test_LOAD() {
    console.log("LOAD TEST :\n");
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
    try {
        let test = await LOAD("../vocab/kanji.csv");
        console.log("test is equal to :\n");
        afficherTableauObjets(test);
    } catch (error) {
        console.error("test failed :\n", error);
    }
}

// TESTS CALLS :
window.onload = async function() {
    await VERSION();
    test_TO_MAP();
    await test_LOAD();
}

/*
import { TO_MAP } from "scripts/load.js";
import { LOAD } from "scripts/load.js";

// TO MAP :


// LOAD : 
async function test_LOAD() {
    const kanji = "vocab/kanji.csv";
    const hiragana = "vocab/hiragana.csv";
    console.log("LOAD TEST :\n");

    // Fonction pour afficher le contenu d'un tableau d'objets
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

    try {
        // Attendre que les données soient chargées
        let test1 = await LOAD(kanji);
        let test2 = await LOAD(hiragana);

        // Afficher le contenu de test1 et test2
        console.log("Test1 (Kanji) :");
        afficherTableauObjets(test1);

        console.log("Test2 (Hiragana) :");
        afficherTableauObjets(test2);

    } catch (error) {
        console.error("Test failed:\n", error);
    }
}

window.onload = async function() {
    await test_LOAD();
}

*/