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

// Création contenu MENU DEROULANT -quantite- de 1 à 20
for (let q = 1; q <= 20; q++) {
    let menuQuantite = document.getElementById("choix-quantite");
    let optQuantite = document.createElement("option");
    menuQuantite.appendChild(optQuantite);
    optQuantite.innerHTML = q;
}

// Affiche la liste des noms des teddies
fetch("http://localhost:3000/api/teddies")
    .then((resp) => {
        return resp.json();
    })
    .then((all) => {
        console.log("ca marche");
        let nTot = all.length;
        console.log(nTot); // donne nombre total d'éléments dans le tableau
        return nTot;
    })
    .then((a) => {
        for (let i = 0; i < a; i++) {
        name(i);            // appel la fonction name
        console.log("c sure ca marche");
        }
    })
    .catch((err) => {
        console.log(err)
    })


//FONCTION name() : Va chercher le name des produits - i etant le numero dordre du produit
const name = (i) => {
    fetch("http://localhost:3000/api/teddies")
        .then((resp) => {
            return resp.json();
        })
        .then((all) => {
            //console.log("ca marche");
            /* console.log(all);*/ // donne -tableau- avec toutes les données de l'API = TOUS les éléments de TOUS les produits
            return all;
        })
        .then((tabl) => {
            let obj = tabl[i];
            /*console.log(obj);  */// donne -objet- TOUS les éléments d'UN produit
            return obj;
        })
        .then((elem) => {
            let nom = elem.name;
            /*console.log(nom);*/    //donne name du produit
            return nom;
        })
        .then((nom) => {
            const contents = document.getElementsByClassName("nom-article");    //va chercher les lignes HTML pour ecrire les choix de noms
            let content = contents[i];
            content.innerHTML = nom;    //ecrit le nom
            content.value = nom;        // ecrit le nom dans value
        })
}

// FONCTION color va chercher les couleurs d'un ours - i etant le numero dordre des ours
const color = (i) => {
    fetch("http://localhost:3000/api/teddies")
        .then((resp) => {
            return resp.json();
        })
        .then((all) => {
            //console.log("ca marche");
            /* console.log(all);*/ // donne -tableau- avec toutes les données de l'API = TOUS les éléments de TOUS les produits
            return all;
        })
        .then((tabl) => {
            let obj = tabl[i - 1];
            console.log(obj);  // donne -objet- TOUS les éléments d'UN produit
            return obj;
        })
        .then((elem) => {
            let nom = elem.name;  // Donne nom du produit
            //localStorage.setItem("nom", nom); // Stocke nom
            let id = elem._id;  // Donne id du produit
            //localStorage.setItem("id", id); // Stocke Id
            let colors = elem.colors;   //donne -tableau- avec LES couleurs du produit
            return colors;
        })
        .then((colors) => {
            let nbColors = colors.length;
            console.log(nbColors); //donne NOMBRE de couleurs du produit
            let parentOpt = document.getElementById("choix-couleur");
            let opt = parentOpt.children;
            console.log("Opt = " + opt);
            let nbOpt = opt.length;
            console.log("nbre option AVANT = " + nbOpt);
            //console.log("Item = "+opt.item(1));
            let ecart = nbOpt-1 - nbColors;   // Ecart entre Nbre ligns OPTION existantes et lignes COULEUR a afficher
            console.log("Ecart = " + ecart);
            if (ecart > 0) {    // Supprimer des lignes OPTION
                for (let s = 0; s < ecart; s++) {
                    parentOpt.removeChild(opt.item(1));
                    console.log("ligne OPTION supprimee");
                }
            } else {
                if (ecart < 0) {    // Créer des lignes OPTION
                    for (let c = 0; c < ecart*-1; c++) {
                        let newOpt = document.createElement("option");
                        parentOpt.appendChild(newOpt);
                        console.log("ligne OPTION creee");
                    }
                }
            }

            for (let n = 1; n <= nbColors; n++) {       // Ecrit chacune des couleurs dans les lignes OPTION
                opt.item(n).innerHTML = colors[n - 1];
                opt.item(n).value = colors[n - 1];
            }
        })
}

