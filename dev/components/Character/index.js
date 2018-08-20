import React from "react";
import PropTypes from "prop-types";
import styles from "./character.css";

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    const { instance, } = props;
    this.id = instance.id;
    this.name = instance.name;
    this.image = `${instance.thumbnail.path}.${instance.thumbnail.extension}`;
    this.description = !instance.description.length ? "Description not available." :
      instance.description.length > 150 ?
        instance.description.substring(0, 150).split("").concat("...").join("") :
        instance.description;
    this.fullDescription = !instance.description.length ? "Description not available." :
      instance.description;
    this.comics = instance.comics.items;
    this.series = instance.series.items;
    this.stories = instance.stories.items;
    this.detail = instance.urls.find(r => r.type === "detail");
    this.wiki = instance.urls.find(r => r.type === "wiki");
    this.comicLink = instance.urls.find(r => r.type === "comiclink");

    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
  }

  showDetails() {
    this.setState({ showModal: true, });
  }

  hideDetails() {
    this.setState({ showModal: false, });
  }

  render() {
    const {showModal, } = this.state;
    return (
      <div className={styles.character}>
        <div className={styles.character_name}><span className={styles.h3}>{this.name}</span></div>
        <div className={styles.caracter_image} style={{backgroundImage: `url('${this.image}')`,}} />
        <p className={styles.character_description}>
          {`${this.description}`}
        </p>
        <button type="button" className={styles.btn} onClick={this.showDetails}>Read more</button>
        {
          showModal ? (
            <div className={styles.modal}>
              <div className={styles.modal_content}>
                <button onClick={this.hideDetails} className={styles.close} type="button">&times;</button>
                <h1>{this.name}</h1>
                <img src={this.image} alt={this.name} className="modal_img" />
                <h4>Description</h4>
                <p>
                  {`${this.fullDescription}`}
                </p>
                <p>
                  {
                    this.detail &&
                    <a target="_blank" className="link" href={this.detail.url} rel="noopener noreferrer"> Read more on Marvel Official Page</a>
                  }
                </p>
                <p>
                  {
                    this.comicLink &&
                    <a target="_blank" className="link" href={this.comicLink.url} rel="noopener noreferrer">Read Comic Public Info</a>
                  }
                </p>
                <p>
                  {
                    this.wiki && 
                    <a target="_blank" className="link" href={this.wiki.url} rel="noopener noreferrer">Read more on Marvel Universe Wiki</a>
                  }
                </p>
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }
}

Character.propTypes = {
  instance: PropTypes.object.isRequired,
};

export default Character;