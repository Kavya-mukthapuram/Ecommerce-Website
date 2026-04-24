function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast(name + " added to cart");

}

function showToast(message) {
    
    document.querySelectorAll(".cart-toast").forEach(t => t.remove());

    let toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.innerText = message;

    
    document.body.appendChild(toast);

    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add("show");
        });
    });

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 12000);
}


// LOAD CART
function loadCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="80">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>

                    <div class="money">
                    <button onclick="decreaseQty(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQty(${index})">+</button>
                   
                    <h4>Subtotal: ₹${itemTotal}</h4>
                    </div>
                </div>
                    <button  class="check" onclick="goToCheckout();buyNow('${item.name}', ${item.price}, '${item.image}', ${item.quantity})">Buy Now</button>
                
            </div>
        `;
    });

    container.innerHTML += `<h2>Total: ₹${total}</h2>`;

}

 function goToCheckout(){
        window.location.href="checkout.html"
    }
function buyNow(name, price, image,quantity) {
  let product = {
    name,
    price,
    image,
    quantity,
  };

  localStorage.setItem("buyNow", JSON.stringify(product));

  window.location.href = "checkout.html";
}



// INCREASE
function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}


// DECREASE
function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
// AUTO LOAD
window.onload = loadCart;

function loadSummary() {
  let buyNow = JSON.parse(localStorage.getItem("buyNow"));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("summary");
  if (!container) return; 

  container.innerHTML = "";
  let total = 0;

  let items = buyNow ? [buyNow] : cart;

  items.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="summary-item">
        <img src="${item.image}" />
        <p>${item.name} × ${item.quantity}</p>
        <p>₹${item.price}</p>
      </div>
    `;
  });

  container.innerHTML += `<h3>Total: ₹${total}</h3>`;
}
if (document.getElementById("summary")) {
  loadSummary();
}
function generateOrderID(){
    return 'ORD' +Date.now() + Math.floor(Math.random() * 1000);
}
function getDeliveryDate(){
    let date=new Date()
    date.setDate(date.getDate()+7)
    return date.toDateString();
}
function placeOrder() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Fill all fields");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let orderId = generateOrderID();
  let delivery = getDeliveryDate();

  let order = {
    id: orderId,
    items: cart,
    user: { name, phone, address },
    delivery
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.setItem("latestOrder", JSON.stringify(order));

  window.location.href = "confirmation.html";
// localStorage.removeItem("cart");
}



function loadConfirmation() {
  let order = JSON.parse(localStorage.getItem("latestOrder"));

  if (!order) return;

  document.getElementById("order-id").innerText =
    "Order ID: " + order.id;

  document.getElementById("delivery").innerText =
    "Expected Delivery: " + order.delivery;
}
if (document.getElementById("order-id")) {
  loadConfirmation();
}