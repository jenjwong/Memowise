import { Router } from 'express';

// controllers
import decks from '../controllers/Decks';
import plays from '../controllers/Plays';
import auth from '../controllers/Auth';
import createCard from '../controllers/Create';
import passport from 'passport';

const router = new Router();

/*
 * Decks
 */
router.route('/api/decks').get(auth.checkAuthServer, decks.findAll);
router.route('/api/card').post(auth.checkAuthServer, decks.findNextCard);
router.route('/api/progress').post(auth.checkAuthServer, decks.progress);

router.route('/api/create-card').post(auth.checkAuthServer, createCard.createCard);
router.route('/api/create-deck').post(auth.checkAuthServer, createCard.createDeck);

/*
 * Plays
 */
router.route('/api/play').post(auth.checkAuthServer, plays.create);
router.route('/api/last-play/deck/:deckId').get(auth.checkAuthServer, plays.findLatest);

/*
 * Auth
 */
router.route('/api/auth/create-account').post(auth.createAccount);
router.route('/api/auth/sign-in').post(auth.signIn);
router.route('/api/auth/verify').get(auth.verify);
router.route('/api/auth/sign-out').get(auth.signOut);
router.route('/api/auth/check-authorized').get(auth.checkAuthorized);

//
router.route('/api/auth/facebook').get(auth.authFacebook);
router.route('/api/auth/facebook/callback').get(auth.afterAuthFB);

export default router;
