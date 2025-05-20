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
        let title = "Brahmdeo Shah Memorial Trust ";
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