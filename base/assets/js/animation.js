export default {
    play: function(anim) {
        let idx = this.geo.animations.map(e => e.name).indexOf(anim);
        this.animationMixer.clipAction(this.geo.animations[idx]).play();
    },
}