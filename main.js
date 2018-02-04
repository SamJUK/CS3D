/**
  File Name: main.js
  File Author: SamJ
  File Desc: Handle the implimentation of CS3D on steam marketplace pages
*/

let namespace = '+ CS3D:',
    version = '0.9',
    debug = false,
    items = {
      "AK-47": {
        "url": "rif_ak47",
        "textures": ['Fire_Serpent']
      },
      "★ Karambit": {
        "url": "knife_karam",
        "textures": ['Lore', 'Autotronic', 'Black Laminate']
      },
      "★ Falchion Knife": {
        "url": "knife_falchion",
        "textures": ['']
      },
      "★ Huntsman Knife": {
        "url": "knife_huntsman",
        "textures": ['']
      },
      "★ Gut Knife": {
        "url": "knife_gut",
        "textures": ['Lore', 'Autotronic', 'Black Laminate']
      },
      "★ Flip Knife": {
        "url": "knife_flip",
        "textures": ['Lore', 'Autotronic', 'Black Laminate']
      },
      "★ Butterfly Knife": {
        "url": "knife_butterfly",
        "textures": ['']
      },
      "★ Bowie Knife": {
        "url": "knife_bowie",
        "textures": ['']
      },
      "★ M9 Bayonet": {
        "url": "knife_m9_bayo",
        "textures": ['Lore', 'Autotronic', 'Black Laminate']
      },
      "★ Bayonet": {
        "url": "knife_bayo",
        "textures": ['Lore', 'Autotronic', 'Black Laminate']
      },
      "★ Shadow Daggers": {
        "url": "knife_shadow",
        "textures": ['']
      }
    };

function getMeshURL(weapon){
  if(typeof(weapon) == 'undefined') return console.error(namespace + ' Weapon param missing');
  return chrome.extension.getURL(`meshes/${items[weapon].url}/model.json`);
}
function getTextureURL(weapon, skin){
  if(typeof(weapon) == 'undefined') return console.error(namespace + ' Weapon or skin param missing');
  let texture = skin.replace(' ', '_').toLowerCase();
  return chrome.extension.getURL(`meshes/${items[weapon].url}/textures/${texture}.jpg`);
}

