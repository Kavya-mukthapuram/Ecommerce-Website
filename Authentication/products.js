fetch("products.html")
.then(res=>res.text())
.then(data => {
    document.getElementById("products").innerHTML = data;
})