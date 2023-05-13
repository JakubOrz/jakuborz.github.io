function throttle(func, timeFrame) {
    let lastTime = 0;
    return function () {
        let now = new Date();
        if (now - lastTime >= timeFrame) {
            func();
            lastTime = now;
        }
    };
}

const onScroll = throttle(() => {
    let current_scroll = window.scrollY;
    document.querySelectorAll("section").forEach(function(section){
        let link_to_section = document.getElementById(section.id+"_link");
        if (link_to_section !== null){
            link_to_section.classList.remove("selected");
        }
        if(section.offsetTop - (window.innerHeight / 2) < current_scroll &&
            section.offsetTop + (window.innerHeight / 2) > current_scroll){
            if (link_to_section !== null) {
                link_to_section.classList.add("selected");
                let content_class = document.getElementById(section.id+"_content").classList;
                content_class.remove("lineUpHidden");
                if (!content_class.contains("lineUp")){
                    content_class.add("lineUp");
                }
            }

        }
    });
}, 150);

document.addEventListener("scroll", onScroll);