jQuery(document).ready(()=>{
  var console_info = ["%c CS3D %cv"+version+" by SamJ %c http://www.samdjames.uk/CS3D ", "background: #000000;color: #00ff99", "background: #000000;color: #fff", ""];
  console.log.apply(console, console_info);

  // Get Info We Need
    let pageItemName = jQuery('#largeiteminfo_item_name').text(),
        itemName = pageItemName.split('|')[0],
        skinName = pageItemName.split('|')[1];

        if(!itemName || !skinName) return console.error(namespace + ' Error Getting name & skin');
        itemName = itemName.trim();
        skinName = skinName.trim();

  // If in debug log entity details
  if(debug){
    console.log(namespace + ' Weapon - ' + itemName);
    console.log(namespace + ' Skin   - ' + skinName);
  };

  // 3D Entity Does Not Exist
  if(items.hasOwnProperty(itemName) && items[itemName].textures.indexOf(skinName) == -1){
    if(debug) console.error(namespace + ' Entity Does not exist');
    return;
  };

  // -- ADD TO PAGE
  let html = `
    <style>.market_listing_largeimage{position: relative;}</style>
    <canvas id="render" style="position: absolute; height: 100%; width: 100%; top: 0; left: 0;"></canvas>
    <svg style="height: 30px; width: 30px; position: absolute; top: 5px; right: 9px;cursor:pointer;" version="1.1" id="CS3D_TOGGLE" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 341.2 341.2" style="enable-background:new 0 0 341.2 341.2;" xml:space="preserve"> <path style="fill:#263645;" d="M0,155.385v90c0,5.2,2,10,5.6,14l19.6,19.6c2.4,2.4,5.6,4,9.2,4H156l14.4-27.2l14.4,27.2h121.6 c3.6,0,6.8-1.2,9.2-4l19.6-19.6c3.6-3.6,5.6-8.8,5.6-14v-90H0z"/> <path style="fill:#2D3F4C;" d="M16,258.985c-3.6-3.6-5.6-8.8-5.6-14v-89.6h-10v90c0,5.2,2,10,5.6,14l19.6,19.6c2.4,2.4,5.6,4,9.2,4 h10c-3.6,0-6.8-1.2-9.2-4L16,258.985z"/> <g> <path style="fill:#263645;" d="M32.8,155.385l36-80.4c4.8-10.4-6.8-20.8-16.4-15.2c0,0-0.4,0-0.4,0.4c-1.6,0.8-2.8,2.4-3.6,4 l-48,91.2L32.8,155.385L32.8,155.385z"/> <path style="fill:#263645;" d="M308.8,155.385l-36-80.4c-4.8-10.4,6.8-20.8,16.4-15.2c0,0,0.4,0,0.4,0.4c1.6,0.8,2.8,2.4,3.6,4 l48,91.2L308.8,155.385L308.8,155.385z"/> </g> <path style="fill:#DB4F38;" d="M26.8,200.185v32c0,6.4,2.4,12.8,7.2,17.2l5.6,5.6c4.4,4.4,10.8,7.2,17.2,7.2h61.6 c9.2,0,17.2-4.8,21.6-12.8l0,0c2-3.6,2.8-7.6,2.8-11.6v-37.2c0-13.6-10.8-24.4-24.4-24.4H51.2C38,175.785,26.8,186.585,26.8,200.185 z"/> <path style="fill:#1BB5FF;" d="M314.8,200.185v32c0,6.4-2.4,12.8-7.2,17.2l-5.6,5.6c-4.4,4.4-10.8,7.2-17.2,7.2h-61.2 c-9.2,0-17.2-4.8-21.6-12.8l0,0c-2-3.6-2.8-7.6-2.8-11.6v-37.2c0-13.6,10.8-24.4,24.4-24.4h66.8 C303.6,175.785,314.8,186.585,314.8,200.185z"/> <g> <path style="fill:#DD9292;" d="M57.6,175.785l-27.2,68.4c1.2,2,2.4,3.6,4,5.2l5.6,5.6c0.8,0.8,2,1.6,3.2,2.4l31.6-81.6H57.6z"/> <path style="fill:#DD9292;" d="M103.2,175.785l-34.4,86h34.8l31.2-79.2c-4.4-4-10.4-6.8-16.8-6.8H103.2z"/> </g> <path style="fill:#1BB5FF;" d="M210.4,258.185c1.2,0.8,2.8,1.6,4.4,2C213.2,259.785,212,258.985,210.4,258.185L210.4,258.185z"/> <g> <path style="fill:#B3F1FF;" d="M215.6,260.585c-0.4,0-0.4,0-0.8-0.4C215.2,260.185,215.2,260.185,215.6,260.585z"/> <path style="fill:#B3F1FF;" d="M210.4,258.185c1.2,0.8,2.8,1.6,4.4,2c0.4,0,0.4,0,0.8,0.4c1.6,0.4,3.2,0.8,4.4,1.2l34-86h-14 l-32,80.8C208.8,256.985,209.6,257.385,210.4,258.185z"/> <path style="fill:#B3F1FF;" d="M290.4,175.785h-13.2l-34.4,86h28l32.8-82.4C299.6,176.985,295.2,175.785,290.4,175.785z"/> </g> </svg>
  `;

  function handle_view_toggle(){
    if(debug)console.log(namespace + ' Handle Toggle View');
    jQuery('#render').toggle();
  }

  jQuery('.market_listing_largeimage').append(html);
  jQuery('#CS3D_TOGGLE').on('click', handle_view_toggle);

  // Load Mesh and Skin
  let meshURL = getMeshURL(itemName);
  let textureURL = getTextureURL(itemName, skinName);
  if(debug) console.log(namespace + ' ' + meshURL);
  if(debug) console.log(namespace + ' ' + textureURL);

  render(jQuery('#render')[0], meshURL, textureURL);
});
