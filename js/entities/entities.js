(function() {
  "use strict"

  game.PlayerEntity = me.Entity.extend({

    /*
     * Entity constructor
     */
    init: function(x, y, settings) {
      // call the constructor
      this._super(me.Entity, 'init', [x, y , settings]);
    },

    /*
     * Gets called on each update
     */
    update: function(dt) {

      // Apply physics to the body (the body could move)
      this.body.update(dt);

      // Handle collisions against other shapes
      me.collision.check(this);

      // Return true if this must be redrawn
      // (the renderable was updated or this moved)
      return this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0;
    },

    /**
     * Gets called on collision with other objects
     */
    onCollision: function(response, other) {
      // Make all other objects solid
      return true;
    }
  });

}());
