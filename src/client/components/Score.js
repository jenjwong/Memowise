import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Score = ({ score }) => {
  return (
    <div>
       <h5 > <center> Total Score : {score} </center> </h5> 
    </div>
  );
};

Score.propTypes = {
  score: PropTypes.number,
};

export default Score;