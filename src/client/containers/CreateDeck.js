import { connect } from 'react-redux';
import NewDeck from '../components/NewDeck';
import { createDeck } from '../actions';

const mapStateToProps = ({ play }) => ({ play });

const mapDispatchToProps = (dispatch) => ({
  createDeck: (deckId, deckName) => dispatch(createDeck(deckId, deckName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
