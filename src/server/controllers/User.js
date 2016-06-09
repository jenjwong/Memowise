import User from '../models/User';

const updateScore = (req, res) => {
  console.log('req.body is - ', req.body);
  // User.findOne({ _id: req.user._id }, { scoreTotal: 1})
  // .then(score => {
  //   console.log('inside getScore in User.js - ', score);
  //   return res.json(score);
  // });
};

export default { updateScore };