
///////////////tests a effacer//////////////
/*
localStorage.clear()
localStorage.setItem("panier", "[[2, 4],[1,3]]");
localStorage.setItem("nom", "nom1");
localStorage.setItem("prenom", "prenom1");
localStorage.setItem("numeroConfirmation", 12345);
*/
///////////////////////////////////////////////



function message() {

  //clear panier:
  localStorage.setItem("panier", "[]");

  try {
    var nom = localStorage.getItem("last-name");
    var prenom = localStorage.getItem("first-name");
    var numeroConfirmation = localStorage.getItem("confirmation-number");

    messages(nom, prenom, numeroConfirmation);

  } catch (e) {
    alert("Nom, prenom ou numero de commande manquante!!")
  }

  function messages(nom, prenom, numeroConfirmation) {
    var confirmHTML = `<article>
      <h1>Votre commande est confirmée ` + prenom + " " + nom + `! </h1>
      <p>Votre numéro de confirmation est le <strong>`+ numeroConfirmation + `</strong>.</p>
  </article>`;

    var x = document.getElementsByTagName("main")[0];
    x.innerHTML = confirmHTML;
  }
}



function msg() {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;

  console.log(firstName + " " + lastName)

}



$(document).ready(function() {
  // Load the JSON file in the page
  message();
});




