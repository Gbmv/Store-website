
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





$(document).ready(function() {
  panierCount();

  // Valider le formulaire lors de la soumission
  $('#order-form').validate({
    rules: {
      'first-name': {
        required: true,
        minlength: 2
      },
      'last-name': {
        required: true,
        minlength: 2
      },
      'email': {
        required: true,
        email: true
      },
      'phone': {
        required: true,
        minlength: 10,
        digits: true
      },
      'credit-card': {
        required: true,
        creditcard: true
      },
      'credit-card-expiry': {
        required: true,
        validExpiryDate: true
      }
    },
    messages: {
      'first-name': {
        required: "Veuillez saisir votre prénom",
        minlength: "Le prénom doit contenir au moins 2 caractères"
      },
      'last-name': {
        required: "Veuillez saisir votre nom",
        minlength: "Le nom doit contenir au moins 2 caractères"
      },
      'email': {
        required: "Veuillez saisir votre adresse email",
        email: "Veuillez saisir une adresse email valide"
      },
      'phone': {
        required: "Veuillez saisir votre numéro de téléphone",
        minlength: "Veuillez saisir un numéro de téléphone valide",
        digits: "Veuillez saisir un numéro de téléphone valide"
      },
      'credit-card': {
        required: "Veuillez saisir votre numéro de carte de crédit",
        creditcard: "Veuillez saisir un numéro de carte de crédit valide"
      },
      'credit-card-expiry': {
        required: "Veuillez saisir la date d'expiration de votre carte de crédit",
        validExpiryDate: "La date d’expiration de votre carte de crédit est invalide."
      }
    },



    submitHandler: function(form) {
      // Check if the form is valid
      if ($('#order-form').valid()) {
        // If valid, submit form
        console.log("Form is valid, next step; put in localStorage")

        var firstName = $("#first-name").val();
        var lastName = $("#last-name").val();

        if (localStorage.getItem("confirmation-number") == null) {
          localStorage.setItem("confirmation-number", "00001")
        } else {
          let conf = parseInt(localStorage.getItem("confirmation-number"))
          conf++;
          while (conf.length < 5) {
            conf = 0 + conf.toString()
          }
          localStorage.setItem("confirmation-number", JSON.stringify(conf));
        }

        localStorage.setItem("first-name", firstName);
        localStorage.setItem("last-name", lastName);


        document.getElementById('order-form').addEventListener('submit', function(event) {
          event.preventDefault();
          alert('Form submission prevented.');
        });

      }

      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      jQuery.validator.addMethod("credit-card-expiry", function(value, element) {
        return this.optional(element) || regex.test(value);
      }, "Date invalide");


    }
  });

});




