import React, {Component} from 'react';

class NewDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <button className="btn cyan lighten-3">
          Create New Deck
        </button>
      </div>
    );
  }
}

NewDeck.propTypes = {
  //nameOfProp: React.propTypes.string,
  //nameOfProp: React.propTypes.number.isRequired
}

NewDeck.defaultProps = {
  //nameOfProp: 'this is the default text yay!';
}

export default NewDeck;
