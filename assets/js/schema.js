var schema = {

  text: {
    tag: "span",
    attributes: {
      id: new Date().getTime(),
      "class": "page-element",
      text: "Your text here",
      datatype: "text",
      contenteditable: true
    }
  },

  image: {
    tag: "img",
    attributes: {
      id: new Date().getTime(),
      "class": "page-element",
      src: "/assets/img/ui.jpeg",
      datatype: "image",
      contenteditable: true
    }
  },

  box: {
    tag: "div",
    attributes: {
      id: new Date().getTime(),
      style: "border: 1px solid #333; height: 50px; width: 50px;",
      "class": "page-element",
      datatype: "box",
      contenteditable: true
    }
  }

};