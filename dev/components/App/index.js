import React from "react";
import crypto from "crypto";
import Loader from "../Loader";
import Header from "../Header";
import Character from "../Character";
import Filters from "../Filters";
import styles from "./app.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      filters: {
        name: {
          value: "",
          exactMatch: false,
        },
      },
      sortBy: "",
      characters: [],
      limitPerPage: 20,
    };
    this.applyFilters = this.applyFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  componentWillMount() {
    const { sortBy, } = this.state;
    this.getData({ sortBy, });
  }

  getData(options = {}) {
    this.setState({
      loading: true,
    });
    const { filters: flt, sortBy: srt, limitPerPage: lim,  } = this.state;
    const { page, name, exactMatch, sortBy, limit, } = Object.assign({ 
      page: 1,
      name: flt.name.value,
      exactMatch: flt.name.exactMatch,
      sortBy: srt,
      limit: lim,
    }, options);
    const offset = page ? (page - 1) * limit : 0;
    const marvelURL = "https://gateway.marvel.com/v1/public/",
      apiKey = `apikey=${API_PUBLIC_KEY}`;
    const ts = new Date().getTime();
    const hash = crypto.createHash("md5").update(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).digest("hex");
    
    let url = `${marvelURL}characters?${apiKey}&offset=${offset}&orderBy=${sortBy}name&limit=${limit}&ts=${ts}&hash=${hash}`;

    if (name) {
      if (exactMatch) url += `&name=${name}`;
      else url += `&nameStartsWith=${name}`;
    }

    fetch(url)
      .then(response => response.json())
      .then((response) => {
        if (response.code == 200) {
          if (offset > response.data.total) {
            throw new Error("Page does not exist.");
          } else {
            const pages = Math.floor(response.data.total / limit);
            this.setState({
              loading: false,
              characters: response.data.results,
            });
          }
        } else {
          throw new Error(
            `Marvel API bad response. Status code ${response.code}.`
          );
        }
      })
      .catch(e => {
        this.setState({
          characters: [],
        });
      });
  }

  applyFilters() {
    this.getData({
      name: this.filters.state.name.trim(),
      exactMatch: this.filters.state.exactMatch,
    });
  }

  resetFilters() {
    this.getData({ name: "", exactMatch: false, });
  }
  
  render() {
    const {
      loading,
      characters,
    } = this.state;
    return (
      <div>
        <div id="marvel_api">
          <div className={styles.app}>
            <Header />
            <nav className={styles.navbar}>
              <ul className={styles.nav}>
                <li className={styles.active}>
                  <a href="/"><span className={styles.h4}>Characters</span></a>
                </li>
              </ul>
            </nav>
            <Filters ref={filters => this.filters = filters} onApply={this.applyFilters} onReset={this.resetFilters} />
            {
              loading ? <Loader /> : (
                <div className={styles.app_characters}>
                  {
                    characters.length ? characters.map(c => <Character key={c.id} instance={c} />) : "find something cool"
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;