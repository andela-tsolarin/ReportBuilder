var app = angular.module('reportBuilderApp', ['colorpicker.module']);

app.controller('BuilderCtrl', ['$scope', function($scope) {

  $scope.selected = null;
  $scope.datatype = null;
  $scope.properties = {};

  $scope.$watch('css', function() { } );

  $( "#toolbox li" ).draggable({
    helper: "clone"
  });

  var n_height = 0;
  $( ".resize-handle[direction=north]" ).draggable({
    axis: "y",
    containment: "#page",
    scroll: false,
    start: function() {
      n_height = parseInt($scope.selected.css("height").replace("px",""));
    },
    drag: function(evt, pos) {
      var original = pos.originalPosition.top + 4;
      var current = pos.position.top + 4;
      var change = current - original;
      var width = $scope.selected.css("width");
      var height = n_height - change;

      $scope.selected.css({
        "top": current,
        "width": width,
        "height": height
      });

      positionResizeHandles();
      $scope.properties.css['height'] = height;
      $scope.$apply();
    }
  });

  var s_height = 0;
  $( ".resize-handle[direction=south]" ).draggable({
    axis: "y",
    containment: "#page", 
    scroll: false,
    start: function() {
      s_height = parseInt($scope.selected.css("height").replace("px",""));
    },
    drag: function(evt, pos) {
      var original = pos.originalPosition.top + 4;
      var current = pos.position.top + 4;
      var change = current - original;
      var width = $scope.selected.css("width");
      var height = s_height + change;

      $scope.selected.css({
        "height": height,
        "width": width
      });

      positionResizeHandles();
      $scope.properties.css['height'] = height;
      $scope.$apply();
    }
  });

  var w_width = 0;
  $( ".resize-handle[direction=west]" ).draggable({
    axis: "x",
    containment: "#page", 
    scroll: false,
    start: function() {
      w_width = parseInt($scope.selected.css("width").replace("px",""));
    },
    drag: function(evt, pos) {
      var original = pos.originalPosition.left + 4;
      var current = pos.position.left + 4;
      var change = current - original;
      var height = $scope.selected.css("height");
      var width = w_width - change;

      $scope.selected.css({
        "left": current,
        "width": width,
        "height": height
      });

      positionResizeHandles();
      $scope.properties.css['width'] = width;
      $scope.$apply();
    }
  });

  var e_width = 0;
  $( ".resize-handle[direction=east]" ).draggable({
    axis: "x",
    containment: "#page", 
    scroll: false,
    start: function() {
      e_width = parseInt($scope.selected.css("width").replace("px",""));
    },
    drag: function(evt, pos) {
      var original = pos.originalPosition.left + 4;
      var current = pos.position.left + 4;
      var change = current - original;
      var height = $scope.selected.css("height");
      var width = e_width + change;

      $scope.selected.css({
        "width": width,
        "height": height
      });

      positionResizeHandles();
      $scope.properties.css['width'] = width;
      $scope.$apply();
    }
  });

  $( "#page" ).droppable({

    drop: function( event, ui ) {

      var offset = $(this).offset(),
          x = event.pageX - offset.left,
          y = event.pageY - offset.top; 

      var droppedElement = $( ui.draggable.context );
      var droppedId = droppedElement.attr("id");
      var droppedType = droppedElement.attr("tool-type");
      
      if (droppedId == undefined && schema[droppedType]) {

        var element = $( "<" + schema[droppedType].tag + "/>", schema[droppedType].attributes )
                      .css({
                          "position": "absolute",
                          "overflow": "hidden",
                          "left": x,
                          "top": y
                        });

        $( this ).append(element);
        var id = element.attr("id");

        element = $( this )
                    .find( schema[droppedType].tag + "#" + id )
                    .draggable({ 
                      containment: "#page", 
                      scroll: false,
                      drag: function() {
                        positionResizeHandles();
                      },
                      stop: function() {
                        positionResizeHandles();
                      }
                    });

        $( ".page-element" ).mousedown(function(){

          clearSelection();
          $scope.selected = $( this );
          $scope.datatype = $scope.selected.attr("datatype");
          $scope.selected.addClass("selected");
          positionResizeHandles();
          toCssModel();

        });

        $( ".page-element" ).click(function(event){
          event.stopPropagation();
        });
      }

    }

  });

  $( "#page" ).on('click', function() {
    clearSelection();
    $scope.$apply();
  });

  var clearSelection = function() {
    $(".resize-handle").hide();
    $( ".page-element" ).removeClass("selected");
    $scope.selected = null;
    $scope.datatype = null;
    $scope.properties = {};
  };

  var positionResizeHandles = function() {

    var left = parseInt($scope.selected.css("left").replace("px",""));
    var top = parseInt($scope.selected.css("top").replace("px",""));

    var width = parseInt($scope.selected.css("width").replace("px",""));
    var height = parseInt($scope.selected.css("height").replace("px",""));

    var right = left + width;
    var bottom = top + height;

    var hcenter = width / 2;
    var vcenter = height / 2;

    $(".resize-handle[direction=north]")
      .css({
        "position": "absolute",
        "left": hcenter + left,
        "top": top - 4
      });

    $(".resize-handle[direction=south]").css({
      "position": "absolute",
      "left": hcenter + left,
      "top": (top + height) - 4
    });

    $(".resize-handle[direction=west]").css({
      "position": "absolute",
      "left": left - 4,
      "top": (top + vcenter) - 4
    });

    $(".resize-handle[direction=east]").css({
      "position": "absolute",
      "left": (left + width) - 4,
      "top": (top + vcenter) - 4
    });

    $(".resize-handle").show();

  };

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
    clearSelection();
  };

  var readFile = function(input) {
    if (input.files && input.files[0]) {
          
      var file = input.files[0];
      
      var reader = new FileReader();
      
      reader.onload = function(e) {
        var data = e.target.result;
        $( "#src" ).val(data);
      }
      
      reader.readAsDataURL(input.files[0]);
    }
  };
  
}]);