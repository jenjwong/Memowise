import React, { PropTypes } from 'react';
import NewCardForm from './NewCardForm';

const CreateDeckMain = ({ createDeck }) => (
  <div>
    <h2 className="center grey-text text-darken-4">{createDeck.deckName}</h2>
    <div className="medium center container">
      <div className="flashcard flashcard-front">
        <NewCardForm createDeck={createDeck} />
      </div>
    </div>
  </div>
);

CreateDeckMain.propTypes = {
  createDeck: PropTypes.object.isRequired,
};

export default CreateDeckMain;
