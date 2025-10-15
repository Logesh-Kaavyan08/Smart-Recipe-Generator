"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RecipeCard({ recipe, matchedCount=0 }) {
  const router = useRouter();
  const slug = recipe.name.toLowerCase().replace(/\s+/g, "-");

  const goToRecipe = () => {
    console.log("Navigating to:", `/recipe/${slug}`);
    router.push(`/recipe/${slug}`);
  }

  return (
    <motion.div
      onClick={goToRecipe}
      initial={{ opacity:0, y:14 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.45, ease:"easeOut" }}
      className="recipe-card glass entrance"
      style={{ cursor:"pointer" }}
    >
      <div className="content">
        <div className="kicker">Recipe</div>
        <h3 className="title-xxl" style={{margin:"8px 0 12px", color:"white"}}>{recipe.name}</h3>

        <div className="subtle" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>{recipe.cooking_time || "—"} • {recipe.difficulty || "—"}</div>
          <div style={{fontWeight:700, color:"#FFF"}}>{matchedCount} match{matchedCount!==1?"es":""}</div>
        </div>
      </div>

      <div style={{marginTop:14}}>
        <button
          className="btn-velvet"
          style={{ width: "100%", display: "inline-block", textAlign: "center" }}
        >
          View Recipe
        </button>
      </div>
    </motion.div>
  );
}