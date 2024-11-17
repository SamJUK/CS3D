import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import controls from './controls.js';

export default {
    config: {
        rotationSpeed: 0.005,
    },

    xy:         null, // Mouse Cords
    mesh:       null, // The mesh object
    scene:      null, // Our scene object
    camera:     null, // Our camera object
    canvas:     null, // The Canvas to draw the scene in
    loader:     null, // The JSON loader to fetch the model files
    renderer:   null, // The WebGL Renderer
    meshURL:    null, // Url path to our .JSON mesh file
    textureURL: null, // Url Path to the texture we want to apply to the model

    init: function (canvas)
    {
        if(canvas instanceof HTMLElement === false) {
            return console.error(`${config.namespace} Canvas is not an HTML Element`);
        }
        
        this.canvas = canvas;
        this.clock = new THREE.Clock();
        this.loader = new GLTFLoader();
        this.renderer = this.createRenderer();
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 10000);
        this.scene = new THREE.Scene();
        this.createLighting(this.scene);

        if (true) {
            this.controls = controls.init(this);
        }

        if (true) {
            setInterval(this.debug.bind(this), 500);
        }
    },

    entity: function(entity) {
        console.log('[CS3D:BASE] Loading Entity', entity);

        // Make sure we cleanup any past runs
        if (this.pivot) {
            this.pivot.removeFromParent();
        }

        this.loader.load('http://127.0.0.1:7500/' + entity.model, function(geo) {
            console.log('[CS3D:BASE] Model Loaded', geo);
            this.geo = geo;
            this.mesh = geo.scene;

            // Select correct model based on skin configuration
            let modelGroups = this.geo.scene.children.filter(c => c.isGroup || c.isSkinnedMesh);
            if (modelGroups.length > 1) {
                modelGroups[entity.skin.legacy_model ? 1 : 0].visible = false
            }

            // Add the model to the scene within a pivot group
            this.pivot = new THREE.Group();
            this.scene.add(this.pivot);
            this.pivot.add(this.mesh);

            // Apply offsets to center the model within the pivot group
            this.mesh.position.z = -0.12;
            this.mesh.position.y = entity.pivot_offset.y || 0;
            this.mesh.position.x = entity.pivot_offset.x || 0;

            // Set starting pivot positions
            this.pivot.rotation.x = .3;
            this.pivot.rotation.y = 11.5;
            this.pivot.position.z = -1;

            // this.animationMixer = new THREE.AnimationMixer( this.mesh );
            // this.vue.animations = geo.animations.map(a => a.name);

            // Apply skin
            if (entity.skin.texture) {
                entity.skin.texture = 'http://127.0.0.1:7500/' + entity.skin.texture;
                this.startSkinRender(entity);
            } else {
                this.render();
            }

        }.bind(this));
    },

    startSkinRender: function(entity) {
        console.log('[CS3D:BASE] Loading Texture', entity.skin.texture);
        new THREE.TextureLoader().load(entity.skin.texture, function(texture) {
            console.log('[CS3D:BASE] Texture Loaded', [entity.skin.texture, texture]);

            let model = this.mesh.children[entity.skin.legacy_model ? 1 : 2];
            (model.isGroup ? model.children : [model]).forEach(mesh => {
                console.log('[CS3D:BASE] Applied Textured', [mesh, texture]);
                mesh.material.map.image = texture.image
                mesh.material.map.needsUpdate = true
            })

            this.render();
        }.bind(this));
        return;
    },

    createRenderer: function ()
    {
        let renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        renderer.setClearColor(0x071116); // - Dark BG
        renderer.setClearColor(0xffffff, 0); // - Light BG
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        return renderer;
    },

    createLighting: function(scene) {
        let ambientLight = new THREE.AmbientLight(0xffffff, 1);
        ambientLight.decay = 0;
        scene.add(ambientLight);

        let pointLight = new THREE.PointLight(0xffffff, 5);
        pointLight.decay = 0;
        scene.add(pointLight);

        return this;
    },

    render: function ()
    {
        if (!this.controls.isUserRotating) {
            this.pivot.rotation.y += this.config.rotationSpeed;
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        return this;
    },

    toggleWiremesh: function(state) {
        let currentModel = this.geo.scene.children.filter(c => (c.isSkinnedMesh || c.isGroup) && c.visible)[0];
        if (!currentModel) {
            return console.error('Unable to find current model to set wireframe');
        }

        if (currentModel.hasOwnProperty('material')) {
            currentModel.material.wireframe = typeof state !== 'undefined'
                ? state : !currentModel.material.wireframe;
        } else {
            currentModel.children.forEach(function(c) {
                c.material.wireframe = typeof state !== 'undefined'
                    ? state : !c.material.wireframe;
            })
        }
    },

    debug: function() {
        console.log('Debug Invoked');
        let html = `
            Model: ${this.mesh?.name}<br>
            Texture: ?<br>
            Pivot Rot: ${this.pivot?.rotation.toArray().slice(0, 3).join(', ')}<br>
            Pivot Pos: ${this.pivot?.position.toArray().join(', ')}<br>
            Mesh Rot: ${this.mesh?.rotation.toArray().slice(0, 3).join(', ')}<br>
            Mesh Pos: ${this.mesh?.position.toArray().join(', ')}<br>
        `;

        let elm = document.querySelector('#cs3d_canvas_debug');
        if (!elm) {
            let e = document.createElement('div');
            e.id = 'cs3d_canvas_debug';
            e.innerHTML = html;
            e.style = `
            position: fixed;
            top: 10px;
            right: 10px;
            color: white;
            text-align: right;
            background: rgba(0,0,0,.25);
            padding: 10px 20px;
            border: 1px solid black;
            font-size: 14px;
            opacity: .25;
        `;
            document.body.appendChild(e);
        } else {
            elm.innerHTML = html;
        }
    }
};