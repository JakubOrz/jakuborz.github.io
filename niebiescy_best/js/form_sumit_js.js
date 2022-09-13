
function recruit_form_submitted(){
    let form = document.querySelector('#recruit_form');
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);


    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lady-isabell.herokuapp.com/resSociety", true);

    // xhr.open("POST", "http://0.0.0.0:5000/resSociety", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (this.status === 200) {
            console.log("Sukces");
            form.remove();
            let message = document.createElement("h2")
            message.classList.add("form_title")
            message.innerText = "Zgłoszenie pomyślnie wysłane";
            let messagebody = document.createElement("p");
            messagebody.innerText = "Wkrótce ktoś się z Tobą skontaktuje";
            let box = document.querySelector('.form_box');
            box.classList.remove("form_box");
            box.classList.add("contentBox");
            box.appendChild(message);
            box.appendChild(messagebody);
        } else {
            let responsedata = JSON.parse(this.responseText);
            console.log(responsedata);
            document.querySelector('#form_error_message').innerHTML = "Zgłoszenie zawera błędy";
        }
    }
}
