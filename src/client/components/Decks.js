import React, { PropTypes } from 'react';
import DeckItem from './DeckItem';
import { browserHistory } from 'react-router';

import Score from '../containers/Score';


const Decks = ({ decks, score }) => (
  <div className="container">
    <h4 className="center grey-text text-darken-4"> Decks </h4>
    <Score />
    <div className="card-list">
      <div className="card-columns">
        {decks.map((deck, idx) => <DeckItem key={idx} deck={deck} />)}
        <div className="new-deck-item">
          <div className="card-item">
            <div className="card-panel hoverable">
              <div className="card-content">
                <div className="card-title grey-text text-darken-4 center">
                  <strong>Create A New Deck</strong>
                </div>
                <div className="center">
                  <button onClick={() => { browserHistory.push('/create-deck'); }} className="btn cyan lighten-3">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {decks.map((deck, idx) => { 
          let level = store.getState().records.filter(function(record) {
            return record.deckId === deck._id;
          });
          console.log(level, 'level');
          return <DeckItem key={idx} deck={deck} record={level[0]}/>
        }
          )}
      </div>
    </div>
  </div>
);

Decks.propTypes = {
  decks: PropTypes.array.isRequired,
};

export default Decks;
