/* =====================================
   PORTFOLIO SLIDE NAVIGATION
===================================== */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const navLinks = document.querySelectorAll(".nav-links a");

let currentSlide = 0;
let isAnimating = false;


/* =====================================
   SHOW SLIDE
===================================== */

function showSlide(index) {

    if (index < 0 || index >= slides.length) {
        return;
    }

    if (index === currentSlide) {
        return;
    }

    isAnimating = true;

    const oldSlide = slides[currentSlide];
    const newSlide = slides[index];

    oldSlide.classList.remove("active");

    if (index > currentSlide) {
        oldSlide.classList.add("previous");
    } else {
        oldSlide.classList.remove("previous");
    }

    newSlide.classList.remove("previous");
    newSlide.classList.add("active");


    /* Update dots */

    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });


    currentSlide = index;


    /* Update URL */

    history.replaceState(
        null,
        "",
        "#" + newSlide.id
    );


    setTimeout(() => {

        isAnimating = false;

    }, 750);

}


/* =====================================
   MOUSE WHEEL
===================================== */

window.addEventListener(
    "wheel",
    function (event) {

        /* Don't use slide navigation on mobile */

        if (window.innerWidth <= 600) {
            return;
        }

        if (isAnimating) {
            return;
        }

        if (Math.abs(event.deltaY) < 20) {
            return;
        }

        if (event.deltaY > 0) {

            showSlide(currentSlide + 1);

        } else {

            showSlide(currentSlide - 1);

        }

    },
    {
        passive: true
    }
);


/* =====================================
   DOT NAVIGATION
===================================== */

dots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const slideIndex = Number(
            dot.dataset.slide
        );

        showSlide(slideIndex);

    });

});


/* =====================================
   NAVBAR LINKS
===================================== */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        if (window.innerWidth <= 600) {
            return;
        }

        event.preventDefault();

        const targetId =
            link.getAttribute("href").replace("#", "");

        const targetSlide =
            Array.from(slides).findIndex(
                slide => slide.id === targetId
            );

        if (targetSlide !== -1) {

            showSlide(targetSlide);

        }

    });

});


/* =====================================
   HERO BUTTON LINKS
===================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        if (window.innerWidth <= 600) {
            return;
        }

        const targetId =
            link.getAttribute("href").replace("#", "");

        const targetSlide =
            Array.from(slides).findIndex(
                slide => slide.id === targetId
            );

        if (targetSlide === -1) {
            return;
        }

        event.preventDefault();

        showSlide(targetSlide);

    });

});


/* =====================================
   KEYBOARD NAVIGATION
===================================== */

window.addEventListener(
    "keydown",
    function (event) {

        if (window.innerWidth <= 600) {
            return;
        }

        if (isAnimating) {
            return;
        }

        if (
            event.key === "ArrowDown" ||
            event.key === "PageDown" ||
            event.key === " "
        ) {

            event.preventDefault();

            showSlide(currentSlide + 1);

        }


        if (event.key === "ArrowUp" || event.key === "PageUp") {

            event.preventDefault();

            showSlide(currentSlide - 1);

        }

    }
);


/* =====================================
   START FROM URL HASH
===================================== */

function loadInitialSlide() {

    const hash =
        window.location.hash.replace("#", "");

    if (!hash) {
        slides[0].classList.add("active");
        return;
    }

    const index =
        Array.from(slides).findIndex(
            slide => slide.id === hash
        );

    if (index === -1) {

        slides[0].classList.add("active");

        return;
    }

    currentSlide = index;

    slides[index].classList.add("active");

    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

}

loadInitialSlide();

/* =====================================
   DARK / LIGHT MODE
===================================== */

const themeToggle = document.getElementById("themeToggle");


/* Load saved theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


/* Toggle theme */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");


    const isDark =
        document.body.classList.contains("dark-mode");


    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

});