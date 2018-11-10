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
  }

  render() {
    return (
      <section className="imageBorder">
        <h3>{this.state.title}</h3>

        <img
          src={imgSrc + this.state.AccessionNo + ".jpg"}
          text={this.state.title}
        />
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
