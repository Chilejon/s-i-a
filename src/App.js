import React, { Component } from "react";
import ImageDetails from "./components/ImageDetails";
import FullDetails from "./components/FullDetails";
import { Column, Row } from "simple-flexbox";
import loading from "./images/smLoading.gif";

const getAreas = "http://interactive.stockport.gov.uk/siarestapi/v1/Getareas";
const API3 =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=3";
const GetPhotosSearchTitle =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTitle/?term=";
const GetPhotoByID =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=";
const GetPhotosSearchAll =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTerm?term=";
const GetPhotosByTermAndArea =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTermArea/?term=";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Images: [],
      Areas: [],
      DisplayMissCount: 0,
      DisplayCount: 5,
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: ""
      },
      searchTerm: "",
      searchWhat: [
        { id: "title", value: "Title" },
        { id: "all", value: "All" },
        { id: "allarea", value: "All/Area" }
      ],
      isLoading: false
    };
    this.searchTitle = this.searchTitle.bind(this);
    this.showImage = this.showImage.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    if (this.state.Areas.length === 0) {
      fetch(getAreas)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.setState({
            Areas: json
          });
        });
    }
  }
  searchTitle(e) {
    this.setState({ Images: [], isLoading: true });
    var apiLink = "";
    switch (this.searchWhat.value) {
      case "all":
        apiLink = GetPhotosSearchAll + this.title.value;
        break;
      case "title":
        apiLink = GetPhotosSearchTitle + this.title.value;
        break;
      case "allarea":
        apiLink =
          GetPhotosByTermAndArea +
          this.title.value +
          "&area=" +
          this.Areas.value;
        break;
    }

    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          Images: json,
          isLoading: false
        });
      });
    this.setState(
      (this.state.imageDetails = {
        title: ""
      })
    );
    this.setState({ searchTerm: this.title.value });
    e.preventDefault();
    this.title.value = "";
    this.searchWhat.value = "title";
  }

  showImage(AccessionNo, title, description, area, dateofimage, classno) {
    this.setState({
      imageDetails: {
        AccessionNo: AccessionNo,
        title: title,
        description: description,
        area: area,
        classno: classno,
        dateofimage: dateofimage
      }
    });
    window.scrollTo(0, 0);
  }

  goBack() {
    alert("go back");
  }

  render() {
    if (this.state.Images !== null) {
      var imagesDisplayedCount = 0;
      var images = this.state.Images.map(Images => {
        imagesDisplayedCount = imagesDisplayedCount + 1;
        if (imagesDisplayedCount <= this.state.DisplayCount)
          return (
            <ImageDetails
              title={Images.title}
              AccessionNo={Images.AccessionNo.trim()}
              description={Images.description.trim()}
              area={Images.area}
              dateofimage={Images.dateofimage.trim()}
              classno={Images.classno.trim()}
              getImage={this.getImage}
              showImage={this.showImage}
            />
          );
      });
    } else {
    }
    {
      console.log(this.state.isLoading);
    }
    return (
      <section>
        <Column flexGrow={1}>
          <Row horizontal="left">
            <section className="searchBorder">
              <form onSubmit={this.searchTitle}>
                <p>Search </p>
                <label>Title:</label>
                <input
                  id="title"
                  ref={title => (this.title = title)}
                  required
                  size="16"
                />
                <select
                  id="searchWhat"
                  ref={input => (this.searchWhat = input)}
                >
                  {this.state.searchWhat.map(dd => (
                    <option key={dd.id} value={dd.id}>
                      {dd.value}
                    </option>
                  ))}
                </select>
                <select id="Areas" ref={input => (this.Areas = input)}>
                  {this.state.Areas.map(dd => (
                    <option key={dd.ID} value={dd.ID}>
                      {dd.Area1}
                    </option>
                  ))}
                </select>

                {this.state.isLoading ? (
                  <img src={loading} alt={"loading"} width="20" height="20" />
                ) : (
                  <button className="showMoreButton" type="submit">
                    search
                  </button>
                )}
              </form>

              {this.state.Images !== null && (
                <section>Image count: {this.state.Images.length} </section>
              )}

              {this.state.Images === null ? (
                <section>
                  No images found for <strong>{this.state.searchTerm}</strong>
                </section>
              ) : (
                this.state.searchTerm !== "" && (
                  <section>
                    Searched for <strong>{this.state.searchTerm}</strong>
                  </section>
                )
              )}
            </section>
          </Row>
          <Row vertical="top">
            <Column flexGrow={1} horizontal="left">
              {this.state.searchTerm !== "" && (
                <section>
                  <button onClick={this.goBack()}>Back</button>
                  {this.state.DisplayCount}
                  <button>Forward</button>
                </section>
              )}
              {images}
            </Column>
            <Column flexGrow={1} horizontal="right">
              {this.state.imageDetails.title !== "" && (
                <FullDetails
                  title={this.state.imageDetails.title}
                  description={this.state.imageDetails.description}
                  area={this.state.imageDetails.area}
                  AccessionNo={this.state.imageDetails.AccessionNo.trim()}
                  classno={this.state.imageDetails.classno}
                  dateofimage={this.state.imageDetails.dateofimage}
                />
              )}
            </Column>
          </Row>
        </Column>
      </section>
    );
  }
}

export default App;
