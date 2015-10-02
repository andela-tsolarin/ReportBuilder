var schema = {

  text: {
    tag: "p",
    attributes: {
      id: new Date().getTime(),
      "class": "page-element",
      text: "Your text here",
      datatype: "text"
    }
  },

  image: {
    tag: "img",
    attributes: {
      id: new Date().getTime(),
      "class": "page-element",
      src: "assets/img/placeholder.jpg",
      datatype: "image"
    }
  },

  box: {
    tag: "div",
    attributes: {
      id: new Date().getTime(),
      style: "border: 1px solid #333; height: 50px; width: 50px;",
      "class": "page-element",
      datatype: "box"
    }
  },

  table: {
    tag: "table",
    attributes: {
      id: new Date().getTime(),
      border: "1",
      html: "<tr><td></td><td></td></tr><tr><td></td><td></td></tr>",
      style: "height: 100px; width: 100px; table-layout: fixed;",
      "class": "page-element",
      datatype: "table"
    }
  }

};