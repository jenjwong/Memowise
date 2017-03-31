import { connect } from 'react-redux';
import StudyDeck from '../components/StudyDeck';
import { fetchCard, startPlay, flipCard, savePlay, sendScore, checkLevel } from '../actions';

const mapStateToProps = ({ deck, card, play }) => ({ deck, card, play });

const mapDispatchToProps = (dispatch) => ({
  fetchCard: (deck) => dispatch(fetchCard(deck)),
  flipCard: () => dispatch(flipCard()),
  startPlay: (cardId, deckId) => dispatch(startPlay(cardId, deckId)),
  savePlay: (play, rating) => dispatch(savePlay(play, rating)),
  sendScore: (rating) => dispatch(sendScore(rating)),
  checkLevel: (deckId, rating) => dispatch(checkLevel(deckId, rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyDeck);
