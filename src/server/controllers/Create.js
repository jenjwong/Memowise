import cardMaker from '../services/CardMaker';

const createCard = (req, res) => {
  cardMaker.makeCard(req)
  .then(newCard => {
    const created = newCard.toObject();

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
  cardMaker.makeDeck(req)
  .then(newDeck => {
    const created = newDeck.toObject();
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
