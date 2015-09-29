var app = angular.module('reportBuilderApp', []);

app.controller('BuilderCtrl', ['$scope', function($scope){

  $( "#toolbox li" ).draggable({
    helper: "clone"
  });

  $( "#page" ).droppable({
    
    drop: function( event, ui ) {

      var droppedElement = $( ui.draggable.context );
      var droppedId = droppedElement.attr("id");
      var droppedType = droppedElement.attr("tool-type");
      
      if (droppedId == undefined && schema[droppedType]) {

        var element = $( schema[droppedType].tag, schema[droppedType].attributes );
        $( this ).append(element);
        var id = element.attr("id");

        $( this )
          .find( "span#" + id )
          .draggable({ containment: "#page", scroll: false });
      }

    }

  });
  
}]);