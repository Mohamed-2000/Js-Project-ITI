
const usersApi = "https://afternoon-falls-30227.herokuapp.com/api/v1/products/";

const xhr = new XMLHttpRequest();
xhr.open("GET", usersApi);
xhr.send();

// Get HTML elements Home Element 
let SecondContainer = document.querySelector(".dis");
let product_img = document.getElementById("picture");
let cat = document.querySelector(".category");
let Pro_name = document.querySelector(".Product_name");
let DT = document.querySelector(".detail");
let ProducPrice = document.querySelector(".product_price");
let Quantity = document.querySelector(".Quantity");
let contactbutton = document.querySelector(".contactB");
let aboutNav = document.querySelector(".aboutNavbutton");

// Get Html Element for Contact us Segment
let contactContainer = document.querySelector(".contact_container");
let inputname = document.querySelector("#inputName");
let inputemail = document.querySelector("#inputEmail");
let insubject = document.querySelector("#inputsubject");
let inmessage = document.querySelector("#message");


// Get Html Element for About Segment
let aboutSection = document.querySelector("#about_section");
let ShopeButton = document.querySelector(".shope");

// Get Html Element for add to cart Segment
let cartSegment = document.querySelector("#myCart");
let myCartNav = document.querySelector(".mycartNav");
xhr.onload = function () {
  if (xhr.status == 200) {
    const users = JSON.parse(xhr.response).data;

    // users list ELement
    const usersListEl = document.querySelector("#usersList");
    const myP = document.querySelector(".item");
    
    users.forEach((user) => {
      // Create HTML elements
      const contain = document.createElement("div");
      const pName = document.createElement("p");
      const imgEl = document.createElement("img");
      const pPrice = document.createElement("p");
      const iconContainer = document.createElement("div");
      const iconLink = document.createElement("a");
      const cartIcon = document.createElement("i");

      // Add style (classes)
      contain.classList.add("col-4", "p-2", "myWidth");
      imgEl.classList.add("img-thumbnail", "img-fluid", "heigh");
      pName.classList.add("PName");
      pPrice.classList.add("Price");
      pName.innerText = `${user.Name}`;
      imgEl.src = user.ProductPicUrl;
      pPrice.innerText = `$ ${user.Price}`;
      cartIcon.classList.add("fas", "fa-cart-arrow-down");
      iconContainer.classList.add("iconholder")
      iconLink.classList.add("add-cart");

      usersListEl.appendChild(contain);
      contain.appendChild(pName);
      contain.appendChild(imgEl);
      contain.appendChild(pPrice);
      contain.appendChild(iconContainer);
      iconContainer.appendChild(iconLink);
      iconLink.appendChild(cartIcon);
      
      
      //let carts = document.querySelector(".add-cart");
      // console.log(carts);

      //    carts.addEventListener("click", function addToCart() {
      //      console.log("added to cart");
          
      //    })
        // for (let i = 0; i < carts.length; i++) {
        //     console.log(carts[i]);
              
              
        // }

      contain.addEventListener("click", function onClickHandler() {
        console.log("You clicked the item");
        usersListEl.style.display = "none";

        const singleProduct = `https://afternoon-falls-30227.herokuapp.com/api/v1/products/${user.ProductId}`;

        const productReq = new XMLHttpRequest();
        productReq.open("GET", singleProduct);
        productReq.send();

        

        productReq.onload = function () {
        if (productReq.status == 200) {
              const single_pro = JSON.parse(productReq.response).data;
              

              SecondContainer.style.display = "flex";
              product_img.src = single_pro.ProductPicUrl;
              cat.innerText = single_pro.Category;
              Pro_name.innerText = single_pro.Name;
              DT.innerText = single_pro.Description;
              ProducPrice.textContent = `$ ${single_pro.Price}`;
              Quantity.textContent = single_pro.Quantity;
              console.log(single_pro.Description);
              console.log(single_pro);

          

        } else {
          console.log("Something went wrong.");
        }
};

      
      })


    });

    console.log(users);
  } else {
    console.log("Something went wrong.");
  }
};

let home = document.querySelector(".home");

let display_container = document.querySelector(".row");
home.onclick = function myFunction() {
  SecondContainer.style.display = "none";
  contactContainer.style.display = "none";
  aboutSection.style.display = "none";
  cartSegment.style.display = "none";
  display_container.style.display = "flex";
}



//Start Contact Us
contactbutton.onclick = function showContact() {
  SecondContainer.style.display = "none";
  display_container.style.display = "none";
  aboutSection.style.display = "none";
  cartSegment.style.display = "none";
  contactContainer.style.display = "block";
}

function check() {
  if (inputname.value.length >= 3 && inputemail.value.length >= 3 && insubject.value.length >= 3) {

    dis.disabled = false;
  }
}
UserForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const user = {
    name: inputname.value, 
    email: inputemail.value, 
    subject: insubject.value, 
    message: inmessage.value
  }

  let jsonUser = JSON.stringify(user);

  // Send request
  const postRequest = new XMLHttpRequest();
  postRequest.open("POST", "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us");
  postRequest.setRequestHeader("content-type", "application/json");
  postRequest.send(jsonUser);


   // Recieve Response and reset the form
   postRequest.onload = function () {

      if (postRequest.readyState === 4 && postRequest.status == 200) {
                console.log("Success");
                UserForm.reset();
                if (inputname.value.length < 3 && inputemail.value.length < 3 && insubject.value.length < 3) {

                  dis.disabled = true;
                }


      } else{
        console.log(Error(`some thing went wrong`));
      }

   }
  
})

//Start About Segment
aboutNav.onclick = function showAbout() {
    SecondContainer.style.display = "none";
    display_container.style.display = "none";
    contactContainer.style.display = "none";
    cartSegment.style.display = "none";
    aboutSection.style.display = "block";
}

ShopeButton.onclick = function backToHome() {
  SecondContainer.style.display = "none";
  contactContainer.style.display = "none";
  aboutSection.style.display = "none";
  cartSegment.style.display = "none";
  display_container.style.display = "flex";
}
// End About Segment 

// Start Add To cart Segment

myCartNav.onclick = function backToHome() {
  SecondContainer.style.display = "none";
  display_container.style.display = "none";
  contactContainer.style.display = "none";
  aboutSection.style.display = "none";
  cartSegment.style.display = "block";
}
