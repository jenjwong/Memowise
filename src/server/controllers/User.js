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
      console.log ('record is - ', record);
      record.level = Math.floor(score/10);
      record.save(function(err) {
        if (err) { 
          return next(err);
        }
      });
    } else {
      
      console.log('new record created');
    }
    
    
  });
};

export default { updateScore, updateLevel };