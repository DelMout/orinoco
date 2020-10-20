// JavaScript source code

// Affiche nbre de produits en entete
const nbProd = document.getElementById("nbreProd");
nbProd.innerHTML = localStorage.getItem("qteTotal");



const cle = ['Nom', 'Couleur', 'Id', 'Quantite', 'PrixUni', 'PrixTotal'];     // Tableaux des clés du localStorage

if (localStorage.length < 7) {
    //Votre panier est vide
    let info = document.getElementById("info");
    info.innerHTML = "Votre panier est vide";
} else {
    // Ajout de lignes au tableau de synthèse
    let parent = document.getElementById("tableau");
    let nbLignes = localStorage.getItem("nbreLignes");
    let total = 0;  // Total des prix totaux
    let qteTotal = 0; // Total des quantités
    for (let n = 1; n <= nbLignes; n++) {
        const newTr = document.createElement("tr");
        parent.appendChild(newTr);
        const nCle5 = "_" + n + cle[5]; // Clé pour le prix total
        total = parseInt(localStorage.getItem(nCle5)) + total;
        //const nCle3 = "_" + n + cle[3]; // Clé pour la quantité
        //qteTotal = parseInt(localStorage.getItem(nCle3)) + qteTotal;
        //localStorage.setItem("qteTotal", qteTotal); // Quantité total des produits stockée dans localStorage
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

//for (let n = 1; n <= nbColors; n++) {       // Ecrit chacune des couleurs dans les lignes OPTION
//    ligne.item(n).innerHTML = colors[n - 1];
//    ligne.item(n).value = colors[n - 1];
//}


// Quand clic sur bouton commande, Mettre à 0 le localStorage ??
class Contact {     // Données pour ensuite créer lobjet "contact"
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
        // Création Tableau PRODUCTS avec les ID des produits
        const nbLignes = localStorage.getItem("nbreLignes");
        const products = [];
        for (let n = 1; n <= nbLignes; n++) {
            let _nId = "_" + n + "Id";
            products.push(localStorage.getItem(_nId));
        }
        console.log("products :" + products);
        // Création objet CONTACT
        const contact = new Contact(prenom.value, nom.value, adresse.value, ville.value, email.value);
        let corps = { contact, products };
        // Stockage données pour la page COMMANDE
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
                
                // Envoie un résumé de la commande par mail
            })
    }
});

    // Si pas de couleur sélectionnée alors message en rouge pour que l'user sélectionne une couleur (ET encadré rouge de la partie couleur)
    //if (choixCouleur.value == "sel") {
    //    choixValide.innerHTML = "Vous n'avez pas s\u00e9lectionn\u00e9 de couleur.<br/>Faites un choix.";
    //    choixValide.classList.add("text-danger");