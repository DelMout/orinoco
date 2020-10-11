// JavaScript source code

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
        })
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
        console.log("y a un probleme");
        console.log(err)
    })

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

            let colors = elem.colors;
            console.log(colors);    //donne -tableau- avec LES couleurs du produit
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
                opt.item(n).innerHTML = colors[n-1];
            }
        })
}

// FONCTION affiche AFFICHE le prix, la description, la photo du produit sélectionné - x étant le numéro dordre du nom et y celui de la couleur
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
            let prix = elem.price;
            let photo = elem.imageURL;
            let description = elem.description;
            console.log("Prix = " + prix);    //donne -tableau- avec LES couleurs du produit
            let affPrix = document.getElementById("euros");
           
            affPrix.innerHTML = prix/100+" \u20ac";     // Affiche le prix du produit selectionne
            
            //return colors;
        })
        
}




// Actions avec souris-----
let selectNom = document.getElementById('choix-article');
selectNom.addEventListener('change', function (event) {   // Action apres selection du nom
    console.log("selection faite");
    document.getElementById("choix-couleur").selectedIndex = 0; // Forcer le menu COULEUR sur la 1re option
    let selectionNom = document.getElementById("choix-article").selectedIndex;    //numero ordre de l'article
    console.log(selectionNom);
    color(selectionNom); // Appel la fonction COLOR
});
let selectColor = document.getElementById('choix-couleur');
selectColor.addEventListener('change', function (event) {   // Action apres selection de la couleur
    console.log("selection couleur faite");
    let selectionColor = document.getElementById("choix-couleur").selectedIndex;    //numero ordre de la couleur
    console.log("Color : " + selectionColor);
    let selectionNom = document.getElementById("choix-article").selectedIndex; 
    console.log("Nom : " + selectionNom);
    affiche(selectionNom, selectionColor);   // Appel la fonction AFFICHE
});

// Quand reload page, afficher -Selectionnez- dans le menu des noms  
if (document.location.reload = true) {
    document.getElementById("choix-article").selectedIndex = 0;     // Forcer le menu NOM sur la 1re option
}



//const reqGet = (n,c) => {

//    fetch("http://localhost:3000/api/teddies", {
    
//    //method: "GET",
//    //data: 'data',
//    //dataType: 'json',
//    //ContentType: 'application/json'

//    })
//        .then((resp) => {
//        return resp.json();
//        })
//        .then((all) => {
//            console.log("ca marche");
//            const nbreProduits=all.length;
//            console.log(all); // donne -tableau- avec toutes les données de l'API = TOUS les éléments de TOUS les produits
//            console.log(nbreProduits);
//            return all;
//        })
//        .then((tabl) => {
//            let obj = tabl[0];
//            console.log(obj);  // donne -objet- TOUS les éléments d'UN produit
//            return obj;
//        })
//        .then((elem) => {
//            let color = elem.colors;
//            console.log(color); // donne UN élement -color en tableau- d'UN produit
//            let id = elem._id;
//            console.log(id);    // donne UN élement -id- d'UN produit
//        })
//        .catch((err) => {
//            console.log("y a un probleme");
//            console.log(err)
//        })
//}
//reqGet();

// Affiche le nom de l'ours slectionne--A REVOIR---


//let ligne = document.getElementById("selection");
//ligne.innerHTML = votreSelection;