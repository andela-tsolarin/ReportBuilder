var app = angular.module('reportBuilderApp', []);

app.controller('BuilderCtrl', ['$scope', function($scope){

  $( "#toolbox li" ).draggable({
    helper: "clone"
  });

  $( "#paper" ).droppable({
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

      var id = new Date().getTime();
      $( "<span/>", {
        id: id,
        "class": "paper-child",
        text: "Your text here",
        style: "left: " + ui.position.left + "px; top: " + ui.position.top + "px;"
      }).appendTo( $( this ) );

      $( this ).find( "span#" + id ).draggable({ containment: "#paper", scroll: false });
    }
  });
  
}]);