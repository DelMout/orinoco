// JavaScript source code

// LocalStorage à mettre à 0 si commande passée précédemment
const unNom = localStorage.getItem("votreNom");
console.log("nom ? : " + unNom);
if (unNom == null) {
    // Pas de commande d'enregistrée donc NE PAS vider le panier
} else {
    // Commande enregistrée et envoyée, donc le localStorage peut être mis à 0
    localStorage.clear();
    localStorage.setItem("qteTotal", 0);
    document.location.reload = true
}

// Affiche nbre de produits en entete
const nbProd = document.getElementById("nbreProd");
nbProd.innerHTML = localStorage.getItem("qteTotal");
