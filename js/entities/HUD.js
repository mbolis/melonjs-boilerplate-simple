(function() {
  "use strict"

  game.HUD = game.HUD || {};

  game.HUD.Container = me.Container.extend({

    init: function() {
      this._super(me.Container, 'init');

      // persistent across level changes
      this.isPersistent = true;

      // make sure we use screen coordinates
      this.floating = true;

      this.name = "HUD";

      this.addChild(new game.HUD.ScoreItem(5, 5));
    }
  });

  game.HUD.ScoreItem = me.Renderable.extend({

    init: function(x, y) {
      this._super(me.Renderable, 'init', [x, y, 10, 10]);

      // local copy of the global score
      this.score = -1;
    },

    update: function() {
      // return true if the score has been updated
      if (this.score !== game.data.score) {
        this.score = game.data.score;
        return true;
      }
      return false;
    },

    draw : function(context) {
      // TODO
    }

  });

}());
