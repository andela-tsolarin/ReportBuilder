var app = angular.module('reportBuilderApp', []);

app.controller('BuilderCtrl', ['$scope', function($scope){

  $( "#toolbox li" ).draggable({
    helper: "clone"
  });

  $( "#page" ).droppable({

    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

      var droppedId = $( ui.draggable.context ).attr("id");
      
      if (droppedId == undefined) {

        var id = new Date().getTime();
        $( "<span/>", {
          id: id,
          "class": "page-content",
          text: "Your text here"
        }).appendTo( $( this ) );

        $( this ).find( "span#" + id ).draggable({ containment: "#page", scroll: false });
        
      }
    }

  });
  
}]);