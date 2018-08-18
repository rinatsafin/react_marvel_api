import React from "react";
import PropTypes from "prop-types";

import Albums from "../Albums";
import styles from "./scss/Artist.scss";

const Artist = (props) => {
  const { data, } = props;
  return (
    <div>      
      <img
        className={styles.image}
        src={data.strArtistBanner || `http://placehold.it/1000x185/dddddd/000000?text=${data.strArtist}`}
        alt={data.strArtist}
      />
      
      <h2>{data.strArtist}</h2>
      
      <p>{data.strBiographyEN}</p>

      <Albums id={data.idArtist} />
    </div>
  )
}

Artist.propTypes = {
  // instance: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default Artist;