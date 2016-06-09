import User from '../models/User';

const getScore = (req, res) => {
  console.log('userid - ', req.user._id);
  User.findOne({ _id: req.user._id }, { scoreTotal: 1})
  .then(score => {
    console.log('inside getScore in User.js - ', score);
    return res.json(score);
  });
};

export default { getScore };