var app = angular.module('reportBuilderApp', ['colorpicker.module']);

app.controller('BuilderCtrl', ['$scope', function($scope) {

  var selected = null;
  $scope.properties = {};

  $scope.$watch('css', function() { } );

  $( "#toolbox li" ).draggable({
    helper: "clone"
  });

  $( "#page" ).droppable({

    drop: function( event, ui ) {

      var droppedElement = $( ui.draggable.context );
      var droppedId = droppedElement.attr("id");
      var droppedType = droppedElement.attr("tool-type");
      
      if (droppedId == undefined && schema[droppedType]) {

        var element = $( "<" + schema[droppedType].tag + "/>", schema[droppedType].attributes );

        $( this ).append(element);
        var id = element.attr("id");

        $( this )
          .find( schema[droppedType].tag + "#" + id )
          .draggable({ containment: "#page", scroll: false });

        $( ".page-element" ).mousedown(function(){
          selected = $( this );
          toCssModel(selected);
        });
      }

    }

  });

  var toCssModel = function(element) {

    $scope.properties = {
      text: element.text(),
      css: {
        "font-size": parseInt(element.css("font-size").replace("px","")),
        "color": element.css("color")
      }
    };

    $scope.$apply();
  };

  $scope.toCss = function() {
    selected.text($scope.properties.text);
    for (var prop in $scope.properties.css) {
      selected.css(prop, $scope.properties.css[prop]);
    }
  };
  
}]);