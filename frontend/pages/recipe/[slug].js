"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import recipesData from "../../data/recipes.json";

export default function RecipePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    const found = recipesData.find(
      (r) => r.name.toLowerCase().replace(/\s+/g, "-") === slug
    );

    setRecipe(found || null);
    setLoading(false);
  }, [slug]);

  if (!slug) return <div className="container">Loading...</div>;
  if (loading) return <div className="container">Loading recipe...</div>;
  if (!recipe) return <div className="container">Recipe not found</div>;

  return (
    <main style={{ padding: "48px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <button
        onClick={() => router.back()}
        className="btn-velvet"
        style={{ marginBottom: 24 }}
      >
        ← Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="recipe-card glass entrance"
        style={{ padding: 24 }}
      >
        <h1 className="title-xxl" style={{ marginBottom: 12 }}>{recipe.name}</h1>
        <div className="subtle" style={{ marginBottom: 16 }}>
          {recipe.cooking_time} • {recipe.difficulty}
        </div>

        <h2 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 12 }}>Ingredients</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {recipe.ingredients.map((ing, idx) => (
            <span
              key={idx}
              style={{
                padding: "6px 12px",
                borderRadius: 9999,
                background: "linear-gradient(135deg, #469110, #00520A)",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 500
              }}
            >
              {ing}
            </span>
          ))}
        </div>

        <h2 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 12 }}>Steps</h2>
        <ol style={{ marginBottom: 16 }}>
          {recipe.steps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              {step}
            </li>
          ))}
        </ol>

        <h2 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 12 }}>Nutrition</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", textAlign: "center" }}>
            <div className="subtle" style={{ fontWeight: 600 }}>Calories</div>
            <div style={{ fontWeight: 700 }}>{recipe.nutrition?.calories}</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", textAlign: "center" }}>
            <div className="subtle" style={{ fontWeight: 600 }}>Protein</div>
            <div style={{ fontWeight: 700 }}>{recipe.nutrition?.protein}</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", textAlign: "center" }}>
            <div className="subtle" style={{ fontWeight: 600 }}>Carbs</div>
            <div style={{ fontWeight: 700 }}>{recipe.nutrition?.carbs}</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.05)", textAlign: "center" }}>
            <div className="subtle" style={{ fontWeight: 600 }}>Fat</div>
            <div style={{ fontWeight: 700 }}>{recipe.nutrition?.fats}</div>
          </div>
        </div>

        <button
          className="btn-velvet"
          style={{ width: "100%", textAlign: "center" }}
          onClick={() => alert("Saved to favorites!")}
        >
          Save Recipe
        </button>
      </motion.div>
    </main>
  );
}
