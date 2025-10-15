// utils/api.js
export async function getRecipes(ingredients, filters = {}) {
  const params = new URLSearchParams();
  params.append("ingredients", ingredients);
  if (filters.difficulty) params.append("difficulty", filters.difficulty);
  if (filters.maxTime && filters.maxTime !== 60) params.append("maxTime", filters.maxTime);
  if (filters.dietary && filters.dietary.length > 0) params.append("dietary", filters.dietary.join(","));
  const res = await fetch(`http://127.0.0.1:8000/recipes/?${params.toString()}`);
  return res.json();
}

export async function getSuggestions(query) {
  if (!query) return { suggestions: [] };
  const res = await fetch(`http://127.0.0.1:8000/suggestions/?query=${query}`);
  return res.json();
}

export async function getRecipe(name) {
  const res = await fetch(`http://127.0.0.1:8000/recipe/${name}`);
  return res.json();
}