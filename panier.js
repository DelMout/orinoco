// JavaScript source code


// LocalStorage � mettre � 0 si commande pass�e pr�c�demment
const unNom = localStorage.getItem("votreNom");
if (unNom == null) {
    // Pas de commande d'enregistr�e donc NE PAS vider le panier
} else {
    // Commande enregistr�e et envoy�e, donc le localStorage peut �tre mis � 0
    localStorage.clear();
    localStorage.setItem("qteTotal", 0);
    window.location.reload();
}

// Affiche nbre de produits en entete
const nbProd = document.getElementById("nbreProd");
nbProd.innerHTML = localStorage.getItem("qteTotal");

// Mise � 0 du panier en totalit�
const selectReset = document.getElementById('bouton-reset');
selectReset.addEventListener('click', function (event) {   // Action apres clic sur BOUTON RESET
    localStorage.clear();
    localStorage.setItem("qteTotal", 0);    // Mise � 0 de la QUANTITE TOTALE produits
    window.location.reload();
});

// Fonction pour supprimer une ligne dans PANIER
const supprLigneCommande = (n, nbLignes) => {    // Fonction pour SUPPRIMER une ligne du panier (sur tableau SM ou LG)
    for (let i = 0; i < 6; i++) {
        let _ncle = "_" + n + cle[i];
        localStorage.removeItem(_ncle); // Suppression des donn�es de cette ligne dans localStorage
    }
    if (n < nbLignes) { // reindexation des lignes suivantes
        for (let e = n; e < nbLignes; e++) {
            for (let c = 0; c <= 5; c++) {
                const infoCle = cle[c];
                const _ncle = "_" + n + infoCle;
                let m = parseInt(n) + 1;
                const _cleSuivante = "_" + m + infoCle;
                const donneeSuivante = localStorage.getItem(_cleSuivante);
                localStorage.setItem(_ncle, donneeSuivante);
            }
        }
    }
    // Suppression de la derni�re ligne du TABLEAU
    const d = localStorage.getItem("nbreLignes");
    const qT = localStorage.getItem("qteTotal");
    const qcle = "_" + d + "Quantite";  // Cl� de la quantit� command�e sur la derni�re ligne
    const _q = localStorage.getItem(qcle);  // Quantit� command�e sur la derni�re ligne
    for (i = 0; i < 6; i++) {
        let _dcle = "_" + d + cle[i];
        localStorage.removeItem(_dcle);
    }
    if (d <= "1") { // Si nbre de lignes initial <= 1 : Soit tableau vide en r�sultat
        localStorage.clear();
        localStorage.setItem("nbreLignes", 0);
        localStorage.setItem("qteTotal", 0);
    } else {
        localStorage.setItem("nbreLignes", d - 1);  // Mise � jour du nbre de lignes
        localStorage.setItem("qteTotal", qT - _q);   // Mise � jour du nombre de produits
    }
    tableauPanier();
    window.location.reload();
}


const cle = ['Nom', 'Couleur', 'Id', 'Quantite', 'PrixUni', 'PrixTotal'];     // Tableaux des cl�s du localStorage
const titre = ['Article', 'Couleur', 'Identifiant', 'Quantit\u00e9', 'Prix unitaire', 'Prix total', 'Supprimer'];     // Tableaux des titres du TABLEAU PANIER


