// ==UserScript==
// @name         Korekor+
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Małe usprawnienie działania korektora clarinowego
// @author       Jakub Orzyłowski
// @match        http://mowa.clarin-pl.eu:7000/speech/*
// @updateURL    https://jakuborz.github.io/plugins/clarin/korektor_plus.js
// @downloadURL  https://jakuborz.github.io/plugins/clarin/korektor_plus.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=clarin-pl.eu
// @grant        none
// ==/UserScript==

var decoding_keys = {}

function decode_keys(){

    let raw_data = localStorage.getItem("key_config");
    if (!raw_data || raw_data.length === 0){
        return;
    }
    try{
        decoding_keys = JSON.parse(localStorage.getItem("key_config"))
    }
    catch (SyntaxError){
        console.warn("Konfiguracja jest niepoprawnie zapisana")
    }
}

function replace_keyword(content){
    let newstring = content.textContent;
    for (const [key, value] of Object.entries(decoding_keys)) {
        newstring = newstring.replaceAll(key, value);
    }
    segments_changed.add(content);
    content.textContent = newstring;
}

function add_listeners(){
    const segments = document.body.getElementsByClassName("segment")
    for (const segment of segments) {
        let ack_button2 = document.createElement('button')
        let field = segment.getElementsByTagName('p')[0]
        ack_button2.textContent = "Podmień";
        ack_button2.classList.add('btn')
        ack_button2.addEventListener('click', () => {
            replace_keyword(field);
        });
        segment.appendChild(ack_button2)
    }

}

(function() {
    'use strict';

    let config = document.createElement('div');
    let config_box = document.createElement('textarea');
    let text1 = document.createElement('h3');
    text1.textContent = "Konfiguracja słów kluczowych";
    config.appendChild(text1);

    config_box.setAttribute("type", "textarea");
    config_box.setAttribute("name" ,"config_input");
    config_box.setAttribute("cols", "50");
    config_box.setAttribute("rows", "10");

    config_box.value = localStorage.getItem("key_config");
    decode_keys();
    config_box.onchange = (event) => {
        decode_keys()
        localStorage.setItem("key_config", config_box.value);
    }

    config.classList.add("container");
    config.id = "config-list";
    config.appendChild(config_box);
    add_listeners();

    document.body.insertBefore(config, document.getElementById("speech"));


})();
