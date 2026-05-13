"use strict";

    document.addEventListener("DOMContentLoaded", function () {

    //Superman collectible images slider
    const supermanImages = [
        "assets/images/supermanstatue.webp",
        "assets/images/supermanstatueback.webp",
        "assets/images/supermanstatuedetail.webp"
    ];

    let supermanIndex = 0;

    const supermanSlider = document.getElementById("superman-slider");
    const nextSuperman = document.getElementById("nextSuperman");
    const prevSuperman = document.getElementById("prevSuperman");

    function showSuperman() {
        supermanSlider.src = supermanImages[supermanIndex];
    }

    //Cleanly cycle through images
    nextSuperman.addEventListener("click", function(){
        supermanIndex = (supermanIndex + 1) % supermanImages.length;
        showSuperman();
    });

    prevSuperman.addEventListener("click", function() {
        supermanIndex = (supermanIndex - 1 + supermanImages.length) % supermanImages.length;
        showSuperman();
    });

    //Riddler collectible images slider
    const riddlerImages = [
        "assets/images/riddler.webp",
        "assets/images/riddlerback.webp",
        "assets/images/riddlerside.webp"
    ];

    let riddlerIndex = 0;

    const riddlerSlider = document.getElementById("riddler-slider");
    const nextRiddler = document.getElementById("nextRiddler");
    const prevRiddler = document.getElementById("prevRiddler");

    function showRiddler() {
        riddlerSlider.src = riddlerImages[riddlerIndex];
    }

    //Cleanly cycle through images
    nextRiddler.addEventListener("click", function() {
        riddlerIndex = (riddlerIndex + 1) % riddlerImages.length;
        showRiddler();
    });

    prevRiddler.addEventListener("click", function(){
        riddlerIndex = (riddlerIndex - 1 + riddlerImages.length) % riddlerImages.length;
        showRiddler();
    });

    //Rogue collectible images slider
    const rogueImages = [
        "assets/images/roguesculpt.webp",
        "assets/images/roguesculptclose.webp",
        "assets/images/roguesculptface.webp"
    ];

    let rogueIndex = 0;

    const rogueSlider = document.getElementById("rogue-slider");
    const nextRogue = document.getElementById("nextRogue");
    const prevRogue = document.getElementById("prevRogue");

    function showRogue() {
        rogueSlider.src = rogueImages[rogueIndex];
    }

    //Cleanly cycle through images
    nextRogue.addEventListener("click", function() {
        rogueIndex = (rogueIndex + 1) % rogueImages.length;
        showRogue();
    });

    prevRogue.addEventListener("click", function() {
        rogueIndex = (rogueIndex - 1 + rogueImages.length) % rogueImages.length;
        showRogue();
    });

    //Jean collectible images slider
    const jeanImages = [
        "assets/images/jeansculpt.webp",
        "assets/images/jeansculptside.webp",
        "assets/images/jeansculptbase.webp"
    ];

    let jeanIndex = 0;

    const jeanSlider = document.getElementById("jean-slider");
    const nextJean = document.getElementById("nextJean");
    const prevJean = document.getElementById("prevJean");

    function showJean() {
        jeanSlider.src = jeanImages[jeanIndex];
    }

    //Cleanly cycle through images
    nextJean.addEventListener("click", function() {
        jeanIndex = (jeanIndex + 1) % jeanImages.length;
        showJean();
    });

    prevJean.addEventListener("click", function() {
        jeanIndex = (jeanIndex - 1 + jeanImages.length) % jeanImages.length;
        showJean();
    });

    //Cart function
    let cart = [];

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartContainer = document.getElementById("cart-container");
    const cartSelection = document.getElementById("Cart");
    const cartToggle = document.getElementById("cart-toggle");
    const navCartLink = document.getElementById("nav-cart-link");
    const checkoutButton = document.getElementById("checkout");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(){
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseFloat(button.getAttribute("data-price"));
            const itemType = button.getAttribute("data-type");

            cart.push({name: itemName, price: itemPrice, type: itemType});

            alert(`You added ${itemName} to your cart!`);
            updateCartDisplay();
        });
    });

    //California Sales tax rate
    const TAX_RATE = 0.0725;

    function updateCartDisplay() {
        
        if (!cartContainer)
            return;

        cartContainer.innerHTML = "";

        // Shows Cart on screen when items are in it
        if (cart.length === 0) {
            checkoutButton.classList.remove("active");
            checkoutButton.classList.add("inactive");

            checkoutButton.textContent = `Checkout ($0.00)`;
            cartSelection.classList.remove("visible");
            cartToggle.textContent = `Total Items: (0)`;
            return;
    }

        cartSelection.classList.add("visible");
        checkoutButton.classList.remove("inactive");
        checkoutButton.classList.add("active");

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class = "item-left">
                    <span class="item-name">${item.name}</span>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </span>
                <span class="item-price">$${item.price.toFixed(2)}</span>
            `;
            
            cartContainer.appendChild(li);
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function() {
            const itemIndex = parseInt(button.getAttribute("data-index"));
            cart.splice(itemIndex, 1);
            updateCartDisplay();
            });
        });

        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const tax = subtotal * TAX_RATE;

        const bookShipping = 5.99;
        const statueShipping = 19.99;
        let shipping = 0;

        cart.forEach(item => {
            if (item.type === "book") shipping += bookShipping;
            else if (item.type === "statue") shipping += statueShipping;
        });

        const total = subtotal + tax + shipping;

        // Created Tax and shipping items
        const subtotalLi = document.createElement("li");
        subtotalLi.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        cartContainer.appendChild(subtotalLi);

        const taxLi = document.createElement("li");
        taxLi.textContent = `Tax: $${tax.toFixed(2)}`;
        cartContainer.appendChild(taxLi);

        const shippingLi = document.createElement("li");
        shippingLi.textContent = `Shipping: $${shipping.toFixed(2)}`;
        cartContainer.appendChild(shippingLi);

        const totalLi = document.createElement("li");
        totalLi.textContent = `Total: $${total.toFixed(2)}`;
        cartContainer.appendChild(totalLi);

        cartToggle.textContent = `Total Items: (${cart.length})`;

        checkoutButton.textContent = `Checkout: ($${total.toFixed(2)})`;
    };

    checkoutButton.addEventListener("click", function(){
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const tax = subtotal * TAX_RATE;

        const bookShipping = 5.99;
        const statueShipping = 19.99;
        let shipping = 0;
        
        cart.forEach(item => {
            if (item.type === "book") shipping += bookShipping;
            else if (item.type === "statue") shipping += statueShipping;
        });

        const total = subtotal + tax + shipping;

        //If the user tries to checkout with nothing in their cart
        if (total === 0) {
            alert("Slow down there! You need to add some items to your cart first!");
            return;
        }

        alert(`Thank you for shopping with The Comic Vault! Your total today is $${total.toFixed(2)}. Your items will be packaged and shipped shortly!`);

        cart = [];

        updateCartDisplay();
            

        checkoutButton.textContent = `Checkout`;
        
    });

    cartToggle.addEventListener("click", function () {
        cartSelection.classList.toggle("collapsed");
    });

    navCartLink.addEventListener("click", function (e) {
        e.preventDefault();
        cartSelection.classList.toggle("collapsed");
    });

    // Form validation
    const form = document.getElementById("contactForm");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");

    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const commentsError = document.getElementById("commentsError");
    const contactError = document.getElementById("contactMethodError");

    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const contactPhone = document.querySelector('input[name="contactMethod"][value="phone"]');
        const contactEmail = document.querySelector('input[name="contactMethod"][value="email"]');

        
        [firstNameError, lastNameError, phoneError, emailError, commentsError, contactMethodError].forEach(el => el.textContent = "");
        

        let valid = true;

        if (!firstNameInput.value.trim()) {
            firstNameError.textContent = "Please input your first name";
            valid = false;
        }

        if (!lastNameInput.value.trim()) {
            lastNameError.textContent = "Please input your last name";
            valid = false;
        }

        if (!commentsInput.value.trim()) {
            commentsError.textContent = "Tell us how we can help!";
            valid = false;
        }

        if (contactPhone.checked) {
            if (!phoneInput.value.trim()) {
                phoneError.textContent = "Phone is required if you choose phone contact.";
                valid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                phoneError.textContent = "Your phone number must be 10 digits.";
                valid = false;
            }
        }

        if (contactEmail.checked) {
            if (!emailInput.value.trim()) {
                emailError.textContent = "Email is required if you choose email contact.";
                valid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = "Email must be valid.";
                valid = false;
            }
        }

        if (!contactPhone.checked && !contactEmail.checked) {
            contactError.textContent = "Please select a contact method.";
            valid = false;
        }

        
        if (!valid) return;

        
        const customer = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            comments: commentsInput.value.trim(),
            contactMethod: contactPhone.checked ? "phone" : "email"
        };

        
        alert(`Thank you for reaching out, ${customer.firstName} ${customer.lastName}! We will contact you via ${customer.contactMethod}. Regarding: "${customer.comments}"`);
        
        form.reset();
    });

    // Dark mode
    const darkModeToggle = document.getElementById("darkModeToggle");

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    
        if(document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = "Light Mode";
        } else {
            darkModeToggle.textContent = "Dark Mode";
        }
    });
    
});