import { connect } from 'react-redux';
import Scoreboard from '../components/Scoreboard';

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Scoreboard);
