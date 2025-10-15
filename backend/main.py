from fastapi import FastAPI, Query
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # your frontend URL
    "https://smart-recipe-generator-six-hazel.vercel.app/",
    "https://smart-recipe-generator-logesh-kaavyans-projects-3171e207.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("../frontend/data/recipes.json") as f:
    recipes = json.load(f)

@app.get("/")
def home():
    return {"message": "API is working!"}

@app.get("/recipes/")
def get_recipes(
    ingredients: str = "",
    difficulty: str = Query("", description="Difficulty filter"),
    maxTime: int = Query(0, description="Max cooking time filter"),
    dietary: str = Query("", description="Dietary restrictions, comma separated")
):
    ingredients_list = [i for i in ingredients.lower().split(",") if i]
    dietary_list = [d for d in dietary.lower().split(",") if d]
    matched = []
    for r in recipes:
        # Ingredient filter
        if ingredients_list and not any(ing in ingredients_list for ing in r["ingredients"]):
            continue
        # Difficulty filter
        if difficulty and r.get("difficulty", "").lower() != difficulty.lower():
            continue
        # Max time filter
        if maxTime and r.get("time", 0) > maxTime:
            continue
        # Dietary filter
        if dietary_list:
            recipe_diet = [d.lower() for d in r.get("dietary", [])]
            # If any selected dietary restriction is present, include the recipe
            if not any(d in recipe_diet for d in dietary_list):
                continue
        matched.append(r)
    return {"recipes": matched}

@app.get("/suggestions/")
def get_suggestions(query: str):
    query = query.lower()
    suggestions = set()
    for r in recipes:
        for ing in r["ingredients"]:
            if query in ing:
                suggestions.add(ing)
    return {"suggestions": list(suggestions)[:5]}  # top 5

@app.get("/recipe/{name}")
def get_recipe(name: str):
    name = name.lower().replace("-", " ")
    for r in recipes:
        if r["name"].lower() == name:
            return r
    return {"error": "Recipe not found"}