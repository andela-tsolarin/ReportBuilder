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
      src: "/assets/img/placeholder-img.jpg",
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
  }

};