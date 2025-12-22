import {Router} from 'express';
import{requireAuth} from '../middleware/requireAuth.js';
import {addToWatchlist,addToWatched,getWatched} from '../controllers/movie.controller.js';

const router = Router();
router.post('/watchlist', requireAuth,addToWatchlist);
router.post('/watched',requireAuth, addToWatched);
router.get('/watched-by-me', requireAuth,getWatched);

export default router;