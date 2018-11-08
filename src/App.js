import React, { Component } from "react";
import ImageDetails from "./components/ImageDetails";
import FullDetails from "./components/FullDetails";
import loading from "./giphy.gif";

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
  }

  componentDidMount() {
    fetch(getAreas)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          Areas: json
        });
      });
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
  }

  render() {
    if (this.state.Images !== null) {
      var images = this.state.Images.map(Images => {
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
      <section className="wrapper">
        <section>
          <section className="searchBorder">
            <form onSubmit={this.searchTitle}>
              <p>Search </p>
              <label>Title:</label>
              <input id="title" ref={title => (this.title = title)} required />
              <select id="searchWhat" ref={input => (this.searchWhat = input)}>
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
              <button type="submit">search</button>
            </form>
          </section>

          <section className="section left">
            {this.state.Images !== null && (
              <section>Image count: {this.state.Images.length} </section>
            )}

            {this.state.Images === null && (
              <section>No images found for {this.state.searchTerm}</section>
            )}

            <section>{images}</section>
          </section>
        </section>

        {this.state.isLoading && (
          <section>
            <img src={loading} alt={"loading"} />
          </section>
        )}
        <section className="section right">
          {this.state.imageDetails.title !== "" && (
            <section>
              <FullDetails
                title={this.state.imageDetails.title}
                description={this.state.imageDetails.description}
                area={this.state.imageDetails.area}
                AccessionNo={this.state.imageDetails.AccessionNo.trim()}
                classno={this.state.imageDetails.classno}
                dateofimage={this.state.imageDetails.dateofimage}
              />
            </section>
          )}
        </section>
      </section>
    );
  }
}

export default App;
