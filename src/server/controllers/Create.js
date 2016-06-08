import Deck from '../models/Deck';
import cardMaker from '../services/CardMaker';

const createCard = (req, res) => {
  cardMaker.makeCard(req)
  .then(newCard => {
    var created = newCard.toObject();

    res
      .status(201)
      .type('json')
      .json(created);
  }).catch(error => {
    res
    .status(500)
    .type('json')
    .json({ error });
  });
};

const createDeck = (req, res) => {
  console.log('controller made deck', req.body);
  cardMaker.makeDeck(req)
  .then(newDeck => {
    var created = newDeck.toObject();
    console.log(created, 'CREATED!!!')
    res
      .status(201)
      .type('json')
      .json(created);
  }).catch(error => {
    res
    .status(500)
    .type('json')
    .json({ error });
  });
};

export default { createCard, createDeck };
