// ==UserScript==
// @name           IITC plugin: Download portal data
// @version        0.1.0
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://jakuborz.github.io/plugins/intel/data_downloander.user.js
// @downloadURL    https://jakuborz.github.io/plugins/intel/data_downloander.user.js
// @description    Cache loaded portal data into json for future study
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
    plugin_info.buildName = 'iitc';
    plugin_info.dateTimeVersion = '20170108.21732';
    plugin_info.pluginId = 'portal-data-copydata';
//END PLUGIN AUTHORS NOTE


// PLUGIN START ////////////////////////////////////////////////////////
window.plugin.downloader = function() {};

window.plugin.downloader.setupCallback = function() {
    addHook('portalDetailsUpdated', window.plugin.downloader.addLink);
}

window.plugin.downloader.addLink = function(d) {
    $('.linkdetails').append(
        '<aside><a onclick="window.plugin.downloader.copydata(\''+window.selectedPortal+'\')" ' +
        'title="Copy portal data into console">Copy data</a></aside>');
}

window.plugin.downloader.copydata = function(guid){
        Console.log(guid);
}
window.plugin.downloader.clicked = function () {


    /*      let json = JSON.stringify(window.portals);
            let blob = new Blob([json], {type: "application/json"});
            let url  = URL.createObjectURL(blob);

            let download_blob = document.createElement('a');
            download_blob.download = "portal_data_copy.json";
            download_blob.href = url;
            download_blob.textContent = "blob_to_download";
            download_blob.click();
            download_blob.remove();
        }

    */

}
plugin.downloader.setup = function() {
    $('#toolbox').append($("<a>")
        .text("copy data")
        .click(plugin.downloader.clicked));
}

const setup = plugin.downloader.setup;

// PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
    if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);