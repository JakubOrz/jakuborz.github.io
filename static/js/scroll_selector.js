

const onScroll = throttle(() => {
    let current_scroll = window.scrollY;
    document.querySelectorAll("section").forEach(function(section){
        let link_to_section = document.getElementById(section.id+"_link");
        link_to_section.classList.remove("current");
        if(section.offsetTop - (window.innerHeight / 2) < current_scroll &&
            section.offsetTop + (window.innerHeight / 2) > current_scroll){
            console.log(section.id);
            link_to_section.classList.add("current");
        }
    });
}, 100);

document.addEventListener("scroll", onScroll);

