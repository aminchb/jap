import { TO_MAP } from "./load.js";

const data = [
    { romaji: "ai", kana: "あい" },
    { romaji: "ai", kana: "あい", kanji: "愛" },
    { romaji: "ai", kana: "あい", kanji: "哀" },
    { romaji: "kaze", kana: "かぜ", kanji: "風" }
];

window.onload = async function() {
    console.log("TO MAP TEST :\n");
    try {
        let test = TO_MAP(data);
        console.log("test is equal to :\n" + test);
    } catch (error) {
        console.error("test failed:\n", error);
    }
};