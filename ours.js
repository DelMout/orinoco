// JavaScript source code

// n :n° ordre du produit (name)
// c : n° ordre de la couleur du produit
// nTot :nombre de produits pour un article (name)
// cTot : nombre de couleurs pour un produit

//Calcul de nTot


//FONCTION name() : Va chercher le name des produits
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

            //let parentOpt = document.getElementById("choix-couleur");
            //let Opt = parentOpt.children;
            //console.log("Opt = " + Opt);
            //let nbOpt = Opt.length; // Nbre lignes OPTION couleur
            //console.log("Nbre lignes a supprimer = "+nbOpt);
            //if (nbOpt > 0) {    // Si lignes OPTION présentes
            //    for (let a = 0; a < nbOpt; a++) {
            //        parentOpt.removeChild(Opt[a]);  // Supprimer les lignes OPTION
            //    }
            //} else {

                  
           /* for (let a = 0; a < nbColors; a++) {   */     //Ecrit les couleurs dans chaque ligne OPTION
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

            for (let n = 1; n <= nbColors; n++) {
                opt.item(n).innerHTML = colors[n-1];
            }

                //let newOpt = document.createElement("option");  
                //let parentOpt = document.getElementById("choix-couleur");
                ////if (i = 0) {        // Crée une ligne -option- pour demander de selectionner une couleur
                ////    parentOpt.appendChild(newOpt);
                ////    newOpt.innerHTML = "S&eacute;lectionnez une couleur";
                ////} else {
                //let color = colors[a];      // UNE couleur du -tableau- couleurs
                //console.log(color);
                //parentOpt.appendChild(newOpt);      // Création ligne OPTION dans SELECT choix-couleur
                //newOpt.innerHTML = color;    //ecrit la couleur
                //}
            //}
            //}
        })
}





// Actions avec souris-----
let selectionne = document.getElementById('choix-article');

//selectionne.addEventListener('click', function (event) {    //recharge la page qd clic su menu des noms
    
//    console.log("page rechargée");
//});

selectionne.addEventListener('change', function (event) {   // Action apres selection du nom
    console.log("selection faite");
    let votreSelection = document.getElementById("choix-article").selectedIndex;    //numero ordre de l'article
    console.log(votreSelection);

    


    //let parentOpt = document.getElementById("choix-couleur");
    //let Opt = parentOpt.children;
    //console.log("Opt = " + Opt);
    //let nbOpt = Opt.length; // Nbre lignes OPTION couleur
    //console.log("Nbre lignes a supprimer = " + nbOpt);
    //if (nbOpt > 0) {    // Si lignes OPTION présentes
    //    for (let b = 0; b < nbOpt; b++) {
    //        parentOpt.removeChild(Opt[b]);  // Supprimer les lignes OPTION
    //    }
    //}

    color(votreSelection); // Appel la fonction color
});






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