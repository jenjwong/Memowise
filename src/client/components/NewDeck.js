import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

class NewDeck extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  promisePost(name) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        url: '/api/create-deck',
        data: name,
        dataType: 'json',
      }).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = this.refs.Name.value.trim();
    name = { name };
    this.refs.Name.value = '';
    this.promisePost(name)
    .then(
      res => {
        browserHistory.push('/create-card');
        return this.props.createDeck(res._id, name.name);
      }
    )
    .catch(
      err => window.console.log(err)
    );
  }

  render() {
    return (
      <div className="container">
        <div className="medium center">
          <div className="flashcard flashcard-front">
            <form className="new-form" onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Deck Name" ref="Name" />
              <button className="btn cyan lighten-3" >
              Create New Deck
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NewDeck.propTypes = {
  createDeck: React.PropTypes.func,
};

export default NewDeck;
