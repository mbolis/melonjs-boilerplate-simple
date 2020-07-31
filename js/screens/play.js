(function() {
  "use strict"

  /*
   * Main game-screen skeleton
   */
  game.PlayScreen = me.Stage.extend({

    // Gets called when entering the screen
    onResetEvent: function() {

      game.data.score = 0;

      // Add our HUD to the game world
      this.HUD = new game.HUD.Container();
      me.game.world.addChild(this.HUD);
    },

    // Gets called when leaving the screen
    onDestroyEvent: function() {
      // remove the HUD from the game world
      me.game.world.removeChild(this.HUD);
    }
  });

}());
