var app = angular.module('reportBuilderApp', ['colorpicker.module']);

app.controller('BuilderCtrl', ['$scope', function($scope) {

  $scope.selected = null;
  $scope.datatype = null;
  $scope.properties = {};

  $scope.$watch('css', function() { } );

  $( ".resize-handle" ).click(function(event){
    event.stopPropagation();
  });

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
                          "overflow": "scroll",
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

    var id = $scope.selected.attr("id");
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

    if ($scope.datatype == 'table') {
      var rows = $("#" + id + " tr").length;
      var cols = $("#" + id + " tr:first td").length;
      var id = $scope.selected.attr("id");
      $scope.properties["rows"] = rows == 0 ? 2 : rows;
      $scope.properties["cols"] = cols == 0 ? 2 : cols;
    }

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

    if ($scope.datatype == 'table') {

      if ($scope.selected.rows == undefined) {
        $scope.selected.rows = 2;
        $scope.selected.cols = 2;
      }

      var id = $scope.selected.attr("id");
      var nrows = $scope.properties.rows;
      var ncols = $scope.properties.cols;

      var orows = $("#" + id + " tr").length;
      var ocols = $("#" + id + " tr:first td").length;

      if (orows < nrows) {
        var drows = nrows - orows;
        var html = "";
        for (var i = 0; i < drows; i++) {

          html += "<tr>";

          for (var j = 0; j < ncols; j++) {
            html += "<td></td>";
          }

          html += "</tr>";
        }

        $scope.selected.append(html);
      }
    }

  };

  $scope.trash = function() {
    $scope.selected.remove();
    clearSelection();
  };
  
}]);