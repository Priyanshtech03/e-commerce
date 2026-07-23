/*======================================================
                    STRICT MODE
======================================================*/

"use strict";

/*======================================================
                    DOM ELEMENTS
======================================================*/

const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

const scrollTopBtn = document.getElementById("scrollTopBtn");
const toast = document.getElementById("toast");

/*======================================================
                    MOBILE MENU
======================================================*/

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {

            menuToggle.innerHTML = "✕";
            document.body.style.overflow = "hidden";

        } else {

            menuToggle.innerHTML = "☰";
            document.body.style.overflow = "";

        }

    });

}

/*======================================================
                CLOSE MENU AFTER CLICK
======================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");
        menuToggle.innerHTML = "☰";
        document.body.style.overflow = "";

    });

});

/*======================================================
            CLOSE MENU WHEN CLICK OUTSIDE
======================================================*/

document.addEventListener("click", (e) => {

    if (

        navMenu &&
        menuToggle &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)

    ) {

        navMenu.classList.remove("active");
        menuToggle.innerHTML = "☰";
        document.body.style.overflow = "";

    }

});

/*======================================================
                SMOOTH SCROLL
======================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", e => {

        const id = link.getAttribute("href");

        if (!id.startsWith("#")) return;

        e.preventDefault();

        const target = document.querySelector(id);

        if (!target) return;

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});

/*======================================================
                TOAST MESSAGE
======================================================*/

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/*======================================================
            STICKY HEADER + SCROLL BUTTON
======================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

    if (window.scrollY > 350) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});

/*======================================================
                SCROLL TO TOP
======================================================*/

if (scrollTopBtn) {

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

/*======================================================
                SCROLL REVEAL
======================================================*/

const revealItems = document.querySelectorAll(`

.product-card,
.feature-card,
.category-card,
.about-image,
.about-content,
.testimonial-card,
.contact-info,
.contact-form,
.newsletter,
.offer

`);

const observer = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

},

{

    threshold: 0.15

}

);

revealItems.forEach(item => {

    observer.observe(item);

});
/*======================================================
                SCROLL TO TOP BUTTON
======================================================*/

if (scrollTopBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            scrollTopBtn.classList.add("show");

        } else {

            scrollTopBtn.classList.remove("show");

        }

    });

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/*======================================================
                SCROLL REVEAL ANIMATION
======================================================*/

const revealElements = document.querySelectorAll(

`
.product-card,
.feature-card,
.category-card,
.about-image,
.about-content,
.testimonial-card,
.contact-info,
.contact-form,
.newsletter,
.offer
`

);

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

},

{

    threshold:0.15

}

);

revealElements.forEach(element=>{

    revealObserver.observe(element);

});


/*======================================================
                ACTIVE NAVIGATION
======================================================*/

const sections = document.querySelectorAll("section[id]");

