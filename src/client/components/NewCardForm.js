import React, { PropTypes } from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';

class NewCardForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearForm() {
    this.refs.Question.value = '';
    this.refs.Answer.value = '';
    this.refs.Explantion.value = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    const question = this.refs.Question.value.trim();
    const answer = this.refs.Answer.value.trim();
    const explanation = this.refs.Explantion.value.trim();

    const newCard = {
      question,
      answer,
      explanation,
      deckId: this.props.createDeck.deckId,
    };

    this.clearForm();

    $.post('/api/create-card', newCard, (res) => {
      // implement update of redux-store after successful post
      window.console.log(res);
    })
    .fail(err => this.handleError(err));
  }

  render() {
    return (
      <form className="new-form flashcard-front" onSubmit={this.handleSubmit}>
        <div className="flashcard-close">
          <i className="material-icons" onClick={() => browserHistory.push('/dashboard')}>close</i>
        </div>
        <input type="text" placeholder="Question" ref="Question" />
        <input type="text" placeholder="Answer" ref="Answer" />
        <input type="text" placeholder="Explantion" ref="Explantion" />
        <div className="flashcard-buttons">
          <button className="btn btn-large cyan lighten-3" onClick={this.handleSubmit}>
            Save Card
          </button>
        </div>
      </form>
    );
  }
}

NewCardForm.defaultProps = {
  createDeck: { deckId: '', deckName: '' },
};

NewCardForm.propTypes = {
  createDeck: PropTypes.object.isRequired,
};

export default NewCardForm;
