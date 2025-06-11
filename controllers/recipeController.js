
import User from '../models/user.js';
import fetchExternalRecipes from '../utils/fetchExternalRecipes.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await fetchExternalRecipes.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getRecipesByCategory = async (req, res) => {
  try {
    const category = req.params.name;
    const recipes = await fetchExternalRecipes.getRecipesByCategory(category);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

export const addFavorite = async (req, res) => {
  const { idMeal, strMeal, strMealThumb, strCategory } = req.body;
  if (!idMeal || !strMeal || !strMealThumb) {
    return res.status(400).json({ error: 'Incomplete favorite data' });
  }

  try {
    const user = await User.findById(req.user.id);
    const exists = user.favorites.find(fav => fav.id === idMeal);
    if (exists) return res.status(400).json({ error: 'Recipe already favorited' });

    user.favorites.push({ id: idMeal, name: strMeal, image: strMealThumb, category: strCategory });
    await user.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(fav => fav.id !== req.params.idMeal);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};
