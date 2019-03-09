# CSGO - WebGL Skin Viewer


## Contents:
1) [Prerequisites](#prerequisites)
2) [Adding a new item](#adding-a-new-item) 
3) [Extracting a Model](#extracting-a-model)
4) [Extracting a Texture](#extracting-a-texture)
5) [Known Bugs](#known-bugs)


## Prerequisites:
- GCFScape - [Link to download site](http://nemesis.thewavelength.net/?p=26)
- VTFEdit - [Link to download site](http://nemesis.thewavelength.net/index.php?c=178)
- Blender - [Link to download site](https://www.blender.org/)
  - Plugin: Export to JSON
  - Plugin: Import from Source engine [Guide to install](https://developer.valvesoftware.com/wiki/Blender_Source_Tools#Installation)
- Crowbar - [Link to download site](https://steamcommunity.com/groups/CrowbarTool)
- Hex Editor (e.g HxD)


## Adding a new item:
- After you've exported the model and texture files
- Add the files into the meshes folder
  - Create a subfolder with the name of the item e.g `knife_huntsman`
  - Put the json in within it named `model.json`
  - Now create a texture file and put the textures in there
- In `scripts/config.js` add a new object into the items object
  - The key is the name of the item as it appears on the marketplace (Alphanumeric)
  - Then inside the object create a url property where the value is the name of the item `knife_huntsman`
  - Then an array with the key of `textures` which contains all the textures you've added


## How to extract a model:
- Open GCFScape and go File > Open
- Navigate to your CS:GO directory inside GCFScape. It should be similar to this: `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo`
- Locate the file called `pak01_dir.vpk`, (it should be at the bottom of the list) and click open.
- Once opened, select the models folder then into the weapons folder.
- Right click it, and extract it to a location of your choice. This process may take a little while depending on the speed of your computer.
- Now open crowbar and set the MDL input to where you just extracted too and the output to a location of your choice
- Now if you open blender and go to File > Import > Source Engine and select your `.smd` file
- Delete the camera / character pose rig stuff and Center the model
- Export the model as json by `File > Export > Three.JS (Json)`


## How to extract a skin 
- Open GCFScape and go File > Open
- Navigate to your CS:GO directory inside GCFScape. It should be similar to this: `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo`
- Locate the file called `pak01_dir.vpk`, (it should be at the bottom of the list) and click open.
- Navigate to the texture file `.VTF` and export it
- Convert Texture to JPEG / PNG via VTFEdit 


## Known Bugs / Issues
- When trying to open a VTF file in VTFEdit you may get an error message along the lines of `file version… does not match…`  You can rectify this by opening the VTF file in an Hex editor and changing the value of `00000000 08` from `05` to `04`
