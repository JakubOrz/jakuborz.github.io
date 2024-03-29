// ==UserScript==
// @name           IITC plugin: Download portal data
// @version        0.0.1
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://jakuborz.github.io/plugins/intel/red_portals_colours.user.js
// @downloadURL    https://jakuborz.github.io/plugins/intel/red_portals_colours.user.js
// @description    Cache loaded portal data into json for future study
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @match          https://intel-x.ingress.com/intel*
// @match          http://intel-x.ingress.com/intel*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
    plugin_info.buildName = 'iitc';
    plugin_info.dateTimeVersion = '20170108.21732';
    plugin_info.pluginId = 'portal-view-redcolor';
//END PLUGIN AUTHORS NOTE


// PLUGIN START ////////////////////////////////////////////////////////
window.plugin.red = function() {};
window.COLORS = ['#FF6600', '#0088FF', '#03DC03', '#f624e6'];
window.TEAM_M = 3;
window.TEAM_TO_CSS = ['none', 'res', 'enl', 'm'];

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