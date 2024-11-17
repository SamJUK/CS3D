const THREE_JS_REMOTE = 'http://127.0.0.1:7501';

import config from `http://127.0.0.1:7501/assets/js/config.js`;

const vm = new Vue({
    el: '#app',
    data: {
        iframesrc: '',
        weapons: config.weapons,
        selected_weapon: null,
        selected_skin: null,

        getAvailableTextures: function() {
            return this.weapons.hasOwnProperty(this.selected_weapon)
                ? this.weapons[this.selected_weapon].textures
                : [];
        },

        initCanvas: function() {
            this.iframesrc = `${THREE_JS_REMOTE}/?model=${this.selected_weapon}&skin=${this.selected_skin}`;
        }
    },
    watch: {
        selected_weapon: function() { 
            this.initCanvas();
        },
        selected_skin: function() { 
            this.initCanvas();
        }
    }

})