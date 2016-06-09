import React from 'react';
import $ from 'jquery';

class NewCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  clearForm() {
    this.refs.Question.value = '';
    this.refs.Answer.value = '';
    this.refs.Explantion.value = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    let question = this.refs.Question.value.trim();
    let answer = this.refs.Answer.value.trim();
    let explanation = this.refs.Explantion.value.trim();

    let newCard = {
      question: question,
      answer: answer,
      explanation: explanation,
      deckId: this.props.createDeck,
    };

    this.clearForm();

    $.post('/api/create-card', newCard, (res) => {
    })
    .fail(err => this.handleError(err));
  }

  render() {
    return (
      <form className="new-form" onSubmit={this.handleSubmit.bind(this)}>
       <input type="text" placeholder="Question" ref="Question" />
       <input type="text" placeholder="Answer" ref="Answer" />
       <input type="text" placeholder="Explantion" ref="Explantion" />
       <input type="submit" value="Post" />
       </form>
    );
  }
}

NewCardForm.defaultProps = {
  createDeck: '',
};

export default NewCardForm;