function updateActiveMenu(){

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if(

            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight

        ){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveMenu);

window.addEventListener("load", updateActiveMenu);


/*======================================================
                TOAST FUNCTION
======================================================*/

function showToast(message){

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


/*======================================================
                PAGE LOADED
======================================================*/

window.addEventListener("load",()=>{

    console.log(

        "%c🪔 Prakruti Aroma Loaded Successfully",

        "color:#5B3A29;font-size:16px;font-weight:bold;"

    );

});
/*======================================================
                    SHOPPING CART
======================================================*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButtons = document.querySelectorAll(".cart-btn");


/*======================================================
                    SAVE CART
======================================================*/

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

}


/*======================================================
                    CART COUNT
======================================================*/

function getCartCount(){

    return cart.reduce((total,item)=> total + item.quantity,0);

}


/*======================================================
                    CART TOTAL
======================================================*/

function getCartTotal(){

    return cart.reduce((total,item)=>{

        const price = parseFloat(item.price.replace(/[^\d.]/g,""));

        return total + (price * item.quantity);

    },0);

}


/*======================================================
                    DISPLAY CART
======================================================*/

function displayCart(){

    console.clear();

    console.log("========== PRAKRUTI AROMA ==========");

    console.table(cart);

    console.log("Items :",getCartCount());

    console.log("Total : ₹"+getCartTotal());

}


/*======================================================
                    ADD TO CART
======================================================*/

cartButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const card = button.closest(".product-card");

        if(!card) return;

        const product={

            name:card.querySelector("h3").textContent,

            price:card.querySelector(".price").textContent,

            image:card.querySelector("img").src

        };

        const existing = cart.find(item=> item.name===product.name);

        if(existing){

            existing.quantity++;

        }else{

            cart.push({

                ...product,

                quantity:1

            });

        }

        saveCart();

        displayCart();

        animateButton(button);

        showToast("🛒 "+product.name+" added to cart");
        

    });

    function buyNow(productId){

    let products = JSON.parse(localStorage.getItem("products")) || [];

    let product = products.find(
        item => item.id === productId
    );


    if(product){

        localStorage.setItem(
            "buyProduct",
            JSON.stringify(product)
        );

        window.location.href="checkout.html";

    }
    else{
        alert("Product not found");
    }

}
});


/*======================================================
                    BUTTON ANIMATION
======================================================*/

function animateButton(button){

    button.style.transform="scale(.94)";

    setTimeout(()=>{

        button.style.transform="scale(1)";

    },180);

}


/*======================================================
                    RIPPLE EFFECT
======================================================*/

const rippleButtons=document.querySelectorAll(".btn,.cart-btn");

rippleButtons.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";

        ripple.style.top=(e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


displayCart();
/*======================================================
                NEWSLETTER FORM
======================================================*/

const newsletterForm = document.querySelector(".newsletter-form");

if(newsletterForm){

    newsletterForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const emailInput = newsletterForm.querySelector("input");

        const email = emailInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email===""){

            showToast("📧 Please enter your email address.");

            emailInput.focus();

            return;

        }

        if(!emailPattern.test(email)){

            showToast("❌ Please enter a valid email.");

            emailInput.focus();

            return;

        }

        showToast("✅ Thank you for subscribing!");

        newsletterForm.reset();

    });

}


/*======================================================
                CONTACT FORM
======================================================*/

const contactForm = document.querySelector(".contact-form");

if(contactForm){

    contactForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const phone = contactForm.querySelector('input[type="tel"]');
        const message = contactForm.querySelector("textarea");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(

            name.value.trim()==="" ||
            email.value.trim()==="" ||
            phone.value.trim()==="" ||
            message.value.trim()===""

        ){

            showToast("⚠️ Please fill all fields.");

            return;

        }

        if(!emailPattern.test(email.value.trim())){

            showToast("❌ Invalid email address.");

            email.focus();

            return;

        }

        if(!/^[0-9]{10}$/.test(phone.value.trim())){

            showToast("📱 Enter a valid 10-digit mobile number.");

            phone.focus();

            return;

        }

        showToast("✅ Message sent successfully!");

        contactForm.reset();

    });

}


/*======================================================
                IMAGE PRELOADER
======================================================*/

window.addEventListener("load",()=>{

    document.querySelectorAll("img").forEach(img=>{

        const preload = new Image();

        preload.src = img.src;

    });

});


/*======================================================
                PAGE READY
======================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    displayCart();

    updateActiveMenu();

});


/*======================================================
                WINDOW RESIZE
======================================================*/

window.addEventListener("resize",()=>{

    updateActiveMenu();

});


/*======================================================
                GLOBAL ERROR HANDLER
======================================================*/

window.addEventListener("error",(event)=>{

    console.error("JavaScript Error :",event.message);

});


/*======================================================
                WEBSITE READY
======================================================*/

window.addEventListener("load",()=>{

    console.log(

        "%c🪔 Prakruti Aroma Website Loaded Successfully",

        "color:#5B3A29;font-size:18px;font-weight:bold;"

    );

});