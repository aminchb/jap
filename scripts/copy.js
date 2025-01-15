function copyText() {
    const translatedText = document.getElementById("translatedText");

    // Vérifie si le contenu est non vide
    if (translatedText.textContent.trim() !== "") {
        // Copie le contenu de translatedText dans le presse-papier
        navigator.clipboard.writeText(translatedText.textContent)
            .then(() => {
                alert("Texte copié dans le presse-papier !");
            })
            .catch(err => {
                console.error("Erreur lors de la copie : ", err);
                alert("Impossible de copier le texte.");
            });
    } else {
        alert("Aucun texte à copier !");
    }
}