// Construction du tableau RESUME du PANIER
const tableauPanier = () => {
    if (localStorage.length < 8) {
        //Votre panier est vide
        let info = document.getElementById("info");
        info.innerHTML = "Votre panier est vide";
        let suppPanier = document.getElementById("suppPanier");
        suppPanier.classList.add("d-none");    // Masquer les BOUTONS suppression Panier
        let tableau = document.getElementById("tableau");
        tableau.classList.add("d-none");    // Masquer le TABLEAU de synth�se des produits
        let formulaire = document.getElementsByClassName("formulaire");
        formulaire[0].classList.add("d-none"); // Masquer le FORMULAIRE (le titre)
        formulaire[1].classList.add("d-none"); // Masquer le FORMULAIRE (le corps)
        formulaire[2].classList.add("d-none"); // Masquer le FORMULAIRE (le bouton commande)


    } else if (window.matchMedia("(max-width:768px)").matches) {       // MEDIA QUERIES Tablette max
        // Construction du TABLEAU de synth�se
        let parent = document.getElementById("tableau");
        parent.classList.add("table-sm");   // R�duire espacements dans tableau
        let nbLignes = localStorage.getItem("nbreLignes");
        let total = 0;  // Total des prix totaux
        let qteTotal = 0; // Total des quantit�s
        // Ajout du contenu du tableau sur 2 COLONNES
        for (let n = 1; n <= nbLignes; n++) {
            const nCle5 = "_" + n + cle[5]; // Cl� pour le prix total
            total = parseInt(localStorage.getItem(nCle5)) + total;
            const nCle3 = "_" + n + cle[3]; // Cl� pour la quantit�
            qteTotal = parseInt(localStorage.getItem(nCle3)) + qteTotal;
            localStorage.setItem("qteTotal", qteTotal); // Quantit� total des produits stock�e dans localStorage
            for (let c = 0; c <= 5; c++) {
                const newTr = document.createElement("tr");
                parent.appendChild(newTr);
                newTr.setAttribute("style", "display:block");// Pour affichage colspan sur Chrome
                let newTh = document.createElement("th");
                newTr.appendChild(newTh);
                if (n % 2 == 00) {
                    const bg = "table-light";
                    newTr.classList.add(bg);
                } else {
                    const bg = "table-warning";
                    newTr.classList.add(bg);
                }
                newTh.innerHTML = titre[c];
                const newTd = document.createElement("td");
                newTr.appendChild(newTd);
                const _nCle = "_" + n + cle[c];
                if (c >= 4) {   // Pour les prix, ajout de euros
                    newTh.innerHTML = titre[c];
                    newTd.innerHTML = localStorage.getItem(_nCle) + " \u20ac";
                } else {
                    newTh.innerHTML = titre[c];
                    newTd.innerHTML = localStorage.getItem(_nCle);
                }
            }
            // LIGNE pour SUPPRIMER l'article
            const newTr = document.createElement("tr");
            parent.appendChild(newTr);
            const newTh = document.createElement("th");
            newTr.appendChild(newTh);
            newTh.innerHTML = "Supprimer cet article";
            let poubelleSM = "poubelleSM" + n;
            newTh.setAttribute("colspan", "2");
            newTh.setAttribute("id", poubelleSM);
            newTh.setAttribute("style", "display:block");   // Pour affichage colspan sur Chrome
            newTh.classList.add("poubelleSM");
            newTh.setAttribute("type", "button");
            if (n % 2 == 00) {
                const bg = "table-light";
                newTh.classList.add(bg);
            } else {
                const bg = "table-warning";
                newTh.classList.add(bg);
            }
            // Supprimer une ligne avec icone "PoubelleSM"
            const poubelleS = document.getElementById(poubelleSM);
            poubelleS.addEventListener('click', function (event) {   // Action apres clic sur BOUTON poubelleSM
                supprLigneCommande(n, nbLignes);
            });
        }
        // Afficher le prix total
        const newTfoot = document.createElement('tfoot');
        newTfoot.classList.add("font-weight-bold", "bg-dark", "text-light", "text-left");
        parent.appendChild(newTfoot);
        const newTh1 = document.createElement("th");
        newTfoot.appendChild(newTh1);
        newTh1.innerHTML = "TOTAL : " + total + " \u20ac";

    } else {                                                            // MEDIA QUERIES Grand format
        // Construction du TABLEAU de synth�se
        let parent = document.getElementById("tableau");
        let nbLignes = localStorage.getItem("nbreLignes");
        let total = 0;  // Total des prix totaux
        let qteTotal = 0; // Total des quantit�s
        // Ajout LIGNE des TITRES des colonnes
        const newTr = document.createElement("tr");
        parent.appendChild(newTr);
        for (let t = 0; t <= 6; t++) {
            let newTh = document.createElement("th");
            newTr.appendChild(newTh);
            newTh.innerHTML = titre[t];
        }
        // Ajout du contenu du tableau
        let tbody = document.createElement("tbody");        // Pour surlignage ligne lors passage souris
        parent.appendChild(tbody);
        for (let n = 1; n <= nbLignes; n++) {
            const newTr = document.createElement("tr");
            tbody.appendChild(newTr);
            const nCle5 = "_" + n + cle[5]; // Cl� pour le prix total
            total = parseInt(localStorage.getItem(nCle5)) + total;
            const nCle3 = "_" + n + cle[3]; // Cl� pour la quantit�
            qteTotal = parseInt(localStorage.getItem(nCle3)) + qteTotal;
            localStorage.setItem("qteTotal", qteTotal); // Quantit� total des produits stock�e dans localStorage
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
            const newTd = document.createElement("td");     // BOUTON SUPPRESSION ligne panier
            newTr.appendChild(newTd);
            let poubelleLG = "poubelleLG" + n;
            newTd.innerHTML = "<i type='button' id=" + poubelleLG + " class='fas fa-2x fa-trash-alt'></i>"    // Icone poubelle

            // VOIR SI Action sur bouton POUBELLE LG
            // Supprimer une ligne avec icone "PoubelleLG"
            const poubelleL = document.getElementById(poubelleLG);
            poubelleL.addEventListener('click', function (event) {   // Action apres clic sur BOUTON poubelleLG
                supprLigneCommande(n, nbLignes);
            });
        }
        // Afficher le prix total
        const newTfoot = document.createElement('tfoot');
        newTfoot.classList.add("font-weight-bold", "bg-dark", "text-light");
        parent.appendChild(newTfoot);
        const newTd1 = document.createElement("td");
        newTfoot.appendChild(newTd1);
        newTd1.classList.add("text-right");
        newTd1.setAttribute("colspan", "5");
        newTd1.innerHTML = "TOTAL :";
        const newTd2 = document.createElement("td");
        newTfoot.appendChild(newTd2);
        newTd2.innerHTML = total + " \u20ac";
        const newTd3 = document.createElement("td");
        newTfoot.appendChild(newTd3);
    }
}

