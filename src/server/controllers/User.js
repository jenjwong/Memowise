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
    });
  });
};

export default { updateScore };