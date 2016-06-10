import { connect } from 'react-redux';
import Score from '../components/Score';
import { updateScore } from '../actions';

const mapStateToProps = ({ score }) => ({ score });

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(updateScore(score))
});

export default connect(mapStateToProps)(Score);