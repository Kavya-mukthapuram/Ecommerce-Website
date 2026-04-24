const form=document.getElementById('contactform');
const Status=document.getElementById('status');
form.addEventListener("submit", async function(e) {

  e.preventDefault(); 

  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/maqpqayv", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    Status.innerHTML = "Message sent successfully!";
    Status.style.color = "blue";
    Status.style.fontSize = "20px";
    Status.style.fontWeight = "bold";

    form.reset();
  } else {
    Status.innerHTML = "Something went wrong. Try again.";
  }

});


fetch("products.html")
.then(res=>res.text())
.then(data => {
    document.getElementById("products").innerHTML = data;
})

