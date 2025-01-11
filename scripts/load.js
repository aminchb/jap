// DONE : !

import { object } from "firebase-functions/v1/storage";

// CHARGE DATA pour QUIZ & CLAVIER :
// @param chemin : 1 STRING indiquant le chemin du fichier csv.
// =>return : un TABLEAU d'OBJETS QUELCONQUE*.
// !disclaimer : QUELCONQUE*
//               QUELCONQUE* -> La premiere ligne du CSV défini la structure de l'objet.
export async function LOAD(chemin) {
    try {
        const response = await fetch(chemin);
        if (!response.ok) {
            throw new Error(`Erreur réseau : ${response.status} ${response.statusText}`);
        }
        return PARSE(data);
    } catch (error) {
        throw new Error(`Erreur lors du chargement distant : ${error.message}`);
    }
}

// DONE.

// PARSE 1 FICHIER CSV QUELQUONQUE :
// @param data : de la DATA?.
// =>return : un TABLEAU d'OBJETS QUELCONQUE*.
// !disclaimer : QUELCONQUE*
//               QUELCONQUE* -> La premiere ligne du CSV défini la structure de l'objet.
export function PARSE(data){
    const filteredData = filter(data);
    const lines = filteredData.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const rows = lines.slice(1); // Exclut la première ligne (en-têtes)
    // Convertit les lignes restantes en objets
    const parsedData = rows.map(line => {
        const values = line.split(',').map(value => value.trim());
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
    return parsedData;
}

// filtre les lignes du csv 
function filter(data) {
    return data
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '' && !line.startsWith('#'))
        .join('\n');
}


// CONVERTIT TABLEAU OBJETS EN SET DE STRINGS (ROMAJI) :
// @param objets : un tableau d'objets de structure {romaji, kana} ou {romaji, kanji, furigana?, french?, picto?}.
// =>return : un SET contenant les valeurs uniques de l'attribut "romaji".
// !disclaimer : Objet*
//               Objet* : Chaque objet du tableau doit avoir obligatoirement un champ "romaji".
//               Les objets sans attribut "romaji" seront ignorés.
export function TO_SET(objets) {
    const set = new Set();
    for (const objet of objets) {
        if (objet.romaji) {
            set.add(objet.romaji);
        }
    }
    return set;
}

// CONVERTIT UN TABLEAU D'OBJETS EN UNE MAP (String -> TABLEAU*)
// @param objets : Un tableau d'objets ayant une des structures suivantes :
//                 - {romaji, kana}
//                 - {romaji, kanji, kana, trad, picto}
// @return : Une Map où :
//           - La clé est la propriété `romaji` (de type String).
//           - La valeur est un tableau :
//             - [kana] (si l'objet est de structure {romaji, kana})
//             - [kana, kanji1, kanji2, ...] (si l'objet est de structure étendue).
// !disclaimer : TABLEAU*
//               - TABLEAU* signifie que si une clé `romaji` existe déjà dans la Map,
//                 les nouvelles valeurs doivent être ajoutées au tableau existant, 
//                 et non écraser ce dernier.
export function TO_MAP(objets) {
    const map = new Map();
    objets.forEach(objet => {
        const romaji = objet.romaji; // La clé commune
        // KANJI DEJA PRESENT :
        if ('kanji' in  object && map.has(romaji)) {
            map.set(romaji, [...map.get(romaji), objet.kanji]);
        } 
        // KANJI ABSENT :
        else if('kanji' in  object){
            map.set(romaji, [object.kana, object.kanji]);
        }
        // KANA : 
        else {
            map.set(romaji, [object.kana]);
        }
    });
    return map;
}