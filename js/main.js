/*
 * Fichier : main.js
 * Version : 1.0
 * Auteur  : Enzo Lacroix
 * Date    : 18/11/2026
 * Rôle    : comportements du site (JavaScript de base) :
 *           1. validation du formulaire de contact
 *           2. affichage du bouton « Retour en haut »
 */

/* ========== 1. FORMULAIRE DE CONTACT ========== */

// Vérifie qu'une adresse mail contient bien un @ et un point après le @
function mailValide(mail) {
    var positionArobase = mail.indexOf("@");
    var positionPoint = mail.lastIndexOf(".");
    return positionArobase > 0 && positionPoint > positionArobase + 1 && positionPoint < mail.length - 1;
}

// Vérifie les champs du formulaire et affiche un message d'erreur ou de confirmation
function verifierFormulaire(evenement) {
    // On empêche l'envoi réel de la page : on veut juste afficher un message
    evenement.preventDefault();

    var nom = document.getElementById("nom").value.trim();
    var mail = document.getElementById("mail").value.trim();
    var message = document.getElementById("message").value.trim();
    var zoneMessage = document.getElementById("resultat_formulaire");

    if (nom === "" || mail === "" || message === "") {
        zoneMessage.className = "message_erreur";
        zoneMessage.textContent = "Merci de remplir tous les champs.";
    } else if (!mailValide(mail)) {
        zoneMessage.className = "message_erreur";
        zoneMessage.textContent = "L'adresse mail n'est pas valide.";
    } else {
        zoneMessage.className = "message_succes";
        zoneMessage.textContent = "Merci " + nom + ", votre message a bien été pris en compte.";
        document.getElementById("formulaire_contact").reset();
    }
}

// On lance la vérification quand on clique sur « Envoyer » (seulement si le formulaire existe sur la page)
var formulaire = document.getElementById("formulaire_contact");
if (formulaire) {
    formulaire.addEventListener("submit", verifierFormulaire);
}

/* ========== 2. BOUTON « RETOUR EN HAUT » ========== */

// Affiche le bouton quand on a descendu la page de plus de 300 pixels, le cache sinon
function afficherBoutonHaut() {
    var bouton = document.getElementById("bouton_haut");
    // La classe "visible" est définie dans le CSS : c'est elle qui affiche le bouton
    if (window.scrollY > 300) {
        bouton.classList.add("visible");
    } else {
        bouton.classList.remove("visible");
    }
}

// À chaque défilement de la page, on teste s'il faut montrer le bouton
if (document.getElementById("bouton_haut")) {
    window.addEventListener("scroll", afficherBoutonHaut);
}
