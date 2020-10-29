// JavaScript source code

// LocalStorage à mettre à 0 si commande passée précédemment
const unNom = localStorage.getItem("votreNom");
if (unNom == null) {
    // Pas de commande d'enregistrée donc NE PAS vider le panier
} else {
    // Commande enregistrée et envoyée, donc le localStorage peut être mis à 0
    localStorage.clear();
    localStorage.setItem("qteTotal", 0);
    document.location.reload = true
}

// Affiche nbre de produits dans entete
const nbProd = document.getElementById("nbreProd");
nbProd.innerHTML = localStorage.getItem("qteTotal");



// CLIC sur un lien OURS et permet affiche de l'ours sur page OURS
const norbert = document.getElementById("norbert");
norbert.addEventListener('click', function () {
    localStorage.setItem("indexNom", 1);
});

const arnold = document.getElementById("arnold");
arnold.addEventListener('click', function () {
    localStorage.setItem("indexNom", 2);
});

const lenny = document.getElementById("lenny");
lenny.addEventListener('click', function () {
    localStorage.setItem("indexNom", 3);
});

const gustav = document.getElementById("gustav");
gustav.addEventListener('click', function () {
    localStorage.setItem("indexNom", 4);
});

const garfunkel = document.getElementById("garfunkel");
garfunkel.addEventListener('click', function () {
    localStorage.setItem("indexNom", 5);
});


// MEDIA QUERIES pour petit écran : Cartes en colonne
if (window.matchMedia("(max-width:700px)").matches) {
    const parentCards = document.getElementById("parent-cards");
    parentCards.classList.replace("row", "col-10");
    parentCards.classList.replace("mt-5", "my-3");
}