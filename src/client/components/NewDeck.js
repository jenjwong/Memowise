import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

class NewDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    name = { name: name };
    this.refs.Name.value = '';
    this.promisePost(name)
    .then(
      res => {
        browserHistory.push('/create-card');
        return this.props.createDeck(res._id);
      }
    )
    .catch(
      err => console.log(err)
    );
  }

  render() {
    return (
      <div>
        <form className="new-form" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Deck Name" ref="Name" />
        <button className="btn cyan lighten-3" >
          Create New Deck
        </button>
        </form>
      </div>
    );
  }
}

NewDeck.propTypes = {
  createDeck: React.PropTypes.func,
};

export default NewDeck;
