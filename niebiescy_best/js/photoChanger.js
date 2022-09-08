console.log("Hello");

let slides = null;
let slide_number = 0;

function debounce(func, wait) {
    let timeout;
    return () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(func, wait)
    }
}

function throttle(func, wait) {
    let waiting = false;
    return function () {
        if (waiting) {
            return;
        }
        waiting = true;
        setTimeout(() => {
            func.apply(this, arguments);
            waiting = false;
        }, wait);
    };
}

function loadSlides(){
    slides = document.querySelector('.photoBox').getElementsByTagName('img');
    document.getElementById("submit_button").addEventListener("click", function(event){
        event.preventDefault();
        recruit_form_submitted();
    });
    change_slide();
}

function change_slide() {
    nextSlide();
    setTimeout(change_slide, 5000);
}

function nextSlide(){
    slides[slide_number].classList.remove('active');
    slide_number = (slide_number + 1) % slides.length;
    slides[slide_number].classList.add('active');
}

function moveToSection(section){
    document.getElementById(section).scrollIntoView()
}
