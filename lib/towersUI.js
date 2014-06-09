(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var TowerUI = Hanoi.TowerUI = function(game){
    var ui = this;

    this.game = game;
    this.fromTower = null;
    this.toTower = null;


    $(document).ready(function() {
      $('section').on('click', 'ul', function(){
        if (ui.fromTower === null){

          var $from = $(event.target).parents('ul');
          var $fromId = $from.attr('id');

          ui.fromTower = parseInt($fromId);

          $from.toggleClass("highlight");

        } else {

          var $to = $(event.target).parents('ul');
          var $toId = $to.attr('id');

          ui.toTower = parseInt($toId);
          ui.game.takeTurn(ui.fromTower, ui.toTower);

          ui.fromTower = null;
          ui.toTower = null;

          ui.render();

          if (ui.game.isWon()) alert("You win!");
        }
      })
    });
  }

  TowerUI.prototype.render = function() {
    $("ul").removeClass("highlight")
    $("li").html("");

    var towers = this.game.towers;

    towers.forEach(function(el, i, arr){

      if(el.length !== 0){
        el.forEach(function(disc, j, arr){
          var divStr;
          var invertJ = (j - 2) * -1;

          switch(disc) {
            case 1:
              divStr = "<div id='small'></div>"; break;
            case 2:
              divStr = "<div id='medium'></div>"; break;
            case 3:
              divStr = "<div id='large'></div>"; break;
            default:
              break;
          };

          $('ul#' + i).children().eq(invertJ).html(divStr);
        });
    } });
  };

})(this);