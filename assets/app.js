var app = angular.module('reportBuilderApp', ['colorpicker.module']);

app.controller('BuilderCtrl', ['$scope', function($scope) {

  $scope.selected = null;
  $scope.datatype = null;
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
          $scope.selected = $( this );
          $scope.datatype = $scope.selected.attr("datatype");
          toCssModel();
        });
      }

    }

  });

  var toCssModel = function() {

    $scope.properties = {
      text: $scope.selected.text(),
      css: {
        "font-size": parseInt($scope.selected.css("font-size").replace("px","")),
        "color": $scope.selected.css("color"),
        "width": parseInt($scope.selected.css("width").replace("px","")),
        "height": parseInt($scope.selected.css("height").replace("px",""))
      },
      attr: {
        "src": $scope.selected.attr("src")
      }
    };

    $scope.$apply();
  };

  $scope.toCss = function() {
    $scope.selected.text($scope.properties.text);

    for (var prop in $scope.properties.css) {
      $scope.selected.css(prop, $scope.properties.css[prop]);
    }

    for (var attr in $scope.properties.attr) {
      $scope.selected.attr(attr, $scope.properties.attr[attr]);
    }
  };

  $scope.trash = function() {
    $scope.selected.remove();
    $scope.selected = null;
    $scope.datatype = null;
    $scope.properties = {};
  };
  
}]);