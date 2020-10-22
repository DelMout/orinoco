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


const cle = ['Nom', 'Couleur', 'Id', 'Quantite', 'PrixUni', 'PrixTotal'];     // Tableaux des cl�s du localStorage

// Supprimer derni�re ligne du panier
const selectReduc = document.getElementById('bouton-reduc');
selectReduc.addEventListener('click', function (event) {   // Action apres clic sur BOUTON REDUC
    const d = localStorage.getItem("nbreLignes");
    const qT = localStorage.getItem("qteTotal");
    const qcle = "_" + d + "Quantite";  // Cl� de la quantit� command�e sur la derni�re ligne
    const _q = localStorage.getItem(qcle);  // Quantit� command�e sur la derni�re ligne

    for (i = 0; i < 6; i++) {
        let _dcle = "_" + d + cle[i];
        localStorage.removeItem(_dcle);
    }
    if (d < 1) {
        localStorage.clear();
        localStorage.setItem("nbreLignes", 0);
    } else {
        localStorage.setItem("nbreLignes", d - 1);  // Mise � jour du nbre de lignes
        localStorage.setItem("qteTotal", qT - _q);   // Mise � jour du nombre de produits
    }
    tableauPanier();
    window.location.reload();
});


// Construction du tableau RESUME du PANIER
const tableauPanier = () => {
    if (localStorage.length < 8) {
        //Votre panier est vide
        let info = document.getElementById("info");
        info.innerHTML = "Votre panier est vide";
        let tableau = document.getElementById("tableau");
        tableau.classList.add("d-none");    // Masquer le TABLEAU de synth�se des produits
        let formulaire = document.getElementsByClassName("formulaire");
        formulaire[0].classList.add("d-none"); // Masquer le FORMULAIRE (le titre)
        formulaire[1].classList.add("d-none"); // Masquer le FORMULAIRE (le corps)
        formulaire[2].classList.add("d-none"); // Masquer le FORMULAIRE (le bouton commande)
        
    } else {
        // Ajout de lignes au tableau de synth�se
        let parent = document.getElementById("tableau");
        let nbLignes = localStorage.getItem("nbreLignes");
        let total = 0;  // Total des prix totaux
        let qteTotal = 0; // Total des quantit�s
        for (let n = 1; n <= nbLignes; n++) {
            const newTr = document.createElement("tr");
            parent.appendChild(newTr);
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
    }
}

tableauPanier();

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
        console.log("c pas bien rempli !");
        alerte.innerHTML ="Votre formulaire est incomplet. Merci de corriger ou compl\u00e9ter les parties en rouge.<br/> Vous pourrez ensuite valider la commande."
    } else {
        console.log("c bien rempli !");
        alerte.classList.add("d-none");
        // Cr�ation Tableau PRODUCTS avec les ID des produits
        const nbLignes = localStorage.getItem("nbreLignes");
        const products = [];
        for (let n = 1; n <= nbLignes; n++) {
            let _nId = "_" + n + "Id";
            products.push(localStorage.getItem(_nId));
        }
        console.log("products :" + products);
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
            headers: {'Content-Type':'application/json'}
        })
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                let order_Id = json.orderId;
                console.log("resp = " + order_Id);
                localStorage.setItem("orderId", order_Id);  // Copie de ORDER_ID dans localStorage
                document.location.href = "commande.html";      // Bascule sur la page COMMANDE
            })
    }
});

  