import React, { PropTypes } from 'react';
import NewCardForm from './NewCardForm';

const CreateDeckMain = ({ createDeck }) => (
  <div>
    <NewCardForm createDeck={createDeck} />
  }
  </div>
);

CreateDeckMain.propTypes = {
  createDeck: PropTypes.string.isRequired,
};

export default CreateDeckMain;