// FONCTION affiche AFFICHE le prix, la description, la photo du produit sélectionné - x étant le numéro dordre du nom , y quantité souhaité
const affiche = (x,y) => {
    fetch("http://localhost:3000/api/teddies")
        .then((resp) => {
            return resp.json();
        })
        .then((all) => {
            //console.log("ca marche");
            /* console.log(all);*/ // donne -tableau- avec toutes les données de l'API = TOUS les éléments de TOUS les produits
            return all;
        })
        .then((tabl) => {
            let obj = tabl[x-1];
            console.log(obj);  // donne -objet- TOUS les éléments d'UN produit
            return obj;
        })
        .then((elem) => {
            let prix = elem.price;      //Prix du produit
            localStorage.setItem("prix", prix/100); // Prix unitaire mis temporairement dans localStorage
            let photo = elem.imageUrl;      // Photo du produit
            let description = elem.description;     // Description du produit
            let nom = elem.name;        // Nom de l'ourson
            let id = elem._id;      // Id du produit
            console.log("id = " + id);
            localStorage.setItem("id", id); // Id mis temporairement dans localStorage
            let affPrix = document.getElementById("euros");
            affPrix.innerHTML = prix * y / 100 + " \u20ac";     // Affiche le prix du produit selectionne
            localStorage.setItem("prixTotal", prix * y / 100);     // Stocke prix total
            console.log("y :" + y);
            let affDescription = document.getElementById("description");
            affDescription.innerHTML = description;     // Affiche la description du produit selectionne
            let affPhoto = document.getElementById("photo");
            affPhoto.innerHTML = "<img src=" + photo + " width='900' alt='ourson' class='photo' />";     // Affiche la photo du produit selectionne
            let nomH2 = document.getElementById("nom-titre");
            nomH2.innerHTML = nom;  // Ajout du NOM au-dessus photo sur page OURS
        })
        
}

