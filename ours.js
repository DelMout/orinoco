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
            let obj = tabl[i-1];
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
                        
            for (let i = 0; i < nbColors; i++) {
                let color = colors[i];
                console.log(color);
                const contents = document.getElementsByClassName("couleur");    //va chercher les lignes HTML pour ecrire les choix de couleurs
                let content = contents[i+1];
                content.innerHTML = color;    //ecrit la couleur

            }

            /*const contents = document.getElementsByClassName("couleur"); */   //va chercher les lignes HTML pour ecrire les choix de couleurs
            //let content = contents[i];
            //content.innerHTML = color;    //ecrit la couleur
        })
}





// Actions après user selectionne un nom
let selectionne = document.getElementById('choix-article');
selectionne.addEventListener('change', function (event) {
    console.log("selection faite");
    let votreSelection = document.getElementById("choix-article").selectedIndex;    //numero ordre de l'article
    console.log(votreSelection);
    color(votreSelection); // A MODIFIER en couleur, voir avant ce qu affuiche la console
})






const reqGet = (n,c) => {

    fetch("http://localhost:3000/api/teddies", {
    
    //method: "GET",
    //data: 'data',
    //dataType: 'json',
    //ContentType: 'application/json'

    })
        .then((resp) => {
        return resp.json();
        })
        .then((all) => {
            console.log("ca marche");
            const nbreProduits=all.length;
            console.log(all); // donne -tableau- avec toutes les données de l'API = TOUS les éléments de TOUS les produits
            console.log(nbreProduits);
            return all;
        })
        .then((tabl) => {
            let obj = tabl[0];
            console.log(obj);  // donne -objet- TOUS les éléments d'UN produit
            return obj;
        })
        .then((elem) => {
            let color = elem.colors;
            console.log(color); // donne UN élement -color en tableau- d'UN produit
            let id = elem._id;
            console.log(id);    // donne UN élement -id- d'UN produit
        })
        .catch((err) => {
            console.log("y a un probleme");
            console.log(err)
        })
}

//reqGet();

// Affiche le nom de l'ours slectionne--A REVOIR---


//let ligne = document.getElementById("selection");
//ligne.innerHTML = votreSelection;