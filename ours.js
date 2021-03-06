// JavaScript source code

// LocalStorage � mettre � 0 si commande pass�e pr�c�demment
const unNom = localStorage.getItem("votreNom");
if (unNom == null) {
    // Pas de commande d'enregistr�e donc NE PAS vider le panier
} else {
    // Commande enregistr�e et envoy�e, donc le localStorage peut �tre mis � 0
    localStorage.clear();
    localStorage.setItem("qteTotal", 0);
    document.location.reload = true;
}


// Affiche nbre de produits en entete
const nbProd = document.getElementById("nbreProd");
nbProd.innerHTML = localStorage.getItem("qteTotal");

if (localStorage.getItem("qteTotal") > 0) {     // Si Panier non vide
    let selectVoirPanier = document.getElementById('bouton-voirPanier');
    selectVoirPanier.classList.remove("d-none");    // Afficher le BOUTON VOIR PANIER
    document.location.reload = true;
}

// Cr�ation contenu MENU DEROULANT -quantite- de 1 � 20
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
        let nTot = all.length;
        return nTot;
    })
    .then((a) => {
        for (let i = 0; i < a; i++) {
            name(i);            // appel la fonction name
        }
    })
    .catch((err) => {
    })


//FONCTION name() : Va chercher le name des produits - i etant le numero dordre du produit
const name = (i) => {
    fetch("http://localhost:3000/api/teddies")
        .then((resp) => {
            return resp.json();
        })
        .then((all) => {
            return all;
        })
        .then((tabl) => {
            let obj = tabl[i];
            return obj;
        })
        .then((elem) => {
            let nom = elem.name;
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
            return all;
        })
        .then((tabl) => {
            let obj = tabl[i - 1];
            return obj;
        })
        .then((elem) => {
            let nom = elem.name;  // Donne nom du produit
            let id = elem._id;  // Donne id du produit
            let colors = elem.colors;   //donne -tableau- avec LES couleurs du produit
            return colors;
        })
        .then((colors) => {
            let nbColors = colors.length;
            let parentOpt = document.getElementById("choix-couleur");
            let opt = parentOpt.children;
            let nbOpt = opt.length;
            let ecart = nbOpt - 1 - nbColors;   // Ecart entre Nbre ligns OPTION existantes et lignes COULEUR a afficher
            if (ecart > 0) {    // Supprimer des lignes OPTION
                for (let s = 0; s < ecart; s++) {
                    parentOpt.removeChild(opt.item(1));
                }
            } else {
                if (ecart < 0) {    // Cr�er des lignes OPTION
                    for (let c = 0; c < ecart * -1; c++) {
                        let newOpt = document.createElement("option");
                        parentOpt.appendChild(newOpt);
                    }
                }
            }

            for (let n = 1; n <= nbColors; n++) {       // Ecrit chacune des couleurs dans les lignes OPTION
                opt.item(n).innerHTML = colors[n - 1];
                opt.item(n).value = colors[n - 1];
            }
        })
}

