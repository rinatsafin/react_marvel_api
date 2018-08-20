import React from "react";
import PropTypes from "prop-types";
import styles from "./filters.css";

class Filters extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      exactMatch: false,
    };

    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.handleKeyPress = this.handleKeyPress(this);
    this.changeFilterByName = this.changeFilterByName.bind(this);
    this.changeExactMatchFlag = this.changeExactMatchFlag.bind(this);
  }

  changeFilterByName(event, check) {
    this.setState({
      name: event.target.value,
    });
    if (check) this.submit(event);
  }
  
  reset(event) {
    if (event.key !== "Enter") {
      const { name, } = this.state;
      const { onReset, } = this.props;
      if (name.trim()) {
        this.setState({ name: "", });
        onReset();
      }
    }  
  }

  submit(event) {
    event.preventDefault();
    const { name, } = this.state;
    const { onApply, } = this.props;
    if (name.trim()) onApply();
  }

  changeExactMatchFlag(event) {
    this.setState({ exactMatch: event.target.checked, })
  }
  
  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.changeFilterByName(event, true);
    }
  }

  render() {
    const { name, exactMatch, } = this.state;
    return (
      <div className={styles.Filters}>
        <form onSubmit={this.submit}>
          <div className={styles.name}>Name</div>
          <input 
            className={styles.input_text} 
            type="text" 
            value={name} 
            onChange={this.changeFilterByName} 
            onKeyPress={this.handleKeyPress} 
            placeholder="Enter Hero name like: Spider-Man"
          />
          <div className={styles.wrap_check_box}>
            <input className={styles.check_box} type="checkbox" checked={exactMatch} onChange={this.changeExactMatchFlag} />
            {
              !exactMatch ? (
                <div className={styles.match_text}>Matching with names that begin with the specified string (e.g. Sp).</div>
              ) : (
                <div className={styles.match_text}>Match the specified full name (e.g. Spider-Man).</div>
              )
            }
          </div>
          <button className={styles.btn} type="button" onClick={this.reset}>RESET</button>
          <button className={styles.btn_red} type="submit">APPLY</button>
        </form>
      </div>
    );
  }
}

Filters.propTypes = {
  onApply: PropTypes.func,
  onReset: PropTypes.func,
};

Filters.defaultProps = {
  onApply: () => { },
  onReset: () => { },
};

export default Filters;