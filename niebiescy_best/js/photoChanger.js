let slides = null;
let slides2 = [];
let counter = 0;
let slide_number = 0;
let isMobile = false;

let sections = [];

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
    loadSlides2();
    document.getElementById("submit_button").addEventListener("click", function(event){
        event.preventDefault();
        recruit_form_submitted();
    });
    document.querySelector('#recruit_form').addEventListener('submit', (e) => {
        const data = Object.fromEntries(new FormData(e.target).entries());
        console.log(data)
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

function loadSlides2(){
    sections = Array.from(document.getElementsByClassName("photoBox"));
    let source = "desktop";
    if (isMobile){
        source = "mobile";
    }
    slides2 = new Array(sections.length);
    sections.forEach((s, sectionNumber) => {
        let images = s.getElementsByTagName("img");
        slides2[sectionNumber] = Array(images.length);
        Array.from(images).forEach((element, index) => {
            element.src = "static/backgrounds/"+source+"/"+(sectionNumber)+"/"+(index + 1)+".jpg";
            slides2[sectionNumber][index] = element;
        })
    })
    change_slide();
}


function change_slide() {
    nextSlide2();
    setTimeout(change_slide, 5000);
}

function nextSlide(){
    slides[slide_number].classList.remove('active');
    slide_number = (slide_number + 1) % slides.length;
    slides[slide_number].classList.add('active');
}

function nextSlide2(){
    slides2.forEach((section) => {
        section[counter % section.length].classList.remove('active');
        section[(counter + 1) % section.length].classList.add('active');
    })
    counter += 1;
}

function moveToSection(section){
    let documentSection =  document.getElementById(section);
    documentSection.scrollIntoView();
}
