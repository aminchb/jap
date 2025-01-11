import { VERSION } from "./version.js";

window.onload = async function() {
    console.log("Initializing version...");
    try {
        await VERSION();
        console.log("Version initialized successfully.");
    } catch (error) {
        console.error("Error during version initialization:", error);
    }
};