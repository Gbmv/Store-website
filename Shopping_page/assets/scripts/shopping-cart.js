



localStorage.clear()
localStorage.setItem("panier", "[[2, 4], [1, 3]]");


///////Explication du pattern in Local Storage: ///////
//localStorage:
// {(panier, "[[2, 2],[1,3]]"), (nom, none), (addresse, none), etc.}


let jsonObject;

function loadJSON() {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      try {
        jsonObject = JSON.parse(this.responseText);
        console.log("JSON data loaded successfully:", jsonObject);

        fillTableau();   //call function

      } catch (e) {
        console.warn("There has been an error parsing the JSON file:", e);
      }
    } else {
      console.warn("Error loading JSON:", this.status);
    }
  };
  xhr.open('GET', './data/products.json');
  xhr.send();
}



function fillTableau() {
  ///////////////pour chaque produit dans panier:////////////
  var panier = JSON.parse(localStorage.getItem("panier"));

  // Check if local storage is empty
  var p = localStorage.getItem("panier");
  if (p === null || p === "[]") {
    $("#cartContainer").html("<p>Aucun produit dans le panier.</p>");

    c = document.getElementsByClassName("shopping-cart")[0];
    c.innerHTML = `  <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x fa-inverse"></i>
                <i class="fa fa-shopping-cart fa-stack-1x"></i>
              </span>`
  } else {
    //// count du panier dans l'entete
    c = document.getElementsByClassName("shopping-cart")[0];
    let nbElements = 0;
    for (let i = 0; i < panier.length; i++) {
      nbElements += panier[i][1];
    }
    c.innerHTML = `  <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x fa-inverse"></i>
                <i class="fa fa-shopping-cart fa-stack-1x"></i>
              </span>
              <span class="count">`+ nbElements + `</span>`
    //////////////////////////////////////////////




    // Si storage non vide: creer tableau
    var tableHTML = `<table class="table shopping-cart-table">
        <thead>
          <tr>
            <th></th>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>`;

    ////sort panier selon ordre alphabetique///
    let array = panier.map(([number, second]) => [number, second]);
    let combinedArray = array.map(([number, second]) => {
      let name = jsonObject[number].name;
      return [number, name, second];
    });
    combinedArray.sort((a, b) => a[1].localeCompare(b[1]));
    let newArray = combinedArray.map(subArray => [subArray[0], subArray[2]]);
    /*documentation: https://stackoverflow.com/questions/2140627/how-to-do-case-insensitive-string-comparison
    *////////////////////////////


    var prixTotal = 0
    panier = newArray
    for (let i = 0; i < panier.length; i++) {
      var id = panier[i][0].toString()
      var count = panier[i][1];
      var product = jsonObject[id];
      var price = product.price;
      var name = product.name;
      var sum = (parseInt(count) * parseInt(price));
      prixTotal += sum //somme des prix totals pour ce produit


      tableHTML += `<tr>
<td><button title="Supprimer"><i class="fa fa-times" id="`+ id + `" ></i></button></td>
<td><a href="./product.html?id=` + id + `">` + name + `</a></td>
<td>`+ price + `&thinsp;$</td>`;
      tableHTML += `<td>
<div class="row">
  <div class="col">
    <button title="Retirer"`
      if (count == 1) {
        tableHTML += `disabled=""`  //si reste que 1 element; - desactive
      }
      tableHTML += `><i class="fa fa-minus" id="` + id + `"></i></button>
  </div>
  <div class="col">` + count + `</div>
  <div class="col">
    <button title="Ajouter"><i class="fa fa-plus" id="`+ id + `"></i></button>
  </div>
</div>
</td>
<td>`+ sum + `&thinsp;$</td>
</tr>`
    };

    // en bas du produit//////////////////////

    tableHTML += "</tbody> </table>";

    tableHTML += `<p class="shopping-cart-total">Total: <strong>` + prixTotal + `&thinsp;$</strong></p>
  <a class="btn pull-right" href="./order.html">Commander <i class="fa fa-angle-double-right"></i></a>
  <button id="btnVider" class="btn"><i class="fa fa-trash-o"></i>&nbsp; Vider le panier</button>`

    var x = document.getElementById("cartContainer");
    x.innerHTML = tableHTML;   //afficher panier

    //bouton vider panier////////////////////////////
    var btnVider = document.getElementById("btnVider");
    btnVider.addEventListener("click", function() {
      if (confirm("Voulez-vous supprimer tous les produits du panier ?")) {
        viderPanier();
      }
    });
    function viderPanier() {
      localStorage.setItem("panier", "[]");
      fillTableau();  //reload tableau avec localStorage actuel
    }


    //bouton delete///////////////////////////////
    var deleteButton = document.getElementsByClassName("fa fa-times");
    for (let i = 0; i < deleteButton.length; i++) {
      let button = deleteButton[i]
      let id = button.id;
      button.addEventListener("click", function() {
        var result = confirm("Voulez-vous supprimer ce produit du panier?");
        if (result) {
          deleteElem(id)
        };

      })
    }
    function deleteElem(id) {
      for (let i = 0; i < panier.length; i++) {
        if (panier[i][0] == id) {
          panier.splice(i, 1);
          break;
        }
      };
      localStorage.setItem("panier", JSON.stringify(panier));
      fillTableau();  //reload tableau avec localStorage actuel
    }

    ///////////////// Plus ///////////////
    var plusButton = document.getElementsByClassName("fa fa-plus");
    for (let i = 0; i < plusButton.length; i++) {
      let button = plusButton[i]
      let id = button.id;
      button.addEventListener("click", function() {
        plusElem(id)
      })
    }
    function plusElem(id) {
      for (let i = 0; i < panier.length; i++) {
        if (panier[i][0] == id) {
          panier[i][1] += 1;
          break;
        }
      };
      localStorage.setItem("panier", JSON.stringify(panier));
      fillTableau();  //reload tableau avec localStorage actuel
    }
    //////////////////// Moins //////////////
    var minusButton = document.getElementsByClassName("fa fa-minus");
    for (let i = 0; i < minusButton.length; i++) {
      let button = minusButton[i]
      let id = button.id;
      button.addEventListener("click", function() {
        minusElem(id)
      })


    }
    function minusElem(id) {
      for (let i = 0; i < panier.length; i++) {
        if (panier[i][0] == id) {
          if (panier[i][1] != 1) {
            panier[i][1] -= 1;
            break;
          }
        }
      };
      localStorage.setItem("panier", JSON.stringify(panier));
      fillTableau();  //reload tableau avec localStorage actuel
    }


  }  //fin de else (si on a des elements dans storage)

}; //fin fonction





$(document).ready(function() {
  // Load the JSON file in the page
  loadJSON();
});
