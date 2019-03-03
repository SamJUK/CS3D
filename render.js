/**
 * File Name: render.js
 * File Author: SamJ
 * File Desc: Handle the render and control of the 3d viewer
 */


var render = {

    delta:      0,    //
    xy:         null, // Mouse Cords
    mesh:       null, //
    scene:      null, // Reference to our scene object
    camera:     null, // Reference to our camera object
    canvas:     null, // Reference to the Canvas to draw the scene in
    loader:     null, //
    renderer:   null, // Reference to the WebGL Renderer
    meshURL:    null, // Url path to our .JSON mesh file
    textureURL: null, // Url Path to the texture we want to apply to the model

    init: function (canvas, meshURL, textureURL)
    {
        // @TODO: Validate we have the pass params & they are correct types
        this.canvas = canvas;
        this.meshURL = meshURL;
        this.textureURL = textureURL;

        this.createRenderer().setupRenderer();
        this.createScene().setupScene();

        this.setupEvents();

        this.loader = new THREE.JSONLoader();
        this.loadModel().render();
    },

    createRenderer: function ()
    {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        return this;
    },

    setupRenderer: function ()
    {
        this.renderer.setClearColor(0x071116);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        return this;
    },

    createScene: function ()
    {
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 10000);
        this.scene = new THREE.Scene();
        return this;
    },

    setupScene: function ()
    {
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        var pointLight = new THREE.PointLight(0xffffff, .5);
        this.scene.add(ambientLight);
        this.scene.add(pointLight);

        return this;
    },

    loadModel: function ()
    {
        var callback = function (geo) {
            let texture = new THREE.TextureLoader().load(this.textureURL);
            let material = new THREE.MeshLambertMaterial({map: texture, morphTargets: true, side: THREE.Doubleside});

            this.mesh = new THREE.Mesh(geo, material);
            this.scene.add(this.mesh);
            this.mesh.position.z = -25;
            this.mesh.position.y = -2;
            this.mesh.rotation.x = .2;
        };

        this.loader.load(this.meshURL, callback.bind(this));

        return this;
    },

    render: function ()
    {
      this.delta += 0.1;

      if (this.mesh) {
          this.mesh.rotation.y += 0.01;
      }

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render.bind(this));

      return this;
    },

    /**********
     * EVENTS *
     **********/
    setupEvents: function ()
    {
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('wheel', this.handleMouseScroll.bind(this));

        return this;
    },


    handleWindowResize: function ()
    {
        var canvas_width = this.canvas.clientWidth;
        var canvas_height = this.canvas.clientHeight;

        this.camera.aspect = canvas_width / canvas_height;
        this.renderer.setSize(canvas_width, canvas_height);

        return this;
    },

    handleMouseMove: function (e)
    {
        let oldMousePos = this.xy;
        let mousePos = {x: e.clientX, y: e.clientY};

        let delta = {
            x: (oldMousePos.x - mousePos.x),
            y: (oldMousePos.y - mousePos.y)
        };

        this.xy = mousePos;
        this.mesh.rotation.y -= (delta.x / 50);
    },

    handleMouseDown: function (e)
    {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.xy = {x: e.clientX, y: e.clientY}
    },

    handleMouseUp: function ()
    {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        return this;
    },

    handleMouseScroll: function (e)
    {
        // Check if scroll direction is up
        if (e.deltaY > 0) {
            if (this.mesh.position.z >= -10) {
                return this;
            }

            this.mesh.position.z += .5;
            e.preventDefault();
            return this;
        }

        if (this.mesh.position.z <= -45) {
            return this;
        }

        this.mesh.position.z -= .5;
        e.preventDefault();
        return this;
    }

};