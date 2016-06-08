import React, {Component} from 'react';
import { createDeck } from '../actions';
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
    var name = this.refs.Name.value.trim();
    name = {name: name};

    this.refs.Name.value = '';

    this.promisePost(name)
    .then(
      res => {
        console.log('WHAT?! >>>>>', res, '<<<<res in resolved promise');
        browserHistory.push('/create-card');
        return this.props.createDeck(res._id);
      }
    )
    .catch(
      err => console.log(err)
    )
    //
    // $.post('/api/create-deck', name, (res) => {
    //   console.log('sucessful post to server');
    //   console.log(res);
    //   console.log(this.props.createDeck, 'CREATE_DECK');
    //   this.props.createDeck(res._id);
    //
    // })
    // .fail(err => this.handleError(err));
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
  //nameOfProp: React.propTypes.string,
  //nameOfProp: React.propTypes.number.isRequired
}

NewDeck.defaultProps = {
  //nameOfProp: 'this is the default text yay!';
}

export default NewDeck;