// FONCTION affiche AFFICHE le prix, la description, la photo du produit s�lectionn� - x �tant le num�ro dordre du nom , y quantit� souhait�e
const affiche = (x, y) => {
    fetch("http://localhost:3000/api/teddies")
        .then((resp) => {
            return resp.json();
        })
        .then((all) => {
            return all;
        })
        .then((tabl) => {
            let obj = tabl[x - 1];
            return obj;
        })
        .then((elem) => {
            let prix = elem.price;      //Prix du produit
            localStorage.setItem("prix", prix / 100); // Prix unitaire mis temporairement dans localStorage
            let photo = elem.imageUrl;      // Photo du produit
            let description = elem.description;     // Description du produit
            let nom = elem.name;        // Nom de l'ourson
            let id = elem._id;      // Id du produit
            localStorage.setItem("id", id); // Id mis temporairement dans localStorage
            let affPrix = document.getElementById("euros");
            affPrix.innerHTML = prix * y / 100 + " \u20ac";     // Affiche le prix du produit selectionne
            localStorage.setItem("prixTotal", prix * y / 100);     // Stocke prix total
            let affDescription = document.getElementById("description");
            affDescription.innerHTML = description;     // Affiche la description du produit selectionne
            const affPhoto1 = document.getElementById("photo1");
            const affPhoto2 = document.getElementById("photo2");
            if (window.matchMedia("(max-width:400px)").matches) {//Media Queries : Adaptation largeur photo ourson
                let widthPhoto = "250";
                affPhoto1.innerHTML = "<img src=" + photo + " width='" + widthPhoto + "' alt='ourson' class='photo' id='photoOurs' />";     // Affiche la photo du produit selectionne
                affPhoto2.innerHTML = "<img src=" + photo + " width='" + widthPhoto + "' alt='ourson' class='photo' id='photoOurs' />";     // Affiche la photo du produit selectionne

            } else if (window.matchMedia("(max-width:992px)").matches) {
                let widthPhoto = "400";
                affPhoto1.innerHTML = "<img src=" + photo + " width='" + widthPhoto + "' alt='ourson' class='photo' id='photoOurs' />";
                affPhoto2.innerHTML = "<img src=" + photo + " width='" + widthPhoto + "' alt='ourson' class='photo' id='photoOurs' />";

            } else if (window.matchMedia("(max-width:1300px)").matches) {
                let widthPhoto = "500";
                affPhoto1.innerHTML = "<img src=" + photo + " width='" + widthPhoto + "' alt='ourson' class='photo' id='photoOurs' />";
                affPhoto2.innerHTML = "<img src=" + photo + " width='" + widthPhoto + "' alt='ourson' class='photo' id='photoOurs' />";

            } else {
                affPhoto1.innerHTML = "<img src=" + photo + " width='900' alt='ourson' class='photo' id='photoOurs' />"; // Grande largeur �cran
                affPhoto2.innerHTML = "<img src=" + photo + " width='900' alt='ourson' class='photo' id='photoOurs' />"; // Grande largeur �cran
            }
            let nomH2 = document.getElementsByTagName("h2");
            nomH2[0].innerHTML = nom;  // Ajout du NOM au-dessus photo sur page OURS
            nomH2[1].innerHTML = nom;  // Ajout du NOM au-dessus photo sur page OURS

            if (window.matchMedia("(max-width:768px)").matches) {//Media Queries : Afficher photo Ourson en 1er
                const cadrePhoto1 = document.getElementById("cadrePhoto1");
                const cadrePhoto2 = document.getElementById("cadrePhoto2");
                cadrePhoto1.classList.remove("d-none");
                cadrePhoto2.classList.add("d-none");
            }
        })

}

