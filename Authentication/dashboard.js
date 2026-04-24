fetch("products.html")
.then(res=>res.text())
.then(data => {
    document.getElementById("products").innerHTML = data;
})



window.addEventListener("DOMContentLoaded", async ()=>{
    const { data } =await supabase.auth.getSession();

    if(!data.session){
        window.location.href="login.html";
    }
    
    fetch("products.html")
    .then(res=>res.text())
    .then(data => {
        document.getElementById("products").innerHTML = data;
})

})

async function logout() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}


let None=document.getElementById("none")
document.getElementById("search").addEventListener("keyup", function() {
    let found=false;
    let value=this.value.toLowerCase()
    let Products=document.querySelectorAll(".product")
    Products.forEach(product => {
        let name=product.querySelector(".pname").innerText.toLowerCase()
        if(name.includes(value)){
            product.style.display="block"
            found=true;
        }else{
            product.style.display="none";
        }
        })
        if(!found){
            None.innerText="No products found";
            None.style.color="white";
            None.style.backgroundColor="red";
            None.style.padding="0.5rem";
            None.style.borderRadius="5px";
            None.style.fontSize="25px";
            None.style.display="block";
            None.style.width="fit-content";
        }
        else{
            None.style.display="none";
        }
})


async function showWelcome(){
   const {data}=await supabase.auth.getUser()
   if (data.user){
    let email=data.user.email;
    let name=email.split("@")[0];
    name=name.replace(/[0-9]/g," ");
    name=name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById("welcome").innerText= "Welcome, " +name;
   } 
}
document.addEventListener("DOMContentLoaded",showWelcome)