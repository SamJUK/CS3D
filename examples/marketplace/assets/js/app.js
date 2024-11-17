const THREE_JS_REMOTE = 'http://127.0.0.1:7501';

const vm = new Vue({
    el: '#app',
    data: {
        filter: '',
        viewtype: 'image',
        showing_active_item: false,
        iframesrc: '',
        active_item: {
            'name': '',
            'type': '',
            'img': '',
            'model': '',
            'skin': ''
        },
        items: {
            "rif_ak47": {
                "name": "AK-47",
                "type": "Rifle",
                "img": "https://csgostash.com/img/weapons/512x384/ak-47.png?id=6b3ac6f25c1ff8c21d729aeb6c8eea23",
                "model":'rif_ak47',
                "skin": '',
                "cost": "$2700",
                "side": "Terrorist"
            },
            "knife_bayonet": {
                "name": "Bayonet",
                "type": "knife",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapons/base_weapons/weapon_bayonet.515de291204d6d896724d9fbb6856fcc6054a787.png",
                "model":'knife_bayonet',
                "skin": '',
                "cost": "$2700",
                "side": "Both"
            },
            "knife_m9_bayonet": {
                "name": "M9 Bayonet",
                "type": "knife",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapons/base_weapons/weapon_knife_m9_bayonet.1a55109e0c88792e5d56ea04dc1f676e44f9dec2.png",
                "model":'knife_m9_bayonet',
                "skin": '',
                "cost": "$2700",
                "side": "Both"
            },
            "ump45": {
                "name": "UMP-45",
                "type": "Sub Machine Gun",
                "img": "https://csgostash.com/img/weapons/512x384/ump-45.png?id=733acf0ca0853469bf533b66f173cabf",
                "model": "ump45",
                "skin": '',
                "cost": "$1900",
                "side": "CT"
            },
            "ump45_crimescene": {
                "name": "UMP-45 - Crime Scene",
                "type": "Sub Machine Gun",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ump45_cu_ump_crime_scene_light_large.db37d99efad4621d4b3232bfc0fa8d04b8a6b8e9.png",
                "model": "ump45",
                "skin": "CrimeScene",
                "cost": "$1900",
                "side": "CT"
            }
        },
        selectItem: function(item) {
            this.active_item = item;
            this.showing_active_item = true;
        },
        open3d: function() {
            this.viewtype = '3d';
            document.querySelector('iframe').src = document.querySelector('iframe').src;
        },
        backToListing: function() {
            this.showing_active_item = false;
        },
        getItems: function() {
            return Object.values(this.items).filter(item => `${item.name} ${item.skin}`.toLowerCase().includes(this.filter.toLowerCase()));
        }
    },
    watch: {
        active_item: function() {
            this.iframesrc = `${THREE_JS_REMOTE}/?model=${this.active_item.model}&skin=${this.active_item.skin}&bg=armoury`;
        }
    }
});