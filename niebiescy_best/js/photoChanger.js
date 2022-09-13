let slides = null;
let slide_number = 0;
let isMobile = false;

if(window.screen.availWidth < 800){
    isMobile = true;
}

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

function onDocumentLoaded(){
    // if (isMobile){
    //     let logo_link = document.getElementById("logo_link");
    //     logo_link.innerText = "IRP";
    // }
    loadSlides();
    document.getElementById("submit_button").addEventListener("click", function(event){
        event.preventDefault();
        recruit_form_submitted();
    });

}

function loadSlides(){
    slides = document.querySelector('#photo_slides').getElementsByTagName('img');
    let source = "desktop";
    if (isMobile){
        source = "mobile";
    }
    Array.from(slides).forEach((element, index) => {
        element.src = "static/"+source+"/"+(index+1)+".jpg";
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
    let documentSection =  document.getElementById(section);
    documentSection.scrollIntoView();
    // setTimeout(() => documentSection.classList.add("lineUp"), 1000);
}
