import React, { PropTypes } from 'react';

const Score = ({ score }) => (
  <div>
    <h5 > <center> Total Score : {score} </center> </h5>
  </div>
  );

Score.propTypes = {
  score: PropTypes.number,
};

export default Score;
