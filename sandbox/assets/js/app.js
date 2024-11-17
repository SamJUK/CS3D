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


const vm = new Vue({
    el: '#app',
    data: {
        controls_closed: false,
        weapon: '',
        skin: '',
        animation: 'auto_rotate',
        wiremesh: false,
        getWeaponOptions: function() {
            return Object.values(weapons.getAll());
        },
        getSkinOptions: function() {
            return Object.values(skins.getAll(this.weapon.key))
        },
        getAnimationOptions: function() {
            return [];
        }
    },
    watch: {
        weapon: function() {
            console.log('[CS3D:SANDBOX] Weapon Changed', this.weapon);

            let entity = this.weapon;
            entity.skin = this.skin
                ? this.skin
                : { legacy_model: false };

            console.log('[CS3D:SANDBOX] Triggering a render entity', entity);
            render.entity(entity);
        },
        wiremesh: function() {
            render.toggleWiremesh(this.wiremesh);
        }
    }
});



(function() {
    console.log('[CS3D:SANDBOX] Init');
    document.body.style.background = backgrounds['dark'];
    render.init(document.querySelector('canvas'));
    // Expose the render API to the browser
    window.render = render;
})();