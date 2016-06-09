import { connect } from 'react-redux';
import CreateDeckMain from '../components/CreateDeckMain';

const mapStateToProps = ({ createDeck }) => ({ createDeck });

export default connect(mapStateToProps)(CreateDeckMain);
