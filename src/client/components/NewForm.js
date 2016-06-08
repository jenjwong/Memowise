import React, {Component} from 'react';
import $ from 'jquery';

class NewForm extends React.Component {
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
      explanation: explanation
    };

    newCard = JSON.stringify(newCard);

    this.clearForm();

    $.post('/api/auth/create-card', newCard, () => {
      console.log('sucessful post to server');
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

NewForm.propTypes = {
//nameOfProp: React.propTypes.string,
//nameOfProp: React.propTypes.number.isRequired
}

NewForm.defaultProps = {
//nameOfProp: 'this is the default text yay!';
}

export default NewForm;
