import User from '../models/User';
import Levels from '../models/Levels';

const updateScore = (req, res, next) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      return next(err);
    }
    user.scoreTotal += req.body.rating;
    user.save((error) => {
      if (error) {
        return next(error);
      }
      return null;
    })
    .then(user1 => {
      res.json(user1.scoreTotal);
    })
    .catch(error => {
      res
        .status(500)
        .type('json')
        .json({ error });
    });
    return null;
  });
};

const updateLevel = (req, res, next) => {
  Levels.findOne({ userId: req.user._id, deckId: req.body.deckId }, (err, record) => {
    if (err) {
      return next(err);
    }
    if (record) {
      record.score += req.body.rating;
      record.level = Math.floor(record.score / 10) + 1;
    } else {
      const newRecord = new Levels({
        deckId: req.body.deckId,
        userId: req.user._id,
        score: req.body.rating,
        level: 1,
      });
      record = newRecord;
    }

    record.save((Err) => {
      if (Err) {
        return next(Err);
      }
      return null;
    }).then(Record => {
      res.json({ Record });
    })
    .catch(error => {
      res
        .status(500)
        .type('json')
        .json({ error });
    });
    return null;
  });
};

const fetchRecords = (req, res) => {
  Levels.find({ userId: req.user._id })
  .then((records) => {
    res
      .status(200)
      .type('json')
      .json(records);
  });
};

export default { updateScore, updateLevel, fetchRecords };
