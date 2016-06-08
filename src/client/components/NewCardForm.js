import React, {Component} from 'react';
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
    var question = this.refs.Question.value.trim();
    var answer = this.refs.Answer.value.trim();
    var explanation = this.refs.Explantion.value.trim();

    var newCard = {
      question: question,
      answer: answer,
      explanation: explanation,
      deckId: this.props.createDeck
    };

    console.log(this.props.createDeck, 'createDeck');

    this.clearForm();

    $.post('/api/create-card', newCard, (res) => {
      console.log('sucessful post to server');
      console.log(res);
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

NewCardForm.propTypes = {
//nameOfProp: React.propTypes.string,
//nameOfProp: React.propTypes.number.isRequired
}

NewCardForm.defaultProps = {
//nameOfProp: 'this is the default text yay!';
}

export default NewCardForm;
