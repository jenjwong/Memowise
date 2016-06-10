import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Score = ({ score }) => {
  return (
    <div>
       Current Score : {score} 
    </div>
  );
};

Score.propTypes = {
  score: PropTypes.number,
};

export default Score;