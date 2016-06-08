import React, {Component} from 'react';
import NewCardForm from './NewCardForm';

  class CreateDeckMain extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <NewCardForm createDeck={this.props.createDeck} />
        </div>
      );
    }
  }

export default CreateDeckMain;
