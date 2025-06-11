import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  getCategories,
  getRecipesByCategory,
  getFavorites,
  addFavorite,
  removeFavorite
} from '../controllers/recipeController.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/category/:name', getRecipesByCategory);
router.get('/favorites', authMiddleware, getFavorites);
router.post('/favorites', authMiddleware, addFavorite);
router.delete('/favorites/:idMeal', authMiddleware, removeFavorite);

export default router;
