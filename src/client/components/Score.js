import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Score = ({ score }) => {
  console.log('inside score ', score);
  return (
    <div>
      <h3> Score : {score} </h3>
    </div>
  );
};

Score.propTypes = {
  score: PropTypes.number,
};

export default Score;