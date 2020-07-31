/*
 * Define the game namespace
 */
var game = (function() {
  "use strict"

  return {

    data: {
      score : 0
    },

    onload() {
      if (!me.video.init(960, 640, {wrapper : "screen", scale : "auto", scaleMethod : "flex"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
      }

      me.audio.init("mp3,ogg");

      me.loader.preload(game.resources, () => this.onResourcesLoaded());
    },

    onResourcesLoaded() {
      me.state.set(me.state.MENU, new game.TitleScreen());
      me.state.set(me.state.PLAY, new game.PlayScreen());

      me.pool.register("mainPlayer", game.PlayerEntity);

      // Start the game.
      me.state.change(me.state.PLAY);
    }
  };

}());
