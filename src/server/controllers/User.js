import User from '../models/User';

const getScore = (req, res) => {
  User.findOne({ name: req.body.userName }, { scoreTotal: 1 }).then(score => {
    return res.json(score);
  });
};