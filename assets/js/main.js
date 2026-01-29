// ================= CART DATA =================
let cart = JSON.parse(localStorage.getItem("cartitems")) || [];

// ================= QUANTITY =================
function changeQty(value) {
  const qtyInput = document.getElementById("qty");
  let current = parseInt(qtyInput.value);
  if (current + value >= 1) {
    qtyInput.value = current + value;
  }
}

// ================= ADD TO CART =================
function billgenerate(price, name, image) {
  const qty = parseInt(document.getElementById("qty").value);

  if (!qty || qty < 1) {
    alert("Please select at least 1 quantity.");
    return;
  }

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      id: Date.now(),
      name,
      price,
      image,
      qty
    });
  }

  localStorage.setItem("cartitems", JSON.stringify(cart));
  updateCartUI();
  openCart();
}

// ================= CART UI =================
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsDiv = document.getElementById("cartItems");
const cartTotalSpan = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const cartCountBtn = document.getElementById("cartCountBtn");

function updateCartUI() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p class='text-center'>Your cart is empty</p>";
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItemsDiv.innerHTML += `
      <div class="d-flex gap-2 mb-3 border-bottom pb-2">
        <img src="${item.image}" width="60">
        <div class="flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <small>Rs.${item.price.toLocaleString()} × ${item.qty}</small>
          <br>
          <button onclick="removeItem(${index})" class="btn btn-sm btn-danger mt-1">Remove</button>
        </div>
      </div>
    `;
  });

  cartTotalSpan.innerText = `Rs.${total.toLocaleString()}`;
  cartCount.innerText = count;
  cartCountBtn.innerText = count;

  localStorage.setItem("cartitems", JSON.stringify(cart));
}

// ================= REMOVE ITEM =================
function removeItem(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// ================= CART TOGGLE =================
document.getElementById("openCartBtn").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;

function openCart() {
  cartSidebar.style.right = "0";
}

function closeCart() {
  cartSidebar.style.right = "-400px";
}

// ================= CHECKOUT REDIRECT =================
document.getElementById("checkoutBtn").onclick = () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checkout.");
    return;
  }
  window.location.href = "checkout.html";
};

// ================= INITIAL LOAD =================
updateCartUI();
