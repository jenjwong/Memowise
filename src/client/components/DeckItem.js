import React, { Component, PropTypes } from 'react';
import { selectDeck, checkLevel, updateLevel } from '../actions';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import DeckLastPlayed from './DeckLastPlayed';

const mapStateToProps = ({ level }) => ({ level });

// const mapDispatchToProps = (dispatch) => ({
// });

const mapDispatchToState = (dispatch) => ({
  setDeckState: (deck) => dispatch(selectDeck(deck)),
  checkLevel: (deckId, rating) => dispatch(updateLevel(level)),
  updateLevel: ({ level }) => dispatch(updateLevel({ level })),
});

class DeckItem extends Component {
  constructor(props) {
    super(props);
    this.chooseDeckToStudy = this.chooseDeckToStudy.bind(this);
    this.state = {
      lastPlayedAt: '',
    };
  }

  componentWillMount() {
    fetch(`/api/last-play/deck/${this.props.deck._id}`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(play => {
        this.setState({
          lastPlayedAt: (play && play.createdAt) || '',
        });
      });
      checkLevel(this.props.deck._id, 0);
  }

  chooseDeckToStudy() {
    this.props.setDeckState(this.props.deck);
    browserHistory.push(`/decks/${this.props.deck._id}/study`);
  }

  render() {
    return (
      <div className="card-item">
        <div className="card-panel hoverable">
          <div className="card-content">
            <div className="card-title grey-text text-darken-4 center">
              <strong>{this.props.deck.name}</strong>
              <h4> Level: {this.props.record.level} </h4>
            </div>
            <DeckLastPlayed date={this.state.lastPlayedAt} />
            <ProgressBar deck={this.props.deck} />
            <div className="center">
              <button onClick={this.chooseDeckToStudy} className="btn cyan lighten-3">
                Study
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeckItem.propTypes = {
  deck: PropTypes.object.isRequired,
  setDeckState: PropTypes.func.isRequired,
  checkLevel: PropTypes.func.isRequired,
  level: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired
};

DeckItem.defaultProps = {
  record: {
    level: 0,
  },
}

// export default connect(null, mapDispatchToState)(DeckItem);
// export default connect(mapStateToProps, mapDispatchToProps)(DeckItem);
export default connect(mapStateToProps, mapDispatchToState)(DeckItem);
