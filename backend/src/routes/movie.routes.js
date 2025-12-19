import {Router} from 'express';
import {addToWatchlist,addToWatched,getWatched} from '../controllers/movie.controller.js';

const router = Router();
router.post('/watchlist', addToWatchlist);
router.post('/watched', addToWatched);
router.get('/watched/:userId', getWatched);

export default router;