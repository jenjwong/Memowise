import * as types from '../constants/actionTypes';
import Auth from '../services/AuthService';
import { config } from '../config';

const url = `${config.api.protocol}://${config.api.host}:${config.api.port}`;

export const failedRequest = error => ({ type: types.ERR_FAILED_REQUEST, data: error });

export const signIn = user => ({ type: types.SIGN_IN, data: user });

export const signOut = () => ({ type: types.SIGN_OUT });

export const verifyAuthentication = () => (
  dispatch => {
    Auth.verify()
      .then(user => dispatch(signIn(user)))
      .catch(err => dispatch(failedRequest(err)));
  });

export const cancelAuthentication = () => (
  dispatch => {
    Auth.signOut()
      .then(() => dispatch(signOut()))
      .catch(err => dispatch(failedRequest(err)));
  });

export const receiveDecks = decks => ({ type: types.RECEIVE_DECKS, data: decks });

export const createDeck = (deckId, deckName) => ({ type: types.CREATE_DECK, data: { deckId, deckName } });

export const selectDeck = deck => ({ type: types.SELECT_DECK, data: deck });

export const fetchDecks = () => (
  dispatch => (
    fetch(`${url}/api/decks`, {
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(decks => dispatch(receiveDecks(decks)))
    .catch(err => dispatch(failedRequest(err)))
  ));

export const receiveCard = card => ({ type: types.RECEIVE_CARD, data: card });

export const fetchCard = (deckId) => {
  const payload = JSON.stringify({ deckId });

  return dispatch => (
    fetch(`${url}/api/card`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then(card => dispatch(receiveCard(card)))
    .catch(err => dispatch(failedRequest(err)))
  );
};

export const startPlay = (cardId, deckId) => ({ type: types.START_PLAY, data: { cardId, deckId } });

export const flipCard = () => ({ type: types.FLIP_CARD });

export const savePlay = (play, rating) => {
  const payload = JSON.stringify({ ...play, rating });
  return dispatch => (
    fetch(`${url}/api/play`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(() => dispatch({ type: types.FINISH_PLAY, data: rating }))
    .catch(err => dispatch(failedRequest(err)))
  );
};

export const updateScore = (score) => ({ type: types.UPDATE_SCORE, data: score  });
export const sendScore = (rating) => {
  const payload = JSON.stringify({ rating });
  return dispatch => (
    fetch(`${url}/api/user/score`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
      .then(res =>  res.json())
      .then(score => {
        dispatch(updateScore(score));
      })
      .catch(err => dispatch(failedRequest(err)))
    );
};

export const updateLevel = ({ record }) => ({ type: types.UPDATE_LEVEL, data: { record } });
export const checkLevel = (deckId, rating) => {
  const payload = JSON.stringify({ deckId, rating });
  return dispatch => (
    fetch(`${url}/api/user/levels`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then(({ record }) => {
      dispatch(updateLevel({ record }));
    })
    .catch(err => dispatch(failedRequest(err)))
  );
};

export const receiveRecords = (records) => ({ type: types.RECEIVE_RECORDS, data: records });
export const fetchRecords = () => (
 dispatch => (
    fetch(`${url}/api/user/fetchRecords`, {
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then((records) => dispatch(receiveRecords(records)))
    .catch(err => dispatch(failedRequest(err)))
  )
);

