// JavaScript source code


const cle = ['Nom', 'Couleur', 'Id', 'Quantite', 'PrixUni', 'PrixTotal'];     // Tableaux des clés du localStorage

if (localStorage.length < 5) {
    //Votre panier est vide
    let info = document.getElementById("info");
    info.innerHTML = "Votre panier est vide";
} else {
    // Ajout de lignes au tableau de synthèse
    let parent = document.getElementById("tableau");
    let nbLignes = localStorage.getItem("nbreLignes");
    let total = 0;  // Total des prix totaux
    for (let n = 1; n <= nbLignes; n++) {
        const newTr = document.createElement("tr");
        parent.appendChild(newTr);
        const nCle5 = "_" + n + cle[5]; // Clé pour le prix total
        total = parseInt(localStorage.getItem(nCle5)) + total;
        for (let c = 0; c <= 5; c++) {
            const newTd = document.createElement("td");
            newTr.appendChild(newTd);
            const _nCle = "_" + n + cle[c];
            if (c >= 4) {   // Pour les prix, ajout de euros
                newTd.innerHTML = localStorage.getItem(_nCle) + " \u20ac";
            } else {
                newTd.innerHTML = localStorage.getItem(_nCle);
            }
        }
    }
    // Afficher le prix total
    const newTfoot = document.createElement('tfoot');
    newTfoot.classList.add("font-weight-bold","bg-dark","text-light");
    parent.appendChild(newTfoot);
    const newTd1 = document.createElement("td");
    newTfoot.appendChild(newTd1);
    newTd1.classList.add("text-right");
    newTd1.setAttribute("colspan", "5");
    newTd1.innerHTML = "TOTAL :";

    const newTd2 = document.createElement("td");
    newTfoot.appendChild(newTd2);
    newTd2.innerHTML = total + " \u20ac";
   
    
}


for (let n = 1; n <= nbColors; n++) {       // Ecrit chacune des couleurs dans les lignes OPTION
    ligne.item(n).innerHTML = colors[n - 1];
    ligne.item(n).value = colors[n - 1];
}


// Quand clic sur bouton commande, Mettre à 0 le localStorage