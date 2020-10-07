// JavaScript source code

// n :n° ordre du produit (name)
// c : n° ordre de la couleur du produit
// nTot :nombre de produits pour un article (name)
// cTot : nombre de couleurs pour un produit

//Calcul de nTot


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


//Va chercher le name des produits
const name = (i) => {
    fetch("http://localhost:3000/api/teddies")
        .then((resp) => {
            return resp.json();
        })
        .then((all) => {
            console.log("ca marche");
           /* console.log(all);*/ // donne -tableau- avec toutes les données de l'API = TOUS les éléments de TOUS les produits
            return all;
        })
        .then((tabl) => {
            let obj = tabl[i];
            console.log(obj);  // donne -objet- TOUS les éléments d'UN produit
            return obj;
        })
        .then((elem) => {
            
                let nom = elem.name;
                console.log(nom);    //donne name du produit
                return nom;
        })
        .then((nom) => {
            const contents = document.getElementsByClassName("nom-article");    //va chercher les lignes HTML pour ecrire les choix de noms
            let content = contents[i];
            content.innerHTML = nom;    //ecrit le nom
        })
}





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