// Actions avec souris-----
const choixCouleur = document.getElementById("choix-couleur");
const choixValide = document.getElementById("valide");
const selectNom = document.getElementById('choix-nom');
selectNom.addEventListener('change', function (event) {   // Action apres selection du NOM
    document.getElementById("choix-couleur").selectedIndex = 0; // Forcer le menu COULEUR sur la 1re option
    document.getElementById("choix-quantite").selectedIndex = 0; // Forcer le menu QUANTITE sur la 1re option
    let selectionNom = document.getElementById("choix-nom").selectedIndex;    //numero ordre de l'article
    localStorage.setItem("indexNom", selectionNom);   // stocke numero ordre du nom
    color(selectionNom); // Appel la fonction COLOR
    affiche(selectionNom, 1);   // Appel la fonction AFFICHE

    const selectionQuantite = document.getElementById("choix-quantite").selectedIndex + 1;    //numero ordre de la QUANTITE
    localStorage.setItem("quantite", "1");     // Stockage de la quantite par d�faut � 1

});
let selectColor = document.getElementById('choix-couleur');
selectColor.addEventListener('change', function (event) {   // Action apres selection de la COULEUR
    choixCouleur.classList.remove("border-danger");
    choixValide.innerHTML = "";     // Supprimer message info si il y avait au pr�alable
});
let selectQuantite = document.getElementById('choix-quantite');
selectQuantite.addEventListener('change', function (event) {   // Action apres selection de la QUANTITE
    const selectionQuantite = document.getElementById("choix-quantite").selectedIndex + 1;    //numero ordre de la QUANTITE
    localStorage.setItem("quantite", selectionQuantite);     // Stockage de la quantite
    affiche(localStorage.getItem("indexNom"), selectionQuantite);   // Appel la fonction AFFICHE
});
let selectPanier = document.getElementById('bouton-panier');
selectPanier.addEventListener('click', function (event) {   // Action apres clic sur BOUTON PANIER
    // Si pas de couleur s�lectionn�e alors message en rouge pour que l'user s�lectionne une couleur (ET encadr� rouge de la partie couleur)
    if (choixCouleur.value == "sel") {
        choixValide.innerHTML = "Vous n'avez pas s\u00e9lectionn\u00e9 de couleur.<br/>Faites un choix.";
        choixValide.classList.add("text-danger");
        choixCouleur.classList.add("border-danger");
    } else {
        choixValide.innerHTML = "Votre choix a \u00e9t\u00e9 ajout\u00e9 au panier.<br />Pour ajouter d'autres oursons, cliquez sur le bouton 'Nouvelle s\u00e9lection'.";
        choixValide.classList.replace("text-danger", "text-success");
        choixValide.classList.add("text-success");
        let btnPanier = document.getElementById("bouton-panier");
        btnPanier.classList.add("d-none");          // Cacher le bouton PANIER
        let btnAjout = document.getElementById("bouton-ajout");
        btnAjout.classList.remove("d-none");        // Afficher le bouton AJOUT
        selectVoirPanier.classList.remove("d-none");    // Afficher le BOUTON VOIR PANIER
        // Sauvegarde des donn�es dans localStorage
        if (localStorage.length < 7) {   // Seulement le id et qt� de renseign�s
            localStorage.setItem("nbreLignes", 1);
        } else {
            let n = parseInt(localStorage.getItem("nbreLignes")) + 1;
            localStorage.setItem("nbreLignes", n); // Nbre de lignes de commandes mis dans le panier
        };
        let n = localStorage.getItem("nbreLignes");
        let nom = "_" + n + "Nom";
        localStorage.setItem(nom, selectNom.value); // Ajout du NOM dans localStorage
        let id = "_" + n + "Id";
        localStorage.setItem(id, localStorage.getItem("id")); // Ajout de ID dans localStorage
        let qte = "_" + n + "Quantite";
        localStorage.setItem(qte, localStorage.getItem("quantite")); // Ajout de QUANTITE dans localStorage
        let qteTotal = parseInt(localStorage.getItem("qteTotal")) + parseInt(localStorage.getItem("quantite"));      // Calcul cumul des quantit�s de produits
        localStorage.setItem("qteTotal", qteTotal); // Ajout de QUANTITE TOTALE dans localStorage
        nbProd.innerHTML = localStorage.getItem("qteTotal");    // Affichage en entete de QUANTITE TOTAL de produits
        let prix = "_" + n + "PrixUni";
        localStorage.setItem(prix, localStorage.getItem("prix")); // Ajout de PRIX unitaire dans localStorage
        let prixTot = "_" + n + "PrixTotal";
        localStorage.setItem(prixTot, localStorage.getItem("prixTotal")); // Ajout de PRIX TOTAL dans localStorage
        let couleur = "_" + n + "Couleur";
        localStorage.setItem(couleur, choixCouleur.value); // Ajout de la COULEUR dans localStorage
    }

});
let selectAjout = document.getElementById('bouton-ajout');
selectAjout.addEventListener('click', function (event) {   // Action apres clic sur BOUTON AJOUT
    document.location.reload(true); // Recharge la page
});
let selectVoirPanier = document.getElementById('bouton-voirPanier');
selectVoirPanier.addEventListener('click', function (event) {   // Action apres clic sur BOUTON VOIR PANIER
    selectVoirPanier.classList.remove("d-none");
    document.location.href = "panier.html"; // Ouverture page Panier
});



if (document.location.reload = true) {
    // Si s�lection sur la page ACCUEIL, alors indexNom renseign� dans localStorage
    // Positionner le 1er menu d�roulant sur cet index
    if (localStorage.getItem("indexNom") > 0) {
        document.getElementById("choix-nom").selectedIndex = localStorage.getItem("indexNom");
        color(localStorage.getItem("indexNom"));
        affiche(localStorage.getItem("indexNom"), 1);
        localStorage.setItem("quantite", "1");     // Stockage de la quantite par d�faut � 1
    }
}

