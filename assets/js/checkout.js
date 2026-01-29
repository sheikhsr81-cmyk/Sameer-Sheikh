// ====== CART LOGIC ======
var cart = JSON.parse(localStorage.getItem("cartitems")) || [];

var checkoutItems = document.getElementById("checkoutItems");
var checkoutTotal = document.getElementById("checkoutTotal");
var totalItems = document.getElementById("totalItems");
var placeOrderBtn = document.getElementById("placeOrder");

var total = 0;
var itemsCount = 0;

if (cart.length === 0) {
  checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
} else {
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var subtotal = item.price * item.qty;
    total += subtotal;
    itemsCount += item.qty;

    checkoutItems.innerHTML += 
      '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ccc; padding:5px 0;">' +
        '<div style="display:flex; gap:10px;">' +
          '<img src="' + item.image + '" width="70">' +
          '<div>' +
            '<h6>' + item.name + '</h6>' +
            '<small>$' + item.price + ' × ' + item.qty + '</small>' +
          '</div>' +
        '</div>' +
        '<strong>$' + subtotal + '</strong>' +
      '</div>';
  }
}

checkoutTotal.innerText = total;
totalItems.innerText = itemsCount;

// ====== FORM VALIDATION + PLACE ORDER ======
placeOrderBtn.onclick = function() {
  // Remove previous errors
  var errorEls = document.getElementsByClassName("error-msg");
  while (errorEls[0]) {
    errorEls[0].parentNode.removeChild(errorEls[0]);
  }

  var inputs = ["Name", "Email", "Phone", "City", "Address"];
  for (var i = 0; i < inputs.length; i++) {
    var el = document.getElementById(inputs[i]);
    el.classList.remove("is-invalid");
  }

  var name = document.getElementById("Name").value.trim();
  var email = document.getElementById("Email").value.trim();
  var phone = document.getElementById("Phone").value.trim();
  var city = document.getElementById("City").value.trim();
  var address = document.getElementById("Address").value.trim();

  var valid = true;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^[0-9\+]{7,15}$/;

  if (name === "") {
    addError("Name", "Name is required");
    valid = false;
  }
  if (email === "" || !emailRegex.test(email)) {
    addError("Email", "Valid email is required");
    valid = false;
  }
  if (phone === "" || !phoneRegex.test(phone)) {
    addError("Phone", "Valid phone is required");
    valid = false;
  }
  if (city === "") {
    addError("City", "City is required");
    valid = false;
  }
  if (address === "") {
    addError("Address", "Address is required");
    valid = false;
  }

  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    valid = false;
  }

  if (valid) {
    alert("Order placed successfully!");
    localStorage.removeItem("cartitems");
    window.location.href = "Home.html";
  }
};

function addError(id, message) {
  var el = document.getElementById(id);
  el.className += " is-invalid";
  var error = document.createElement("div");
  error.className = "error-msg";
  error.style.color = "red";
  error.style.fontSize = "12px";
  error.innerText = message;
  el.parentNode.appendChild(error);
}
