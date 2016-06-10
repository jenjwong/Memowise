import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { GREAT, OKAY, BAD } from '../constants/play';

class StudyDeck extends React.Component {
  constructor(props) {
    super(props);
    this.loadCard = this.loadCard.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    this.loadCard();
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.contain).focus();
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.contain).focus();
  }

  loadCard() {
    if (this.refs.contain) {
      ReactDOM.findDOMNode(this.refs.contain).focus();
    }
    this.props.fetchCard(this.props.deck._id)
      .then(({ data }) => this.props.startPlay(data._id, data.deckId));
  }

  handlePlay(play, rank) {
    ReactDOM.findDOMNode(this.refs.contain).focus();
    this.props.savePlay(play, rank)
      .then(() => this.loadCard());
  }

  handleKeyPress(e) {
    const { play } = this.props;
    switch (e.keyCode) {
      case 32: // space
        this.props.flipCard();
        break;
      case 37: // left
        this.handlePlay(play, BAD);
        break;
      case 38: // up
        this.props.flipCard();
        break;
      case 39: // right
        this.handlePlay(play, GREAT);
        break;
      case 40: // down
        this.handlePlay(play, OKAY);
        break;
      default:
        window.console.log('NOTHING?!');
    }
  }

  showCardFront() {
    const { card: { question } } = this.props;
    return (
      <div className="flashcard flashcard-front">
        <div className="flashcard-close">
          <i className="material-icons" onClick={() => browserHistory.push('/dashboard')}>close</i>
        </div>
        <div className="flashcard-title">
          <ReactMarkdown source={(question && question.text) || ''} />
        </div>
        <div className="flashcard-buttons">
          <button
            onClick={this.props.flipCard}
            className="btn btn-large cyan lighten-3"
          > Flip Card </button>
        </div>
      </div>
    );
  }

  showCardBack() {
    const { card: { answer }, play } = this.props;
    return (
      <div className="flashcard flashcard-back">
        <div className="flashcard-close">
          <i className="material-icons" onClick={() => browserHistory.push('/dashboard')}>close</i>
        </div>
        <div className="flashcard-title">
          <ReactMarkdown source={(answer && answer.text) || ''} />
        </div>
        <p><strong>Explanation:</strong></p>
        <ReactMarkdown source={(answer && answer.explanation) || ''} />
        <div className="flashcard-buttons">
          <p>How well did you do?</p>
          <div>
            <button
              onClick={() => this.handlePlay(play, BAD)}
              className="btn btn-large cyan lighten-3"
            >
              <i className="material-icons">thumb_down</i>
            </button>
            <button
              onClick={() => this.handlePlay(play, OKAY)}
              className="btn btn-large cyan lighten-3"
            >
              <i className="material-icons">help</i>
            </button>
            <button
              onClick={() => this.handlePlay(play, GREAT)}
              className="btn btn-large cyan lighten-3"
            >
              <i className="material-icons">thumb_up</i>
            </button>
            <div className="flashcard-controls tooltip lighten-3">
              <i className="small material-icons">keyboard_hide</i>
              <span className="tooltiptext">
                <div className="tooltip-line">
                  <i className="material-icons">arrow_forward</i><span className="span-text"> for  </span><i className="material-icons">thumb_up</i>
                </div>
                <div className="tooltip-line">
                  <i className="material-icons">arrow_downward</i><span className="span-text"> for  </span><i className="material-icons">help</i>
                </div>
                <div className="tooltip-line">
                  <i className="material-icons">arrow_back</i><span className="span-text"> for  </span><i className="material-icons">thumb_down</i>
                </div>
                <div className="tooltip-line">
                  <i className="material-icons">space_bar</i><span className="span-text"> for  </span><i className="material-icons">skip_next</i>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { play: { side }, deck } = this.props;
    return (
      <div ref="contain" tabIndex={0} className="container flash-container" onKeyUp={this.handleKeyPress}>
        <h2 className="center grey-text text-darken-4">{deck.name}</h2>
        <div className="medium center">
          {!side ? this.showCardFront() : this.showCardBack()}
        </div>
      </div>
    );
  }
}

StudyDeck.propTypes = {
  deck: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  play: PropTypes.object.isRequired,
  fetchCard: PropTypes.func.isRequired,
  flipCard: PropTypes.func.isRequired,
  startPlay: PropTypes.func.isRequired,
  savePlay: PropTypes.func.isRequired,
};

export default StudyDeck;
