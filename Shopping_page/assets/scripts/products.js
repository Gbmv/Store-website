// Link for the AJAX request
//https://www.youtube.com/watch?v=W6NsAO08vmE

let jsonObject;
var panier = localStorage.getItem("panier");
if (panier == null) {
  localStorage.setItem("panier", "[]") //si panier existe pas, creer
  panier = "[]";
}


function loadProductsAfterJSON() {
  // Check that the jsonObject is loaded
  if (jsonObject) {
    jsonObject.forEach(function(data) {
      loadProducts(data);
    });
  } else {
    console.log("JSON has not been loaded");
  }
}

function loadJSON() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      try {
        jsonObject = JSON.parse(this.responseText);
        console.log(jsonObject);

        /////////////// count du panier dans l'entete //////////////
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
        ///////////////////////////////////////////////////////////

        // Load the products after the JSON is loaded
        loadProductsAfterJSON();
      } catch (e) {
        console.warn("There is been an error in the JSON file");
      }
    } else {
      console.warn("Error loading JSON");
    }
  };
  xhr.open('GET', './data/products.json');
  xhr.send();
}

$(document).ready(function() {
  // Load the JSON file in the page
  loadJSON();
});




function loadProducts(data) {

  var productsContainer = document.getElementById("products");
  var productDiv = document.createElement('div');
  productDiv.className = 'product';

  // Starts the HTML of the products
  var productHTML = '<a href="./product.html?id=' + data.id + '"  title="En savoir plus...">' +
    '<h2>' + data.name + '</h2>' +
    '<img alt="' + data.name + '" src="./assets/img/' + data.image + '">' +
    '<p class="price"><small>Prix</small>' + data.price + '&thinsp;$</p>' +
    '</a>';


  productDiv.innerHTML = productHTML;


  var productElements = document.getElementsByClassName("products");
  for (var i = 0; i < productElements.length; i++) {
    productElements[i].appendChild(productDiv.cloneNode(true));
  }
}

// Button that filter the elements by category
function Filter(type) {

  var filteredProducts = jsonObject.filter(function(product) {
    return product.category == type;
  });

  $(".products").html('');

  $('.filter-button').removeClass('selected');
  $('#' + type).addClass('selected');

  filteredProducts.forEach(function(product) {
    loadProducts(product);
  });
  // Show the quantity of products 
  $("#products-count").text(filteredProducts.length + " produits");
}

function resetPage() {
  $(".products").html('');

  $('.filter-button').removeClass('selected');
  $('#tout_produits').addClass('selected');

  jsonObject.forEach(function(data) {
    loadProducts(data);
  });
  // Show the quantity of products 
  $("#products-count").text(jsonObject.length + " produits");
}

// Button that filter the elements by elements
// Linked used to sort: https://www.youtube.com/watch?v=CTHhlx25X-U
function priceHigherLower() {
  $('.filter-classement').removeClass('selected');
  $('#priceHigherLower').addClass('selected');

  var sortedProducts = jsonObject.sort(function(a, b) {
    return b.price - a.price;
  });

  $(".products").html('');

  sortedProducts.forEach(function(product) {
    loadProducts(product);
  });
  // Show the quantity of products 
  $("#products-count").text(sortedProducts.length + " produits");

}

function priceLowerHigher() {
  $('.filter-classement').removeClass('selected');
  $('#priceLowerHigher').addClass('selected');

  var sortedProducts = jsonObject.sort(function(a, b) {
    return a.price - b.price;
  });
  $(".products").html('');

  sortedProducts.forEach(function(product) {
    loadProducts(product);
  });
  // Show the quantity of products 
  $("#products-count").text(sortedProducts.length + " produits");
}

function nameAToZ() {
  $('.filter-classement').removeClass('selected');
  $('#nameAtoZ').addClass('selected');

  var sortedProducts = jsonObject.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
  $(".products").html('');

  sortedProducts.forEach(function(product) {
    loadProducts(product);
  });
  // Show the quantity of products 
  $("#products-count").text(sortedProducts.length + " produits");
}

function nameZToA() {
  $('.filter-classement').removeClass('selected');
  $('#nameZtoA').addClass('selected');

  var sortedProducts = jsonObject.sort(function(a, b) {
    return b.name.localeCompare(a.name);
  });

  $(".products").html('');

  sortedProducts.forEach(function(product) {
    loadProducts(product);
  });
}















