import React, { Component } from "react";

const imgSrc =
  "http://interactive.stockport.gov.uk/stockportimagearchive/SIA/thumbnails/";

class ImageDetails extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: this.props.title,
      AccessionNo: this.props.AccessionNo,
      description: this.props.description,
      classno: this.props.classno,
      dateofimage: this.props.dateofimage,
      area: this.props.area,
      ImageDetails: {}
    };
    this.checkImageExists = this.checkImageExists.bind(this);
  }

  checkImageExists(image_url) {
    var http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    http.send();

    if (http.status === 404) {
      return "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
    } else {
      return image_url;
    }
  }

  render() {
    var imgSrcConfirmed = imgSrc + this.state.AccessionNo + ".jpg";

    imgSrcConfirmed = this.checkImageExists(
      imgSrc + this.state.AccessionNo + ".jpg"
    );

    return (
      <section className="imageBorder">
        <h3>{this.state.title}</h3>

        <img src={imgSrcConfirmed} text={this.state.title} width="100" />
        <button
          className="showMoreButton"
          onClick={() => {
            this.props.showImage(
              this.state.AccessionNo,
              this.state.title,
              this.state.description,
              this.state.area,
              this.state.dateofimage,
              this.state.classno
            );
          }}
        >
          Show more
        </button>
      </section>
    );
  }
}
export default ImageDetails;
