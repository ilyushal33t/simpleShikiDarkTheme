 // ==UserScript==
// @name         shikimori theme to all users
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  balls
// @author       ilyushal33t
// @match        https://*shikimori.one/*
// @icon         https://cdn.betterttv.net/emote/5fa6e82e4dfba16440294c83/1x
// @run-at       document-end
// @grant        none

// ==/UserScript==

const THEME_URL = 'https://raw.githubusercontent.com/ilyushal33t/simpleShikiDarkTheme/main/custom_css.css';

/***********************
* thanks to this thread:
* https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript
*/
(() => {
    let oldPushState = history.pushState;
    history.pushState = function pushState() {
        let ret = oldPushState.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    let oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
        let ret = oldReplaceState.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'));
    });
})();

window.addEventListener('locationchange', function () {
   //  console.log('location changed!');
});

/**********************************************************************************************************/


if(document.location.host == 'shikimori.one') {
    let userCssReplace = async () => {
        let resp = await fetch(THEME_URL)
        custom_css.innerHTML = await resp.text()
    }
    userCssReplace()

    window.addEventListener('locationchange', function () {
        setTimeout(userCssReplace,1000);
    });
}