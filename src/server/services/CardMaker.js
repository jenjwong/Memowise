import Cards from '../models/Card.js';
import Deck from '../models/Deck.js';

const makeCard = (req) => (
  Cards.create({
    question: { text: req.body.question },
    answer: { text: req.body.answer, explanation: req.body.explanation },
    deckId: req.body.deckId,
    userId: req.user._id,
  })
  .catch(error => error)
);


const makeDeck = (req) => (
  Deck.create({
    name: req.body.name,
  })
  .catch(error => error)
);

export default { makeCard, makeDeck };
