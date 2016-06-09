import User from '../models/User';

const updateScore = (req, res, next) => {
  //console.log('req.body.rating is - ', req.body.rating);
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
      console.log ('user score in updateScore on server is = ', user.scoreTotal);
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

export default { updateScore };