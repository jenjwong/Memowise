import User from '../models/User';

const getScore = (req, res) => {
  User.findOne({ name: req.body.userName }, { scoreTotal: 1 }).then(score => {
    console.log('inside getScore in User.js');
    return res.json(score);
  });
};

export default { getScore };