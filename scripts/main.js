/**
 File Name: main.js
 File Author: SamJ
 File Desc: Handle the implementation of CS3D on steam marketplace pages
 */

let main = {
    itemName: null,
    skinName: null,

    init: function ()
    {
        this.logPluginInfoBanner();
        this.extractItemData();

        if(this.weaponExists(this.itemName, this.skinName) === false) {
            return;
        }

        this.addHTMLToPage();
        this.loadCS3D();
    },

    logPluginInfoBanner: function ()
    {
        var msg_template = `%c CS3D %cv${config.version} by SamJ %c http://www.samdjames.uk/CS3D`;
        const console_info = [msg_template, "background: #000000;color: #00ff99", "background: #000000;color: #fff", ""];
        console.log.apply(console, console_info);

        return this;
    },

    extractItemData: function ()
    {
        var item = document.getElementById('largeiteminfo_item_name');
        if (item === null) {
            return console.error('Issue extracting item string info');
        }

        var itemString = item.textContent.replace(/[^\x00-\x7F]/g, "");
        var itemArray = itemString.split('|');

        if(itemArray.length <= 1) {
            return console.error(config.namespace + ' Error Getting name & skin');
        }

        this.itemName = itemArray[0].trim();
        this.skinName = itemArray[1].trim();

        if(config.debug) {
            console.log(`${config.namespace} Weapon - ${this.itemName}`);
            console.log(`${config.namespace} Skin - ${this.skinName}`);
        }
    },

    weaponExists: function (item,skin)
    {
        var weaponExists = config.items.hasOwnProperty(item);
        if(weaponExists === false) {
            console.error(`${config.namespace} That weapon does not exists`);
            return false;
        }

        var skinExists = config.items[item].textures.includes(skin);
        if(skinExists === false) {
            console.error(`${config.namespace} Skin does not exists for ${item}`);
            return false;
        }

        return true;
    },

    addHTMLToPage: function ()
    {
        let html = `
            <style>.market_listing_largeimage{position: relative;}.hide_render{display:none !important;}</style>
            <canvas id="render" style="position: absolute; height: 100%; width: 100%; top: 0; left: 0;"></canvas>
            <svg style="height: 30px; width: 30px; position: absolute; top: 5px; right: 9px;cursor:pointer;" version="1.1" id="CS3D_TOGGLE" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 341.2 341.2" style="enable-background:new 0 0 341.2 341.2;" xml:space="preserve"> <path style="fill:#263645;" d="M0,155.385v90c0,5.2,2,10,5.6,14l19.6,19.6c2.4,2.4,5.6,4,9.2,4H156l14.4-27.2l14.4,27.2h121.6 c3.6,0,6.8-1.2,9.2-4l19.6-19.6c3.6-3.6,5.6-8.8,5.6-14v-90H0z"/> <path style="fill:#2D3F4C;" d="M16,258.985c-3.6-3.6-5.6-8.8-5.6-14v-89.6h-10v90c0,5.2,2,10,5.6,14l19.6,19.6c2.4,2.4,5.6,4,9.2,4 h10c-3.6,0-6.8-1.2-9.2-4L16,258.985z"/> <g> <path style="fill:#263645;" d="M32.8,155.385l36-80.4c4.8-10.4-6.8-20.8-16.4-15.2c0,0-0.4,0-0.4,0.4c-1.6,0.8-2.8,2.4-3.6,4 l-48,91.2L32.8,155.385L32.8,155.385z"/> <path style="fill:#263645;" d="M308.8,155.385l-36-80.4c-4.8-10.4,6.8-20.8,16.4-15.2c0,0,0.4,0,0.4,0.4c1.6,0.8,2.8,2.4,3.6,4 l48,91.2L308.8,155.385L308.8,155.385z"/> </g> <path style="fill:#DB4F38;" d="M26.8,200.185v32c0,6.4,2.4,12.8,7.2,17.2l5.6,5.6c4.4,4.4,10.8,7.2,17.2,7.2h61.6 c9.2,0,17.2-4.8,21.6-12.8l0,0c2-3.6,2.8-7.6,2.8-11.6v-37.2c0-13.6-10.8-24.4-24.4-24.4H51.2C38,175.785,26.8,186.585,26.8,200.185 z"/> <path style="fill:#1BB5FF;" d="M314.8,200.185v32c0,6.4-2.4,12.8-7.2,17.2l-5.6,5.6c-4.4,4.4-10.8,7.2-17.2,7.2h-61.2 c-9.2,0-17.2-4.8-21.6-12.8l0,0c-2-3.6-2.8-7.6-2.8-11.6v-37.2c0-13.6,10.8-24.4,24.4-24.4h66.8 C303.6,175.785,314.8,186.585,314.8,200.185z"/> <g> <path style="fill:#DD9292;" d="M57.6,175.785l-27.2,68.4c1.2,2,2.4,3.6,4,5.2l5.6,5.6c0.8,0.8,2,1.6,3.2,2.4l31.6-81.6H57.6z"/> <path style="fill:#DD9292;" d="M103.2,175.785l-34.4,86h34.8l31.2-79.2c-4.4-4-10.4-6.8-16.8-6.8H103.2z"/> </g> <path style="fill:#1BB5FF;" d="M210.4,258.185c1.2,0.8,2.8,1.6,4.4,2C213.2,259.785,212,258.985,210.4,258.185L210.4,258.185z"/> <g> <path style="fill:#B3F1FF;" d="M215.6,260.585c-0.4,0-0.4,0-0.8-0.4C215.2,260.185,215.2,260.185,215.6,260.585z"/> <path style="fill:#B3F1FF;" d="M210.4,258.185c1.2,0.8,2.8,1.6,4.4,2c0.4,0,0.4,0,0.8,0.4c1.6,0.4,3.2,0.8,4.4,1.2l34-86h-14 l-32,80.8C208.8,256.985,209.6,257.385,210.4,258.185z"/> <path style="fill:#B3F1FF;" d="M290.4,175.785h-13.2l-34.4,86h28l32.8-82.4C299.6,176.985,295.2,175.785,290.4,175.785z"/> </g> </svg>
          `;


        var image = document.querySelector('.market_listing_largeimage');
        if(image === null) {
            return console.error('Could not find the image to insert the toggle into');
        }
        image.innerHTML += html;


        var toggle = document.getElementById('CS3D_TOGGLE');
        if (toggle === null) {
            return console.error('Could not find the toggle to setup');
        }
        toggle.addEventListener('click', this.handle_view_toggle.bind(this));
    },

    handle_view_toggle: function ()
    {
        if(config.debug) {
            console.log(config.namespace + ' Handle Toggle View');
        }

        document.getElementById('render').classList.toggle('hide_render');
    },

    loadCS3D: function ()
    {
        var canvas = document.getElementById('render');

        if(canvas === null) {
            return console.error(`${config.namespace} Render is undefined`);
        }

        render.init(canvas, this.getMeshURL(), this.getTextureURL())
    },

    getMeshURL: function()
    {
        if(typeof this.itemName === 'undefined') {
            return console.error(config.namespace + ' Item is not defined');
        }

        return chrome.extension.getURL(`meshes/${config.items[this.itemName].url}/model.json`);
    },

    getTextureURL: function()
    {
        if(typeof this.itemName === 'undefined') {
            return console.error(config.namespace + ' Item is not defined');
        }

        if(typeof this.skinName === 'undefined') {
            return console.error(config.namespace + ' Item is not defined');
        }

        let texture = this.skinName.replace(' ', '_').toLowerCase();
        return chrome.extension.getURL(`meshes/${config.items[this.itemName].url}/textures/${texture}.jpg`);
    }
};

if(document.readyState !== 'loading') {
    main.init();
} else {
    document.addEventListener('DOMContentLoaded', main.init);
}
