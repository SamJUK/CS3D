/**
 * Controls for the renderer
 */
export default {
    config: {
        moveSpeed: 5,
        zoomMax: -0.4,
        zoomMin: -15,
        zoomStep: 0.1
    },

    isUserRotating: false,
    mouseUp:    null, // Using .bind changes the func reference
    mouseDown:  null, // Using .bind changes the func reference
    mouseMove:  null, // Using .bind changes the func reference
    mouseScroll:null, // Using .bind changes the func reference
    core: null,

    init: function(core) {
        console.log('[CS3D:Controls] init')
        this.core = core;
        this.setupEvents();
        return this;
    },

    getCamera: function() {
        return this.core.camera;
    },

    getCanvas: function() {
        return this.core.canvas;
    },

    getModel: function() {
        return this.core.pivot;
    },

    setupEvents: function ()
    {
        console.log('[CS3D:Controls] Binding Events')
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        this.getCanvas().addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.getCanvas().addEventListener('wheel', this.handleMouseScroll.bind(this));
        this.getCanvas().addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.getCanvas().addEventListener('mouseup', this.endMouse.bind(this));
        this.getCanvas().addEventListener('mouseleave', this.endMouse.bind(this));
        this.getCanvas().addEventListener('mouseout', this.endMouse.bind(this));
        this.getCanvas().addEventListener('contextmenu', this.endMouse.bind(this));
        window.addEventListener('keydown', this.handleKeyDown.bind(this), true);
        return this;
    },

    handleKeyDown: function(e) {
        console.log('[CS3D:Controls] Key Down', e)
        const MOVE_SPEED = this.config.moveSpeed / 100;

        const KEY_CODE_UP = 38;
        const KEY_CODE_DOWN = 40;
        const KEY_CODE_LEFT = 37;
        const KEY_CODE_RIGHT = 39;
        e = e || window.event;

        switch (e.keyCode) {
            case KEY_CODE_UP:
                e.preventDefault();
                this.getCamera().position.y += MOVE_SPEED
                return false;
        
            case KEY_CODE_DOWN:
                e.preventDefault();
                this.getCamera().position.y -= MOVE_SPEED
                return false;

            case KEY_CODE_LEFT:
                e.preventDefault();
                this.getCamera().position.x -= MOVE_SPEED
                return false;

            case KEY_CODE_RIGHT:
                e.preventDefault();
                this.getCamera().position.x += MOVE_SPEED
                return false;

            default:
                break;
        }

        return this;
    },

    handleWindowResize: function ()
    {
        console.log('[CS3D:Controls] Window Resize')
        var canvas_width = this.getCamera().clientWidth;
        var canvas_height = this.getCamera().clientHeight;

        this.getCamera().aspect = canvas_width / canvas_height;
        this.core.renderer.setSize(canvas_width, canvas_height);

        return this;
    },

    handleMouseMove: function (e)
    {
        console.log('[CS3D:Controls] Mouse Move')
        if (!this.isUserRotating) {
            return;
        }
        console.log('Detected Mouse Move');
        let oldMousePos = this.xy || {x: 0, y: 0};
        let mousePos = {x: e.clientX, y: e.clientY};

        let delta = {
            x: (oldMousePos.x - mousePos.x),
            y: (oldMousePos.y - mousePos.y)
        };

        this.xy = mousePos;
        this.getModel().rotation.y -= (delta.x / 50);
        this.getModel().rotation.x -= (delta.y / 20)
    },

    handleMouseDown: function (e)
    {
        console.log('[CS3D:Controls] Mouse Down')
        console.log('Handling Mouse Down');
        this.isUserRotating = true;
        this.xy = {x: e.clientX, y: e.clientY}
    },

    endMouse: function () {
        console.log('[CS3D:Controls] Mouse End')
        console.log('End Mouse Capture');
        this.isUserRotating = false;
        return this;
    },

    handleMouseScroll: function (e)
    {
        console.log('[CS3D:Controls] Mouse Scroll')
        // Check if scroll direction is up
        if (e.deltaY > 0) {
            console.log('[CS3D:Controls] Zoom In')
            if (this.getModel().position.z >= this.config.zoomMax) {
                console.log('[CS3D:Controls] Max Zoom Hit')
                return this;
            }

            this.getModel().position.z += this.config.zoomStep;
            e.preventDefault();
            return this;
        }

        console.log('[CS3D:Controls] Zoom Out')

        if (this.getModel().position.z <= this.config.zoomMin) {
            console.log('[CS3D:Controls] Min Zoom Hit')
            return this;
        }

        this.getModel().position.z -= this.config.zoomStep;
        e.preventDefault();
        return this;
    },
}