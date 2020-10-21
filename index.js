// JavaScript source code

// LocalStorage � mettre � 0 si commande pass�e pr�c�demment
const unNom = localStorage.getItem("votreNom");
console.log("nom ? : " + unNom);
if (unNom == null) {
    // Pas de commande d'enregistr�e donc NE PAS vider le panier
} else {
    // Commande enregistr�e et envoy�e, donc le localStorage peut �tre mis � 0
    localStorage.clear();
    localStorage.setItem("qteTotal", 0);
    document.location.reload = true
}

// Affiche nbre de produits en entete
const nbProd = document.getElementById("nbreProd");
nbProd.innerHTML = localStorage.getItem("qteTotal");
