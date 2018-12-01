import React, { Component } from "react";
import ImageDetails from "./components/ImageDetails";
import FullDetails from "./components/FullDetails";
import SearchForm from "./components/SearchForm";
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
    this.moveBackFwd = this.moveBackFwd.bind(this);
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
  searchTitle(PaginationSize, title, area, searchWhat) {
    this.setState({
      Images: [],
      isLoading: true,
      DisplayCount: PaginationSize.value
    });
    var apiLink = "";
    switch (searchWhat.value) {
      case "1":
        apiLink = GetPhotosSearchAll + title.value;
        break;
      case "2":
        apiLink = GetPhotosSearchTitle + title.value;
        break;
      case "3":
        apiLink = GetPhotosByTermAndArea + title.value + "&area=" + area.value;
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
    alert("dkjdjd " + this.state.Images);
    alert(apiLink);
    alert(this.state.Images);
    this.setState({ searchTerm: title });
    //this.preventDefault();
    //title = "";
    //this.searchWhat.value = "title";
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

  moveBackFwd(direction) {
    var newDisplayMissCount = 0;

    if (direction === "fwd") {
      newDisplayMissCount =
        this.state.DisplayMissCount + this.state.DisplayCount;
    } else {
      newDisplayMissCount =
        this.state.DisplayMissCount - this.state.DisplayCount;
    }

    this.setState({
      DisplayMissCount: newDisplayMissCount
    });
  }

  render() {
    if (this.state.Images !== null) {
      var imagesDisplayedCount = 1;
      var imagesInTotal = 0;
      var images = this.state.Images.map(Images => {
        imagesInTotal = imagesInTotal + 1;
        if (imagesInTotal > this.state.DisplayMissCount) {
          if (imagesDisplayedCount <= this.state.DisplayCount) {
            imagesDisplayedCount = imagesDisplayedCount + 1;
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
          }
        }
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
            <SearchForm
              Areas={this.state.Areas}
              searchTitle={this.searchTitle}
            />

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
          </Row>
          <Row vertical="top">
            <Column flexGrow={1} horizontal="left">
              {this.state.searchTerm !== "" && (
                <section>
                  <button
                    onClick={() => {
                      this.moveBackFwd("back");
                    }}
                  >
                    Back
                  </button>
                  {this.state.DisplayCount}
                  <button
                    onClick={() => {
                      this.moveBackFwd("fwd");
                    }}
                  >
                    Forward
                  </button>
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
