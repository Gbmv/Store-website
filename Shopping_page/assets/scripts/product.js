
/*
localStorage.clear()
localStorage.setItem("panier", "[[2, 4], [1, 3]]");
*/





// initialize panier
var panier = localStorage.getItem("panier");
if (panier == null) {
  localStorage.setItem("panier", "[]") //si panier existe pas, creer
  panier = "[]";
} else {
  panier = JSON.parse(panier);
}///////



///////////////// loadJson function ////////////////
var jsonObject;

function loadJSON() {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      try {
        jsonObject = JSON.parse(this.responseText);

        checkPage();   //call function

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




function panierCount() {
  /// count du panier dans l'entete ///////
  var panier = JSON.parse(localStorage.getItem("panier"));
  // if local storage is empty:
  var p = localStorage.getItem("panier");
  if (p === null || p === "[]") {
    c = document.getElementsByClassName("shopping-cart")[0];
    c.innerHTML = `  <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x fa-inverse"></i>
                <i class="fa fa-shopping-cart fa-stack-1x"></i>
              </span>`
  } else {
    // if local storage not empty:
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
  }
  //////////////////////////////////
}





function checkPage() {
  panierCount();

  //check si id du produit ok/////
  //var params = window.location.search.substring(1).split('&'); // (alternatives)

  $.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null || (jsonObject.length > results) || results[1] == "") {
      console.log("no result")
      return null;
    }
    else {
      return results[1];
    }
  }
  let id = $.urlParam('id'); //id = id du produit dans parametres de url 
  if (id != null) {
    //(?id=id)///////////////
    fillPage(id);
  }
  else {
    let body = document.getElementsByTagName("main")[0];
    body.innerHTML = "<h2>Page non trouvée!</h2>";

  }
}

//fonction principale
function fillPage(id) {
  var product = jsonObject[id - 1];
  var body = document.getElementsByTagName("main")[0];
  let text = `<article>
      <h1> ${product.name} </h1>
      <div class="row">
        <div class="col">
          <img id="product-image" alt=${product.name} src="./assets/img/${product.image}">
        </div>
        <div class="col">
          <section>
            <h2>Description</h2>
            <p>${product.description}</p>
          </section>
          <section>
            <h2>Caractéristiques</h2>
            <ul>`

  for (var i = 0; i < product.features.length; i++) { //add each feature
    text += `<li>${product.features[i]}</li>`
  }
  text += `</ul>
          </section>
          <hr>
          <div id="pop_up" style="display: none;">Le produit a été ajouté au panier.</div>

          <form class="pull-right" id="addToCartForm">
            <label for="product-quantity">Quantité:</label>
            <input class="form-control" id="product-quantity" type="number" value="1" min="1">
            <button class="btn" title="Ajouter au panier" type="button" onclick="ajoutPanier(${id})">
              <i class="fa fa-cart-plus"></i>&nbsp; Ajouter
            </button>
          </form>
          <p>Prix: <strong>${product.price}&thinsp;$</strong></p>
        </div>
      </div>
    </article>`

  body.innerHTML = text;

}
function ajoutPanier(id) {
  // Get the value of the input field 
  var quantity = document.getElementById("product-quantity").value;

  ////////// pop-up confirmation //////////////
  var dialog = document.getElementById("pop_up");
  dialog.style.display = "block";

  // hide apres 5 sec
  setTimeout(function() {
    dialog.style.display = "none";
  }, 5000);
  /////////////////////////////////////////////

  id = parseInt(id);
  quantity = parseInt(quantity);
  let indicator = false;
  for (var i = 0; i < panier.length; i++) {
    var firstElement = panier[i][0];
    if (firstElement == id) {
      indicator = i; // found!
    }
  }

  if (indicator == false) {
    panier.push(id, quantity)
  } else {
    panier[indicator][1] += quantity;
  }
  localStorage.setItem("panier", JSON.stringify(panier));


  panierCount()
}


$(document).ready(function() {
  // Load the JSON file in the page
  loadJSON();
});


