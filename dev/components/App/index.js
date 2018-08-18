import React from "react";
import axios from "axios";

import Loader from "../Loader";
import Artist from "../Character";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      isLoading: false,
      data: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    this.getData();
  }

  getData() {
    // const { search } = this.state;
    // window.fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${search}`)
    // 	.then(response => response.json())
    // 	.then((response) => {
    // 		this.setState({
    // 			isLoading: false,
    // 			data: response.artists,
    // 		});
    // 	})
    // 	.catch(console.error);
    
    const { search, } = this.state;

    axios(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${search}`)
      .then((response) => {
        this.setState({
          isLoading: false,
          data: response.data.artists,
        });
      })
      .catch(console.error);}

  handleChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      isLoading: true,
    });

    this.getData();
  }

  render() {
    const { isLoading, data, search, } = this.state;
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="search"
            onChange={this.handleChange}
            value={search}
          />
          <button type="submit">search</button>	
        </form>
        { isLoading ? (
          <Loader />
        ) : (
          data ? (
            data.map(item => (
              <Artist
                key={item.idArtist}
                data={item}
              />
            ))
          ) : (
            "find something cool"
          )
        )
        }
      </div>
    );
  }
}

export default App;