import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const getCategories = async () => {
  const res = await axios.get(`${BASE_URL}/categories.php`);
  return res.data.categories;
};

const getRecipesByCategory = async (category) => {
  const res = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
  return res.data.meals;
};

export default {
  getCategories,
  getRecipesByCategory,
};