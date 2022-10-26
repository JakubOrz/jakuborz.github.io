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

window.plugin.downloader.addLink = function() {
    $('.linkdetails').append(
        '<aside><a onclick="window.plugin.downloader.copydata(\''+window.selectedPortal+'\')" ' +
        'title="Copy portal data into console">Copy data</a></aside>');
}

window.plugin.downloader.copydata = function(guid){
        // console.log(guid);
        // let data = window.portals[guid].options.data;

        let p = window.portals[guid];
        let ll = p.getLatLng();
        window.plugin.bookmarks.addPortalBookmark(guid, ll.lat+','+ll.lng, p.options.data.title);

}

window.plugin().downloader.onHotkeyClicked = function (){
    console.log("Guziczek naciśnięty");
}

plugin.downloader.setup = function() {
    window.plugin.downloader.setupCallback();
    document.addEventListener('keyup', (event) => {
        let name = event.key;
        let code = event.code;
        // Alert the key name and key code on keydown
        console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
    }, false);

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