// Actions avec souris-----
const choixCouleur = document.getElementById("choix-couleur");
const choixValide = document.getElementById("valide");
const selectNom = document.getElementById('choix-nom');
selectNom.addEventListener('change', function (event) {   // Action apres selection du NOM
    console.log("selection faite");
    document.getElementById("choix-couleur").selectedIndex = 0; // Forcer le menu COULEUR sur la 1re option
    document.getElementById("choix-quantite").selectedIndex = 0; // Forcer le menu QUANTITE sur la 1re option
    let selectionNom = document.getElementById("choix-nom").selectedIndex;    //numero ordre de l'article
    localStorage.setItem("indexNom", selectionNom);   // stocke numero ordre du nom
    console.log(selectionNom);
    color(selectionNom); // Appel la fonction COLOR
    affiche(selectionNom, 1);   // Appel la fonction AFFICHE
    
    const selectionQuantite = document.getElementById("choix-quantite").selectedIndex + 1;    //numero ordre de la QUANTITE
    localStorage.setItem("quantite", "1");     // Stockage de la quantite par défaut à 1
    
});
let selectColor = document.getElementById('choix-couleur');
selectColor.addEventListener('change', function (event) {   // Action apres selection de la COULEUR
    choixCouleur.classList.remove("border-danger");
    choixValide.innerHTML = "";     // Supprimer message info si il y avait au préalable
});
let selectQuantite = document.getElementById('choix-quantite');
selectQuantite.addEventListener('change', function (event) {   // Action apres selection de la QUANTITE
    const selectionQuantite = document.getElementById("choix-quantite").selectedIndex + 1;    //numero ordre de la QUANTITE
    localStorage.setItem("quantite", selectionQuantite);     // Stockage de la quantite
    affiche(localStorage.getItem("indexNom"), selectionQuantite);   // Appel la fonction AFFICHE
});
let selectPanier = document.getElementById('bouton-panier');
selectPanier.addEventListener('click', function (event) {   // Action apres clic sur BOUTON PANIER
    console.log("Validation PANIER");
    // Si pas de couleur sélectionnée alors message en rouge pour que l'user sélectionne une couleur (ET encadré rouge de la partie couleur)
    if (choixCouleur.value == "sel") {
        choixValide.innerHTML = "Vous n'avez pas s\u00e9lectionn\u00e9 de couleur.<br/>Faites un choix.";
        choixValide.classList.add("text-danger");
        choixCouleur.classList.add("border-danger");
    } else {
        choixValide.innerHTML = "Votre choix a \u00e9t\u00e9 ajout\u00e9 au panier.<br />Pour ajouter d'autres oursons, cliquez sur le bouton.";
        choixValide.classList.replace("text-danger", "text-success");
        choixValide.classList.add("text-success");
        let btnPanier = document.getElementById("bouton-panier");
        btnPanier.classList.add("d-none");          // Cacher le bouton PANIER
        let btnAjout = document.getElementById("bouton-ajout");
        btnAjout.classList.remove("d-none");        // Afficher le bouton AJOUT
        // Sauvegarde des données dans localStorage
        console.log("length : " + localStorage.length);
        if (localStorage.length <7) {   // Seulement le id et qté de renseignés
            localStorage.setItem("nbreLignes", 1);
            
        } else {
            let n = parseInt(localStorage.getItem("nbreLignes")) + 1;
            localStorage.setItem("nbreLignes", n); // Nbre de lignes de commandes mis dans le panier
            console.log("n = " + n);
        };
        let n = localStorage.getItem("nbreLignes");
        let nom = "_" + n + "Nom";
        localStorage.setItem(nom, selectNom.value); // Ajout du NOM dans localStorage
        let id = "_" + n + "Id";
        localStorage.setItem(id, localStorage.getItem("id")); // Ajout de ID dans localStorage
        let qte = "_" + n + "Quantite";
        localStorage.setItem(qte, localStorage.getItem("quantite")); // Ajout de QUANTITE dans localStorage
        let qteTotal = parseInt(localStorage.getItem("qteTotal")) + parseInt(localStorage.getItem("quantite"));      // Calcul cumul des quantités de produits
        localStorage.setItem("qteTotal", qteTotal); // Ajout de QUANTITE TOTALE dans localStorage
        nbProd.innerHTML = localStorage.getItem("qteTotal");    // Affichage en entete de QUANTITE TOTAL de produits
        let prix = "_" + n + "PrixUni";
        localStorage.setItem(prix, localStorage.getItem("prix")); // Ajout de PRIX TOTAL dans localStorage
        let prixTot = "_" + n + "PrixTotal";
        localStorage.setItem(prixTot, localStorage.getItem("prixTotal")); // Ajout de PRIX TOTAL dans localStorage
        let couleur = "_" + n + "Couleur";
        localStorage.setItem(couleur, choixCouleur.value); // Ajout de la COULEUR dans localStorage
    }
    
});
let selectAjout = document.getElementById('bouton-ajout');
selectAjout.addEventListener('click', function (event) {   // Action apres clic sur BOUTON AJOUT
    document.location.reload(true); // Recharge la page
    // Incrément dans localStorage de nbreArticles
});
//const selectReset = document.getElementById('bouton-reset');
//selectReset.addEventListener('click', function (event) {   // Action apres clic sur BOUTON RESET
//    localStorage.clear();
//    localStorage.setItem("qteTotal", 0);    // Mise à 0 de la QUANTITE TOTALE produits
//});


// Quand reload page, afficher -Selectionnez- dans le menu des noms  
if (document.location.reload = true) {
    document.getElementById("choix-nom").selectedIndex = 0;     // Forcer le menu NOM sur la 1re option
    // Si sélection sur la page ACCUEIL, alors indexNom renseigné dans localStorage
    // Positionner le 1er menu déroulant sur cet index
    if (localStorage.getItem("indexNom") > 0) {
        document.getElementById("choix-nom").selectedIndex = localStorage.getItem("indexNom");
        console.log("indexNom>0 : " + localStorage.getItem("indexNom"));
        color(localStorage.getItem("indexNom"));
        affiche(localStorage.getItem("indexNom"), 1);
        localStorage.setItem("quantite", "1");     // Stockage de la quantite par défaut à 1
    }
}
