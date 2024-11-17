# CS3Dv2

A rebuild of the CS3D chrome plugin, to help guide implementation of similar solutions within CSGO & CS2.

The source code of the original version of the chrome extension can be found at https://github.com/SamJUK/CS3D/tree/v1.0.0

- Scripts: These are a collection of scripts and CLI tooling allowing automatic exporting and decompilation of Game Files to gather the models & textures needed.
- Base: This is an API that provides a central location to manage models, textures and core JS files that help with implement a viewer into a webpage
- Viewer: This extends the base component and takes url parameters to configure a 3D viewer. That then can be used in other sites via a iframe.
- Examples/Chrome: This is a chrome plugin, that implements the 3D viewer into the steam marketplace, similar to how this repo originally worked.
- Examples/Marketplace: Example use of the Base component via a iframe in a marketplace context
- Examples/Viewer: 3D Model viewer implement via Iframe


