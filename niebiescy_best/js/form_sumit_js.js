
function recruit_form_submitted(){
    let form = document.querySelector('#recruit_form');
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);


    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lady-isabell.herokuapp.com/resSociety", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(data);
    xhr.onload = function() {
        console.log("HELLO")
        console.log(this.responseText);
        let responsedata = JSON.parse(this.responseText);
        console.log(responsedata);
    }
}
