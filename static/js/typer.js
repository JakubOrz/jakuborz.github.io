var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    const typer = document.getElementById('typewrite');

    fetch("static/data/custom_names.json")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const period = typer.getAttribute('data-period');
            if (data) {
                new TxtType(typer, data, period);
            }
        });

    // // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    // document.body.appendChild(css);
};