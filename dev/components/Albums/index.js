import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class Albums extends React.Component {
  constructor() {
    super();

    this.state = {
      albumsData: null,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    const { id, } = this.props;
    axios(`https://theaudiodb.com/api/v1/json/1/album.php?i=${id}`)
      .then((response) => {
        this.setState({
          albumsData: response.data.album,
        });
      })
      .catch(console.error);
  }

  render() {
    const { albumsData, } = this.state;
    return (
      albumsData ? (
        albumsData.map(album => (
          <div key={album.idAlbum}>
            <img
              style={{ width: "200", }}
              src={album.strAlbumThumb}
              alt={album.strAlbum}
            />
            <h3>{album.strAlbum}</h3>	
          </div>
        ))
      ) : (
        "Loading"
      )
    );
  }
}

Albums.propTypes = {
  // instance: PropTypes.object.isRequired,
  // arr: PropTypes.instanceOf(PropTypes.Array),
  // arr_new: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
};

export default Albums;

