const THREE_JS_REMOTE = 'http://127.0.0.1:7500';
// const THREE_JS_REMOTE = '../../../base';

import weapons from 'http://127.0.0.1:7500/assets/js/model/weapon.js';
import skins from 'http://127.0.0.1:7500/assets/js/model/skin.js';
import render from 'http://127.0.0.1:7500/assets/js/render.js';

const backgrounds = {
    'dark': '#182c37',
    'light': '#FEFEFE',
    'grad-blue': 'linear-gradient(45deg, #7485f7, #dee0ff)',
    'grad-red': 'linear-gradient(45deg, #e25555, #ffe3e3)',
    'armoury': "url('https://img.freepik.com/premium-vector/black-peg-board-perforated-texture-background-material-with-round-holes-horizontal-seamless-pattern_503038-271.jpg') repeat",
    'dust2': "url('https://img-cdn.hltv.org/gallerypicture/UA84mSdCiNbrmTC4X4Le0s.jpg?ixlib=java-2.1.0&w=1200&s=574d1ba38ecf1eeb309697e2f8dccfa5')",
};

(function() {
    console.log('[CS3D:IFRAME] Init');
    const requestParams = new URL(window.location.href);
    const model = requestParams.searchParams.get('model') || null;
    const skin = requestParams.searchParams.get('skin') || null;
    const bg = requestParams.searchParams.get('bg') || null;

    if (backgrounds.hasOwnProperty(bg)) {
        document.body.style.background = backgrounds[bg];
    }

    const error = function(message) {
        document.body.innerHTML = `<h1>ERROR: ${message}</h1>`;
        return console.error(`[CS3D:IFRAME] ${message}`);
    };

    if (model === null) {
        return error('Missing Model Parameter');
    }

    try {
        var entity = weapons.get(model);
        entity.skin = skin ? skins.get(model, skin) : {legacy_model: false};
    } catch (e) {
        return error(`Error loading entity data ${e}`);
    }

    console.log('[CS3D:IFRAME] Rending Entity', entity);
    render.init(document.querySelector('canvas'));
    render.entity(entity);
    // render.render(entity);

    // Expose the render API to the browser
    window.render = render;
})();