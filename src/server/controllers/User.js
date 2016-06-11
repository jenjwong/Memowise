import User from '../models/User';
import Levels from '../models/Levels';

const updateScore = (req, res, next) => {
  User.findOne({ _id: req.user._id }, function(err, user) {
    if (err) {
      return next(err);
    }
    user.scoreTotal += req.body.rating;
    user.save(function(err) {
      if (err) { 
        return next(err);
      }
    })
    .then(user => {
      res.json(user.scoreTotal);
    })
    .catch(error => {
      res
        .status(500)
        .type('json')
        .json({ error });
    });
  });
};

const updateLevel = (req, res, next) => {
  Levels.findOne({ userId: req.user._id, deckId: req.body.deckId }, function(err, record) {
    if (err) {
      return next(err);
    }
    if (record) {
      record.score += req.body.rating;
      //console.log ('record found - ', record);
      record.level = Math.floor(record.score/10) + 1;
    } else {
        var record = new Levels ({
          deckId: req.body.deckId,
          userId: req.user._id,
          score: req.body.rating,
          level: 1
      });
      //console.log('new record created', record);
    }

    record.save(function(err) {
      if (err) { 
        return next(err);
      }
    }).then(record => {
      //console.log ('record.score is : ', record.score);
      //console.log ('record.level is : ', record.level);
      res.json(record.level);
    })
    .catch(error => {
      res
        .status(500)
        .type('json')
        .json({ error });
    });
    
  });
};

export default { updateScore, updateLevel };