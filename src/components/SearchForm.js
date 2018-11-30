import React, { Component } from "react";
import loading from "./../images/smLoading.gif";

class SearchForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchTerm: "",
      searchWhat: [
        { id: "title", value: "Title" },
        { id: "all", value: "All" },
        { id: "allarea", value: "All/Area" }
      ],
      isLoading: false
    };
  }

  render() {
    return (
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
          <select id="searchWhat" ref={input => (this.searchWhat = input)}>
            {this.state.searchWhat.map(dd => (
              <option key={dd.id} value={dd.id}>
                {dd.value}
              </option>
            ))}
          </select>
          <select id="Areas" ref={input => (this.Areas = input)}>
            {this.props.Areas.map(dd => (
              <option key={dd.ID} value={dd.ID}>
                {dd.Area1}
              </option>
            ))}
          </select>
          <select
            id="PaginationSize"
            ref={input => (this.PaginationSize = input)}
          >
            <option key="5" value="5">
              5
            </option>
            <option key="10" value="10">
              10
            </option>
            <option key="20" value="20">
              20
            </option>
          </select>

          {this.state.isLoading ? (
            <img src={loading} alt={"loading"} width="20" height="20" />
          ) : (
            <button
              onClick={() => {
                this.props.searchTitle(
                  this.PaginationSize,
                  this.title,
                  this.searchWhat,
                  this.Areas
                );
              }}
            >
              <h2 className="green">Search</h2>
            </button>
          )}
        </form>
      </section>
    );
  }
}
export default SearchForm;
