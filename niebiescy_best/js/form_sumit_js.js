
function recruit_form_submitted(){
    let form = document.querySelector('#recruit_form');
    if(!form.checkValidity()){
        form.reportValidity();
        return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://ladyisabell3-1-z4708130.deta.app/resSociety", true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    let send_button = document.getElementById("submit_button");
    send_button.disabled = true;
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (this.status === 200) {
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
            send_button.disabled = false;
            document.querySelector('#form_error_message').innerHTML = "Zgłoszenie zawera błędy";
        }
    }
}