tableauPanier();

// ACTION sur bouton AJOUT ARTICLE
let ajoutArticle = document.getElementById('ajoutArt');
ajoutArticle.addEventListener('click', function (event) {   // Action apres clic sur BOUTON AJOUT ARTICLE
    document.location.href = "ours.html"; // Ouverture page Produit
    localStorage.setItem("indexNom", "0");  //Pas de s�lection de nom ourson dans le menu d�roulant
});


// FORMULAIRE : code postal, 00000 interdit
const codePost = document.getElementById("code");
code.addEventListener("input", function (event) {
    //const codeValue = codePost.value;
    if (codePost.value == "00") {
        codePost.value = "Incorrect !";  // Renvoie le message "Incorrect !"
    }
});




class Contact {     // Donn�es pour ensuite cr�er lobjet "contact"
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const adresse = document.getElementById("adresse");
const ville = document.getElementById("ville");
const email = document.getElementById("email");


let validCommande = document.getElementById('bouton-commande');
validCommande.addEventListener('click', function (event) {   // Action apres clic sur BOUTON VALIDE COMMANDE
    const formu = document.getElementById("formu");
    const alerte = document.getElementById("alerte");
    if (formu.checkValidity() == false) {
        alerte.innerHTML = "Votre formulaire est incomplet. Merci de corriger ou compl\u00e9ter les parties en rouge.<br/> Vous pourrez ensuite valider la commande."
    } else {
        alerte.classList.add("d-none");
        // Cr�ation Tableau PRODUCTS avec les ID des produits
        const nbLignes = localStorage.getItem("nbreLignes");
        const products = [];
        for (let n = 1; n <= nbLignes; n++) {
            let _nId = "_" + n + "Id";
            products.push(localStorage.getItem(_nId));  // Ajout de donn�es dans le tableau products
        }
        // Cr�ation objet CONTACT
        const contact = new Contact(prenom.value, nom.value, adresse.value, ville.value, email.value);
        let corps = { contact, products };
        // Stockage donn�es pour la page COMMANDE
        localStorage.setItem("votrePrenom", prenom.value);
        localStorage.setItem("votreNom", nom.value);
        localStorage.setItem("eMail", email.value);
        // Appel de l'ID de COMMANDE
        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify(corps),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                let order_Id = json.orderId;
                localStorage.setItem("orderId", order_Id);  // Copie de ORDER_ID dans localStorage
                document.location.href = "commande.html";      // Bascule sur la page COMMANDE
            })
    }
});

