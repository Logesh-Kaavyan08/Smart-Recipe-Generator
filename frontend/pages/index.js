// index.js

"use client";
import { useState } from "react";
import AnimatedSearch from "../components/AnimatedSearch";
import RecipeCard from "../components/RecipeCard";
import FilterPanel from "../components/FilterPanel";
import { getRecipes } from "../utils/api";
import { motion } from "framer-motion";

const FilterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M3 6H21M7 18H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function Home() {
    const [tags, setTags] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // ... (addTag and search functions remain the same)
    const addTag = (t) => {
        t = t.toLowerCase();
        if (!tags.includes(t)) setTags(prev => [...prev, t]);
        else setTags(prev => prev.filter(x => x !== t));
    };

    const search = async () => {
        if (tags.length === 0) return;
        setLoading(true);
        const data = await getRecipes(tags.join(","), filters);
        const withMatches = data.recipes.map(r => {
            const count = r.ingredients.filter(i => tags.includes(i)).length;
            return { ...r, matchCount: count };
        }).sort((a, b) => b.matchCount - a.matchCount);
        setRecipes(withMatches);
        setLoading(false);
    };

    return (
        <main style={{ padding: "48px 24px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto 32px" }}>
                <h1 className="title-xxl" style={{ marginTop: 8 }}>Smart Recipe Generator</h1>
                <p className="subtle" style={{ marginTop: 10 }}>Find delightful recipes from what you have</p>
            </div>

            {/* --- FIX #2: Reduced gap to move button closer to the search bar --- */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: 1100, margin: '0 auto', borderRadius: 12}}>
                
                <motion.button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    // --- FIX #1: Cleaned up classes to ensure `rounded-full` applies correctly ---
                    className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-3xl transition-all duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-pink-800/30 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75 ${isFilterOpen ? 'bg-gradient-to-br from-[#E673AC] to-[#99004C]' : 'bg-[rgba(255,255,255,0.08)]'}`}
                    aria-label="Toggle Filters"
                >
                    <motion.div animate={{ rotate: isFilterOpen ? 90 : 0 }}>
                        <FilterIcon />
                    </motion.div>
                </motion.button>

                <div style={{ flexGrow: 1 }}>
                    <AnimatedSearch selected={tags} onAddTag={addTag} onSearch={search} />
                </div>
            </div>

            <FilterPanel isOpen={isFilterOpen} onFilterChange={setFilters} />

            <div style={{ maxWidth: 1100, margin: "28px auto 0" }}>
                {loading ? <p className="subtle">Loading…</p> : null}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 18 }}>
                    {recipes.map((r, i) => <RecipeCard key={i} recipe={r} matchedCount={r.matchCount} />)}
                </div>
            </div>
        </main>
    );
}