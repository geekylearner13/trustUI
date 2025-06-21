const menuBtn= document.querySelector(".menu-btn");
        const navigation = document.querySelector(".navigation");


        menuBtn.addEventListener("click",()=>{
            menuBtn.classList.toggle("active");
            navigation.classList.toggle("active");
        }); 


        const btns = document.querySelectorAll(".nav-btn");
        const slides = document.querySelectorAll(".image-slide");
        const contents = document.querySelectorAll(".content");



        var sliderNav = function(manual){
            btns.forEach((btn) => {
               btn.classList.remove("active") ;
            })
            slides.forEach((slide) => {
               slide.classList.remove("active") ;
            })
            contents.forEach((content) => {
               content.classList.remove("active") ;
            })
            btns[manual].classList.add("active");
            slides[manual].classList.add("active");
            contents[manual].classList.add("active");


        }
        btns.forEach((btn,i)=>{
            btn.addEventListener("click",()=>{
                sliderNav(i);
            });
        });
        let title = "Brahamdeo Shah Memorial Trust ";
let speed = 200; // Adjust scrolling speed in milliseconds

function scrollTitle() {
    document.title = title;
    title = title.substring(1) + title.charAt(0); // Shift characters
    setTimeout(scrollTitle, speed);
}

scrollTitle();
window.addEventListener("scroll", function() {
    var navbar = document.querySelector("header");
    if (window.scrollY > 50) { // Adjust scroll threshold as needed
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
function redirect() {
    window.location.href = "donate.html";
  }



 // Open Popup with Animation
function openPopup() {
    var overlay = document.getElementById("overlay");
    var popup = document.querySelector(".popup");
    document.body.classList.add("no-scroll");
    

    overlay.style.display = "block";
    setTimeout(() => {
        popup.style.display = "flex";
        popup.style.transform = "scale(1)";
        popup.style.opacity = "1";
    }, 50); // Slight delay for smooth transition
}

// Close Popup with Animation
function closePopup() {
    var popup = document.querySelector(".popup");
    popup.style.transform = "scale(0.8)";
    popup.style.opacity = "0";

    setTimeout(() => {
        popup.style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }, 300); // Match the transition time
}

        // Donation Process
        function donate() {
            var userAmount = document.getElementById("amount").value;

            if (!userAmount || userAmount <= 0) {
                alert("Please enter a valid donation amount.");
                return;
            }
            // var options = {
    //     "key": "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
    //     "amount": 50000, // Amount in paise (e.g., ₹500)
    //     "currency": "INR",
    //     "name": "Bramhdeo Sah Memorial Trust",
    //     "description": "Donation",
    //     "image": "https://yourtrust.org/logo.png", // optional
    //     "handler": function (response){
    //         alert("Donation successful! Payment ID: " + response.razorpay_payment_id);
    //     },
    //     "prefill": {
    //         "name": "",
    //         "email": "",
    //         "contact": ""
    //     },
    //     "theme": {
    //         "color": "#3399cc"
    //     },
    //     "method": {
    //         "upi": true,
    //         "card": false,
    //         "netbanking": false
    //     }
    // };
    // var rzp = new Razorpay(options);
    // rzp.open();
    // e.preventDefault();

            var options = {
                "key": "rzp_test_qR7WCfWyGVdGiJ", // Replace with your Razorpay API key
                "amount": userAmount * 100, // Convert INR to paise
                "currency": "INR",
                "name": "Brahamdeo Sah Memorial Trust",
                "description": "Support our cause",
                "image": "https://geekylearner13.github.io/trustUI/assets/Brahamdeo_Sah_Memorial_Trust-removebg-preview.png", // Optional
                
                "handler": function (response){
                    alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                },
                "prefill": {
                    "name": document.getElementById("name").value,
                    "email": document.getElementById("email").value,
                    "contact": document.getElementById("phone").value
                },
                "method": {
                    "upi": true,
                    "card": true,
                    "netbanking": true
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            var rzp = new Razorpay(options);
            rzp.open();
        }



        