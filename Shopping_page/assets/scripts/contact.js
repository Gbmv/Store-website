function message() {
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
}




$(document).ready(function() {
  message();
});

